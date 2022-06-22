import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DeviceListTypeId } from 'Utils/enums/device';
import { SiteTypes } from 'Utils/enums/siteTypes';
import { SiteEventType } from 'Utils/enums/siteEvent';
import SiteDeviceEvents from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  sites: {
    site: {
      events: [],
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
};
const store = mockStore(initialState);

describe('<SiteDeviceEvents/>', () => {
  describe('#Tabs', () => {
    it('should render SiteDeviceEvents with 2 components inside', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <SiteDeviceEvents />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );
      const deviceSummary = wrapper.find('[data-testid="device-summary"]');

      let actual = !!deviceSummary;
      const expected = true;

      expect(actual).toBe(expected);

      const deviceSiteEvent = wrapper.find(
        '[data-testid="device-site-events"]'
      );
      actual = !!deviceSiteEvent;
      expect(actual).toBe(expected);
    });
    it('should render SiteDeviceEvents with params', () => {
      const props = {
        params: {
          deviceGroupId: '7',
          deviceId: '261',
        },
      };

      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <SiteDeviceEvents {...props} />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );
      const deviceSummary = wrapper.find('[data-testid="device-summary"]');

      const actual = !!deviceSummary;
      const expected = true;

      expect(actual).toBe(expected);
    });
  });
});
