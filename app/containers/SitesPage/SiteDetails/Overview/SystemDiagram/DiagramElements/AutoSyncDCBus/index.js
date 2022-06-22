import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import messages from './messages';

const useStyles = makeStyles({
  autoSyncDCBusTitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: 'normal',
    letterSpacing: '.6px',
    textTransform: 'uppercase',
    color: Colors.white,
  },
});

/**
 * Display auto sync dc bus bar
 */
function AutoSyncDCBus(props) {
  const { formatMessage } = props.intl;

  const classes = useStyles();
  return (
    <>
      <rect
        data-testid="svg-auto-sync"
        stroke={Colors.white}
        fill={Colors.nandor}
        x={188}
        y={267}
        width={855}
        height={22}
        rx={4}
      />
      <text x={596} y={283} className={classes.autoSyncDCBusTitle}>
        {formatMessage(messages.autoSyncDCBusTitle)}
      </text>
    </>
  );
}

AutoSyncDCBus.propTypes = {
  intl: PropTypes.any.isRequired,
};

export default injectIntl(AutoSyncDCBus);
