import { makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';

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
    fontSize: '11px',
  },
  labelTitle: {
    fontSize: '12px',
    fontWeight: '600',
  },
});

const Labeling = (props) => {
  const classes = useStyles();
  const { x = 0, y = 0, label, description } = props;

  const dxPaddingValue = 5;

  return (
    <>
      <desc>Label</desc>
      <text x={x} y={y} className={classes.label}>
        <tspan className={classes.labelTitle}>{label}:</tspan>
        <tspan dx={dxPaddingValue} className={classes.totalLoadTitle}>
          {description}
        </tspan>
      </text>
    </>
  );
};

Labeling.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  label: PropTypes.string,
  description: PropTypes.string,
};

export default Labeling;
