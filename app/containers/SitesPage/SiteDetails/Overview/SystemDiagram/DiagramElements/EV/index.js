/**
 * EV
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import {
  ScaleSymbol,
  UnitMeasurementSymbol,
  ScaleValues,
} from 'Utils/enums/unitMeasurement';
import { getValueIfExists } from 'Utils/propertyValidation';
import { formatSI } from 'Utils/systemDiagram';
import Status from '../Status';
import SvgIcon from './SvgIcon';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  evTitle: {
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
  totalLoadTitle: {
    fontSize: '12px',
    fontWeight: '600',
    paddingLeft: '5px',
  },
  totalCurrentPowerDCBusTitle: {
    fontSize: '11px',
  },
  totalCurrentPowerGridTitle: {
    fontSize: '11px',
  },
});

/**
 * @method EV
 * Displays EV
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns EV component
 */
function EV(props) {
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
  const evIconPositionX = x - 19;
  const evIconPositionY = y + 19;
  const statusIconPositionX = x - 22;
  const statusIconPositionY = y + 44;
  const labelTextPositionX = x + 30;

  return (
    <>
      <desc>EV</desc>
      {/* Title */}
      <text data-testid="svg-ev-title" x={x} y={y} className={classes.evTitle}>
        {title}
      </text>
      <text x={labelTextPositionX} y={y + 32} className={classes.label}>
        Total
        <tspan dx={dxPaddingValue} className={classes.totalLoadTitle}>
          {totalLoadText}
        </tspan>
      </text>
      <text x={labelTextPositionX} y={y + 45} className={classes.label}>
        T/F Grid
        <tspan
          dx={dxPaddingValue}
          className={classes.totalCurrentPowerDCBusTitle}
        >
          {dcLoadBusText}
        </tspan>
      </text>
      <text x={labelTextPositionX} y={y + 59} className={classes.label}>
        T/F Inverter
        <tspan
          dx={dxPaddingValue}
          className={classes.totalCurrentPowerGridTitle}
        >
          {gridLoadBusText}
        </tspan>
      </text>
      {/* Fleet Icon */}
      <SvgIcon x={evIconPositionX} y={evIconPositionY} />

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

EV.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  description: PropTypes.string,
  dcBusFlow: PropTypes.number,
  gridFlow: PropTypes.number,
  totalLoad: PropTypes.number,
  deviceGroupStatusId: PropTypes.number,
};

export default EV;
