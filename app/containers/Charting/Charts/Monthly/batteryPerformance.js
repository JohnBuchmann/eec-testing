import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core';
import { LinesTimeZoomChart } from 'Components/Charts';
import { getLinesChartChartColors } from 'Utils/colorsHelper';
import { IntervalCatalog } from 'Utils/enums/interval';
import { getChartSettingsByPeriod, getYTitle } from 'Utils/reports';
import { getValueIfExists } from 'Utils/propertyValidation';
import { ScaleValues } from 'Utils/enums/unitMeasurement';
import { round } from 'Utils/math';
import * as _ from 'lodash';
import messages from '../../messages';
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
 * BatteryPerformanceChart
 * Component to generate Battery performance chart
 * @param {object} props Component properties
 */
const BatteryPerformanceChart = (props) => {
  const { formatMessage } = props.intl;
  const xAxisScaleType = 'notScalar';
  const yAxisTitle = 'yAxisTitlePower';
  const y2AxisTitle = formatMessage(messages.socTitle);
  const y2MaxValue = 100;
  const chartMarginRight = 40;
  const classes = useStyles();
  const { data: inputData, config } = props;
  const { scale } = config;
  const { batteryPowers = [], socs = [] } = getValueIfExists(
    () => inputData,
    {}
  );
  const roundedData = batteryPowers.map((item) => ({
    date: getValueIfExists(() => d3.timeParse('%Y-%m-%dT%H:%M')(item.date), ''),
    value: round(getValueIfExists(() => item.value, 0), 1),
    group: getValueIfExists(() => item.group, ''),
  }));
  const roundedRightData = socs.map((item) => ({
    date: getValueIfExists(() => d3.timeParse('%Y-%m-%dT%H:%M')(item.date), ''),
    value: round(getValueIfExists(() => item.value, 0), 1),
    group: getValueIfExists(() => item.group, ''),
  }));
  const groupLines = [
    ...getLinesChartChartColors(batteryPowers),
    ...getLinesChartChartColors(socs),
  ];
  const y2GroupName = getValueIfExists(() => _.head(socs).group, '');
  const scaleValue =
    parseInt(String(scale).replace(/\D/g, ''), 10) / ScaleValues.Kilo || null;
  const maxValue = d3.max(roundedData, (d) => +d.value);
  const xTitle = formatMessage(messages.xAxisTitleTime);
  const yTitle = getYTitle(formatMessage, scale, maxValue, yAxisTitle);
  // This chart is displayed by day always
  const chartUISettings = getChartSettingsByPeriod(IntervalCatalog.day);

  return (
    <div className={classes.mainContainer}>
      <LinesTimeZoomChart
        id="BatteryPerformance"
        data={roundedData}
        y2Data={roundedRightData}
        y2GroupName={y2GroupName}
        xAxisTitle={xTitle}
        yAxisTitle={yTitle}
        y2AxisTitle={y2AxisTitle}
        groupLines={groupLines}
        legendGroup={4}
        xAxisScaleType={xAxisScaleType}
        yAxisMaxValue={scaleValue}
        y2AxisMaxValue={y2MaxValue}
        chartMarginRight={chartMarginRight}
        {...chartUISettings}
      />
      {scaleValue && maxValue > scaleValue && <OutRangeAlert />}
    </div>
  );
};

BatteryPerformanceChart.propTypes = {
  data: PropTypes.object,
  intl: PropTypes.any.isRequired,
  config: PropTypes.object.isRequired,
};

export default injectIntl(BatteryPerformanceChart);
