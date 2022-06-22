/**
 * Fleet
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
  fleetTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.surfCrest,
    fontSize: '11px',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  totalLoadTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.white,
    fontSize: '12px',
    fontWeight: '600',
  },
  totalCurrentPowerDCBusTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.white,
    fontSize: '11px',
  },
  totalCurrentPowerGridTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.white,
    fontSize: '11px',
  },
  label: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.white,
    fontSize: '9px',
  },
});

/**
 * @method Fleet
 * Displays Fleet
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Fleet component
 */
function Fleet(props) {
  const classes = useStyles();
  const {
    x = 0,
    y = 0,
    description: title,
    dcBusFlow,
    gridFlow,
    totalLoad,
    deviceGroupStatusId: statusId,
  } = props;

  const labelDecimals = 1;
  const dcBusFlowValue = getValueIfExists(() => dcBusFlow.currentFlow, 0);
  const gridFlowValue = getValueIfExists(() => gridFlow.currentFlow, 0);
  const totalFlowValue = getValueIfExists(() => totalLoad.currentFlow, 0);

  const dcLoadBusText = `${formatSI(
    dcBusFlowValue,
    ScaleSymbol.Kilo,
    labelDecimals,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watt}`;

  const gridLoadBusText = `${formatSI(
    gridFlowValue,
    ScaleSymbol.Kilo,
    labelDecimals,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watt}`;

  const totalLoadText = `${formatSI(
    totalFlowValue,
    ScaleSymbol.Kilo,
    labelDecimals,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watt}`;

  const dxPaddingValue = 7;
  const fleetIconPositionX = x + 30;
  const fleetIconPositionY = y + 19;
  const statusIconPositionX = x + 30;
  const statusIconPositionY = y + 44;
  const labelTextPositionX = x + 80;
  return (
    <>
      {/* Title */}
      <text
        data-testid="svg-fleet-title"
        x={x}
        y={y}
        className={classes.fleetTitle}
      >
        {title}
      </text>
      <text x={labelTextPositionX} y={y + 32} className={classes.label}>
        Total
        <tspan dx={dxPaddingValue} className={classes.totalLoadTitle}>
          {totalLoadText}
        </tspan>
      </text>
      {/* Grid */}
      <text x={labelTextPositionX} y={y + 46} className={classes.label}>
        T/F Grid
        <tspan
          dx={dxPaddingValue}
          className={classes.totalCurrentPowerDCBusTitle}
        >
          {dcLoadBusText}
        </tspan>
      </text>
      {/* Inverter */}
      <text x={labelTextPositionX} y={y + 60} className={classes.label}>
        T/F Inverter
        <tspan
          dx={dxPaddingValue}
          className={classes.totalCurrentPowerGridTitle}
        >
          {gridLoadBusText}
        </tspan>
      </text>
      {/* Fleet Icon */}
      <SvgIcon x={fleetIconPositionX} y={fleetIconPositionY} />

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

Fleet.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  description: PropTypes.string,
  dcBusFlow: PropTypes.object,
  gridFlow: PropTypes.object,
  totalLoad: PropTypes.object,
  deviceGroupStatusId: PropTypes.number,
};

export default Fleet;
