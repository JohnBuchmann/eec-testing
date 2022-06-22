/*
 * Logout Messages
 *
 * This contains all the text for the Logout component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.Layout.LogoutModal';

export default defineMessages({
  logoutModal: {
    title: {
      id: `${scope}.logoutModalTitle`,
      defaultMessage: 'Logout?',
    },
    body: {
      id: `${scope}.logoutModalBody`,
      defaultMessage: 'Are you sure you want to logout?',
    },
    submitButton: {
      id: `${scope}.logoutModalOkButton`,
      defaultMessage: 'Yes',
    },
    cancelButton: {
      id: `${scope}.logoutModalCancelButton`,
      defaultMessage: 'No',
    },
  },
});
