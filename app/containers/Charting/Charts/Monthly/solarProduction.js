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
 * SolarProductionChart
 * Component to generate Solar Production chart
 * @param {object} props Component properties
 */
const SolarProductionChart = (props) => {
  const xAxisScaleType = 'notScalar';
  const yAxisTitle = 'yAxisTitlePower';
  const classes = useStyles();
  const { data: inputData, config } = props;
  const { scale } = config;
  const { formatMessage } = props.intl;
  const chartData = getValueIfExists(() => inputData, []);

  const roundedData = chartData.map((item) => ({
    date: getValueIfExists(() => d3.timeParse('%Y-%m-%dT%H:%M')(item.date), ''),
    value: round(getValueIfExists(() => item.value, 0), 1),
    group: getValueIfExists(() => item.group, ''),
  }));
  const groupLines = getLinesChartChartColors(roundedData);
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
        id="SolarProduction"
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

SolarProductionChart.propTypes = {
  data: PropTypes.array,
  intl: PropTypes.any.isRequired,
  config: PropTypes.object.isRequired,
};

export default injectIntl(SolarProductionChart);
