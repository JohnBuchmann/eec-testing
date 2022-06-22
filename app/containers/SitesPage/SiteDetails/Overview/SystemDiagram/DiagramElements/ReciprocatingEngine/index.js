/**
 * Reciprocating engine
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import { getTextValues } from 'Utils/unitsOfMeasurement';
import { getValueIfExists } from 'Utils/propertyValidation';

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

/**
 * @method ReciprocatingEngine
 * Displays reciprocating engine
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Reciprocating engine component
 */
function ReciprocatingEngine(props) {
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
  const generatorIconPositionX = x - 19;
  const generatorIconPositionY = y - 72;
  const statusIconPositionX = x - 22;
  const statusIconPositionY = y - 46;
  const labelTextPositionX = x + 30;

  return (
    <>
      <desc>Reciprocating Engine</desc>
      {/* Current power flow */}
      <text x={labelTextPositionX} y={y - 54} className={classes.label}>
        ACT
        <tspan dx={dxPaddingValue} className={classes.currentPowerFlowTitle}>
          {gridLoadBusText}
        </tspan>
      </text>
      {/* Max power rating */}
      <text x={labelTextPositionX} y={y - 39} className={classes.label}>
        CAP
        <tspan dx={dxPaddingValue} className={classes.maxPowerRatingTitle}>
          {maxPowerRatingText}
        </tspan>
      </text>
      {/* Reciprocating Engine Icon */}
      <SvgIcon x={generatorIconPositionX} y={generatorIconPositionY} />
      <Status
        x={statusIconPositionX}
        y={statusIconPositionY}
        width="17px"
        height="17px"
        statusId={statusId}
        roundness="3px"
      />
      {/* Title */}
      <text
        data-testid="svg-reciprocating-engine-title"
        x={x - 20}
        y={y}
        className={classes.title}
      >
        {title}
      </text>
    </>
  );
}

ReciprocatingEngine.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  description: PropTypes.string,
  gridFlow: PropTypes.object,
  maxPowerRating: PropTypes.object,
  deviceGroupStatusId: PropTypes.number,
};

export default ReciprocatingEngine;
