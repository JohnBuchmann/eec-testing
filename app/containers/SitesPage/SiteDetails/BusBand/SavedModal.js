import { makeStyles, Typography } from '@material-ui/core';
import ButtonComponent from 'Components/Button';
import ModalComponent from 'Components/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getValueIfExists } from 'Utils/propertyValidation';
import messages from './messages';

const useStyles = makeStyles({
  cancelButton: {
    height: '40px',
    width: '140px',
    cursor: 'pointer',
  },
});

/**
 * @method SavedModal
 * The Saved Alert to success data saved
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
export const SavedModal = (props) => {
  const { continueDialog, openModal = false, customMessage } = props;
  const classStyle = useStyles();
  const { savedAlert } = messages;

  const { titleMessage, bodyMessage } = getValueIfExists(
    () => customMessage,
    {}
  );
  /**
   * @property {Object} modalTitle Stores the title to display in the modal
   */
  const modalTitle = titleMessage || (
    <FormattedMessage
      {...savedAlert.titleSuccess}
      data-testid="content-modalTitle"
    >
      {(title) => <Typography variant="caption">{title}</Typography>}
    </FormattedMessage>
  );

  const modalMessage = bodyMessage || (
    <FormattedMessage {...savedAlert.bodySuccess}>
      {(body) => <Typography>{body}</Typography>}
    </FormattedMessage>
  );

  return (
    <ModalComponent
      data-testid="content-discardBusbandModal"
      open={openModal}
      onBackdropClick={continueDialog}
      title={modalTitle}
    >
      {modalMessage}
      <div>
        <ButtonComponent
          className={classStyle.cancelButton}
          type="button"
          onClick={continueDialog}
          data-testid="content-modalOKButton"
        >
          <FormattedMessage {...savedAlert.continueButton}>
            {(continueButton) => <Typography>{continueButton}</Typography>}
          </FormattedMessage>
        </ButtonComponent>
      </div>
    </ModalComponent>
  );
};

SavedModal.propTypes = {
  openModal: PropTypes.bool,
  continueDialog: PropTypes.func,
  customMessage: PropTypes.object,
};

export default SavedModal;
