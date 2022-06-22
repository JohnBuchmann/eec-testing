import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  userLogin,
  settings,
  userPermissions,
} from 'Internals/mocks/userLogin';
import {
  setUnitMeasurementStart,
  setNotificationStart,
} from 'Store/Settings/actions';
import SettingsPage from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const storeMockData = {
  app: { loading: false },
  data: [],
  router: { location: { pathname: '/' } },
  user: {
    user: { ...userLogin, role: 'DCentriQ_ICIAN' },
    permissions: userPermissions,
  },
  settings: {
    displayPlaceholder: false,
    notifications: settings,
  },
  notification: {
    notifications: [],
  },
  devices: {
    devicesList: [],
  },
};

describe('<SettingsPage />', () => {
  describe('#Constructor', () => {
    it('should display placeholders ', () => {
      const settingsMockData = {
        displayPlaceholder: true,
        notifications: null,
      };
      const store = mockStore({
        ...storeMockData,
        settings: settingsMockData,
      });

      const settingsWrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <SettingsPage />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );

      const expected = 1;
      const actual = settingsWrapper.find(
        '[data-testid="container-settingsPlaceholder"]'
      ).length;

      expect(actual).toBe(expected);
    });
  });

  describe('#Panels', () => {
    let store;
    let settingsWrapper;

    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore(storeMockData);
      settingsWrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <SettingsPage />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );
    });

    describe('#UnitsOfMeasurementPanel', () => {
      it('should update unit of measurement', () => {
        const unitOfMeasurementContent = settingsWrapper.find(
          '[data-testid="content-unitOfMeasurement"]'
        );
        const toggleButton = unitOfMeasurementContent.find('Switch');

        const notActiveToggleOption = toggleButton.findWhere(
          (item) =>
            item.type() === 'button' && item.prop('aria-pressed') === false
        );

        notActiveToggleOption.simulate('click');
        const actual = store.getActions();
        const expected = setUnitMeasurementStart();
        expect(actual).toContainEqual(expected);
      });
    });

    describe('#NotificationPreferencesPanel', () => {
      it('should update notification preferences', () => {
        const notificationPreferenceItem = settingsWrapper
          .find('[data-testid="notificationPreferenceItem"]')
          .first();

        const smsToggleButton = notificationPreferenceItem
          .find('[data-testid="smsToggle"]')
          .first();

        const notActiveToggleOption = smsToggleButton.findWhere(
          (item) =>
            item.type() === 'button' && item.prop('aria-pressed') === false
        );

        notActiveToggleOption.simulate('click');

        const actual = store.getActions();
        const expected = setNotificationStart();
        expect(actual).toContainEqual(expected);
      });
    });
  });
});
