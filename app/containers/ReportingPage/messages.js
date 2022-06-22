/*
 * ReportsPage Messages
 *
 * This contains all the text for the ReportsPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ReportingPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Reporting container!',
  },
  reportTypePlaceholder: {
    id: `${scope}.header`,
    defaultMessage: 'Select Report',
  },
  periodPlaceholder: {
    id: `${scope}.header`,
    defaultMessage: 'By Month',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Reports',
  },
  overview: {
    id: `${scope}.overview`,
    defaultMessage: 'Overview',
  },
});
