/*
 * Usage Vs Production Charts Messages
 *
 * This contains all the text for the Usage Vs Production Charts container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Charting.Charts.UsageVsProductionCharts';

export default defineMessages({
  usageVsProductionCharts: {
    usageVsProductionChartTitle: {
      id: `${scope}.usageVsProductionChartTitle`,
      defaultMessage: 'Production vs Facility Use',
    },
    energyToFromGridChartTitle: {
      id: `${scope}.energyToFromGridChartTitle`,
      defaultMessage: 'Energy to/from Grid',
    },
    DailyEnergyUseChartTitle: {
      id: `${scope}.DailyEnergyUseChartTitle`,
      defaultMessage: 'Daily Energy Use',
    },
    averageDailyEnergyUseChartTitle: {
      id: `${scope}.averageDailyEnergyUseChartTitle`,
      defaultMessage: 'Average Daily Energy Use',
    },
    maxEnergyDemandChartTitle: {
      id: `${scope}.maxEnergyDemandChartTitle`,
      defaultMessage: 'Maximum Energy Demand',
    },
    peakDemandChartTitle: {
      id: `${scope}.peakDemandChartTitle`,
      defaultMessage: 'Peak Demand',
    },
  },
});
