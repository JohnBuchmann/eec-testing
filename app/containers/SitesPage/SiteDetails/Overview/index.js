/**
 * Overview
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SiteEvents from './Events';
import SiteInformation from './SiteInformation';
import SystemOverview from './SystemDiagram';
// eslint-disable-next-line no-unused-vars
import Support from './Support';

/**
 * Declare UI styles
 */
const useStyles = makeStyles({
  siteInformation: {
    padding: '0',
  },
  bottomContent: {
    marginTop: '16px',
    display: 'flex',
  },
  eventsContainer: {
    marginLeft: '15px',
  },
  supportContainer: {
    marginTop: '15px',
  },
});

/**
 * Displays the overview panel
 * @param {*} props
 */
function Overview() {
  const classes = useStyles();
  return (
    <>
      <SystemOverview />
      <div className={classes.siteInformation}>
        <div className={classes.bottomContent}>
          <div>
            <div>
              <SiteInformation />
            </div>
            <div className={classes.supportContainer}>
              <Support />
            </div>
          </div>

          <div className={classes.eventsContainer}>
            <SiteEvents />
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
