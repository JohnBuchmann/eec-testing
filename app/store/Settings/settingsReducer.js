/**
 * Unit Measurement reducer
 */
import { propertyExist } from 'Utils/propertyValidation';
import {
  SET_NOTIFICATIONS_SETTINGS,
  SET_NOTIFICATION_PREFERENCES,
  SET_UNIT_MEASUREMENT,
  SET_NOTIFICATION_PREFERENCES_FAIL,
} from './types';

const initialState = {
  notifications: {},
};
/**
 * settingsReducer
 * Update the states from notifications redux
 * @param {Object} state receives new state
 * @param {Object} action receives action data
 * @return {Object}
 */
const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS_SETTINGS:
      return {
        ...state,
        notifications: action.payload,
        displayPlaceholder: false,
      };
    case SET_NOTIFICATION_PREFERENCES_FAIL:
      return {
        ...state,
        notifications: null,
        displayPlaceholder: true,
      };
    case SET_NOTIFICATION_PREFERENCES:
      if (propertyExist(() => state.notifications.notificationPreferences)) {
        return {
          ...state,
          notifications: {
            ...state.notifications,
            notificationPreferences: state.notifications.notificationPreferences.map(
              (notification) =>
                notification.notificationPreferenceId ===
                action.payload.notificationPreferenceId
                  ? action.payload
                  : notification
            ),
          },
        };
      }
      return state;
    case SET_UNIT_MEASUREMENT:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          unitMeasurement: action.payload,
        },
      };
    default:
      return state;
  }
};

export default settingsReducer;
