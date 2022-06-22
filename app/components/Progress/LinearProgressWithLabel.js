/**
 * Linear progress with label component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Colors } from 'Theme';

const useStyles = makeStyles({
  labelContainer: {
    display: 'flex',
    alignItems: 'baseline',
  },
  title: {
    color: Colors.white,
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    fontWeight: '500',
    paddingLeft: '5px',
  },
  label: {
    color: Colors.white,
    fontFamily: 'Inter, sans-serif',
    fontSize: '9px',
  },
});

/**
 * Displays a linear progress bar with a label to display the percentage
 * @param {*} props
 */
function LinearProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box {...props} mr="11px">
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth="23px" className={classes.labelContainer}>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.label}
        >
          {props.label}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.title}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel;
