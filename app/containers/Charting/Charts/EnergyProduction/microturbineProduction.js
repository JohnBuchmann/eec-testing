import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { BarChart } from 'Components/Charts';
import { makeStyles } from '@material-ui/core';
import { IntervalCatalog } from 'Utils/enums/interval';
import { getChartSettingsByPeriod, getXTitle, getYTitle } from 'Utils/reports';
import { getValueIfExists } from 'Utils/propertyValidation';
import { ScaleValues } from 'Utils/enums/unitMeasurement';
import { Colors } from 'Theme';
import messages from './messages';
import OutRangeAlert from '../../outRangeAlert';
/**
 * Styles for chart
 */
const useStyles = makeStyles({
  mainContainer: {
    position: 'relative',
  },
  colorContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '40px',
    fontSize: '12px',
    position: 'absolute',
    bottom: '30px',
  },
  color: {
    backgroundColor: Colors.goldenDream,
    borderRadius: '20%',
    marginRight: '5px',
    width: '12px',
    height: '12px',
  },
});

/**
 * MicroturbineProduction
 * Display BarChart with Microturbine Production data
 * @param {object} props Properties for the controller
 * @param {object} props.data receives chart data
 * @param {string} props.interval receives interval from reporting header
 */
const MicroturbineProduction = (props) => {
  const classes = useStyles();
  const { energyProduction: energyMessages } = messages;
  const { data: inputData, config } = props;
  const { interval, scale } = config;
  const { formatMessage } = props.intl;
  const id = 'microturbineProduction';
  const scaleValue =
    parseInt(String(scale).replace(/\D/g, ''), 10) / ScaleValues.Kilo || null;
  const chartData = getValueIfExists(() => inputData, []);
  const maxValue = d3.max(chartData, (d) => +d.value);
  const xTitle = getXTitle(formatMessage, interval);
  const yTitle = getYTitle(formatMessage, scale, maxValue);
  const microturbineText = formatMessage(energyMessages.microturbineText);
  const marginLeftLabel = interval === IntervalCatalog.year ? -15 : -5;
  const chartUISettings = getChartSettingsByPeriod(interval);

  return (
    <div className={classes.mainContainer}>
      <BarChart
        data={chartData}
        id={id}
        barColor={Colors.goldenDream}
        xAxisTitle={xTitle}
        yAxisTitle={yTitle}
        xAxisLabelMarginLeft={marginLeftLabel}
        yAxisMaxValue={scaleValue}
        {...chartUISettings}
      />
      <div className={classes.colorContainer}>
        <div className={classes.color} />
        {microturbineText}
      </div>
      {scaleValue && maxValue > scaleValue && <OutRangeAlert />}
    </div>
  );
};
/**
 * MicroturbineProduction PropTypes
 */
MicroturbineProduction.propTypes = {
  intl: PropTypes.any.isRequired,
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
};
export default injectIntl(MicroturbineProduction);
