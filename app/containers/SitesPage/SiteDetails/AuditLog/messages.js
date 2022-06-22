/*
 * Sites details page messages
 *
 * This contains all the text for the SitesPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SitesDetailsPage.AuditLog';

export default defineMessages({
  auditLogHeader: {
    id: `${scope}.audit_log.header`,
    defaultMessage: 'AUDIT LOG',
  },
  searchBarPlaceholder: {
    id: `${scope}.search_bar.placeholder`,
    defaultMessage: 'Search',
  },
  dcentriqSourceLabel: {
    id: `${scope}.dcentriq_source.label`,
    defaultMessage: 'DCentrIQ: ',
  },
  changeBySourceLabel: {
    id: `${scope}.change_by_source.label`,
    defaultMessage: 'Changed By: ',
  },
  viewOlderLink: {
    id: `${scope}.view_older.link`,
    defaultMessage: 'View Older',
  },
  noResultsToDisplay: {
    id: `${scope}.no_results_to_display`,
    defaultMessage: 'There are no audit logs to display for this site.',
  },
});
