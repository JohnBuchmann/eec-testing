/**
 * Fleet load in mwh
 */

import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';
import { BarChart } from 'Components/Charts';
import { makeStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { getChartSettingsByPeriod, getXTitle, getYTitle } from 'Utils/reports';
import { getValueIfExists } from 'Utils/propertyValidation';
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
 * Fleet load in mwh
 * @param {*} props Internationalization(i18n) properties
 */
const FleetLoadInMWH = (props) => {
  const classes = useStyles();
  const { config, data: inputData } = props;
  const { interval, scale } = config;
  const { formatMessage } = props.intl;
  const chartId = 'fleetLoadInMWHBarChart';
  const marginLeftLabel = -15;
  const chartData = getValueIfExists(() => inputData, []);
  const maxValue = d3.max(chartData, (d) => +d.value);
  const scaleValue =
    parseInt(String(scale).replace(/\D/g, ''), 10) / ScaleValues.Kilo || null;
  const xTitle = getXTitle(formatMessage, interval);
  const yTitle = getYTitle(formatMessage, scale, maxValue);
  const chartUISettings = getChartSettingsByPeriod(interval, true);

  return (
    <div className={classes.mainContainer}>
      <BarChart
        id={chartId}
        data={chartData}
        barColor={Colors.tarawera}
        xAxisTitle={xTitle}
        yAxisTitle={yTitle}
        xAxisLabelMarginLeft={marginLeftLabel}
        yAxisMaxValue={scaleValue}
        {...chartUISettings}
      />
      {scaleValue && maxValue > scaleValue && <OutRangeAlert />}
    </div>
  );
};

FleetLoadInMWH.propTypes = {
  intl: PropTypes.any.isRequired,
  config: PropTypes.object.isRequired,
  data: PropTypes.array,
};

export default injectIntl(FleetLoadInMWH);
