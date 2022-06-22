/*
 * propertyExist
 * Validate value resolved exist or not
 * @param {function} function to resolve a value
 * @return {boolean} true if value resolved exists otherwise false
 */
export function propertyExist(fn) {
  // Disabling block because try is considered as unnecessary block.
  /* eslint-disable */
  try {
    return fn() !== null && typeof fn() !== 'undefined';
  } catch (error) {
    return false;
  }
  /* eslint-enable */
}

/*
 * stringIsNullOrEmpty
 * Validate value resolved exist or not
 * @param {function} function to resolve a string value
 * @return {boolean} true if string  is null/undefined or empty
 */
export function stringIsNullOrEmpty(stringValue) {
  // Disabling block because try is considered as unnecessary block.
  /* eslint-disable */
  try {
    return !propertyExist(() => stringValue) || stringValue.trim() === '';
  } catch (error) {
    return true;
  }
  /* eslint-enable */
}

/*
 * stringContains
 * Validate if an string contains other string
 * @param {string} value string data to validate
 * @param {string} searchText string to find in string value
 * @param {boolean} caseSensitive indicates if use case sensitive mode
 * @return {boolean} true if searchText is contained on value string otherwise false
 */
export function stringContains(value, searchText, caseSensitive = true) {
  let result = false;

  if (propertyExist(() => value) && propertyExist(() => searchText)) {
    const stringValue = caseSensitive ? value : value.toLowerCase();
    const searchValue = caseSensitive ? searchText : searchText.toLowerCase();

    result = stringValue.includes(searchValue);
  }

  return result;
}

/**
 * firstElement returns the first not undefined element on the array
 * @param {Array} array array to get the fisrt available element.
 */
export const firstElement = (array) => {
  if (Array.isArray(array)) {
    return array.find((element) => !!element);
  }
  let dataUndefined;
  return dataUndefined;
};

/**
 * getValueIfExists returns the elements if exist otherwise returns undefined
 * @param {Function} fnValue a function to evaluate and if it exists return the value
 * @param {Object} defaultValue default value to return if function value does not exist
 * @returns fnValue or defaultValue
 */
export const getValueIfExists = (fnValue, defaultValue) =>
  propertyExist(fnValue) ? fnValue() : defaultValue;

/**
 * isNumeric
 * It returns if value is numeric, validate null, boolean type, empty, isNaN
 * @param {object} value value to be evaluated.
 * @returns {boolean}
 */
export const isNumeric = (value) =>
  // eslint-disable-next-line
  !stringIsNullOrEmpty(value) && typeof value !== 'boolean' && !isNaN(value);

/**
 * getSites
 * It returns formatted site list from the customer list
 * @param {array} value value to be evaluated.
 * @returns {array}
 */
export const getSites = (
  customersList,
  selectedStatus,
  selectedCustomers,
  selectedAreas,
  selectedSites
) => {
  const allCustomerOptions = {
    herarchyLevel: 2,
    text: 'All',
    value: 0,
  };

  const allAreaOptions = {
    herarchyLevel: 3,
    text: 'All',
    value: 0,
  };

  const allLocationOptions = {
    herarchyLevel: 4,
    text: 'All',
    value: 0,
  };
  const customersOptions = [];
  const areasOptions = [];
  const sitesOptions = [];
  const formattedSitesList = [];
  customersList.forEach((customer) => {
    const { companyName, customerId } = customer;
    const customerObject = {
      customerId,
      companyName,
      text: companyName,
      herarchyLevel: 2,
      value: customerId,
      assignedUsers: customer.assignedUsers,
    };
    customersOptions.push(customerObject);
    if (
      selectedCustomers.length > 0
        ? selectedCustomers.includes(Number(customer.customerId))
        : selectedCustomers
    ) {
      customer.areas.forEach((areaElement) => {
        const areaObject = {
          areaName: `${customerObject.companyName} - ${areaElement.areaName}`,
          areaId: areaElement.areaId,
          text: `${customerObject.companyName} - ${areaElement.areaName}`,
          value: areaElement.areaId,
          herarchyLevel: 3,
          assignedUsers: areaElement.assignedUsers,
        };
        areasOptions.push(areaObject);

        if (
          selectedAreas.length > 0
            ? selectedAreas.includes(areaObject.areaId)
            : selectedAreas
        ) {
          areaElement.locations.forEach((location) => {
            const { locationId, locationName } = location;
            const locationObject = {
              locationId,
              locationName,
              areaName: areaObject.areaName,
              text: locationName,
              herarchyLevel: 4,
              value: locationId,
              assignedUsers: location.assignedUsers,
            };
            sitesOptions.push(locationObject);
            if (
              selectedSites.length > 0
                ? selectedSites.includes(Number(locationObject.locationId))
                : selectedSites
            ) {
              location.assets.forEach((asset) => {
                if (
                  selectedStatus.length > 0
                    ? selectedStatus.includes(Number(asset.siteStatus)) ||
                      selectedStatus.includes(asset.siteCommStatusSymbolName)
                    : selectedStatus
                ) {
                  const newAsset = {
                    ...asset,
                    companyName: customerObject.companyName,
                    areaName: areaObject.areaName,
                    locationName: locationObject.locationName,
                  };
                  formattedSitesList.push(newAsset);
                }
              });
            }
          });
        }
      });
    }
  });

  customersOptions.unshift(allCustomerOptions);
  areasOptions.unshift(allAreaOptions);
  sitesOptions.unshift(allLocationOptions);

  return { formattedSitesList, customersOptions, areasOptions, sitesOptions };
};
