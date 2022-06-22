import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import Panel from 'Components/Panel';
import { Colors } from 'Theme';
import { injectIntl } from 'react-intl';
import SolarProduction from './solarProduction';
import WindProduction from './windProduction';
import ReciprocatingEngineProduction from './reciprocatingEngineProduction';
import MicroturbineProduction from './microturbineProduction';
import messages from './messages';
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
 * EnergyProductionChart
 * Component to display charts: solar production, wind production, reciprocating engine production
 * and microturbine production
 * @param {object} props Properties for the controller
 */
const EnergyProductionChart = (props) => {
  const classes = useStyles();
  const { energyProduction: energyMessages } = messages;
  const { formatMessage } = props.intl;
  const { reportConfig } = props;
  const {
    charts = {},
    interval = { value: '' },
    scale = { value: '' },
  } = reportConfig;
  const {
    solarProduction,
    windProduction,
    reciprocatingProduction,
    microturbineProduction,
  } = charts;
  const config = { interval: interval.value, scale: scale.value };
  const solarTitle = formatMessage(energyMessages.solarTitle);
  const windTitle = formatMessage(energyMessages.windTitle);
  const reciprocatingTitle = formatMessage(energyMessages.reciprocatingTitle);
  const microturbineTitle = formatMessage(energyMessages.microturbineTitle);
  /**
   * loadInMWHTitle
   * Load title for display on chart header
   * @param {string} title receive title for chart
   */
  const loadInMWHTitle = (title) => (
    <Box className={classes.chartTitleContainer}>
      <Typography variant="caption" className={classes.chartTitle}>
        {title}
      </Typography>
    </Box>
  );

  return (
    <>
      <Box className={classes.panelsWrapper}>
        <Box className={classes.firstColumnWrapper}>
          <Panel
            data-testid="content-solarProductionChart"
            headerContent={loadInMWHTitle(solarTitle)}
            content={<SolarProduction data={solarProduction} config={config} />}
          />
        </Box>
        <Box className={classes.firstColumnWrapper}>
          <Panel
            data-testid="content-windProductionChart"
            headerContent={loadInMWHTitle(windTitle)}
            content={<WindProduction data={windProduction} config={config} />}
          />
        </Box>
      </Box>
      <Box className={classes.panelsWrapper}>
        <Box className={classes.firstColumnWrapper}>
          <Panel
            data-testid="content-microturbineProductionChart"
            headerContent={loadInMWHTitle(microturbineTitle)}
            content={
              <MicroturbineProduction
                data={microturbineProduction}
                config={config}
              />
            }
          />
        </Box>
        <Box className={classes.columnWrapper}>
          <Panel
            data-testid="content-reciprocatingEngineProductionChart"
            headerContent={loadInMWHTitle(reciprocatingTitle)}
            content={
              <ReciprocatingEngineProduction
                data={reciprocatingProduction}
                config={config}
              />
            }
          />
        </Box>
      </Box>
    </>
  );
};
/**
 * EnergyProductionChart PropTypes
 */
EnergyProductionChart.propTypes = {
  intl: PropTypes.any.isRequired,
  reportConfig: PropTypes.object.isRequired,
};

export default injectIntl(EnergyProductionChart);
