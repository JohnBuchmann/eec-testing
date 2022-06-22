import { ToastEvent } from 'Utils/enums/toaster';
import { propertyExist } from 'Utils/propertyValidation';
import { API_REQUEST } from '../../api/types';
import { hideLoader, showLoader, showToast } from '../../App/actions';

const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  next(action);

  const { type } = action;

  if (type !== API_REQUEST) {
    return;
  }

  const {
    request,
    onSuccess,
    onFail,
    showAppLoading,
    showToastNotification,
  } = action.payload;

  if (showAppLoading) {
    dispatch(showLoader());
  }

  request()
    .then((data) => {
      const onSuccessResult = onSuccess(data);
      if (propertyExist(() => onSuccessResult.type)) {
        dispatch(onSuccessResult);
      }
      if (showToastNotification) {
        dispatch(showToast(ToastEvent.Success));
      }
    })
    .catch((error) => {
      const onFailResult = onFail(error);
      if (propertyExist(() => onFailResult.type)) {
        dispatch(onFailResult);
      }
      if (showToastNotification) {
        dispatch(showToast(ToastEvent.Error));
      }
    })
    .finally(() => {
      if (showAppLoading) {
        dispatch(hideLoader());
      }
    });
};

export default apiMiddleware;
