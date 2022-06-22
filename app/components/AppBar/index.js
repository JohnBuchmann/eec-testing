/* eslint-disable jsx-a11y/anchor-is-valid */
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Colors } from 'Theme';
import { getValueIfExists } from 'Utils/propertyValidation';
import { showNotifications } from 'Utils/roles';
import images from '../../assets/images';
import messages from './messages';
import NotificationRow from './NotificationRow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: 56,
  },
  spacing: {
    flexGrow: 1,
  },
  toolBar: {
    padding: '1px 32px 10px 32px',
    position: 'relative',
  },
  iconButton: {
    padding: '0px 11px 0px 0',
  },
  'iconButton:hover': {
    backgroundColor: 'transparent !important',
  },
  notificationsButton: {
    position: 'relative',
    right: '50px',
    marginRight: '0',
    paddingRight: '0 !important',
  },
  countIndicator: {
    lineHeight: '25px',
    minWidth: '30px',
    height: '25px',
    borderRadius: '2px',
    marginLeft: '10px',
    textAlign: 'center',
  },
  countIndicatorNormal: {
    fontSize: '16px',
    color: Colors.mountainMeadow,
    backgroundColor: Colors.white,
  },
  countIndicatorSmall: {
    fontSize: '14px',
    color: Colors.mountainMeadow,
    backgroundColor: Colors.white,
  },
  countIndicatorTransparent: {
    backgroundColor: 'transparent',
  },
  dismissAllWrapper: {
    display: 'flex',
    height: '50px',
    lineHeight: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    cursor: 'pointer',
  },
  noNotificationsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '419px',
    height: '197px',
  },
  noNewNotificationsText: {
    marginTop: '15px',
    fontSize: '11px',
  },
  notificationListContainer: {
    height: '300px',
    overflowX: 'scroll',
    marginBottom: '50px',
  },
  popoverContainer: {
    '& MuiPopover-paper': {
      overflowX: 'hidden',
      overflowY: 'hidden',
      'padding-bottom': '50px !important',
    },
  },
}));

/**
 * AppBarComponent
 * @param {Object[]{id:,title,description,datetime}} notifications Array of notification to display
 * @param {function} onDismissAllClick Event to execute when dismiss all messages
 * @param {function} onDismissClick Event to execute when dismiss single message
 * @param {function} onViewNotificationClick Event to execute when click on Icon to display notification
 * @param {function} onLogoutClick Event to execute when logout
 */

const AppBarComponent = ({
  notifications = [],
  onDismissAllClick,
  onDismissClick,
  onViewNotificationClick,
  onLogoutClick,
  role = '',
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [displayNotifications, setDisplayNotification] = React.useState(true);

  React.useEffect(() => {
    setDisplayNotification(showNotifications(role));
  }, [role, notifications]);

  /**
   * On Notification Click
   * @param {object} event Click Event
   */
  const onNotificationClick = (event) => {
    const target = getValueIfExists(() => event.currentTarget, null);
    setAnchorEl(target);
  };

  /**
   * Handles Notification Close
   */
  const onNotificationsClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handle Dismiss All Click
   */
  const handleDismissAllClick = () => {
    onDismissAllClick();
  };

  /**
   * Handle View Notification Click
   * @param {string} siteId siteId Id from the notifications
   * @param {string} deviceGroupName Device name
   * @param {string} uniqueId
   * @param {string} subtype Notification type Id
   */
  const handleViewNotificationClick = (
    siteId,
    deviceGroupName,
    uniqueId,
    subType
  ) => {
    setAnchorEl(null);
    onViewNotificationClick(siteId, deviceGroupName, uniqueId, subType);
  };

  /**
   * @method displayNotificationsLength
   * Retrieves total of notifications depending of the length of characters in string,
   * if is more than 2, adds a plus sign otherwise, returns the number.
   * @param notifications The notifications array.
   * @return {string}
   */
  const displayNotificationsLength = () => {
    const notificationLength = notifications.length;
    const threeElementsLength = 3;
    const fourthElementsLength = 4;

    const notificationCounterCharsLength = notificationLength
      .toString()
      .length.toString();
    if (notificationCounterCharsLength > threeElementsLength) {
      let sign = '+';
      if (notificationCounterCharsLength >= fourthElementsLength) {
        sign = 'k+';
      }
      return `${notificationCounterCharsLength.substring(0, 2)}${sign}`;
    }
    if (notificationCounterCharsLength > 0 && notificationLength > 1) {
      return `${notificationLength}`;
    }
    return ``;
  };

  /**
   * @method getNotificationCounterClass
   * Retrieves the class to render the counter.
   * @param notifications The notifications array.
   * @return {string}
   */
  const getNotificationCounterClass = () => {
    const notificationLength = notifications.length;
    const notificationCounterCharsLength = notificationLength.toString().length;
    if (notificationLength > 2) {
      return `${classes.countIndicator} ${classes.countIndicatorSmall}`;
    }
    if (notificationCounterCharsLength > 0 && notificationLength > 1) {
      return `${classes.countIndicator} ${classes.countIndicatorNormal}`;
    }
    return `${classes.countIndicator} ${classes.countIndicatorTransparent}`;
  };

  const notificationsContent = displayNotifications && (
    <>
      <IconButton
        data-testid="content-bell-icon"
        edge="end"
        color="inherit"
        aria-label="menu"
        className={`${classes.iconButton} ${classes.notificationsButton}`}
        onClick={onNotificationClick}
      >
        <img src={images.iconBellWhite} alt="alerts" />
        <span className={getNotificationCounterClass()}>
          {displayNotificationsLength()}
        </span>
      </IconButton>
    </>
  );
  const open = Boolean(anchorEl);
  let undefinedData;
  const id = open ? 'simple-popover' : undefinedData;
  const containerClass =
    notifications.length > 0 ? classes.notificationListContainer : '';

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar className={classes.toolBar}>
        <img src={images.logoBrandingSM} alt="EnTech Logo" />
        <div className={classes.spacing} />
        {notificationsContent}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          className={classes.iconButton}
          data-testid="content-logout-button"
          onClick={onLogoutClick}
        >
          <img src={images.iconLogout} alt="alerts" />
        </IconButton>
        <Popover
          className={classes.popoverContainer}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={onNotificationsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          BackdropProps={{ 'data-testid': 'backdrop' }}
        >
          <div className={containerClass}>
            {notifications.map((notification) => {
              const {
                id: notificationId,
                title,
                text,
                ts: startDate,
                siteId,
                deviceGroupname,
                uniqueId,
                subtype,
              } = notification;
              return (
                <NotificationRow
                  key={notificationId}
                  title={title}
                  description={text}
                  dateTime={startDate}
                  onViewClick={() =>
                    handleViewNotificationClick(
                      siteId,
                      deviceGroupname,
                      uniqueId || '',
                      subtype
                    )
                  }
                  onDismissClick={() => onDismissClick(notificationId)}
                />
              );
            })}

            {notifications.length === 0 && (
              <div className={classes.noNotificationsWrapper}>
                <img src={images.emptyEnvelop} alt="" />
                <Typography className={classes.noNewNotificationsText}>
                  <FormattedMessage {...messages.noNewNotifications} />
                </Typography>
              </div>
            )}
          </div>
          {notifications.length > 0 && (
            <div className={classes.dismissAllWrapper}>
              <Typography>
                <Link onClick={handleDismissAllClick}>
                  <FormattedMessage {...messages.dismissAll} />
                </Link>
              </Typography>
            </div>
          )}
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

AppBarComponent.propTypes = {
  notifications: PropTypes.array,
  onDismissAllClick: PropTypes.func,
  onDismissClick: PropTypes.func,
  onViewNotificationClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  role: PropTypes.string,
};

const mapStateToProps = (state) => ({
  role: state.user.user.role,
});

// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(mapStateToProps)(AppBarComponent);
/* eslint-enable */
