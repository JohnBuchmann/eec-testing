import { DeviceListTypeId } from 'Utils/enums/device';
import { EssState, FlowDirection } from 'Utils/enums/systemDiagram';
import { ScaleSymbol } from 'Utils/enums/unitMeasurement';
import {
  displaySystemDiagram,
  formatSI,
  getSystemDiagramConfiguration,
  getElectricityFlowDirection,
  getElectricityEvtoFleetFlowDirection,
  getSystemDiagramConfigurationIgnition,
  getElectricityPathV,
} from 'Utils/systemDiagram';

describe('SystemDiagram', () => {
  describe('formatSI', () => {
    it('should format to Mega units when minimumScale is Kilo and value is > Kilo and < Giga units', () => {
      const expectedValue = '1.00 M';
      const value = 1000000;
      const minimumScale = ScaleSymbol.Kilo;
      const roundToDecimals = 2;

      const actualValue = formatSI(value, minimumScale, roundToDecimals);

      expect(actualValue).toBe(expectedValue);
    });

    it('should format  to minimumScale units when value is lower than minimumScale', () => {
      const expectedValue = '0.99 k';
      const value = 994;
      const minimumScale = ScaleSymbol.Kilo;
      const roundToDecimals = 2;

      const actualValue = formatSI(value, minimumScale, roundToDecimals);

      expect(actualValue).toBe(expectedValue);
    });

    it('should round format when the formatted value overflows the round decimals parameter', () => {
      const expectedValue = '1.00 k';
      const value = 996;
      const minimumScale = ScaleSymbol.Kilo;
      const roundToDecimals = 2;

      const actualValue = formatSI(value, minimumScale, roundToDecimals);

      expect(actualValue).toBe(expectedValue);
    });

    it('should format to Mega units when minimumScale is Kilo and value is > Kilo and < Giga units and is negative value', () => {
      const expectedValue = '-1.00 M';
      const value = -1000000;
      const minimumScale = ScaleSymbol.Kilo;
      const roundToDecimals = 2;

      const actualValue = formatSI(value, minimumScale, roundToDecimals);

      expect(actualValue).toBe(expectedValue);
    });
  });

  describe('getSystemDiagramConfiguration', () => {
    let ignitionSiteOverviewMock;
    let xcapeSiteOverviewMock;

    beforeEach(() => {
      ignitionSiteOverviewMock = {
        siteId: 9434,
        name: 'DSeries AutoAsset 1',
        siteType: {
          siteTypeId: 1,
          name: 'Ignition',
          description: 'For sites using Ignition',
        },
        totalSystemOutput: {
          currentFlow: 1234.0,
          units: 'kW',
          ts: 1645729090333,
        },
        siteStatus: { value: 5, symbolName: 'OK' },
        commStatus: { value: 1, symbolName: 'Landline' },
        lastDataReceived: 'Feb 24, 2022, 12:18:35 PM',
        powerGrid: {
          gridStatus: { value: 1, symbolName: 'MAINTENANCE' },
          powerGridFlow: {
            currentFlow: 2455.0,
            units: 'Watt',
            ts: 1645729090333,
          },
        },
        microGrid: { isConnected: true },
        microGridConsumption: [
          {
            deviceGroupId: 7,
            name: 'EV',
            description: 'EV',
            deviceGroupStatusId: 3,
            totalLoad: { currentFlow: 0.0, units: 'kW', ts: 1645729090333 },
            gridFlow: { currentFlow: 0.0, units: 'kW', ts: 1645729090333 },
            dcBusFlow: { currentFlow: 0.0, units: 'kW', ts: 1645729090333 },
            inverter: {
              cumulativePower: 3.24,
              units: 'kVA',
              ts: 1645729086211,
            },
          },
          {
            deviceGroupId: 6,
            name: 'ACLOAD',
            description: 'Load / AC',
            deviceGroupStatusId: 5,
            totalLoad: { currentFlow: 343.43, units: 'kW', ts: 1645729090333 },
            gridFlow: { currentFlow: 343.43, units: 'kW', ts: 1645729090333 },
            dcBusFlow: { currentFlow: 0.0, units: null, ts: 0 },
            inverter: { cumulativePower: 5.5, units: 'kVA', ts: 1645729086211 },
          },
          {
            deviceGroupId: 9,
            name: 'CDEMAND',
            description: 'Customer Demand',
            deviceGroupStatusId: 2,
            totalLoad: { currentFlow: 357.0, units: 'kW', ts: 1645730123011 },
            gridFlow: { currentFlow: 357.0, units: 'kW', ts: 1645730283761 },
            dcBusFlow: { currentFlow: 0.0, units: 'kW', ts: 1645730123011 },
            inverter: { cumulativePower: 4.4, units: 'kVA', ts: 1645729086211 },
          },
          {
            deviceGroupId: 8,
            name: 'FLEET',
            description: 'Fleet',
            deviceGroupStatusId: 2,
            totalLoad: { currentFlow: 1467.0, units: 'kW', ts: 1645729090333 },
            gridFlow: { currentFlow: 789.0, units: 'kW', ts: 1645729090333 },
            dcBusFlow: { currentFlow: 678.0, units: 'kW', ts: 1645729090333 },
            inverter: {
              cumulativePower: 777.0,
              units: 'kVA',
              ts: 1645729086211,
            },
          },
          {
            deviceGroupId: 5,
            name: 'DCLOAD',
            description: 'Load / DC',
            deviceGroupStatusId: 4,
            totalLoad: { currentFlow: 0.0, units: null, ts: 1645729090333 },
            gridFlow: { currentFlow: 0.0, units: null, ts: 1645729090333 },
            dcBusFlow: { currentFlow: 0.0, units: null, ts: 0 },
            inverter: {
              cumulativePower: 555.0,
              units: 'kW',
              ts: 1645729086211,
            },
          },
        ],
        microGridProductionAssets: [
          {
            deviceGroupId: 2,
            name: 'PDC',
            description: 'Solar',
            deviceGroupStatusId: 1,
            gridFlow: { currentFlow: 765.0, units: 'kW', ts: 1645729090333 },
            maxPowerRating: {
              currentFlow: 240.0,
              units: 'kWDC',
              ts: 1645729086211,
            },
            currentCapacity: null,
            gridFlowPower: null,
            inverter: { cumulativePower: 5.5, units: 'kW', ts: 1645729086211 },
            state: null,
          },
          {
            deviceGroupId: 3,
            name: 'WIND',
            description: 'Wind',
            deviceGroupStatusId: 5,
            gridFlow: { currentFlow: 432.0, units: 'kW', ts: 1645729090333 },
            maxPowerRating: {
              currentFlow: 0.12,
              units: 'Watt',
              ts: 1645729086211,
            },
            currentCapacity: null,
            gridFlowPower: null,
            inverter: { cumulativePower: 5.5, units: 'kVA', ts: 1645729086211 },
            state: null,
          },
          {
            deviceGroupId: 4,
            name: 'RENGINE',
            description: 'R. Engine',
            deviceGroupStatusId: 3,
            gridFlow: { currentFlow: 3000.0, units: 'Watt', ts: 1645729090333 },
            maxPowerRating: {
              currentFlow: 120.0,
              units: 'Watt',
              ts: 1645729086211,
            },
            currentCapacity: null,
            gridFlowPower: null,
            inverter: { cumulativePower: 5.5, units: 'kVA', ts: 1645729086211 },
            state: null,
          },
          {
            deviceGroupId: 1,
            name: 'BATT',
            description: 'Battery',
            deviceGroupStatusId: 2,
            gridFlow: { currentFlow: 1500.0, units: 'kW', ts: 1645729090333 },
            maxPowerRating: {
              currentFlow: 7.888,
              units: 'kWh',
              ts: 1645729086211,
            },
            currentCapacity: {
              currentFlow: 50.0,
              units: '%',
              ts: 1645729090333,
            },
            gridFlowPower: {
              currentFlow: 246.0,
              units: 'kWh',
              ts: 1645729090333,
            },
            inverter: {
              cumulativePower: 0.666,
              units: 'kW',
              ts: 1645729086211,
            },
            state: 1,
          },
        ],
      };

      xcapeSiteOverviewMock = {
        siteId: 5,
        name: 'Faith LCM Lab - Xcape site',
        siteType: {
          siteTypeId: 2,
          name: 'XCape',
          description: 'For sites with XCape',
        },
        totalSystemOutput: {
          currentFlow: 0,
          units: 'Watt',
          ts: 1621552122000,
        },
        siteStatus: {
          value: 2,
          symbolName: 'FAULTED',
        },
        commStatus: {
          value: 1,
          symbolName: 'Landline',
        },
        lastDataReceived: 'May 20, 2021, 18:08:42 PM',
        powerGrid: {
          gridStatus: {
            value: 2,
            symbolName: 'FAULTED',
          },
          powerGridFlow: {
            currentFlow: 0,
            units: 'Watt',
            ts: 1621552122000,
          },
        },
        microGrid: {
          isConnected: true,
        },
        microGridConsumption: [
          {
            deviceGroupId: 9,
            name: 'CDEMAND',
            description: 'Customer Demand',
            deviceGroupStatusId: 5,
            totalLoad: {
              currentFlow: 0,
              units: 'Watt',
              ts: 1621552122000,
            },
            gridFlow: {
              currentFlow: 0,
              units: 'Watt',
              ts: 1621552122000,
            },
            dcBusFlow: {
              currentFlow: 0,
              units: 'Watt',
              ts: 1621552122000,
            },
            inverter: {
              cumulativePower: 0,
              units: 'VA',
              ts: 0,
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
              currentFlow: 0,
              units: 'Watt',
              ts: 1621552122000,
            },
            maxPowerRating: {
              currentFlow: 1000,
              units: 'Watt',
              ts: 1621552122000,
            },
            inverter: {
              cumulativePower: 42000,
              units: 'VA',
              ts: 1621552122000,
            },
            state: 1,
          },
          {
            deviceGroupId: 4,
            name: 'RENGINE',
            description: 'R. Engine',
            deviceGroupStatusId: 2,
            gridFlow: {
              currentFlow: 0,
              units: 'Watt',
              ts: 1621552122000,
            },
            maxPowerRating: {
              currentFlow: 8000,
              units: 'Watt',
              ts: 1621552122000,
            },
            inverter: {
              cumulativePower: 0,
              units: 'VA',
              ts: 0,
            },
            state: 1,
          },
          {
            deviceGroupId: 1,
            name: 'BATT',
            description: 'Battery',
            deviceGroupStatusId: 2,
            gridFlow: {
              currentFlow: 539.553,
              units: 'Watt',
              ts: 1621552122000,
            },
            maxPowerRating: {
              currentFlow: 88000,
              units: 'Watt',
              ts: 1621552122000,
            },
            currentCapacity: {
              currentFlow: 25.0625,
              units: '%',
              ts: 1621552122000,
            },
            inverter: {
              cumulativePower: 0,
              units: 'VA',
              ts: 0,
            },
            state: 1,
          },
          {
            deviceGroupId: 10,
            name: 'INV',
            description: 'Inverter',
            gridFlow: {
              currentFlow: 0,
              units: 'Watt',
              ts: 0,
            },
            maxPowerRating: {
              currentFlow: 0,
              units: 'Watt',
              ts: 0,
            },
            currentCapacity: null,
            inverter: {
              cumulativePower: 20000,
              units: 'VA',
              ts: 1621552122000,
            },
          },
        ],
      };
    });

    it('should return an empty array when null value is sent as parameter', () => {
      const expectedSystemConfig = [];
      const actualSystemConfig = getSystemDiagramConfiguration(null);

      expect(actualSystemConfig).toStrictEqual(expectedSystemConfig);
    });

    it('should return a valid Ignition Site UI configuration', () => {
      const expectedSystemConfig = [
        {
          deviceType: 'POWERGRID',
          x: 17,
          y: 237,
          wires: [{ x: 85, y: 277, segments: [{ direction: 1, length: 30 }] }],
          gridStatus: { value: 1, symbolName: 'MAINTENANCE' },
          powerGridFlow: {
            currentFlow: 2455,
            units: 'Watt',
            ts: 1645729090333,
          },
        },
        {
          deviceType: 'GID',
          x: 104,
          y: 258,
          wires: [
            {
              x: 85,
              y: 277,
              segments: [
                { direction: 1, length: 81 },
                { direction: 2, length: -96 },
                { direction: 1, length: 50 },
              ],
              flowDirection: 1,
            },
            {
              x: 85,
              y: 277,
              segments: [
                { direction: 1, length: 81 },
                { direction: 2, length: 96 },
                { direction: 1, length: 50 },
              ],
              flowDirection: 2,
            },
          ],
          isConnected: true,
        },
        {
          deviceType: 'FLEET',
          x: 165,
          y: 94,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: {
            cumulativePower: 777,
            units: 'kVA',
            ts: 1645729086211,
            deviceType: 'INV',
            x: 218,
            y: 165,
          },
          wires: [
            {
              x: 218,
              y: 167,
              segments: [{ direction: 2, length: 100 }],
              flowDirection: 1,
            },
          ],
          deviceGroupId: 8,
          name: 'FLEET',
          description: 'Fleet',
          deviceGroupStatusId: 2,
          totalLoad: { currentFlow: 1467, units: 'kW', ts: 1645729090333 },
          gridFlow: { currentFlow: 789, units: 'kW', ts: 1645729090333 },
          dcBusFlow: { currentFlow: 678, units: 'kW', ts: 1645729090333 },
        },
        {
          deviceType: 'EV',
          x: 380,
          y: 94,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: {
            cumulativePower: 3.24,
            units: 'kVA',
            ts: 1645729086211,
            deviceType: 'INV',
            x: 383,
            y: 165,
          },
          wires: [
            {
              x: 383,
              y: 167,
              segments: [{ direction: 2, length: 100 }],
              flowDirection: 0,
            },
            {
              name: 'evToFleetWire',
              x: 220,
              y: 181,
              segments: [{ direction: 1, length: 165 }],
              flowDirection: 0,
            },
          ],
          deviceGroupId: 7,
          name: 'EV',
          description: 'EV',
          deviceGroupStatusId: 3,
          totalLoad: { currentFlow: 0, units: 'kW', ts: 1645729090333 },
          gridFlow: { currentFlow: 0, units: 'kW', ts: 1645729090333 },
          dcBusFlow: { currentFlow: 0, units: 'kW', ts: 1645729090333 },
        },
        {
          deviceType: 'ACLOAD',
          x: 525,
          y: 468,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: {
            cumulativePower: 5.5,
            units: 'kVA',
            ts: 1645729086211,
            deviceType: 'INV',
            x: 529,
            y: 290,
          },
          wires: [
            {
              x: 529,
              y: 389,
              segments: [{ direction: 2, length: -100 }],
              flowDirection: 2,
            },
          ],
          deviceGroupId: 6,
          name: 'ACLOAD',
          description: 'Load / AC',
          deviceGroupStatusId: 5,
          totalLoad: { currentFlow: 343.43, units: 'kW', ts: 1645729090333 },
          gridFlow: { currentFlow: 343.43, units: 'kW', ts: 1645729090333 },
          dcBusFlow: { currentFlow: 0, units: null, ts: 0 },
        },
        {
          deviceType: 'DCLOAD',
          x: 545,
          y: 94,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: {
            cumulativePower: 555,
            units: 'kW',
            ts: 1645729086211,
            deviceType: 'INV',
            x: 549,
            y: 165,
            labelName: 'DCDC',
          },
          wires: [
            {
              x: 549,
              y: 167,
              segments: [{ direction: 2, length: 100 }],
              flowDirection: 0,
            },
          ],
          deviceGroupId: 5,
          name: 'DCLOAD',
          description: 'Load / DC',
          deviceGroupStatusId: 4,
          totalLoad: { currentFlow: 0, units: null, ts: 1645729090333 },
          gridFlow: { currentFlow: 0, units: null, ts: 1645729090333 },
          dcBusFlow: { currentFlow: 0, units: null, ts: 0 },
        },
        {
          deviceType: 'CDEMAND',
          x: 165,
          y: 468,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: {
            cumulativePower: 4.4,
            units: 'kVA',
            ts: 1645729086211,
            deviceType: 'INV',
            x: 218,
            y: 290,
          },
          wires: [
            {
              x: 218,
              y: 389,
              segments: [{ direction: 2, length: -100 }],
              flowDirection: 0,
            },
          ],
          deviceGroupId: 9,
          name: 'CDEMAND',
          description: 'Customer Demand',
          deviceGroupStatusId: 2,
          totalLoad: { currentFlow: 357, units: 'kW', ts: 1645730123011 },
          gridFlow: { currentFlow: 357, units: 'kW', ts: 1645730283761 },
          dcBusFlow: { currentFlow: 0, units: 'kW', ts: 1645730123011 },
        },
        {
          deviceType: 'PDC',
          x: 781,
          y: 94,
          isMicrogrid: true,
          inverter: {
            cumulativePower: 5.5,
            units: 'kW',
            ts: 1645729086211,
            deviceType: 'INV',
            x: 796,
            y: 165,
            labelName: 'DCDC',
          },
          wires: [
            {
              x: 796,
              y: 167,
              segments: [{ direction: 2, length: 100 }],
              flowDirection: 2,
            },
          ],
          deviceGroupId: 2,
          name: 'PDC',
          description: 'Solar',
          deviceGroupStatusId: 1,
          gridFlow: { currentFlow: 765, units: 'kW', ts: 1645729090333 },
          maxPowerRating: {
            currentFlow: 240,
            units: 'kWDC',
            ts: 1645729086211,
          },
          currentCapacity: null,
          gridFlowPower: null,
          state: null,
        },
        {
          deviceType: 'WIND',
          x: 940,
          y: 94,
          isMicrogrid: true,
          inverter: {
            cumulativePower: 5.5,
            units: 'kVA',
            ts: 1645729086211,
            deviceType: 'INV',
            x: 951,
            y: 166,
          },
          wires: [
            {
              x: 951,
              y: 167,
              segments: [{ direction: 2, length: 100 }],
              flowDirection: 2,
            },
          ],
          deviceGroupId: 3,
          name: 'WIND',
          description: 'Wind',
          deviceGroupStatusId: 5,
          gridFlow: { currentFlow: 432, units: 'kW', ts: 1645729090333 },
          maxPowerRating: {
            currentFlow: 0.12,
            units: 'Watt',
            ts: 1645729086211,
          },
          currentCapacity: null,
          gridFlowPower: null,
          state: null,
        },
        {
          deviceType: 'BATT',
          x: 1045,
          y: 468,
          isMicrogrid: true,
          inverter: {
            cumulativePower: 0.666,
            units: 'kW',
            ts: 1645729086211,
            deviceType: 'INV',
            x: 1026,
            y: 290,
            labelName: 'DCDC',
          },
          wires: [
            {
              x: 1026,
              y: 389,
              segments: [{ direction: 2, length: -100 }],
              flowDirection: 1,
            },
          ],
          deviceGroupId: 1,
          name: 'BATT',
          description: 'Battery',
          deviceGroupStatusId: 2,
          gridFlow: { currentFlow: 1500, units: 'kW', ts: 1645729090333 },
          maxPowerRating: {
            currentFlow: 7.888,
            units: 'kWh',
            ts: 1645729086211,
          },
          currentCapacity: { currentFlow: 50, units: '%', ts: 1645729090333 },
          gridFlowPower: { currentFlow: 246, units: 'kWh', ts: 1645729090333 },
          state: 1,
        },
        {
          deviceType: 'RENGINE',
          x: 712,
          y: 468,
          isMicrogrid: true,
          inverter: {
            cumulativePower: 5.5,
            units: 'kVA',
            ts: 1645729086211,
            deviceType: 'INV',
            x: 716,
            y: 290,
          },
          wires: [
            {
              x: 716,
              y: 389,
              segments: [{ direction: 2, length: -100 }],
              flowDirection: 2,
            },
          ],
          deviceGroupId: 4,
          name: 'RENGINE',
          description: 'R. Engine',
          deviceGroupStatusId: 3,
          gridFlow: { currentFlow: 3000, units: 'Watt', ts: 1645729090333 },
          maxPowerRating: {
            currentFlow: 120,
            units: 'Watt',
            ts: 1645729086211,
          },
          currentCapacity: null,
          gridFlowPower: null,
          state: null,
        },
      ];
      const actualSystemConfig = getSystemDiagramConfiguration(
        ignitionSiteOverviewMock,
        true,
        true,
        true
      );

      expect(actualSystemConfig).toStrictEqual(expectedSystemConfig);
    });

    it('should return a valid Xcape Site UI configuration', () => {
      const expectedSystemConfig = [
        {
          deviceType: 'POWERGRID',
          x: 17,
          y: 237,
          wires: [
            {
              x: 85,
              y: 277,
              segments: [
                {
                  direction: 1,
                  length: 30,
                },
              ],
            },
          ],
          gridStatus: {
            value: 2,
            symbolName: 'FAULTED',
          },
          powerGridFlow: {
            currentFlow: 0,
            units: 'Watt',
            ts: 1621552122000,
          },
        },
        {
          deviceType: 'GID',
          x: 104,
          y: 258,
          wires: [
            {
              flowDirection: 0,
              x: 218,
              y: 277,
              segments: [
                {
                  direction: 1,
                  length: -140,
                },
              ],
            },
            {
              flowDirection: 0,
              x: 342,
              y: 277,
              segments: [
                {
                  direction: 1,
                  length: -124,
                },
              ],
            },
          ],
          isConnected: true,
        },
        {
          deviceType: 'CDEMAND',
          x: 165,
          y: 468,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: undefined,
          wires: [
            {
              x: 218,
              y: 279,
              segments: [
                {
                  direction: 2,
                  length: 105,
                },
              ],
              flowDirection: 0,
            },
          ],
          deviceGroupId: 9,
          name: 'CDEMAND',
          description: 'Customer Demand',
          deviceGroupStatusId: 5,
          totalLoad: {
            currentFlow: 0,
            units: 'Watt',
            ts: 1621552122000,
          },
          gridFlow: {
            currentFlow: 0,
            units: 'Watt',
            ts: 1621552122000,
          },
          dcBusFlow: {
            currentFlow: 0,
            units: 'Watt',
            ts: 1621552122000,
          },
        },
        {
          deviceType: 'INV',
          x: 350,
          y: 214,
          width: 122,
          height: 62,
          isCenteredLabel: true,
          isMicrogrid: true,
          cumulativePower: 20000,
          units: 'VA',
          ts: 1621552122000,
          wires: undefined,
        },
        {
          deviceType: 'PDC',
          x: 781,
          y: 94,
          isMicrogrid: true,
          inverter: {
            cumulativePower: 42000,
            units: 'VA',
            ts: 1621552122000,
            deviceType: 'INV',
            labelName: 'DCDC',
            x: 796,
            y: 165,
          },
          wires: [
            {
              x: 796,
              y: 167,
              segments: [
                {
                  direction: 2,
                  length: 100,
                },
              ],
              flowDirection: 0,
            },
          ],
          deviceGroupId: 2,
          name: 'PDC',
          description: 'Solar',
          deviceGroupStatusId: 5,
          gridFlow: {
            currentFlow: 0,
            units: 'Watt',
            ts: 1621552122000,
          },
          maxPowerRating: {
            currentFlow: 1000,
            units: 'Watt',
            ts: 1621552122000,
          },
          state: 1,
        },
        {
          deviceType: 'BATT',
          x: 1045,
          y: 468,
          isMicrogrid: true,
          inverter: undefined,
          wires: [
            {
              x: 1026,
              y: 389,
              segments: [
                {
                  direction: 2,
                  length: -100,
                },
              ],
              flowDirection: 1,
            },
          ],
          deviceGroupId: 1,
          name: 'BATT',
          description: 'Battery',
          deviceGroupStatusId: 2,
          gridFlow: {
            currentFlow: 539.553,
            units: 'Watt',
            ts: 1621552122000,
          },
          maxPowerRating: {
            currentFlow: 88000,
            units: 'Watt',
            ts: 1621552122000,
          },
          currentCapacity: {
            currentFlow: 25.0625,
            units: '%',
            ts: 1621552122000,
          },
          state: 1,
        },
        {
          deviceType: 'RENGINE',
          x: 712,
          y: 468,
          isMicrogrid: true,
          wires: [
            {
              x: 716,
              y: 389,
              segments: [
                {
                  direction: 2,
                  length: -60,
                },
                {
                  direction: 1,
                  length: -310,
                },
                {
                  direction: 2,
                  length: -20,
                },
              ],
              flowDirection: 0,
            },
          ],
          deviceGroupId: 4,
          name: 'RENGINE',
          description: 'R. Engine',
          deviceGroupStatusId: 2,
          inverter: undefined,
          gridFlow: {
            currentFlow: 0,
            units: 'Watt',
            ts: 1621552122000,
          },
          maxPowerRating: {
            currentFlow: 8000,
            units: 'Watt',
            ts: 1621552122000,
          },
          state: 1,
        },
      ];
      const actualSystemConfig = getSystemDiagramConfiguration(
        xcapeSiteOverviewMock
      );

      expect(actualSystemConfig).toStrictEqual(expectedSystemConfig);
    });

    it('should return a discharging value for Battery flow', () => {
      const batteryItem = ignitionSiteOverviewMock.microGridProductionAssets.find(
        (item) => item.name === DeviceListTypeId.Battery
      );
      batteryItem.state = EssState.Discharging;

      const actualSystemConfig = getSystemDiagramConfiguration(
        ignitionSiteOverviewMock
      );

      const actualBatteryItem = actualSystemConfig.find(
        (item) => item.name === DeviceListTypeId.Battery
      );

      const expectedBatteryFlow = FlowDirection.EndToStart;
      const actualBatteryFlow = actualBatteryItem.wires[0].flowDirection;

      expect(actualBatteryFlow).toStrictEqual(expectedBatteryFlow);
    });

    it('should return a Diagram configuration', () => {
      // const EV_TO_FLEET_WIRE = 'evToFleetWire';
      const expectedDiagram = [
        {
          deviceType: 'POWERGRID',
          x: 17,
          y: 237,
          wires: [{ x: 85, y: 277, segments: [{ direction: 1, length: 30 }] }],
        },
        {
          deviceType: 'GID',
          x: 104,
          y: 258,
          wires: [
            {
              x: 85,
              y: 277,
              segments: [
                { direction: 1, length: 81 },
                { direction: 2, length: -96 },
                { direction: 1, length: 50 },
              ],
            },
            {
              x: 85,
              y: 277,
              segments: [
                { direction: 1, length: 81 },
                { direction: 2, length: 96 },
                { direction: 1, length: 50 },
              ],
            },
          ],
        },
        {
          deviceType: 'FLEET',
          x: 165,
          y: 94,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 218, y: 165 },
          wires: [
            { x: 218, y: 167, segments: [{ direction: 2, length: 100 }] },
          ],
        },
        {
          deviceType: 'EV',
          x: 380,
          y: 94,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 383, y: 165 },
          wires: [
            { x: 383, y: 167, segments: [{ direction: 2, length: 100 }] },
            {
              name: 'evToFleetWire',
              x: 220,
              y: 181,
              segments: [{ direction: 1, length: 165 }],
            },
          ],
        },
        {
          deviceType: 'ACLOAD',
          x: 525,
          y: 468,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 529, y: 290 },
          wires: [
            { x: 529, y: 389, segments: [{ direction: 2, length: -100 }] },
          ],
        },
        {
          deviceType: 'DCLOAD',
          x: 545,
          y: 94,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 549, y: 165, labelName: 'DCDC' },
          wires: [
            { x: 549, y: 167, segments: [{ direction: 2, length: 100 }] },
          ],
        },
        {
          deviceType: 'CDEMAND',
          x: 165,
          y: 468,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 218, y: 290 },
          wires: [
            { x: 218, y: 389, segments: [{ direction: 2, length: -100 }] },
          ],
        },
        {
          deviceType: 'PDC',
          x: 781,
          y: 94,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 796, y: 165, labelName: 'DCDC' },
          wires: [
            { x: 796, y: 167, segments: [{ direction: 2, length: 100 }] },
          ],
        },
        {
          deviceType: 'WIND',
          x: 940,
          y: 94,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 951, y: 166 },
          wires: [
            { x: 951, y: 167, segments: [{ direction: 2, length: 100 }] },
          ],
        },
        {
          deviceType: 'BATT',
          x: 1045,
          y: 468,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 1026, y: 290, labelName: 'DCDC' },
          wires: [
            { x: 1026, y: 389, segments: [{ direction: 2, length: -100 }] },
          ],
        },
        {
          deviceType: 'RENGINE',
          x: 712,
          y: 468,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 716, y: 290 },
          wires: [
            { x: 716, y: 389, segments: [{ direction: 2, length: -100 }] },
          ],
        },
      ];
      const diagramConfiguration = getSystemDiagramConfigurationIgnition(
        true,
        true,
        true
      );

      expect(diagramConfiguration).toStrictEqual(expectedDiagram);
    });

    it('should return a Diagram configuration withput fleet', () => {
      const expectedDiagram = [
        {
          deviceType: 'POWERGRID',
          x: 17,
          y: 237,
          wires: [{ x: 85, y: 277, segments: [{ direction: 1, length: 30 }] }],
        },
        {
          deviceType: 'GID',
          x: 104,
          y: 258,
          wires: [
            {
              x: 85,
              y: 277,
              segments: [
                { direction: 1, length: 81 },
                { direction: 2, length: -96 },
                { direction: 1, length: 218 },
              ],
            },
            {
              x: 85,
              y: 277,
              segments: [
                { direction: 1, length: 81 },
                { direction: 2, length: 96 },
                { direction: 1, length: 50 },
              ],
            },
          ],
        },
        {
          deviceType: 'FLEET',
          x: 165,
          y: 94,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 218, y: 165 },
          wires: [
            { x: 218, y: 167, segments: [{ direction: 2, length: 100 }] },
          ],
        },
        {
          deviceType: 'EV',
          x: 380,
          y: 94,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 383, y: 165 },
          wires: [
            { x: 383, y: 167, segments: [{ direction: 2, length: 100 }] },
            {
              name: 'evToFleetWire',
              x: 220,
              y: 181,
              segments: [{ direction: 1, length: 0 }],
            },
          ],
        },
        {
          deviceType: 'ACLOAD',
          x: 525,
          y: 468,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 529, y: 290 },
          wires: [
            { x: 529, y: 389, segments: [{ direction: 2, length: -100 }] },
          ],
        },
        {
          deviceType: 'DCLOAD',
          x: 545,
          y: 94,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 549, y: 165, labelName: 'DCDC' },
          wires: [
            { x: 549, y: 167, segments: [{ direction: 2, length: 100 }] },
          ],
        },
        {
          deviceType: 'CDEMAND',
          x: 165,
          y: 468,
          isMicroGridConsumption: true,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 218, y: 290 },
          wires: [
            { x: 218, y: 389, segments: [{ direction: 2, length: -100 }] },
          ],
        },
        {
          deviceType: 'PDC',
          x: 781,
          y: 94,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 796, y: 165, labelName: 'DCDC' },
          wires: [
            { x: 796, y: 167, segments: [{ direction: 2, length: 100 }] },
          ],
        },
        {
          deviceType: 'WIND',
          x: 940,
          y: 94,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 951, y: 166 },
          wires: [
            { x: 951, y: 167, segments: [{ direction: 2, length: 100 }] },
          ],
        },
        {
          deviceType: 'BATT',
          x: 1045,
          y: 468,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 1026, y: 290, labelName: 'DCDC' },
          wires: [
            { x: 1026, y: 389, segments: [{ direction: 2, length: -100 }] },
          ],
        },
        {
          deviceType: 'RENGINE',
          x: 712,
          y: 468,
          isMicrogrid: true,
          inverter: { deviceType: 'INV', x: 716, y: 290 },
          wires: [
            { x: 716, y: 389, segments: [{ direction: 2, length: -100 }] },
          ],
        },
      ];

      const diagramConfiguration = getSystemDiagramConfigurationIgnition(
        true,
        false,
        true
      );

      expect(diagramConfiguration).toStrictEqual(expectedDiagram);
    });
  });

  describe('displaySystemDiagram', () => {
    let ignitionSiteOverviewMock;

    beforeEach(() => {
      ignitionSiteOverviewMock = {
        siteId: 2,
        name: 'Butler Foods Distribution Center',
        siteType: {
          siteTypeId: 1,
          name: 'Ignition',
          description: 'For sites using Ignition',
        },
        microGridConsumption: [
          {
            deviceGroupId: 7,
            name: 'EV',
            description: 'EV',
            deviceGroupStatusId: 1,
            totalLoad: {
              currentFlow: 223.0,
              units: 'Watt',
              ts: null,
            },
            gridFlow: {
              currentFlow: 0.0,
              units: 'Watt',
              ts: 1619043837769,
            },
            dcBusFlow: {
              currentFlow: 223.0,
              units: 'Watt',
              ts: 1619043837769,
            },
            inverter: {
              cummulativePower: 3240.0,
              unitMeasurement: 'VA',
              ts: 1619043838943,
            },
          },
        ],
        microGridProductionAssets: [
          {
            deviceGroupId: 2,
            name: 'PDC',
            description: 'Solar',
            deviceGroupStatusId: 3,
            gridFlow: {
              currentFlow: 222.0,
              units: 'Watt',
              ts: 1619043837769,
            },
            maxPowerRating: {
              currentFlow: 140.0,
              units: 'Watt',
              ts: 1619043838943,
            },
            currentCapacity: null,
            inverter: {
              cummulativePower: 5500.0,
              unitMeasurement: 'VA',
              ts: 1619043838943,
            },
          },
        ],
      };
    });

    it('should false true when when null value is sent as parameter', () => {
      const actualDisplayDiagram = displaySystemDiagram(null);

      expect(actualDisplayDiagram).toBeFalsy();
    });

    it('should return false when microGridConsumption, microGridProductionAssets contain elements and siteTypeId is invalid ', () => {
      delete ignitionSiteOverviewMock.siteType;

      const actualDisplayDiagram = displaySystemDiagram(
        ignitionSiteOverviewMock
      );

      expect(actualDisplayDiagram).toBeFalsy();
    });

    it('should return false when microGridConsumption, microGridProductionAssets do not contain elements and siteTypeId valid ', () => {
      delete ignitionSiteOverviewMock.microGridConsumption;
      delete ignitionSiteOverviewMock.microGridProductionAssets;

      const actualDisplayDiagram = displaySystemDiagram(
        ignitionSiteOverviewMock
      );

      expect(actualDisplayDiagram).toBeFalsy();
    });

    it('should return true when microGridConsumption, microGridProductionAssets contain elements and siteTypeId is valid ', () => {
      const actualDisplayDiagram = displaySystemDiagram(
        ignitionSiteOverviewMock
      );

      expect(actualDisplayDiagram).toBeTruthy();
    });
  });

  describe('getElectricityFlowDirection', () => {
    it('Solar should have no flow', () => {
      const flowDirection = getElectricityFlowDirection(
        { currentFlow: -222 },
        'PDC'
      );
      expect(flowDirection).toEqual(0);
    });
    it('Solar should have flow', () => {
      const flowDirection = getElectricityFlowDirection(
        { currentFlow: 222 },
        'PDC'
      );
      expect(flowDirection).toEqual(2);
    });
    it('Solar should have no flow', () => {
      const flowDirection = getElectricityFlowDirection(
        { currentFlow: 0 },
        'PDC'
      );
      expect(flowDirection).toEqual(0);
    });

    it('EV should have inverted flow', () => {
      const flowDirection = getElectricityFlowDirection(
        { currentFlow: -223 },
        'EV'
      );
      expect(flowDirection).toEqual(2);
    });
    it('EV should have flow', () => {
      const flowDirection = getElectricityFlowDirection(
        { currentFlow: 223 },
        'EV'
      );
      expect(flowDirection).toEqual(1);
    });
    it('EV should have no flow', () => {
      const flowDirection = getElectricityFlowDirection(
        { currentFlow: 0 },
        'EV'
      );
      expect(flowDirection).toEqual(0);
    });
  });

  describe('getElectricityEvtoFleetFlowDirection', () => {
    it('EV to Fleet should have no flow', () => {
      const flowDirection = getElectricityEvtoFleetFlowDirection(0);
      expect(flowDirection).toEqual(0);
    });
    it('EV to Fleet should flow from right to left', () => {
      const flowDirection = getElectricityEvtoFleetFlowDirection(223);
      expect(flowDirection).toEqual(1);
    });
    it('EV to Fleet should flow from left to right', () => {
      const flowDirection = getElectricityEvtoFleetFlowDirection(-223);
      expect(flowDirection).toEqual(2);
    });
  });

  describe('getElectricityPathV', () => {
    it('V wire should have no flow', () => {
      const flowDirection = getElectricityPathV(
        {
          currentFlow: 0,
        },
        {
          currentFlow: 0,
        }
      );
      expect(flowDirection).toEqual(0);
    });
    it('V wire should flow start to end', () => {
      const flowDirection = getElectricityPathV(
        {
          currentFlow: 10,
        },
        {
          currentFlow: 10,
        }
      );
      expect(flowDirection).toEqual(1);
    });
    it('V wire should flow end to start', () => {
      const flowDirection = getElectricityPathV(
        {
          currentFlow: -10,
        },
        {
          currentFlow: -10,
        }
      );
      expect(flowDirection).toEqual(2);
    });
  });
});
