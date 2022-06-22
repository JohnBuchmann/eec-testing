import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { getTimePeriodTitle } from 'Utils/reports';
import { IntervalCatalog } from 'Utils/enums/interval';
import ChartContainer from '../ChartContainer';
import AverageEnergyUse from './averageEnergyUse';
import EnergyFromToGridChart from './energyFromToGridChart';
import MaxEnergyDemandChart from './maxEnergyDemand';
import ProductionVsFacilityChart from './productionVsFacilityChart';
import PeakDemandChart from './peakDemandChart';
import messages from './messages';

/**
 * Component Style
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
  display: {
    display: 'none',
  },
});

/**
 * UsageVsProductionCharts
 * Component to wrap all usage vs production charts
 * @param {object} props Component properties
 */
const UsageVsProductionCharts = (props) => {
  const classes = useStyles();
  const { formatMessage } = props.intl;
  const { usageVsProductionCharts: usageVsProductionChartsMessages } = messages;
  const { reportConfig = {} } = props;
  const {
    charts = {},
    interval = { value: '' },
    scale = { value: '' },
  } = reportConfig;
  const config = { interval: interval.value, scale: scale.value };
  const usageVsProductionChartTitle = formatMessage(
    usageVsProductionChartsMessages.usageVsProductionChartTitle
  );
  const energyToFromGridChartTitle = formatMessage(
    usageVsProductionChartsMessages.energyToFromGridChartTitle
  );
  const averageEnergyMessage =
    interval.value === IntervalCatalog.day
      ? usageVsProductionChartsMessages.DailyEnergyUseChartTitle
      : usageVsProductionChartsMessages.averageDailyEnergyUseChartTitle;
  const averageEnergyUseChartTitle = `${formatMessage(
    averageEnergyMessage
  )} - ${getTimePeriodTitle(reportConfig)}`;
  const maxEnergyDemandChartTitle = `${formatMessage(
    usageVsProductionChartsMessages.maxEnergyDemandChartTitle
  )} ${interval.text}`;

  const peakDemandChartTitle = `${formatMessage(
    usageVsProductionChartsMessages.peakDemandChartTitle
  )} ${interval.text}`;

  const {
    productionVsFacilityUse,
    energyToFromGrid,
    averageEnergyUse,
    maxEnergyDemand,
    peakDemandByMonth,
  } = charts;

  return (
    <>
      <Box className={classes.panelsWrapper}>
        <Box className={classes.firstColumnWrapper}>
          <ChartContainer
            title={usageVsProductionChartTitle}
            chart={
              <ProductionVsFacilityChart
                data={productionVsFacilityUse}
                config={config}
              />
            }
            data-testid="chartContainer-usageVsProduction"
          />
        </Box>
        <Box className={classes.columnWrapper}>
          <ChartContainer
            title={energyToFromGridChartTitle}
            chart={
              <EnergyFromToGridChart data={energyToFromGrid} config={config} />
            }
            data-testid="chartContainer-energyToFromGrid"
          />
        </Box>
      </Box>
      <Box className={classes.panelsWrapper}>
        <Box className={classes.firstColumnWrapper}>
          <ChartContainer
            title={averageEnergyUseChartTitle}
            chart={<AverageEnergyUse data={averageEnergyUse} config={config} />}
            data-testid="chartContainer-averageEnergyUse"
          />
        </Box>
        <Box className={(classes.columnWrapper, classes.display)}>
          <ChartContainer
            title={maxEnergyDemandChartTitle}
            chart={
              <MaxEnergyDemandChart data={maxEnergyDemand} config={config} />
            }
            data-testid="chartContainer-maxEnergyDemand"
          />
        </Box>
      </Box>
      <Box className={(classes.panelsWrapper, classes.display)}>
        <Box className={classes.firstColumnWrapper}>
          <ChartContainer
            title={peakDemandChartTitle}
            chart={<PeakDemandChart data={peakDemandByMonth} config={config} />}
          />
        </Box>
      </Box>
    </>
  );
};

UsageVsProductionCharts.propTypes = {
  intl: PropTypes.any.isRequired,
  reportConfig: PropTypes.object,
};

export default injectIntl(UsageVsProductionCharts);
