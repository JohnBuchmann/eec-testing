/*
 * Paginator component messages
 *
 * This contains all the text for the Paginator.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Paginator';

export default defineMessages({
  previous: {
    id: `${scope}.previous`,
    defaultMessage: 'Previous Device',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next Device',
  },
});
