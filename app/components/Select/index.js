/**
 *
 * Select
 * Generates a custom select component, the prop status determines if the select is for status
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import SelectStatus from './SelectStatus';
import SelectCustomOptions from './SelectCustomOptions';
import SelectMultiple from './SelectMultiple';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    objectFit: 'contain',
  },
});

/**
 * Select Creates a custom select component, the prop status determines if the select is for status
 * @param {string} placeholder Text to show when nothing is selected
 * @param {boolean} status Flag to show the status select control
 * @param {array} selectData Data to show
 * @param {Object} selectedObject Object selected by default
 * @param {boolean} invalid Flag to show invalid style
 * @param {Object} errorText Text to show when error is shown
 * @param {boolean} disabled Flag to disable control
 * @param {function} onChange Function to execute when changing value
 * @param {boolean} error Flag to show error message
 * @param {boolean} multiple Flag to show multiple selection option
 * @param {function} onClose Function to execute when closing the select, useful to handle when the user clicks outside
 * @param {function} renderSelectedValue Function to execute when showing the select result in multiple option
 */
function Select({
  placeholder = '',
  status = false,
  selectData = [],
  selectedObject,
  invalid = false,
  errorText,
  disabled = false,
  error = false,
  multiple = false,
  onChange,
  onClose,
  renderSelectedValue,
  wrapperStyleClass,
}) {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.wrapper, wrapperStyleClass)}>
      {status && !multiple && (
        <SelectStatus
          placeholder={placeholder}
          selectData={selectData}
          onChange={onChange}
          selectedObject={selectedObject}
        />
      )}
      {!status && !multiple && (
        <SelectCustomOptions
          placeholder={placeholder}
          selectData={selectData}
          onChange={onChange}
          selectedObject={selectedObject}
          invalid={invalid}
          errorText={errorText}
          disabled={disabled}
          onClose={onClose}
          error={error}
        />
      )}
      {multiple && !status && (
        <SelectMultiple
          placeholder={placeholder}
          selectData={selectData}
          onChange={onChange}
          selectedObject={selectedObject}
          invalid={invalid}
          errorText={errorText}
          disabled={disabled}
          onClose={onClose}
          error={error}
          renderSelectedValue={renderSelectedValue}
        />
      )}
    </Box>
  );
}

Select.propTypes = {
  placeholder: PropTypes.string,
  status: PropTypes.bool,
  selectData: PropTypes.array,
  onChange: PropTypes.func,
  selectedObject: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  errorText: PropTypes.object,
  onClose: PropTypes.func,
  error: PropTypes.bool,
  multiple: PropTypes.bool,
  renderSelectedValue: PropTypes.func,
  wrapperStyleClass: PropTypes.string,
};

export default Select;
