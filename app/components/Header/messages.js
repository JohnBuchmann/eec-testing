/*
 * Header Messages
 * This contains all the text for the Header component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.Header';

export default defineMessages({
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  searchQuick: {
    id: `${scope}.searchQuick`,
    defaultMessage: 'Search by Configuration Name',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'CREATE NEW',
  },
  assignedUserPlaceholder: {
    id: `${scope}.assignedUserPlaceholder`,
    defaultMessage: 'Assigned User',
  },
  selectCompanyPlaceholder: {
    id: `${scope}.selectCompanyPlaceholder`,
    defaultMessage: 'Select Company',
  },
  selectSitesPlaceholder: {
    id: `${scope}.selectSitesPlaceholder`,
    defaultMessage: 'Select Sites',
  },
  emulatedSubtitle: {
    id: `${scope}.emulatedSubtitle`,
    defaultMessage: 'Emulated Site',
  },
});
