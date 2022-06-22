/*
 * SettingsPage Messages
 *
 * This contains all the text for the SettingsPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SettingsPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SettingsPage container!',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Settings',
  },
  placeholders: {
    id: `${scope}.placeholders`,
    defaultMessage: 'NO USER SETTINGS AVAILABLE',
  },
  localizationSettings: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'LOCALIZATION SETTINGS',
    },
    unitOfMeasurement: {
      id: `${scope}.unitOfMeasurement`,
      defaultMessage: 'Unit of Measurement',
    },
  },
  buttonEdit: {
    id: `${scope}.buttonEdit`,
    defaultMessage: 'Edit',
  },
  notificationPreferences: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'NOTIFICATION PREFERENCES',
    },
    emailLabel: {
      id: `${scope}.emailLabel`,
      defaultMessage: 'Email',
    },
    smsLabel: {
      id: `${scope}.smsLabel`,
      defaultMessage: 'SMS',
    },
  },
  userInfo: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'USER INFO',
    },
    changePasswordLabel: {
      id: `${scope}.changePasswordLabel`,
      defaultMessage: 'CHANGE PASSWORD',
    },
    emailAddressLabel: {
      id: `${scope}.emailAddressLabel`,
      defaultMessage: 'EMAIL ADDRESS',
    },
    userRolesLabel: {
      id: `${scope}.userRolesLabel`,
      defaultMessage: 'USER ROLE(S)',
    },
    updatePhoneNumberLabel: {
      id: `${scope}.updatePhoneNumberLabel`,
      defaultMessage: 'UPDATE PHONE NUMBER',
    },
    passwordErrorMessageTitle: {
      id: `${scope}.passwordErrorMessageTitle`,
      defaultMessage: 'New Password Does Not Conform to Policy',
    },
    mobilePhoneErrorMessageTitle: {
      id: `${scope}.mobilePhoneErrorMessageTitle`,
      defaultMessage: 'There was an error updating your phone number',
    },
    submitModalButton: {
      id: `${scope}.submitModalButton`,
      defaultMessage: 'OK',
    },
    faithUpdatePhoneNumberLabel: {
      id: `${scope}.faithUpdatePhoneNumberLabel`,
      defaultMessage: 'Mobile Phone Number',
    },
    faithUserPhoneMessage: {
      id: `${scope}.faithUserPhoneMessage`,
      defaultMessage:
        'Note: Mobile Phone Number is consumed from the Faith/EnTech directory. If you need to update this number, please update it using the standard procedures.',
    },
    cancelButton: {
      id: `${scope}.cancelButton`,
      defaultMessage: 'Cancel',
    },
    saveButton: {
      id: `${scope}.saveButton`,
      defaultMessage: 'Save',
    },
    oldPasswordPlaceholder: {
      id: `${scope}.oldPasswordPlaceholder`,
      defaultMessage: 'Old Password',
    },
    newPasswordPlaceholder: {
      id: `${scope}.newPasswordPlaceholder`,
      defaultMessage: 'New Password',
    },
    confirmNewPasswordPlaceholder: {
      id: `${scope}.confirmNewPasswordPlaceholder`,
      defaultMessage: 'Confirm New Password',
    },
    confirmPasswordErrorMessage: {
      id: `${scope}.confirmPasswordErrorMessage`,
      defaultMessage:
        'Your Password Confirmation did not match. Please try again.',
    },
    oldPasswordErrorMessage: {
      id: `${scope}.oldPasswordErrorMessage`,
      defaultMessage:
        'Old Password does not match our records. Please try again.',
    },
  },
});
