import { makeStyles, Typography } from '@material-ui/core';
import ButtonComponent from 'Components/Button';
import ModalComponent from 'Components/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { Colors } from 'Theme';
import messages from 'Utils/enums/messages';
import {
  stringIsNullOrEmpty,
  getValueIfExists,
} from 'Utils/propertyValidation';

const useStyles = makeStyles({
  cancelButton: {
    height: '40px',
    minWidth: '120px',
    cursor: 'pointer',
  },
  saveButton: {
    height: '40px',
    minWidth: '120px',
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
 * @method GenericModalConfirmation
 * The GenericModalConfirmation to confirm changes in the Tariff Structure.
 * @property {Object} props The properties to render the component.
 *   openModal {bool} To set whether the modal is open or not, default value: false
 *   submitSave {function} Function to call when submit is click
 *   bodyMessage {string} To override default body message text
 *   titleMessage {string} To override default title message text
 *   submitCancel {function} Function to call when cancel is click
 *   saveLabelText {string} To override default save label text
 *   cancelLabelText {string} To override default cancel label text
 * @return {Object} Returns the component
 */
export const GenericModalConfirmation = (props) => {
  const openModal = getValueIfExists(() => props.openModal, false);
  const showCancel = getValueIfExists(() => props.showCancel, true);
  const showSubmit = getValueIfExists(() => props.showSubmit, true);

  const { submitSave, bodyMessage, titleMessage } = props;
  const { submitCancel, saveLabelText, cancelLabelText } = props;
  const { formatMessage } = props.intl;

  const classStyle = useStyles();
  const { confirmationOptionsText } = messages;

  const displayCancelLabelText = !stringIsNullOrEmpty(cancelLabelText)
    ? cancelLabelText
    : formatMessage(confirmationOptionsText.cancel);

  const displaySaveLabelText = !stringIsNullOrEmpty(saveLabelText)
    ? saveLabelText
    : formatMessage(confirmationOptionsText.save);

  const displayBodyMessage = !stringIsNullOrEmpty(bodyMessage)
    ? bodyMessage
    : formatMessage(confirmationOptionsText.defaultConfirmBody);

  const displayTitleMessage = !stringIsNullOrEmpty(titleMessage)
    ? titleMessage
    : formatMessage(confirmationOptionsText.defaultConfirmTitle);

  return (
    <ModalComponent
      data-testid="generic-modal-component"
      open={openModal}
      onBackdropClick={submitCancel}
      title={displayTitleMessage}
    >
      <Typography>{displayBodyMessage}</Typography>
      <div>
        {showCancel && (
          <ButtonComponent
            data-testid="modal-cancel-button"
            className={classStyle.cancelButton}
            type="button"
            onClick={submitCancel}
          >
            <Typography>{displayCancelLabelText}</Typography>
          </ButtonComponent>
        )}
        {showSubmit && (
          <button
            type="button"
            data-testid="modal-submit-button"
            className={classStyle.saveButton}
            onClick={submitSave}
          >
            <Typography>{displaySaveLabelText}</Typography>
          </button>
        )}
      </div>
    </ModalComponent>
  );
};

GenericModalConfirmation.propTypes = {
  openModal: PropTypes.bool,
  submitSave: PropTypes.func,
  submitCancel: PropTypes.func,
  bodyMessage: PropTypes.string,
  titleMessage: PropTypes.string,
  saveLabelText: PropTypes.string,
  cancelLabelText: PropTypes.string,
  showCancel: PropTypes.bool,
  showSubmit: PropTypes.bool,
  intl: PropTypes.any.isRequired,
};

export default injectIntl(GenericModalConfirmation);
