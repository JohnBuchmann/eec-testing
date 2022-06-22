import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { setDevicesFilters } from 'Store/Devices/actions';
import { setSiteFiltersByAssignedUser } from 'Store/Sites/actions';
import images from 'Assets/images';
import { Colors } from 'Theme';
import {
  getSiteStatusUIConfigByStatusPoint,
  SiteStatusPointName,
} from 'Utils/enums/site';
import history from 'Utils/history';
import {
  getValueIfExists,
  stringIsNullOrEmpty,
} from 'Utils/propertyValidation';
import messages from './messages';

const useStyles = makeStyles({
  cardContainer: {
    width: '269px',
    height: '156px',
    margin: '16px',
    'object-fit': 'contain',
    background: Colors.athensGray,
    position: 'relative',
    display: 'inline-block',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: Colors.lunarGreen,
    margin: 0,
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  smallGreen: {
    color: Colors.mountainMeadow,
    fontSize: '12px',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: 'normal',
    margin: '0 0 10px 0',
    height: '20px',
    color: Colors.lunarGreen,
  },
  icon: {
    width: '24px',
    height: '24px',
    'object-fit': 'contain',
    border: 'none',
  },
  connectionStatusIcon: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
  },
  connectionStatusTypeIcon: {
    position: 'absolute',
    bottom: '16px',
    right: '48px',
  },
  statusBadge: {
    width: '34px',
    height: '24px',
    fontSize: '12px',
    'object-fit': 'contain',
    display: 'inline-block',
    padding: '5px',
    textAlign: 'center',
    borderRadius: '2px',
    textTransform: 'uppercase',
    fontWeight: 600,
    color: Colors.white,
    lineHeight: '15px',
  },
  statusBadgeHealthy: {
    backgroundColor: Colors.olivine,
  },
  statusBadgeMaintenance: {
    width: '110px',
    backgroundColor: Colors.flameaPea,
  },
  statusBadgeFaulted: {
    width: '70px',
    backgroundColor: Colors.alizarinCrimson,
  },
  statusBadgeAlarm: {
    width: '60px',
    backgroundColor: Colors.christine,
  },
  statusBadgeWarning: {
    width: '74px',
    backgroundColor: Colors.goldenDream,
  },
  muiCardActionsRoot: {
    padding: '0px 0px 0px 16px',
  },
  emulatedSite: {
    border: `3px solid ${Colors.pacificBlue}`,
    background: `url("${images.iconEmulator}") no-repeat 95% 5%, ${
      Colors.athensGray
    }`,
  },
});

const SiteCardComponent = (props) => {
  const { setDevicesFiltersDispatch, cleanAssignedUser, site } = props;
  const {
    siteId,
    name,
    companyName,
    siteStatus,
    siteCommStatus,
    islandMode,
    icianName,
    locationName,
  } = site || {};

  const isSiteLive = getValueIfExists(() => site.live, false);
  const { formatMessage } = props.intl;
  const classes = useStyles();

  const statusBadge =
    getSiteStatusUIConfigByStatusPoint(
      SiteStatusPointName.SiteStatus,
      siteStatus
    ) || {};

  const connectionStatus =
    getSiteStatusUIConfigByStatusPoint(
      SiteStatusPointName.ConnectionStatus,
      siteCommStatus
    ) || {};
  const siteMode =
    getSiteStatusUIConfigByStatusPoint(
      SiteStatusPointName.SiteMode,
      islandMode
    ) || {};

  /**
   * sendToSiteDetails
   * Clear filters and Redirect to site details on the selected site.
   */
  const sendToSiteDetails = () => {
    setDevicesFiltersDispatch({});
    cleanAssignedUser();
    history.push(`/sites/${siteId}/details/Overview`);
  };

  /**
   * renderIcianName
   * It will render Ician Name if needed
   */
  const renderIcianName = () => {
    if (!stringIsNullOrEmpty(icianName)) {
      return (
        <p
          data-testid="icianName"
          className={classes.subtitle}
        >{`${formatMessage(messages.icianLabel)}: ${icianName}`}</p>
      );
    }
    return <></>;
  };

  /**
   * Get class name from site type
   */
  const siteType = !isSiteLive ? classes.emulatedSite : '';

  return (
    <Card
      className={`${classes.cardContainer} ${siteType}`}
      variant="outlined"
      data-testid="siteCardItem"
      onClick={() => sendToSiteDetails()}
    >
      <CardContent>
        <h3 className={`${classes.title} ${classes.ellipsis}`}>
          <small className={classes.smallGreen}>{name}</small> <br />
          {companyName}
        </h3>
        <p className={`${classes.subtitle} ${classes.ellipsis}`}>
          {locationName}
        </p>
        <span
          className={`${classes.statusBadge} ${classes[statusBadge.class]}`}
          data-testid="siteCardStatusBadgeItem"
          data={siteStatus}
        >
          {statusBadge.name}
        </span>
      </CardContent>
      <CardActions
        classes={{
          root: classes.muiCardActionsRoot,
        }}
      >
        {renderIcianName()}
        {siteMode.icon && (
          <img
            id="connectionType"
            name={siteMode.name}
            className={`${classes.icon} ${classes.connectionStatusTypeIcon}`}
            src={siteMode.icon}
            alt={siteMode.name}
            data-testid="siteCardConnectionTypeItem"
          />
        )}
        {connectionStatus.icon && (
          <img
            id="connectionStatus"
            name={connectionStatus.name}
            src={connectionStatus.icon}
            alt={connectionStatus.name}
            data-testid="siteCardConnectionStatusItem"
            className={`${classes.icon} ${classes.connectionStatusIcon}`}
          />
        )}
      </CardActions>
    </Card>
  );
};

SiteCardComponent.propTypes = {
  site: PropTypes.object,
  intl: PropTypes.any.isRequired,
  setDevicesFiltersDispatch: PropTypes.func.isRequired,
  cleanAssignedUser: PropTypes.func.isRequired,
};

/**
 * mapDispatchToProps
 * @param {Function} setDevicesFiltersDispatch call setDevicesFilters action to set devices filters on store
 */
const mapDispatchToProps = (dispatch) => ({
  setDevicesFiltersDispatch: (filters) => dispatch(setDevicesFilters(filters)),
  cleanAssignedUser: () => dispatch(setSiteFiltersByAssignedUser('')),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default injectIntl(
  connect(
    null,
    mapDispatchToProps
  )(SiteCardComponent)
);
/* eslint-enable */
