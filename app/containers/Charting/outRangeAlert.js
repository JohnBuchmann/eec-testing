import React, { useState } from 'react';
import { Colors } from 'Theme';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Button from 'Components/Button';
import { makeStyles, Typography } from '@material-ui/core';
import messages from './messages';

// CSS Definition for the alert component
const useStyles = makeStyles({
  alertOutRange: {
    backgroundColor: Colors.white,
    position: 'absolute',
    width: '50%',
    height: '58%',
    top: '20%',
    left: '25%',
    border: `1px solid ${Colors.mercury}`,
    borderRadius: '5px',
  },
  title: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '600',
    padding: '5px',
    borderBottom: `1px solid ${Colors.mercury}`,
  },
  body: {
    textAlign: 'justify',
    fontSize: '12px',
    fontWeight: '400',
    padding: '0 10px',
  },
  containerButton: {
    textAlign: 'center',
  },
  okButton: {
    height: '30px',
    width: '120px',
    border: '0px',
    color: Colors.white,
    backgroundColor: Colors.primaryLight,
    outline: 'none',
    margin: '0px',
    marginLeft: '10px',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      color: Colors.white,
      textDecoration: 'none',
    },
    textTransform: 'uppercase',
    fontSize: '14px',
  },
});
/**
 * OutRangeAlert
 * Display alert when axis scale is out of range with a value from chart
 * @param {Object} props Properties for the controller
 */
const OutRangeAlert = (props) => {
  const { formatMessage } = props.intl;
  const classes = useStyles();
  const titleText = formatMessage(messages.outRangeAlert.title);
  const bodyText = formatMessage(messages.outRangeAlert.body);
  const okButtonText = formatMessage(messages.outRangeAlert.okButton);
  const [openAlert, setOpenAlert] = useState(true);
  const okClickEvent = () => setOpenAlert(false);
  return (
    <div>
      {openAlert && (
        <div
          className={classes.alertOutRange}
          data-testid="content-outRangealertContainer"
        >
          <Typography className={classes.title}>{titleText}</Typography>
          <p className={classes.body}>{bodyText}</p>
          <div className={classes.containerButton}>
            <Button
              type="button"
              className={classes.okButton}
              onClick={okClickEvent}
              data-testid="content-okButton"
            >
              {okButtonText}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * OutRangeAlert PropTypes
 */
OutRangeAlert.propTypes = {
  intl: PropTypes.any.isRequired,
};

export default injectIntl(OutRangeAlert);
