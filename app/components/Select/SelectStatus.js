/**
 *
 * SelectStatus.js
 *
 * A common custom select that uses an icon as its main view instead of an input box
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Typography, Popover, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import images from 'Assets/images';

// This object is a helper to store all style for the component
const useStyles = makeStyles({
  iconChevron: {
    height: '1rem',
    width: '1rem',
    marginRight: 0,
    marginLeft: 'auto',
  },
  iconCheck: {
    height: '1.5rem',
    width: '1.5rem',
    marginRight: 0,
    marginLeft: 'auto',
  },
  selectMock: {
    marginLeft: '0.5rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.125rem 0.25rem',
    borderRadius: '2px',
    border: (props) => `solid 2px ${props.selectedColor}`,
    letterSpacing: '-0.08px',
    color: (props) => props.selectedColor,
    '& .MuiButton-label': {
      fontSize: '0.75rem',
      fontWeight: '600',
      margin: '0 0.25rem',
      padding: '0',
    },
  },
  childrenText: {
    fontSize: '0.75rem',
    fontWeight: '600',
    margin: '0 0.25rem',
  },
});

/**
 * SelectStatus creates a select that uses an icon as its main view instead of an input box
 *
 * @param {Object[text, value]} selectData Data to show
 * @param {Object} selectedObject Object selected by default
 * @param {function} onChange Function to execute when changing value
 */
function SelectStatus({ selectData = [], selectedObject = {}, onChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState(selectedObject);
  const [selectedColor, setSelectedColor] = React.useState(
    selectedObject.color
  );
  const classes = useStyles({ selectedColor });

  /**
   * openSelect Allows handle event when click on select status button
   * @param {object} event Event object of the click event
   */
  const openSelect = (event) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  /**
   * openSelect
   * Allows handle event when an option is selected
   * @param {object} event Event object of the click event
   */
  const handleSelect = (element = {}) => {
    const { text = null, color = null, value = null, chevron = null } = element;
    if (!text && !color && !value && !chevron) {
      setAnchorEl(null);
      return;
    }
    setSelectedOption(element);
    setSelectedColor(color);
    onChange(value);
    setAnchorEl(null);
  };

  const selectItems = selectData
    .filter((element) => !!element)
    .map((element) => (
      <MenuItem
        value={element.value}
        key={element.value}
        onClick={() => handleSelect(element)}
        style={{ width: '13.5rem' }}
      >
        <Box style={{ border: `solid 2px ${element.color}` }}>
          <Typography
            className={classes.childrenText}
            style={{
              color: element.color,
            }}
          >
            {element.text.toUpperCase()}
          </Typography>
        </Box>
        {selectedOption.text === element.text && (
          <img
            alt="checked"
            src={images.checkIcon}
            className={classes.iconCheck}
          />
        )}
      </MenuItem>
    ));

  return (
    <>
      <Button
        aria-controls="search-menu"
        aria-haspopup="true"
        onClick={openSelect}
        className={classes.selectMock}
        fullWidth
      >
        {selectedOption.text}
        <img
          alt="v"
          src={selectedOption.chevron}
          className={classes.iconChevron}
        />
      </Button>
      <Popover
        id="search-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleSelect()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        BackdropProps={{ 'data-testid': 'backdrop' }}
      >
        {selectItems}
      </Popover>
    </>
  );
}

SelectStatus.propTypes = {
  selectData: PropTypes.array,
  onChange: PropTypes.any,
  selectedObject: PropTypes.object,
};

export default SelectStatus;
