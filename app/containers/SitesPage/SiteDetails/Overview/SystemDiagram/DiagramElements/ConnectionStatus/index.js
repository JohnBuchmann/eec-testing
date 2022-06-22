/**
 * Connection status
 */

import React from 'react';
import PropTypes from 'prop-types';
import images from 'Assets/images';
import { injectIntl } from 'react-intl';
import { SiteConnectionId } from 'Utils/enums/site';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import messages from './messages';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
  },
  connectivityDescription: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: 'semi-bold',
    lineHeight: 'normal',
    letterSpacing: '.6px',
    padding: '5px 0px',
    marginLeft: '6px',
  },
});

/**
 * @method ConnectionStatus
 * Display connection status
 * @param {status} status Connection status
 * @param {any} intl Internationalization (i18n)
 */
function ConnectionStatus(props) {
  const classes = useStyles();
  const { status = 0, intl } = props;
  const { formatMessage } = intl;

  let connectionStatus;
  switch (status) {
    // Connected via a landline connection
    case SiteConnectionId.Connected:
      connectionStatus = {
        text: formatMessage(messages.online),
        icon: (
          <img
            src={images.iconWifiConnectedWhite}
            alt={formatMessage(messages.onlineLandline)}
            data-testid="content-connected-statusImg"
          />
        ),
      };
      break;
    // Connected via a cellular connection
    case SiteConnectionId.Cellular:
      connectionStatus = {
        text: formatMessage(messages.online),
        icon: (
          <img
            src={images.iconCellularWhite}
            alt={formatMessage(messages.onlineCellular)}
            data-testid="content-onlineCellular-statusImg"
          />
        ),
      };
      break;
    // No active MQTT session for 15 minutes
    case SiteConnectionId.Disconnected:
      connectionStatus = {
        text: formatMessage(messages.disconnected),
        icon: (
          <img
            src={images.iconWifiDisconnectedWhite}
            alt={formatMessage(messages.disconnected)}
            data-testid="content-disconnected-statusImg"
          />
        ),
      };
      break;
    case SiteConnectionId.Unknown:
      connectionStatus = {
        text: formatMessage(messages.unknown),
        icon: (
          <img
            src={images.iconUnknownWhite}
            alt={formatMessage(messages.unknown)}
            data-testid="content-unknown-statusImg"
          />
        ),
      };
      break;
    default:
      connectionStatus = {
        text: formatMessage(messages.unknown),
        icon: (
          <img
            src={images.iconUnknownWhite}
            data-testid="content-unknown-statusImg"
            alt={formatMessage(messages.unknown)}
          />
        ),
      };
      break;
  }

  return (
    <div className={classes.wrapper}>
      <Box>{connectionStatus.icon}</Box>
      <Box>
        <Typography
          className={classes.connectivityDescription}
          data-testid="content-connectionStatusText"
        >
          {connectionStatus.text}
        </Typography>
      </Box>
    </div>
  );
}

ConnectionStatus.propTypes = {
  intl: PropTypes.any,
  status: PropTypes.number,
};

export default injectIntl(ConnectionStatus);
