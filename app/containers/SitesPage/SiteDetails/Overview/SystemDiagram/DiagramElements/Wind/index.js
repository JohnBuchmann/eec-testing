/**
 * Wind
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import { getTextValues } from 'Utils/unitsOfMeasurement';
import { getValueIfExists } from 'Utils/propertyValidation';

import SvgIcon from './SvgIcon';
import Status from '../Status';

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

/**
 * @method Wind
 * Displays wind
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Wind component
 */
function Wind(props) {
  const classes = useStyles();
  const {
    x = 0,
    y = 0,
    description: title,
    gridFlow,
    maxPowerRating,
    deviceGroupStatusId: statusId,
  } = props;

  const labelDecimalsACT = 3;

  const { maxPowerRatingText, gridLoadBusText } = getTextValues(
    labelDecimalsACT,
    getValueIfExists(() => gridFlow.currentFlow, 0),
    getValueIfExists(() => maxPowerRating.currentFlow, 0)
  );

  const dxPaddingValue = 7;
  const windIconPositionX = x - 12;
  const windIconPositionY = y + 19;
  const statusIconPositionX = x - 15;
  const statusIconPositionY = y + 46;
  const labelTextPositionX = x + 37;

  return (
    <>
      <desc>Wind</desc>
      {/* Title */}
      <text data-testid="svg-wind-title" x={x} y={y} className={classes.title}>
        {title}
      </text>
      {/* Current power flow */}
      <text x={labelTextPositionX} y={y + 37} className={classes.label}>
        ACT
        <tspan dx={dxPaddingValue} className={classes.currentPowerFlowTitle}>
          {gridLoadBusText}
        </tspan>
      </text>
      {/* Max power rating */}
      <text x={labelTextPositionX} y={y + 52} className={classes.label}>
        CAP
        <tspan dx={dxPaddingValue} className={classes.currentPowerFlowTitle}>
          {maxPowerRatingText}
        </tspan>
      </text>
      {/* Wind Icon */}
      <SvgIcon x={windIconPositionX} y={windIconPositionY} />
      {/* Status icon */}
      <Status
        x={statusIconPositionX}
        y={statusIconPositionY}
        width="17px"
        height="17px"
        statusId={statusId}
        roundness="3px"
      />
    </>
  );
}

Wind.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  description: PropTypes.string,
  gridFlow: PropTypes.object,
  maxPowerRating: PropTypes.object,
  deviceGroupStatusId: PropTypes.number,
};

export default Wind;
