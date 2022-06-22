import { makeStyles, Typography } from '@material-ui/core';
import ButtonComponent from 'Components/Button';
import ModalComponent from 'Components/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Colors } from 'Theme';
import messages from './messages';

const useStyles = makeStyles({
  cancelButton: {
    height: '40px',
    width: '140px',
    cursor: 'pointer',
  },
  submitButton: {
    height: '40px',
    width: '150px',
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
 * @method DiscardModal
 * The DiscardModal to discard data changed from busband
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
export const DiscardModal = (props) => {
  const { continueDialog, discardDialog, openModal = false } = props;
  const classStyle = useStyles();
  const { discardAlert } = messages;

  /**
   * @property {Object} modalTitle Stores the title to display in the modal
   */
  const modalTitle = (
    <FormattedMessage {...discardAlert.title} data-testid="content-modalTitle">
      {(title) => <Typography variant="caption">{title}</Typography>}
    </FormattedMessage>
  );

  return (
    <ModalComponent
      data-testid="content-discardBusbandModal"
      open={openModal}
      onBackdropClick={continueDialog}
      title={modalTitle}
    >
      <FormattedMessage {...discardAlert.body}>
        {(body) => <Typography>{body}</Typography>}
      </FormattedMessage>
      <div>
        <ButtonComponent
          className={classStyle.cancelButton}
          type="button"
          onClick={discardDialog}
          data-testid="content-modalDiscardButton"
        >
          <FormattedMessage {...discardAlert.discardButton}>
            {(discardButton) => <Typography>{discardButton}</Typography>}
          </FormattedMessage>
        </ButtonComponent>
        <button
          type="button"
          className={classStyle.submitButton}
          onClick={continueDialog}
          data-testid="content-modalContinueButton"
        >
          <FormattedMessage {...discardAlert.continueButton}>
            {(continueButton) => <Typography>{continueButton}</Typography>}
          </FormattedMessage>
        </button>
      </div>
    </ModalComponent>
  );
};

DiscardModal.propTypes = {
  continueDialog: PropTypes.func,
  discardDialog: PropTypes.func,
  openModal: PropTypes.bool,
};

export default DiscardModal;
