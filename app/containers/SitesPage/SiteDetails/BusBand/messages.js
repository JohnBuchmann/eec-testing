/*
 * Bus band configuration page messages
 *
 * This contains all the text for the Bus band configuration page.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SitesDetailsPage.BusBand';

export default defineMessages({
  busBand: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Bus Band Configuration',
    },
    peakDemand: {
      id: `${scope}.peakDemand`,
      defaultMessage: 'Peak Demand',
    },
    offPeakDemand: {
      id: `${scope}.offPeakDemand`,
      defaultMessage: 'Off-Peak Demand',
    },
    stateTitle1: {
      id: `${scope}.stateTitle1`,
      defaultMessage: 'Title',
    },
    stateTitle2: {
      id: `${scope}.stateTitle2`,
      defaultMessage: 'Title',
    },
    currentSetPoint: {
      id: `${scope}.currentSetPoint`,
      defaultMessage: 'Current Set Point',
    },
    newSetPoint: {
      id: `${scope}.newSetPoint`,
      defaultMessage: 'New Set Point',
    },
    noBusbandDataAvailable: {
      id: `${scope}.noBusbandDataAvailable`,
      defaultMessage: 'Bus Band Configurations Unavailable',
    },
    errorAttemptingToEdit: {
      id: `${scope}.errorAttemptingToEdit`,
      defaultMessage: 'Bus Band Unavailable',
    },
  },
  discardAlert: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Discard Changes',
    },
    body: {
      id: `${scope}.body`,
      defaultMessage:
        'Are you sure you want to discard your changes? This action cannot be undone.',
    },
    discardButton: {
      id: `${scope}.discardButton`,
      defaultMessage: 'Discard Changes',
    },
    continueButton: {
      id: `${scope}.continueButton`,
      defaultMessage: 'Continue Editing',
    },
  },
  savedAlert: {
    titleSuccess: {
      id: `${scope}.titleSuccess`,
      defaultMessage: 'Bus Band Changes Saved Successfully',
    },
    bodySuccess: {
      id: `${scope}.bodySuccess`,
      defaultMessage:
        'Your new Bus Band Configuration has been saved successfully.',
    },
    titleFailure: {
      id: `${scope}.titleFailure`,
      defaultMessage: 'Error while saving Bus Band Changes',
    },
    bodyFailure: {
      id: `${scope}.bodyFailure`,
      defaultMessage: 'These fields threw an error while attempting to save:',
    },
    bodyGeneralFailure: {
      id: `${scope}.bodyGeneralFailure`,
      defaultMessage:
        'There was an error while attempting save, No data was saved:',
    },
    bodyPartialSuccess: {
      id: `${scope}.bodyFailure`,
      defaultMessage: 'These fields were save successfully:',
    },
    continueButton: {
      id: `${scope}.continueButton`,
      defaultMessage: 'OK',
    },
  },
  outOfRangeAlert: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Bus Band Settings Outside Acceptable Range',
    },
    body: {
      id: `${scope}.body`,
      defaultMessage:
        'One or more Bus Band settings are outside the acceptable range (marked in red). Please update the appropriate fields and try again.',
    },
    continueButton: {
      id: `${scope}.continueButton`,
      defaultMessage: 'OK',
    },
  },
});
