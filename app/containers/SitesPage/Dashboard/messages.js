/*
 * SitesStatusListPanel Messages
 * This contains all the text for the SitesStatusListPanel component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.SitesStatusListPanel';

export default defineMessages({
  noRecords: {
    id: `${scope}.noRecords`,
    defaultMessage: 'You have no sites currently assigned',
  },
  noRecordsSearch: {
    id: `${scope}.noRecords`,
    defaultMessage: 'There are no sites under this search criteria',
  },
  showEmulatedSites: {
    id: `${scope}.showEmulatedSites`,
    defaultMessage: 'Show Emulated Sites',
  },
  showEmulatedOn: {
    id: `${scope}.showEmulatedOn`,
    defaultMessage: 'Yes',
  },
  showEmulatedOff: {
    id: `${scope}.showEmulatedOff`,
    defaultMessage: 'No',
  },
});
