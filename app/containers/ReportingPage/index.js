/*
 * ReportingPage
 *
 * This is the reporting container to display all the charts at the '/reporting' route
 *
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, makeStyles } from '@material-ui/core';
import Layout from 'Components/Layout';
import Grid from '@material-ui/core/Grid';
import { Colors } from 'Theme';
import Header from 'Components/Header';
import Charting from 'Containers/Charting';
import { cleanSearchParams } from 'Store/Reports/actions';
import { ReportTypesId } from 'Utils/enums/report';
import messages from './messages';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  reportsSections: {
    padding: '0px 16px',
  },
  reportContainer: {
    background: `${Colors.white}`,
    height: '451px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
  },
});

/**
 * ReportingPage creates the container to
 * display the charts and reporting the consume of energy.
 * User will be able to access
 * this container at the 'sites/1/details' route to review the charts.
 */
const ReportingPage = (props) => {
  const { sites, company, cleanSearchParamsReport } = props;
  const siteReportsFlag = true;
  const basicFlag = false;
  const reportPage = true;
  const classStyle = useStyles();
  const defaultReportType = ReportTypesId.Facility;

  useEffect(() => {
    cleanSearchParamsReport();
  }, []);

  const reportFilterSection = (
    <Box className={classStyle.wrapper}>
      <FormattedMessage {...messages.title}>
        {(title) => (
          <Header
            data-testid="sitesReportHeader"
            siteReports={siteReportsFlag}
            basic={basicFlag}
            title={title}
          />
        )}
      </FormattedMessage>
      <Grid container className={classStyle.reportsSections}>
        <Grid item xs={12}>
          <Charting
            sites={sites}
            company={company}
            resetFiltersWhenCompanyChange={reportPage}
            defaultReportType={defaultReportType}
          />
        </Grid>
      </Grid>
    </Box>
  );

  return <Layout main content={reportFilterSection} />;
};

ReportingPage.propTypes = {
  company: PropTypes.string,
  sites: PropTypes.array,
  cleanSearchParamsReport: PropTypes.func,
};
/**
 * mapStateToProps
 * @param {Object} sites receives reports.searchParams.sites from redux
 * @param {Object} company receives reports.searchParams.company from redux
 */
const mapStateToProps = (state) => ({
  sites: state.reports.searchParams.sites,
  company: state.reports.searchParams.company,
});

/**
 * mapDispatchToProps
 * @param {Function} cleanSearchParamsReport call cleanSearchParams action and clear search params data from redux
 */
const mapDispatchToProps = (dispatch) => ({
  cleanSearchParamsReport: () => dispatch(cleanSearchParams()),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportingPage);
/* eslint-enable */
