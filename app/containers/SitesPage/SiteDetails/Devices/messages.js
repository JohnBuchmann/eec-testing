/*
 * Devices List Messages
 * This contains all the text for the Devices List component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.DevicesList';

export default defineMessages({
  noRecords: {
    id: `${scope}.noRecords`,
    defaultMessage: 'No records found for the search criteria.',
  },
  labelDropdown: {
    id: `${scope}.labelDropdown`,
    defaultMessage: 'Container',
  },
});
