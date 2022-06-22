/**
 * Inverter
 */

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Colors } from 'Theme';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  cumulativePowerTitle: {
    color: Colors.surfCrest,
    fontSize: '11px',
  },
});

/**
 * @method Inverter
 * Displays a inverter
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns Ignition inverter component
 */
function Inverter(props) {
  const classes = useStyles();
  const title = 'Inverter';
  const defaultWidth = 18;
  const defaultHeight = 36;
  const {
    x = 0,
    y = 0,
    width: inverterWidth = defaultWidth,
    height: inverterHeight = defaultHeight,
    cumulativePower,
    isCenteredLabel,
    labelName = title,
    units,
  } = props;

  const totalLoadText = `${
    cumulativePower ? cumulativePower.toFixed(1) : 0
  } ${units || ''}`;

  const svgHeightInverter = inverterHeight;
  let svgWidthInverter = inverterWidth;
  if (!isCenteredLabel) {
    svgWidthInverter = inverterWidth + 70;
  }

  const cumulativePowerLabel = (
    <>
      <tspan data-testid="svg-power-value" x="60%" y="40%">
        {totalLoadText}
      </tspan>
      <tspan data-testid="svg-inverter-title" x="60%" dy="1.2em">
        {labelName}
      </tspan>
    </>
  );

  const centeredCumulativePowerLabel = (
    <>
      <tspan x="50%" y="40%" data-testid="svg-power-value">
        {labelName}
      </tspan>
      <tspan x="50%" dy="1.8em" data-testid="svg-inverter-title">
        {totalLoadText}
      </tspan>
    </>
  );

  /**
   * Component content
   */
  return (
    <>
      <svg
        x={x - 8}
        y={y + 32}
        width={svgWidthInverter}
        height={svgHeightInverter}
      >
        <svg width={inverterWidth} height={inverterHeight}>
          <rect
            width={inverterWidth}
            height={inverterHeight}
            stroke={Colors.white}
            strokeWidth={4}
            fill={Colors.lunarGreen}
          />
        </svg>
        <text textAnchor="middle" className={classes.cumulativePowerTitle}>
          {isCenteredLabel
            ? centeredCumulativePowerLabel
            : cumulativePowerLabel}
        </text>
      </svg>
    </>
  );
}

Inverter.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  cumulativePower: PropTypes.number,
  isCenteredLabel: PropTypes.bool,
  units: PropTypes.string,
  labelName: PropTypes.string,
};

export default Inverter;
