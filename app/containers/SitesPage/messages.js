/*
 * SitesPage Messages
 *
 * This contains all the text for the SitesPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SitesPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HomePage container!',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Sites',
  },
  overview: {
    id: `${scope}.overview`,
    defaultMessage: 'Overview',
  },
  busBand: {
    unSavedChanges: {
      title: {
        id: `${scope}.title`,
        defaultMessage: 'Unsaved Changes',
      },
      body: {
        id: `${scope}.body`,
        defaultMessage:
          'You have unsaved changes. Would you like to save these changes prior to navigating away?',
      },
      discardButton: {
        id: `${scope}.discardButton`,
        defaultMessage: 'Continue Editing',
      },
      continueButton: {
        id: `${scope}.continueButton`,
        defaultMessage: 'Discard Changes',
      },
    },
  },
});
