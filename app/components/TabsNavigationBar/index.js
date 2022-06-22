/**
 * Tabs navigation bar
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Colors } from 'Theme';
import { propertyExist } from 'Utils/propertyValidation';

const useStyles = makeStyles({
  wrapper: {
    padding: '16px',
  },
});

/**
 * Tabs Navigation Bar component
 * Overrides 'root' css properties
 */
const StyledTabsNavigationBar = withStyles({
  root: {
    backgroundColor: `${Colors.white} !important`,
    height: '40px',
    boxShadow: 'none',
    borderBottom: `2px solid ${Colors.aquaSqueeze}`,
  },
})((props) => <AppBar {...props} />);

/**
 * Tabs container component
 * Overrides 'root', 'flexContainer' and selected tab 'indicator'
 */
const StyledTabsContainer = withStyles({
  root: {
    '& .MuiButtonBase-root': {
      padding: '0px',
      minHeight: '40px',
      borderBottom: `2px solid ${Colors.lunarGreenAlpha10}`,
    },
  },
  flexContainer: {
    width: '960px',
    backgroundColor: Colors.white,
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: Colors.mountainMeadow,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

/**
 * Tab button component
 * Overrides 'root'
 */
const StyledTab = withStyles({
  root: {
    textTransform: 'none',
    color: Colors.surfCrest,
    fontSize: '16px',
    '&:hover': {
      color: Colors.mountainMeadow,
      opacity: 1,
    },
    '&$selected': {
      color: Colors.mountainMeadow,
    },
    '&:focus': {
      color: Colors.mountainMeadow,
    },
  },
})((props) => <Tab disableRipple {...props} />);

/**
 * Creates tab panel visual elements
 * @param {*} props
 */
function StyledTabPanel(props) {
  const { children = '', value = 0, index = 0, ...other } = props || {};

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`site-tabpanel-${index}`}
      aria-labelledby={`site-tab-${index}`}
      {...other}
    >
      {value === index && <Box mt="16px">{children}</Box>}
    </div>
  );
}

StyledTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number,
};

function TabsNavigationBar(props) {
  const classes = useStyles();
  const {
    selectedTab = -1,
    eventChangeTab = null,
    disabledTabs = false,
    eventClickTab,
  } = props;

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(selectedTab);

  useEffect(() => {
    setSelectedTabIndex(selectedTab);
  }, [selectedTab]);

  if (!propertyExist(() => props.tabs)) {
    return <></>;
  }

  const tabs = props.tabs.map((tab, index) => (
    <StyledTab
      key={tab.key}
      label={tab.title}
      id={`site-tab-${index}`}
      aria-controls={`site-tabpanel-${index}`}
      data-testid="content-tab"
    />
  ));

  const tabPanels = props.tabs.map((tab, index) => (
    <StyledTabPanel key={tab.key} value={selectedTabIndex} index={index}>
      {tab.content}
    </StyledTabPanel>
  ));

  /**
   * Change the value to new selected tab index
   * @param {object} event
   * @param {integer} newValue
   */
  const handleChange = (event, newValue) => {
    if (!disabledTabs) {
      setSelectedTabIndex(newValue);
      if (propertyExist(() => eventChangeTab)) {
        eventChangeTab(newValue);
      }
    }
  };

  /**
   * handleClick
   * Handle click event on tabs
   * @param {object} event receives click event data
   */
  const handleClick = (event) => {
    if (eventClickTab) {
      eventClickTab(event);
    }
  };

  return (
    <Box className={classes.wrapper} data-testid="content-tabs-box">
      <StyledTabsNavigationBar
        position="relative"
        data-testid="content-tabs-navigation-bar"
      >
        <StyledTabsContainer
          id="tabsNavigationBar"
          value={selectedTabIndex === -1 ? false : selectedTabIndex}
          onChange={handleChange}
          onClick={handleClick}
          aria-label="site-details-navigation-bar"
          data-testid="content-tabs-navigation-bar-tabs-container"
        >
          {tabs}
        </StyledTabsContainer>
      </StyledTabsNavigationBar>
      {tabPanels}
    </Box>
  );
}

TabsNavigationBar.propTypes = {
  tabs: PropTypes.any,
  selectedTab: PropTypes.number,
  eventChangeTab: PropTypes.func,
  eventClickTab: PropTypes.func,
  disabledTabs: PropTypes.bool,
};

export default TabsNavigationBar;
