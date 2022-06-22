/*
 * DeviceSummary Messages
 * This contains all the text for DeviceSummary
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.DeviceSummary';

/**
 * defaultMessages contains all messages for DeviceSummary
 */
export default defineMessages({
  firmVersion: {
    id: `${scope}.firmVersion`,
    defaultMessage: 'Firmware Version',
  },
  serialNumber: {
    id: `${scope}.serialNumber`,
    defaultMessage: 'Serial Number',
  },
  uniqueIdentifier: {
    id: `${scope}.uniqueIdentifier`,
    defaultMessage: 'Unique Identifier',
  },
  buildNumber: {
    id: `${scope}.buildNumber`,
    defaultMessage: 'Build Number',
  },
});
