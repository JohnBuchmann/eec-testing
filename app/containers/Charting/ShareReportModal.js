import React from 'react';
import {
  makeStyles,
  Typography,
  Box,
  Chip,
  TextField,
} from '@material-ui/core';
import Button from 'Components/Button';
import InputComponent from 'Components/Input';
import ModalComponent from 'Components/Modal';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';
import { getValueIfExists } from 'Utils/propertyValidation';
import { useForm } from 'Utils/hooks/useForm';
import { validateEmail } from 'Utils/enums/regularExpressions';
import messages from './messages';

// CSS Definition for the modal component
const useStyles = makeStyles({
  shareReportTitle: {
    fontSize: '20px',
    fontWeight: '600',
  },
  cancelButton: {
    marginRight: '45px',
    '& .MuiTypography-body1': {
      fontSize: '14px',
    },
  },
  addNewButton: {
    marginRight: '45px',
    fontSize: '14px',
    marginTop: '10px',
  },
  submitButton: {
    '& .MuiTypography-body1': {
      fontSize: '14px',
    },

    '& .MuiButton-contained.Mui-disabled': {
      backgroundColor: `${Colors.rgbaGray12} !important`,
    },
  },
  emailInputLabelText: {
    fontSize: '14px',
    marginBottom: '6px',
    color: `1px solid ${Colors.lunarGreen}`,
  },
  emailInputWrapper: {
    marginTop: '10px',
  },
  emailFieldWrapper: {
    marginBottom: '10px',
  },
  label: {
    marginBottom: '2px',
  },
  instructionsWrapper: {
    marginBottom: '36px',
  },
  inputWrapper: {
    alignItems: 'center',
    border: `1px solid ${Colors.mercury}`,
    backgroundColor: Colors.athensGray,
    borderRadius: '4px',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    marginBottom: '30px',
    padding: '1px',

    '&:hover': {
      borderColor: Colors.primaryLight,
    },
    '&.focused': {
      borderColor: Colors.primaryLight,
      boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
    },
    '& input': {
      backgroundColor: Colors.athensGray,
      fontSize: '14px',
      height: '30px',
      boxSizing: 'border-box',
      padding: '4px 6px',
      width: '0',
      minWidth: '30px',
      flexGrow: '1',
      border: '0',
      margin: '0',
      outline: '0',
    },
  },
  emailWrapper: {
    flexShrink: 0,
    flexGrow: 1,
    '& .MuiInputBase-root': {
      backgroundColor: Colors.athensGray,
    },
  },
  inputEmail: {
    border: 'none',
  },
});

/**
 * @method ShareReportModal
 * The ShareReportModal allows users to generate a pdf of the currently displayed
 * reports
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
export const ShareReportModal = (props) => {
  const classStyle = useStyles();
  const { shareReport: shareReportMessages } = messages;
  const [userList, setUserList] = React.useState([]);
  const { values: formValues, handleInputChange, setValue } = useForm({
    email: '',
    emailMessage: '',
  });
  const { email, emailMessage } = formValues;

  const {
    closeShareReportDialog,
    generateSharedPdf,
    openModal,
    showLoading,
  } = props;
  const emailInputAutoFocus = true;

  const messageInputMultiline = true;
  const messageInputRows = 6;
  const messageInputPlaceholder = 'Enter Message';
  const emailInputProps = {
    form: {
      autocomplete: 'off',
    },
    classes: { notchedOutline: classStyle.inputEmail },
  };
  const isGenerateButtonDisabled = () => userList.length === 0;

  /**
   * @method addUser
   * Add a user if not email has been added
   * @property {Object} user
   */
  const addUser = (newUser) => {
    if (userList.findIndex((user) => user.email === newUser.email) < 0) {
      setUserList((previousList) => [...previousList, newUser]);
    }
  };

  /**
   * @method closeModal
   * Handle event for close modal
   */
  const closeModal = () => {
    setUserList([]);
    closeShareReportDialog();
  };

  /**
   * @method handleInputEmailKeyUp
   * Handle KeyUp event for input email field
   * @property {Object} event arguments
   */
  const handleInputEmailKeyUp = (event) => {
    if (getValueIfExists(() => event.key) === 'Enter' && email) {
      const newUserEmail = { email };
      addUser(newUserEmail);
      setValue('email', '');
    }
  };

  /**
   * @method handleInputEmailOnBlur
   * Handle KeyUp event for input email field
   * @property {Object} event arguments
   */
  const handleInputEmailOnBlur = () => {
    if (email) {
      const newUserEmail = { email };
      addUser(newUserEmail);
      setValue('email', '');
    }
  };

  /**
   * @method handleDeleteEmail
   * Handle delete event for chip email component
   * @property {number} index of element to delete
   */
  const handleDeleteEmail = (index) => {
    if (index < userList.length) {
      userList.splice(index, 1);
      setUserList([...userList]);
    }
  };

  /**
   * @method handleGenerateReport
   * Handle click generate report button
   */
  const handleGenerateReport = () => {
    generateSharedPdf(userList.map((user) => user.email), emailMessage);
  };

  /**
   *  @property {Object} modalTitle Stores the title to display in the modal
   */
  const modalTitle = (
    <FormattedMessage
      {...shareReportMessages.title}
      data-testid="content-modalTitle"
    >
      {(title) => (
        <Typography className={classStyle.shareReportTitle}>{title}</Typography>
      )}
    </FormattedMessage>
  );

  const modalContent = (
    <Box key="modalContent">
      <Box className={classStyle.instructionsWrapper}>
        <FormattedMessage {...shareReportMessages.instructions}>
          {(instructions) => (
            <Typography variant="caption">{instructions}</Typography>
          )}
        </FormattedMessage>
      </Box>
      <Box>
        <Box className={classStyle.label}>
          <FormattedMessage
            className={classStyle.label}
            {...shareReportMessages.emailLabel}
          >
            {(emailLabel) => (
              <Typography variant="caption">{emailLabel}</Typography>
            )}
          </FormattedMessage>
        </Box>
        <Box className={classStyle.inputWrapper}>
          {userList.map((user, index) => (
            <Box>
              <Chip
                /* eslint-disable */
                key={`${user.email}-${index}`}
                variant="outlined"
                label={user.email}
                color={validateEmail(user.email) ? 'default' : 'secondary'}
                onDelete={() => handleDeleteEmail(index)}
              />
            </Box>
          ))}
          <Box className={classStyle.emailWrapper}>
            <TextField
              fullWidth
              type="text"
              name="email"
              variant="outlined"
              autoFocus={emailInputAutoFocus}
              multiline={false}
              onChange={handleInputChange}
              onKeyUp={handleInputEmailKeyUp}
              value={email}
              autoComplete="off"
              InputProps={emailInputProps}
              onBlur={handleInputEmailOnBlur}
            />
          </Box>
        </Box>
        <Box>
          <Box className={classStyle.label}>
            <FormattedMessage {...shareReportMessages.addMessage}>
              {(addMessage) => (
                <Typography variant="caption">{addMessage}</Typography>
              )}
            </FormattedMessage>
          </Box>
          <InputComponent
            name="emailMessage"
            onChange={handleInputChange}
            type="text"
            multiline={messageInputMultiline}
            rows={messageInputRows}
            placeholder={messageInputPlaceholder}
          />
        </Box>
      </Box>
    </Box>
  );

  /**
   * @property {Object} modalFooter Stores the modal footer to display in the modal
   */
  const modalFooter = (
    <>
      <Button
        className={classStyle.cancelButton}
        type="button"
        onClick={closeModal}
        data-testid="content-dontAcceptButtonLogout"
      >
        <FormattedMessage {...messages.cancel}>
          {(cancel) => <Typography>{cancel}</Typography>}
        </FormattedMessage>
      </Button>
      <div className={classStyle.submitButton}>
        <Button
          type="button"
          data-testid="content-generateButtonShare"
          handleRoute={handleGenerateReport}
          disabled={isGenerateButtonDisabled()}
        >
          <FormattedMessage {...messages.generate}>
            {(generate) => <Typography>{generate}</Typography>}
          </FormattedMessage>
        </Button>
      </div>
    </>
  );

  return (
    <ModalComponent
      data-testid="modal-component-ShareReportModal"
      open={openModal}
      onBackdropClick={closeModal}
      title={modalTitle}
      showLoading={showLoading}
    >
      {[modalContent, modalFooter]}
    </ModalComponent>
  );
};

ShareReportModal.propTypes = {
  closeShareReportDialog: PropTypes.func.isRequired,
  generateSharedPdf: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  showLoading: PropTypes.bool,
};

export default ShareReportModal;
