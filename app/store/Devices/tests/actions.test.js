import { DeviceListTypeId } from 'Utils/enums/device';
import {
  fetchDeviceStatusFail,
  fetchDeviceStatusStart,
  setDevices,
  setDevicesFilters,
  setDeviceStatus,
  setFetchDevicesStart,
  setNewDeviceStatusInfo,
  fetchDeviceTelemetryStart,
  setDeviceTelemetry,
  fetchDeviceTelemetryFail,
  fetchDeviceConfigStart,
  setDeviceConfig,
  fetchDeviceConfigFail,
  updateDeviceStatusStart,
  updateDeviceStatusFail,
  clearDevicesUpdated,
  updateDeviceTabsDisabled,
  getEventsExcelDownloadStart,
  setEventsExcelDownload,
  getEventsExcelDownloadFail,
  clearEventsExcelDownload,
  fetchDeviceEventsStart,
  setDeviceEvents,
  fetchDeviceEventsFail,
} from '../actions';
import {
  FETCH_DEVICES_BY_SITE_ID_START,
  FETCH_DEVICE_STATUS_FAIL,
  FETCH_DEVICE_STATUS_START,
  SET_DEVICES,
  SET_DEVICES_FILTERS,
  SET_DEVICE_STATUS,
  SET_NEW_DEVICE_STATUS,
  FETCH_DEVICE_TELEMETRY_START,
  SET_DEVICE_TELEMETRY,
  FETCH_DEVICE_TELEMETRY_FAIL,
  FETCH_DEVICE_CONFIG_START,
  SET_DEVICE_CONFIG,
  FETCH_DEVICE_CONFIG_FAIL,
  UPDATE_DEVICE_STATUS_START,
  UPDATE_DEVICE_STATUS_FAIL,
  CLEAR_DEVICE_UPDATED,
  UPDATE_DEVICE_TABS_DISABLED,
  GET_EVENTS_EXCEL_DOWNLOAD_START,
  SET_EVENTS_EXCEL_DOWNLOAD,
  GET_EVENTS_EXCEL_DOWNLOAD_FAIL,
  CLEAR_EVENTS_EXCEL_DOWNLOAD,
  FETCH_DEVICE_EVENTS_START,
  SET_DEVICE_EVENTS,
  FETCH_DEVICE_EVENTS_FAIL,
} from '../types';

describe('Devices Actions', () => {
  describe('Devices List functions', () => {
    it('should create an action to set devices', () => {
      const expected = {
        type: SET_DEVICES,
        payload: [],
      };
      const actual = setDevices([]);

      expect(actual).toEqual(expected);
    });
    it('should create an action when set devices filters', () => {
      const filters = {
        deviceGroupId: DeviceListTypeId.All,
        locationId: 0,
      };
      const expected = {
        type: SET_DEVICES_FILTERS,
        payload: filters,
      };
      const actual = setDevicesFilters(filters);

      expect(actual).toEqual(expected);
    });
    it('should set fetch devices start', () => {
      const expected = {
        type: FETCH_DEVICES_BY_SITE_ID_START,
      };
      const actual = setFetchDevicesStart();

      expect(actual).toEqual(expected);
    });
  });
  describe('Devices List functions', () => {
    const deviceStatus = {
      id: 1,
      name: 'PV Power',
      value: 141.3,
      isEditable: false,
      controlType: 'VDC',
    };

    it('should set fetch device status start', () => {
      const expected = {
        type: FETCH_DEVICE_STATUS_START,
      };
      const actual = fetchDeviceStatusStart();

      expect(actual).toEqual(expected);
    });
    it('should set fetch device status fail', () => {
      const expected = {
        type: FETCH_DEVICE_STATUS_FAIL,
      };
      const actual = fetchDeviceStatusFail();

      expect(actual).toEqual(expected);
    });
    it('should set new device status', () => {
      const newDeviceStatus = deviceStatus;
      const expected = {
        type: SET_NEW_DEVICE_STATUS,
        payload: newDeviceStatus,
      };
      const actual = setNewDeviceStatusInfo(newDeviceStatus);

      expect(actual).toEqual(expected);
    });
    it('should set new device status', () => {
      const expected = {
        type: SET_DEVICE_STATUS,
        payload: deviceStatus,
      };
      const actual = setDeviceStatus(deviceStatus);

      expect(actual).toEqual(expected);
    });
  });

  describe('Device Status', () => {
    const pointsMock = {
      externalId: '000012-BAT',
      group: {
        points: [
          {
            access: 'R',
            comments: null,
            desc: 'Model',
            detail: null,
            id: 2,
            label: 'Model',
            mandatory: '0',
            maxValueRange: null,
            minValueRange: null,
            name: 'Model',
            sf: '0',
            size: null,
            symbols: [],
            tag: 'Model',
            type: 'string',
            units: null,
            value: 'The Model of the Battery ',
          },
        ],
      },
    };

    it('should call action fetchDeviceTelemetryStart', () => {
      const expected = {
        type: FETCH_DEVICE_TELEMETRY_START,
      };
      const actual = fetchDeviceTelemetryStart();

      expect(actual).toEqual(expected);
    });

    it('should call action setDeviceTelemetry', () => {
      const expected = {
        type: SET_DEVICE_TELEMETRY,
        payload: pointsMock,
      };
      const actual = setDeviceTelemetry(pointsMock);

      expect(actual).toEqual(expected);
    });

    it('should call action fetchDeviceTelemetryFail', () => {
      const errorData = {
        error: 'There was an error fetch device telemetry.',
      };
      const expected = {
        type: FETCH_DEVICE_TELEMETRY_FAIL,
        payload: errorData,
      };
      const actual = fetchDeviceTelemetryFail(errorData);

      expect(actual).toEqual(expected);
    });

    it('should call action fetchDeviceConfigStart', () => {
      const expected = {
        type: FETCH_DEVICE_CONFIG_START,
      };
      const actual = fetchDeviceConfigStart();

      expect(actual).toEqual(expected);
    });

    it('should call action setDeviceConfig', () => {
      const expected = {
        type: SET_DEVICE_CONFIG,
        payload: pointsMock,
      };
      const actual = setDeviceConfig(pointsMock);

      expect(actual).toEqual(expected);
    });

    it('should call action fetchDeviceConfigFail', () => {
      const errorData = {
        error: 'There was an error fetch device telemetry.',
      };
      const expected = {
        type: FETCH_DEVICE_CONFIG_FAIL,
        payload: errorData,
      };
      const actual = fetchDeviceConfigFail(errorData);

      expect(actual).toEqual(expected);
    });

    it('should call action updateDeviceStatusStart', () => {
      const expected = {
        type: UPDATE_DEVICE_STATUS_START,
      };
      const actual = updateDeviceStatusStart();

      expect(actual).toEqual(expected);
    });

    it('should call action updateDeviceStatusFail', () => {
      const errorData = {
        error: 'There was an error fetch device telemetry.',
      };
      const expected = {
        type: UPDATE_DEVICE_STATUS_FAIL,
        payload: errorData,
      };
      const actual = updateDeviceStatusFail(errorData);

      expect(actual).toEqual(expected);
    });

    it('should call action clearDevicesUpdated', () => {
      const expected = {
        type: CLEAR_DEVICE_UPDATED,
      };
      const actual = clearDevicesUpdated();

      expect(actual).toEqual(expected);
    });

    it('should call action updateDeviceTabsDisabled', () => {
      const disabledMock = true;
      const expected = {
        type: UPDATE_DEVICE_TABS_DISABLED,
        payload: disabledMock,
      };
      const actual = updateDeviceTabsDisabled(disabledMock);

      expect(actual).toEqual(expected);
    });
  });

  describe('Device Events', () => {
    it('should call action getEventsExcelDownloadStart', () => {
      const expected = {
        type: GET_EVENTS_EXCEL_DOWNLOAD_START,
      };
      const actual = getEventsExcelDownloadStart();

      expect(actual).toEqual(expected);
    });

    it('should call action getEventsExcelDownload', () => {
      global.URL.createObjectURL = jest.fn();
      const responseMock = { data: '' };
      const expected = {
        type: SET_EVENTS_EXCEL_DOWNLOAD,
        payload: true,
      };
      const actual = setEventsExcelDownload(responseMock);

      expect(actual).toEqual(expected);
    });

    it('should call action getEventsExcelDownloadFail', () => {
      const errorData = {
        error: 'There was an error when get device events download.',
      };
      const expected = {
        type: GET_EVENTS_EXCEL_DOWNLOAD_FAIL,
        payload: errorData,
      };
      const actual = getEventsExcelDownloadFail(errorData);

      expect(actual).toEqual(expected);
    });

    it('should call action clearEventsExcelDownload', () => {
      const expected = {
        type: CLEAR_EVENTS_EXCEL_DOWNLOAD,
        payload: false,
      };
      const actual = clearEventsExcelDownload();

      expect(actual).toEqual(expected);
    });

    it('should call action fetchDeviceEventsStart', () => {
      const expected = {
        type: FETCH_DEVICE_EVENTS_START,
      };
      const actual = fetchDeviceEventsStart();

      expect(actual).toEqual(expected);
    });

    it('should call action setDeviceEvents', () => {
      const mockData = [
        {
          deviceId: 1,
          deviceName: 'Device Name',
          title: 'Event Title',
          description: 'Event Description',
          date: '2020-11-09T16:58:30.000',
          deviceGroupName: 'BATT',
        },
      ];
      const expected = {
        type: SET_DEVICE_EVENTS,
        payload: mockData,
      };
      const actual = setDeviceEvents(mockData);

      expect(actual).toEqual(expected);
    });

    it('should call action fetchDeviceEventsFail', () => {
      const errorData = {
        error: 'There was an error when fetch device events.',
      };
      const expected = {
        type: FETCH_DEVICE_EVENTS_FAIL,
        payload: errorData,
      };
      const actual = fetchDeviceEventsFail(errorData);

      expect(actual).toEqual(expected);
    });
  });
});
