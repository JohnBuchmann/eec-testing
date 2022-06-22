import { apiRequest } from 'Store/api/actions';
import { doGet, doPatch } from 'system/httpHelper';
import { endpointFormatter } from 'Utils/endpoint';
import {
  FETCH_NOTIFICATION_FAIL,
  PATCH_NOTIFICATION_FAIL,
  SET_NOTIFICATION,
} from './types';

/**
 * setAllNotification
 * Action creator to populate notifications to the store
 * @param {array} payload notification array to store
 */
export const setAllNotification = (payload) => ({
  type: SET_NOTIFICATION,
  payload,
});

/**
 * fetchAllNotificationFail
 * Action creator to indicate fetch notification failed
 */
export const fetchAllNotificationFail = () => ({
  type: FETCH_NOTIFICATION_FAIL,
});

/**
 * getAllNotifications
 * Method to pull notifications
 */
export const getAllNotifications = () => (dispatch) => {
  const apiUrl = `${endpointFormatter('fetchNotification')}`;

  dispatch(
    apiRequest(
      () => doGet(apiUrl),
      setAllNotification,
      fetchAllNotificationFail,
      false
    )
  );
};

/**
 * patchNotificationFail
 * Action creator to indicate patch notification failed
 */
export const patchNotificationFail = () => ({
  type: PATCH_NOTIFICATION_FAIL,
});

/**
 * removeNotifications Remove from notifications array dismissed ones.
 * @param {array} notificationIds array of dismissed notificationsId
 * @param {array} notificationsList  arrays of notifications
 */
export const removeNotifications = (notificationIds, notificationsList = []) =>
  notificationsList.filter(
    (notification) =>
      !notificationIds.find(
        (notificationId) => notificationId === notification.id
      )
  );

/**
 * patchNotificationDismiss method to dismiss an array of notificationsIds
 * @param {array} notificationIds array of notificationsId to dismiss
 * @param {array} notificationsList  array of notificationsList
 */
export const patchNotificationDismiss = (
  notificationIds,
  notificationsList = []
) => (dispatch) => {
  const apiUrl = `${endpointFormatter('patchNotification')}`;

  const onSuccess = () => {
    const filterNotificationsList = removeNotifications(
      notificationIds,
      notificationsList
    );
    return setAllNotification(filterNotificationsList);
  };

  dispatch(
    apiRequest(
      () => doPatch(apiUrl, notificationIds),
      onSuccess,
      patchNotificationFail,
      false
    )
  );
};
