import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import images from 'Assets/images';

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
  searchUserTextfield: {
    '& #modal-description-label.Mui-focused': {
      display: 'none',
    },
    '& #modal-description-label.MuiFormLabel-filled': {
      display: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      width: '0px',
    },
  },
});

/**
 * @method AddNewUserModal
 * The AddNewUserModal to search the users that we would like to assign to the site.
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
export const AddNewUserModal = (props) => {
  const {
    newUserToAdd,
    handleAutoCompleteChange,
    submitAddnewUserDialog,
    closeAddNewUserDialog,
    openModal,
    users,
  } = props;
  const classStyle = useStyles();
  const {
    searchModal: searchModalMessages,
    sitePermissions: sitePermissionsMessages,
  } = messages;

  /**
   * @property {Object} userSearchLabel Stores the label to display in the autocomplete
   */
  const userSearchLabel = (
    <>
      <img className={classStyle.iconSearch} alt="" src={images.searchIcon} />
      <FormattedMessage
        {...searchModalMessages.searchUser}
        data-testid="content-modalTitle"
      >
        {(searchUser) => (
          <Typography variant="caption">{searchUser}</Typography>
        )}
      </FormattedMessage>
    </>
  );

  /**
   * @property {Object} modalTitle Stores the title to display in the modal
   */
  const modalTitle = (
    <FormattedMessage
      {...sitePermissionsMessages.addUserButtonLabel}
      data-testid="content-modalTitle"
    >
      {(addUserButtonLabel) => (
        <Typography variant="caption" className={classStyle.addUserButtonLabel}>
          {addUserButtonLabel}
        </Typography>
      )}
    </FormattedMessage>
  );

  return (
    users && (
      <ModalComponent
        data-testid="content-addNewUserModal"
        open={openModal}
        onBackdropClick={closeAddNewUserDialog}
        title={modalTitle}
      >
        <Autocomplete
          className={classStyle.autoCompleteBox}
          id="modal-description"
          data-testid="content-autoCompleteBox"
          options={users.map((option) => option.profile.email)}
          onChange={handleAutoCompleteChange}
          renderInput={(params) => (
            <TextField
              data-testid="content-autoCompleteBoxInput"
              className={classStyle.searchUserTextfield}
              {...params}
              label={userSearchLabel}
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps }}
            />
          )}
        />
        <div>
          <ButtonComponent
            className={classStyle.cancelButton}
            type="button"
            onClick={closeAddNewUserDialog}
            data-testid="content-modalCloseButton"
          >
            <FormattedMessage {...searchModalMessages.cancelButtonLabel}>
              {(cancelButtonLabel) => (
                <Typography>{cancelButtonLabel}</Typography>
              )}
            </FormattedMessage>
          </ButtonComponent>
          <button
            type="button"
            className={classStyle.submitButton}
            disabled={!newUserToAdd}
            onClick={submitAddnewUserDialog}
            data-testid="content-modalSubmitButton"
          >
            <FormattedMessage {...searchModalMessages.addButtonLabel}>
              {(addButtonLabel) => <Typography>{addButtonLabel}</Typography>}
            </FormattedMessage>
          </button>
        </div>
      </ModalComponent>
    )
  );
};

AddNewUserModal.propTypes = {
  newUserToAdd: PropTypes.object,
  handleAutoCompleteChange: PropTypes.func,
  submitAddnewUserDialog: PropTypes.func,
  closeAddNewUserDialog: PropTypes.func,
  openModal: PropTypes.bool,
  users: PropTypes.array,
};

export default AddNewUserModal;
