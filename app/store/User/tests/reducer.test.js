import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import {
  storeUser,
  setUserPolicy,
  setTermsAndConditions,
  setUserOktaPasswordState,
  setUserRoleConfig,
  setUserRoleConfigFail,
  setUserAppConfig,
  setUserPermissions,
} from '../actions';
import userReducer from '../userReducer';

const defaultState = {
  user: {},
  permissions: {},
  policy: {},
  config: {},
};

describe('User Reducer', () => {
  let undefinedData;
  it('return initial state', () => {
    expect(userReducer(undefinedData, {})).toEqual(defaultState);
  });

  it('should dispatch storeUser', () => {
    const expected = {
      ...defaultState,
      user: userLogin,
    };
    const actual = userReducer(defaultState, storeUser(userLogin));
    expect(actual).toEqual(expected);
  });

  it('should dispatch setUserPolicy', () => {
    const mockData = {
      active: true,
      consentEffectiveDate: '2022-09-15 12:00:00',
      consentTimestamp: '2021-04-05 16:07:44',
    };
    const expected = {
      ...defaultState,
      policy: mockData,
    };
    const actual = userReducer(defaultState, setUserPolicy(mockData));
    expect(actual).toEqual(expected);
  });

  it('should dispatch setTermsAndConditions', () => {
    const mockData = '2022-09-15 12:00:00';
    const expected = {
      ...defaultState,
      user: {
        ...defaultState.user,
        termsAndCondition: mockData,
      },
    };
    const actual = userReducer(defaultState, setTermsAndConditions(mockData));
    expect(actual).toEqual(expected);
  });

  it('should dispatch setUserOktaPasswordState', () => {
    const mockData = true;
    const expected = {
      ...defaultState,
      user: {
        ...defaultState.user,
        oktaSuccessPassword: mockData,
      },
    };
    const actual = userReducer(
      defaultState,
      setUserOktaPasswordState(mockData)
    );
    expect(actual).toEqual(expected);
  });

  it('should dispatch setUserRoleConfig', () => {
    const mockData = { role: 'DCentriQ_ICIAN' };
    const expected = {
      ...defaultState,
      user: {
        ...defaultState.user,
        role: mockData.role,
      },
    };
    const actual = userReducer(defaultState, setUserRoleConfig(mockData));
    expect(actual).toEqual(expected);
  });
  it('should dispatch setUserRoleConfigFail and return the last role', () => {
    const mockData = ['DCentriQ_SSO', 'DCentriQ_ICIAN'];
    const defaultStateRoles = {
      ...defaultState,
      user: {
        roles: mockData,
      },
    };
    const expected = {
      ...defaultState,
      user: {
        ...defaultState.user,
        roles: mockData,
        role: mockData[1],
      },
    };
    const actual = userReducer(
      defaultStateRoles,
      setUserRoleConfigFail(defaultStateRoles.user)
    );
    expect(actual).toEqual(expected);
  });

  it('should dispatch setUserAppConfig and store the app settings', () => {
    const allowSiteWriteBack = `allow_live_site_writeback`;
    const mockData = {
      [`${allowSiteWriteBack}`]: false,
    };
    const expected = {
      ...defaultState,
      config: mockData,
    };
    const actual = userReducer(defaultState, setUserAppConfig(mockData));
    expect(actual).toEqual(expected);
  });

  it('should dispatch setUserPermissions and store user permissions', () => {
    const mockData = userPermissions;
    const expected = {
      ...defaultState,
      permissions: userPermissions,
    };
    const actual = userReducer(defaultState, setUserPermissions(mockData));
    expect(actual).toEqual(expected);
  });
});
