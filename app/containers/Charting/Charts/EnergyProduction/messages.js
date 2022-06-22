/*
 * Energy Production charts Messages
 *
 * This contains all the text for the Energy Production container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Charting.Charts.EnergyProduction';

export default defineMessages({
  energyProduction: {
    solarTitle: {
      id: `${scope}.solarTitle`,
      defaultMessage: 'SOLAR ENERGY PRODUCTION',
    },
    solarText: {
      id: `${scope}.solarText`,
      defaultMessage: 'Solar',
    },
    windTitle: {
      id: `${scope}.windTitle`,
      defaultMessage: 'WIND PRODUCTION IN KWH',
    },
    windText: {
      id: `${scope}.windText`,
      defaultMessage: 'Wind',
    },
    reciprocatingTitle: {
      id: `${scope}.reciprocatingTitle`,
      defaultMessage: 'RECIPROCATING ENGINE PRODUCTION IN KWH',
    },
    reciprocatingText: {
      id: `${scope}.reciprocatingText`,
      defaultMessage: 'Reciprocating Engine',
    },
    microturbineTitle: {
      id: `${scope}.microturbineTitle`,
      defaultMessage: 'MICROTURBINE PRODUCTION IN KWH',
    },
    microturbineText: {
      id: `${scope}.microturbineText`,
      defaultMessage: 'Microturbine',
    },
  },
});
