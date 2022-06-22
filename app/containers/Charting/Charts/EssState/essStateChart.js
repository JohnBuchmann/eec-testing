/**
 * Ess State Component to generate ESS State Chart
 */

import { DonutChart } from 'Components/Charts';
import { getValueIfExists } from 'Utils/propertyValidation';
import PropTypes from 'prop-types';
import React from 'react';
import {
  getDonutChartColors,
  setPercentagesDisplayValues,
} from 'Utils/colorsHelper';

/**
 * EssStateChart
 * Component to generate ESS State Chart
 * @param {object} props Component properties, with
 * data: an object with name and value to set values on the chart.
 */
const EssStateChart = (props) => {
  const { data: inputData } = props;
  const chartData = getValueIfExists(() => inputData, []);
  const barColors = getDonutChartColors(chartData);
  const formattedChartData = setPercentagesDisplayValues(chartData);

  return (
    <DonutChart
      id="EssStateChart"
      data={formattedChartData}
      barColors={barColors}
    />
  );
};

EssStateChart.propTypes = {
  data: PropTypes.array,
};

export default EssStateChart;
