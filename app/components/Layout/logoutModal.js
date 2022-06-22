import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import ModalComponent from 'Components/Modal';
import ButtonComponent from 'Components/Button';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Colors } from 'Theme';
import messages from './messages';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  modalTitle: {
    fontSize: '18px !important',
    fontFamily: 'Inter !important',
  },
  modalContent: {
    fontFamily: 'Inter !important',
    marginBottom: '20px',
  },
  cancelButton: {
    height: '40px',
    width: '120px',
    cursor: 'pointer',
  },
  submitButton: {
    height: '40px',
    width: '120px',
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
});

/**
 * @method LogoutModal
 * The LogoutModal to confirm changes in the Tariff Structure.
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
export const LogoutModal = (props) => {
  const {
    submitLogoutConfirmationModal,
    closeLogoutConfirmationModal,
    openModal,
  } = props;
  const classStyle = useStyles();
  const { logoutModal: logoutModalMessages } = messages;

  /**
   * @property {Object} modalTitle Stores the title to display in the modal
   */
  const modalTitle = (
    <FormattedMessage
      {...logoutModalMessages.title}
      data-testid="content-modalTitle"
    >
      {(title) => (
        <Typography variant="caption" className={classStyle.modalTitle}>
          {title}
        </Typography>
      )}
    </FormattedMessage>
  );

  return (
    <ModalComponent
      data-testid="content-LogoutModal"
      open={openModal}
      onBackdropClick={closeLogoutConfirmationModal}
      title={modalTitle}
    >
      <FormattedMessage {...logoutModalMessages.body}>
        {(body) => (
          <Typography className={classStyle.modalContent}>{body}</Typography>
        )}
      </FormattedMessage>
      <div>
        <ButtonComponent
          className={classStyle.cancelButton}
          type="button"
          onClick={closeLogoutConfirmationModal}
          data-testid="content-modalDeleteCloseButton"
        >
          <FormattedMessage {...logoutModalMessages.cancelButton}>
            {(cancelButton) => <Typography>{cancelButton}</Typography>}
          </FormattedMessage>
        </ButtonComponent>
        <button
          type="button"
          className={classStyle.submitButton}
          onClick={submitLogoutConfirmationModal}
          data-testid="content-modalLogoutSubmitButton"
        >
          <FormattedMessage {...logoutModalMessages.submitButton}>
            {(submitButton) => <Typography>{submitButton}</Typography>}
          </FormattedMessage>
        </button>
      </div>
    </ModalComponent>
  );
};

LogoutModal.propTypes = {
  submitLogoutConfirmationModal: PropTypes.func,
  closeLogoutConfirmationModal: PropTypes.func,
  openModal: PropTypes.bool,
};

export default LogoutModal;
