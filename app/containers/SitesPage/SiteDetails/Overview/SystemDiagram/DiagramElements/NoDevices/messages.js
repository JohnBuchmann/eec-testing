/*
 * System diagram auto sync dc bus messages
 *
 * This contains all the text for the auto sync dc bus.
 */
import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.SitesPage.SiteDetails.Overview.SystemDiagram.NoDevices';

export default defineMessages({
  noDevicesTitle: {
    id: `${scope}.noDevicesTitle`,
    defaultMessage: 'Site Configuration Unavailable',
  },
});
