import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import images from 'Assets/images';
import PropTypes from 'prop-types';
import React from 'react';
import { MaskedInput } from 'react-control-library';
import { Colors } from 'Theme';
import { regex } from 'Utils/enums/regularExpressions';
import { iconAlignmentType } from './enum';

// This object is a helper to store all style for the component
const useStyles = makeStyles({
  iconButton: {
    padding: '0px 10px 0px 0px',
  },
  icon: {
    width: '1.5rem',
    height: '1.5rem',
  },
  maskedInput: {
    color: Colors.rgbaGray87,
    cursor: 'text',
    display: 'inline-flex',
    position: 'relative',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontStyle: 'normal',
    alignItems: 'center',
    fontFamily: 'Inter, sans-serif !important',
    fontWeight: 'normal',
    lineHeight: '18px',
    fontStretch: 'normal',
    letterSpacing: '-0.1px',
    backgroundColor: Colors.athensGray,
    borderColor: Colors.mercury,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '2px',
    height: '40px',
    width: '175.8px',
    padding: '8px',
  },
  inputError: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: `${Colors.alizarinCrimson} !important`,
      },
    },
  },
});

const InputComponent = ({
  icon,
  placeholder,
  onChange,
  value,
  name,
  type,
  id,
  helperText,
  multiline,
  invalid,
  disabled,
  alignRight,
  onFocus,
  onBlur,
  inputProps,
  rows,
  autoFocus,
  iconAlignment,
  iconClick,
}) => {
  const classes = useStyles();
  const image = icon ? images[`${icon}`] : null;
  const alignRightStyle = {
    textAlign: 'right',
    paddingRight: '12px',
  };
  const inputStyles = alignRight ? alignRightStyle : {};

  /* getIconTemplate
   * Method to get and html template to display an icon
   * @return {object} React node that store icon html template
   */
  const getIconTemplate = () => {
    let iconTemplate = <></>;

    if (icon) {
      if (iconClick) {
        iconTemplate = (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={iconClick}
            className={classes.iconButton}
          >
            <img src={image} alt={placeholder} id="icon" />
          </IconButton>
        );
      } else {
        iconTemplate = (
          <img
            className={classes.icon}
            src={image}
            alt={placeholder}
            id="icon"
          />
        );
      }
    }

    return iconTemplate;
  };

  /* getCustomInputProps
   * Method to get a custom input styling
   * @return {object} Object with custom properties for custom input styling
   */
  const getCustomInputProps = () => {
    const customInputProps = {
      inputProps: {
        style: {
          marginLeft: '5px',
          padding: 0,
          ...inputStyles,
        },
        ...inputProps,
      },
    };

    const inputAdornmentTemplate = (
      <>{icon && <InputAdornment>{getIconTemplate()}</InputAdornment>}</>
    );

    if (iconAlignment === iconAlignmentType.right) {
      customInputProps.endAdornment = inputAdornmentTemplate;
    } else {
      customInputProps.startAdornment = inputAdornmentTemplate;
    }

    return customInputProps;
  };
  const getPhoneMask = () => regex.phoneMask;
  const textField = (
    <TextField
      className={invalid ? classes.inputError : ''}
      multiline={multiline || false}
      error={invalid || false}
      fullWidth
      name={name}
      id={id}
      onChange={onChange}
      value={value}
      type={type}
      helperText={invalid ? helperText : null}
      disabled={disabled || false}
      placeholder={placeholder}
      variant="outlined"
      onFocus={onFocus}
      onBlur={onBlur}
      rows={rows || 1}
      InputProps={getCustomInputProps()}
      autoFocus={autoFocus}
    />
  );
  const telephoneType = 'tel';
  const mask = type === telephoneType ? getPhoneMask() : null;
  const maskedInput = (
    <MaskedInput
      mask={mask}
      name={name}
      id={id}
      onChange={onChange}
      value={value}
      type={type}
      disabled={disabled || false}
      placeholder={placeholder}
      variant="outlined"
      onFocus={onFocus}
      onBlur={onBlur}
      rows={rows || 1}
      autoFocus={autoFocus}
      className={classes.maskedInput}
    />
  );

  return mask ? maskedInput : textField;
};

InputComponent.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  id: PropTypes.string,
  helperText: PropTypes.string,
  multiline: PropTypes.bool,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  alignRight: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  inputProps: PropTypes.object,
  rows: PropTypes.number,
  autoFocus: PropTypes.bool,
  iconAlignment: PropTypes.number,
  iconClick: PropTypes.func,
};

export default InputComponent;
