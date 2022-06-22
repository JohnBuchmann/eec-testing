import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { makeStyles, Typography } from '@material-ui/core';
import { LinesChart } from 'Components/Charts';
import { getLinesChartChartColors } from 'Utils/colorsHelper';
import { IntervalCatalog } from 'Utils/enums/interval';
import { getChartSettingsByPeriod, getYTitle } from 'Utils/reports';
import { getValueIfExists } from 'Utils/propertyValidation';
import { ScaleValues } from 'Utils/enums/unitMeasurement';
import { round } from 'Utils/math';
import messages from '../../messages';
import OutRangeAlert from '../../outRangeAlert';
/**
 * Styles for chart
 */
const useStyles = makeStyles({
  mainContainer: {
    position: 'relative',
  },
  chartUnavailableText: {
    width: '600px',
    height: '200px',
    fontWeight: '600',
    marginTop: '75px',
    textAlign: 'center',
  },
});
/**
 * AverageEnergyUse
 * Component to generate Average Energy Use chart
 * @param {object} props Component properties
 */
const AverageEnergyUse = (props) => {
  const xAxisScaleType = 'notScalar';
  const classes = useStyles();
  const { data: inputData, config } = props;
  const { scale } = config;
  const { interval } = config;

  const { formatMessage } = props.intl;
  const chartData = getValueIfExists(() => inputData, []);
  const roundedData = chartData.map((item) => ({
    group: item.group,
    name: item.name,
    value: round(item.value, 1),
  }));
  const groupLines = getLinesChartChartColors(chartData);
  /* Assign index to groupLines inorder to sort based on their Index */
  const groupSortOrder = {
    /* Assign index in sorted order for days of week */
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
    /* Assign index in sorted order for Months of year */
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
    /* Assign index in sorted order for Quarters of year */
    'Q1 Weekday': 1,
    'Q1 Weekend': 2,
    'Q2 Weekday': 3,
    'Q2 Weekend': 4,
    'Q3 Weekday': 5,
    'Q3 Weekend': 6,
    'Q4 Weekday': 7,
    'Q4 Weekend': 8,
  };
  /* Sort groupLines value based on IntervalCatalog */
  groupLines.sort((a, b) => groupSortOrder[a.group] - groupSortOrder[b.group]);
  const scaleValue =
    parseInt(String(scale).replace(/\D/g, ''), 10) / ScaleValues.Kilo || null;
  const maxValue = d3.max(roundedData, (d) => +d.value);
  const xTitle = formatMessage(messages.xAxisTitleHours);
  const chartUnavailable = formatMessage(messages.chartUnavailable);
  const yTitle = getYTitle(formatMessage, scale, maxValue);
  // This chart is displayed by day always
  const chartUISettings = getChartSettingsByPeriod(IntervalCatalog.day);

  return (
    <div className={classes.mainContainer}>
      {chartData.length > 0 && (
        <LinesChart
          id="AverageEnergyUse"
          data={roundedData}
          xAxisTitle={xTitle}
          yAxisTitle={yTitle}
          groupLines={interval === IntervalCatalog.day ? null : groupLines}
          legendGroup={3}
          xAxisScaleType={xAxisScaleType}
          yAxisMaxValue={scaleValue}
          {...chartUISettings}
        />
      )}
      {chartData.length === 0 && (
        <Typography className={classes.chartUnavailableText}>
          {chartUnavailable}
        </Typography>
      )}
      {scaleValue && maxValue > scaleValue && <OutRangeAlert />}
    </div>
  );
};

AverageEnergyUse.propTypes = {
  data: PropTypes.array,
  intl: PropTypes.any.isRequired,
  config: PropTypes.object.isRequired,
};

export default injectIntl(AverageEnergyUse);
