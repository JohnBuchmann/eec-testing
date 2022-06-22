import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

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
  },
  submitButton: {
    height: '40px',
    width: '120px',
    border: 0,
    color: Colors.white,
    backgroundColor: Colors.primaryLight,
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
 * @method DeleteUserModal
 * The DeleteUserModal to delete the users from users assigned.
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
export const DeleteUserModal = (props) => {
  const { submitDeleteUserDialog, closeDeleteUserDialog, openModal } = props;
  const classStyle = useStyles();
  const { deleteModal: deleteModalMessages } = messages;

  /**
   * @property {Object} modalTitle Stores the title to display in the modal
   */
  const modalTitle = (
    <FormattedMessage
      {...deleteModalMessages.title}
      data-testid="content-modalTitle"
    >
      {(title) => <Typography variant="caption">{title}</Typography>}
    </FormattedMessage>
  );

  return (
    <ModalComponent
      data-testid="content-deleteUserModal"
      open={openModal}
      onBackdropClick={closeDeleteUserDialog}
      title={modalTitle}
    >
      <FormattedMessage {...deleteModalMessages.body}>
        {(body) => <Typography>{body}</Typography>}
      </FormattedMessage>
      <div>
        <ButtonComponent
          className={classStyle.cancelButton}
          type="button"
          onClick={closeDeleteUserDialog}
          data-testid="content-modalDeleteCloseButton"
        >
          <FormattedMessage {...deleteModalMessages.cancelButtonLabel}>
            {(cancelButtonLabel) => (
              <Typography>{cancelButtonLabel}</Typography>
            )}
          </FormattedMessage>
        </ButtonComponent>
        <button
          type="button"
          className={classStyle.submitButton}
          onClick={submitDeleteUserDialog}
          data-testid="content-modalDeleteSubmitButton"
        >
          <FormattedMessage {...deleteModalMessages.deleteButtonLabel}>
            {(deleteButtonLabel) => (
              <Typography>{deleteButtonLabel}</Typography>
            )}
          </FormattedMessage>
        </button>
      </div>
    </ModalComponent>
  );
};

DeleteUserModal.propTypes = {
  submitDeleteUserDialog: PropTypes.func,
  closeDeleteUserDialog: PropTypes.func,
  openModal: PropTypes.bool,
};

export default DeleteUserModal;
