/*
 * Sites details page messages
 *
 * This contains all the re usable text.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.utils.enums';

export default defineMessages({
  maintenanceText: {
    id: `${scope}.maintenance`,
    defaultMessage: 'maintenance',
  },
  faultedText: {
    id: `${scope}.faulted`,
    defaultMessage: 'fault',
  },
  alarmText: {
    id: `${scope}.alarm`,
    defaultMessage: 'alarm',
  },
  warningText: {
    id: `${scope}.warning`,
    defaultMessage: 'warning',
  },
  okText: {
    id: `${scope}.ok`,
    defaultMessage: 'ok',
  },

  confirmationOptionsText: {
    cancel: {
      id: `${scope}.cancel`,
      defaultMessage: 'Cancel',
    },
    save: {
      id: `${scope}.save`,
      defaultMessage: 'Save',
    },

    defaultConfirmTitle: {
      id: `${scope}.defaultConfirmTitle`,
      defaultMessage: 'Update Information',
    },
    defaultConfirmBody: {
      id: `${scope}.defaultConfirmBody`,
      defaultMessage:
        'Are you sure you want to save this information? Changes cannot be undone.',
    },
  },

  editOptionsText: {
    edit: {
      id: `${scope}.edit`,
      defaultMessage: 'Edit',
    },
    change: {
      id: `${scope}.change`,
      defaultMessage: 'Change',
    },
  },
});
