import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import history from 'Utils/history';
import thunk from 'redux-thunk';
import { getValueIfExists } from 'Utils/propertyValidation';
import Layout from '../index';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
Enzyme.configure({ adapter: new Adapter() });

describe('Layout', () => {
  describe('#Constructor with no policy', () => {
    let state;
    const setState = jest.fn((event) => {
      state = event;
    });

    const useStateSpy = jest.spyOn(React, 'useState');

    const useEffectSpy = jest.spyOn(React, 'useEffect');

    useStateSpy.mockImplementation((init) => [init, setState]);

    useEffectSpy.mockImplementation(setState);

    const historyMock = jest.spyOn(history, 'push');

    const initialState = {
      data: [],
      router: { location: { pathname: '/' } },
      notification: {
        notifications: [
          {
            id: '602403d4973bb702f165485a',
            title: 'Notification Title',
            text:
              'Schneider Electric BB-466-02 Serial Number 3216842FBD-FOO is Offline.',
            siteId: 1,
            ts: '2021-01-10 10:03:24',
            uniqueId: 'oldHHDHdfg<6s0001hdsABATT1',
          },
          {
            id: '602403d4973bb702f365845a',
            title: 'Notification Title',
            text:
              'Schneider Electric BB-466-02 Serial Number 321648FBD-FOO is Offline.',
            siteId: 9,
            ts: '2021-02-09 10:03:24',
            uniqueId: 'oldHHDHdfg<6s0001hdsABATT1',
          },
        ],
      },
      user: { user: {}, policy: {} },
      app: {},
      devices: {
        devicesList: [
          {
            deviceGroupId: 1,
            deviceGroupname: 'BATT',
            eventType: ['SITE', 'NOTIFICATION'],
            id: '602403d4973bb702f165485a',
            plcId: 'kohler-co-appleton',
            readBy: ['JLenthe@anexinet.com'],
            siteId: 1,
            source: 'kafka-device-processor',
            subtype: 'Warning',
            text:
              'Schneider Electric BB-466-02 Serial Number 3216842FBD-FOO is Offline.',
            title: 'Notification Title',
            ts: '2021-01-10 10:03:24',
            uniqueId: 'oldHHDHdfg<6s0001hdsABATT1',
          },
        ],
      },
    };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <Layout store={store} main auth {...historyMock} />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
    describe('#Constructor', () => {
      it('should render this component', () => {
        const actual = wrapper.exists();
        const expected = true;
        expect(actual).toBe(expected);
      });
      it('should getNotifications to have been called', () => {
        expect(setState).toHaveBeenCalled();
      });
      it('should render the content app theme and exists', () => {
        const component = wrapper.find('[data-testid="content-app-theme"]');
        const actual = component.exists();
        const expected = true;
        expect(actual).toBe(expected);
      });
      it('should render the content app bar and exists', () => {
        const component = wrapper
          .find('[data-testid="content-app-bar"]')
          .first();
        const actual = component.exists();
        const expected = true;
        expect(actual).toBe(expected);
      });
      it('should render the app navigation and exists', () => {
        const component = wrapper
          .find('[data-testid="content-app-navigation"]')
          .first();
        const actual = component.exists();
        const expected = true;
        expect(actual).toBe(expected);
      });
      it('should render the app container and exists', () => {
        const component = wrapper
          .find('[data-testid="content-app-container"]')
          .first();
        const actual = component.exists();
        const expected = true;
        expect(actual).toBe(expected);
      });
      it('should not exists terms and conditions modal on initial load', () => {
        const component = wrapper
          .find('[data-testid="content-terms-conditions"]')
          .first();
        const actual = component.exists();
        const expected = false;
        expect(actual).toBe(expected);
      });
      it('should not render the modal for logout and exists', () => {
        const component = wrapper
          .find('[data-testid="content-logout-modal"]')
          .first();
        const actual = component.exists();
        const expected = false;
        expect(actual).toBe(expected);
      });
    });
    describe('App Bar', () => {
      it('should component has notifications', () => {
        const component = wrapper
          .find('[data-testid="content-app-bar"]')
          .first();
        const actual = component.props().notifications.length;
        const expected = 2;
        expect(actual).toBe(expected);
      });
      it('should call onViewNotificationClick method', () => {
        const component = wrapper
          .find('[data-testid="content-app-bar"]')
          .first();
        const siteId = 2;
        component.props().onViewNotificationClick(siteId);
        expect(historyMock).toHaveBeenCalled();
      });
      it('should onDismissClick method to have been called', () => {
        const component = wrapper
          .find('[data-testid="content-app-bar"]')
          .first();
        const notificationId = '602403d4973bb702f165485a';
        const spyLog = jest.spyOn(console, 'log');
        component.props().onDismissClick(notificationId);
        expect(spyLog).toHaveBeenCalled();
      });
      it('should onDismissAllClick method to have been called', () => {
        const component = wrapper
          .find('[data-testid="content-app-bar"]')
          .first();
        const spyLog = jest.spyOn(console, 'log');
        component.props().onDismissAllClick();
        expect(spyLog).toHaveBeenCalled();
      });
      it('should onLogoutClick method to have been called', () => {
        const component = wrapper
          .find('[data-testid="content-app-bar"]')
          .first();
        component.props().onLogoutClick();
        expect(setState).toHaveBeenCalled();
        const actual = state.isOpen;
        const expected = true;
        expect(actual).toBe(expected);
      });
    });
    describe('notifications useEffect', () => {
      it('when there are devices and handleViewNotificationClick has not been called', () => {
        const actual = wrapper.instance().props.store.getState().devices
          .devicesList.length;
        const expected = 1;
        expect(actual).toBe(expected);
        expect(historyMock).toHaveBeenCalledTimes(1);
      });
      it('when there are devices and handleViewNotificationClick was called', () => {
        const expectedResultValue = true;

        const deviceList = wrapper.instance().props.store.getState().devices
          .devicesList;

        const component = wrapper
          .find('[data-testid="content-app-bar"]')
          .first();
        component
          .props()
          .onViewNotificationClick(1, 'BATT', 'oldHHDHdfg<6s0001hdsABATT1');

        expect(historyMock).toHaveBeenCalledTimes(1);

        const resultValue = getValueIfExists(() => deviceList.length, 0) > 0;
        expect(resultValue).toBe(expectedResultValue);
        const actual = wrapper.instance().props.store.getState().devices
          .devicesList.length;
        const expected = 1;
        expect(setState).toHaveBeenCalled();
        expect(actual).toBe(expected);

        const actualState = state.shouldRedirect;
        const expectedState = true;
        expect(actualState).toBe(expectedState);

        const actualSite = state.siteId;
        const expectedSite = 1;
        expect(actualSite).toBe(expectedSite);

        const actualdeviceGroupName = state.deviceGroupName;
        const expecteddeviceGroupName = 'BATT';
        expect(actualdeviceGroupName).toBe(expecteddeviceGroupName);

        const actualuniqueId = state.uniqueId;
        const expecteduniqueId = 'oldHHDHdfg<6s0001hdsABATT1';
        expect(actualuniqueId).toBe(expecteduniqueId);

        const compatibleDevices = deviceList.filter(
          (deviceObj) =>
            deviceObj.deviceGroupname.toUpperCase() ===
            expecteddeviceGroupName.toUpperCase()
        );

        const resultCompatibleDevices = 1;

        expect(compatibleDevices.length).toBe(resultCompatibleDevices);
      });
    });
    it('Should send to devices', () => {
      const component = wrapper.find('[data-testid="content-app-bar"]').first();
      const actualValue = component
        .props()
        .onViewNotificationClick(1, 'BATT', 'oldHHDHdfg<6s0001hdsABATT1', '6');
      const expectedValue = 'goToDevices';
      expect(actualValue).toBe(expectedValue);
    });
    it('Should send to Overview', () => {
      const component = wrapper.find('[data-testid="content-app-bar"]').first();
      const actualValue = component.props().onViewNotificationClick(1);
      const expectedValue = 'goToOverview';
      expect(actualValue).toBe(expectedValue);
    });
    it('Should send to Device details', () => {
      const component = wrapper.find('[data-testid="content-app-bar"]').first();
      const actualValue = component
        .props()
        .onViewNotificationClick(1, 'BATT', 'oldHHDHdfg<6s0001hdsABATT1', '3');
      const expectedValue = 'goToDeviceDetails';
      expect(actualValue).toBe(expectedValue);
    });
  });
  describe('#Contructor with policy', () => {
    const initialState = {
      data: [],
      router: { location: { pathname: '/' } },
      notification: {
        notifications: [],
      },
      user: {
        user: {
          termsAndCondition: '',
        },
        policy: {
          consentEffectiveDate: '2020-09-15 12:00:00',
        },
      },
      app: {},
      devices: { devicesList: [] },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <Layout store={store} main auth />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
    describe('#Constructor', () => {
      it('should render this component', () => {
        const actual = wrapper.exists();
        const expected = true;
        expect(actual).toBe(expected);
      });
    });
  });
});
