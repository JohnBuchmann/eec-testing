/**
 *
 * HeaderQuickConfiguration.js
 * Header content for quick configuration
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import messages from './messages';
import Button from '../Button';
import Input from '../Input';

const useStyles = makeStyles({
  leftSeparator: {
    marginLeft: '2rem',
  },
  searchInput: {
    width: '16.25rem',
    height: '2rem',
    marginRight: '1rem',
  },
  searchIcon: {
    width: '1.5rem',
    height: '1.5rem',
  },
  upperWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: '4.5rem',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  controlsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    objectFit: 'contain',
    marginRight: '1.75rem',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '24px !important',
    fontFamily: 'Inter, sans-serif !important',
    fontWeight: '600 !important',
    letterSpacing: '0.01em !important',
  },
  buttonWrapper: {
    height: '2.5rem',
    width: '7.875rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
});

/**
 * HeaderQuickConfiguration
 * @param {string} title Title to show
 * @param {string} searchText Search Text
 * @param {function} onSearchTextChange Event to execute when search text value changes
 * @param {function} onCreateNew Event to execute when clicking the new button
 */
const HeaderQuickConfiguration = ({
  title = '',
  searchText = '',
  onSearchTextChange,
  onCreateNew,
}) => {
  const classes = useStyles();

  /**
   * Handle Create New Quick Configuration Click Event
   * @param {object} event Create new event
   */
  const handleCreateNewClick = (event) => {
    onCreateNew(event);
  };

  return (
    <>
      <Box className={classes.upperWrapper}>
        <Box className={classes.titleWrapper} data-testid="header-title">
          <Typography className={`${classes.leftSeparator} ${classes.title}`}>
            {title}
          </Typography>
        </Box>
        <Box className={classes.controlsWrapper}>
          <FormattedMessage {...messages.search}>
            {(placeholder) => (
              <Input
                className={classes.searchInput}
                placeholder={placeholder}
                icon="searchIcon"
                value={searchText}
                onChange={onSearchTextChange}
              />
            )}
          </FormattedMessage>
          <div className={classes.buttonWrapper}>
            <Button secondary handleRoute={handleCreateNewClick}>
              <FormattedMessage {...messages.createNew} />
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

HeaderQuickConfiguration.propTypes = {
  title: PropTypes.string,
  onCreateNew: PropTypes.func,
  searchText: PropTypes.string,
  onSearchTextChange: PropTypes.func,
};

export default HeaderQuickConfiguration;
