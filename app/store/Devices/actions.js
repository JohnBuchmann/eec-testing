import { isArray } from 'lodash';
import { apiRequest } from 'Store/api/actions';
import { doPatch, doGet, doPost } from 'System/httpHelper';
import { endpointFormatter } from 'Utils/endpoint';
import { FormatTimes } from 'Utils/enums/device';
import moment from 'moment';
import * as actions from './types';

/**
 * @method getEventsDownloadExcel
 * Handle download excel from request response and return action data
 * @param {object} response receives request data
 * @returns {object}
 */
const getEventsDownloadExcel = (response) => {
  const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
  const downloadUrl = URL.createObjectURL(blob);
  const fileName = `Devices_Events_${moment().format(
    FormatTimes.DateFormat
  )}.xlsx`;
  const hiddenElement = document.createElement('a');
  // Assignment to href can be unsafe but is necessary for input blob array with excel data
  // eslint-disable-next-line
  hiddenElement.href = downloadUrl;
  hiddenElement.target = '_blank';
  hiddenElement.download = fileName;
  hiddenElement.click();

  return {
    type: actions.SET_EVENTS_EXCEL_DOWNLOAD,
    payload: true,
  };
};

/**
 * setDevices
 * Action creator to populate devices list on the store
 * @param {Array} devices array of devices list
 */
export const setDevices = (devices) => ({
  type: actions.SET_DEVICES,
  payload: devices,
});

/**
 * setDevices
 * Action creator to populate devices list on the store
 * @param {Array} devices array of devices list
 */
export const setFetchDevicesStart = () => ({
  type: actions.FETCH_DEVICES_BY_SITE_ID_START,
});

/**
 * setDeviceGroups
 * Action creator to populate devices list on the store
 * @param {Array} devices array of devices list
 */
export const setDeviceGroups = (deviceGroups) => ({
  type: actions.SET_DEVICE_GROUPS,
  payload: deviceGroups,
});

/**
 * getDevicesBySiteId
 * function to get devices information per siteId
 * @param {number} siteId a number to send to API to get devices by this siteId
 */
export const getDevicesBySiteId = (siteId, isRefreshing = false) => (
  dispatch
) => {
  let showLoader = false;
  if (!isRefreshing) {
    dispatch(setFetchDevicesStart());
    showLoader = true;
  }
  const apiUrl = `${endpointFormatter('fetchDevicesBySiteId', { siteId })}`;

  const onSuccess = (response) => {
    const responseGroups = isArray(response) ? response : [];
    // Extract groups and assign to the reducer to do it only once per call.
    if (isArray(responseGroups)) {
      const groups = responseGroups.map((group) => ({
        deviceGroupId: group.deviceGroupName,
        statusId: group.statusId,
      }));
      // Sort alphanumeric all devices
      responseGroups.forEach((device, index) => {
        responseGroups[`${index}`].devices = device.devices.sort((a, b) =>
          a.deviceName.localeCompare(b.deviceName, 'en', { numeric: true })
        );
      });
      dispatch(setDeviceGroups(groups));
    }
    return setDevices(responseGroups);
  };

  dispatch(
    apiRequest(
      () => doGet(apiUrl),
      onSuccess,
      {
        type: actions.FETCH_DEVICES_BY_SITE_ID_FAIL,
      },
      showLoader
    )
  );
};

/**
 * setDevicesFilters set filters to filter devices list
 * @param {Object} filters it has filters to set, deviceGroupId and locationId
 */
export const setDevicesFilters = (filters) => ({
  type: actions.SET_DEVICES_FILTERS,
  payload: filters,
});

/**
 * setDeviceStatus
 * Action creator to populate device status on the store
 * @param {Object} deviceStatus object of device status
 */
export const setDeviceStatus = (deviceStatus) => ({
  type: actions.SET_DEVICE_STATUS,
  payload: deviceStatus,
});

/**
 * fetchDeviceStatusStart
 * Action creator fetch device status start
 */
export const fetchDeviceStatusStart = () => ({
  type: actions.FETCH_DEVICE_STATUS_START,
});

/**
 * fetchDeviceStatusFail
 * Action creator fetch device status fail
 */
export const fetchDeviceStatusFail = () => ({
  type: actions.FETCH_DEVICE_STATUS_FAIL,
});

/**
 * setNewDeviceStatusInfo
 * Action creator to set new device status
 * @param {Array} newDeviceStatus array with the new device status
 */
export const setNewDeviceStatusInfo = (newDeviceStatus) => ({
  type: actions.SET_NEW_DEVICE_STATUS,
  payload: newDeviceStatus,
});

/**
 * fetchDeviceTelemetryStart
 * Start fetch device telemetry
 */
export const fetchDeviceTelemetryStart = () => ({
  type: actions.FETCH_DEVICE_TELEMETRY_START,
});

/**
 * setDeviceTelemetry
 * Set device telemetry to redux
 * @param {array} telemetry receives telemetry data points
 */
export const setDeviceTelemetry = (telemetry) => ({
  type: actions.SET_DEVICE_TELEMETRY,
  payload: telemetry,
});

/**
 * fetchDeviceTelemetryFail
 * Save the fail fetch device telemetry
 * @param {object} error receives error data
 */
export const fetchDeviceTelemetryFail = (error) => ({
  type: actions.FETCH_DEVICE_TELEMETRY_FAIL,
  payload: error,
});

/**
 * fetchDeviceConfigStart
 * Start fetch device config
 */
export const fetchDeviceConfigStart = () => ({
  type: actions.FETCH_DEVICE_CONFIG_START,
});

/**
 * setDeviceConfig
 * Set device config to redux
 * @param {array} config receives config data points
 */
export const setDeviceConfig = (config) => ({
  type: actions.SET_DEVICE_CONFIG,
  payload: config,
});

/**
 * fetchDeviceConfigFail
 * Save the fail fetch device config
 * @param {object} error receives error data
 */
export const fetchDeviceConfigFail = (error) => ({
  type: actions.FETCH_DEVICE_CONFIG_FAIL,
  payload: error,
});

/**
 * updateDeviceStatusStart
 * Start to update device status
 */
export const updateDeviceStatusStart = () => ({
  type: actions.UPDATE_DEVICE_STATUS_START,
});

/**
 * updateDeviceStatusFail
 * Save the error to update device status
 * @param {object} error receives error data
 */
export const updateDeviceStatusFail = (error) => ({
  type: actions.UPDATE_DEVICE_STATUS_FAIL,
  payload: error,
});

/**
 * clearDevicesUpdated
 * Clear device updated status
 */
export const clearDevicesUpdated = () => ({
  type: actions.CLEAR_DEVICE_UPDATED,
});

/**
 * updateDeviceTabsDisabled
 * Set to device tabs disabled status
 * @param {boolean} payload receives device tabs status
 */
export const updateDeviceTabsDisabled = (payload) => ({
  type: actions.UPDATE_DEVICE_TABS_DISABLED,
  payload,
});

/**
 * getEventsExcelDownloadStart
 * Start to get events to download excel
 */
export const getEventsExcelDownloadStart = () => ({
  type: actions.GET_EVENTS_EXCEL_DOWNLOAD_START,
});

/**
 * setEventsExcelDownload
 * Save device events on excel file and download
 * @param {object} response receives data response request
 */
export const setEventsExcelDownload = (response) =>
  getEventsDownloadExcel(response);

/**
 * clearEventsExcelDownload
 * Clear device events excel download property on redux
 */
export const clearEventsExcelDownload = () => ({
  type: actions.CLEAR_EVENTS_EXCEL_DOWNLOAD,
  payload: false,
});

/**
 * getEventsExcelDownloadFail
 * Save the error to get device events and download to excel
 * @param {object} payload receives error data
 */
export const getEventsExcelDownloadFail = (payload) => ({
  type: actions.GET_EVENTS_EXCEL_DOWNLOAD_FAIL,
  payload,
});

/**
 * fetchDeviceEventsStart
 * Start to fetch device events
 */
export const fetchDeviceEventsStart = () => ({
  type: actions.FETCH_DEVICE_EVENTS_START,
});

/**
 * setDeviceEvents
 * Save device events on redux
 * @param {object} payload receives device events data
 */
export const setDeviceEvents = (payload) => ({
  type: actions.SET_DEVICE_EVENTS,
  payload,
});

/**
 * fetchDeviceEventsFail
 * Save the error to fetch device events
 * @param {object} payload receive error data
 */
export const fetchDeviceEventsFail = (payload) => ({
  type: actions.FETCH_DEVICE_EVENTS_FAIL,
  payload,
});

/**
 * getDeviceStatus
 * function to get device status by deviceId
 * @param {number} deviceId a number to send to API to get device status
 */
export const getDeviceStatus = (deviceId) => (dispatch) => {
  dispatch(fetchDeviceStatusStart());
  const apiUrl = `${endpointFormatter('fetchDeviceStatus', { deviceId })}`;
  dispatch(
    apiRequest(() => doGet(apiUrl), setDeviceStatus, fetchDeviceStatusFail)
  );
};

/**
 * @method getDevicesTelemetry
 * Request devices telemetry from endpoint
 * @param {number} deviceId a number to send to API to get device status
 */
export const getDevicesTelemetry = (deviceId) => (dispatch) => {
  dispatch(fetchDeviceTelemetryStart());
  const apiUrl = `${endpointFormatter('fetchDeviceTelemetry', { deviceId })}`;
  dispatch(
    apiRequest(
      () => doGet(apiUrl),
      setDeviceTelemetry,
      fetchDeviceTelemetryFail
    )
  );
};

/**
 * @method getDevicesConfig
 * Request devices config from endpoint
 * @param {number} deviceId a number to send to API to get device status
 */
export const getDevicesConfig = (deviceId) => (dispatch) => {
  dispatch(fetchDeviceConfigStart());
  const apiUrl = `${endpointFormatter('fetchDeviceConfig', { deviceId })}`;
  dispatch(
    apiRequest(() => doGet(apiUrl), setDeviceConfig, fetchDeviceConfigFail)
  );
};

/**
 * @method getAllDevicesPoints
 * Call get devices actions for request to endpoints and save to redux
 * @param {number} deviceId a number to send to API to get device status
 */
export const getAllDevicesPoints = (deviceId) => (dispatch) => {
  dispatch(clearDevicesUpdated());
  dispatch(getDevicesTelemetry(deviceId));
  dispatch(getDevicesConfig(deviceId));
};

/**
 * @method updateNewDevicesValues
 * Call to update new device values for request to endpoints and save to redux
 * @param {object} devicesData receives device data
 * @param {number} deviceId receives device ID
 */
export const updateNewDevicesValues = (devicesData, deviceId) => (dispatch) => {
  dispatch(updateDeviceStatusStart());
  const params = {
    points: devicesData,
  };
  const apiUrl = `${endpointFormatter('fetchDeviceConfig', { deviceId })}`;
  dispatch(
    apiRequest(
      () => doPatch(apiUrl, params),
      setNewDeviceStatusInfo,
      updateDeviceStatusFail,
      false
    )
  );
};

/**
 * @method fetchEventsExcelDownload
 * Call to get device events excel download for request to endpoints and save to redux
 * @param {date} rangeFrom receives range from filter date
 * @param {date} rangeTo receives range to filter date
 * @param {number} deviceId receives device ID
 */
export const fetchEventsExcelDownload = (rangeFrom, rangeTo, deviceId) => (
  dispatch
) => {
  dispatch(getEventsExcelDownloadStart());
  const apiUrl = `${endpointFormatter('fetchDeviceExcelExport', { deviceId })}`;
  const params = {
    startDate: rangeFrom.format(FormatTimes.DateFormat),
    endDate: rangeTo.format(FormatTimes.DateFormat),
    useCsv: false,
  };

  dispatch(
    apiRequest(
      () => doPost(apiUrl, params, { responseType: 'arraybuffer' }),
      setEventsExcelDownload,
      getEventsExcelDownloadFail,
      false
    )
  );
};

/**
 * @method getDeviceEvents
 * Call to get device endpoints for request endpoint and save to redux
 * @param {number} deviceId receives device ID
 * @param {number} page receives number of page
 * @param {number} size receives size limit
 */
export const getDeviceEvents = (deviceId, page = 0, size = 100) => (
  dispatch
) => {
  dispatch(fetchDeviceEventsStart());
  const apiUrl = `${endpointFormatter('fetchDeviceEvents', {
    deviceId,
    page,
    size,
  })}`;
  dispatch(
    apiRequest(() => doGet(apiUrl), setDeviceEvents, fetchDeviceEventsFail)
  );
};
