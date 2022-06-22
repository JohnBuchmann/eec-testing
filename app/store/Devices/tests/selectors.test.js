import { allLocationsDefault } from 'Utils/devices';
import { DeviceListTypeId } from 'Utils/enums/device';
import { firstElement } from 'Utils/propertyValidation';
import { getDevicesListCard } from '../selectors';

const locationIdValue = '1';
const devicesListMock = [
  {
    deviceGroupId: 1,
    deviceGroupName: DeviceListTypeId.LocalIO,
    deviceGroupDescription: 'Battery',
    statusId: 2,
    statusName: 'FAULTED',
    devices: [
      {
        deviceId: 72,
        deviceName: 'BATT2',
        desc: null,
        deviceNum: null,
        firmwareVersion: null,
        serialNo: null,
        uniqueIdentifier: 'new-device-daniel',
        buildNo: '358988542',
        siteId: 2,
        deviceStatusId: 2,
        deviceGroupId: 1,
        lcmLocation: locationIdValue,
        deviceType: {
          deviceModelId: 1,
          type: 'ESS-R1',
          name: 'BATT',
          description: 'Battery',
        },
        deviceModel: null,
        points: [
          {
            name: 'Model',
            value: 'The Model of the Battery 2',
          },
          {
            name: 'Rating',
            value: '333',
          },
          {
            name: 'Make',
            value: 'Make',
          },
          {
            name: 'LCM_Loc',
            value: locationIdValue,
          },
          {
            name: 'LCM_Rac_Num',
            value: '2',
          },
          {
            name: 'LCM_Pos_Num',
            value: '3',
          },
          {
            name: 'Inverter_On_grid',
            value: true,
          },
        ],
      },
    ],
  },
];

const devicesTypesListMock = [
  {
    deviceGroupId: 11,
    deviceGroupName: 'ATS',
    deviceGroupDescription: 'Automatic Transfer Switch',
    statusId: null,
    statusName: null,
    devices: [
      {
        deviceId: 620,
        deviceName: 'ATS3',
        desc: null,
        deviceNum: null,
        firmwareVersion: null,
        serialNo: '11111111',
        uniqueIdentifier: 'a0h3K000000CKu5QAGATS3',
        siteId: 44,
        deviceStatusId: 3,
        deviceGroupId: 11,
        gridStatus: null,
        make: null,
        deviceType: {
          deviceModelId: 11,
          type: 'ATS-R1',
          name: 'ATS',
          description: 'ATS',
        },
        deviceModel: null,
        points: [
          {
            id: 876,
            name: 'Cancel_ATS_Test',
            type: 'unit16',
            label: 'Cancel ATS Test',
            desc: 'Cancel ATS Test',
            sf: '0',
            units: null,
            access: 'R',
            mandatory: '1',
            _static: null,
            size: null,
            detail: 'Cancel ATS Test',
            symbols: [],
            comments: null,
            value: '0',
            maxValueRange: null,
            minValueRange: null,
            tag: 'Cancel_ATS_Test',
            symbolName: null,
          },
        ],
        componentName: 'E0ATS3R1P4',
      },
    ],
  },
];

describe('Sites Reducer', () => {
  let mockState;
  let mockStateDeviceTypes;

  beforeEach(() => {
    mockState = {
      devices: {
        devicesList: devicesListMock,
        filtersDevices: {
          deviceGroupId: DeviceListTypeId.All,
          locationId: allLocationsDefault,
        },
        loading: false,
      },
    };
  });

  beforeEach(() => {
    mockStateDeviceTypes = {
      devices: {
        devicesList: devicesTypesListMock,
        filtersDevices: {
          deviceGroupId: DeviceListTypeId.Ats,
          locationId: allLocationsDefault,
        },
        loading: false,
      },
    };
  });

  it('Should return all devices when filter is assigned by default', () => {
    const expected = firstElement(devicesListMock).devices;
    const actual = getDevicesListCard(mockState);
    expect(actual).toEqual(expected);
  });

  it('Should return devices when no filters assigned and apply default values', () => {
    const expected = firstElement(devicesListMock).devices;
    mockState.devices.filtersDevices = {};
    const actual = getDevicesListCard(mockState);

    expect(actual).toEqual(expected);
  });

  it('Should return filtered devices with selected deviceGroup and location', () => {
    const expected = [firstElement(firstElement(devicesListMock).devices)];
    mockState.devices.filtersDevices = {
      deviceGroupId: DeviceListTypeId.All,
      locationId: locationIdValue,
    };
    const actual = getDevicesListCard(mockState);

    expect(actual).toEqual(expected);
  });

  it('Should return filtered typesdevices with selected deviceGroup and location', () => {
    const expected = [firstElement(firstElement(devicesTypesListMock).devices)];
    mockStateDeviceTypes.devices.filtersDevices = {
      deviceGroupId: DeviceListTypeId.Ats,
      locationId: locationIdValue,
    };
    const actual = getDevicesListCard(mockStateDeviceTypes);

    expect(actual).toEqual(expected);
  });
});
