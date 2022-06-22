/*
 * SiteAdmin Messages
 *
 * This contains all the text for the SiteAdmin container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SitesPage.SiteDetails.SiteAdmin';

export default defineMessages({
  sitePermissions: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Site Permissions',
    },
    addUserButtonLabel: {
      id: `${scope}.addUserButtonLabel`,
      defaultMessage: 'Add User',
    },
  },
  SiteSettingsAndAuthentication: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Site settings & authentication',
    },
    selectTimeZoneLabel: {
      id: `${scope}.selectTimeZoneLabel`,
      defaultMessage: 'Select Time Zone',
    },
    selectSiteTypeLabel: {
      id: `${scope}.selectSiteType`,
      defaultMessage: 'Select Site Type',
    },
    edgeDataTimeout: {
      id: `${scope}.edgeDataTimeout`,
      defaultMessage: 'Edge Data Timeout',
    },
    edgeDataMin: {
      id: `${scope}.edgeDataMin`,
      defaultMessage: 'Min',
    },
    invalidTimeoutValueTitle: {
      id: `${scope}.invalidTimeoutValueTitle`,
      defaultMessage: 'Invalid Timeout Value',
    },
    invalidTimeoutValueBody: {
      id: `${scope}.invalidTimeoutValueBody`,
      defaultMessage:
        'You may only enter a value between 1 minute and 60 minutes. Please try again.',
    },
    invalidTimeoutValueCancelButton: {
      id: `${scope}.invalidTimeoutValueCancelButton`,
      defaultMessage: 'OK',
    },
    siteUsernameAndPasswordLabel: {
      id: `${scope}.siteUsernameAndPassword`,
      defaultMessage: 'Site Username & Password',
    },
    siteUsernameAndPasswordInstructionsLabel: {
      id: `${scope}.siteUsernameAndPasswordInstructions`,
      defaultMessage:
        'The PLC authenticates with the DCentrIQ application using a Username and Password. If a user creates a new Username/Password combination, it needs to be manually uploaded to the PLC. If the new credentials are not added to the PLC, the MQTT broker will reject the next connection attempt and the Site will appear offline. Each "Generate a New Username/Password" combination is a 1-time use request.',
    },
    generateNewUsernamePassword: {
      id: `${scope}.generateNewUsernamePasswordButton`,
      defaultMessage: 'Generate New Username/Password',
    },
    userName: {
      id: `${scope}.username`,
      defaultMessage: 'Username:',
    },
    password: {
      id: `${scope}.password`,
      defaultMessage: 'Password:',
    },
    showPassword: {
      id: `${scope}.showPassword`,
      defaultMessage: 'Show Password',
    },
    hidePassword: {
      id: `${scope}.hidePassword`,
      defaultMessage: 'Hide Password',
    },
    downloadCACertificate: {
      id: `${scope}.downloadCACertificate`,
      defaultMessage: 'Download CA Certificate',
    },
    editSettingsDataButton: {
      id: `${scope}.editSettingsDataButton`,
      defaultMessage: 'Edit',
    },
    cancelSettingsDataButton: {
      id: `${scope}.cancelSettingsDataButton`,
      defaultMessage: 'Cancel',
    },
    saveSettingsDataButton: {
      id: `${scope}.saveSettingsDataButton`,
      defaultMessage: 'Save',
    },
    cradlePointLabel: {
      id: `${scope}.cradlePointLabel`,
      defaultMessage: 'Cradlepoint Router ID',
    },
  },
  SiteSettingsModal: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Update Site Settings',
    },
    body: {
      id: `${scope}.body`,
      defaultMessage:
        'Are you sure you want to update the Site Settings? Changes cannot be undone.',
    },
    submitButton: {
      id: `${scope}.submitButton`,
      defaultMessage: 'Save',
    },
    cancelButton: {
      id: `${scope}.cancelButton`,
      defaultMessage: 'Cancel',
    },
  },
  tariffStructure: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Tariff Structure',
    },
    editTariffDataButton: {
      id: `${scope}.editTariffDataLabel`,
      defaultMessage: 'Edit',
    },
    cancelTariffDataButton: {
      id: `${scope}.cancelTariffDataLabel`,
      defaultMessage: 'Cancel',
    },
    saveTariffDataButton: {
      id: `${scope}.saveTariffDataLabel`,
      defaultMessage: 'Save',
    },
    gasutilityLabel: {
      id: `${scope}.utilityLabelValue`,
      defaultMessage: 'Gas Utility',
    },
    gastariffStructureLabel: {
      id: `${scope}.tariffStructureLabelValue`,
      defaultMessage: 'Gas Tariff',
    },
    electricutilityLabel: {
      id: `${scope}.utilityLabelValue`,
      defaultMessage: 'Electric Utility',
    },
    electrictariffStructureLabel: {
      id: `${scope}.tariffStructureLabelValue`,
      defaultMessage: 'Electric Tariff',
    },
  },
  tariffUpdateModal: {
    title: {
      id: `${scope}.tariffUpdateModalTitle`,
      defaultMessage: 'Update Tariff Information',
    },
    body: {
      id: `${scope}.tariffUpdateModalBody`,
      defaultMessage:
        'Are you sure you want to update the Tariff Information? Changes cannot be undone.',
    },
    submitButton: {
      id: `${scope}.tariffUpdateModalOkButton`,
      defaultMessage: 'Save',
    },
    cancelButton: {
      id: `${scope}.tariffUpdateModalCancelButton`,
      defaultMessage: 'Cancel',
    },
  },
  searchModal: {
    addButtonLabel: {
      id: `${scope}.okButton`,
      defaultMessage: 'Add',
    },
    cancelButtonLabel: {
      id: `${scope}.cancelButton`,
      defaultMessage: 'Cancel',
    },
    searchUser: {
      id: `${scope}.searchUser`,
      defaultMessage: 'Search User',
    },
  },
  deleteModal: {
    title: {
      id: `${scope}.deleteModalTitle`,
      defaultMessage: 'Delete User?',
    },
    body: {
      id: `${scope}.deleteModalBody`,
      defaultMessage:
        "Are you sure you want to delete this user's permissions to view this site?",
    },
    deleteButtonLabel: {
      id: `${scope}.okButton`,
      defaultMessage: 'Delete User',
    },
    cancelButtonLabel: {
      id: `${scope}.cancelButton`,
      defaultMessage: 'Cancel',
    },
  },
  generateUsernamePasswordModal: {
    titleOne: {
      id: `${scope}.usernamePasswordModalTitleOne`,
      defaultMessage: 'Generate Username/Password Confirmation',
    },
    titleTwo: {
      id: `${scope}.usernamePasswordModalTitleTwo`,
      defaultMessage: 'PLC Credentials',
    },
    bodyOne: {
      id: `${scope}.usernamePasswordModalBodyOne`,
      defaultMessage:
        'If you generate a new Username/Password combination and do not update the credentials in the PLC, could result in a disconnection of the Site to the DCentrIQ application. Are you sure you want to continue?',
    },
    bodyTwo: {
      id: `${scope}.usernamePasswordModalBodyTwo`,
      defaultMessage:
        'The PLC Credentials are only shown once and are highly confidential. Please store them in a safe location.',
    },
    generateNewButtonLabel: {
      id: `${scope}.generateNewButton`,
      defaultMessage: 'Generate New Credentials',
    },
    userName: {
      id: `${scope}.username`,
      defaultMessage: 'Username:',
    },
    password: {
      id: `${scope}.password`,
      defaultMessage: 'Password:',
    },
    okButtonLabel: {
      id: `${scope}.okButton`,
      defaultMessage: 'OK',
    },
    cancelButtonLabel: {
      id: `${scope}.cancelButton`,
      defaultMessage: 'Cancel',
    },
  },
});
