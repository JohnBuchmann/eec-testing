/*
 * DeviceCard Messages
 * This contains all the text for DeviceCard
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.DeviceCard';

/**
 * defaultMessages contains all messages for DeviceCard
 */
export default defineMessages({
  gridStatus: {
    id: `${scope}.gridStatus`,
    defaultMessage: 'Grid Status:',
  },
  offGrid: {
    id: `${scope}.offGrid`,
    defaultMessage: 'Off-Grid',
  },
  onGrid: {
    id: `${scope}.onGrid`,
    defaultMessage: 'On-Grid',
  },
  container: {
    id: `${scope}.container`,
    defaultMessage: 'Container',
  },
  rack: {
    id: `${scope}.rack`,
    defaultMessage: 'Rack',
  },
  position: {
    id: `${scope}.position`,
    defaultMessage: 'Position',
  },
});
