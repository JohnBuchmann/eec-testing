/**
 * User reducer
 */
import {
  SET_USER_POLICY,
  STORE_USER,
  UPDATE_TERMS_AND_CONDITIONS,
  UPDATE_USER_PROFILE_OKTA,
  UPDATE_USER_PROFILE_OKTA_FAIL,
  UPDATE_USER_PASSWORD_OKTA,
  SET_USER_ROLE_CONFIG,
  SET_USER_ROLE_CONFIG_FAIL,
  SET_USER_APP_CONFIG,
  CLEAN_OKTA_MESSAGES_PASSWORD,
  SET_USER_PERMISSIONS,
} from './types';

const initialState = {
  user: {},
  permissions: {},
  policy: {},
  config: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };
    case SET_USER_POLICY:
      return {
        ...state,
        policy: action.payload,
      };
    case UPDATE_TERMS_AND_CONDITIONS:
      return {
        ...state,
        user: {
          ...state.user,
          termsAndCondition: action.payload,
        },
      };
    case UPDATE_USER_PROFILE_OKTA_FAIL:
      return {
        ...state,
        user: {
          ...state.user,
          oktaErrorMessage: action.payload,
        },
      };
    case UPDATE_USER_PASSWORD_OKTA:
      return {
        ...state,
        user: {
          ...state.user,
          oktaSuccessPassword: action.payload,
        },
      };
    case UPDATE_USER_PROFILE_OKTA:
      return {
        ...state,
        user: {
          ...state.user,
          mobilePhone: action.payload,
        },
      };
    case CLEAN_OKTA_MESSAGES_PASSWORD:
      return {
        ...state,
        user: {
          ...state.user,
          oktaErrorMessage: {},
          oktaSuccessPassword: false,
        },
      };
    case SET_USER_ROLE_CONFIG:
      return {
        ...state,
        user: {
          ...state.user,
          role: action.payload,
        },
      };
    case SET_USER_ROLE_CONFIG_FAIL:
      return {
        ...state,
        user: {
          ...state.user,
          role: action.payload,
        },
      };
    case SET_USER_APP_CONFIG:
      return {
        ...state,
        config: action.payload,
      };
    case SET_USER_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
