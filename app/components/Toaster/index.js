import Snackbar from '@material-ui/core/Snackbar/index';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert/index';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { hideToast } from 'Store/App/actions';
import { ToastEvent } from 'Utils/enums/toaster';
import { getValueIfExists } from 'Utils/propertyValidation';
import messages from './messages';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

/**
 * Alert
 * Render alert based on props
 * @param {Object} props child to send to MuiAlert
 * @returns {Object} render of the MuiAlert
 */
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Toaster
 * Render toast with selected event.
 * @param {Object} props
 */
function Toaster(props) {
  const classes = useStyles();
  const { toastOptions, hideToastNotification } = props;
  const { formatMessage } = props.intl;
  const { showToast, event = ToastEvent.Success } = getValueIfExists(
    () => toastOptions,
    {}
  );

  /**
   * handleClose
   * @param {string} reason it will indicate where was the click on the Snackbar
   * @returns
   */
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideToastNotification();
  };

  const messageNotification = getValueIfExists(
    () => messages[`${event}`],
    null
  );
  if (messageNotification) {
    const duration = 5000;
    return (
      <div data-testid="snack-bar-toast-div" className={classes.root}>
        <Snackbar
          autoHideDuration={duration}
          open={showToast}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={event}>
            {formatMessage(messageNotification)}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

/**
 * mapDispatchToProps
 * @param {Function} hideToastNotification call hideToast to close toast
 */
const mapDispatchToProps = (dispatch) => ({
  hideToastNotification: () => dispatch(hideToast()),
});

Toaster.propTypes = {
  intl: PropTypes.any.isRequired,
  toastOptions: PropTypes.object,
  hideToastNotification: PropTypes.func,
};

// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default injectIntl(
  connect(
    null,
    mapDispatchToProps
  )(Toaster)
);
/* eslint-enable */
