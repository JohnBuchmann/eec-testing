import { API_REQUEST } from './types';

/**
 * apiRequest
 * Action creator to indicate an api request
 * @param {function} request function to resolve an http promise
 * @param {function} onSuccess function to be called when http has been resolved
 * @param {function} onFail function to be called when http has failed
 * @param {bool} showAppLoading indicates if the app loading spinner is going to be displayed
 * @return {object} action creator
 */
export const apiRequest = (
  request,
  onSuccess,
  onFail,
  showAppLoading = true,
  showToastNotification = false
) => ({
  type: API_REQUEST,
  payload: {
    request,
    onSuccess,
    onFail,
    showAppLoading,
    showToastNotification,
  },
});
