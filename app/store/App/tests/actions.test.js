import { hideLoader, hideToast, showLoader, showToast } from '../actions';
import { HIDE_LOADER, HIDE_TOAST, SHOW_LOADER, SHOW_TOAST } from '../types';

describe('App Actions', () => {
  it('should create an action to show app loader', () => {
    const expected = {
      type: SHOW_LOADER,
    };
    const actual = showLoader();

    expect(actual).toEqual(expected);
  });

  it('should create an action to hide app loader', () => {
    const expected = {
      type: HIDE_LOADER,
    };
    const actual = hideLoader();

    expect(actual).toEqual(expected);
  });

  it('should create an action to show toast notification', () => {
    const expected = {
      type: SHOW_TOAST,
    };
    const actual = showToast();

    expect(actual).toEqual(expected);
  });

  it('should create an action to hide toast notification', () => {
    const expected = {
      type: HIDE_TOAST,
    };
    const actual = hideToast();

    expect(actual).toEqual(expected);
  });
});
