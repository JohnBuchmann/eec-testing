/**
 * Okta configuration
 * General reference - https://github.com/okta/okta-signin-widget
 * Login properties reference - https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/src/properties/login.properties
 */

import { OktaAuth } from '@okta/okta-auth-js';
import { propertyExist, getValueIfExists } from 'Utils/propertyValidation';

const { env } = window;
const clientId = env.authClientId;
const oktaAuthConfig = {
  // Note: If your app is configured to use the Implicit Flow
  // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
  // you will need to add `pkce: false`
  issuer: env.authAuthority,
  clientId,
  redirectUri: env.authRedirectURI,
  tokenManager: {
    storage: 'memory',
  },
  cookies: {
    secure: true,
  },
  storageManager: {
    cache: {
      storageTypes: ['localStorage', 'sessionStorage', 'cookie'],
    },
  },
};

const oktaSignInConfig = {
  baseUrl: env.authBaseUrl,
  clientId,
  redirectUri: env.authRedirectURI,
  authParams: {
    scopes: ['openid', 'email', 'profile', 'address', 'phone', 'mobilePhone'],
  },
  features: {
    rememberMe: false,
    registration: false,
    showPasswordToggleOnSignInPage: true,
    selfServiceUnlock: true,
    idpDiscovery: false,
  },
  language: 'en',
  i18n: {
    en: {
      'primaryauth.title': 'Please Log In',
      'primaryauth.submit': 'Login',
      'primaryauth.username.placeholder': 'Username',
      'primaryauth.password.placeholder': 'Password',
      needhelp: 'Trouble Logging In?',
      forgotpassword: 'Forgot Password?',
      unlockaccount: 'Unlock Account?',
    },
  },
  idps: [
    {
      type: env.idp.type,
      id: env.idp.id,
      text: 'ENTECH/FAITH EMPLOYEE LOGIN',
    },
  ],
  idpDisplay: 'SECONDARY',
};

// OktaAuth working instance
const oktaAuthClient = new OktaAuth(oktaAuthConfig);

/**
 * getAccessAuthToken
 * Method to retrieve the current access authorization token
 * @return {string} current access authorization token from okta
 */
const getAccessAuthToken = () => oktaAuthClient.getAccessToken();

/**
 * updateAuthState
 * Method to update auth state manager from okta auth client
 * @returns {void}
 */
const updateAuthState = () => oktaAuthClient.authStateManager.updateAuthState();

/**
 * refreshAccessToken
 * Method to handle a promise a new access authorization token from okta
 * @return {promise} promise for a new access token
 */
const refreshAccessToken = () =>
  new Promise((resolve, reject) => {
    oktaAuthClient.token
      .renewTokens()
      .then((token) => {
        oktaAuthClient.tokenManager.setTokens(token);
        resolve(token.accessToken);
      })
      .catch((error) => reject(error));
  });

/**
 * refreshAccessToken
 * Method to handle a promise to get user information from okta
 * @return {promise} promise to get user information
 */
const getUser = () =>
  new Promise((resolve) => {
    oktaAuthClient.getUser().then((userClaims) => resolve(userClaims));
  });

/**
 * getUserRoles
 * Method to get user roles of the user authenticated from okta
 * @return {array} user roles array
 */
const getUserRoles = () => {
  const authState = oktaAuthClient.authStateManager.getAuthState();

  return propertyExist(() => authState.accessToken.claims.groups)
    ? authState.accessToken.claims.groups
    : [];
};

/**
 * @method getFirstName
 * Method to get firstName property of the user authenticated from okta
 * @returns {string}
 */
const getFirstName = () => {
  const authState = oktaAuthClient.authStateManager.getAuthState();
  return getValueIfExists(() => authState.accessToken.claims.firstName, '');
};

/**
 * @method getLastName
 * Method to get lastName property of the user authenticated from okta
 * @returns {string}
 */
const getLastName = () => {
  const authState = oktaAuthClient.authStateManager.getAuthState();
  return getValueIfExists(() => authState.accessToken.claims.lastName, '');
};

/**
 * @method getSessionType
 * Method to get sessionType of the user authenticated from okta
 * @returns {string}
 */
const getSessionType = () => {
  const authState = oktaAuthClient.authStateManager.getAuthState();
  return getValueIfExists(() => authState.accessToken.claims.sessionType, null);
};

/**
 * getUserAvatar
 * Method to get user avatar of the user authenticated from okta
 * @return {string} user avatar
 */
const getUserAvatar = () => {
  const authState = oktaAuthClient.authStateManager.getAuthState();

  return propertyExist(() => authState.accessToken.claims.avatar)
    ? authState.accessToken.claims.avatar
    : '';
};
/**
 * getTermsAndConditions
 * Method to get consent from terms and conditions
 * @returns {string}
 */
const getTermsAndConditions = () => {
  const authState = oktaAuthClient.authStateManager.getAuthState();
  return getValueIfExists(
    () => authState.accessToken.claims.consentEffectiveDate,
    ''
  );
};

/**
 * isUserAuthenticated
 * Method to validate if user is already authenticated
 * @return {bool}
 */
const isUserAuthenticated = () =>
  oktaAuthClient.authStateManager.getAuthState().isAuthenticated;

export {
  oktaAuthClient,
  oktaAuthConfig,
  oktaSignInConfig,
  refreshAccessToken,
  getAccessAuthToken,
  getUser,
  getUserRoles,
  getUserAvatar,
  isUserAuthenticated,
  getTermsAndConditions,
  updateAuthState,
  getFirstName,
  getLastName,
  getSessionType,
};
