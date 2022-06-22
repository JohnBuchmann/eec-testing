/**
 * Load DC
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
import SvgIcon from './SvgIcon';
import Status from '../Status';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  loadDCTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.surfCrest,
    fontSize: '11px',
    fontWeight: '500',
  },
  currentPowerGridTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.white,
    fontSize: '12px',
    fontWeight: '600',
  },
});

/**
 * @method LoadDC
 * Displays load DC
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Load DC component
 */
function LoadDC(props) {
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

  const loadDcIconPositionX = x - 19;
  const LoadDcIconPositionY = y + 19;
  const statusIconPositionX = x - 22;
  const statusIconPositionY = y + 44;
  const labelTextPositionX = x + 30;

  return (
    <>
      <desc>Load / DC</desc>
      {/* Title */}
      <text
        data-testid="svg-load-dc-title"
        x={x - 20}
        y={y}
        className={classes.loadDCTitle}
      >
        {title}
      </text>
      {/* Current power to/from grid  */}
      <text
        x={labelTextPositionX}
        y={y + 45}
        className={classes.currentPowerGridTitle}
      >
        {totalLoadText}
      </text>

      {/* Load DC Icon */}
      <SvgIcon x={loadDcIconPositionX} y={LoadDcIconPositionY} />

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

LoadDC.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  description: PropTypes.string,
  totalLoad: PropTypes.object,
  deviceGroupStatusId: PropTypes.number,
};
export default LoadDC;
