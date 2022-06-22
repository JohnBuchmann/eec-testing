import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import ModalComponent from 'Components/Modal';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { getValueIfExists } from 'Utils/propertyValidation';

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
 * @method UserProfileErrorModal
 * The userProfileErrorModal to display the error messages from okta updates.
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
export const UserProfileErrorModal = (props) => {
  const { closeUserProfileErrorModal, modalContent = {}, isOpen } = props;
  const classStyle = useStyles();
  const { userInfo } = messages;

  const modalTitle = getValueIfExists(() => modalContent.title, null);
  const modalMessage = getValueIfExists(() => modalContent.content, null);

  return (
    modalTitle &&
    modalMessage && (
      <ModalComponent
        data-testid="content-userProfileErrorModal"
        open={isOpen}
        onBackdropClick={closeUserProfileErrorModal}
        title={modalTitle}
      >
        <Typography>{modalMessage}</Typography>
        <div>
          <button
            type="button"
            className={classStyle.submitButton}
            onClick={closeUserProfileErrorModal}
            data-testid="content-userProfileErrorModalSubmitButton"
          >
            <FormattedMessage {...userInfo.submitModalButton}>
              {(submitButton) => <Typography>{submitButton}</Typography>}
            </FormattedMessage>
          </button>
        </div>
      </ModalComponent>
    )
  );
};

UserProfileErrorModal.propTypes = {
  modalContent: PropTypes.object,
  closeUserProfileErrorModal: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UserProfileErrorModal;
