/**
 *
 * SelectMultiple.js
 *
 * A common custom select with option multi-select
 */

import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import images from 'Assets/images';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { Colors } from 'Theme';
import { firstElement, getValueIfExists } from 'Utils/propertyValidation';
import {
  allOptions,
  allCustomerOptions,
  allAreaOptions,
  allLocationOptions,
} from 'Utils/enums/site';
import messages from './messages';
// This object is a helper to store all style for the component
const useStyles = makeStyles({
  selectWrapper: {
    marginRight: 0,
    marginLeft: 'auto',
  },
  selectMock: {
    width: '170px',
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
    color: Colors.lunarGreen,
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
    fontSize: '0.875rem',
    letterSpacing: '-0.08px',
    margin: '0 0.25rem',
    padding: '0',
  },
  titleText: {
    backgroundColor: Colors.white,
    marginTop: '0',
    marginBottom: '0',
  },
});

/**
 * SelectCustomOptions creates a dropdown list component with option multi-select
 *
 * @param {string} placeholder Text to show when nothing is selected
 * @param {Object[text, value]} selectData Data to show
 * @param {boolean} invalid Flag to show invalid style
 * @param {Object} errorText Text to show when error is shown
 * @param {boolean} disabled Flag to disable control
 * @param {boolean} error Flag to show error message
 * @param {Object[text, value]]} selectedObject Object selected by default
 * @param {function} onChange Function to execute when changing value
 * @param {function} onClose Function to execute when closing the select, useful to handle when the user clicks outside
 * @param {function} renderSelectedValue Function to execute when showing the select result in multiple option
 */
function SelectCustomOptions(propsInput) {
  const {
    placeholder = '',
    selectData = [],
    invalid = false,
    disabled = false,
    errorText,
    selectedObject = [],
    error = false,
    onChange,
    onClose,
    renderSelectedValue,
    title,
  } = propsInput;

  const classes = useStyles({
    invalid,
  });
  const [selectedOption, setSelectedOption] = React.useState(
    selectedObject || []
  );

  const defaultAllOptionValue = 0;
  const { formatMessage } = propsInput.intl;

  /**
   * isSelectAllChecked It will return true when item with git value 0 is selected
   */
  const isSelectAllChecked = () =>
    selectedOption.findIndex((item) => item.value === defaultAllOptionValue) >
    -1;

  React.useEffect(() => {
    if (getValueIfExists(() => selectedOption.length, 0) > 0) {
      const options = isSelectAllChecked()
        ? [...selectData]
        : [...selectedOption];
      onChange(options);
    }
  }, [selectedOption]);

  React.useEffect(() => {
    if (
      getValueIfExists(() => selectedObject.length, 0) === 0 ||
      (getValueIfExists(() => selectedObject.length, 0) === 1 &&
        selectedObject.indexOf(0) > -1)
    ) {
      switch (title) {
        case 'Status':
          setSelectedOption([allOptions]);
          break;
        case 'Customer':
          setSelectedOption([allCustomerOptions]);
          break;
        case 'Area':
          setSelectedOption([allAreaOptions]);
          break;
        case 'Site':
          setSelectedOption([allLocationOptions]);
          break;
        default:
          break;
      }
    }
  }, [selectedObject]);

  /**
   * handleChangeMultiple Allows handle event when an option was selected or de-selected
   * @param {object} event Event object of the click event
   */
  const handleChangeMultiple = (event, item) => {
    const { props = {} } = item || {};
    if (props && event && event.target) {
      const { value: filterSelected } = event.target || {};
      const { value: itemSelected } = props || {};
      let selected = [];
      if (itemSelected.value === defaultAllOptionValue) {
        selected.push(firstElement(selectData));
      } else {
        _.remove(filterSelected, firstElement(selectData));
        const isChecked =
          selectedOption.findIndex(
            (option) => option.value === itemSelected.value
          ) > -1;
        if (isChecked) {
          _.remove(filterSelected, itemSelected);
          if (!filterSelected.length) {
            filterSelected.push(itemSelected);
          }
        }
        selected = filterSelected;
      }
      setSelectedOption(selected);
    }
  };

  /**
   * handleRenderValue  Allows render the selected value from select component
   * @param {object} render Data selected to render
   */
  const handleRenderValue = (render) => {
    if (renderSelectedValue) {
      return renderSelectedValue(render);
    }
    if (isSelectAllChecked()) {
      return formatMessage(messages.all);
    }
    if (render && render.length) {
      let elementText = firstElement(render).text;
      const onlyOneElement = 1;
      if (render.length > onlyOneElement) {
        elementText = `${render.length} ${formatMessage(
          messages.filtersApplied
        )}`;
      }
      return elementText;
    }
    return '';
  };

  const selectItems = selectData
    .filter((element) => !!element)
    .map((element) => {
      const checked =
        selectedOption.findIndex((option) => option.text === element.text) >
          -1 ||
        selectedObject.findIndex(
          (option) => option === element.value && option === 0
        ) > -1;
      return (
        <MenuItem value={element} key={element.value}>
          <Checkbox checked={checked} color="default" value={element} />
          <Typography className={classes.childrenText}>
            {element.text}
          </Typography>
        </MenuItem>
      );
    });

  return (
    <FormControl className={classes.formControl}>
      <h4 className={classes.titleText}>{title}</h4>
      <InputLabel
        htmlFor="select-native-simple"
        className={classes.placeholder}
      >
        {placeholder}
      </InputLabel>
      <Select
        fullWidth
        multiple
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
        onChange={handleChangeMultiple}
        renderValue={handleRenderValue}
        defaultValue={firstElement(selectedOption)}
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
  selectedObject: PropTypes.array,
  onClose: PropTypes.func,
  error: PropTypes.bool,
  renderSelectedValue: PropTypes.func,
  intl: PropTypes.any.isRequired,
  title: PropTypes.string,
};

export default injectIntl(SelectCustomOptions);
