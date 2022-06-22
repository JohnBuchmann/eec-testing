/*
 * SettingsPage
 *
 * This is the settings page where we can manage all the user settings, at the '/settings' route
 *
 */
import { Box, makeStyles, Typography } from '@material-ui/core';
import Header from 'Components/Header';
import Layout from 'Components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Colors } from 'Theme';
import {
  getAllNotificationsSettings,
  updateNotificationSettings,
  updateUnitMeasurement,
} from 'Store/Settings/actions';
import { showNotifications } from 'Utils/roles';
import LocalizationSettings from './LocalizationSettings';
import messages from './messages';
import NotificationPreferences from './NotificationPreferences';
import UserInfoPanel from './UserInfo';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  wrapperPanels: {
    display: 'flex',
    marginLeft: '16px',
    marginTop: '16px',
    marginRight: '18px',
  },
  panelLeft: {
    marginRight: '16px',
    width: '50%',
  },
  panelRight: {
    width: '50%',
  },
  userInfoPanel: {
    height: '269px',
    minWidth: '574px',
  },
  localizationSettingsPanel: {
    marginBottom: '16px',
    minWidth: '574px',
  },
  notificationPreferencePanel: {
    minWidth: '574px',
  },
  placeholder: {
    backgroundColor: Colors.white,
    padding: '25px',
    height: '65px',
    minWidth: '500px',
    textAlign: 'center',
  },
  placeholderTitle: {
    color: Colors.lunarGreen,
  },
});

/**
 * SettingsPage creates the container to
 * display all the content related to the user settings.
 * User will be able to access
 * this container at the '/settings' route to modify own data.
 */
const SettingsPage = (props) => {
  const {
    getNotificationsSettings,
    settings,
    setUnitMeasurements,
    setNotificationSettings,
    role,
  } = props;
  const { displayPlaceholder, notifications } = settings;
  const classes = useStyles();
  const basicHeader = true;
  const { notificationPreferences, unitMeasurement, userSettingId } =
    notifications || {};
  const [displayNotifications, setDisplayNotification] = React.useState(false);

  React.useEffect(() => {
    getNotificationsSettings();
  }, []);

  React.useEffect(() => {
    setDisplayNotification(showNotifications(role));
  }, [role]);

  /*
   * onUnitsOfMeasurementChange
   * Method to handle any change on unit of measurement
   * @param {object} newUnitMeasurement new unit of measurement data
   */
  const onUnitsOfMeasurementChange = (newUnitMeasurement) => {
    setUnitMeasurements(userSettingId, newUnitMeasurement);
  };

  /*
   * onNotificationPreferencesChange
   * Method to handle any change on Notification Preferences
   * @param {array} newNotificationPreferences array for notification preferences
   */
  const onNotificationPreferencesChange = (notificationPreference) => {
    setNotificationSettings(userSettingId, notificationPreference);
  };

  return (
    <Layout
      main
      content={
        <Box className={classes.wrapper}>
          <FormattedMessage {...messages.title}>
            {(title) => <Header basic={basicHeader} title={title} />}
          </FormattedMessage>
          <div className={classes.wrapperPanels}>
            <div className={classes.panelLeft}>
              <div className={classes.userInfoPanel}>
                <UserInfoPanel />
              </div>
            </div>
            <div className={classes.panelRight}>
              {displayPlaceholder && (
                <div
                  className={classes.placeholder}
                  data-testid="container-settingsPlaceholder"
                >
                  <Box>
                    <FormattedMessage {...messages.placeholders}>
                      {(placeholders) => (
                        <Typography
                          variant="subtitle2"
                          className={`${classes.title} ${
                            classes.placeholderTitle
                          }`}
                        >
                          {placeholders}
                        </Typography>
                      )}
                    </FormattedMessage>
                  </Box>
                </div>
              )}
              <div className={classes.localizationSettingsPanel}>
                {unitMeasurement && (
                  <LocalizationSettings
                    unitMeasurement={unitMeasurement}
                    onChange={onUnitsOfMeasurementChange}
                  />
                )}
              </div>
              {displayNotifications && (
                <div className={classes.notificationPreferencePanel}>
                  {notificationPreferences && (
                    <NotificationPreferences
                      notificationPreferences={notificationPreferences}
                      onChange={onNotificationPreferencesChange}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </Box>
      }
    />
  );
};

SettingsPage.propTypes = {
  settings: PropTypes.object,
  getNotificationsSettings: PropTypes.func,
  setNotificationSettings: PropTypes.func,
  setUnitMeasurements: PropTypes.func,
  role: PropTypes.string,
};

/**
 * mapStateToProps
 * @param {Object} user receives user.user reducer from redux
 * @param {Object} settings receives settings.notifications reducer from redux
 * @param {Object} role receives state.user.user.role reducer from redux
 */
const mapStateToProps = (state) => ({
  settings: state.settings,
  role: state.user.user.role,
});
/**
 * mapDispatchToProps
 * @param {Function} getNotificationsSettings call getAllNotificationsSettings action and get all notifications settings data
 * @param {Function} setNotificationSettings call setNotifications action and set new notifications settings value
 * @param {Function} setUnitMeasurements call setUnitMeasurement action and set new unit measurement value
 */
const mapDispatchToProps = (dispatch) => ({
  getNotificationsSettings: () => dispatch(getAllNotificationsSettings()),
  setNotificationSettings: (settingsId, notifications) =>
    dispatch(updateNotificationSettings(settingsId, notifications)),
  setUnitMeasurements: (settingsId, unit) =>
    dispatch(updateUnitMeasurement(settingsId, unit)),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
/* eslint-enable */
