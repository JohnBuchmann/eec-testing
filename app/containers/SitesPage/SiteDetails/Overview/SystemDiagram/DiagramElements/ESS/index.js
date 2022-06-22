/**
 * ESS
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgressWithLabel from 'Components/Progress/LinearProgressWithLabel';
import { Colors } from 'Theme';
import { getValueIfExists } from 'Utils/propertyValidation';
import { formatSI } from 'Utils/systemDiagram';
import {
  ScaleSymbol,
  UnitMeasurementSymbol,
  ScaleValues,
} from 'Utils/enums/unitMeasurement';
import Status from '../Status';
import SvgIcon from './SvgIcon';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  title: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.surfCrest,
    fontSize: '11px',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  label: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.white,
    fontSize: '9px',
  },
  currentPowerFlowTitle: {
    fontSize: '12px',
    fontWeight: '600',
  },
  maxPowerRatingTitle: {
    fontSize: '11px',
  },
});

const StyledLinearProgressWithLabel = withStyles(() => ({
  root: {
    height: 4,
    width: 32,
    backgroundColor: Colors.mercury,
  },
}))(LinearProgressWithLabel);

/**
 * @method ESS
 * Displays ESS
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns ESS component
 */
function ESS(props) {
  const classes = useStyles();
  const {
    x = 0,
    y = 0,
    description: title,
    gridFlow,
    gridFlowPower,
    currentCapacity,
    maxPowerRating,
    deviceGroupStatusId: statusId,
  } = props;

  const labelDecimals = 1;
  const dcBusFlowValue = getValueIfExists(() => gridFlow.currentFlow, 0);
  const dcBusFlowValuekWh = getValueIfExists(
    () => gridFlowPower.currentFlow,
    0
  );

  const currentCapacityValue = getValueIfExists(
    () => currentCapacity.currentFlow,
    0
  );
  const maxPowerRatingValue = getValueIfExists(
    () => maxPowerRating.currentFlow,
    0
  );

  const maxPowerRatingText = `${formatSI(
    maxPowerRatingValue,
    ScaleSymbol.Kilo,
    labelDecimals,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watthour}`;

  const gridLoadBusText = `${formatSI(
    dcBusFlowValue,
    ScaleSymbol.Kilo,
    labelDecimals,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watt}`;

  const gridLoadBusTextkWh = `${formatSI(
    dcBusFlowValuekWh,
    ScaleSymbol.Kilo,
    labelDecimals,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watthour}`;

  const dxPaddingValue = 7;
  const essIconPositionX = x - 36;
  const essIconPositionY = y - 72;
  const statusIconPositionX = x - 39;
  const statusIconPositionY = y - 46;
  const labelTextPositionX = x + 13;

  return (
    <>
      <desc>ESS</desc>
      {/* Title */}
      <text
        data-testid="svg-ess-title"
        x={x - 20}
        y={y}
        className={classes.title}
      >
        {title}
      </text>
      {/* Current power flow kWh */}
      <text x={labelTextPositionX} y={y - 61} className={classes.label}>
        ACT
        <tspan dx={dxPaddingValue} className={classes.currentPowerFlowTitle}>
          {gridLoadBusTextkWh}
        </tspan>
      </text>
      {/* Current power flow */}
      <text x={labelTextPositionX} y={y - 47} className={classes.label}>
        ACT
        <tspan dx={dxPaddingValue} className={classes.currentPowerFlowTitle}>
          {gridLoadBusText}
        </tspan>
      </text>
      {/* Max power rating */}
      <text x={labelTextPositionX} y={y - 33} className={classes.label}>
        CAP
        <tspan dx={dxPaddingValue} className={classes.maxPowerRatingTitle}>
          {maxPowerRatingText}
        </tspan>
      </text>
      {/* ESS Icon */}
      <SvgIcon x={essIconPositionX} y={essIconPositionY} />
      <Status
        x={statusIconPositionX}
        y={statusIconPositionY}
        width="17px"
        height="17px"
        statusId={statusId}
        roundness="3px"
      />
      <foreignObject x={x - 29} y={y - 28} width="100" height="14">
        <StyledLinearProgressWithLabel
          label="SOC"
          value={currentCapacityValue}
        />
      </foreignObject>
    </>
  );
}

ESS.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  description: PropTypes.string,
  gridFlow: PropTypes.number,
  gridFlowPower: PropTypes.number,
  currentCapacity: PropTypes.number,
  maxPowerRating: PropTypes.number,
  deviceGroupStatusId: PropTypes.number,
};

export default ESS;
