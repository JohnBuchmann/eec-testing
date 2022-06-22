/**
 *
 * HeaderBasic.js
 * A basic header content
 */

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import PropTypes from 'prop-types';
import React from 'react';
import Breadcrumbs from '../Breadcrumbs';

const useStyles = makeStyles({
  wrapper: {
    minHeight: '93px',
    backgroundColor: Colors.white,
  },
  titleWrapper: {
    marginLeft: '24px',
    marginTop: '24px',
    display: 'inline-block',
  },
  title: {
    fontSize: '24px !important',
    fontFamily: 'Inter, sans-serif !important',
    fontWeight: '600 !important',
    letterSpacing: '0.01em !important',
  },
  upperWrapper: {
    alignItems: 'center',
  },
  lowerWrapper: {
    justifyContent: 'space-between',
  },
});

/**
 * HeaderBasic
 * @param {string} title Title to show
 * @param {object} breadcrumbs Breadcrumbs to show
 */
const HeaderBasic = ({ title, breadcrumbs }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Box className={classes.upperWrapper}>
        <Box className={classes.titleWrapper} data-testid="header-title">
          <Typography className={`${classes.leftSeparator} ${classes.title}`}>
            {title}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.lowerWrapper}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Box>
    </div>
  );
};

HeaderBasic.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.array.isRequired,
};

export default HeaderBasic;
