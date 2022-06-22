import { apiRequest } from '../actions';
import { API_REQUEST } from '../types';

describe('Api Actions', () => {
  it('should create an action for http request', () => {
    const apiRequestFunction = () => 'api request';
    const requestSuccess = () => 'api success';
    const requestFail = () => 'api fail';

    const expected = {
      type: API_REQUEST,
      payload: {
        request: apiRequestFunction,
        onSuccess: requestSuccess,
        onFail: requestFail,
        showAppLoading: true,
        showToastNotification: false,
      },
    };
    const actual = apiRequest(apiRequestFunction, requestSuccess, requestFail);

    expect(actual).toEqual(expected);
  });
});
