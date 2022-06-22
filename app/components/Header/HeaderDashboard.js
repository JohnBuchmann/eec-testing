/**
 *
 * HeaderDashboard.js
 * Header content for dashboard
 */

import { Box, FormControl, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Colors } from 'Theme';
import { TabsOptions } from 'Utils/enums/site';
import { getValueIfExists } from 'Utils/propertyValidation';
import Input from '../Input';
import Select from '../Select';
import messages from './messages';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  wrapper: {
    height: '106px',
    backgroundColor: Colors.white,
    position: 'relative',
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
  searchWrapper: {
    position: 'absolute',
    right: '24px',
    top: '16px',
    backgroundColor: Colors.white,
    width: 'auto',
  },
  searchDropdown: {
    position: 'relative',
    display: 'inline-block',
    width: '216px',
    marginRight: '8px',
  },
  searchInput: {
    position: 'relative',
    display: 'inline-block',
  },
  tabs: {
    display: 'block',
    position: 'absolute',
    bottom: '0px',
    marginLeft: '32px',
    padding: '0px',
    backgroundColor: Colors.white,
    minHeight: '40px',
  },
  tab: {
    textTransform: 'none',
    minHeight: '40px',
    minWidth: '80px',
  },
});

/**
 * HeaderDashboard
 * @param {String} props.title='' Title to show in the header
 * @param {Object[]{text:'',value:'',icon:''}} props.users=[] Array of users for the select search
 * @param {Number} props.tabSelected=0 Index of tab selected
 * @param {function} props.handleTabChange Function to execute when selecting tabs
 */
const HeaderDashboard = (props) => {
  const {
    title = '',
    users = [],
    tabSelected = 0,
    handleTabChange,
    handleSearch,
    handleSelectChange,
    availableTabs: siteAvailableTabs,
  } = props;

  const classes = useStyles();
  const [value, setValue] = useState(tabSelected);
  const [searchTerm, setSearchTerm] = useState('');
  const [siteTabs, setSiteTabs] = useState(siteAvailableTabs);

  useEffect(() => {
    /* eslint-disable */
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
    /* eslint-enable */
  }, [searchTerm]);
  /**
   * Update siteAvailableTabs for display when change.
   */
  useEffect(() => {
    setSiteTabs(siteAvailableTabs);
  }, [siteAvailableTabs]);
  /**
   * handleChange
   * @param {Object} event Event executed
   * @param {Number} newValue Index of table selected
   */
  const handleChange = (event, newValue) => {
    const newTab = siteTabs.find((tab, index) => index === newValue);
    setValue(newValue);
    handleTabChange(newValue, newTab.title);
  };
  /**
   * validateAssignUserDropdown
   * Return validation for display assign user dropdown
   * @return {Boolean}
   */
  const validateAssignUserDropdown = () =>
    value !== 0 ||
    getValueIfExists(() => siteTabs[0].title, '') === TabsOptions.All;

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.titleWrapper}>
        <Typography className={classes.title}>{title}</Typography>
      </Box>
      <Box className={classes.searchWrapper}>
        {validateAssignUserDropdown() && (
          <Box className={classes.searchDropdown}>
            <FormattedMessage {...messages.assignedUserPlaceholder}>
              {(placeholder) => (
                <Select
                  placeholder={placeholder}
                  selectData={users}
                  onChange={handleSelectChange}
                />
              )}
            </FormattedMessage>
          </Box>
        )}
        <FormControl variant="outlined">
          <FormattedMessage {...messages.search}>
            {(placeholder) => (
              <Input
                data-testid="headerDashboardSearch"
                className={classes.searchInput}
                placeholder={placeholder}
                icon="searchIcon"
                onChange={(evt) => setSearchTerm(evt.target.value)}
                value={searchTerm}
              />
            )}
          </FormattedMessage>
        </FormControl>
      </Box>
      {/* TODO Recator this to make it generic */}
      <Tabs value={value} onChange={handleChange} className={classes.tabs}>
        {siteTabs &&
          siteTabs.map((tab) => (
            <Tab key={tab.key} className={classes.tab} label={tab.title} />
          ))}
      </Tabs>
    </Box>
  );
};

HeaderDashboard.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.array,
  tabSelected: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  availableTabs: PropTypes.array,
};

export default HeaderDashboard;
