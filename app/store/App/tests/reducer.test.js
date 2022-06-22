import { ToastEvent } from 'Utils/enums/toaster';
import { hideLoader, hideToast, showLoader, showToast } from '../actions';
import appReducer from '../appReducer';

const defaultState = {
  loading: false,
  requestQueueCounter: 0,
  toast: {
    showToast: false,
    event: ToastEvent.Success,
  },
};

describe('App Reducer', () => {
  it('should returns initial state when null state is sent', () => {
    expect(appReducer(null, {})).toEqual(defaultState);
  });

  describe('#Loader', () => {
    it('Should dispatch showLoader action', () => {
      const expected = {
        ...defaultState,
        loading: true,
        requestQueueCounter: 1,
      };
      const actual = appReducer(defaultState, showLoader());

      expect(actual).toEqual(expected);
    });

    it('Should dispatch hideLoader action', () => {
      const expected = {
        ...defaultState,
        loading: false,
        requestQueueCounter: -1,
      };
      const actual = appReducer(defaultState, hideLoader());

      expect(actual).toEqual(expected);
    });

    it('Should dispatch showToast action', () => {
      const expected = {
        ...defaultState,
        toast: {
          showToast: true,
          event: ToastEvent.Error,
        },
      };
      const actual = appReducer(defaultState, showToast(ToastEvent.Error));

      expect(actual).toEqual(expected);
    });

    it('Should dispatch hideToast action', () => {
      const expected = {
        ...defaultState,
        toast: {
          ...defaultState.toast,
          showToast: false,
        },
      };
      const actual = appReducer(defaultState, hideToast());

      expect(actual).toEqual(expected);
    });
  });
});
