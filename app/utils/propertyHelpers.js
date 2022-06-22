import { regex } from 'Utils/enums/regularExpressions';
import { stringIsNullOrEmpty, getValueIfExists } from './propertyValidation';

/**
 * replaceStringByKeys
 * @param {string} stringToBeReplaced string value with the values to be replaced
 * @param {object} keysToReplace inputs to replace format key: value
 * @return {string}
 */
export const replaceStringByKeys = (stringToBeReplaced, keysToReplace) => {
  let formattedString = stringToBeReplaced;

  if (formattedString && keysToReplace) {
    Object.keys(keysToReplace).forEach((key) => {
      formattedString = formattedString.replace(
        `{${key}}`,
        keysToReplace[`${key}`]
      );
    });
  }
  return formattedString;
};

/**
 * truncate it will return an string with the maximum number of requested characters
 * @param {string} text string to be truncated.
 * @param {number} maxCharacters maximum number of allowed characters.
 * @param {boolean} ellipsisRequired by default true, set if ellipsis ('...') is going to be set in case this truncates text
 * @return {string}
 */
export const truncate = (text, maxCharacters, ellipsisRequired = true) => {
  if (text && maxCharacters) {
    const ellipsisCode = ellipsisRequired ? '...' : '';
    return text.length > maxCharacters
      ? `${text.substr(0, maxCharacters)}${ellipsisCode}`
      : text;
  }
  return text;
};

/**
 * getDefaultValueDropDown
 * Gets a text from the given array based on the Id to find
 * @param {Array} arrayData Array to get the value
 * @param {number} itemIdToFind item id to get form the given array.
 * @returns {String} a value get from the arrayData if found otherwise it will be empty
 */
export const getDefaultValueDropDown = (arrayData, itemIdToFind) => {
  if (arrayData && arrayData.length) {
    const itemFound = arrayData.find((item) => item.value === itemIdToFind);
    const indexFound = arrayData.indexOf(itemFound);
    const indexToSend = indexFound >= 0 ? indexFound : 0;
    return arrayData[`${indexToSend}`].text;
  }
  return '';
};

/**
 * @method getPointByName
 * It will give you the point from the require point name
 * @param {array} points array of points to search
 * @param {string} pointName is an string that represents the Id for the point name
 * @return {object} Returns the point from the array of points
 */
export const getPointByName = (points, pointName) => {
  let valuePoint;
  if (points && points.length) {
    return points.find((point) => point.name === pointName);
  }
  return valuePoint;
};

/**
 * getCamelCase
 * It returns a camelCase string base on the input
 * @param {string} input a string to convert into camelCase
 * @returns {string} "Camel Case" to "camelCase"
 */
export const getCamelCase = (input) => {
  const wordExpression = /(?:^\w|[A-Z]|\b\w)/g;
  const spaceRemoveRegularExpression = /\s+/g;
  return input
    .replace(wordExpression, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(spaceRemoveRegularExpression, '');
};

/**
 * convertToAsterisk
 * Get an string and returns the same length of *
 * @param {string} text string to be converted to *
 * @returns {string} a string full of *
 */
export const convertToAsterisk = (text) => {
  if (!stringIsNullOrEmpty(text)) {
    const allLettersRegularExp = /./g;
    return text.replace(allLettersRegularExp, '*');
  }
  return '';
};

/**
 * @method formatPhoneNumber
 * Handle format phone number validating if exist property to return phone number formatted,
 * else return notAvailableData variable
 * @param {number} phoneNumber receives phoneNumber property
 * @param {any} notAvailable receives notAvailable to response when is empty input phoneNumber
 * @returns {any}
 */
export const formatPhoneNumber = (phoneNumber, notAvailable = null) => {
  if (getValueIfExists(() => phoneNumber)) {
    const limitDigits = 10;
    const cleanedPhone = phoneNumber.replace(regex.onlyNumbers, '');
    const phone = cleanedPhone.substr(cleanedPhone.length - limitDigits);
    const match = phone.match(regex.phoneNumber);
    // Validate if match with phone number format (XXX)XXX-XXXX
    if (match) {
      return `(${match[1]})${match[2]}-${match[3]}`;
    }
  }
  return notAvailable;
};

/**
 * @method stringToFloat
 * Converts  string to number if it is not valid returns zero
 * @param {string} value to transform to number
 * @returns {number}
 */
export const stringToFloat = (value) =>
  Number.isNaN(Number.parseFloat(value)) ? 0 : Number.parseFloat(value);
