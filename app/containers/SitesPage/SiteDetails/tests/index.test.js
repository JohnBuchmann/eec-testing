import { mount } from 'enzyme';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DeviceListTypeId } from 'Utils/enums/device';
import { SiteEventType } from 'Utils/enums/siteEvent';
import SiteDetailsNavigationBar from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  app: { loading: false },
  router: { location: { pathname: '/' } },
  notification: { notifications: [] },
  user: { user: userLogin, permissions: userPermissions },
  params: { match: { params: { tabName: 'Overview' } } },
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
      overview: null,
      eventsFilters: {
        eventTypeId: SiteEventType.AllEvents,
        deviceId: 0,
        groupId: DeviceListTypeId.All,
      },
      siteType: {
        siteTypeId: 1,
        name: 'Ignition',
      },
    },
  },
  devices: {
    deviceStatus: [],
    oldDeviceStatus: [],
    filtersDevices: {},
  },
};
let store;
let wrapper;

const history = {
  listen: () => {},
};

describe('<SiteDetailsNavigationBar/>', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <SiteDetailsNavigationBar store={store} history={history} />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  });
  describe('#Tabs', () => {
    it('Tab Navigation Bar contains tabs', () => {
      const tabs = wrapper.find('button[role="tab"]');
      expect(tabs.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('#Tab Panels', () => {
    it('Tab Navigation Bar contains tab panels', () => {
      const tabPanels = wrapper.find('div[role="tabpanel"]');
      expect(tabPanels.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('#Tabs and Tab Panels', () => {
    it('Tab Navigation Bar contains the same number of tabs than tab panels', () => {
      const tabs = wrapper.find('button[role="tab"]');
      const tabPanels = wrapper.find('div[role="tabpanel"]');

      const tabsLength = tabs.length;
      const tabPanelsLength = tabPanels.length;

      expect(tabsLength === tabPanelsLength).toBe(true);
    });

    it('should display only 5 tabs with siteType "XCape"', () => {
      const expected = 5;
      const localInicialState = {
        ...initialState,
        sites: {
          ...initialState.sites,
          site: {
            ...initialState.sites.site,
            siteType: {
              siteTypeId: 2,
              name: 'XCape',
            },
          },
        },
      };
      const localStore = mockStore(localInicialState);
      const commonWrapper = mount(
        <Provider store={localStore}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <SiteDetailsNavigationBar store={localStore} history={history} />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );
      const actual = commonWrapper.find('button[role="tab"]').length;
      expect(actual).toBe(expected);
    });
  });
});
