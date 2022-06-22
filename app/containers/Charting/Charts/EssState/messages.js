/*
 * Ess State messages
 *
 * This contains all the text for the ESS State container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Charting.Charts.EssStateCharts';

export default defineMessages({
  essStateTitle: {
    id: `${scope}.essStateTitle`,
    defaultMessage: 'ESS STATE',
  },
  essStateSelected: {
    id: `${scope}.essStateSelected`,
    defaultMessage: 'Selected',
  },

  dateOptions: {
    dayTitle: {
      id: `${scope}.dayTitle`,
      defaultMessage: 'Date',
    },
    monthTitle: {
      id: `${scope}.monthTitle`,
      defaultMessage: 'Month',
    },
    quarterTitle: {
      id: `${scope}.quarterTitle`,
      defaultMessage: 'Quarter Q',
    },
    yearTitle: {
      id: `${scope}.yearTitle`,
      defaultMessage: 'Year',
    },
  },
});
