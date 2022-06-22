/*
 * Vehicle and fleet loads messages
 *
 * This contains all the text for the vehicle and fleet loads container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Charting.Charts.VehicleAndFleetLoads';

export default defineMessages({
  evLoadInMWH: {
    id: `${scope}.evLoadInMWH`,
    defaultMessage: 'EV LOAD',
  },
  fleetLoadInMWH: {
    id: `${scope}.fleetLoadInMWH`,
    defaultMessage: 'FLEET LOAD',
  },
});
