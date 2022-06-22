import { settings } from 'Internals/mocks/userLogin';
import {
  setUnitMeasurement,
  setNotificationsSettings,
  setNotification,
} from '../actions';
import settingsReducer from '../settingsReducer';

const defaultState = {
  notifications: {},
};
const unitMeasurementMock = { unitMeasurementId: 1, name: 'C' };
const notificationsMock = [
  {
    notificationPreferenceId: 1,
    notificationPreferenceType: {
      notificationPreferenceTypeId: 1,
      name: 'NEW WORK ITEM',
    },
    emailEnabled: true,
    smsEnabled: false,
  },
];

describe('Settings Reducer', () => {
  let undefinedData;
  it('return initial state', () => {
    expect(settingsReducer(undefinedData, {})).toEqual(defaultState);
  });
  describe('Unit Measurement', () => {
    it('should dispatch setUnitMeasurement action', () => {
      const expected = {
        ...defaultState,
        notifications: {
          unitMeasurement: unitMeasurementMock,
        },
      };
      const actual = settingsReducer(
        defaultState,
        setUnitMeasurement(unitMeasurementMock)
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('Notifications', () => {
    it('should dispatch setNotificationsSettings action', () => {
      const expected = {
        ...defaultState,
        displayPlaceholder: false,
        notifications: {
          notificationPreferences: notificationsMock,
        },
      };
      const actual = settingsReducer(
        defaultState,
        setNotificationsSettings({ notificationPreferences: notificationsMock })
      );

      expect(actual).toEqual(expected);
    });
    it('should dispatch setNotifications action', () => {
      const actualData = settingsReducer(
        { notifications: settings },
        setNotification(notificationsMock[0])
      );
      const { notifications } = actualData;
      const { notificationPreferences: actual } = notifications;
      const expected = notificationsMock[0];

      expect(actual).toContainEqual(expected);
    });
  });
});
