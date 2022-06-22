/*
 * Opportunity Detail Messages
 * This contains all the text for the Opportunity Detail Page container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SystemOverview';

export default defineMessages({
  systemOverview: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'SYSTEM',
    },
    lastDataReceived: {
      id: `${scope}.lastDataReceived`,
      defaultMessage: 'Last Data Received:',
    },
  },
  systemInformation: {
    totalSystemOutput: {
      id: `${scope}.totalSystemOutput`,
      defaultMessage: 'Total System Output:',
    },
  },
});
