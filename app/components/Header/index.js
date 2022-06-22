/**
 *
 * Header
 * Header, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Colors } from 'Theme';
import HeaderBasic from './HeaderBasic';
import HeaderDashboard from './HeaderDashboard';
import HeaderQuickConfiguration from './HeaderQuickConfiguration';
import HeaderSiteDetails from './HeaderSiteDetails';
import HeaderSiteReports from './HeaderSiteReports';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: Colors.white,
  },
});

/**
 * HeaderConfiguration
 * @param {string} title Title to show
 * @param {string} subtitle1 Subtitle to show
 * @param {boolean} dashboard Flag to show dashboard header
 * @param {boolean} details Flag to show details header
 * @param {boolean} quickConfiguration Flag to show quick configuration header
 * @param {boolean} siteDetails Flag to show site details header
 * @param {object} breadcrumbs Breadcrumbs to show
 * @param {Object[]{text:'',value:'',icon:''}} users Users to show in list
 * @param {Object[]{text:'',value:''}} status Status to show in list
 * @param {function} handleTabChange Event to execute when clicking the tab buttons
 * @param {function} newConfiguration Event to execute when clicking the new button
 */
const Header = (props) => {
  const {
    title = '',
    subtitle1 = '',
    dashboard = false,
    quickConfiguration = false,
    siteDetails = false,
    basic = false,
    siteReports = false,
    breadcrumbs = [],
    siteheaders = [],
    users = [],
    tabSelected = 0,
    handleTabChange,
    newConfiguration,
    handleSearch,
    handleSelectChange,
    availableTabs,
    isSiteLive = false,
    isRendered = false,
  } = props;
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      {dashboard && (
        <HeaderDashboard
          tabSelected={tabSelected}
          availableTabs={availableTabs}
          title={title}
          handleTabChange={handleTabChange}
          users={users}
          handleSearch={handleSearch}
          handleSelectChange={handleSelectChange}
        />
      )}
      {siteDetails && (
        <HeaderSiteDetails
          title={title}
          subtitle={subtitle1}
          siteheaders={siteheaders}
          breadcrumbs={breadcrumbs}
          isSiteLive={isSiteLive}
          isRendered={isRendered}
        />
      )}
      {siteReports && <HeaderSiteReports title={title} />}
      {quickConfiguration && (
        <HeaderQuickConfiguration
          title={title}
          onCreateNew={newConfiguration}
        />
      )}
      {basic && <HeaderBasic title={title} breadcrumbs={breadcrumbs} />}
    </Box>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  subtitle1: PropTypes.string,
  dashboard: PropTypes.bool,
  quickConfiguration: PropTypes.bool,
  siteDetails: PropTypes.bool,
  basic: PropTypes.bool,
  siteReports: PropTypes.bool,
  breadcrumbs: PropTypes.array,
  siteheaders: PropTypes.array,
  users: PropTypes.array,
  tabSelected: PropTypes.number,
  handleSearch: PropTypes.func,
  handleSelectChange: PropTypes.func,
  handleTabChange: PropTypes.func,
  newConfiguration: PropTypes.func,
  availableTabs: PropTypes.array,
  isSiteLive: PropTypes.bool,
  isRendered: PropTypes.bool,
};

export default Header;
