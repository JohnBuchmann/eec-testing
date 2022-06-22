import { DeviceListTypeId } from 'Utils/enums/device';
import { SiteTypesId } from './enums/siteTypes';
import { EssState, FlowDirection, LineDirection } from './enums/systemDiagram';
import { ScaleSymbolArray } from './enums/unitMeasurement';
import { getValueIfExists, propertyExist } from './propertyValidation';

const EV_TO_FLEET_WIRE = 'evToFleetWire';
const systemDiagramConfigurationLabeling = [
  {
    label: 'T/F',
    description: 'To/From',
    x: 360,
    y: 530,
  },
  {
    label: 'ACT',
    description: 'Actual',
    x: 750,
    y: 530,
  },
  {
    label: 'CAP',
    description: 'Device Capacity',
    x: 951,
    y: 530,
  },
];

/**
 * Array with device UI configuration for Ignition System Diagram
 */
export const getSystemDiagramConfigurationIgnition = (
  existsCustomerLoad,
  existsFleet,
  existsEv
) => {
  let lowerVerticalCable = 0;
  let lowerHorizontalCable = 0;

  let upperVerticalCable = 0;
  let upperHorizontalCable = 0;
  let evToFleetWire = 0;

  if (existsCustomerLoad) {
    lowerVerticalCable = 96;
    lowerHorizontalCable = 50;
  }
  if (existsFleet && existsEv) {
    evToFleetWire = 165;
  }

  if (existsFleet) {
    upperVerticalCable = -96;
    upperHorizontalCable = 50;
  }

  if (!existsFleet && existsEv) {
    upperVerticalCable = -96;
    upperHorizontalCable = 218;
    evToFleetWire = 0;
  }

  return [
    {
      deviceType: DeviceListTypeId.PowerGrid,
      x: 17,
      y: 237,
      wires: [
        {
          x: 85,
          y: 277,
          segments: [
            {
              direction: LineDirection.Horizontal,
              length: 30,
            },
          ],
        },
      ],
    },
    {
      deviceType: DeviceListTypeId.Gid,
      x: 104,
      y: 258,

      wires: [
        {
          x: 85,
          y: 277,
          segments: [
            {
              direction: LineDirection.Horizontal,
              length: 81,
            },
            {
              direction: LineDirection.Vertical,
              length: upperVerticalCable,
            },
            {
              direction: LineDirection.Horizontal,
              length: upperHorizontalCable,
            },
          ],
        },
        {
          x: 85,
          y: 277,
          segments: [
            {
              direction: LineDirection.Horizontal,
              length: 81,
            },
            {
              direction: LineDirection.Vertical,
              length: lowerVerticalCable,
            },
            {
              direction: LineDirection.Horizontal,
              length: lowerHorizontalCable,
            },
          ],
        },
      ],
    },

    {
      deviceType: DeviceListTypeId.Fleet,
      x: 165,
      y: 94,
      isMicroGridConsumption: true,
      isMicrogrid: true,
      inverter: {
        deviceType: DeviceListTypeId.Inverter,
        x: 218,
        y: 165,
      },
      wires: [
        {
          x: 218,
          y: 167,
          segments: [
            {
              direction: LineDirection.Vertical,
              length: 100,
            },
          ],
        },
      ],
    },
    {
      deviceType: DeviceListTypeId.Ev,
      x: 380,
      y: 94,
      isMicroGridConsumption: true,
      isMicrogrid: true,
      inverter: {
        deviceType: DeviceListTypeId.Inverter,
        x: 383,
        y: 165,
      },
      wires: [
        {
          x: 383,
          y: 167,
          segments: [
            {
              direction: LineDirection.Vertical,
              length: 100,
            },
          ],
        },
        {
          // Note: Name was added to find this specific cable so if later
          // on more cables are added from EV the flow logic wont break.
          name: EV_TO_FLEET_WIRE,
          x: 220,
          y: 181,
          segments: [
            {
              direction: LineDirection.Horizontal,
              length: evToFleetWire,
            },
          ],
        },
      ],
    },
    {
      deviceType: DeviceListTypeId.AcLoad,
      x: 525,
      y: 468,
      isMicroGridConsumption: true,
      isMicrogrid: true,
      inverter: {
        deviceType: DeviceListTypeId.Inverter,
        x: 529,
        y: 290,
      },
      wires: [
        {
          x: 529,
          y: 389,
          segments: [
            {
              direction: LineDirection.Vertical,
              length: -100,
            },
          ],
        },
      ],
    },
    {
      deviceType: DeviceListTypeId.DcLoad,
      x: 545,
      y: 94,
      isMicroGridConsumption: true,
      isMicrogrid: true,
      inverter: {
        deviceType: DeviceListTypeId.Inverter,
        x: 549,
        y: 165,
        labelName: 'DCDC',
      },
      wires: [
        {
          x: 549,
          y: 167,
          segments: [
            {
              direction: LineDirection.Vertical,
              length: 100,
            },
          ],
        },
      ],
    },
    {
      deviceType: DeviceListTypeId.CustomerLoad,
      x: 165,
      y: 468,
      isMicroGridConsumption: true,
      isMicrogrid: true,
      inverter: {
        deviceType: DeviceListTypeId.Inverter,
        x: 218,
        y: 290,
      },
      wires: [
        {
          x: 218,
          y: 389,
          segments: [
            {
              direction: LineDirection.Vertical,
              length: -100,
            },
          ],
        },
      ],
    },
    {
      deviceType: DeviceListTypeId.Solar,
      x: 781,
      y: 94,
      isMicrogrid: true,
      inverter: {
        deviceType: DeviceListTypeId.Inverter,
        x: 796,
        y: 165,
        labelName: 'DCDC',
      },
      wires: [
        {
          x: 796,
          y: 167,
          segments: [
            {
              direction: LineDirection.Vertical,
              length: 100,
            },
          ],
        },
      ],
    },
    {
      deviceType: DeviceListTypeId.Wind,
      x: 940,
      y: 94,
      isMicrogrid: true,
      inverter: {
        deviceType: DeviceListTypeId.Inverter,
        x: 951,
        y: 166,
      },
      wires: [
        {
          x: 951,
          y: 167,
          segments: [
            {
              direction: LineDirection.Vertical,
              length: 100,
            },
          ],
        },
      ],
    },
    {
      deviceType: DeviceListTypeId.Battery,
      x: 1045,
      y: 468,
      isMicrogrid: true,
      inverter: {
        deviceType: DeviceListTypeId.Inverter,
        x: 1026,
        y: 290,
        labelName: 'DCDC',
      },
      wires: [
        {
          x: 1026,
          y: 389,
          segments: [
            {
              direction: LineDirection.Vertical,
              length: -100,
            },
          ],
        },
      ],
    },
    {
      deviceType: DeviceListTypeId.Rengine,
      x: 712,
      y: 468,
      isMicrogrid: true,
      inverter: {
        deviceType: DeviceListTypeId.Inverter,
        x: 716,
        y: 290,
      },
      wires: [
        {
          x: 716,
          y: 389,
          segments: [
            {
              direction: LineDirection.Vertical,
              length: -100,
            },
          ],
        },
      ],
    },
  ];
};

/**
 * Array with device UI configuration for XCape System Diagram
 */
const systemDiagramConfigurationXCape = [
  {
    deviceType: DeviceListTypeId.PowerGrid,
    x: 17,
    y: 237,
    wires: [
      {
        x: 85,
        y: 277,
        segments: [
          {
            direction: LineDirection.Horizontal,
            length: 30,
          },
        ],
      },
    ],
  },
  {
    deviceType: DeviceListTypeId.Gid,
    x: 104,
    y: 258,
    wires: [
      {
        x: 218,
        y: 277,
        segments: [
          {
            direction: LineDirection.Horizontal,
            length: -140,
          },
        ],
      },
      {
        x: 342,
        y: 277,
        segments: [
          {
            direction: LineDirection.Horizontal,
            length: -124,
          },
        ],
      },
    ],
  },
  {
    deviceType: DeviceListTypeId.CustomerLoad,
    x: 165,
    y: 468,
    isMicroGridConsumption: true,
    isMicrogrid: true,
    wires: [
      {
        x: 218,
        y: 279,
        segments: [
          {
            direction: LineDirection.Vertical,
            length: 105,
          },
        ],
      },
    ],
  },
  {
    deviceType: DeviceListTypeId.Inverter,
    x: 350,
    y: 214,
    width: 122,
    height: 62,
    isCenteredLabel: true,
    isMicrogrid: true,
  },
  {
    deviceType: DeviceListTypeId.Solar,
    x: 781,
    y: 94,
    isMicrogrid: true,
    inverter: {
      deviceType: DeviceListTypeId.Inverter,
      x: 796,
      y: 165,
      labelName: 'DCDC',
    },
    wires: [
      {
        x: 796,
        y: 167,
        segments: [
          {
            direction: LineDirection.Vertical,
            length: 100,
          },
        ],
      },
    ],
  },
  {
    deviceType: DeviceListTypeId.Battery,
    x: 1045,
    y: 468,
    isMicrogrid: true,
    wires: [
      {
        x: 1026,
        y: 389,
        segments: [
          {
            direction: LineDirection.Vertical,
            length: -100,
          },
        ],
      },
    ],
  },
  {
    deviceType: DeviceListTypeId.Rengine,
    x: 712,
    y: 468,
    isMicrogrid: true,
    wires: [
      {
        x: 716,
        y: 389,
        segments: [
          {
            direction: LineDirection.Vertical,
            length: -60,
          },
          {
            direction: LineDirection.Horizontal,
            length: -310,
          },
          {
            direction: LineDirection.Vertical,
            length: -20,
          },
        ],
      },
    ],
  },
];
/**
 * For the flow direction of AB path
 */
export const getElectricityPathAB = (gridCDemandflow, deviceListIdCD) => {
  let flowDirection = FlowDirection.None;

  if (getValueIfExists(() => gridCDemandflow.currentFlow, 0) !== 0) {
    if (deviceListIdCD === DeviceListTypeId.CustomerLoad) {
      flowDirection =
        gridCDemandflow.currentFlow > 0
          ? FlowDirection.EndToStart
          : FlowDirection.StartToEnd;
    }
  }
  return flowDirection;
};

/**
 * getElectricityPathV
 * Calculates a flow direction value for the V cable
 *
 * @param {Object} evGridFlow EV grid flow data
 * @param {Number} evGridFlow.currentFlow EV grid flow value
 * @param {Object} fleetGridFlow Fleet grid flow data
 * @param {Number} fleetGridFlow.currentFlow Fleet grid flow value
 * @return {number} A value indicating the flow direction
 */
export const getElectricityPathV = (evGridFlow, fleetGridFlow) => {
  let flowDirection = FlowDirection.None;
  const evGridFlowValue = getValueIfExists(() => evGridFlow.currentFlow, 0);
  const fleetGridFlowValue = getValueIfExists(
    () => fleetGridFlow.currentFlow,
    0
  );
  if (evGridFlowValue !== 0 || fleetGridFlowValue !== 0) {
    flowDirection =
      evGridFlowValue + fleetGridFlowValue > 0
        ? FlowDirection.StartToEnd
        : FlowDirection.EndToStart;
  }
  return flowDirection;
};

/**
 * getElectricityFlowDirection
 * Calculates a flow direction value
 *
 * @param {Object} busFlow contains the values for the current flow
 * @param {String} deviceListId Device ID to determine specific flow direction according to requirements
 * @return {number} A value indicating the flow direction
 */
export const getElectricityFlowDirection = (busFlow, deviceListId) => {
  let flowDirection = FlowDirection.None;

  if (getValueIfExists(() => busFlow.currentFlow, 0) !== 0) {
    if (
      deviceListId === DeviceListTypeId.Ev ||
      deviceListId === DeviceListTypeId.DcLoad ||
      deviceListId === DeviceListTypeId.Fleet
    ) {
      flowDirection =
        busFlow.currentFlow > 0
          ? FlowDirection.StartToEnd
          : FlowDirection.EndToStart;
    } else {
      flowDirection =
        busFlow.currentFlow > 0
          ? FlowDirection.EndToStart
          : FlowDirection.StartToEnd;
    }
    if (
      busFlow.currentFlow < 0 &&
      (deviceListId === DeviceListTypeId.Solar ||
        deviceListId === DeviceListTypeId.Wind ||
        deviceListId === DeviceListTypeId.EV ||
        deviceListId === DeviceListTypeId.Rengine ||
        deviceListId === DeviceListTypeId.DcLoad ||
        deviceListId === DeviceListTypeId.Inverter)
    ) {
      flowDirection = FlowDirection.None;
    }
  }

  return flowDirection;
};

/**
 * getElectricityCDemandInverterFlowDirection
 * Calculates a flow direction value between the CDemand Inverter and the DC Bus (or segment "6"
 * in requirement charts).
 *
 * @param {number} dcBusFlow DC Bus flow value that is coming from the edge.
 * @return {number} A numerical value indicating the flow direction as defined in "FlowDirection" enum.
 */
export const getElectricityCDemandInverterFlowDirection = (dcBusFlow) => {
  if (getValueIfExists(() => dcBusFlow, 0) === 0) {
    return FlowDirection.None;
  }
  return dcBusFlow > 0 ? FlowDirection.StartToEnd : FlowDirection.EndToStart;
};

/**
 * getElectricityEvtoFleetFlowDirection
 * Determines the flow direction for the cable that goes from EV to Fleet
 * @param {number} totalLoad EV total load value to determine the flow direction
 */
export const getElectricityEvtoFleetFlowDirection = (totalLoad) => {
  if (totalLoad > 0) {
    return FlowDirection.StartToEnd;
  }
  if (totalLoad < 0) {
    return FlowDirection.EndToStart;
  }
  return FlowDirection.None;
};

/**
 * getElectricityBatteryFlowDirection
 * Calculates a flow direction value
 *
 * @param {Object} busFlow contains the values for the current flow
 * @return {number} A value indicating the flow direction
 */
const getElectricityBatteryFlowDirection = (state) => {
  let flowDirection;

  switch (state) {
    case EssState.Charging:
      flowDirection = FlowDirection.StartToEnd;
      break;
    case EssState.Discharging:
      flowDirection = FlowDirection.EndToStart;
      break;
    default:
      flowDirection = FlowDirection.None;
      break;
  }

  return flowDirection;
};

/**
 * getSystemDiagramUIConfiguration
 * Gets system Diagram UI Configuration
 *
 * @param {number} siteTypeId
 * @return {Array} Data with system Diagram UI Configuration
 */
const getSystemDiagramUIConfiguration = (
  siteTypeId,
  existsCustomerLoad,
  existsFleet,
  existsEv
) => {
  let systemDiagramUIConfiguration;

  switch (siteTypeId) {
    case SiteTypesId.Ignition:
      systemDiagramUIConfiguration = getSystemDiagramConfigurationIgnition(
        existsCustomerLoad,
        existsFleet,
        existsEv
      );
      break;
    case SiteTypesId.Xcape:
      systemDiagramUIConfiguration = systemDiagramConfigurationXCape;
      break;
    default:
      break;
  }

  return systemDiagramUIConfiguration;
};

/**
 * displaySystemDiagram
 * Returns true if overview Object contains data to display system diagram
 *
 * @param {Object} siteOverview contains telemetry data for System Diagram
 * @return {Boolean}
 */
export const displaySystemDiagram = (siteOverview) =>
  propertyExist(() => siteOverview.siteType) &&
  propertyExist(() => siteOverview.microGridConsumption) &&
  propertyExist(() => siteOverview.microGridProductionAssets) &&
  getSystemDiagramUIConfiguration(siteOverview.siteType.siteTypeId);

/**
 * getPowerGridConfiguration
 * Get Power Grid UI configuration
 *
 * @param {Object} siteOverview contains telemetry data for System Diagram
 * @param {Array} Array with devices UI configuration for System Diagram
 * @return {Object} An object with Power Grid UI configuration for System Diagram
 */
const getPowerGridConfiguration = (
  siteOverview,
  systemDiagramConfiguration
) => {
  let systemDeviceConfig = systemDiagramConfiguration.find(
    (deviceConfig) => deviceConfig.deviceType === DeviceListTypeId.PowerGrid
  );

  if (systemDeviceConfig) {
    systemDeviceConfig = { ...systemDeviceConfig, ...siteOverview.powerGrid };
  }

  return systemDeviceConfig;
};

/**
 * getPowerGIDConfiguration
 * Get Power GID UI configuration
 *
 * @param {Object} siteOverview contains telemetry data for System Diagram
 * @param {Array} Array with devices UI configuration for System Diagram
 * @return {Object} An object with Power GID UI configuration for System Diagram
 */
const getPowerGIDConfiguration = (siteOverview, systemDiagramConfiguration) => {
  let systemDeviceConfig = systemDiagramConfiguration.find(
    (deviceConfig) => deviceConfig.deviceType === DeviceListTypeId.Gid
  );

  if (systemDeviceConfig) {
    const isConfigurationXCape =
      siteOverview.siteType.siteTypeId === SiteTypesId.Xcape;
    const isConfigurationIgnition =
      siteOverview.siteType.siteTypeId === SiteTypesId.Ignition;
    const gridPower = getValueIfExists(
      () => siteOverview.powerGrid.powerGridFlow,
      { currentFlow: 0 }
    );
    const inverterLoadCont = getValueIfExists(
      () => siteOverview.microGridConsumption[0].dcBusFlow,
      { currentFlow: 0 }
    );

    let cDemand;
    let fleetGridFlow;
    let evGridFlow;

    siteOverview.microGridConsumption.forEach((microGridElement) => {
      switch (microGridElement.name) {
        case DeviceListTypeId.CustomerLoad:
          cDemand = getValueIfExists(() => microGridElement.gridFlow, {
            currentFlow: 0,
          });
          break;

        case DeviceListTypeId.Fleet:
          fleetGridFlow = getValueIfExists(() => microGridElement.gridFlow, {
            currentFlow: 0,
          });
          break;

        case DeviceListTypeId.Ev:
          evGridFlow = getValueIfExists(() => microGridElement.gridFlow, {
            currentFlow: 0,
          });
          break;

        default:
          break;
      }
    });

    // special case for XCape to handle various power flows and show the flow on the wires.
    if (isConfigurationXCape) {
      const wires = systemDeviceConfig.wires.map((wire, index) => {
        let flowDirection = FlowDirection.None;
        if (index === 0) {
          // first wire segment - from 'power grid' to 'customer demand connection point'
          flowDirection = getElectricityFlowDirection(
            gridPower,
            DeviceListTypeId.Gid
          );
        } else {
          // second wire segment - from 'customer demand connection point' to 'inverter'
          flowDirection = getElectricityFlowDirection(
            inverterLoadCont,
            DeviceListTypeId.Gid
          );
        }

        return {
          ...wire,
          flowDirection,
        };
      });
      // modify wires to add flow
      systemDeviceConfig = {
        ...systemDeviceConfig,
        ...siteOverview.microGrid,
        wires,
      };
    } else if (isConfigurationIgnition) {
      const wires = systemDeviceConfig.wires.map((wire, index) => {
        // for ignition site type
        let flowDirection;
        if (index === 1) {
          // Second wire segment - from 'power grid' to 'customer demand connection point'
          flowDirection = getElectricityPathAB(
            cDemand,
            DeviceListTypeId.CustomerLoad
          );
        } else {
          flowDirection = getElectricityPathV(fleetGridFlow, evGridFlow);
        }
        return {
          ...wire,
          flowDirection,
        };
      });
      // modify wires to add flow
      systemDeviceConfig = {
        ...systemDeviceConfig,
        ...siteOverview.microGrid,
        wires,
      };
    } else {
      systemDeviceConfig = { ...systemDeviceConfig, ...siteOverview.microGrid };
    }
  }
  return systemDeviceConfig;
};

/**
 * getMicroGridItemsConfiguration
 * Get an array for micro-grid Items UI configuration for system diagram
 *
 * @param {Array} Array with micro-grid telemetry to find into devices UI configuration
 * @param {Array} Array with devices UI configuration for System Diagram
 * @param {Boolean} isConsumptionMicroGrid indicates if we are processing consumption items
 * @return {Object} An object with Power GID UI configuration for System Diagram
 */
const getMicroGridItemsConfiguration = (
  microGridItems,
  systemDiagramConfiguration
) => {
  let microGridItemUiData = [];
  if (microGridItems && systemDiagramConfiguration) {
    microGridItemUiData = systemDiagramConfiguration
      .filter((deviceConfig) => deviceConfig.isMicrogrid)
      .map((deviceConfig) => {
        const microGridItem = microGridItems.find(
          (gridItem) => gridItem.name === deviceConfig.deviceType
        );
        let uiConfig;
        if (microGridItem) {
          let wires;
          if (propertyExist(() => deviceConfig.wires)) {
            let flowDirection = FlowDirection.None;

            // Special case for BATT (Battery)
            if (microGridItem.name === DeviceListTypeId.Battery) {
              flowDirection = getElectricityBatteryFlowDirection(
                microGridItem.state
              );
            } else if (microGridItem.name === DeviceListTypeId.CustomerLoad) {
              // CDemand Inverter <-> DC Bus flow
              flowDirection = getElectricityCDemandInverterFlowDirection(
                microGridItem.dcBusFlow.currentFlow
              );
            } else {
              // Flow for every other device group
              flowDirection = getElectricityFlowDirection(
                deviceConfig.isMicroGridConsumption
                  ? microGridItem.totalLoad
                  : microGridItem.gridFlow,
                microGridItem.name
              );
            }

            wires = deviceConfig.wires.map((wire) => ({
              ...wire,
              flowDirection,
            }));

            // Special case for wire from EV to Fleet
            if (microGridItem.name === DeviceListTypeId.Ev) {
              const evToFleetWireFlow = wires.find(
                (wire) => wire.name === EV_TO_FLEET_WIRE
              );
              evToFleetWireFlow.flowDirection = getElectricityEvtoFleetFlowDirection(
                microGridItem.totalLoad.currentFlow
              );
            }
          }

          // Special case for INV (INVERTER) main device
          if (microGridItem.name === DeviceListTypeId.Inverter) {
            uiConfig = {
              ...deviceConfig,
              ...microGridItem.inverter,
              wires,
            };
          } else {
            let inverter;
            if (
              propertyExist(() => deviceConfig.inverter) &&
              propertyExist(() => microGridItem.inverter)
            ) {
              inverter = {
                ...microGridItem.inverter,
                ...deviceConfig.inverter,
              };
            }

            uiConfig = {
              ...deviceConfig,
              ...microGridItem,
              inverter,
              wires,
            };
          }
        }
        return uiConfig;
      })
      .filter((item) => !!item);
  }
  return microGridItemUiData;
};

/**
 * getSystemDiagramConfiguration
 * Get proper System Diagram
 *
 * @return {Array} Array with device UI configuration for System Diagram
 */
export const getSystemDiagramConfiguration = (
  siteOverview,
  existsCustomerLoad,
  existsFleet,
  existsEv
) => {
  const siteTypeId = getValueIfExists(() => siteOverview.siteType.siteTypeId);
  const diagramConfiguration = getSystemDiagramUIConfiguration(
    siteTypeId,
    existsCustomerLoad,
    existsFleet,
    existsEv
  );

  let configuration = [];

  if (siteOverview && diagramConfiguration) {
    // Power Grid
    configuration.push(
      getPowerGridConfiguration(siteOverview, diagramConfiguration)
    );

    // GID
    configuration.push(
      getPowerGIDConfiguration(siteOverview, diagramConfiguration)
    );

    const microGridItems = [];
    if (siteOverview.microGridConsumption) {
      microGridItems.push(...siteOverview.microGridConsumption);
    }

    if (siteOverview.microGridProductionAssets) {
      microGridItems.push(...siteOverview.microGridProductionAssets);
    }

    configuration = [
      ...configuration,
      ...getMicroGridItemsConfiguration(microGridItems, diagramConfiguration),
    ];
  }
  return configuration;
};

/**
 * getSystemDiagramLabelingConfiguration
 * Get proper System Diagram labeling
 *
 * @return {Array} Array with device UI configuration for System Diagram  labeling
 */
export const getSystemDiagramLabelingConfiguration = () =>
  systemDiagramConfigurationLabeling;

/**
 * formatSI
 * Transform a numeric value into string with its maximum scale representation
 *
 * @param {number} value It's numeric value to transform. This will be passed without any scale
 * @param {string} minimumScale Enum String that represents the minimum  Scale to transform
 * @param {number} roundDecimals receives round decimal value
 * @param {number} convertScaleValue receives value to convert scale value
 * @param {boolean} addSymbol receives if display symbol
 * @return {String} A formatted numeric with scale unit
 */
export const formatSI = (
  value,
  minimumScale,
  roundDecimals,
  convertScaleValue = 0,
  addSymbol = true
) => {
  const scaleValueOverFlow = 1000;
  let workingValue = propertyExist(() => value) ? value : 0;
  if (convertScaleValue) {
    workingValue *= convertScaleValue;
  }
  const scaleIndex = ScaleSymbolArray.findIndex(
    (scale) => scale === minimumScale
  );
  const scaleNumericBase = 10 ** (scaleIndex * 3);
  let result = '';
  let scaledNumber = workingValue / scaleNumericBase;
  scaledNumber =
    !propertyExist(() => roundDecimals) || roundDecimals < 0
      ? scaledNumber
      : +scaledNumber.toFixed(roundDecimals);

  if (
    scaledNumber * Math.sign(scaledNumber) >= scaleValueOverFlow &&
    ScaleSymbolArray.length > scaleIndex + 1
  ) {
    result = formatSI(
      workingValue,
      ScaleSymbolArray[scaleIndex + 1],
      roundDecimals
    );
  } else {
    const symbol = addSymbol ? ScaleSymbolArray[`${scaleIndex}`] : '';
    result = `${
      !propertyExist(() => roundDecimals) || roundDecimals < 0
        ? scaledNumber
        : scaledNumber.toFixed(roundDecimals)
    } ${symbol}`;
  }

  return result;
};
