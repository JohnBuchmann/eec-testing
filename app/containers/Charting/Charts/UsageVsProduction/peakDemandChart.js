import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core';
import { Scatterplot } from 'Components/Charts';
import { getColorChartKey } from 'Utils/colorsHelper';
import { getXTitle, getYTitle } from 'Utils/reports';
import { getValueIfExists } from 'Utils/propertyValidation';
import { monthName } from 'Utils/enums/months';
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
 * Demand by month
 * Generates a chart to display Peek Demand data
 * @param {object} props Component properties
 */
const PeakDemandChart = (props) => {
  const classes = useStyles();
  const { data: inputData, config } = props;
  const { interval, scale } = config;
  const { formatMessage } = props.intl;
  const scaleValue =
    parseInt(String(scale).replace(/\D/g, ''), 10) / ScaleValues.Kilo || null;
  const chartData = getValueIfExists(() => inputData, []);
  const maxValue = d3.max(chartData, (d) => +d.value);
  const xTitle = getXTitle(formatMessage, interval);
  const yTitle = getYTitle(formatMessage, scale, maxValue);
  chartData.sort((first, second) =>
    monthName[first.group] > monthName[second.group] ? 1 : -1
  );
  const scatterPlotData = chartData.map((data) => ({
    ...data,
    name: parseFloat(data.name),
    dotColor: getColorChartKey(data.group),
  }));

  return (
    <div className={classes.mainContainer}>
      <Scatterplot
        id="PeakDemandByMonth"
        data={scatterPlotData}
        xAxisTitle={xTitle}
        yAxisTitle={yTitle}
        yAxisMaxValue={scaleValue}
      />
      {scaleValue && maxValue > scaleValue && <OutRangeAlert />}
    </div>
  );
};

PeakDemandChart.propTypes = {
  data: PropTypes.array,
  intl: PropTypes.any.isRequired,
  config: PropTypes.object.isRequired,
};

export default injectIntl(PeakDemandChart);
