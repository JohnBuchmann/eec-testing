import { apiRequest } from 'Store/api/actions';
import { doGet, doPost, doPut } from 'system/httpHelper';
import { endpointFormatter } from 'Utils/endpoint';
import { getValueIfExists } from 'Utils/propertyValidation';
import {
  FETCH_USER_POLICY,
  FETCH_USER_POLICY_FAIL,
  FETCH_USER_POLICY_START,
  SET_USER_POLICY,
  SET_USER_ROLE_CONFIG,
  SET_USER_ROLE_CONFIG_FAIL,
  SET_USER_APP_CONFIG,
  STORE_USER,
  UPDATE_TERMS_AND_CONDITIONS,
  UPDATE_TERMS_AND_CONDITIONS_FAIL,
  UPDATE_USER_PROFILE_OKTA,
  UPDATE_USER_PROFILE_OKTA_FAIL,
  UPDATE_USER_PASSWORD_OKTA,
  CLEAN_OKTA_MESSAGES_PASSWORD,
  SET_USER_PERMISSIONS,
} from './types';

/**
 * storeUser
 * Save the user information
 * @param {object} userInfo receives user info
 * @returns
 */
export const storeUser = (userInfo) => ({
  type: STORE_USER,
  user: userInfo,
});

/**
 * fetchUserPolicyStart
 * Start fetch user policy
 */
export const fetchUserPolicyStart = () => ({
  type: FETCH_USER_POLICY_START,
});

/**
 * fetchUserPolicy
 * Fetch user policy
 */
export const fetchUserPolicy = () => ({
  type: FETCH_USER_POLICY,
});

/**
 * setUserPolicy
 * Save the user policy
 * @param {object} policy receives policy data
 */
export const setUserPolicy = (policy) => ({
  type: SET_USER_POLICY,
  payload: policy,
});

/**
 * fetchUserPolicyFail
 * Save the error fail when fetch user policy
 * @param {object} error receives error from fetch
 */
export const fetchUserPolicyFail = (error) => ({
  type: FETCH_USER_POLICY_FAIL,
  payload: error,
});

/**
 * setTermsAndConditions
 * Update terms and conditions to user
 * @param {object} policy receives policy data
 */
export const setTermsAndConditions = (policy) => ({
  type: UPDATE_TERMS_AND_CONDITIONS,
  payload: policy,
});

/**
 * setTermsAndConditionsFail
 * Save the error fail when set terms and conditions to user
 * @param {*} error receives error from set terms
 */
export const setTermsAndConditionsFail = (error) => ({
  type: UPDATE_TERMS_AND_CONDITIONS_FAIL,
  payload: error,
});

/**
 * getUserPolicy
 * Find user policy to endpoint
 */
export const getUserPolicy = () => (dispatch) => {
  dispatch(fetchUserPolicyStart());
  const apiUrl = `${endpointFormatter('fetchUserPolicy')}`;
  dispatch(
    apiRequest(() => doGet(apiUrl), setUserPolicy, fetchUserPolicyFail, false)
  );
};

/**
 * updateUserPolicy
 *
 */
export const updateUserPolicy = (effectiveDate) => (dispatch) => {
  const apiUrl = `${endpointFormatter('fetchUserPolicy')}`;
  const onSuccess = () => setTermsAndConditions(effectiveDate);
  dispatch(
    apiRequest(() => doPut(apiUrl), onSuccess, setTermsAndConditionsFail, false)
  );
};

/**
 * @method postUserSessionLoginEvent
 * Submit the request to register login events.
 * @param {Object} params Includes the event parameters to register.
 * @return {void}
 */
export const postUserSessionLoginEvent = () => (dispatch) => {
  const eventRegister = 'login';

  const apiUrl = `${endpointFormatter('userSessionEvents', {
    event: eventRegister,
  })}`;
  const onFail = (event) => {
    // eslint-disable-next-line
    console.log('userSessionEvent', event);
  };
  dispatch(apiRequest(() => doPost(apiUrl), null, onFail, false));
};

/**
 * @method postUserSessionLogoutEvent
 * Submit the request to register Logout events.
 * @param {Object} params Includes the event parameters to register.
 * @return {void}
 */
export const postUserSessionLogoutEvent = () => (dispatch) => {
  const eventRegister = 'logout';
  const apiUrl = `${endpointFormatter('userSessionEvents', {
    event: eventRegister,
  })}`;
  const onFail = (event) => {
    // eslint-disable-next-line
    console.log('userSessionEvent', event);
  };
  dispatch(apiRequest(() => doPost(apiUrl), null, onFail, false));
};

/**
 * @method setUpdateOktaProfileFail
 * Sets the error message in the reducer
 * so we can show the alert to let the user know what is wrong with the request.
 * @param error {Object} The error received from the failed API request.
 * TODO: Add unit testing
 * @return {Object}
 */
export const setUpdateOktaProfileFail = (error) => {
  const errorResponse = getValueIfExists(() => error.response, {});
  const passwordText = 'password';
  const mobilePhoneText = 'mobilePhone';
  const exceptionsText = `Messages Exceptions`;

  let errorMessage = {
    type: '',
    message: '',
  };

  const responseMessage = getValueIfExists(
    () => errorResponse.data.errors[`${exceptionsText}`],
    []
  )[0];

  if (responseMessage) {
    const responseType = responseMessage.toLowerCase().includes('password')
      ? passwordText
      : mobilePhoneText;
    const message = responseMessage.replace(`${responseType}: `, '');
    errorMessage = {
      type: responseType,
      message,
    };
  }

  return {
    type: UPDATE_USER_PROFILE_OKTA_FAIL,
    payload: errorMessage,
  };
};

/**
 * @method userOktaProfileDataSuccess
 * Updates user's mobile phone number on the store
 * @param {Object} payload Response from BE with the information
 * TODO: Add unit testing
 * @return {Object}
 */
export const userOktaProfileDataSuccess = (payload) => ({
  type: UPDATE_USER_PROFILE_OKTA,
  payload,
});

/**
 * @method setUserOktaPasswordState
 * Save the state to okta password property on redux
 * @param {object} payload receives payload data
 */
export const setUserOktaPasswordState = (payload) => ({
  type: UPDATE_USER_PASSWORD_OKTA,
  payload,
});

/**
 * @method cleanUserOktaPasswordMessages
 * Clean state properties from message and password on user redux
 */
export const cleanUserOktaPasswordMessages = () => ({
  type: CLEAN_OKTA_MESSAGES_PASSWORD,
});

/**
 * @method setUserRoleConfig
 * Store the high-level role into user redux
 */
export const setUserRoleConfig = (payload) => ({
  type: SET_USER_ROLE_CONFIG,
  payload: getValueIfExists(() => payload.role, ''),
});

/**
 * @method setUserRoleConfigFail
 * Store the first role found into user redux
 */
export const setUserRoleConfigFail = (user) => {
  const userRoles = getValueIfExists(() => user.roles, []);
  const role = userRoles[userRoles.length - 1] || null;
  return {
    type: SET_USER_ROLE_CONFIG_FAIL,
    payload: role,
  };
};

/**
 * @method setUserAppConfig
 * Store the app user configuration allow-write-back-access
 */
export const setUserAppConfig = (payload) => ({
  type: SET_USER_APP_CONFIG,
  payload,
});
/**
 * @method setUserPermissionsStart
 * Save the user permissions in redux
 * @param {object} payload receives action.payload data
 */
export const setUserPermissions = (payload) => ({
  type: SET_USER_PERMISSIONS,
  payload,
});
/**
 * @method updateUserOktaProfileData
 * Request to update the user data in okta profile.
 * @param userData {Object} The user data to update.
 * TODO: Add unit testing
 * @return {void}
 */
export const updateUserOktaProfileData = (userData) => (dispatch) => {
  let params;
  const password = getValueIfExists(() => userData.credentials.password, {});
  const mobilePhone = getValueIfExists(
    () => userData.profile.mobilePhone,
    null
  );
  if (Object.keys(password).length > 0) {
    params = password;
  }

  if (mobilePhone) {
    params = {
      profile: {
        mobilePhone,
      },
    };
  }
  const apiUrl = `${endpointFormatter('updateUserOktaProfile')}`;

  const onSuccess = () =>
    Object.keys(password).length > 0
      ? setUserOktaPasswordState(true)
      : userOktaProfileDataSuccess(mobilePhone);

  dispatch(
    apiRequest(
      () => doPost(apiUrl, params),
      onSuccess,
      setUpdateOktaProfileFail
    )
  );
};

/**
 * @method getUserRoleConfig
 * Retrieves the high-level role from the user profile
 * @return {void}
 */
export const getUserRoleConfig = (user) => (dispatch) => {
  const apiUrl = `${endpointFormatter('fetchUserRoleConfig')}`;
  dispatch(
    apiRequest(
      () => doGet(apiUrl),
      setUserRoleConfig,
      setUserRoleConfigFail(user)
    )
  );
};

export const getUserAppConfig = () => (dispatch) => {
  const apiUrl = `${endpointFormatter('fetchUserAppConfig')}`;
  dispatch(apiRequest(() => doGet(apiUrl), setUserAppConfig, null));
};
