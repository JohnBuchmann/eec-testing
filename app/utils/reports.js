import * as _ from 'lodash';
import moment from 'moment';
import { IntervalCatalog } from 'Utils/enums/interval';
import { formatSI } from 'Utils/systemDiagram';
import { ScaleValues, ScaleSymbol } from 'Utils/enums/unitMeasurement';
import {
  AutoScale,
  ReportTypesId,
  ScaleTypesId,
  PowerScale,
} from 'Utils/enums/report';
import messages from '../containers/Charting/messages';
import { getValueIfExists } from './propertyValidation';

const defaultYTitle = 'yAxisTitle';

const chartByDaySettings = {
  offsetLabels: 20,
  xAxisTitleMarginTop: 10,
  xAxisLabelRotate: 45,
  xAxisLabelMarginTop: 8,
  xAxisLabelMarginLeft: 10,
};
/**
 * Twelve Hours Limit
 */
const twelveHoursLimit = 12;
/**
 * Minutes Limit
 */
const minutesLimit = 60;
/**
 * Moths Limit to backwards
 */
const mothsLimit = 36;
/**
 * Years Limit to backwards
 */
const yearsLimit = 3;
/**
 * Report Types catalog
 */
export const reportTypes = [
  {
    id: ReportTypesId.Facility,
    name: 'Facility Usage vs. Production',
  },
  {
    id: ReportTypesId.Energy,
    name: 'Energy Production',
  },
  {
    id: ReportTypesId.ESS,
    name: 'ESS State',
  },
  {
    id: ReportTypesId.VehicleAndFleet,
    name: 'Vehicle and Fleet Loads',
  },
  {
    id: ReportTypesId.Monthly,
    name: 'Monthly Report',
  },
];

/**
 * getReportTypesSelectOptions
 * Transform Report Types catalog into dropdown structure, and validate if resetFilters
 * has a "true" value to delete Monthly Report the last row. The validation apply for only display
 * the monthly reports on site/reports and no in report generals, this because affect performance on
 * the endpoints load many data and the monthly report is focus on one site.
 * @param {boolean} resetFilters receives resetFilter variable
 * @return {Array} Report Types dropdown options
 */
export const getReportTypesSelectOptions = (resetFilters = false) => {
  const reportTypesClone = _.clone(reportTypes);
  if (resetFilters) {
    // Delete Monthly Report the last row
    delete reportTypesClone[reportTypesClone.length - 1];
  }
  return reportTypesClone.map((reportType) => ({
    value: reportType.id,
    text: reportType.name,
  }));
};

/**
 * getXTitle
 * Transform xAxisTitle depending interval and return text from messages
 * @param {func} formatMessage receives formatMessage function to format messages
 * @param {string} interval receives interval from search data
 * @returns string
 */
export const getXTitle = (formatMessage, interval) => {
  switch (interval) {
    case IntervalCatalog.day:
      return formatMessage(messages.xAxisTitleHours);
    case IntervalCatalog.month:
      return formatMessage(messages.xAxisTitleDays);
    case IntervalCatalog.quarter:
      return formatMessage(messages.xAxisTitleWeeks);
    case IntervalCatalog.year:
      return formatMessage(messages.xAxisTitleMonths);
    default:
      return '';
  }
};
/**
 * @method getYTitle
 * Transform yAxisTitle depending interval validating if have scale "Auto":
 * - If have maxValue more than 100000 set to variable teh value "GWh"
 * - If have maxValue more than 1000 set to variable teh value "MWh"
 * - If have maxValue less than 1000 set to variable teh value "kWh"
 * else have another scale return value from ScaleTypesId position
 * @param {func} formatMessage receives formatMessage function to format messages
 * @param {string} scale receives scale from search data
 * @param {number} maxValue receives max value from data
 * @param {string} yAxisTitle receives y axis title
 * @returns string
 */
export const getYTitle = (
  formatMessage,
  scale,
  maxValue = 0,
  yAxisTitle = defaultYTitle
) => {
  const typeScale = yAxisTitle === defaultYTitle ? AutoScale : PowerScale;
  let scaleTitle = typeScale.kw;
  if (scale === ScaleTypesId.Auto) {
    if (maxValue >= ScaleValues.Giga) {
      scaleTitle = typeScale.gw;
    } else if (maxValue >= ScaleValues.Mega) {
      scaleTitle = typeScale.mw;
    }
  } else {
    scaleTitle = ScaleTypesId[`${scale}`];
  }
  return `${formatMessage(messages[`${yAxisTitle}`])} (${scaleTitle})`;
};

/**
 * @method scaledFormatYAxis
 * Handle format to display depending the value dividing when is GW, MW, KW or W the values,
 * but if the interval have value or isn't GW, MW, KW or W  should display normal value
 * @param {number} intervalValue receives interval value
 * @param {number} maxValue receives maxValue from data
 * @param {number} value receives Y value
 * @returns {number}
 */
export const scaledFormatYAxis = (intervalValue, maxValue, value) => {
  if (maxValue > ScaleValues.Giga && !intervalValue) {
    return formatSI(value, ScaleSymbol.Giga, null, ScaleValues.Kilo, false);
  }
  if (maxValue > ScaleValues.Mega && !intervalValue) {
    return formatSI(value, ScaleSymbol.Mega, null, ScaleValues.Kilo, false);
  }
  return formatSI(value, ScaleSymbol.Kilo, null, ScaleValues.Kilo, false);
};

/**
 * getTimePeriodTitle
 * Transform timePeriod depending interval and return timePeriod with format
 * @param {object} params receives search params
 * @param {string} params.quarter receives quarter param
 * @param {string} params.timePeriod receives time period param
 * @param {object} params.interval receives interval type param
 * @returns string
 */
export const getTimePeriodTitle = (params) => {
  const {
    quarter,
    timePeriod,
    interval = {},
    timePeriodSelected = {},
  } = params;
  const timePeriodValue = timePeriod || moment().format('YYYY-MM-DD');
  const quarterValue = quarter || `Q1-${moment().format('YYYY')}`;
  const timeText = getValueIfExists(() => timePeriodSelected.text, '');
  switch (interval.value) {
    case IntervalCatalog.day:
      return moment(timeText).format('DD-MMM-YYYY');
    case IntervalCatalog.month:
      return moment(timePeriodValue).format('MMM-YYYY');
    case IntervalCatalog.quarter:
      return quarterValue;
    case IntervalCatalog.year:
      return moment(timePeriodValue).format('YYYY');
    default:
      return '';
  }
};

/**
 * getReportSitesSelectOptions
 * Transform Report Sites catalog into dropdown structure
 * @param {Array} sites receives dropdown options
 * @return {Array} return sites options
 */
export const getReportSitesSelectOptions = (sites) =>
  sites.map((site) => ({
    value: site.siteId,
    text: site.name,
  }));

/**
 * getReportIntervalSelectOptions
 * Transform Report Interval catalog into dropdown structure
 * @return {Array} return interval options
 */
export const getReportIntervalSelectOptions = () =>
  Object.values(IntervalCatalog).map((val) => ({
    text: `By ${val}`,
    value: val,
  }));
/**
 * getReportScaleSelectOptions
 * Transform Report Scale catalog into dropdown structure
 * @return {Array} return scale options
 */
export const getReportScaleSelectOptions = () =>
  Object.keys(ScaleTypesId).map((val) => ({
    text: ScaleTypesId[`${val}`],
    value: val,
  }));
/**
 * generateTimePeriodDays
 * Get all days from month
 * @return {Array}
 */
const generateTimePeriodDays = () => {
  const limit = moment().daysInMonth();
  const options = [];
  for (let x = 0; x < limit; x++) {
    const period = moment()
      .subtract(x, 'days')
      .format('DD-MMMM-YYYY');
    options.push({ value: x, text: period });
  }
  return options;
};
/**
 * generateTimePeriodMonth
 * Get all months from year
 * @return {Array}
 */
const generateTimePeriodMonth = () => {
  const options = [];
  for (let x = 0; x < mothsLimit; x++) {
    options.push({
      value: x,
      text: moment()
        .subtract(x, 'months')
        .format('MMM-YYYY'),
    });
  }
  return options;
};
/**
 * generateTimePeriodQuarter
 * Get all quarters from year
 * @return {Array}
 */
const generateTimePeriodQuarter = () => {
  const options = [];
  let count = 0;
  for (let y = 0; y < mothsLimit; y += 3) {
    const date = moment().subtract(y, 'months');
    options.push({
      value: count,
      text: `Q${moment(date).quarter()}-${moment(date).format('YYYY')}`,
    });
    count++;
  }
  return options;
};
/**
 * generateTimePeriodYear
 * Get last 3 years from actual year
 * @return {Array}
 */
const generateTimePeriodYear = () => {
  const options = [];
  for (let x = 0; x < yearsLimit; x++) {
    options.push({
      value: x,
      text: moment()
        .subtract(x, 'years')
        .format('YYYY'),
    });
  }
  return options;
};
/**
 * getReportTimePeriodOptions
 * Validate time period type depending on the interval and return options
 * @param {string} interval receives interval type
 * @return {Array}
 */
export const getReportTimePeriodOptions = (interval) => {
  switch (interval) {
    case IntervalCatalog.day:
      return generateTimePeriodDays();
    case IntervalCatalog.month:
      return generateTimePeriodMonth();
    case IntervalCatalog.quarter:
      return generateTimePeriodQuarter();
    case IntervalCatalog.year:
      return generateTimePeriodYear();
    default:
      return [];
  }
};

/**
 * getMaxValueFromChartLevels
 * Get max value from charts with multi levels, we need to search in all nested nodes to find max value
 * @param {object} chartData chart to get max value
 * @returns {number} a number with max value found
 */
export const getMaxValueFromChartLevels = (chartData) => {
  if (getValueIfExists(() => chartData.length, 0) > 0) {
    const nodeMaxValue = _.maxBy(
      _.flatMap(chartData, ({ values }) => _.flatten(values)),
      (item) => item.value
    );
    return getValueIfExists(() => +nodeMaxValue.value, 0);
  }
  return 0;
};

/**
 * @method generateCompaniesOptions
 * Format companies options dropdown array with option properties value and text,
 * from companies sites array
 * @param {array} companies receives companies sites array data
 * @returns {array}
 */
export const generateCompaniesOptions = (companies) =>
  companies.map((company, index) => ({
    value: index,
    text: company.companyName,
  }));

/**
 * @method generateSitesOptions
 * Format sites options dropdown array with option properties value and text
 * @param {array} sites receives companies sites array data
 * @returns {array}
 */
export const generateSitesOptions = (sites) =>
  sites.map((site) => ({
    value: site.siteId,
    text: `${site.name} - ${site.locationName}`,
  }));

/**
 * @method getChartSettingsByPeriod
 * Gets chart UI Settings
 * @param {numeric} period indicates the ID for IntervalCatalog
 * @param {boolean} isGrouped
 * @returns {array}
 */
export const getChartSettingsByPeriod = (period, isGrouped) => {
  let chartSettings;

  switch (period) {
    case IntervalCatalog.day:
      chartSettings = chartByDaySettings;

      if (isGrouped) {
        chartSettings = { ...chartByDaySettings, barWidth: 6 };
      }
      break;
    default:
      chartSettings = {};
      break;
  }

  return chartSettings;
};

/**
 * @method generateTimeTwelveHours
 * Generate an array for 12 hours select options
 * @returns {array}
 */
export const generateTimeTwelveHours = () => {
  const hours = [];
  for (let hoursCount = 1; hoursCount <= twelveHoursLimit; hoursCount++) {
    hours.push({
      value: hoursCount,
      text: hoursCount,
    });
  }
  return hours;
};

/**
 * @method generateTimeMinutes
 * Generate an array for 60 minutes select options
 * @returns {array}
 */
export const generateTimeMinutes = () => {
  const minutes = [];
  for (let minutesCount = 0; minutesCount < minutesLimit; minutesCount++) {
    const values = minutesCount < 10 ? `0${minutesCount}` : minutesCount;
    minutes.push({
      value: values,
      text: values,
    });
  }
  return minutes;
};

/**
 * Time Division Options
 */
export const TimeDivisionOptions = [
  {
    value: 'AM',
    text: 'AM',
  },
  {
    value: 'PM',
    text: 'PM',
  },
];
