/**
 * Load AC
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
  loadACTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.surfCrest,
    fontSize: '11px',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  currentPowerDCBusTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.white,
    fontSize: '12px',
    fontWeight: '600',
  },
});

/**
 * @method LoadAC
 * Displays load ac
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Load AC component
 */
function LoadAC(props) {
  const classes = useStyles();
  const {
    x = 0,
    y = 0,
    description: title,
    totalLoad,
    deviceGroupStatusId: statusId,
  } = props;

  const labelDecimals = 1;
  const totalFlowValue = getValueIfExists(() => totalLoad.currentFlow, 0);
  const totalLoadText = `${formatSI(
    totalFlowValue,
    ScaleSymbol.Kilo,
    labelDecimals,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watt}`;

  const loadAcIconPositionX = x - 19;
  const loadAcIconPositionY = y - 72;
  const statusIconPositionX = x - 22;
  const statusIconPositionY = y - 46;
  const labelTextPositionX = x + 30;

  return (
    <>
      <text
        data-testid="svg-load-ac-title"
        x={x - 20}
        y={y}
        className={classes.loadACTitle}
      >
        {title}
      </text>
      <text
        x={labelTextPositionX}
        y={y - 44}
        className={classes.currentPowerDCBusTitle}
      >
        {totalLoadText}
      </text>

      {/* AC Icon */}
      <SvgIcon x={loadAcIconPositionX} y={loadAcIconPositionY} />

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

LoadAC.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  description: PropTypes.string,
  totalLoad: PropTypes.object,
  deviceGroupStatusId: PropTypes.number,
};

export default LoadAC;
