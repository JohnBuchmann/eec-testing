import { userLogin } from 'Internals/mocks/userLogin';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  storeUser,
  fetchUserPolicyStart,
  fetchUserPolicy,
  setUserPolicy,
  fetchUserPolicyFail,
  setTermsAndConditions,
  setTermsAndConditionsFail,
  setUserOktaPasswordState,
  setUserRoleConfig,
  setUserRoleConfigFail,
  setUserAppConfig,
  setUserPermissions,
  updateUserOktaProfileData,
  userOktaProfileDataSuccess,
  setUpdateOktaProfileFail,
  getUserRoleConfig,
  getUserAppConfig,
  postUserSessionLogoutEvent,
  postUserSessionLoginEvent,
  updateUserPolicy,
  getUserPolicy,
} from '../actions';
import {
  STORE_USER,
  FETCH_USER_POLICY_START,
  FETCH_USER_POLICY,
  SET_USER_POLICY,
  FETCH_USER_POLICY_FAIL,
  UPDATE_TERMS_AND_CONDITIONS,
  UPDATE_TERMS_AND_CONDITIONS_FAIL,
  UPDATE_USER_PASSWORD_OKTA,
  SET_USER_ROLE_CONFIG,
  SET_USER_ROLE_CONFIG_FAIL,
  SET_USER_APP_CONFIG,
  SET_USER_PERMISSIONS,
  UPDATE_USER_PROFILE_OKTA,
  UPDATE_USER_PROFILE_OKTA_FAIL,
} from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('User Actions', () => {
  it('should create an action to store user', () => {
    const expected = {
      type: STORE_USER,
      user: userLogin,
    };

    const actual = storeUser(userLogin);

    expect(actual).toEqual(expected);
  });

  it('should call action fetchUserPolicyStart to start fetch user policy', () => {
    const expected = {
      type: FETCH_USER_POLICY_START,
    };

    const actual = fetchUserPolicyStart();

    expect(actual).toEqual(expected);
  });

  it('should call action fetchUserPolicy to fetch user policy', () => {
    const expected = {
      type: FETCH_USER_POLICY,
    };

    const actual = fetchUserPolicy();

    expect(actual).toEqual(expected);
  });

  it('should call action setUserPolicy to set user policy', () => {
    const mockData = {
      active: true,
      consentEffectiveDate: '2022-09-15 12:00:00',
      consentTimestamp: '2021-04-05 16:07:44',
    };
    const expected = {
      type: SET_USER_POLICY,
      payload: mockData,
    };

    const actual = setUserPolicy(mockData);

    expect(actual).toEqual(expected);
  });

  it('should call action fetchUserPolicyFail to fail and return error', () => {
    const mockData = {
      error: 'error',
    };
    const expected = {
      type: FETCH_USER_POLICY_FAIL,
      payload: mockData,
    };

    const actual = fetchUserPolicyFail(mockData);

    expect(actual).toEqual(expected);
  });

  it('should call action setTermsAndConditions to set terms and conditions user data', () => {
    const mockData = {
      consentEffectiveDate: '2022-09-15 12:00:00',
    };
    const expected = {
      type: UPDATE_TERMS_AND_CONDITIONS,
      payload: mockData,
    };

    const actual = setTermsAndConditions(mockData);

    expect(actual).toEqual(expected);
  });

  it('should call action setTermsAndConditionsFail to fail and return error', () => {
    const mockData = {
      error: 'error',
    };
    const expected = {
      type: UPDATE_TERMS_AND_CONDITIONS_FAIL,
      payload: mockData,
    };

    const actual = setTermsAndConditionsFail(mockData);

    expect(actual).toEqual(expected);
  });

  it('should call action setUserOktaPasswordState to set new user okta password', () => {
    const mockData = true;
    const expected = {
      type: UPDATE_USER_PASSWORD_OKTA,
      payload: mockData,
    };
    const actual = setUserOktaPasswordState(mockData);

    expect(actual).toEqual(expected);
  });

  it('should call action setUserRoleConfig to set the role received', () => {
    const mockData = { role: 'DCentriQ_ICIAN' };
    const expected = {
      type: SET_USER_ROLE_CONFIG,
      payload: mockData.role,
    };
    const actual = setUserRoleConfig(mockData);

    expect(actual).toEqual(expected);
  });

  it('should call action setUserRoleConfigFail to set a default role with the last role in store', () => {
    const mockData = ['DCentriQ_SSO', 'DCentriQ_ICIAN'];
    const userMockData = {
      roles: mockData,
    };
    const expected = {
      type: SET_USER_ROLE_CONFIG_FAIL,
      payload: mockData[1],
    };
    const actual = setUserRoleConfigFail(userMockData);

    expect(actual).toEqual(expected);
  });

  it('should call action setUserAppConfig to set a default app settings', () => {
    const allowSiteWriteBack = `allow_live_site_writeback`;
    const mockData = {
      [`${allowSiteWriteBack}`]: false,
    };
    const expected = {
      type: SET_USER_APP_CONFIG,
      payload: mockData,
    };
    const actual = setUserAppConfig(mockData);
    expect(actual).toEqual(expected);
  });

  it('should call action setUserPermissions to set user permissions', () => {
    const mockData = {
      live: {},
      emulated: {},
    };
    const expected = {
      type: SET_USER_PERMISSIONS,
      payload: mockData,
    };

    const actual = setUserPermissions(mockData);

    expect(actual).toEqual(expected);
  });

  it('should call action updateUserOktaProfileData  to set new password', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const mockData = {
      credentials: { password: '123456' },
    };
    store.dispatch(updateUserOktaProfileData(mockData));
    const expected = '[API] API';
    const actual = store.getActions()[0].type;
    expect(actual).toEqual(expected);
  });

  it('should call action updateUserOktaProfileData  to set new phone number', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const mockData = {
      profile: { mobilePhone: '5555555555' },
    };
    store.dispatch(updateUserOktaProfileData(mockData));
    const expected = '[API] API';
    const actual = store.getActions()[0].type;
    expect(actual).toEqual(expected);
  });

  it('should call action userOktaProfileDataSuccess', () => {
    const phoneMock = '5555555555';
    const expected = {
      type: UPDATE_USER_PROFILE_OKTA,
      payload: phoneMock,
    };

    const actual = userOktaProfileDataSuccess(phoneMock);

    expect(actual).toEqual(expected);
  });

  it('should call action setUpdateOktaProfileFail and input error password', () => {
    const passwordMock = 'error password';
    const errorMock = {
      response: {
        data: { errors: {} },
      },
    };
    errorMock.response.data.errors[`Messages Exceptions`] = [passwordMock];
    const expected = {
      type: UPDATE_USER_PROFILE_OKTA_FAIL,
      payload: { type: 'password', message: passwordMock },
    };
    const actual = setUpdateOktaProfileFail(errorMock);

    expect(actual).toEqual(expected);
  });

  it('should call action setUpdateOktaProfileFail and input error phone number', () => {
    const phoneMock = 'error phone number';
    const errorMock = {
      response: {
        data: { errors: {} },
      },
    };
    errorMock.response.data.errors[`Messages Exceptions`] = [phoneMock];
    const expected = {
      type: UPDATE_USER_PROFILE_OKTA_FAIL,
      payload: { type: 'mobilePhone', message: phoneMock },
    };
    const actual = setUpdateOktaProfileFail(errorMock);

    expect(actual).toEqual(expected);
  });

  it('should call action getUserRoleConfig', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const mockData = () => {};
    store.dispatch(getUserRoleConfig(mockData));
    const expected = '[API] API';
    const actual = store.getActions()[0].type;
    expect(actual).toEqual(expected);
  });

  it('should call action getUserAppConfig', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const mockData = () => {};

    store.dispatch(getUserAppConfig(mockData));
    const expected = '[API] API';
    const actual = store.getActions()[0].type;
    expect(actual).toEqual(expected);
  });

  it('should call action postUserSessionLogoutEvent', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const mockData = () => {};
    store.dispatch(postUserSessionLogoutEvent(mockData));
    const expected = '[API] API';
    const actual = store.getActions()[0].type;
    expect(actual).toEqual(expected);
  });

  it('should call action postUserSessionLoginEvent', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const mockData = () => {};
    store.dispatch(postUserSessionLoginEvent(mockData));
    const expected = '[API] API';
    const actual = store.getActions()[0].type;
    expect(actual).toEqual(expected);
  });

  it('should call action updateUserPolicy', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const mockData = () => {};
    store.dispatch(updateUserPolicy(mockData));
    const expected = '[API] API';
    const actual = store.getActions()[0].type;
    expect(actual).toEqual(expected);
  });

  it('should call action getUserPolicy', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const mockData = () => {};
    store.dispatch(getUserPolicy(mockData));
    const expected = FETCH_USER_POLICY_START;
    const actual = store.getActions()[0].type;
    expect(actual).toEqual(expected);
  });
});
