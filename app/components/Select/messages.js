/*
 * Select Messages
 * This contains all the text for the Select component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.SelectCustomOptions';

export default defineMessages({
  filtersApplied: {
    id: `${scope}.filtersApplied`,
    defaultMessage: 'filters applied',
  },
  all: {
    id: `${scope}.all`,
    defaultMessage: 'All',
  },
});
