import { allLocationsDefault, findDeviceListTypeById } from 'Utils/devices';
import { DeviceListTypeId, DevicePointName } from 'Utils/enums/device';
import {
  fetchDeviceStatusFail,
  fetchDeviceStatusStart,
  setDevices,
  setDevicesFilters,
  setDeviceStatus,
  setFetchDevicesStart,
  setDeviceGroups,
  setNewDeviceStatusInfo,
  setDeviceTelemetry,
  setDeviceConfig,
  clearDevicesUpdated,
  updateDeviceTabsDisabled,
  setEventsExcelDownload,
  clearEventsExcelDownload,
  setDeviceEvents,
} from '../actions';
import devicesReducer, {
  formatDevicesPoint,
  formatDevicesList,
  returnComplementaryDeviceGroups,
  separateDeviceGroups,
  validateTemperatureUnitsInPoints,
} from '../reducer';
import { FETCH_DEVICES_BY_SITE_ID_FAIL } from '../types';

const defaultState = {
  loading: false,
  devicesList: [],
  filtersDevices: {
    deviceGroupId: DeviceListTypeId.All,
    locationId: allLocationsDefault,
    deviceListType: findDeviceListTypeById(DeviceListTypeId.All),
  },
  devicesUpdated: false,
  deviceStatus: [],
  oldDeviceStatus: [],
  deviceGroups: [],
  complementaryDeviceGroups: [],
  deviceTabsDisabled: false,
  eventsDownloadExcel: false,
  deviceEvents: [],
};
describe('Devices Reducer', () => {
  it('returns initial state', () => {
    let undefinedData;
    expect(devicesReducer(undefinedData, {})).toEqual(defaultState);
  });

  describe('Set Devices', () => {
    it('Should set devices under devicesList', () => {
      const devices = [
        { deviceId: 61, deviceName: 'Inverter 61', deviceNum: 4 },
      ];
      const expected = {
        ...defaultState,
        devicesList: devices,
      };
      const actual = devicesReducer(defaultState, setDevices(devices));
      expect(actual).toEqual(expected);
    });

    it('Should return loading false when set devices fail', () => {
      const expected = {
        ...defaultState,
      };
      const actual = devicesReducer(defaultState, {
        type: FETCH_DEVICES_BY_SITE_ID_FAIL,
      });
      expect(actual).toEqual(expected);
    });

    it('Should return loading true when set devices start', () => {
      const expected = {
        ...defaultState,
        loading: true,
      };
      const actual = devicesReducer(defaultState, setFetchDevicesStart());
      expect(actual).toEqual(expected);
    });

    describe('#Functions', () => {
      it('should test formatDevicesPoint', () => {
        const expected = 'Make Value';
        const mockDevices = [
          {
            deviceId: 2,
            points: [{ name: DevicePointName.make, value: expected }],
          },
        ];
        const mockGroupName = 'BATT';
        const devices = formatDevicesPoint(mockDevices, mockGroupName);
        const actual = devices[0].make;
        expect(actual).toEqual(expected);
      });

      it('should test formatDevicesList', () => {
        const expected = 'BATT';

        const mockDevicesList = [
          {
            deviceGroupName: expected,
            devices: [
              {
                deviceId: 2,
                points: [],
              },
            ],
          },
        ];
        const devicesList = formatDevicesList(mockDevicesList);
        const actual = devicesList[0].devices[0].deviceGroupIdName;
        expect(actual).toEqual(expected);
      });

      it('should test separateDeviceGroups', () => {
        const deviceGroup = 'BATT';
        const mockDevicesGroups = [
          {
            deviceGroupId: deviceGroup,
            statusId: 1,
          },
        ];
        const deviceGroups = separateDeviceGroups(mockDevicesGroups);

        const actualDeviceGroupList = deviceGroups[0].deviceGroupId;

        expect(actualDeviceGroupList).toEqual(deviceGroup);
      });

      it('should test function validateTemperatureUnitsInPoints', () => {
        const expected = [
          {
            units: 'F',
          },
        ];
        const groupMockData = [
          {
            units: '°F',
          },
        ];
        const actual = validateTemperatureUnitsInPoints(groupMockData);
        expect(actual).toEqual(expected);
      });

      it('should test returnComplementaryDeviceGroups', () => {
        const deviceGroup = 'METERS';
        const mockDeviceList = [
          {
            deviceGroupId: 3,
            deviceGroupName: 'WIND',
            deviceGroupDescription: 'Wind',
            statusId: 5,
            statusName: 'OK',
            devices: [
              {
                deviceId: 675,
                deviceName: 'MTR1',
                desc: null,
                deviceNum: null,
                firmwareVersion: null,
                serialNo: '123 098 654',
                uniqueIdentifier: 'a0i63000008fS2iAAEMTR1',
                siteId: 768,
                deviceStatusId: 2,
                deviceGroupId: 3,
                gridStatus: null,
                make: null,
                deviceType: {
                  deviceModelId: 15,
                  type: 'METERS-R1',
                  name: 'METERS',
                  description: 'METERS',
                },
                deviceModel: null,
                points: [],
                componentName: 'S0MTRA',
              },
              {
                deviceId: 676,
                deviceName: 'WIND1',
                desc: null,
                deviceNum: null,
                firmwareVersion: null,
                serialNo: '454433459',
                uniqueIdentifier: 'a0i63000008fS2iAAEWIND1',
                siteId: 768,
                deviceStatusId: 2,
                deviceGroupId: 3,
                gridStatus: null,
                make: null,
                deviceType: {
                  deviceModelId: 3,
                  type: 'WIND-R1',
                  name: 'WIND',
                  description: 'WIND',
                },
                deviceModel: null,
                points: [],
                componentName: '',
              },
            ],
          },
        ];

        const complementaryDeviceGroups = returnComplementaryDeviceGroups(
          mockDeviceList
        );

        const actualDeviceGroupList =
          complementaryDeviceGroups[0].deviceGroupId;

        expect(actualDeviceGroupList).toEqual(deviceGroup);
      });
    });
  });

  describe('Devices Filters', () => {
    it('Should set filters for devices under filtersDevices', () => {
      const filters = { deviceGroupId: 2, locationId: 2 };
      const expected = {
        ...defaultState,
        filtersDevices: filters,
      };
      const actual = devicesReducer(defaultState, setDevicesFilters(filters));
      expect(actual).toEqual(expected);
    });
  });

  describe('Devices Groups', () => {
    it('Should set filters for devices under deviceGroups', () => {
      const allGroups = [{ deviceGroupId: 'BATT', statusId: 2 }];
      const groups = [{ deviceGroupId: 'BATT', statusId: 2 }];

      const expected = {
        ...defaultState,
        deviceGroups: groups,
      };
      const actual = devicesReducer(defaultState, setDeviceGroups(allGroups));
      expect(actual).toEqual(expected);
    });
  });

  describe('Set Device Status', () => {
    const devicesStatusMock = [
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
      {
        id: 3,
        name: 'Serial_Num',
        type: 'string',
        label: 'Serial #',
        desc: 'Serial #',
        sf: '0',
        units: null,
        access: 'RW',
        mandatory: '1',
        _static: 1,
        size: null,
        detail: 'Serial #',
        symbols: [],
        comments: null,
        value: '0001',
        maxValueRange: null,
        minValueRange: null,
        tag: 'Serial_Num',
      },
    ];
    it('Should set device status', () => {
      const expected = {
        ...defaultState,
        deviceStatus: devicesStatusMock,
        oldDeviceStatus: devicesStatusMock,
      };
      const actual = devicesReducer(
        defaultState,
        setDeviceStatus({ group: { points: devicesStatusMock } })
      );
      expect(actual).toEqual(expected);
    });

    it('Should return loading false when set device status fail', () => {
      const expected = {
        ...defaultState,
      };
      const actual = devicesReducer(defaultState, fetchDeviceStatusFail());
      expect(actual).toEqual(expected);
    });

    it('Should return loading true when set device status start', () => {
      const expected = {
        ...defaultState,
        loading: true,
      };
      const actual = devicesReducer(defaultState, fetchDeviceStatusStart());
      expect(actual).toEqual(expected);
    });

    it('Should return devices object with the new device status', () => {
      const expected = {
        ...defaultState,
        devicesUpdated: true,
      };
      const responseMock = {
        points: [
          {
            id: 12,
            tag: 'Min_Batt_V',
            operationStatus: 'success',
            value: '556',
          },
        ],
      };
      const actual = devicesReducer(
        defaultState,
        setNewDeviceStatusInfo(responseMock)
      );
      expect(actual).toEqual(expected);
    });

    it('Should return devices object with fail status', () => {
      const statusFail = 'fail';
      const expected = {
        ...defaultState,
        devicesUpdated: statusFail,
      };
      const responseMock = {
        points: [
          {
            id: 12,
            tag: 'Min_Batt_V',
            operationStatus: statusFail,
            value: '556',
          },
        ],
      };
      const actual = devicesReducer(
        defaultState,
        setNewDeviceStatusInfo(responseMock)
      );
      expect(actual).toEqual(expected);
    });

    it('should set device telemetry when call action setDeviceTelemetry', () => {
      const expected = {
        ...defaultState,
        deviceStatus: devicesStatusMock,
        oldDeviceStatus: devicesStatusMock,
      };
      const actual = devicesReducer(
        defaultState,
        setDeviceTelemetry({ group: { points: devicesStatusMock } })
      );

      expect(actual).toEqual(expected);
    });

    it('should set device config when call action setDeviceConfig', () => {
      const expected = {
        ...defaultState,
        deviceStatus: devicesStatusMock,
        oldDeviceStatus: devicesStatusMock,
      };
      const actual = devicesReducer(
        defaultState,
        setDeviceConfig({ group: { points: devicesStatusMock } })
      );

      expect(actual).toEqual(expected);
    });

    it('should clear devices updated when call action clearDevicesUpdated', () => {
      const expected = {
        ...defaultState,
        devicesUpdated: false,
        deviceStatus: [],
        oldDeviceStatus: [],
      };
      const actual = devicesReducer(defaultState, clearDevicesUpdated());

      expect(actual).toEqual(expected);
    });

    it('should clear when call action updateDeviceTabsDisabled', () => {
      const disabledMock = true;
      const expected = {
        ...defaultState,
        deviceTabsDisabled: disabledMock,
      };
      const actual = devicesReducer(
        defaultState,
        updateDeviceTabsDisabled(disabledMock)
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('#EventsExcelDownload', () => {
    it('should set true value property eventsDownloadExcel when call action setEventsExcelDownload', () => {
      global.URL.createObjectURL = jest.fn();
      const expected = {
        ...defaultState,
        eventsDownloadExcel: true,
      };
      const actual = devicesReducer(defaultState, setEventsExcelDownload());
      expect(actual).toEqual(expected);
    });

    it('should set true value property eventsDownloadExcel when call action setEventsExcelDownload', () => {
      const expected = {
        ...defaultState,
        eventsDownloadExcel: false,
      };
      const actual = devicesReducer(defaultState, clearEventsExcelDownload());
      expect(actual).toEqual(expected);
    });
  });

  describe('#DeviceEvents', () => {
    it('should set array events to property deviceEvents when call action setDeviceEvents', () => {
      const mockData = [
        {
          deviceId: 1,
          deviceName: 'Device Name',
          title: 'Event Title',
          description: 'Event Description',
          date: '2020-11-09T16:58:30.000',
          deviceGroupName: 'BATT',
          subType: 'Alarm',
          eventDateTime: '2020-11-09T16:58:30.000',
          eventTypeId: 'Alarm',
        },
      ];
      const expected = {
        ...defaultState,
        deviceEvents: mockData,
      };
      const actual = devicesReducer(defaultState, setDeviceEvents(mockData));
      expect(actual).toEqual(expected);
    });
  });
});
