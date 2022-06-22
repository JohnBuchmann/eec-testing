import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, makeStyles } from '@material-ui/core';
import Panel from 'Components/Panel';

/**
 * Declare UI styles
 */
const useStyles = makeStyles({
  chartTitleContainer: {
    position: 'relative',
    display: 'inline-block',
    margin: '24px 16px 25px 16px',
  },
  chartTitle: {
    fontWeight: '600',
    fontSize: '14px',
  },
});

/**
 * Chart container
 * @param {string} Title Chart panel title
 * @param {object} Chart Chart component
 */
const ChartContainer = ({ title = '', chart = {} }) => {
  const classes = useStyles();
  const chartTitle = (
    <Box className={classes.chartTitleContainer}>
      <Typography
        variant="caption"
        data-testid="content-chartTitle"
        className={classes.chartTitle}
      >
        {title}
      </Typography>
    </Box>
  );
  return <Panel headerContent={chartTitle} content={chart} />;
};

ChartContainer.propTypes = {
  title: PropTypes.string,
  chart: PropTypes.node,
};

export default ChartContainer;
