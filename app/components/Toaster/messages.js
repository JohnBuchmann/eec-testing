/*
 * Toaster Messages
 * This contains all the text for Toaster
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Toaster';

/**
 * defaultMessages contains all messages for Toaster
 */
export default defineMessages({
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Information was updated successfully!',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage:
      'There was an error during the last operation, please try again or reach out an administrator.',
  },
});
