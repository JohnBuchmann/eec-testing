import React from 'react';
import { Colors } from 'Theme';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Box, makeStyles } from '@material-ui/core';
// import { MonthlyData } from 'Internals/mocks/charts.mock';
import ChartContainer from '../ChartContainer';
import messages from './messages';
import SolarProductionChart from './solarProduction';
import PowerGraphChart from './powerGraph';
import BatteryPerformanceChart from './batteryPerformance';
// import UptimePerformanceChart from './uptimePerformanceChart';
/**
 * Styles for chart
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
  chartingHeader: {
    height: '50px',
    marginBottom: '16px',
    backgroundColor: Colors.white,
  },
  chartsWrapper: {
    marginTop: '20px',
  },
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
 * MonthlyCharts
 * Component to wrap all monthly charts
 * @param {object} props Component properties
 */
const MonthlyCharts = (props) => {
  const classes = useStyles();
  const { formatMessage } = props.intl;
  const { MonthlyReport } = messages;
  const { reportConfig } = props;
  const {
    charts = {},
    interval = { value: '' },
    scale = { value: '' },
  } = reportConfig;
  const config = { interval: interval.value, scale: scale.value };
  const solarTitle = formatMessage(MonthlyReport.solarTitle);
  const powerGraphTitle = formatMessage(MonthlyReport.powerGraphTitle);
  // const siteUptimeTitle = formatMessage(MonthlyReport.uptimePerformanceTitle);
  const batteryPerformanceTitle = formatMessage(
    MonthlyReport.batteryPerformanceTitle
  );
  const { solars, monthlyPowerGraphs, batteryPerformance } = charts;
  // const { uptimePerformanceData } = MonthlyData;

  return (
    <>
      <Box className={classes.panelsWrapper}>
        <Box className={classes.firstColumnWrapper}>
          <ChartContainer
            title={solarTitle}
            chart={<SolarProductionChart data={solars} config={config} />}
            data-testid="content-solarProductionChart"
          />
        </Box>
        <Box className={classes.columnWrapper}>
          <ChartContainer
            title={powerGraphTitle}
            chart={
              <PowerGraphChart data={monthlyPowerGraphs} config={config} />
            }
            data-testid="content-powerGraphChart"
          />
        </Box>
      </Box>
      <Box className={classes.panelsWrapper}>
        <Box className={classes.firstColumnWrapper}>
          <ChartContainer
            title={batteryPerformanceTitle}
            chart={
              <BatteryPerformanceChart
                data={batteryPerformance}
                config={config}
              />
            }
            data-testid="content-batteryPerformanceChart"
          />
        </Box>
        {/* // hiding for now - uptime performance donut is being de-scoped until the backend is ready.
        <Box className={classes.columnWrapper}>
          <ChartContainer
            title={siteUptimeTitle}
            chart={<UptimePerformanceChart data={uptimePerformanceData} />}
            data-testid="content-uptimePerformanceChart"
          />
        </Box> */}
      </Box>
    </>
  );
};
/**
 * MonthlyCharts PropTypes
 */
MonthlyCharts.propTypes = {
  intl: PropTypes.any.isRequired,
  reportConfig: PropTypes.object.isRequired,
};

export default injectIntl(MonthlyCharts);
