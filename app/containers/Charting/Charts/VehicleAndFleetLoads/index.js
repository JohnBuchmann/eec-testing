import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { getTimePeriodTitle } from 'Utils/reports';
import { injectIntl } from 'react-intl';
import EVLoadInMWH from './evLoadInMWH';
import FleetLoadInMWH from './fleetLoadInMWH';
import ChartContainer from '../ChartContainer';
import messages from './messages';

/**
 * Declare UI styles
 */
const useStyles = makeStyles({
  panelsWrapper: {
    display: 'flex',
    alignItems: 'stretch',
    marginBottom: '16px',
  },
  firstColumnWrapper: {
    marginRight: '18px',
  },
});

/**
 * Vehicle and fleet loads charts
 */
function VehicleAndFleetLoadsCharts(props) {
  const { formatMessage } = props.intl;
  const { reportConfig = {} } = props;
  const {
    charts = {},
    interval = { value: '' },
    scale = { value: '' },
  } = reportConfig;
  const config = { interval: interval.value, scale: scale.value };
  const timePeriod = getTimePeriodTitle(reportConfig);
  const evloadTitle = `${formatMessage(messages.evLoadInMWH)} - ${timePeriod}`;
  const fleetLoadTitle = `${formatMessage(
    messages.fleetLoadInMWH
  )} - ${timePeriod}`;
  const classes = useStyles();
  const { evLoad, fleetLoad } = charts;

  return (
    <Box className={classes.panelsWrapper}>
      <Box className={classes.firstColumnWrapper}>
        <ChartContainer
          title={evloadTitle}
          chart={<EVLoadInMWH data={evLoad} config={config} />}
        />
      </Box>
      <Box>
        <ChartContainer
          title={fleetLoadTitle}
          chart={<FleetLoadInMWH data={fleetLoad} config={config} />}
        />
      </Box>
    </Box>
  );
}

VehicleAndFleetLoadsCharts.propTypes = {
  intl: PropTypes.any,
  reportConfig: PropTypes.object,
};

export default injectIntl(VehicleAndFleetLoadsCharts);
