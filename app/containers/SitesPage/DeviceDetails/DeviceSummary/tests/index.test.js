/**
 * Testing DeviceSummary component
 */

import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DeviceListTypeId } from 'Utils/enums/device';
import { SiteEventType } from 'Utils/enums/siteEvent';
import { SiteTypes } from 'Utils/enums/siteTypes';
import DeviceSummary from '../index';

const deviceIdMock = 26;
const groupIdMock = DeviceListTypeId.Battery;
const groupDeviceTypemock = DeviceListTypeId.Meters;
const deviceElementsMock = [
  {
    deviceGroupId: 1,
    deviceGroupName: groupIdMock,
    deviceGroupDescription: 'Battery',
    statusId: 2,
    statusName: 'FAULTED',
    devices: [
      {
        deviceId: deviceIdMock,
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
        deviceType: {
          deviceTypeId: null,
          deviceTypeName: 'ESS-R1',
          deviceGroupName: groupIdMock,
          deviceGroupDescription: 'Battery',
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
            value: '1',
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
    devicesList: [
      {
        deviceGroupId: 1,
        deviceGroupName: 'BATT',
        deviceGroupDescription: 'Battery',
        statusId: null,
        statusName: null,
        devices: [
          {
            deviceId: 112,
            deviceName: 'BATT1',
            desc: null,
            deviceNum: null,
            serialNo: '0001',
            uniqueIdentifier: '000010-BAT',
            siteId: 17,
            deviceStatusId: null,
            deviceGroupId: 1,
            points: [],
            deviceGroupIdName: 'BATT',
            deviceType: {
              name: 'Meter',
            },
          },
        ],
      },
    ],
  },
];

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  sites: {
    site: {
      eventsFilters: {
        eventTypeId: SiteEventType.AllEvents,
        deviceId: 0,
        groupId: DeviceListTypeId.All,
      },
      siteType: {
        name: SiteTypes.Ignition,
      },
    },
  },
  devices: {
    devicesList: [...deviceElementsMock],
  },
};
const store = mockStore(initialState);

describe('<DeviceSummary />', () => {
  describe('#Constructor', () => {
    it('should render DeviceSummary with minimum required data', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <DeviceSummary selectedGroupId={groupIdMock} />
          </IntlProvider>
        </Provider>
      );

      const elementToFind = 'div';
      const div = wrapper.find(elementToFind);
      const actual = div.length;
      const expected = 1;
      expect(actual).toBeGreaterThanOrEqual(expected);
    });

    it('should render DeviceSummary with input selectedGroupId value "Meter" ', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <DeviceSummary selectedGroupId={groupDeviceTypemock} />
          </IntlProvider>
        </Provider>
      );

      const elementToFind = 'div';
      const div = wrapper.find(elementToFind);
      const actual = div.length;
      const expected = 1;
      expect(actual).toBeGreaterThanOrEqual(expected);
    });

    it('should render DeviceSummary with valid mock data', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <DeviceSummary
              selectedDeviceId={deviceIdMock}
              selectedGroupId={groupIdMock}
            />
          </IntlProvider>
        </Provider>
      );

      const elementToFind = `div[data-testid="main-div-${deviceIdMock}"]`;
      const div = wrapper.find(elementToFind);
      const actual = div.length;
      const expected = 1;
      expect(actual).toBeGreaterThanOrEqual(expected);
    });

    it('should render DeviceSummary with invalid mock data', () => {
      const invalidDeviceId = 1234561;
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <DeviceSummary
              selectedDeviceId={invalidDeviceId}
              selectedGroupId={groupIdMock}
            />
          </IntlProvider>
        </Provider>
      );

      const elementToFind = 'div[data-testid="main-div-undefined"]';
      const div = wrapper.find(elementToFind);
      const actual = div.length;
      const expected = 1;
      expect(actual).toBeGreaterThanOrEqual(expected);
    });
  });
});
