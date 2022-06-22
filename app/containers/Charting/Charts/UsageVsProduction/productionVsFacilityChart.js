import { makeStyles } from '@material-ui/core';
import { StackedBarChart } from 'Components/Charts';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { getStackedBarChartColors } from 'Utils/colorsHelper';
import { getValueIfExists } from 'Utils/propertyValidation';
import { ScaleValues } from 'Utils/enums/unitMeasurement';
import {
  getChartSettingsByPeriod,
  getMaxValueFromChartLevels,
  getXTitle,
  getYTitle,
} from 'Utils/reports';
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
 * ProductionVsFacilityChart
 * Component to generate Production Vs Facility chart
 * @param {object} props Component properties
 */
const ProductionVsFacilityChart = (props) => {
  const classes = useStyles();
  const { data: inputData, config } = props;
  const { interval, scale } = config;
  const { formatMessage } = props.intl;
  const scaleValue =
    parseInt(String(scale).replace(/\D/g, ''), 10) / ScaleValues.Kilo || null;
  const chartData = getValueIfExists(() => inputData, []);
  const maxValue = getMaxValueFromChartLevels(chartData);
  const xTitle = getXTitle(formatMessage, interval);
  const yTitle = getYTitle(formatMessage, scale, maxValue);
  const barColors = getStackedBarChartColors(chartData);
  const chartUISettings = getChartSettingsByPeriod(interval, true);

  return (
    <div className={classes.mainContainer}>
      <StackedBarChart
        id="test"
        barColors={barColors}
        data={chartData}
        xAxisTitle={xTitle}
        yAxisTitle={yTitle}
        yAxisMaxValue={scaleValue}
        {...chartUISettings}
      />
      {scaleValue && maxValue > scaleValue && <OutRangeAlert />}
    </div>
  );
};

ProductionVsFacilityChart.propTypes = {
  data: PropTypes.array,
  intl: PropTypes.any.isRequired,
  config: PropTypes.object.isRequired,
};

export default injectIntl(ProductionVsFacilityChart);
