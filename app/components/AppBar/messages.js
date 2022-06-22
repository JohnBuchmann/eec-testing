/*
 * AppBar Messages
 * This contains all the text for the AppBar component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.AppBar';

export default defineMessages({
  view: {
    id: `${scope}.view`,
    defaultMessage: 'View',
  },
  dismiss: {
    id: `${scope}.dismiss`,
    defaultMessage: 'Dismiss',
  },
  dismissAll: {
    id: `${scope}.dismissAll`,
    defaultMessage: 'Dismiss All',
  },
  minutesAgo: {
    id: `${scope}.minutesAgo`,
    defaultMessage: '{value} minutes ago',
  },
  hoursAgo: {
    id: `${scope}.hoursAgo`,
    defaultMessage: '{value} hours ago',
  },
  daysAgo: {
    id: `${scope}.daysAgo`,
    defaultMessage: '{value} days ago',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'An error occurred',
  },
  noNewNotifications: {
    id: `${scope}.noNewNotifications`,
    defaultMessage: 'There are no new notifications',
  },
});
