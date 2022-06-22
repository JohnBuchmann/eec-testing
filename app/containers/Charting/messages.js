/*
 * ReportsPage Messages
 *
 * This contains all the text for the ReportsPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Charting';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Reporting container!',
  },
  reportTypePlaceholder: {
    id: `${scope}.reportTypePlaceholder`,
    defaultMessage: 'Select Report',
  },
  periodPlaceholder: {
    id: `${scope}.periodPlaceholder`,
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
  shareAlt: {
    id: `${scope}.shareAlt`,
    defaultMessage: 'Email Report',
  },
  printAlt: {
    id: `${scope}.printAlt`,
    defaultMessage: 'Print Report',
  },
  pdfAlt: {
    id: `${scope}.pdfAlt`,
    defaultMessage: 'Download PDF',
  },
  csvAlt: {
    id: `${scope}.csvAlt`,
    defaultMessage: 'Download CSV',
  },
  body: {
    id: `${scope}.body`,
    defaultMessage:
      'Please enter the email addresses that you would like to share the report with.',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  generate: {
    id: `${scope}.generate`,
    defaultMessage: 'Generate',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Enter Email',
  },
  addNew: {
    id: `${scope}.addNew`,
    defaultMessage: 'Add New',
  },
  xAxisTitleHours: {
    id: `${scope}.xAxisTitleHours`,
    defaultMessage: 'Hours',
  },
  chartUnavailable: {
    id: `${scope}.chartUnavailable`,
    defaultMessage: 'Chart Unavailable',
  },
  xAxisTitleDays: {
    id: `${scope}.xAxisTitleDays`,
    defaultMessage: 'Days',
  },
  xAxisTitleMonths: {
    id: `${scope}.xAxisTitleMonths`,
    defaultMessage: 'Months',
  },
  xAxisTitleWeeks: {
    id: `${scope}.xAxisTitleWeeks`,
    defaultMessage: 'Weeks',
  },
  xAxisTitleTime: {
    id: `${scope}.xAxisTitleTime`,
    defaultMessage: 'Time',
  },
  yAxisTitle: {
    id: `${scope}.yAxisTitle`,
    defaultMessage: 'Energy',
  },
  yAxisTitlePower: {
    id: `${scope}.yAxisTitlePower`,
    defaultMessage: 'Power',
  },
  reportTypeTitle: {
    id: `${scope}.reportTypeTile`,
    defaultMessage: 'Report Type',
  },
  periodTitle: {
    id: `${scope}.periodTitle`,
    defaultMessage: 'Period',
  },
  scaleTitle: {
    id: `${scope}.scaleTitle`,
    defaultMessage: 'Scale',
  },
  socTitle: {
    id: `${scope}.socTitle`,
    defaultMessage: 'State of Charge (%)',
  },
  outRangeAlert: {
    title: {
      id: `${scope}.outRangeAlertTitle`,
      defaultMessage: 'Data Out of Range',
    },
    body: {
      id: `${scope}.outRangeAlertBody`,
      defaultMessage:
        'You have selected a Y-Axis maximum value that excludes some of the data for this Site. Data above that range will not be displayed. Update the Y-Axis value to see the full data set.',
    },
    okButton: {
      id: `${scope}.outRangeAlertOkButton`,
      defaultMessage: 'OK',
    },
  },
  shareReport: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Share Report',
    },
    instructions: {
      id: `${scope}.instructions`,
      defaultMessage:
        'Please enter the email that you would like to share the report with.',
    },
    emailLabel: {
      id: `${scope}.email`,
      defaultMessage: 'Email',
    },
    addMessage: {
      id: `${scope}.addMessage`,
      defaultMessage: 'Add Message',
    },
  },
});
