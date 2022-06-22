/*
 * Site Event Messages
 * This contains all the text for the Site Event component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.SiteEvents';

export default defineMessages({
  noRecords: {
    id: `${scope}.noRecords`,
    defaultMessage: 'No records found for the search criteria.',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'EVENTS',
  },
  siteEventsNotAvailable: {
    id: `${scope}.siteEventsNotAvailable`,
    defaultMessage: 'No Events Found',
  },
  excelAlt: {
    id: `${scope}.pdfAlt`,
    defaultMessage: 'Download Excel',
  },
  downloadExcel: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Download Excel',
    },
    body: {
      id: `${scope}.body`,
      defaultMessage: 'Please select the time frame of data to download.',
    },
    timeInterval: {
      id: `${scope}.timeInterval`,
      defaultMessage: 'Select Time Interval',
    },
    dateRange: {
      id: `${scope}.dateRange`,
      defaultMessage: 'Select Date Range',
    },
    select: {
      id: `${scope}.select`,
      defaultMessage: 'Select',
    },
    from: {
      id: `${scope}.from`,
      defaultMessage: 'From',
    },
    to: {
      id: `${scope}.to`,
      defaultMessage: 'To',
    },
    timeFrom: {
      id: `${scope}.timeFrom`,
      defaultMessage: 'TIME FROM',
    },
    timeTo: {
      id: `${scope}.timeTo`,
      defaultMessage: 'TIME TO',
    },
    hour: {
      id: `${scope}.hour`,
      defaultMessage: 'Hour',
    },
    minute: {
      id: `${scope}.minute`,
      defaultMessage: 'Minute',
    },
    discardButton: {
      id: `${scope}.discardButton`,
      defaultMessage: 'Cancel',
    },
    continueButton: {
      id: `${scope}.continueButton`,
      defaultMessage: 'DOWNLOAD',
    },
    downloadCompleteBody: {
      id: `${scope}.downloadCompleteBody`,
      defaultMessage: 'Download Complete',
    },
    downloadCompleteContinueButton: {
      id: `${scope}.downloadCompleteContinueButton`,
      defaultMessage: 'OK',
    },
  },
});
