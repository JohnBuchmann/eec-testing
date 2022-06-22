/**
 * Testing DevicesList Component
 */

import { mount, shallow } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { allLocationsDefault, findDeviceListTypeById } from 'Utils/devices';
import { DeviceListTypeId, DeviceListTypeName } from 'Utils/enums/device';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import history from 'utils/history';
import DevicesList from '..';

const initialState = {
  user: {
    user: userLogin,
    permissions: userPermissions,
  },
  site: {
    live: false,
  },
  devices: {
    devicesList: [
      {
        deviceGroupId: 1,
        deviceGroupName: 'BATT',
        deviceGroupDescription: 'Battery',
        statusId: 2,
        statusName: 'FAULTED',
        devices: [
          {
            deviceId: 26,
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
            gridStatus: null,
            make: null,
            deviceGroupIdName: 'BATT',
            deviceType: {
              deviceTypeId: null,
              deviceTypeName: 'ESS-R1',
              deviceGroupName: 'BATT',
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
      },
    ],
    filtersDevices: {
      deviceGroupId: DeviceListTypeId.All,
      locationId: allLocationsDefault,
      deviceListType: findDeviceListTypeById(DeviceListTypeId.All),
    },
    deviceGroups: [
      {
        deviceGroupId: 'BATT',
        statusId: 2,
      },
    ],
    loading: false,
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

const mountComponent = () =>
  mount(
    <Provider store={store}>
      <BrowserRouter>
        <IntlProvider locale="en">
          <DevicesList history={history} />
        </IntlProvider>
      </BrowserRouter>
    </Provider>
  );

describe('<DevicesList />', () => {
  describe('#Constructor', () => {
    it('should render <DevicesList /> component', () => {
      const wrapperShallow = shallow(
        <Provider store={store}>
          <BrowserRouter>
            <IntlProvider locale="en">
              <DevicesList history={history} />
            </IntlProvider>
          </BrowserRouter>
        </Provider>
      );
      expect(wrapperShallow.find('[data-testid="left-panel"]')).toBeDefined();
      expect(wrapperShallow.find('[data-testid="right-panel"]')).toBeDefined();
    });

    it('should render <DevicesList /> with no devicesList', () => {
      const emptyDevicesStore = mockStore({
        user: {
          user: userLogin,
          permissions: userPermissions,
        },
        site: {
          live: false,
        },
        devices: {
          devicesList: [],
          filtersDevices: {
            deviceGroupId: DeviceListTypeId.All,
            locationId: allLocationsDefault,
            deviceListType: findDeviceListTypeById(DeviceListTypeId.All),
          },
          deviceGroups: [],
        },
      });
      const wrapperShallow = shallow(
        <Provider store={emptyDevicesStore}>
          <BrowserRouter>
            <IntlProvider locale="en">
              <DevicesList history={history} />
            </IntlProvider>
          </BrowserRouter>
        </Provider>
      );
      const actual = !!wrapperShallow.find('[data-testid="left-panel"]');
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });

  describe('#left.SideMenu', () => {
    it('should render All IconDeviceButton', () => {
      const wrapper = mountComponent();
      const leftPanelDiv = wrapper.find('[data-testid="left-panel"]');

      expect(leftPanelDiv).toBeDefined();
      const buttons = leftPanelDiv.find('button');
      const foundButton = buttons
        .findWhere((item) => item.text() === DeviceListTypeName.All)
        .first();
      expect(foundButton).toBeDefined();
    });
  });

  describe('#right.SideMenu', () => {
    it('should found at least one DeviceCard', () => {
      const wrapper = mountComponent();
      const rightPanelDiv = wrapper.find('[data-testid="right-panel"]');
      expect(rightPanelDiv).toBeDefined();
      const divs = rightPanelDiv.find('[data-testid="device-card"]');

      expect(divs.length > 0).toBe(true);
    });
  });

  describe('#action.buttons', () => {
    it('should compare DeviceCard selecting All and Battery by clicking on Battery Card', () => {
      const wrapper = mountComponent();
      // Get all DeviceCards on the rightPanel under All
      let rightPanelDiv = wrapper.find('[data-testid="right-panel"]');
      expect(rightPanelDiv).toBeDefined();
      let divs = rightPanelDiv.find('[data-testid="device-card"]');
      const totalPanels = divs.length;

      // Simulate Click
      const leftPanelDiv = wrapper.find('[data-testid="left-panel"]');
      const buttons = leftPanelDiv.find('button');
      const batteryButton = buttons
        .findWhere((item) => item.text() === DeviceListTypeName.Battery)
        .first();
      batteryButton.simulate('click');

      // Get all DeviceCards on the rightPanel under Battery
      rightPanelDiv = wrapper.find('[data-testid="right-panel"]');
      expect(rightPanelDiv).toBeDefined();
      divs = rightPanelDiv.find('[data-testid="device-card"]');
      const totalBatteryPanels = divs.length;

      // Compare them, total should be greater than total Battery
      const actual = totalPanels > totalBatteryPanels;
      const expected = false;
      expect(actual).toBe(expected);
    });

    it('should click on a DeviceCard', () => {
      const wrapper = mountComponent();
      // Simulate Click on Battery
      const leftPanelDiv = wrapper.find('[data-testid="left-panel"]');
      const buttons = leftPanelDiv.find('button');
      const batteryButton = buttons
        .findWhere((item) => item.text() === DeviceListTypeName.Battery)
        .first();
      batteryButton.simulate('click');

      // Get all DeviceCards on the rightPanel and click on it
      const rightPanelDiv = wrapper.find('[data-testid="right-panel"]');
      expect(rightPanelDiv).toBeDefined();
      const deviceCards = rightPanelDiv.find('[data-testid="device-card"]');
      const buttonDeviceCard = deviceCards.first();
      buttonDeviceCard.simulate('click');
      const expectedPath = `/group/${DeviceListTypeId.Battery}/device/`;
      const actual = history.location.pathname.includes(expectedPath);
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
