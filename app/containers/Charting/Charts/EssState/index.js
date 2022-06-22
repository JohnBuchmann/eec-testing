import { Box, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { getTimePeriodTitle } from 'Utils/reports';
import ChartContainer from '../ChartContainer';
import EssStateChart from './essStateChart';
import messages from './messages';

/**
 * Styles
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
 * ESS State charts
 */
function EssStateCharts(props = {}) {
  const { formatMessage } = props.intl;
  const classes = useStyles();
  const { reportConfig } = props;
  const { charts: chartData } = reportConfig;
  const title = `${formatMessage(
    messages.essStateTitle
  )} - ${getTimePeriodTitle(reportConfig)}`;

  return (
    <Box className={classes.panelsWrapper}>
      <Box className={classes.firstColumnWrapper}>
        <ChartContainer
          title={title}
          chart={<EssStateChart data={chartData} />}
        />
      </Box>
    </Box>
  );
}

EssStateCharts.propTypes = {
  intl: PropTypes.any.isRequired,
  reportConfig: PropTypes.object.isRequired,
};

export default injectIntl(EssStateCharts);
