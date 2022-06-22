import React from 'react';
import { makeStyles, Typography, Box, Grid } from '@material-ui/core';
import ModalComponent from 'Components/Modal';
import ButtonComponent from 'Components/Button';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';
import messages from '../messages';

const useStyles = makeStyles({
  cancelButton: {
    height: '40px',
    width: '120px',
    cursor: 'pointer',
    paddingTop: '15px',
  },
  submitButton: {
    height: '50px',
    width: '200px',
    border: 0,
    color: Colors.white,
    backgroundColor: Colors.mountainMeadow,
    outline: 'none',
    margin: '0',
    marginLeft: '10px',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 0.5,
    },
  },
  okButton: {
    height: '40px',
    width: '100px',
    border: 0,
    color: Colors.white,
    backgroundColor: Colors.mountainMeadow,
    outline: 'none',
    margin: '0',
    marginLeft: '10px',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 0.5,
    },
  },
  userPasswordContainer: {
    marginTop: '25px',
  },
});

/**
 * @method GenerateUsernamePasswordModal
 * The AddNewUserModal to search the users that we would like to assign to the site.
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
export const GenerateUsernamePasswordModal = (props) => {
  const {
    submitUsernamePasswordDialog,
    closetUsernamePasswordDialog,
    openModal,
    currentUsername,
    currentPassword,
  } = props;
  const classStyle = useStyles();
  const [firstStep, setFirstStep] = React.useState(true);
  const { generateUsernamePasswordModal: generateMessages } = messages;

  /**
   * submitClickEvent
   * Event click on submit button from modal and generate new username password request
   */
  const submitClickEvent = () => {
    setFirstStep(false);
    submitUsernamePasswordDialog();
  };

  /**
   * okButtonClickEvent
   * Event click on ok button from modal
   */
  const okButtonClickEvent = () => {
    closetUsernamePasswordDialog();
    setFirstStep(true);
  };

  /**
   * @property {Object} modalTitle Stores the title to display in the modal
   */
  const modalTitle = (
    <>
      {firstStep && (
        <FormattedMessage
          {...generateMessages.titleOne}
          data-testid="content-modalTitle"
        >
          {(titleOne) => (
            <Typography variant="caption" className={classStyle.titleOne}>
              {titleOne}
            </Typography>
          )}
        </FormattedMessage>
      )}
      {!firstStep && (
        <FormattedMessage
          {...generateMessages.titleTwo}
          data-testid="content-modalTitle"
        >
          {(titleTwo) => (
            <Typography variant="caption" className={classStyle.titleTwo}>
              {titleTwo}
            </Typography>
          )}
        </FormattedMessage>
      )}
    </>
  );

  return (
    <ModalComponent
      data-testid="content-addNewUserModal"
      open={openModal}
      onBackdropClick={closetUsernamePasswordDialog}
      title={modalTitle}
    >
      {firstStep && (
        <FormattedMessage {...generateMessages.bodyOne}>
          {(bodyOne) => <Typography>{bodyOne}</Typography>}
        </FormattedMessage>
      )}
      {!firstStep && (
        <>
          <FormattedMessage {...generateMessages.bodyTwo}>
            {(bodyTwo) => <Typography>{bodyTwo}</Typography>}
          </FormattedMessage>
          <Box className={classStyle.userPasswordContainer}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormattedMessage {...generateMessages.userName}>
                  {(userName) => <Typography>{userName}</Typography>}
                </FormattedMessage>
              </Grid>
              <Grid item xs={6}>
                <Box
                  textAlign="right"
                  m={1}
                  data-testid="content-usernameValue"
                >
                  {currentUsername}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <FormattedMessage {...generateMessages.password}>
                  {(password) => <Typography>{password}</Typography>}
                </FormattedMessage>
              </Grid>
              <Grid item xs={6}>
                <Box
                  textAlign="right"
                  m={1}
                  data-testid="content-passwordValue"
                >
                  <Typography component="span" id="password" variant="body1">
                    {currentPassword}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {firstStep && (
        <div>
          <ButtonComponent
            className={classStyle.cancelButton}
            type="button"
            onClick={closetUsernamePasswordDialog}
            data-testid="content-modalGenerateNewUsernamePasswordCloseButton"
          >
            <FormattedMessage {...generateMessages.cancelButtonLabel}>
              {(cancelButtonLabel) => (
                <Typography>{cancelButtonLabel}</Typography>
              )}
            </FormattedMessage>
          </ButtonComponent>
          <button
            type="button"
            className={classStyle.submitButton}
            onClick={submitClickEvent}
            data-testid="content-modalGenerateNewUsernamePasswordSubmitButton"
          >
            <FormattedMessage {...generateMessages.generateNewButtonLabel}>
              {(generateNewButtonLabel) => (
                <Typography>{generateNewButtonLabel}</Typography>
              )}
            </FormattedMessage>
          </button>
        </div>
      )}
      {!firstStep && (
        <div>
          <button
            type="button"
            className={classStyle.okButton}
            onClick={okButtonClickEvent}
            data-testid="content-modalGenerateNewUsernamePasswordOkButton"
          >
            <FormattedMessage {...generateMessages.okButtonLabel}>
              {(okButtonLabel) => <Typography>{okButtonLabel}</Typography>}
            </FormattedMessage>
          </button>
        </div>
      )}
    </ModalComponent>
  );
};

GenerateUsernamePasswordModal.propTypes = {
  submitUsernamePasswordDialog: PropTypes.func.isRequired,
  closetUsernamePasswordDialog: PropTypes.func.isRequired,
  currentUsername: PropTypes.string,
  currentPassword: PropTypes.string,
  openModal: PropTypes.bool,
};

export default GenerateUsernamePasswordModal;
