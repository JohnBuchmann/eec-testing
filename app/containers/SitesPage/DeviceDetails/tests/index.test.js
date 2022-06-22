import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import thunk from 'redux-thunk';
import { DeviceListTypeId } from 'Utils/enums/device';
import { SiteEventType } from 'Utils/enums/siteEvent';
import DeviceDetailsNavigationBar from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  app: { loading: false },
  router: { location: { pathname: '/' } },
  user: { user: userLogin, permissions: userPermissions },
  notification: { notifications: [] },
  sites: {
    site: {
      location: {
        customer: {
          primaryContact: {},
        },
        address: {},
      },
      address: {},
      tariffStructure: {},
      events: [],
      overview: {},
      eventsFilters: {
        eventTypeId: SiteEventType.AllEvents,
        deviceId: 0,
        groupId: DeviceListTypeId.All,
      },
      siteType: {
        siteTypeId: 1,
        name: 'Ignition',
        description: 'For sites using Ignition',
      },
    },
  },
  devices: {
    deviceStatus: [],
    oldDeviceStatus: [],
    filtersDevices: {},
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
          },
        ],
      },
    ],
  },
  settings: {
    notifications: {
      unitMeasurement: {
        unitMeasurementId: 2,
        name: 'F°',
      },
    },
  },
};

const store = mockStore(initialState);

describe('<DeviceDetailsNavigationBar/>', () => {
  describe('#Tabs', () => {
    it('Tab Navigation Bar contains tabs', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <DeviceDetailsNavigationBar />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );
      const tabs = wrapper.find('button[role="tab"]');

      const expected = 1;
      const actual = tabs.length;
      expect(actual).toBeGreaterThanOrEqual(expected);
    });
  });

  describe('#Tab Panels', () => {
    it('Tab Navigation Bar contains tab panels', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <DeviceDetailsNavigationBar />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );
      const tabPanels = wrapper.find('div[role="tabpanel"]');
      const expected = 1;
      const actual = tabPanels.length;
      expect(actual).toBeGreaterThanOrEqual(expected);
    });
  });

  describe('#Tabs and Tab Panels', () => {
    it('Tab Navigation Bar contains the same number of tabs than tab panels', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <DeviceDetailsNavigationBar />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );

      const tabs = wrapper.find('button[role="tab"]');
      const tabPanels = wrapper.find('div[role="tabpanel"]');

      const tabsLength = tabs.length;
      const tabPanelsLength = tabPanels.length;

      const actual = tabsLength === tabPanelsLength;
      const expected = true;

      expect(actual).toBe(expected);
    });
  });
});
