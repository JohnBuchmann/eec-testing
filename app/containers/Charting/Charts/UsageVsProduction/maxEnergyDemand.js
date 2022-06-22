import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core';
import { LinesChart } from 'Components/Charts';
import { getLinesChartChartColors } from 'Utils/colorsHelper';
import { round } from 'Utils/math';
import { getValueIfExists } from 'Utils/propertyValidation';
import { getChartSettingsByPeriod, getXTitle, getYTitle } from 'Utils/reports';
import { IntervalCatalog } from 'Utils/enums/interval';
import { ScaleValues } from 'Utils/enums/unitMeasurement';
import OutRangeAlert from '../../outRangeAlert';

/**
 * Styles for chart
 */
const useStyles = makeStyles({
  mainContainer: {
    position: 'relative',
  },
});
/**
 * MaxEnergyDemand
 * Component to generate Max Energy Demand chart
 * @param {object} props Component properties
 */
const MaxEnergyDemandChart = (props) => {
  const classes = useStyles();
  const xAxisScaleType = 'notScalar';
  const { data: inputData, config } = props;
  const { interval, scale } = config;
  const { formatMessage } = props.intl;
  const chartData = getValueIfExists(() => inputData, []);
  const roundedData = chartData.map((item) => ({
    group: item.group,
    name: item.name,
    value: round(item.value, 1),
  }));
  const scaleValue =
    parseInt(String(scale).replace(/\D/g, ''), 10) / ScaleValues.Kilo || null;
  const minLengthRound = 1;
  const maxValue =
    getValueIfExists(() => roundedData.length, 0) > minLengthRound
      ? d3.max(roundedData, (d) => +d.value)
      : null;
  const xTitle = getXTitle(formatMessage, interval);
  const yTitle = getYTitle(formatMessage, scale, maxValue);
  // Always in month data
  const groupLines = getLinesChartChartColors(chartData);

  // This chart is displayed by day always
  const chartUISettings = getChartSettingsByPeriod(IntervalCatalog.day);

  return (
    <div className={classes.mainContainer}>
      <LinesChart
        id="MaxEnergyDemand"
        data={roundedData}
        xAxisTitle={xTitle}
        yAxisTitle={yTitle}
        groupLines={groupLines}
        legendGroup={4}
        xAxisScaleType={xAxisScaleType}
        yAxisMaxValue={scaleValue}
        {...chartUISettings}
      />
      {scaleValue && maxValue > scaleValue && <OutRangeAlert />}
    </div>
  );
};

MaxEnergyDemandChart.propTypes = {
  data: PropTypes.array,
  intl: PropTypes.any.isRequired,
  config: PropTypes.object.isRequired,
};

export default injectIntl(MaxEnergyDemandChart);
