import {
  setUnitMeasurementStart,
  setUnitMeasurement,
  setUnitMeasurementFail,
  setNotificationStart,
  setNotification,
  setNotificationFail,
  fetchNotificationsSettingsStart,
  fetchNotificationsSettingsFail,
  setNotificationsSettings,
} from '../actions';
import {
  SET_UNIT_MEASUREMENT_START,
  SET_UNIT_MEASUREMENT,
  SET_UNIT_MEASUREMENT_FAIL,
  FETCH_NOTIFICATIONS_SETTINGS_START,
  FETCH_NOTIFICATIONS_SETTINGS_FAIL,
  SET_NOTIFICATIONS_SETTINGS,
  SET_NOTIFICATION_PREFERENCES_START,
  SET_NOTIFICATION_PREFERENCES,
  SET_NOTIFICATION_PREFERENCES_FAIL,
} from '../types';

const errorMock = { error: {} };
const unitMeasurementMock = { unitMeasurementId: 1, name: 'C' };
const notificationMock = [
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

describe('Settings Actions', () => {
  it('should create an action to fetch notifications start', () => {
    const expected = {
      type: FETCH_NOTIFICATIONS_SETTINGS_START,
    };
    const actual = fetchNotificationsSettingsStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to fetch notifications fail', () => {
    const expected = {
      type: FETCH_NOTIFICATIONS_SETTINGS_FAIL,
    };
    const actual = fetchNotificationsSettingsFail();

    expect(actual).toEqual(expected);
  });

  it('should create an action to set notifications', () => {
    const expected = {
      type: SET_NOTIFICATIONS_SETTINGS,
      payload: notificationMock,
    };
    const actual = setNotificationsSettings(notificationMock);

    expect(actual).toEqual(expected);
  });

  it('should create an action to setUnitMeasurementStart', () => {
    const expected = {
      type: SET_UNIT_MEASUREMENT_START,
    };
    const actual = setUnitMeasurementStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to setUnitMeasurement', () => {
    const expected = {
      type: SET_UNIT_MEASUREMENT,
      payload: unitMeasurementMock,
    };
    const actual = setUnitMeasurement(unitMeasurementMock);

    expect(actual).toEqual(expected);
  });

  it('should create an action to setUnitMeasurementFail', () => {
    const expected = {
      type: SET_UNIT_MEASUREMENT_FAIL,
      payload: errorMock,
    };
    const actual = setUnitMeasurementFail(errorMock);

    expect(actual).toEqual(expected);
  });

  it('should create an action to setNotificationsStart', () => {
    const expected = {
      type: SET_NOTIFICATION_PREFERENCES_START,
    };
    const actual = setNotificationStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to setNotifications', () => {
    const expected = {
      type: SET_NOTIFICATION_PREFERENCES,
      payload: notificationMock,
    };
    const actual = setNotification(notificationMock);

    expect(actual).toEqual(expected);
  });

  it('should create an action to setNotificationsFail', () => {
    const expected = {
      type: SET_NOTIFICATION_PREFERENCES_FAIL,
      payload: errorMock,
    };
    const actual = setNotificationFail(errorMock);

    expect(actual).toEqual(expected);
  });
});
