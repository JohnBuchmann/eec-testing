/*
 * System diagram auto sync dc bus messages
 *
 * This contains all the text for the auto sync dc bus.
 */
import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.SitesPage.SiteDetails.Overview.DiagramElements.ConnectionStatus';

export default defineMessages({
  online: {
    id: `${scope}.online`,
    defaultMessage: 'Online',
  },
  onlineLandline: {
    id: `${scope}.onlineLandline`,
    defaultMessage: 'Online Landline',
  },
  onlineCellular: {
    id: `${scope}.onlineCellular`,
    defaultMessage: 'Online Cellular',
  },
  disconnected: {
    id: `${scope}.disconnected`,
    defaultMessage: 'Disconnected',
  },
  unknown: {
    id: `${scope}.unknown`,
    defaultMessage: 'Unknown',
  },
});
