/**
 *
 * HeaderSiteReports.js
 * A basic header content
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Select from 'Components/Select';
import { FormattedMessage } from 'react-intl';
import { generateCompaniesOptions, generateSitesOptions } from 'Utils/reports';
import {
  setSearchCompanyParams,
  setSearchSitesParams,
} from 'Store/Reports/actions';
import { allOptions } from 'Utils/enums/site';
import { getAllCompaniesSites } from 'Store/Sites/actions';
import { getValueIfExists } from 'Utils/propertyValidation';
import messages from './messages';

/**
 * Declare UI styles
 */
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
  selectCompany: {
    minWidth: '120px',
  },
  siteFilter: {
    float: 'right',
    width: '580px',
  },
  selectCompanyContainer: {
    padding: '16px 10px 16px 10px',
    '& .MuiSelect-selectMenu.MuiOutlinedInput-input .MuiTypography-body1': {
      width: '200px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& .MuiInputLabel-formControl': {
      color: Colors.lunarGreen,
    },
  },
  selectSitesContainer: {
    padding: '16px 20px 16px 0px',
    '& .MuiSelect-select.MuiSelect-selectMenu': {
      width: '200px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
    },
    '& .MuiInputLabel-formControl': {
      color: Colors.lunarGreen,
    },
  },
  upperWrapper: {
    alignItems: 'center',
  },
  lowerWrapper: {
    justifyContent: 'space-between',
  },
});

/**
 * HeaderSiteReports
 * @param {object} props Props for the controller
 */
const HeaderSiteReports = (props) => {
  const {
    title,
    setCompanyParam,
    setSitesParam,
    fetchCompaniesSites,
    companiesSites,
  } = props;
  const classes = useStyles();
  const [companiesData, setCompaniesData] = React.useState([]);
  const [sitesData, setSitesData] = React.useState([]);
  const [companySelected, setCompanySelected] = React.useState({});
  const [siteSelected, setSiteSelected] = React.useState([]);
  /**
   * siteOptionsChange
   * Handler for changing of the sites dropdown
   * @param {Array} siteValues receives array with sites data selected
   * @return {void}
   */
  const siteOptionsChange = (siteValues) => {
    const siteIds = siteValues.map((site) => site.value);
    setSitesParam(siteIds);
    setSiteSelected(siteValues);
  };

  /**
   * @method companyOptionChange
   * Handler for changing of the company dropdown
   * @param {number} companyId receives company id
   */
  const companyOptionChange = (companyId) => {
    const { sites: sitesArray, companyName } = companiesSites[`${companyId}`];
    const siteOptions = generateSitesOptions(sitesArray);
    const sitesIds = siteOptions.map((site) => site.value);
    setSitesData([allOptions, ...siteOptions]);
    setCompanySelected({ value: companyId, text: companyName });
    setCompanyParam(companyName);
    setSitesParam([0, ...sitesIds]);
    setSiteSelected([0]);
  };

  /**
   * placeHolderSites
   * Handle to display placeholder texts by default or have site all selected
   * @param {*} placeHolder receives placeholder text default
   * @param {*} sitesList  receives sites list array data
   * @returns {string}
   */
  const placeHolderSites = (placeHolder, sitesList) =>
    getValueIfExists(() => sitesList.length, 0) > 0 &&
    sitesList.findIndex((site) => site === 0) > -1
      ? allOptions.text
      : placeHolder;

  useEffect(() => {
    fetchCompaniesSites();
  }, []);

  useEffect(() => {
    if (companiesSites) {
      setCompaniesData(generateCompaniesOptions(companiesSites));
    }
  }, [companiesSites]);

  return (
    <div className={classes.wrapper}>
      <Box className={classes.upperWrapper}>
        <Box className={classes.titleWrapper} data-testid="header-title">
          <Typography className={`${classes.title}`}>{title}</Typography>
        </Box>
        <Grid container className={classes.siteFilter}>
          <Grid item xs={6} className={classes.selectCompanyContainer}>
            <FormattedMessage {...messages.selectCompanyPlaceholder}>
              {(selectCompanyPlaceholder) => (
                <Select
                  data-testid="select-companiesPlaceholder"
                  placeholder={selectCompanyPlaceholder}
                  selectData={companiesData}
                  onChange={companyOptionChange}
                  selectedObject={{
                    value: companySelected ? companySelected.text : '',
                  }}
                />
              )}
            </FormattedMessage>
          </Grid>
          <Grid item xs={6} className={classes.selectSitesContainer}>
            <FormattedMessage {...messages.selectSitesPlaceholder}>
              {(selectSitesPlaceholder) => (
                <Select
                  data-testid="select-sitesPlaceholder"
                  placeholder={placeHolderSites(
                    selectSitesPlaceholder,
                    siteSelected
                  )}
                  selectData={sitesData}
                  onChange={siteOptionsChange}
                  multiple
                  selectedObject={siteSelected}
                />
              )}
            </FormattedMessage>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

HeaderSiteReports.propTypes = {
  title: PropTypes.string.isRequired,
  setCompanyParam: PropTypes.func.isRequired,
  setSitesParam: PropTypes.func.isRequired,
  fetchCompaniesSites: PropTypes.func,
  companiesSites: PropTypes.array,
};

/**
 * mapStateToProps
 * @param {Object} sites receives state with sites reducer from redux
 */
const mapStateToProps = (state) => ({
  companiesSites: state.sites.companiesSites,
});

/**
 * mapDispatchToProps
 * @param {function} setCompanyParam call setSearchCompanyParams action and set company to search params to redux
 * @param {function} setSitesParam call setSearchSitesParams action and set sites to search params to redux
 * @param {function} fetchCompaniesSites call getAllCompaniesSites action and set companies sites to redux
 */
const mapDispatchToProps = (dispatch) => ({
  setCompanyParam: (company) => dispatch(setSearchCompanyParams(company)),
  setSitesParam: (sites) => dispatch(setSearchSitesParams(sites)),
  fetchCompaniesSites: () => dispatch(getAllCompaniesSites()),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderSiteReports);
/* eslint-enable */
