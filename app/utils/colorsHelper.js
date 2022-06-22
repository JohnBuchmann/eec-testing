import { Colors } from 'Theme';
import { propertyExist } from './propertyValidation';

/**
 * getColorChartKey
 * Get Color Chart Key
 * @param {string} key Key to get the color
 */
export const getColorChartKey = (key) => {
  let response = '';

  const colorKey = propertyExist(() => key) ? key.toUpperCase() : '';

  switch (colorKey) {
    case 'JANUARY':
    case 'JAN':
    case 'TUESDAY':
    case 'TUE':
    case 'BATTERY POWER':
    case 'FACILITY USE':
    case 'RUNNING':
      response = Colors.stJohn;
      break;

    case 'MARCH':
    case 'MAR':
    case 'MONDAY':
    case 'MON':
    case 'TOTAL PRODUCTION':
    case 'ESS AT MAX':
      response = Colors.pacificBlue;
      break;

    case 'DECEMBER':
    case 'DEC':
    case 'WEDNESDAY':
    case 'WED':
    case 'WIND':
      response = Colors.christine;
      break;

    case 'APRIL':
    case 'APR':
    case 'THURSDAY':
    case 'THU':
    case 'SOLAR':
    case 'NET LOAD - 1 MINUTE':
    case 'CUSTOMER DEMAND':
    case 'SOC':
    case 'PLANNED OUTAGE':
      response = Colors.thunderbird;
      break;

    case 'MAY':
    case 'FRIDAY':
    case 'FRI':
    case 'MICROTURBINE':
      response = Colors.goldenDream;
      break;

    case 'FEBRUARY':
    case 'FEB':
    case 'SATURDAY':
    case 'SAT':
    case 'ENERGY PROVIDED BY THE GRID':
    case 'ESS IN USE':
      response = Colors.olivine;
      break;

    case 'JULY':
    case 'JUL':
    case 'SUNDAY':
    case 'SUN':
    case 'RECIPROCATING ENGINE':
      response = Colors.bostonBlue;
      break;

    case 'JUNE':
    case 'JUN':
    case 'AVERAGE NET LOAD - 15 MINUTES':
    case 'ESS LOSSES':
    case 'ESS AT MIN':
      response = Colors.eucalyptus;
      break;

    case 'OCTOBER':
    case 'OCT':
      response = Colors.black;
      break;

    case 'NOVEMBER':
    case 'NOV':
      response = Colors.cadillac;
      break;

    case 'SEPTEMBER':
    case 'SEP':
      response = Colors.cancan;
      break;

    case 'AUGUST':
    case 'TOTAL CUSTOMER LOAD':
    case 'AUG':
      response = Colors.buccaneer;
      break;

    default:
      response = Colors.black;
  }

  return response;
};

/**
 * getStackedBarChartColors
 * Get Color Chart Key for stacked bar char
 * @param {Array} chartData An array with relation between name and color assigned
 */
export const getStackedBarChartColors = (chartData) => {
  const barColors = [];

  if (chartData) {
    chartData.forEach((item) => {
      item.values.forEach((value) => {
        value.forEach((option) => {
          if (barColors.findIndex((color) => color.name === option.name) < 0) {
            barColors.push({
              name: option.name,
              color: getColorChartKey(option.name),
            });
          }
        });
      });
    });
  }

  return barColors;
};

/**
 * getLinesChartChartColors
 * Get Color Chart Key for lines char
 * @param {Array} chartData An array with relation between group and color assigned
 */
export const getLinesChartChartColors = (chartData) => {
  const groupLines = [];

  if (chartData) {
    chartData.forEach((item) => {
      if (groupLines.findIndex((color) => color.group === item.group) < 0) {
        groupLines.push({
          group: item.group,
          color: getColorChartKey(item.group),
        });
      }
    });
  }

  return groupLines;
};

/**
 * getDonutChartColors
 * Get Color Chart Key for donut chart
 * @param {Array} chartData An array with name and value to map the color
 */
export const getDonutChartColors = (chartData) => {
  const barColors = [];
  if (chartData && Array.isArray(chartData)) {
    chartData.forEach((item) => {
      if (barColors.findIndex((color) => color.name === item.name) < 0) {
        barColors.push({
          name: item.name,
          color: getColorChartKey(item.name),
        });
      }
    });
  }

  return barColors;
};

/**
 * getScatterplotChartColors
 * Get Color Chart Key for lines char
 * @param {Array} chartData An array with relation between group and color assigned
 */
export const getScatterplotChartColors = (chartData) => {
  const groupLines = [];

  if (chartData) {
    chartData.forEach((item) => {
      if (groupLines.findIndex((color) => color.group === item.group) < 0) {
        groupLines.push({
          group: item.group,
          color: getColorChartKey(item.group),
        });
      }
    });
  }
  return groupLines;
};

/*
 * setPercentagesDisplayValues
 * Set into displayValue percentage for the total coming on the chartData
 * @param {Array} chartData An array with value to set display percentages values
 */
export const setPercentagesDisplayValues = (chartData) => {
  if (chartData && Array.isArray(chartData)) {
    const initialValue = 0;
    const totalAmount = chartData.reduce(
      (total, currentValue) => total + currentValue.value,
      initialValue
    );

    if (totalAmount) {
      return chartData.map((chartDataItem) => ({
        ...chartDataItem,
        displayValue: `${parseFloat(
          (chartDataItem.value * 100) / totalAmount
        ).toFixed(1)}%`,
      }));
    }
  }
  return chartData;
};
