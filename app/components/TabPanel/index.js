import React from 'react';
import PropTypes from 'prop-types';

/**
 * TabPanel
 * @param {Object} props Props for the controller
 */
const TabPanel = (props) => {
  const { children, value, tabIndexList, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={!tabIndexList.includes(value)}
      id={`simple-tabpanel-${tabIndexList[`${value}`]}`}
      aria-labelledby={`simple-tab-${tabIndexList[`${value}`]}`}
      {...other}
    >
      {tabIndexList.includes(value) && <>{children}</>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  tabIndexList: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
