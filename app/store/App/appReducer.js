/**
 * App reducer
 */
import { ToastEvent } from 'Utils/enums/toaster';
import { HIDE_LOADER, HIDE_TOAST, SHOW_LOADER, SHOW_TOAST } from './types';

const initialState = {
  loading: false,
  toast: {
    showToast: false,
    event: ToastEvent.Success,
  },
  requestQueueCounter: 0,
};

/**
 * appReducer
 * Reducer method to apply state to selected action
 * @param {object} state current redux state for application
 * @param {object} action action creator object
 * @return {Object}
 */
const appReducer = (state = initialState, action) => {
  // Doing in this way since null value is a valid value and
  // it doesn't apply a default initial state if we do it on the input params
  let tempState = state || initialState;

  switch (action.type) {
    case SHOW_LOADER:
      tempState = {
        ...state,
        loading: true,
        requestQueueCounter: state.requestQueueCounter + 1,
      };
      break;
    case HIDE_LOADER:
      tempState = {
        ...state,
        loading: state.requestQueueCounter - 1 > 0,
        requestQueueCounter: state.requestQueueCounter - 1,
      };
      break;
    case SHOW_TOAST:
      tempState = {
        ...state,
        toast: {
          event: action.payload,
          showToast: true,
        },
      };
      break;
    case HIDE_TOAST:
      tempState = {
        ...state,
        toast: {
          ...state.toast,
          showToast: false,
        },
      };
      break;
    default:
      tempState = { ...tempState };
      break;
  }

  return tempState;
};

export default appReducer;
