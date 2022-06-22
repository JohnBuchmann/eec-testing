const siteInformationMock = {
  siteId: 740,
  name: 'St. Elizabeth Clinic',
  siteType: {
    siteTypeId: 1,
    name: 'Ignition',
    description: 'For sites using Ignition',
  },
  totalSystemOutput: {
    currentFlow: 4.5,
    units: 'Watt',
    ts: 1632405669368,
  },
  siteStatus: {
    value: 4,
    symbolName: 'WARNING',
  },
  commStatus: {
    value: 3,
    symbolName: 'Disconnected',
  },
  lastDataReceived: 'Sep 23, 2021, 11:00:53 AM',
  powerGrid: {
    gridStatus: null,
    powerGridFlow: {
      currentFlow: 0,
      units: null,
      ts: 0,
    },
  },
  microGrid: {
    isConnected: false,
  },
  microGridConsumption: [
    {
      deviceGroupId: 7,
      name: 'EV',
      description: 'EV',
      deviceGroupStatusId: 3,
      totalLoad: {
        currentFlow: 0.223,
        units: 'Watt',
        ts: 1632405669368,
      },
      gridFlow: {
        currentFlow: 0,
        units: 'Watt',
        ts: 1632405669368,
      },
      dcBusFlow: {
        currentFlow: 0.223,
        units: 'Watt',
        ts: 1632405669368,
      },
      inverter: {
        cumulativePower: 324,
        units: 'VA',
        ts: 1632405670408,
      },
    },
    {
      deviceGroupId: 6,
      name: 'ACLOAD',
      description: 'Load / AC',
      deviceGroupStatusId: 5,
      totalLoad: {
        currentFlow: 1343.434,
        units: 'Watt',
        ts: 1632405669368,
      },
      gridFlow: {
        currentFlow: 0,
        units: null,
        ts: 0,
      },
      dcBusFlow: {
        currentFlow: 343.434,
        units: 'Watt',
        ts: 1632405669368,
      },
      inverter: {
        cumulativePower: 4.1,
        units: 'VA',
        ts: 1632405670408,
      },
    },
    {
      deviceGroupId: 9,
      name: 'CDEMAND',
      description: 'Customer Demand',
      deviceGroupStatusId: 4,
      totalLoad: {
        currentFlow: 0.555,
        units: 'Watt',
        ts: 1632405669368,
      },
      gridFlow: {
        currentFlow: 0.333,
        units: 'Watt',
        ts: 1632405669368,
      },
      dcBusFlow: {
        currentFlow: 0.222,
        units: 'Watt',
        ts: 1632405669368,
      },
      inverter: {
        cumulativePower: 14444.4,
        units: 'VA',
        ts: 1632405670408,
      },
    },
  ],
  microGridProductionAssets: [
    {
      deviceGroupId: 2,
      name: 'PDC',
      description: 'Solar',
      deviceGroupStatusId: 5,
      gridFlow: {
        currentFlow: 0.222,
        units: 'Watt',
        ts: 1632405669368,
      },
      maxPowerRating: {
        currentFlow: 0.14,
        units: 'Watt',
        ts: 1632405670408,
      },
      currentCapacity: null,
      inverter: {
        cumulativePower: 5.5,
        units: 'VA',
        ts: 1632405670408,
      },
      state: null,
    },
    {
      deviceGroupId: 3,
      name: 'WIND',
      description: 'Wind',
      deviceGroupStatusId: 1,
      gridFlow: {
        currentFlow: 4.5,
        units: 'Watt',
        ts: 1632405669368,
      },
      maxPowerRating: {
        currentFlow: 0.12,
        units: 'Watt',
        ts: 1632405670408,
      },
      currentCapacity: null,
      inverter: {
        cumulativePower: 5.5,
        units: 'VA',
        ts: 1632405670408,
      },
      state: null,
    },
    {
      deviceGroupId: 4,
      name: 'RENGINE',
      description: 'R. Engine',
      deviceGroupStatusId: 2,
      gridFlow: {
        currentFlow: 4.5,
        units: 'Watt',
        ts: 1632405669368,
      },
      maxPowerRating: {
        currentFlow: 0.12,
        units: 'Watt',
        ts: 1632405670408,
      },
      currentCapacity: null,
      inverter: {
        cumulativePower: 5.5,
        units: 'VA',
        ts: 1632405670408,
      },
      state: null,
    },
    {
      deviceGroupId: 1,
      name: 'BATT',
      description: 'Battery',
      deviceGroupStatusId: 4,
      gridFlow: {
        currentFlow: 0.666,
        units: 'Watt',
        ts: 1632405669368,
      },
      maxPowerRating: {
        currentFlow: 6.888,
        units: 'Watt',
        ts: 1632405670408,
      },
      currentCapacity: {
        currentFlow: 0.1,
        units: '%',
        ts: 1632412549358,
      },
      inverter: {
        cumulativePower: 0.047,
        units: 'VA',
        ts: 1632405670408,
      },
      state: null,
    },
  ],
};

export default siteInformationMock;
