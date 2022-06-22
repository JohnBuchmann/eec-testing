/**
 * Unit Measurement actions
 */
import { apiRequest } from 'Store/api/actions';
import { doGet, doPatch } from 'system/httpHelper';
import { endpointFormatter } from 'Utils/endpoint';
import {
  FETCH_NOTIFICATIONS_SETTINGS_FAIL,
  FETCH_NOTIFICATIONS_SETTINGS_START,
  SET_NOTIFICATION_PREFERENCES,
  SET_NOTIFICATIONS_SETTINGS,
  SET_NOTIFICATION_PREFERENCES_FAIL,
  SET_NOTIFICATION_PREFERENCES_START,
  SET_UNIT_MEASUREMENT,
  SET_UNIT_MEASUREMENT_FAIL,
  SET_UNIT_MEASUREMENT_START,
} from './types';

/**
 * setUnitMeasurementStart
 * Start the set unit measurement
 */
export const setUnitMeasurementStart = () => ({
  type: SET_UNIT_MEASUREMENT_START,
});

/**
 * setUnitMeasurement
 * Save the new unit measurement
 * @param {Object} unit receives new unit measurement data
 */
export const setUnitMeasurement = (unit) => ({
  type: SET_UNIT_MEASUREMENT,
  payload: unit,
});

/**
 * setUnitMeasurementFail
 * Save the error fail when the new unit measurement
 * @param {Object} error receives error from set
 */
export const setUnitMeasurementFail = (error) => ({
  type: SET_UNIT_MEASUREMENT_FAIL,
  payload: error,
});

/**
 * fetchNotificationsSettingsStart
 * Start the notifications settings
 */
export const fetchNotificationsSettingsStart = () => ({
  type: FETCH_NOTIFICATIONS_SETTINGS_START,
});

/**
 * setNotificationsSettings
 * Save the new notifications settings
 * @param {Object} notifications receives new notification settings data
 */
export const setNotificationsSettings = (notifications) => ({
  type: SET_NOTIFICATIONS_SETTINGS,
  payload: notifications,
});

/**
 * fetchNotificationsSettingsFail
 * Save the error fail when fetch the notification settings
 * @param {Object} error receives error from fetch
 */
export const fetchNotificationsSettingsFail = (error) => ({
  type: FETCH_NOTIFICATIONS_SETTINGS_FAIL,
  payload: error,
});

/**
 * setNotificationStart
 * Start the set notification
 */
export const setNotificationStart = () => ({
  type: SET_NOTIFICATION_PREFERENCES_START,
});

/**
 * setNotification
 * Save the new notifications
 * @param {Object} notifications receives new notifications data
 */
export const setNotification = (notifications) => ({
  type: SET_NOTIFICATION_PREFERENCES,
  payload: notifications,
});

/**
 * setNotificationFail
 * Save the error fail when set notifications
 * @param {*} error receives error from set
 */
export const setNotificationFail = (error) => ({
  type: SET_NOTIFICATION_PREFERENCES_FAIL,
  payload: error,
});

/**
 * getAllNotificationsSettings
 * Find all notifications for user settings
 * @return Promise
 */
export const getAllNotificationsSettings = () => (dispatch) =>
  new Promise(() => {
    dispatch(fetchNotificationsSettingsStart());
    const apiUrl = `${endpointFormatter('fetchNotificationsSettings')}`;

    dispatch(
      apiRequest(
        () => doGet(apiUrl),
        setNotificationsSettings,
        setNotificationFail
      )
    );
  });

/**
 * updateNotificationSettings
 * Update notifications settings from toggle button
 * @param {Number} settingId receives setting ID from settings user
 * @param {Object} notificationsData receives data to modify
 */
export const updateNotificationSettings = (settingId, notificationsData) => (
  dispatch
) => {
  dispatch(setNotificationStart());
  const params = {
    settingId,
  };
  const requestData = {
    notificationPreference: notificationsData,
  };
  const apiUrl = `${endpointFormatter('updateNotificationsSettings', params)}`;

  const onSuccess = () => setNotification(notificationsData);

  dispatch(
    apiRequest(
      () => doPatch(apiUrl, requestData),
      onSuccess,
      setNotificationFail,
      true,
      false
    )
  );
};

/**
 * updateUnitMeasurement
 * Update unit measurement from toggle button
 * @param {Number} settingId receives setting ID from settings user
 * @param {Object} unitData  receives data to modify
 */
export const updateUnitMeasurement = (settingId, unitData) => (dispatch) => {
  dispatch(setUnitMeasurementStart());
  const requestData = {
    userSetting: {
      userSettingId: settingId,
      unitMeasurement: unitData,
    },
  };
  const apiUrl = `${endpointFormatter('updateNotificationsSettings')}`;

  const onSuccess = () => setUnitMeasurement(unitData);

  dispatch(
    apiRequest(
      () => doPatch(apiUrl, requestData),
      onSuccess,
      setUnitMeasurementFail,
      true,
      false
    )
  );
};
