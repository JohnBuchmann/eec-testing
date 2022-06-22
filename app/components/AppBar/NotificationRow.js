import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { truncate } from 'Utils/propertyHelpers';
import { Colors } from 'Theme';
import images from '../../assets/images';
import messages from './messages';

const useStyles = makeStyles(() => ({
  container: {
    width: '28rem',
    display: 'flex',
    flexDirection: 'row',
  },
  bellIcon: {
    marginLeft: '1rem',
    position: 'relative',
    bottom: '24px',
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.562rem 0.562rem 0.75rem 1rem',
    width: '100%',
  },
  actionRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '0.438rem',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacing: {
    flexGrow: 1,
  },
  captionBold: {
    fontWeight: '700',
  },
  notificationDescription: {
    marginTop: '0.25rem',
  },
  notifyButton: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  separator: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.mercury,
  },
}));

/**
 * NotificationRow
 * @param {string} title Title to show on notification ribbon
 * @param {string} description Description to display on notification ribbon
 * @param {string} dateTime Current notification date time on string format
 * @param {function} onDismissClick Event to execute when dismiss notification
 * @param {function} onViewClick Event to execute when click on view notification
 */
const NotificationRow = ({
  title,
  description,
  dateTime,
  onDismissClick,
  onViewClick,
}) => {
  const classes = useStyles();
  const notificationDateTime = new Date(dateTime);
  const today = new Date();
  const diffTime = Math.abs(today - notificationDateTime);

  let timeAgo = '';
  // if diffTime is a number calculate difference, otherwise display an error message.
  if (!Number.isNaN(diffTime)) {
    if (diffTime < 1000 * 60 * 60) {
      const diffMinutes = Math.ceil(diffTime / (1000 * 60));
      timeAgo = (
        <FormattedMessage
          {...messages.minutesAgo}
          values={{ value: diffMinutes }}
        />
      );
    } else if (diffTime < 1000 * 60 * 60 * 24) {
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      timeAgo = (
        <FormattedMessage
          {...messages.hoursAgo}
          values={{ value: diffHours }}
        />
      );
    } else {
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      timeAgo = (
        <FormattedMessage {...messages.daysAgo} values={{ value: diffDays }} />
      );
    }
  } else {
    timeAgo = <FormattedMessage {...messages.error} />;
  }
  const titleMaxCharacters = 25;
  const descriptionMaxCharacters = 500;

  return (
    <div>
      <div className={classes.container}>
        <img
          src={images.notificationRowBellIcon}
          alt="notification"
          className={classes.bellIcon}
        />
        <div
          className={classes.bodyContainer}
          data-testid="notification-body-container"
        >
          <Typography variant="caption" className={classes.captionBold}>
            {truncate(title, titleMaxCharacters)}
          </Typography>
          <Typography
            variant="caption"
            className={classes.notificationDescription}
          >
            {truncate(description, descriptionMaxCharacters)}
          </Typography>
          <div className={classes.actionRow}>
            <Typography
              variant="caption"
              data-testid="notification-time-ago"
              data={timeAgo}
            >
              {timeAgo}
            </Typography>
            <div>
              <Button className={classes.notifyButton} onClick={onDismissClick}>
                <FormattedMessage {...messages.dismiss} />
              </Button>
              <Button
                className={classes.notifyButton}
                data-test-id="buttonView"
                color="primary"
                onClick={onViewClick}
              >
                <FormattedMessage {...messages.view} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.separator} />
    </div>
  );
};

NotificationRow.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  dateTime: PropTypes.string,
  onDismissClick: PropTypes.func,
  onViewClick: PropTypes.func,
};

export default NotificationRow;
