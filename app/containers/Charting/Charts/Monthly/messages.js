/*
 * Bad River Monthly charts Messages
 *
 * This contains all the text for the Bad River Monthly container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Charting.Charts.MonthlyReport';

export default defineMessages({
  MonthlyReport: {
    solarTitle: {
      id: `${scope}.solarTitle`,
      defaultMessage: 'SOLAR ENERGY PRODUCTION',
    },
    powerGraphTitle: {
      id: `${scope}.powerGraphTitle`,
      defaultMessage: 'MONTHLY POWER GRAPH',
    },
    batteryPerformanceTitle: {
      id: `${scope}.batteryPerformanceTitle`,
      defaultMessage: 'BATTERY PERFORMANCE',
    },
    uptimePerformanceTitle: {
      id: `${scope}.uptimePerformanceTitle`,
      defaultMessage: 'SITE UPTIME PERFORMANCE',
    },
  },
});
