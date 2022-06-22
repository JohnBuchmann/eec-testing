import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import messages from './messages';

/**
 * Declare UI styles
 */
const useStyles = makeStyles({
  noDevicesTitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: 'normal',
    letterSpacing: '.6px',
    color: Colors.white,
  },
});

/**
 * NoDevices
 * Display no devices message
 */
function NoDevices(props) {
  const { formatMessage } = props.intl;

  const classes = useStyles();
  return (
    <>
      <rect
        stroke={Colors.white}
        fill={Colors.nandor}
        x={158}
        y={267}
        width={855}
        height={22}
        rx={4}
      />
      <text x={480} y={283} className={classes.noDevicesTitle}>
        {formatMessage(messages.noDevicesTitle)}
      </text>
    </>
  );
}

NoDevices.propTypes = {
  intl: PropTypes.any.isRequired,
};

export default injectIntl(NoDevices);
