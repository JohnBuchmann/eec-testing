/**
 * Customer demand
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
import SvgIcon from '../LoadAc/SvgIcon';
import Status from '../Status';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  customerDemandTitle: {
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
  },
  totalCurrentPowerInverterTitle: {
    fontSize: '11px',
  },
  totalCurrentPowerGridTitle: {
    fontSize: '11px',
  },
});

/**
 * @method CustomerDemand
 * Displays customer demand
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Customer demand component
 */
function CustomerDemand(props) {
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
  const customerDemandIconPositionX = x + 30;
  const CustomerDemandIconPositionY = y - 71;
  const statusIconPositionX = x + 28;
  const statusIconPositionY = y - 46;
  const labelTextPositionX = x + 80;

  return (
    <>
      <text x={labelTextPositionX} y={y - 60} className={classes.label}>
        Total
        <tspan dx={dxPaddingValue} className={classes.totalLoadTitle}>
          {totalLoadText}
        </tspan>
      </text>
      {/* Grid */}
      <text x={labelTextPositionX} y={y - 46} className={classes.label}>
        T/F Grid
        <tspan
          dx={dxPaddingValue}
          className={classes.totalCurrentPowerGridTitle}
        >
          {gridLoadBusText}
        </tspan>
      </text>
      {/* Inverter */}
      <text x={labelTextPositionX} y={y - 31} className={classes.label}>
        T/F Inverter
        <tspan
          dx={dxPaddingValue}
          className={classes.totalCurrentPowerInverterTitle}
        >
          {dcLoadBusText}
        </tspan>
      </text>
      {/* AC Icon */}
      <SvgIcon
        x={customerDemandIconPositionX}
        y={CustomerDemandIconPositionY}
      />

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
        data-testid="svg-customer-demand-title"
        x={x}
        y={y}
        className={classes.customerDemandTitle}
      >
        {title}
      </text>
    </>
  );
}

CustomerDemand.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  description: PropTypes.string,
  dcBusFlow: PropTypes.number,
  gridFlow: PropTypes.number,
  totalLoad: PropTypes.number,
  deviceGroupStatusId: PropTypes.number,
};

export default CustomerDemand;
