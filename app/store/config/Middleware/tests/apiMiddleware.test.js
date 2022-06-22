import { apiRequest } from 'Store/api/actions';
import { showLoader } from 'Store/App/actions';
import apiMiddleware from '../apiMiddleware';

const createStoreConfig = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action) => apiMiddleware(store)(next)(action);

  return { store, next, invoke };
};

const apiRequestResolveData = 'Testing';
const apiRequestRejectError = 'Token error';

const requestSuccessDataAction = 'api success';
const requestFailDataAction = 'api success';

describe('api middleware', () => {
  it('should passes through non-function action', () => {
    const storeConfig = createStoreConfig();
    const { next, invoke } = storeConfig;
    const action = { type: 'TEST' };

    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should call requestSuccess method when the promise has been resolved ', async () => {
    const storeConfig = createStoreConfig();
    const { next, invoke } = storeConfig;

    const apiRequestFunction = jest.fn(() =>
      Promise.resolve(apiRequestResolveData)
    );
    const requestSuccessAction = jest.fn(() => requestSuccessDataAction);
    const requestFailAction = jest.fn(() => requestFailDataAction);

    const action = apiRequest(
      () => apiRequestFunction(),
      requestSuccessAction,
      requestFailAction
    );

    await invoke(action);
    await next();
    await next();

    expect(next).toHaveBeenCalledWith(action);
    expect(apiRequestFunction).toHaveBeenCalled();
    expect(requestSuccessAction).toHaveBeenCalled();
    expect(requestFailAction).not.toHaveBeenCalled();
  });

  it('should call requestFail method when the promise has been rejected ', async () => {
    const storeConfig = createStoreConfig();
    const { next, invoke } = storeConfig;

    const apiRequestFunction = jest.fn(() =>
      Promise.reject(apiRequestRejectError)
    );
    const requestSuccessAction = jest.fn(() => requestSuccessDataAction);
    const requestFailAction = jest.fn(() => requestFailDataAction);

    const action = apiRequest(
      () => apiRequestFunction(),
      requestSuccessAction,
      requestFailAction
    );

    await invoke(action);
    await next();
    await next();

    expect(next).toHaveBeenCalledWith(action);
    expect(apiRequestFunction).toHaveBeenCalled();
    expect(requestSuccessAction).not.toHaveBeenCalled();
    expect(requestFailAction).toHaveBeenCalled();
  });

  it('should not dispatch showLoader action ', async () => {
    const storeConfig = createStoreConfig();
    const { next, invoke, store } = storeConfig;

    const apiRequestFunction = jest.fn(() =>
      Promise.resolve(apiRequestResolveData)
    );
    const requestSuccessAction = jest.fn(() => requestSuccessDataAction);
    const requestFailAction = jest.fn(() => requestFailDataAction);

    const action = apiRequest(
      () => apiRequestFunction(),
      requestSuccessAction,
      requestFailAction,
      false
    );

    await invoke(action);
    await next();
    await next();

    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch.mock.calls).not.toContain(showLoader());
  });
});
