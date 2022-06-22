/*
 * Device details page messages
 *
 * This contains all the text for the DeviceDetail container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DeviceDetailsPage';

export default defineMessages({
  overviewTabTitle: {
    id: `${scope}.statusTab.title`,
    defaultMessage: 'Status',
  },
  devicesTabTitle: {
    id: `${scope}.eventsTab.title`,
    defaultMessage: 'Event',
  },
  siteDetailsSiteName: {
    id: `${scope}.site_details_site_name`,
    defaultMessage: 'Site Name',
  },
  siteDetailsSiteId: {
    id: `${scope}.site_details_site_id`,
    defaultMessage: 'Site Id',
  },
  siteDetailsCompanyName: {
    id: `${scope}.site_details_site_company_name`,
    defaultMessage: 'Company Name',
  },
  cancelChanges: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Cancel Changes',
    },
    body: {
      id: `${scope}.body`,
      defaultMessage:
        'Are you sure you want to cancel? Any changes made since the last save will be lost.',
    },
    discardButton: {
      id: `${scope}.discardButton`,
      defaultMessage: 'No',
    },
    continueButton: {
      id: `${scope}.continueButton`,
      defaultMessage: 'Yes',
    },
  },
  changesSuccessful: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Device Settings Changes Saved Successfully',
    },
    body: {
      id: `${scope}.body`,
      defaultMessage:
        'Your new Device Configuration has been saved successfully.',
    },
    continueButton: {
      id: `${scope}.continueButton`,
      defaultMessage: 'OK',
    },
  },
  cannotSaveChanges: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Cannot Save Changes',
    },
    body: {
      id: `${scope}.body`,
      defaultMessage:
        'The application was unable to save your changes at the edge. Please try again.',
    },
    continueButton: {
      id: `${scope}.continueButton`,
      defaultMessage: 'OK',
    },
  },
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
      defaultMessage: 'No',
    },
    continueButton: {
      id: `${scope}.continueButton`,
      defaultMessage: 'Yes',
    },
  },
});
