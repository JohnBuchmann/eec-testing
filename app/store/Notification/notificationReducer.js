import { FETCH_NOTIFICATION_FAIL, SET_NOTIFICATION } from './types';

const initialState = {
  notifications: [],
};

/**
 * notificationReducer
 * Reducer method to apply state to selected action
 * @param {object} state current redux state for notification
 * @param {object} action action creator object
 */
const notificationReducer = (state = initialState, action) => {
  // disabling because it's returning errors of unnecessary blocks but these are required
  /* eslint-disable */
  switch (action.type) {
    case FETCH_NOTIFICATION_FAIL:
      return {
        ...state,
        loading: false,
      };
    case SET_NOTIFICATION:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };
    default:
      return state;
  }
  /* eslint-enable */
};

export default notificationReducer;
