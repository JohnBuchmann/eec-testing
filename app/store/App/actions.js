import { HIDE_LOADER, SHOW_LOADER, SHOW_TOAST, HIDE_TOAST } from './types';

/**
 * showLoader
 * Action creator to set loader as visible into the store
 */
export const showLoader = () => ({
  type: SHOW_LOADER,
});

/**
 * hideLoader
 * Action creator to set loader as no visible into the store
 */
export const hideLoader = () => ({
  type: HIDE_LOADER,
});

/**
 * showToast
 * Action creator to set Toast as visible into the store
 * @param {string} toastEvent Indicates what kind of message display
 */
export const showToast = (toastEvent) => ({
  type: SHOW_TOAST,
  payload: toastEvent,
});

/**
 * hideToast
 * Action creator to set Toast as no visible into the store
 */
export const hideToast = () => ({
  type: HIDE_TOAST,
});
