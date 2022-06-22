import React from 'react';
import PropTypes from 'prop-types';
import {
  getDonutChartColors,
  setPercentagesDisplayValues,
} from 'Utils/colorsHelper';
import { getValueIfExists } from 'Utils/propertyValidation';
import { DonutChart } from 'Components/Charts';

/**
 * Uptime Performance Component to generate Uptime Performance Pie Graph
 *  * @param {object} props Component properties, with
 *  data: an object with name and value to set values on the chart.
 */
const uptimePerformanceChart = (props) => {
  const { data } = props;

  const chartData = getValueIfExists(() => data, []);
  const barColors = getDonutChartColors(chartData);
  const formattedChartData = setPercentagesDisplayValues(chartData);
  return (
    <DonutChart
      id="uptime-chart"
      data={formattedChartData}
      barColors={barColors}
      legendToSide
      hideSliceLabels
    />
  );
};

uptimePerformanceChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default uptimePerformanceChart;
