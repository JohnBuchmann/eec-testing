/**
 * Power Grid
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
  powerGridTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.surfCrest,
    fontSize: '11px',
    fontWeight: '300',
    lineHeight: 'normal',
    letterSpacing: '0px',
  },
  currentPowerFlowTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.white,
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: 'normal',
    letterSpacing: '0.2px',
  },
});

/**
 * @method Power Grid
 * Displays Power Grid
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Power Grid component
 */
function PowerGrid(props) {
  const classes = useStyles();
  const { x = 0, y = 0, gridStatus, powerGridFlow } = props;

  const title = 'POWER GRID';
  const labelDecimals = 1;
  const powerGridFlowValue = getValueIfExists(
    () => powerGridFlow.currentFlow,
    0
  );

  const powerGridFlowText = `${formatSI(
    powerGridFlowValue,
    ScaleSymbol.Kilo,
    labelDecimals,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watt}`;

  const statusId = getValueIfExists(() => gridStatus.value, 0);

  const powerGridIconPositionX = x + 8;
  const powerGridIconPositionY = y + 17;
  const statusIconPositionX = x + 6;
  const statusIconPositionY = y + 43;
  const labelTextPositionX = x + 8;

  return (
    <>
      <desc>Power Grid</desc>
      <text
        x={x}
        y={y}
        data-testid="svg-power-grid-title"
        className={classes.powerGridTitle}
      >
        {title}
      </text>
      <text
        x={labelTextPositionX}
        y={314}
        className={classes.currentPowerFlowTitle}
      >
        {powerGridFlowText}
      </text>
      {/* Power Grid Icon */}
      <SvgIcon x={powerGridIconPositionX} y={powerGridIconPositionY} />
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

PowerGrid.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  powerGridFlow: PropTypes.object,
  gridStatus: PropTypes.object,
};

export default PowerGrid;
