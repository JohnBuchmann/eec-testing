import endpoints from './enums/endpoints';
import { replaceStringByKeys } from './propertyHelpers';

// Environment variables
const { env } = window;

export const contentTypeCatalogId = {
  multiPart: 1,
};

export const contentTypeCatalog = {
  multiPart: {
    typeId: contentTypeCatalogId.multiPart,
    value: 'multipart/form-data',
  },
};

/**
 * replaceInputParameters
 * @param {string} endPointValue string value with the values to be replaced
 * @param {object} params inputs to replace format key: value
 */
const replaceInputParameters = (endPointValue, params) =>
  replaceStringByKeys(endPointValue, params);

/**
 * endpointFormatter
 * Validate value resolved exist or not
 * @param {object} endpointConfiguration endpoint configuration object
 * @param {string} endpoint name of endpoint to generate
 * @param {object} params to replace format key: value
 * @return {string} api url formatted
 */
export const endpointFormatter = (endpoint, params = {}) => {
  let url = '';

  let endPointValue = endpoints[`${endpoint}`] || '';

  endPointValue = replaceInputParameters(endPointValue, params);
  url = `${env.domainName || ''}${endPointValue}`;

  return url;
};

/**
 * getEndpointContentType
 * Get content type mapped to endpoint URL
 *
 * @param {string} endpointUrl string value with URL
 * @return {object} object with content type value
 */
export const getEndpointContentType = (endpointUrl) => {
  let endpointContentType = {};

  if (endpointUrl && endpointUrl.includes(endpoints.fetchShareReports)) {
    endpointContentType = contentTypeCatalog.multiPart;
  }

  return endpointContentType;
};
