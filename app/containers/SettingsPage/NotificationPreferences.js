/*
 * NotificationPreferences
 *
 * This is the component for notification preference panel
 *
 */
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Panel from '../../components/Panel';
import Switch from '../../components/Switch';
import { getDefaultToggleOptions } from '../../utils/toggle';
import messages from './messages';

const useStyles = makeStyles({
  preference: {},
  preferenceName: {
    marginBottom: '8px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  preferenceSettingRow: {
    display: 'flex',
    marginBottom: '16px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

/**
 * NotificationPreferences creates a panel to display
 * and edit the notification preferences
 */
const NotificationPreferences = (props) => {
  const { notificationPreferences, onChange } = props;
  const classes = useStyles();
  const notificationPreferencesMessages = messages.notificationPreferences;
  const preferenceOptions = getDefaultToggleOptions();

  /*
   * updateNotificationPreference
   * Method to handle any change on notification preferences
   * @param {object} notificationPreference notification preference to be updated
   */
  const updateNotificationPreference = (notificationPreference) => {
    onChange(notificationPreference);
  };

  /*
   * onEmailEnabledChange
   * Method to handle any change on Email Enabled
   * @param {boolean} valueSelected new value for email enabled option
   * @param {object} notificationPreference notification preference to be updated
   */
  const onEmailEnabledChange = (valueSelected, notificationPreference) => {
    if (valueSelected !== null) {
      updateNotificationPreference({
        ...notificationPreference,
        emailEnabled: valueSelected,
      });
    }
  };

  /*
   * onSmsEnabledChange
   * Method to handle any change on SMS Enabled
   * @param {boolean} valueSelected new value for SMS enabled option
   * @param {object} notificationPreference notification preference to be updated
   */
  const onSmsEnabledChange = (valueSelected, notificationPreference) => {
    if (valueSelected !== null) {
      updateNotificationPreference({
        ...notificationPreference,
        smsEnabled: valueSelected,
      });
    }
  };

  // Creates preference notification list
  const contentBody = (
    <>
      {notificationPreferences &&
        notificationPreferences.map((notificationPreference) => (
          <div
            data-testid="notificationPreferenceItem"
            key={notificationPreference.notificationPreferenceId}
            className={classes.preference}
          >
            <Typography className={classes.preferenceName} variant="subtitle2">
              {notificationPreference.notificationPreferenceType.name}
            </Typography>
            <div className={classes.preferenceSettingRow}>
              <FormattedMessage {...notificationPreferencesMessages.emailLabel}>
                {(emailLabel) => (
                  <Typography variant="caption">{emailLabel}</Typography>
                )}
              </FormattedMessage>
              <Switch
                data-testid="emailToggle"
                leftOption={preferenceOptions.left}
                rightOption={preferenceOptions.right}
                value={notificationPreference.emailEnabled}
                onChange={(e, newValue) => {
                  onEmailEnabledChange(newValue, notificationPreference);
                }}
              />
            </div>
            <div className={classes.preferenceSettingRow}>
              <FormattedMessage {...notificationPreferencesMessages.smsLabel}>
                {(smsLabel) => (
                  <Typography variant="caption">{smsLabel}</Typography>
                )}
              </FormattedMessage>
              <Switch
                data-testid="smsToggle"
                leftOption={preferenceOptions.left}
                rightOption={preferenceOptions.right}
                value={notificationPreference.smsEnabled}
                onChange={(e, newValue) => {
                  onSmsEnabledChange(newValue, notificationPreference);
                }}
              />
            </div>
          </div>
        ))}
    </>
  );

  return (
    <FormattedMessage {...notificationPreferencesMessages.title}>
      {(title) => <Panel title={title} content={contentBody} />}
    </FormattedMessage>
  );
};

NotificationPreferences.propTypes = {
  onChange: PropTypes.func.isRequired,
  notificationPreferences: PropTypes.array,
  settings: PropTypes.object,
};

/**
 * mapStateToProps
 * @param {Object} settings receives settings.notifications reducer from redux
 */
const mapStateToProps = (state) => ({
  settings: state.notifications,
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(mapStateToProps)(NotificationPreferences);
/* eslint-enable */
