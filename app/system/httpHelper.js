import axios from 'axios';
import { contentTypeCatalogId, getEndpointContentType } from 'Utils/endpoint';
import { HTTP_RESPONSE_UNAUTHORIZED } from 'Utils/enums/http';
import { stringIsNullOrEmpty } from 'Utils/propertyValidation';
import { getAccessAuthToken, refreshAccessToken } from './auth';

const MAX_ATTEMPT_REFRESH_ACCESS_TOKEN = 5;

/**
 * requestHandler
 * Method to handle request data
 * @param {object} request data
 * @return {object} request data updated
 */
const requestHandler = (request) => {
  const token = getAccessAuthToken();
  if (token) {
    request.headers.authorization = `Bearer ${token}`;
    const requestContentType = getEndpointContentType(request.url);
    switch (requestContentType.typeId) {
      case contentTypeCatalogId.multiPart:
        request.headers['Content-Type'] = requestContentType.value;
        break;
      default:
        // nothing to do
        break;
    }
    return request;
  }
  return null;
};

/**
 * successHandler
 * Method to handle success response from http request
 * @param {object} response success response data
 * @return {object} response data
 */
const successHandler = (response) => response.data;

/**
 * errorHandler
 * Method to to handle error response from http request
 * @param {object} error response data
 * @return {object} throw an error
 */
const errorHandler = (error) => {
  const { config, status } = error.response;

  if (status === HTTP_RESPONSE_UNAUTHORIZED) {
    // If we get unauthorized response we need to get a refresh access token and re-call the http request
    config.refreshTokenAttempt = config.refreshTokenAttempt || 0;

    if (config.refreshTokenAttempt < MAX_ATTEMPT_REFRESH_ACCESS_TOKEN) {
      config.refreshTokenAttempt += 1;

      // Refresh access tokens when unauthorized code status is returned
      refreshAccessToken()
        .then(() => {
          axios.request(config);
        })
        .catch((refreshTokenError) => {
          throw refreshTokenError;
        });
    } else {
      throw error;
    }
  } else {
    throw error;
  }
};

/**
 * initializeHttpInterceptors
 * Method to subscribe to axios interceptors
 */
export const initializeHttpInterceptors = () => {
  // Handle request process
  axios.interceptors.request.use((request) => requestHandler(request));

  // Handle response process
  axios.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  );
};

/**
 * doGet
 * Method to call GET request
 * @param {string} url string for http  request
 * @return {object} api promise
 */
export const doGet = (url) => {
  if (stringIsNullOrEmpty(url)) {
    return Promise.reject(new Error('API url is empty'));
  }

  return axios.get(url);
};

/**
 * doPost
 * Method to call POST request
 * @param {string} url string for http  request
 * @param {object} requestPayload Object to update
 * @param {object} config extra config
 * @return {object} api promise
 */
export const doPost = (url, requestPayload, config = {}) => {
  if (stringIsNullOrEmpty(url)) {
    return Promise.reject(new Error('API url is empty'));
  }

  return axios.post(url, requestPayload, config);
};

/**
 * doPut
 * Method to call PUT request
 * @param {string} url string for http  request
 * @param {object} requestPayload Object to update
 * @return {object} api promise
 */
export const doPut = (url, requestPayload) => {
  if (stringIsNullOrEmpty(url)) {
    return Promise.reject(new Error('API url is empty'));
  }

  return axios.put(url, requestPayload);
};

/**
 * doPatch
 * Method to call PATCH request
 * @param {string} url string for http  request
 * @param {object} requestPayload Object to update
 * @return {object} api promise
 */
export const doPatch = (url, requestPayload) => {
  if (stringIsNullOrEmpty(url)) {
    return Promise.reject(new Error('API url is empty'));
  }

  return axios.patch(url, requestPayload);
};

/**
 * doDelete
 * Method to call DELETE request
 * @param {string} url string for http  request
 * @return {object} api promise
 */
export const doDelete = (url) => {
  if (stringIsNullOrEmpty(url)) {
    return Promise.reject(new Error('API url is empty'));
  }

  return axios.delete(url);
};
