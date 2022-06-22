import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import ModalComponent from 'Components/Modal';
import ButtonComponent from 'Components/Button';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';

/**
 * @property {Object} useStyles Stores the styles
 */
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
 * @method ConfirmDialogModal
 * The DiscardModal to discard data changed from busband
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
export const ConfirmDialogModal = (props) => {
  const {
    continueDialog,
    discardDialog,
    openModal = false,
    title = '',
    body = '',
    discardButton = '',
    continueButton = '',
  } = props;
  const classStyle = useStyles();

  /**
   * @property {Object} modalTitle Stores the title to display in the modal
   */
  const modalTitle = (
    <Typography variant="caption" data-testid="content-modalTitle">
      {title}
    </Typography>
  );

  return (
    <ModalComponent
      data-testid="content-confirmDialogModal"
      open={openModal}
      onBackdropClick={continueDialog}
      title={modalTitle}
    >
      <Typography data-testid="content-modalBody">{body}</Typography>
      <div>
        {discardButton && (
          <ButtonComponent
            className={classStyle.cancelButton}
            type="button"
            onClick={discardDialog}
            data-testid="content-modalDiscardButton"
          >
            <Typography>{discardButton}</Typography>
          </ButtonComponent>
        )}
        <button
          type="button"
          className={classStyle.submitButton}
          onClick={continueDialog}
          data-testid="content-modalContinueButton"
        >
          <Typography>{continueButton}</Typography>
        </button>
      </div>
    </ModalComponent>
  );
};

ConfirmDialogModal.propTypes = {
  continueDialog: PropTypes.func,
  discardDialog: PropTypes.func,
  openModal: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  discardButton: PropTypes.string,
  continueButton: PropTypes.string,
};

export default ConfirmDialogModal;
