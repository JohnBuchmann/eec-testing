/*
 * UserInfoPanel
 *
 * This is the component for User Information
 *
 */
import { Box, makeStyles, Typography } from '@material-ui/core';
import FieldCustomEdit from 'Components/FieldCustomEdit';
import Panel from 'Components/Panel';
import Button from 'Components/Button';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  updateUserOktaProfileData,
  setUpdateOktaProfileFail,
  cleanUserOktaPasswordMessages,
} from 'Store/User/actions';
import { formatPhoneNumber } from 'Utils/enums/regularExpressions';
import { getValueIfExists } from 'Utils/propertyValidation';
import { isFaithAccount, getRoleNamesByRolesAccess } from 'Utils/roles';
import InputComponent from 'Components/Input';
import { iconAlignmentType } from 'Components/Input/enum';
import ToolTipText from 'Components/ToolTipText';
import messages from './messages';
import { UserProfileErrorModal } from './modals/userProfileErrorModal';

const useStyles = makeStyles({
  row: {
    marginBottom: '44px',
  },
  title: {
    fontWeight: '600',
  },
  spaceTop: {
    marginTop: '16px',
  },
  updatePhoneSection: {
    display: 'flex',
  },
  rowPassword: {
    display: 'flex',
  },
  inputPassword: {
    width: '50%',
  },
  labelPassword: {
    width: '50%',
    lineHeight: '40px',
  },
  passwordTitle: {
    position: 'relative',
    marginBottom: '45px',
  },
  passwordField: {
    display: 'flex',
    '& input': {
      height: '20px',
    },
  },
  floatRight: {
    float: 'right',
  },
  capitalize: {
    textTransform: 'uppercase',
  },
  containerSavePasswordButton: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  savePasswordButton: {
    width: '160px',
    height: '40px',
    objectFit: 'contain',
    border: `1px solid ${Colors.mountainMeadow}`,
    textDecoration: 'none',
    marginLeft: '24px',
    '&:disabled': {
      color: `${Colors.silverSand} !important
      `,
      border: `1px solid ${Colors.silverSand} !important`,
    },
  },
});

/**
 * UserInfoPanel creates a panel to display
 * and edit user information stored by OKTA
 */
const UserInfoPanel = (props) => {
  const {
    user,
    role,
    updateOktaProfileDispatch,
    passwordChanged,
    cleanUserOktaPasswordMessagesFn,
  } = props;
  const { user: userDetails } = user;
  const classes = useStyles();
  const userInfoMessages = messages.userInfo;
  const inputPasswordType = 'password';
  const inputTextType = 'text';
  const eyeVisibilityIcon = 'eyeVisibility';
  const eyeVisibilityOff = 'eyeVisibilityOff';
  const position = 'right';
  const defaultPasswords = {
    current: {
      value: '',
      name: 'current',
      invalid: false,
      helperText: '',
      visible: false,
      type: inputPasswordType,
      icon: eyeVisibilityIcon,
      iconAlignment: iconAlignmentType.right,
    },
    new: {
      value: '',
      name: 'new',
      invalid: false,
      helperText: '',
      visible: false,
      type: inputPasswordType,
      icon: eyeVisibilityIcon,
      iconAlignment: iconAlignmentType.right,
    },
    confirm: {
      value: '',
      name: 'confirm',
      invalid: false,
      helperText: '',
      visible: false,
      type: inputPasswordType,
      icon: eyeVisibilityIcon,
      iconAlignment: iconAlignmentType.right,
    },
  };
  const { formatMessage } = props.intl;
  const [openModal, setOpenModal] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState(null);
  const [editState, setEditState] = React.useState(false);
  const [passwordFields, setPasswordFields] = React.useState(defaultPasswords);
  const [passwordSave, setPasswordSave] = React.useState(true);
  const maxPasswordLength = 20;
  const dummyPassword = '***********';
  const inputTypePhone = 'tel';
  const { mobilePhone } = userDetails;
  const { user: userInfo } = user;
  const userRoles = getValueIfExists(() => userInfo.roles, []);
  const userEmail = getValueIfExists(() => userInfo.email, '');

  const clearInvalidIndicatorPasswordFields = () => {
    // Clear all invalid indicators
    Object.keys(passwordFields).forEach((key) => {
      setPasswordFields((prevState) => ({
        ...prevState,
        [`${key}`]: { ...passwordFields[`${key}`], invalid: false },
      }));
    });
  };

  /**
   * @method updatePassword
   * Update the users password and send the request to okta through webServices.
   * @return {void}
   */
  const updatePassword = () => {
    const {
      current: currentPassword,
      new: newPassword,
      confirm: confirmPassword,
    } = passwordFields;

    clearInvalidIndicatorPasswordFields();

    if (newPassword.value !== confirmPassword.value) {
      setPasswordFields((prevState) => ({
        ...prevState,
        confirm: {
          ...prevState.confirm,
          invalid: true,
          value: '',
          helperText: formatMessage(
            userInfoMessages.confirmPasswordErrorMessage
          ),
        },
      }));
    } else {
      const userData = {
        credentials: {
          password: {
            oldPassword: { value: currentPassword.value },
            newPassword: { value: newPassword.value },
          },
        },
      };
      updateOktaProfileDispatch(userData);
    }
  };

  /**
   * @method updateMobilePhone
   * Update the user's mobile phone and send the request to okta through webServices.
   * @param data The data to update from user profile.
   * @return {void}
   */
  const updateMobilePhone = (data) => {
    const phone = getValueIfExists(() => data.workingText, null);
    if (phone) {
      const userData = {
        profile: {
          mobilePhone: phone,
        },
        credentials: {
          password: {},
        },
      };
      updateOktaProfileDispatch(userData);
    }
  };

  /**
   * @method closeUserProfileErrorModal
   * Closes the error message modal.
   * @return {void}
   */
  const closeUserProfileErrorModal = () => {
    setDialogContent({});
    setOpenModal(false);
  };

  const getPhoneNumberFormatted = getValueIfExists(
    () => formatPhoneNumber(mobilePhone),
    ''
  );

  const hideFaithRestrictions = !isFaithAccount(userInfo);

  /**
   * updateEditState
   * Handle update state from editSate property
   * @returns {void}
   */
  const updateEditState = () => setEditState((prevState) => !prevState);

  /**
   * @method passwordChange
   * Handle password change event on textField and save the state on passwordFields
   * @param {object} event receives event object
   */
  const passwordChange = (event) => {
    const { value, name } = event.target;
    const isValidLength = value.length <= maxPasswordLength;
    setPasswordFields((prevState) => ({
      ...prevState,
      [`${name}`]: {
        ...prevState[`${name}`],
        value: isValidLength ? value : prevState[`${name}`].value,
        helperText: '',
      },
    }));
  };

  /**
   * @method onEveVisibilityIconClick
   * Handle click on input text icon to hide/show password text
   * @param {string} input text name
   */
  const onEveVisibilityIconClick = (passwordFieldName) => {
    const passwordSettings = passwordFields[`${passwordFieldName}`];

    if (passwordSettings) {
      const newPasswordFieldSettings = { ...passwordSettings };

      if (newPasswordFieldSettings.visible) {
        newPasswordFieldSettings.visible = false;
        newPasswordFieldSettings.icon = eyeVisibilityIcon;
        newPasswordFieldSettings.type = inputPasswordType;
      } else {
        newPasswordFieldSettings.visible = true;
        newPasswordFieldSettings.icon = eyeVisibilityOff;
        newPasswordFieldSettings.type = inputTextType;
      }

      setPasswordFields((prevState) => ({
        ...prevState,
        [`${passwordFieldName}`]: newPasswordFieldSettings,
      }));
    }
  };

  /**
   * @method cleanPasswordFields
   * Handle to clean to first state on passwordSave, editSate and passwordField
   */
  const cleanPasswordFields = () => {
    setPasswordFields(defaultPasswords);
    setEditState(false);
    setPasswordSave(true);
  };

  /**
   * @method displayPasswordErrorMessages
   * Handle display password error messages and validate if is an old password message or
   * new password for update the passwordFields states
   * @param {string} message receives error message to display
   */
  const displayPasswordErrorMessages = (message) => {
    const isOldPassword = message.toLowerCase().includes('old');
    if (isOldPassword) {
      setPasswordFields((prevState) => ({
        ...prevState,
        current: {
          ...prevState.current,
          value: '',
          invalid: true,
          helperText: formatMessage(userInfoMessages.oldPasswordErrorMessage),
        },
      }));
    } else {
      setPasswordFields((prevState) => ({
        ...prevState,
        new: {
          ...prevState.new,
          value: '',
          invalid: true,
          helperText: message,
        },
        confirm: {
          ...prevState.confirm,
          value: '',
          invalid: true,
          helperText: '',
        },
      }));
    }
  };

  /**
   * @method displayErrorMessages
   * Handle display error messages for password fields and mobile phone
   * @param {object} details receives userDetails state from redux
   */
  const displayErrorMessages = (details) => {
    const oktaError = getValueIfExists(() => details.oktaErrorMessage, null);

    if (oktaError) {
      const passwordType = 'password';
      const mobilePhoneType = 'mobilePhone';
      const oktaMessageType = getValueIfExists(() => oktaError.type, null);
      const oktaMessage = getValueIfExists(() => oktaError.message, null);

      if (oktaMessageType === passwordType) {
        displayPasswordErrorMessages(oktaMessage);
      }

      if (oktaMessageType === mobilePhoneType) {
        const content = {
          title: formatMessage(userInfoMessages.mobilePhoneErrorMessageTitle),
          content: oktaMessage,
        };
        setDialogContent(content);
        setOpenModal(true);
      }
    }
  };
  // Save and Cancel buttons for change password
  const saveAndCancelButtons = (
    <Box
      className={classes.containerSavePasswordButton}
      data-testid="content-cancelSaveSiteSettingsDataContainer"
    >
      <div>
        <Button
          onClick={cleanPasswordFields}
          data-testid="content-cancelPasswordButton"
          className={classes.cancelSiteSettingsButton}
        >
          <Typography>
            {formatMessage(messages.userInfo.cancelButton)}
          </Typography>
        </Button>
        <Button
          disabled={passwordSave}
          data-testid="content-savePasswordButton"
          className={`${classes.savePasswordButton} ${classes.capitalize}`}
          onClick={updatePassword}
        >
          <Typography>{formatMessage(messages.userInfo.saveButton)}</Typography>
        </Button>
      </div>
    </Box>
  );
  // Create edit password button
  const editPassword = (
    <div className={classes.spaceTop}>
      <label>{dummyPassword}</label>
      <Button
        onClick={updateEditState}
        className={classes.floatRight}
        data-testid="content-editPasswordButton"
      >
        <FormattedMessage {...messages.buttonEdit} />
      </Button>
    </div>
  );
  /**
   * Role list names and separated roles by comma and output HTML
   */
  // eslint-disable-next-line
  const rolesListHtml = { __html: getRoleNamesByRolesAccess(userRoles, role) };
  // Creates user info content
  const contentBody = (
    <>
      <div className={classes.row}>
        <div className={classes.passwordTitle}>
          <FormattedMessage {...userInfoMessages.userRolesLabel}>
            {(userRolesLabel) => (
              <Typography variant="subtitle2" className={classes.title}>
                {userRolesLabel}
              </Typography>
            )}
          </FormattedMessage>
          <div
            className={classes.spaceTop}
            dangerouslySetInnerHTML={rolesListHtml}
          />
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.passwordTitle}>
          <FormattedMessage {...userInfoMessages.emailAddressLabel}>
            {(emailAddressLabel) => (
              <Typography variant="subtitle2" className={classes.title}>
                {emailAddressLabel}
              </Typography>
            )}
          </FormattedMessage>
          <div className={classes.spaceTop}>{userEmail}</div>
        </div>
      </div>
      {hideFaithRestrictions && (
        <div className={classes.row}>
          <div className={classes.passwordTitle}>
            <FormattedMessage {...userInfoMessages.changePasswordLabel}>
              {(changePasswordLabel) => (
                <Typography variant="subtitle2" className={classes.title}>
                  {changePasswordLabel}
                </Typography>
              )}
            </FormattedMessage>
            {!editState ? editPassword : saveAndCancelButtons}
          </div>
          {editState && (
            <div>
              <div className={`${classes.spaceTop} ${classes.passwordField}`}>
                <label className={classes.labelPassword}>
                  {formatMessage(messages.userInfo.oldPasswordPlaceholder)}
                </label>
                <div
                  id="inputCurrentPassword"
                  className={classes.inputPassword}
                >
                  <InputComponent
                    data-testid="content-inputOldPassword"
                    name={defaultPasswords.current.name}
                    onChange={passwordChange}
                    value={passwordFields.current.value}
                    invalid={passwordFields.current.invalid}
                    helperText={passwordFields.current.helperText}
                    type={passwordFields.current.type}
                    icon={passwordFields.current.icon}
                    iconAlignment={passwordFields.current.iconAlignment}
                    iconClick={() =>
                      onEveVisibilityIconClick(defaultPasswords.current.name)
                    }
                  />
                </div>
              </div>
              <div className={`${classes.spaceTop} ${classes.passwordField}`}>
                <label className={classes.labelPassword}>
                  {formatMessage(messages.userInfo.newPasswordPlaceholder)}
                </label>
                <div id="inputNewPassword" className={classes.inputPassword}>
                  <InputComponent
                    data-testid="content-inputNewPassword"
                    name={defaultPasswords.new.name}
                    onChange={passwordChange}
                    value={passwordFields.new.value}
                    invalid={passwordFields.new.invalid}
                    helperText={passwordFields.new.helperText}
                    type={passwordFields.new.type}
                    icon={passwordFields.new.icon}
                    iconAlignment={passwordFields.new.iconAlignment}
                    iconClick={() =>
                      onEveVisibilityIconClick(defaultPasswords.new.name)
                    }
                  />
                </div>
              </div>
              <div className={`${classes.spaceTop} ${classes.passwordField}`}>
                <label className={classes.labelPassword}>
                  {formatMessage(
                    messages.userInfo.confirmNewPasswordPlaceholder
                  )}
                </label>
                <div
                  id="inputConfirmPassword"
                  className={classes.inputPassword}
                >
                  <InputComponent
                    data-testid="content-inputConfirmPassword"
                    name={defaultPasswords.confirm.name}
                    onChange={passwordChange}
                    value={passwordFields.confirm.value}
                    invalid={passwordFields.confirm.invalid}
                    helperText={passwordFields.confirm.helperText}
                    type={passwordFields.confirm.type}
                    icon={passwordFields.confirm.icon}
                    iconAlignment={passwordFields.confirm.iconAlignment}
                    iconClick={() =>
                      onEveVisibilityIconClick(defaultPasswords.confirm.name)
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        <div className={classes.updatePhoneSection}>
          {hideFaithRestrictions && (
            <FormattedMessage {...userInfoMessages.updatePhoneNumberLabel}>
              {(updatePhoneNumberLabel) => (
                <Typography variant="subtitle2" className={classes.title}>
                  {updatePhoneNumberLabel}
                </Typography>
              )}
            </FormattedMessage>
          )}
          {!hideFaithRestrictions && (
            <>
              <FormattedMessage
                {...userInfoMessages.faithUpdatePhoneNumberLabel}
              >
                {(faithUpdatePhoneNumberLabel) => (
                  <Typography variant="subtitle2" className={classes.title}>
                    {faithUpdatePhoneNumberLabel}
                  </Typography>
                )}
              </FormattedMessage>
              <FormattedMessage {...userInfoMessages.faithUserPhoneMessage}>
                {(faithUserPhoneMessage) => (
                  <ToolTipText
                    title={faithUserPhoneMessage}
                    placement={position}
                  />
                )}
              </FormattedMessage>
            </>
          )}
        </div>

        <div className={classes.spaceTop}>
          <FieldCustomEdit
            data-testid="content-inputEditMobilePhone"
            showEditButton={hideFaithRestrictions}
            type={inputTypePhone}
            labelValueText={getPhoneNumberFormatted}
            onEditionSave={updateMobilePhone}
          />
        </div>
      </div>
    </>
  );

  React.useEffect(() => {
    displayErrorMessages(userDetails);
  }, [userDetails]);

  React.useEffect(() => {
    const enableSaveButton =
      Object.values(passwordFields).filter((pass) => pass.value.length)
        .length === Object.values(passwordFields).length;
    setPasswordSave(!enableSaveButton);
  }, [passwordFields]);

  React.useEffect(() => {
    if (passwordChanged) {
      cleanPasswordFields();
      cleanUserOktaPasswordMessagesFn();
    }
  }, [passwordChanged]);

  return (
    <>
      <FormattedMessage {...userInfoMessages.title}>
        {(title) => <Panel title={title} content={contentBody} />}
      </FormattedMessage>
      {openModal && (
        <UserProfileErrorModal
          data-testid="content-userProfileErrorModal"
          isOpen={openModal}
          modalContent={dialogContent}
          closeUserProfileErrorModal={closeUserProfileErrorModal}
        />
      )}
    </>
  );
};

UserInfoPanel.propTypes = {
  user: PropTypes.object,
  role: PropTypes.string,
  updateOktaProfileDispatch: PropTypes.func,
  intl: PropTypes.any.isRequired,
  displayErrorPassword: PropTypes.func,
  passwordChanged: PropTypes.bool,
  cleanUserOktaPasswordMessagesFn: PropTypes.func,
};
/**
 * mapStateToProps
 * @param {Object} user receives user reducer from redux
 * @param {Object} roleUser receives user.permissions.role reducer from redux
 * @param {Object} passwordChanged receives user.user.oktaSuccessPassword reducer from redux
 */
const mapStateToProps = (state) => ({
  user: state.user,
  role: state.user.user.role,
  passwordChanged: state.user.user.oktaSuccessPassword,
});

const mapDispatchToProps = (dispatch) => ({
  updateOktaProfileDispatch: (userData) =>
    dispatch(updateUserOktaProfileData(userData)),
  displayErrorPassword: (error) => dispatch(setUpdateOktaProfileFail(error)),
  cleanUserOktaPasswordMessagesFn: () =>
    dispatch(cleanUserOktaPasswordMessages()),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserInfoPanel)
);
/* eslint-enable */
