/*
 * Accordion Messages
 * This contains all the text for the Accordion component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.CustomizedAccordion';

export default defineMessages({
  view: {
    id: `${scope}.view`,
    defaultMessage: 'View',
  },
  hide: {
    id: `${scope}.hide`,
    defaultMessage: 'Hide',
  },
});
