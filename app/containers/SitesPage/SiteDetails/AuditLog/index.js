/*
 * Audit Log
 *
 * This is the site audit log where we can see the site audit log, at the '/sites/auditlog/2525115}' route
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { Colors } from 'Theme';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SET_INTERVAL_PULLING_DATA } from 'Utils/enums/http';

import {
  getSiteAuditLog,
  setSiteAuditLogFilters,
  getMoreResultsAuditLog,
  cleanAuditLogFilters,
} from 'Store/Sites/actions';
import {
  getFilteredSiteAuditLog,
  getAuditLogResults,
} from 'Store/Sites/selectors';

import {
  SiteDetailsCatalog,
  PermissionsList,
  TypeValidation,
} from 'Utils/enums/roles';

import { getValueIfExists } from 'Utils/propertyValidation';
import { validatePermission } from 'Config/appSettings';

import Panel from 'Components/Panel';
import Input from 'Components/Input';
import AuditLogItem from './AuditLogItem';
import messages from './messages';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: Colors.white,
    paddingBottom: '43px',
    width: '574px',
  },
  auditLogContainer: {
    height: '360px',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
});

/**
 * Audit Log creates the container to
 * display all the content related to the user settings.
 * User will be able to access
 * this container at the '/sites/30/auditlog' route to modify own data.
 */
const AuditLog = (props) => {
  const { formatMessage } = props.intl;
  const classes = useStyles();
  const { siteId } = useParams();
  const {
    getSiteAuditLogDispatch,
    setSiteAuditLogFiltersDispatch,
    getMoreResultsAuditLogDispatch,
    filteredSiteAuditLogs = [],
    auditLogResults = {},
    cleanFilters,
    permissions,
    isSiteLive,
    siteAccount,
  } = props;

  const size = 50;
  const radix = 10;
  const siteIdInt = parseInt(siteId, radix);
  const zero = 0;
  const [searchText, setSearch] = React.useState('');
  const [pagination, setPagination] = React.useState({
    page: zero,
    totalPages: zero,
  });
  const dateFormat = 'YYYY-MM-DD hh:mm:ss.SSS';
  const date = moment().format(`${dateFormat}`);
  const [paginationDate, setPaginationDate] = React.useState(date);
  const [listContainerExist, setListContainerExist] = React.useState(false);
  let loadingData = false;

  const paramsToPermissions = {
    permissions,
    isSiteLive,
    section: getValueIfExists(() => PermissionsList.SiteDetails, ''),
    type: getValueIfExists(() => TypeValidation.View, ''),
    action: getValueIfExists(() => SiteDetailsCatalog.AuditLog, ''),
    siteAccount,
  };

  /**
   * @property {boolean} canUserAccessAuditLog
   * Stores the user permissios to access to device details screen.
   */
  const canUserAccessAuditLog = validatePermission(paramsToPermissions);
  /**
   * @method loadMoreData
   * Calls the services to load more data
   * and validates if the data received is the last load.
   * It will change the logic structure once I integrate it with the reducers.
   * @return {void}
   */
  const loadMoreData = () => {
    pagination.page++;
    if (pagination.totalPages > pagination.page) {
      const params = {
        search: searchText || '',
        date: paginationDate,
        siteId: siteIdInt,
        page: pagination.page,
        size,
      };
      getMoreResultsAuditLogDispatch(params);
    } else if (pagination.page >= pagination.totalPages) {
      const lastRecord =
        filteredSiteAuditLogs[`${filteredSiteAuditLogs.length - 1}`];
      const params = {
        search: searchText || '',
        date: getValueIfExists(() => lastRecord.date, moment().millisecond()),
        siteId: siteIdInt,
        page: 1,
        size,
      };
      getMoreResultsAuditLogDispatch(params);
      setPaginationDate(date);
    }
    loadingData = !loadingData;
  };
  /**
   * @method handleScroll
   * Handle the scroll down event on list container, if the scroll is close then the bottom
   * this will call new records creating an infinite scroll
   */
  const handleScroll = () => {
    const listContainer = document.getElementById('list-container');
    const { scrollTop, scrollHeight, offsetHeight } = listContainer;
    if (
      scrollTop + offsetHeight + 50 >= scrollHeight &&
      loadingData === false
    ) {
      loadingData = !loadingData;
      loadMoreData();
    }
  };

  useEffect(() => {
    if (siteId) {
      cleanFilters();
      const params = {
        search: null,
        date,
        siteId: siteIdInt,
        page: getValueIfExists(() => pagination.page, zero),
        size,
      };
      getSiteAuditLogDispatch(params);
      const isRefreshing = true;
      // Disabling set Intervals as Codacy does not know how to handle them.
      /* eslint-disable */
      const interval = setInterval(() => {
        getSiteAuditLogDispatch(params, isRefreshing);
      }, SET_INTERVAL_PULLING_DATA);
      return () => {
        document
          .getElementById('list-container')
          .removeEventListener('scroll', handleScroll);
        clearInterval(interval);
      };
      /* eslint-enable */
    }
    return () => {};
  }, []);

  useEffect(() => {
    const listContainer = document.getElementById('list-container');
    if (listContainer && listContainerExist === false) {
      // Adding event listener to scroll event on list container element
      // eslint-disable-next-line
      listContainer.addEventListener('scroll', handleScroll);
      setListContainerExist(!listContainerExist);
    }
  });

  useEffect(() => {
    const results = getValueIfExists(() => auditLogResults.totalResults, zero);
    const totalPages = Math.round(results / size);

    const newPagination = {
      page: getValueIfExists(() => auditLogResults.page, zero),
      totalPages,
    };
    setPagination(newPagination);
  }, [auditLogResults]);

  const hasFilteredLogs =
    getValueIfExists(() => filteredSiteAuditLogs.length, 0) > zero;

  /**
   * @method handleChange
   * Handles the change on the input field to filter the data from auditLogs.
   * The setTimeout functionality is to allow
   * the user stop writting before to execute the filtering.
   * @param {string} searchValue The search parameter to filter in the records.
   * @return {void}
   */
  const handleChange = (searchValue = '') => {
    let timeout;
    setSearch(searchValue);
    // Disabling eslint on this block to allow setTimeout.
    /* eslint-disable */
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      const filter = {
        text: searchValue,
      };
      // assigning the filters statement
      setSiteAuditLogFiltersDispatch(filter);
      // get the records filtered by the searchValue text and stores it in the statement
      // it reload the initial records result in the statement without call API
      // and then the filtering method is fired with the filters assigned
      const params = {
        search: searchValue,
        date: paginationDate,
        siteId: siteIdInt,
        page: zero,
        size,
      };
      getSiteAuditLogDispatch(params);
    }, 300);
    /* eslint-enable */
  };
  /**
   * @property {html} noResultsToDisplay
   * Stores the message to display when there is no audit-log available.
   */
  const noResultsToDisplay = (
    <p>{formatMessage(messages.noResultsToDisplay)}</p>
  );

  /**
   * @property {html} auditLogsResults
   * Stores the DOM element to render when there is audit-log available.
   */
  const auditLogsResults = (
    <div
      data-testid="auditLogListContainer"
      className={classes.auditLogContainer}
      id="list-container"
    >
      {filteredSiteAuditLogs.map((itemData, index) => (
        <AuditLogItem
          intl={props.intl}
          /* eslint-disable react/no-array-index-key */
          key={itemData.siteId + index}
          id={itemData.siteId}
          date={itemData.date}
          title={itemData.actionType}
          description={itemData.actionDescription}
          author={itemData.source}
        />
      ))}
    </div>
  );

  /**
   * @method displayAuditLogResults
   * Validates if the `auditLogsResults` property has data available to display.
   * TODO: Add Unit Testing, right now we are using imported mock-data.
   * I will change it after integrate the API.
   * @return {html}
   */
  const displayAuditLogResults = () =>
    hasFilteredLogs ? auditLogsResults : noResultsToDisplay;

  const SearchBar = (
    <Input
      placeholder={formatMessage(messages.searchBarPlaceholder)}
      icon="searchIcon"
      value={searchText}
      onChange={(e) => handleChange(e.target.value)}
    />
  );

  return (
    canUserAccessAuditLog && (
      <Box className={classes.wrapper}>
        <Panel
          title={formatMessage(messages.auditLogHeader)}
          actions={SearchBar}
          content={displayAuditLogResults()}
        />
      </Box>
    )
  );
};

AuditLog.propTypes = {
  intl: PropTypes.any.isRequired,
  filteredSiteAuditLogs: PropTypes.array,
  auditLogResults: PropTypes.object,
  getSiteAuditLogDispatch: PropTypes.func,
  setSiteAuditLogFiltersDispatch: PropTypes.func,
  getMoreResultsAuditLogDispatch: PropTypes.func,
  cleanFilters: PropTypes.func,
  permissions: PropTypes.object.isRequired,
  isSiteLive: PropTypes.bool.isRequired,
  siteAccount: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  filteredSiteAuditLogs: getFilteredSiteAuditLog(state) || [],
  auditLogResults: getAuditLogResults(state) || {},
  permissions: getValueIfExists(() => state.user.permissions, {}),
  isSiteLive: getValueIfExists(() => state.sites.site.live, false),
  siteAccount: getValueIfExists(() => state.sites.site.account, ''),
});

const mapDispatchToProps = (dispatch) => ({
  getSiteAuditLogDispatch: (params, isRefreshing) =>
    dispatch(getSiteAuditLog(params, isRefreshing)),
  setSiteAuditLogFiltersDispatch: (filters) =>
    dispatch(setSiteAuditLogFilters(filters)),
  getMoreResultsAuditLogDispatch: (params) =>
    dispatch(getMoreResultsAuditLog(params)),
  cleanFilters: () => dispatch(cleanAuditLogFilters()),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AuditLog));
/* eslint-enable */
