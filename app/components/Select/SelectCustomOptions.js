/**
 *
 * SelectCustomOptions.js
 *
 * A common standard custom select
 */

import {
  Avatar,
  FormControl,
  InputLabel,
  ListItemAvatar,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import images from 'Assets/images';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Colors } from 'Theme';
import { propertyExist } from 'Utils/propertyValidation';

// This object is a helper to store all style for the component
const useStyles = makeStyles({
  avatar: {
    height: '1.5rem',
    width: '1.5rem',
    borderRadius: '50%',
  },
  selectWrapper: {
    marginRight: 0,
    marginLeft: 'auto',
  },
  selectMock: {
    borderRadius: '2px',
    border: (props) =>
      `solid 1px ${props.invalid ? Colors.alizarinCrimson : Colors.mercury}`,
    backgroundColor: 'transparent',
    fontSize: '0.875rem',
    letterSpacing: '-0.08px',
    textTransform: 'inherit',
    '& .MuiButton-label': {
      fontSize: '0.875rem',
      letterSpacing: '-0.08px',
      padding: '0',
    },
  },
  errorInput: {
    color: Colors.alizarinCrimson,
    fontSize: '0.875rem',
    lineHeight: 1.14,
    visibility: (props) => `${props.invalid ? 'visible' : 'hidden'}`,
  },
  placeholder: {
    fontSize: '0.875rem',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.1px',
    color: Colors.dustyGray,
    transform: 'translate(1rem, 0.65rem) scale(1)',
  },
  formControl: {
    backgroundColor: Colors.athensGray,
    '& .MuiOutlinedInput-input': {
      display: 'flex',
    },
    '& .MuiInputLabel-shrink': {
      visibility: 'hidden',
    },
  },
  childrenText: {
    minHeight: '1.5rem',
    fontSize: '0.875rem',
    letterSpacing: '-0.08px',
    margin: '0 0.25rem',
    padding: '0',
  },
});

/**
 * SelectCustomOptions
 * Creates a standard dropdown list component
 * @param {string} placeholder Text to show when nothing is selected
 * @param {Object[text, value]} selectData Data to show
 * @param {boolean} invalid Flag to show invalid style
 * @param {Object} errorText Text to show when error is shown
 * @param {boolean} disabled Flag to disable control
 * @param {function} onChange Function to execute when changing value
 */
function SelectCustomOptions({
  placeholder = '',
  selectData = [],
  invalid = false,
  disabled = false,
  errorText,
  selectedObject,
  error = false,
  onChange,
  onClose,
}) {
  const classes = useStyles({ invalid });

  /**
   * getSelectedObjectValue
   * Validate and return selectedObject value
   */
  const getSelectedObjectValue = () =>
    propertyExist(() => selectedObject.value) ? selectedObject.value : '';

  const [selectedOption, setSelectedOption] = React.useState(
    getSelectedObjectValue()
  );

  useEffect(() => {
    if (selectedObject && selectedOption !== selectedObject.value) {
      setSelectedOption(getSelectedObjectValue());
    }
  }, [selectedObject]);

  /**
   * handleSelect
   * Manage change event when an option is selected
   * @param {string} text Text to show
   * @param {object} value Value to return
   */
  const handleSelect = (text = null, value = null) => {
    setSelectedOption(text);
    onChange(value);
  };

  const selectItems = selectData.map((element) => (
    <MenuItem
      value={element.text}
      key={`${element.text}${element.value}`}
      onClick={() => handleSelect(element.text, element.value)}
      disabled={element.disabled}
    >
      {element.icon && (
        <ListItemAvatar>
          <Avatar
            alt={element.text}
            src={element.icon}
            className={classes.avatar}
          />
        </ListItemAvatar>
      )}
      <Typography className={classes.childrenText}>{element.text}</Typography>
    </MenuItem>
  ));

  return (
    <FormControl className={classes.formControl}>
      <InputLabel
        htmlFor="select-native-simple"
        className={classes.placeholder}
      >
        {placeholder}
      </InputLabel>
      <Select
        fullWidth
        aria-controls="search-menu"
        aria-haspopup="true"
        disabled={disabled}
        value={selectedOption}
        placeholder={placeholder}
        className={classes.selectMock}
        variant="outlined"
        id="select-native-simple"
        onClose={onClose}
        error={error}
        data-testid="input-test"
        IconComponent={(props) => (
          <img
            alt="select-arrow"
            src={images.chevronIcon}
            className={classes.selectWrapper}
            {...props}
          />
        )}
      >
        {selectItems}
      </Select>
      <Typography className={classes.errorInput}>{errorText}</Typography>
    </FormControl>
  );
}

SelectCustomOptions.propTypes = {
  placeholder: PropTypes.string,
  selectData: PropTypes.array,
  onChange: PropTypes.any,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  errorText: PropTypes.object,
  selectedObject: PropTypes.object,
  onClose: PropTypes.func,
  error: PropTypes.bool,
};

export default SelectCustomOptions;
