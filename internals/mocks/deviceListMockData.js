const deviceListMockData = [
  {
    deviceId: 61,
    deviceName: 'Inverter 61',
    deviceNum: 4,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '1234567890',
    buildNo: '1.007.00bn1',
    siteId: 9,
    deviceStatusId: 1,
    deviceGroupId: 1,
    gridStatus: false,
    lcmLocation: 1, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 3, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK5',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
  {
    deviceId: 62,
    deviceName: 'Inverter 62',
    deviceNum: 335,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '784515242',
    buildNo: '1.007.00bn1',
    siteId: 9,
    deviceStatusId: 2,
    deviceGroupId: 1,
    gridStatus: true,
    lcmLocation: 2, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK6',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
  {
    deviceId: 65,
    deviceName: 'Inverter 65',
    deviceNum: 4,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '1234567890',
    buildNo: '1.007.00bn1',
    siteId: 9,
    deviceStatusId: 3,
    deviceGroupId: 1,
    gridStatus: true,
    lcmLocation: 1, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 3, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK7',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
  {
    deviceId: 8,
    deviceName: 'Inverter 8',
    deviceNum: 335,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '784515242',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 4,
    deviceGroupId: 1,
    gridStatus: false,
    lcmLocation: 3, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK8',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
  {
    deviceId: 9,
    deviceName: 'Inverter 9',
    deviceNum: 4,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '1234567890',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 5,
    deviceGroupId: 4,
    gridStatus: true,
    lcmLocation: 1, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 3, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK9',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
  {
    deviceId: 16,
    deviceName: 'Inverter 16',
    deviceNum: 335,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '784515242',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 3,
    deviceGroupId: 5,
    gridStatus: true,
    lcmLocation: 3, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK16',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
  {
    deviceId: 15,
    deviceName: 'Inverter 15',
    deviceNum: 4,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '1234567890',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 3,
    deviceGroupId: 6,
    gridStatus: false,
    lcmLocation: 3, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 3, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK15',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
  {
    deviceId: 26,
    deviceName: 'Inverter 26',
    deviceNum: 335,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '784515242',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 2,
    deviceGroupId: 7,
    gridStatus: true,
    lcmLocation: 4, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK26',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Microturbine Name',
    },
  },
  {
    deviceId: 261,
    deviceName: 'Inverter 261',
    deviceNum: 3351,
    firmwareVersion: '1.1',
    serialNo: 'S11',
    uniqueIdentifier: '3216512348',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 2,
    deviceGroupId: 7,
    gridStatus: true,
    lcmLocation: 4, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK261',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Microturbine1',
    },
  },
  {
    deviceId: 262,
    deviceName: 'Inverter 262',
    deviceNum: 3352,
    firmwareVersion: '1.1',
    serialNo: 'S12',
    uniqueIdentifier: '6549123875',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 3,
    deviceGroupId: 7,
    gridStatus: true,
    lcmLocation: 4, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK261',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Microturbine2',
    },
  },
  {
    deviceId: 263,
    deviceName: 'Inverter 263',
    deviceNum: 3353,
    firmwareVersion: '1.1',
    serialNo: 'S13',
    uniqueIdentifier: '4126651158',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 1,
    deviceGroupId: 7,
    gridStatus: true,
    lcmLocation: 1, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK261',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Microturbine3',
    },
  },
  {
    deviceId: 264,
    deviceName: 'Inverter 264',
    deviceNum: 3354,
    firmwareVersion: '1.1',
    serialNo: 'S13',
    uniqueIdentifier: '8855221',
    buildNo: '1.007.00bn2',
    siteId: 1,
    deviceStatusId: 4,
    deviceGroupId: 7,
    gridStatus: true,
    lcmLocation: 1, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK265',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Microturbine4',
    },
  },
  {
    deviceId: 27,
    deviceName: 'Inverter 27',
    deviceNum: 4,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '1234567890',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 4,
    deviceGroupId: 8,
    gridStatus: false,
    lcmLocation: 1, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 3, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK27',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
  {
    deviceId: 98,
    deviceName: 'Inverter 98',
    deviceNum: 335,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '784515242',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 2,
    deviceGroupId: 9,
    gridStatus: true,
    lcmLocation: 2, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK98',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
  {
    deviceId: 28,
    deviceName: 'Inverter 28',
    deviceNum: 335,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '784515242',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 1,
    deviceGroupId: 10,
    gridStatus: false,
    lcmLocation: 1, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK28',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
  {
    deviceId: 29,
    deviceName: 'Inverter 29',
    deviceNum: 335,
    firmwareVersion: '1.1',
    serialNo: 'S1',
    uniqueIdentifier: '784515242',
    buildNo: '1.007.00bn1',
    siteId: 1,
    deviceStatusId: 6,
    deviceGroupId: 11,
    gridStatus: true,
    lcmLocation: 2, // Container
    lcmRackNum: 2, // Rack
    lcmPositionNum: 4, // Position
    make: '80kW, 3-Phase, 480 VAC',
    deviceModel: {
      deviceModelId: 9,
      model: 'MARK29',
      energyRating: 'Energy Rating',
    },
    deviceType: {
      deviceTypeId: 7,
      deviceTypeName: 'Device Type Name',
    },
  },
];

export default deviceListMockData;
