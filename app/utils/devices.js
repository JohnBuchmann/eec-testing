/**
 * Devices helpers
 */
import { DeviceListType } from 'Utils/enums/device';
import { getValueIfExists, propertyExist } from './propertyValidation';

export const allLocationsDefault = 'All Locations';

/**
 * getAllLocations
 * Get from devices list available locations.
 * @param {Array} devicesList Array with location inside
 * @param {String} containerName name to sen on each location element.
 * @returns {Array} an array with all locations based on input
 */
export const getAllLocations = (devicesList = [], containerName = '') => {
  let locations = [];

  if (devicesList.length) {
    const uniqueLocations = new Set(
      devicesList
        .filter((deviceItem) => propertyExist(() => deviceItem.lcmLocation))
        .map((deviceItem) => deviceItem.lcmLocation)
    );

    if (uniqueLocations && uniqueLocations.size) {
      uniqueLocations.delete('undefined');
      locations = [...uniqueLocations].sort().map((lcmLocation) => ({
        value: lcmLocation,
        text: `${containerName} ${lcmLocation}`,
      }));
    }
  }

  locations.unshift({
    value: allLocationsDefault,
    text: allLocationsDefault,
  });

  return locations;
};

/**
 * @method getValueFromSelectedPoint
 * Returns a DeviceListType Id or an empty object.
 * @param {string} deviceGroupId This is a string id to find into the catalog
 * @returns {object} Found device id in DeviceListType
 */
export const findDeviceListTypeById = (deviceGroupId) => {
  const foundDeviceType = DeviceListType.find(
    (deviceType) => deviceType.id === deviceGroupId
  );
  return foundDeviceType || {};
};

/**
 * @method getValueFromSelectedPoint
 * It will give you the value from the require point
 * @param {array} points array of points to search
 * @param {string} pointName is an string that represents the Id for the point name
 * @return {object} Returns the value from the selected point
 */
export const getValueFromSelectedPoint = (points, pointName) => {
  let valuePoint;

  if (getValueIfExists(() => points.length, 0)) {
    const selectedPoint = points.find((point) => point.name === pointName);
    return getValueIfExists(() => selectedPoint.value, valuePoint);
  }

  return valuePoint;
};
