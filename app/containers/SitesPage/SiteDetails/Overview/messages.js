/*
 * System diagram Messages
 *
 * This contains all the text for the system diagram container.
 */
import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.SitesPage.SiteDetails.Overview.SystemDiagram';

export default defineMessages({
  systemTitle: {
    id: `${scope}.system.title`,
    defaultMessage: 'system',
  },
  lastDataReceivedLabel: {
    id: `${scope}.last_data_received.label`,
    defaultMessage: 'Last Data Received:',
  },
});
