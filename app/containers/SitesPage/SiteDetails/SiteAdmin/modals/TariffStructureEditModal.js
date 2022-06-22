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
 * @method TariffStructureEditModal
 * The TariffStructureEditModal to confirm changes in the Tariff Structure.
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
export const TariffStructureEditModal = (props) => {
  const {
    submitTariffStructureDialog,
    closeTariffStructureEditDialog,
    openModal,
  } = props;
  const classStyle = useStyles();
  const { tariffUpdateModal: tariffStructureModalMessages } = messages;

  /**
   * @property {Object} modalTitle Stores the title to display in the modal
   */
  const modalTitle = (
    <FormattedMessage
      {...tariffStructureModalMessages.title}
      data-testid="content-modalTitle"
    >
      {(title) => <Typography variant="caption">{title}</Typography>}
    </FormattedMessage>
  );

  return (
    <ModalComponent
      data-testid="content-tariffStructureEditModal"
      open={openModal}
      onBackdropClick={closeTariffStructureEditDialog}
      title={modalTitle}
    >
      <FormattedMessage {...tariffStructureModalMessages.body}>
        {(body) => <Typography>{body}</Typography>}
      </FormattedMessage>
      <div>
        <ButtonComponent
          className={classStyle.cancelButton}
          type="button"
          onClick={closeTariffStructureEditDialog}
          data-testid="content-modalDeleteCloseButton"
        >
          <FormattedMessage {...tariffStructureModalMessages.cancelButton}>
            {(cancelButton) => <Typography>{cancelButton}</Typography>}
          </FormattedMessage>
        </ButtonComponent>
        <button
          type="button"
          className={classStyle.submitButton}
          onClick={submitTariffStructureDialog}
          data-testid="content-modalTariffStructureSubmitButton"
        >
          <FormattedMessage {...tariffStructureModalMessages.submitButton}>
            {(submitButton) => <Typography>{submitButton}</Typography>}
          </FormattedMessage>
        </button>
      </div>
    </ModalComponent>
  );
};

TariffStructureEditModal.propTypes = {
  submitTariffStructureDialog: PropTypes.func,
  closeTariffStructureEditDialog: PropTypes.func,
  openModal: PropTypes.bool,
};

export default TariffStructureEditModal;
