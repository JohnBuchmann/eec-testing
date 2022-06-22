/**
 * Sites Status Overview panel
 * This is the component to display the site status overview information.
 */
import { makeStyles } from '@material-ui/core';
import Panel from 'Components/Panel';
import PropTypes from 'prop-types';
import React from 'react';
import { Colors } from 'Theme';
import {
  getConnectionStatusOverview,
  getStatusCount,
  SiteStatus,
  SiteStatusPointName,
} from 'Utils/enums/site';

const useStyles = makeStyles({
  statusList: {
    listStyle: 'none',
    margin: '0px 0px 27px 0px',
    padding: 0,
  },
  statusListItem: {
    display: 'inline-block',
    margin: 0,
    marginRight: '15px',
    width: '175px',
  },
  statusListIconWrapper: {
    width: '32px',
    height: '32px',
    display: 'block',
    float: 'left',
    margin: 0,
  },
  statusListIconImg: {
    margin: '0 auto',
    display: 'block',
    top: '4px',
    position: 'relative',
  },
  statusListLabel: {
    position: 'relative',
    top: '5px',
    left: '10px',
    fontSize: '20px',
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 'normal',
    textTransform: 'uppercase',
  },
  statusListSmall: {
    position: 'relative',
    display: 'block',
    fontSize: '12px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: '2.8',
    textTransform: 'uppercase',
  },
  statusIconMaintenance: {
    backgroundColor: Colors.flameaPea,
  },
  statusIconHealthy: {
    backgroundColor: Colors.olivine,
  },
  statusIconFaulted: {
    backgroundColor: Colors.alizarinCrimson,
  },
  statusIconAlarm: {
    backgroundColor: Colors.christine,
  },
  statusIconWarning: {
    backgroundColor: Colors.goldenDream,
  },
  statusIconDisconnected: {
    height: '24px !important',
  },
  imageIcons: {
    height: '32px',
  },
});

/**
 * Sites Status Overview panel
 * Creates the overview panel to display the site status overview information.
 */
const SitesStatusOverviewPanel = (props) => {
  const { sites, title } = props;
  const classes = useStyles();

  const statusConnectionOverview = getConnectionStatusOverview();

  const contentBody = (
    <ul className={classes.statusList}>
      {SiteStatus.map((status) => (
        <li className={classes.statusListItem} key={status.id}>
          <figure className={classes.statusListIconWrapper}>
            <img
              src={status.icon}
              className={`${classes.statusListIconImg} ${
                classes[status.iconClass]
              } ${classes.imageIcons}`}
              alt={`Site Status ${status.name}`}
            />
          </figure>
          <span className={classes.statusListLabel}>
            {getStatusCount(SiteStatusPointName.SiteStatus, status.id, sites)}
            <small className={classes.statusListSmall}>{status.name}</small>
          </span>
        </li>
      ))}

      {statusConnectionOverview.map((status) => (
        <li className={classes.statusListItem} key={status.id}>
          <figure className={classes.statusListIconWrapper}>
            <img
              src={status.icon}
              className={`${classes.statusListIconImg} ${
                classes[status.iconClass]
              } ${classes.imageIcons}`}
              alt={`Site Status ${status.name}`}
            />
          </figure>
          <span className={classes.statusListLabel}>
            {getStatusCount(
              SiteStatusPointName.ConnectionStatus,
              status.id,
              sites
            )}
            <small className={classes.statusListSmall}>{status.name}</small>
          </span>
        </li>
      ))}
    </ul>
  );
  return <Panel title={title} content={contentBody} />;
};

SitesStatusOverviewPanel.propTypes = {
  sites: PropTypes.array,
  title: PropTypes.string,
};

export default SitesStatusOverviewPanel;
