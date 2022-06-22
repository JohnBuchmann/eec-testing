import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';

// This object is a helper to store all style for the component
const useStyles = makeStyles(() => ({
  alt: {
    color: Colors.lunarGreen,
    background: Colors.silver,
    '&:hover': {
      backgroundColor: Colors.silver,
    },
    '&.Mui-selected': {
      color: Colors.lunarGreen,
      background: Colors.white,
      '&:hover': {
        backgroundColor: Colors.white,
      },
    },
  },
  button: {
    '&.Mui-selected.Mui-disabled': {
      backgroundColor: `${Colors.gray} !important`,
    },
  },
}));

/**
 * Switch Creates a custom toggle button
 * @param {string} leftValue Text and value displayed on the left side of the toggle button
 * @param {string} rightValue Text and value displayed on the right side of the toggle button
 * @param {string} value Value selected
 * @param {function} onChange Function to execute when changing value
 * @param {boolean} alternativeColor Flag to display component with alternative colors
 * @param {boolean} disabled Flag to disabled toggles
 */
function Switch({
  leftOption,
  rightOption,
  value,
  onChange,
  alternativeColor,
  disabled = false,
}) {
  const classes = useStyles();
  const { label: leftLabel, value: leftValue, icon: leftIcon } = leftOption;
  const { label: rightLabel, value: rightValue, icon: rightIcon } = rightOption;

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={onChange}
      aria-label="text alignment"
    >
      <ToggleButton
        disabled={disabled}
        value={leftValue}
        aria-label="left aligned"
        className={`${classes.button} ${alternativeColor ? classes.alt : ''}`}
      >
        {leftIcon && <img src={leftIcon} alt={leftLabel} id="icon" />}
        {!leftIcon && <span>{leftLabel}</span>}
      </ToggleButton>

      <ToggleButton
        disabled={disabled}
        value={rightValue}
        aria-label="centered"
        className={`${classes.button} ${alternativeColor ? classes.alt : ''}`}
      >
        {rightIcon && <img src={rightIcon} alt={rightLabel} id="icon" />}
        {!rightIcon && <span>{rightLabel}</span>}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

Switch.propTypes = {
  leftOption: PropTypes.object.isRequired,
  rightOption: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  alternativeColor: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Switch;
