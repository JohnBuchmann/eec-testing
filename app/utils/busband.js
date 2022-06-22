import { getValueIfExists } from './propertyValidation';

/**
 * pointOperationStatus
 * Catalog for operation status on points patch
 */
export const pointOperationStatus = {
  Success: 'success',
  Fail: 'fail',
};

/**
 * busBandEditingStatus
 * Catalog for bus band editing status
 */
export const busBandEditingStatus = {
  Available: 'available',
  Unavailable: 'unavailable',
};

/**
 * getModifiedFields
 * Get all modified objects and set into a response format
 * @param {object} originalData
 * @param {object} workingData
 * @param {string} columnNameId
 * @returns {object} an object to send to API with the format
 */
export const getModifiedFieldsFormat = (
  originalData,
  workingData,
  columnNameId
) => {
  let modifiedRequest;
  if (
    columnNameId &&
    Array.isArray(workingData) &&
    Array.isArray(originalData)
  ) {
    const radix = 10;
    // Get the objects with modified value on the workingData compare with originalData.
    const modifiedData = workingData.filter(
      (working, index) =>
        getValueIfExists(() => working[`${columnNameId}`].value) !==
        getValueIfExists(
          () => originalData[parseInt(index, radix)][`${columnNameId}`].value
        )
    );

    // Construct the return object based on modified ones with format { points: [ pointObject ]}
    if (modifiedData && modifiedData.length) {
      modifiedRequest = {
        points: modifiedData.map((editedItem) => editedItem[`${columnNameId}`]),
      };
    }
  }
  return modifiedRequest;
};
