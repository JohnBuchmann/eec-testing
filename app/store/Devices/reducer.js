import { isArray } from 'lodash';
import {
  allLocationsDefault,
  findDeviceListTypeById,
  getValueFromSelectedPoint,
} from 'Utils/devices';
import { DeviceListTypeId, DevicePointName } from 'Utils/enums/device';
import { getValueIfExists } from 'Utils/propertyValidation';
import { temperatureUnitsLabel } from 'Utils/unitsOfMeasurement';
import * as deviceActionTypes from './types';

const initialState = {
  loading: false,
  devicesList: [],
  filtersDevices: {
    deviceGroupId: DeviceListTypeId.All,
    locationId: allLocationsDefault,
    deviceListType: findDeviceListTypeById(DeviceListTypeId.All),
  },
  deviceStatus: [],
  oldDeviceStatus: [],
  deviceGroups: [],
  complementaryDeviceGroups: [],
  devicesUpdated: false,
  deviceTabsDisabled: false,
  eventsDownloadExcel: false,
  deviceEvents: [],
};

/**
 * formatDevicesPoint
 * It extracts required values from points
 * @param {array} devices // Array of devices to format
 * @param {string} deviceGroupIdName // Group Id Name to set into devices
 * @returns an array of devices with required values
 */
export const formatDevicesPoint = (devices, deviceGroupIdName) => {
  if (isArray(devices)) {
    return devices.map((device) => ({
      ...device,
      deviceGroupIdName,
      make:
        device.make ||
        getValueFromSelectedPoint(device.points, DevicePointName.make),
      model:
        device.model ||
        getValueFromSelectedPoint(device.points, DevicePointName.model),
      lcmPositionNum:
        device.lcmPositionNum ||
        getValueFromSelectedPoint(device.points, DevicePointName.position),
      lcmRackNum:
        device.lcmRackNum ||
        getValueFromSelectedPoint(device.points, DevicePointName.rack),
      lcmLocation:
        device.lcmLocation ||
        getValueFromSelectedPoint(device.points, DevicePointName.location),
      energyRating:
        device.energyRating ||
        getValueFromSelectedPoint(device.points, DevicePointName.energyRating),
      deviceModel:
        device.deviceModel ||
        getValueFromSelectedPoint(device.points, DevicePointName.model),
      serialNumber:
        device.serialNumber ||
        getValueFromSelectedPoint(device.points, DevicePointName.serialNumber),
      buildNo:
        device.buildNo ||
        getValueFromSelectedPoint(device.points, DevicePointName.buildNo),
      uniqueIdentifier:
        device.uniqueIdentifier ||
        getValueFromSelectedPoint(
          device.points,
          DevicePointName.uniqueIdentifier
        ),
      firmwareVersion:
        device.firmwareVersion ||
        getValueFromSelectedPoint(
          device.points,
          DevicePointName.firmwareVersion
        ),
    }));
  }
  return devices;
};

/**
 * formatDevicesList
 * Provide a format to the current Devices List to store into store.
 * @param {array} devicesList
 * @returns Returns same array with formatted devices.
 */
export const formatDevicesList = (devicesList) => {
  if (isArray(devicesList)) {
    return devicesList.map((deviceList) => ({
      ...deviceList,
      devices: formatDevicesPoint(
        deviceList.devices,
        deviceList.deviceGroupName
      ),
    }));
  }
  return devicesList;
};

/**
 * returnComplementaryDeviceGroups
 * Loops through all the devices to find the complementary device groups types
 * @param {array} devicesList
 * @returns complementary device type groups
 */
export const returnComplementaryDeviceGroups = (devicesList) => {
  const complementaryDeviceGroups = [];
  const acceptedGroups = [
    DeviceListTypeId.Ats,
    DeviceListTypeId.Gid,
    DeviceListTypeId.LocalIO,
    DeviceListTypeId.Meters,
  ];
  if (isArray(devicesList)) {
    devicesList.forEach((deviceGroup) => {
      if (deviceGroup.devices && deviceGroup.devices.length > 0) {
        deviceGroup.devices.forEach((device) => {
          if (
            !complementaryDeviceGroups.some(
              (group) => group.deviceGroupId === device.deviceType.name
            )
          ) {
            const tempDeviceGroup = {
              deviceGroupId: device.deviceType.name,
              statusId: null,
            };
            if (acceptedGroups.includes(tempDeviceGroup.deviceGroupId)) {
              complementaryDeviceGroups.push(tempDeviceGroup);
            }
          }
        });
      }
    });
  }
  return complementaryDeviceGroups;
};

/**
 * separateDeviceGroups
 * Categorize device groups to separate from the complementary device types
 * @param {array} devicesList
 * @returns Returns two objects categorized device groups
 */
export const separateDeviceGroups = (devicesList) => {
  const deviceGroups = [];

  devicesList.forEach((deviceGroup) => {
    if (
      deviceGroup.deviceGroupId !== DeviceListTypeId.Ats &&
      deviceGroup.deviceGroupId !== DeviceListTypeId.Meters &&
      deviceGroup.deviceGroupId !== DeviceListTypeId.LocalIO &&
      deviceGroup.deviceGroupId !== DeviceListTypeId.Gid
    ) {
      deviceGroups.push(deviceGroup);
    }
  });
  return deviceGroups;
};

/**
 * @method validateTemperatureUnitsInPoints
 * Handle to validate temperature units and remove character "°" from data
 * @param {array} points receive group points
 * @returns {array}
 */
export const validateTemperatureUnitsInPoints = (points) =>
  points.map((point) => {
    if (
      point.units &&
      (point.units.indexOf(temperatureUnitsLabel.Celsius) > -1 ||
        point.units.indexOf(temperatureUnitsLabel.Fahrenheit) > -1)
    ) {
      return { ...point, units: point.units.replace(/°/g, '') };
    }
    return point;
  });

/**
 * setDevices
 * set action.payload into devicesList
 * @param {Object} state the whole state to set as default value
 * @param {Object} action object with the payload to set into deviceList
 */
const setDevices = (state, action) => ({
  ...state,
  devicesList: formatDevicesList(action.payload),
  complementaryDeviceGroups: returnComplementaryDeviceGroups(action.payload),
});

/**
 * setDeviceGroups
 * set action.payload into devicesList
 * @param {Object} state the whole state to set as default value
 * @param {Object} action object with the payload to set into deviceList
 */

const setDeviceGroups = (state, action) => {
  const deviceGroups = separateDeviceGroups(action.payload);
  return {
    ...state,
    loading: false,
    deviceGroups,
  };
};

/**
 * fetchDevicesBySiteIds
 * return state and set loading true when fetch starts
 * @param {Object} state the whole state to set as default value
 */
const fetchDevicesBySiteId = (state) => ({
  ...state,
  devicesList: [],
  loading: true,
});

/**
 * fetchDevicesBySiteIdFail
 * return state and set loading false when fetch fails
 * @param {Object} state the whole state to set as default value
 */
const fetchDevicesBySiteIdFail = (state) => ({
  ...state,
  loading: false,
});

/**
 * setDevices
 * @param {Object} state the whole state to set as default value
 * @param {Object} action object with the payload to set into deviceList
 */
const fetchDevicesFilters = (state, action) => ({
  ...state,
  filtersDevices: action.payload,
});

/**
 * setDevices
 * @param {Object} state the whole state to set as default value
 * @param {Object} action object with the payload to set into deviceList
 */
const setDeviceStatus = (state, action) => {
  const { group } = getValueIfExists(() => action.payload, { group: {} });
  if (getValueIfExists(() => group.points.length, 0) > 0) {
    const points = validateTemperatureUnitsInPoints(group.points);
    return {
      ...state,
      loading: false,
      deviceStatus: [...state.deviceStatus, ...points],
      oldDeviceStatus: [...state.deviceStatus, ...points],
    };
  }
  return {
    ...state,
  };
};

/**
 * setDevices
 * @param {Object} state the whole state to set as default value
 * @param {Object} action object with the payload to set into deviceList
 */
const fetchDeviceStatusStart = (state) => ({
  ...state,
  loading: true,
});

/**
 * fetchDeviceStatusFail
 * set loading false if fetch fails
 * @param {Object} state the whole state to set as default value
 */
const fetchDeviceStatusFail = (state) => ({
  ...state,
  loading: false,
});

/**
 * @method validateNewDeviceStatus
 * Validate if have a fail operation status from endpoint response and save on redux
 * @param {Object} state the whole state to set as default value
 * @param {Object} action object with the payload to set into deviceList
 * @returns {object}
 */
const validateNewDeviceStatus = (state, action) => {
  const statusFail = 'fail';
  const { points } = getValueIfExists(() => action.payload, { points: [] });
  const validateOperationStatus = points.find(
    (ope) => ope.operationStatus === statusFail
  );
  return {
    ...state,
    loading: false,
    devicesUpdated: validateOperationStatus ? statusFail : true,
  };
};

/**
 * @method responseClearDeviceUpdated
 * Response to clear device updated on redux
 * @param {Object} state the whole state to set as default value
 * @returns {object}
 */
const responseClearDeviceUpdated = (state) => ({
  ...state,
  loading: false,
  devicesUpdated: false,
  deviceStatus: [],
  oldDeviceStatus: [],
  deviceEvents: [],
});

/**
 * @method setDeviceTabsDisabled
 * Save payload to state property deviceTabsDisabled on redux
 * @param {Object} state the whole state to set as default value
 * @param {Object} action object with the payload to set into deviceTabsDisabled
 * @returns {object}
 */
const setDeviceTabsDisabled = (state, action) => ({
  ...state,
  deviceTabsDisabled: action.payload,
});

/**
 * @method setEventsDownloadExcel
 * Save payload to state property eventsDownloadExcel on redux
 * @param {object} state receives state of redux
 * @param {object} action receives action object with action response
 * @returns {object}
 */
const setEventsDownloadExcel = (state, action) => ({
  ...state,
  loading: false,
  eventsDownloadExcel: action.payload,
});

/**
 * @method setDeviceEvents
 * Save payload to state property deviceEvents on redux
 * @param {object} state receives state of redux
 * @param {object} action receives action object with action response
 * @returns {object}
 */
const setDeviceEvents = (state, action) => ({
  ...state,
  loading: false,
  deviceEvents: action.payload.map((data) => ({
    ...data,
    eventTypeId: data.subType,
    eventDateTime: data.date,
  })),
});

/**
 * devicesReducer
 * reducer that executes all devices actions
 * @param {object} state current redux state for devices
 * @param {object} action action creator object
 */
const devicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case deviceActionTypes.SET_DEVICES:
      return setDevices(state, action);
    case deviceActionTypes.FETCH_DEVICES_BY_SITE_ID_START:
      return fetchDevicesBySiteId(state);
    case deviceActionTypes.FETCH_DEVICES_BY_SITE_ID_FAIL:
      return fetchDevicesBySiteIdFail(state, action);
    case deviceActionTypes.SET_DEVICES_FILTERS:
      return fetchDevicesFilters(state, action);
    case deviceActionTypes.SET_DEVICE_GROUPS:
      return setDeviceGroups(state, action);
    case deviceActionTypes.SET_DEVICE_STATUS:
      return setDeviceStatus(state, action);
    case deviceActionTypes.SET_NEW_DEVICE_STATUS:
      return validateNewDeviceStatus(state, action);
    case deviceActionTypes.CLEAR_DEVICE_UPDATED:
      return responseClearDeviceUpdated(state);
    case deviceActionTypes.FETCH_DEVICE_STATUS_START:
      return fetchDeviceStatusStart(state);
    case deviceActionTypes.FETCH_DEVICE_STATUS_FAIL:
      return fetchDeviceStatusFail(state);
    case deviceActionTypes.SET_DEVICE_TELEMETRY:
      return setDeviceStatus(state, action);
    case deviceActionTypes.SET_DEVICE_CONFIG:
      return setDeviceStatus(state, action);
    case deviceActionTypes.UPDATE_DEVICE_TABS_DISABLED:
      return setDeviceTabsDisabled(state, action);
    case deviceActionTypes.SET_EVENTS_EXCEL_DOWNLOAD:
      return setEventsDownloadExcel(state, action);
    case deviceActionTypes.CLEAR_EVENTS_EXCEL_DOWNLOAD:
      return setEventsDownloadExcel(state, action);
    case deviceActionTypes.SET_DEVICE_EVENTS:
      return setDeviceEvents(state, action);
    default:
      return state;
  }
};

export default devicesReducer;
