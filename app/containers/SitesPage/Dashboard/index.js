import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Header from 'Components/Header';
import Layout from 'Components/Layout';
import TabPanel from 'Components/TabPanel';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  getAllSites,
  getSitesIcianUsers,
  setSiteFiltersByAssignedUser,
  setSiteFiltersByStatus,
  setSiteFiltersByCustomer,
  setSiteFiltersByArea,
  setSiteFiltersByLocation,
  setSiteFiltersByEmulatedSites,
  setSiteFiltersByText,
  resetSiteFilters,
} from 'Store/Sites/actions';
import { getFilteredSites } from 'Store/Sites/selectors';
import { AvailableTabsDashboard, TabsOptions } from 'Utils/enums/site';
import { SET_INTERVAL_PULLING_DATA } from 'Utils/enums/http';
import { getIcianUsersDropDown } from 'Utils/icianUsers';
import {
  getValueIfExists,
  propertyExist,
  stringIsNullOrEmpty,
} from 'Utils/propertyValidation';
import { getSiteDashboardTabs } from 'Utils/roles';
import messages from '../messages';
import SitesStatusListPanel from './SitesStatusListPanel';
import SitesStatusOverviewPanel from './SitesStatusOverviewPanel';
/* eslint-disable no-console */
const useStyles = () => ({
  boxWrapper: {
    margin: '16px 16px 0px 16px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  tabContent: {
    flex: 1,
    display: 'contents',
  },
});

class SitesDashboard extends Component {
  constructor() {
    super();
    this.state = {
      tabSelected: 0,
      switchView: false,
      showEmulatedSites: false,
      availableTabs: [],
    };
    this.intervals = [];
  }

  componentDidMount = () => {
    const { getAllSitesFetch, getSitesIcianUsersFetch } = this.props;
    getAllSitesFetch();
    getSitesIcianUsersFetch();
    const showLoader = false;
    this.filterSitesByEmulatedStatus(this.state.showEmulatedSites);
    // Disabling set Intervals as Codacy does not know how to handle them.
    /* eslint-disable */
    const interval = setInterval(() => {
      getAllSitesFetch(showLoader);
    }, SET_INTERVAL_PULLING_DATA);
    this.intervals.push(interval);
    /* eslint-enable */
  };

  componentWillUnmount = () => {
    this.intervals.forEach((interval) => clearInterval(interval));
  };

  /*
   * handleTabChange
   * Handles the change in the tab component
   */
  handleTabChange = (selected) => {
    this.props.resetSiteFilters();
    const { tabSelected } = this.state;
    if (propertyExist(() => tabSelected) && tabSelected !== selected) {
      const { setSelectedAssignedUser } = this.props;
      setSelectedAssignedUser('');
      this.setState({ tabSelected: selected });
    }
  };

  /**
   * handleSearch
   * @param {string} searchText Text typed in the search box
   */
  handleSearch = (searchText) => {
    this.searchData(searchText);
  };

  /**
   * handleSelectAssignedUser
   * @param {string} assignedUser Selected Value from ICIAN Users dropdown
   */
  handleSelectAssignedUser = (assignedUser) => {
    if (assignedUser) {
      const { setSelectedAssignedUser } = this.props;
      setSelectedAssignedUser(assignedUser);
    }
  };

  /**
   * handleSelectChange
   * @param {string} selectedItemValue Value of the selected item
   */
  handleSelectChange = (selectedItemValue) => {
    this.filterData(selectedItemValue);
  };

  handleResetFilters = () => {
    this.resetFilters();
  };

  /**
   * @method handleSwitchViewChange
   * Handles the switch selection of view type in the dashboard
   * to toggle the display between the list and the map.
   * @param {string} event The default event of toggle selection
   * @param {string} newValue Value of the toggle option selected
   */
  handleSwitchViewChange = (event, newValue) => {
    if (propertyExist(() => newValue)) {
      this.setState({ switchView: newValue });
    }
  };

  /**
   * @method handleShowEmulatedSitesChange
   * Handles the switch selection to filter emulated sites
   * @param {string} event The default event of toggle selection
   * @param {string} newValue Value of the toggle option selected
   */
  handleShowEmulatedSitesChange = (event, newValue) => {
    if (propertyExist(() => newValue)) {
      this.setState({ showEmulatedSites: newValue }, () => {
        this.filterSitesByEmulatedStatus(this.state.showEmulatedSites);
      });
    }
  };

  /**
   * @property {String[]} excludedColumns Exclude columns from search
   */
  excludeColumns = ['id'];

  /**
   * @method searchData
   * Search data in the current sites list to filter by typing
   * @param searchText The search parameter to look in the data.
   * @return {void}
   */
  searchData = (searchText) => {
    this.props.setSiteFiltersByText(searchText);
  };

  /**
   * @method filterData
   * Filtering data from the sites list to display in the cards or map.
   * @param {Object[]} filters The filters received to filter the data.
   * @return {void}
   */
  filterData = (filters) => {
    if (filters.length > 0) {
      const filterType = filters[0].herarchyLevel;
      switch (filterType) {
        case 1:
          this.props.setSiteFiltersByStatus(filters);
          break;
        case 2:
          this.props.setSiteFiltersByCustomer(filters);
          this.props.setSiteFiltersByArea([]);
          this.props.setSiteFiltersByLocation([]);
          break;
        case 3:
          this.props.setSiteFiltersByArea(filters);
          this.props.setSiteFiltersByLocation([]);
          break;
        case 4:
          this.props.setSiteFiltersByLocation(filters);
          break;
        default:
          break;
      }
    }
  };

  resetFilters = () => {
    this.props.resetSiteFilters();
  };

  /**
   * @method filterSitesByEmulatedStatus
   * Filtering data from the sites list to display in the cards or map based on live status.
   * @param {Object[]} newValue The filters received to filter the data.
   * @return {void}
   */
  filterSitesByEmulatedStatus = (newValue) => {
    this.props.setSiteFiltersByEmulatedSites(newValue);
  };

  render() {
    const {
      classes,
      icianUsers,
      filteredSites: sites,
      customerScopeOptions: customerOptions,
      areasScopeOptions: areasOptions,
      sitesScopeOptions: sitesOptions,
    } = this.props;
    const { tabSelected } = this.state;
    const dashboardFlag = true;
    let isReadyToLoad = true;
    const formattedIcianUsers = getIcianUsersDropDown(icianUsers);
    const { siteFiltersApplied, preferredUserName, permissions } = this.props;

    const isAreaDropwonDisabled = !!(
      siteFiltersApplied.customer.length === 0 ||
      siteFiltersApplied.customer[0].value === 0
    );
    const isLocationDropwonDisabled = !!(
      siteFiltersApplied.area.length === 0 ||
      siteFiltersApplied.area[0].value === 0
    );

    const { availableTabs } = this.state;
    let filterAvailableTabs = availableTabs;

    // Validate permission tabs.
    if (
      !getValueIfExists(() => availableTabs.length, 0) &&
      getValueIfExists(() => Object.keys(permissions).length, 0)
    ) {
      filterAvailableTabs = getSiteDashboardTabs(
        permissions,
        AvailableTabsDashboard,
        TabsOptions
      );
      this.setState({ availableTabs: filterAvailableTabs });
    }

    const isAllTabSelected =
      getValueIfExists(
        () => filterAvailableTabs[`${tabSelected}`].title,
        ''
      ) === TabsOptions.All;

    if (
      getValueIfExists(() => filterAvailableTabs.length) &&
      !isAllTabSelected
    ) {
      const { assignedUser } = getValueIfExists(() => siteFiltersApplied, '');
      if (
        stringIsNullOrEmpty(assignedUser) &&
        !stringIsNullOrEmpty(preferredUserName)
      ) {
        const { setSelectedAssignedUser } = this.props;
        isReadyToLoad = false;
        setSelectedAssignedUser(preferredUserName);
      }
    }

    return (
      <Layout
        main
        content={
          <Box className={classes.wrapper}>
            <FormattedMessage {...messages.title}>
              {(title) => (
                <Header
                  data-testid="sitesDashboardHeader"
                  dashboard={dashboardFlag}
                  title={title}
                  handleTabChange={this.handleTabChange}
                  users={formattedIcianUsers}
                  tabSelected={0}
                  availableTabs={filterAvailableTabs}
                  handleSearch={this.handleSearch}
                  handleSelectChange={this.handleSelectAssignedUser}
                />
              )}
            </FormattedMessage>
            <TabPanel
              value={tabSelected}
              tabIndexList={[0, 1]}
              className={classes.tabContent}
            >
              <Box className={classes.boxWrapper}>
                <FormattedMessage {...messages.overview}>
                  {(title) => (
                    <SitesStatusOverviewPanel
                      sites={sites}
                      title={title.toUpperCase()}
                    />
                  )}
                </FormattedMessage>
              </Box>
              <Box className={classes.boxWrapper}>
                <FormattedMessage {...messages.title}>
                  {(title) => (
                    <SitesStatusListPanel
                      tabAllSelected={isAllTabSelected}
                      sites={sites}
                      isAreaDropwonDisabled={isAreaDropwonDisabled}
                      isLocationDropwonDisabled={isLocationDropwonDisabled}
                      customerOptions={customerOptions}
                      areasOptions={areasOptions}
                      sitesOptions={sitesOptions}
                      isReadyToLoad={isReadyToLoad}
                      dropdownChange={this.handleSelectChange}
                      resetFilters={this.handleResetFilters}
                      switchViewChange={this.handleSwitchViewChange}
                      switchView={this.state.switchView}
                      showEmulatedSitesChange={
                        this.handleShowEmulatedSitesChange
                      }
                      showEmulatedSites={this.state.showEmulatedSites}
                      title={title.toUpperCase()}
                      filters={siteFiltersApplied}
                    />
                  )}
                </FormattedMessage>
              </Box>
            </TabPanel>
          </Box>
        }
      />
    );
  }
}

SitesDashboard.propTypes = {
  classes: PropTypes.object,
};

SitesDashboard.propTypes = {
  sites: PropTypes.object,
  authState: PropTypes.object,
  onStoreUser: PropTypes.func,
  icianUsers: PropTypes.array,
  permissions: PropTypes.object,
  filteredSites: PropTypes.array,
  getAllSitesFetch: PropTypes.func,
  preferredUserName: PropTypes.string,
  siteFiltersApplied: PropTypes.object,
  setSiteFiltersByText: PropTypes.func,
  setSiteFiltersByStatus: PropTypes.func,
  setSiteFiltersByCustomer: PropTypes.func,
  setSiteFiltersByArea: PropTypes.func,
  setSiteFiltersByLocation: PropTypes.func,
  setSiteFiltersByEmulatedSites: PropTypes.func,
  getSitesIcianUsersFetch: PropTypes.func,
  setSelectedAssignedUser: PropTypes.func.isRequired,
  customerScopeOptions: PropTypes.array,
  areasScopeOptions: PropTypes.array,
  sitesScopeOptions: PropTypes.array,
  resetSiteFilters: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { sites } = state;
  const {
    filteredSites,
    customerScopeOptions,
    areasScopeOptions,
    sitesScopeOptions,
  } = getFilteredSites(state);
  const { icianUsers, filters: siteFiltersApplied } = getValueIfExists(
    () => sites,
    {}
  );
  const { email: preferredUserName } = getValueIfExists(
    () => state.user.user,
    {}
  );
  const { permissions } = getValueIfExists(() => state.user, {
    permissions: {},
  });
  return {
    sites,
    icianUsers,
    permissions,
    filteredSites,
    preferredUserName,
    siteFiltersApplied,
    customerScopeOptions,
    areasScopeOptions,
    sitesScopeOptions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllSitesFetch: (showLoader) => dispatch(getAllSites(showLoader)),
  setSiteFiltersByText: (searchText) =>
    dispatch(setSiteFiltersByText(searchText)),
  setSiteFiltersByStatus: (statusFilters) =>
    dispatch(setSiteFiltersByStatus(statusFilters)),
  setSiteFiltersByCustomer: (customerFilters) =>
    dispatch(setSiteFiltersByCustomer(customerFilters)),
  setSiteFiltersByArea: (areaFilters) =>
    dispatch(setSiteFiltersByArea(areaFilters)),
  setSiteFiltersByLocation: (locationFilters) =>
    dispatch(setSiteFiltersByLocation(locationFilters)),
  resetSiteFilters: () => dispatch(resetSiteFilters()),
  setSiteFiltersByEmulatedSites: (showEmulatedSites) =>
    dispatch(setSiteFiltersByEmulatedSites(showEmulatedSites)),
  getSitesIcianUsersFetch: () => dispatch(getSitesIcianUsers()),
  setSelectedAssignedUser: (assignedUser) =>
    dispatch(setSiteFiltersByAssignedUser(assignedUser)),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SitesDashboard));
/* eslint-enable */
