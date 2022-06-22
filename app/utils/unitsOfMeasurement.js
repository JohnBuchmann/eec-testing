import { getValueIfExists } from 'Utils/propertyValidation';

import {
  ScaleSymbol,
  UnitMeasurementSymbol,
  ScaleValues,
} from 'Utils/enums/unitMeasurement';
import { formatSI } from 'Utils/systemDiagram';

/**
 * Enum for temperature unit measure
 */
export const temperatureUnitsId = {
  Celsius: 1,
  Fahrenheit: 2,
};
/**
 * Enum for temperature unit measure label
 */
export const temperatureUnitsLabel = {
  Celsius: 'C',
  Fahrenheit: 'F',
};

/*
 * getTemperatureUnitLabel
 * Get unit measure label for temperature unit
 * @param {number} temperature unit Id
 * @return {string} label for temperature unit
 */
export function getTemperatureUnitLabel(temperatureUnitId) {
  switch (temperatureUnitId) {
    case temperatureUnitsId.Celsius:
      return 'C°';
    case temperatureUnitsId.Fahrenheit:
      return 'F°';
    default:
      return '';
  }
}

/**
 * @method getTemperatureUnitCode
 * Retrieves the label code of measurement for temperature unit
 * @param temperatureUnitId The temperature unit id
 * @return {string}
 */
export function getTemperatureUnitCode(temperatureUnitId) {
  switch (temperatureUnitId) {
    case temperatureUnitsId.Celsius:
      return 'C';
    case temperatureUnitsId.Fahrenheit:
      return 'F';
    default:
      return '';
  }
}

/**
 * @method temperatureGradesConverter
 * Converts the temperature grades from one C to F or F to C.
 * @param item The item data to convert
 * @return {object}
 */
const temperatureGradesConverter = (item) => {
  const temperatureType = getValueIfExists(() => item.units, null);
  const temperatureData = getValueIfExists(() => item.value, null);
  const offset = temperatureType === temperatureUnitsLabel.Celsius ? 32 : -32;
  const result = (temperatureData * 9) / 5 + offset;

  const value = Number.isInteger(result)
    ? result.toString()
    : result.toFixed(2);

  const units =
    temperatureType === temperatureUnitsLabel.Celsius
      ? getTemperatureUnitLabel(temperatureUnitsId.Fahrenheit)
      : getTemperatureUnitLabel(temperatureUnitsId.Celsius);

  return {
    value,
    units,
  };
};

/**
 * @method formatTemperatureData
 * Generates the format to display the item temperature based on settings.
 * @param item The item data to convert
 * @param settings The User settings saved
 * @return {string}
 */
export const formatTemperatureData = (item, settings) => {
  const userTemperatureSettings = getValueIfExists(
    () => settings.unitMeasurementId,
    null
  );
  const settingsCode = getTemperatureUnitCode(userTemperatureSettings);
  const units = getValueIfExists(() => item.units, null);
  if (!units) {
    return item;
  }

  if (units !== settingsCode) {
    const temperatureDataConverted = temperatureGradesConverter(item);
    Object.assign(item, {
      ...item,
      units: getValueIfExists(() => temperatureDataConverted.units, null),
      value: getValueIfExists(() => temperatureDataConverted.value, null),
    });
  } else if (units === settingsCode) {
    const temperatureLabel = getTemperatureUnitLabel(userTemperatureSettings);
    const format = `${temperatureLabel}`;
    Object.assign(item, {
      ...item,
      units: format,
    });
  }
  return item;
};

export const getTextValues = (labelDecimalsACT, gridFlow, maxPowerRating) => {
  const labelDecimals = 1;

  const dcBusFlowValue = getValueIfExists(() => gridFlow, 0);
  const maxPowerRatingValue = getValueIfExists(() => maxPowerRating, 0);

  const maxPowerRatingText = `${formatSI(
    maxPowerRatingValue,
    ScaleSymbol.Kilo,
    labelDecimals,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watt}`;

  const gridLoadBusText = `${formatSI(
    dcBusFlowValue,
    ScaleSymbol.Kilo,
    labelDecimalsACT,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watt}`;

  return { maxPowerRatingText, gridLoadBusText };
};
