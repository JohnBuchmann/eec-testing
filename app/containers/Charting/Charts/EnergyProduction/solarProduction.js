import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Colors } from 'Theme';
import { BarChart } from 'Components/Charts';
import { makeStyles } from '@material-ui/core';
import { IntervalCatalog } from 'Utils/enums/interval';
import { getChartSettingsByPeriod, getXTitle, getYTitle } from 'Utils/reports';
import { getValueIfExists } from 'Utils/propertyValidation';
import { ScaleValues } from 'Utils/enums/unitMeasurement';
import OutRangeAlert from '../../outRangeAlert';
import messages from './messages';
/**
 * Styles for chart
 */
const useStyles = makeStyles({
  colorContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '40px',
    fontSize: '12px',
    position: 'absolute',
    bottom: '30px',
  },
  mainContainer: {
    position: 'relative',
  },
  color: {
    backgroundColor: Colors.red,
    borderRadius: '20%',
    marginRight: '5px',
    width: '12px',
    height: '12px',
  },
});
/**
 * SolarProduction
 * Display BarChart with Solar Production data
 * @param {object} props Properties for the controller
 * @param {object} props.data receives chart data
 * @param {object} props.config receives config from reporting header
 */
const SolarProduction = (props) => {
  const classes = useStyles();
  const { energyProduction: energyMessages } = messages;
  const { data: inputData, config } = props;
  const { interval, scale } = config;
  const { formatMessage } = props.intl;
  const id = 'solarProduction';
  const solarText = formatMessage(energyMessages.solarText);
  const scaleValue =
    parseInt(String(scale).replace(/\D/g, ''), 10) / ScaleValues.Kilo || null;
  const chartData = getValueIfExists(() => inputData, []);
  const maxValue = d3.max(chartData, (d) => +d.value);
  const xTitle = getXTitle(formatMessage, interval);
  const yTitle = getYTitle(formatMessage, scale, maxValue);
  const marginLeftLabel = interval === IntervalCatalog.year ? -15 : -5;
  const chartUISettings = getChartSettingsByPeriod(interval);

  return (
    <div className={classes.mainContainer}>
      <BarChart
        data={chartData}
        id={id}
        barColor={Colors.red}
        xAxisTitle={xTitle}
        yAxisTitle={yTitle}
        xAxisLabelMarginLeft={marginLeftLabel}
        yAxisMaxValue={scaleValue}
        {...chartUISettings}
      />
      <div className={classes.colorContainer}>
        <div className={classes.color} />
        {solarText}
      </div>
      {scaleValue && maxValue > scaleValue && <OutRangeAlert />}
    </div>
  );
};
/**
 * SolarProduction PropTypes
 */
SolarProduction.propTypes = {
  data: PropTypes.array.isRequired,
  intl: PropTypes.any.isRequired,
  config: PropTypes.object.isRequired,
};

export default injectIntl(SolarProduction);
