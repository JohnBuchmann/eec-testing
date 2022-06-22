import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import UsageVsProductionCharts from '../index';

const productionVsFacilityUseChartsMock = {
  productionVsFacilityUse: [
    {
      group: '00:00',
      values: [
        [
          {
            name: 'Facility Use',
            value: 80,
            group: null,
          },
        ],
        [
          {
            name: 'Solar',
            value: 65,
            group: null,
          },
          {
            name: 'Wind',
            value: 100,
            group: null,
          },
          {
            name: 'Microturbine',
            value: 135,
            group: null,
          },
          {
            name: 'Reciprocating Engine',
            value: 135,
            group: null,
          },
        ],
      ],
    },
    {
      group: '02:00',
      values: [
        [
          {
            name: 'Facility Use',
            value: 80,
            group: null,
          },
        ],
        [
          {
            name: 'Solar',
            value: 65,
            group: null,
          },
          {
            name: 'Wind',
            value: 100,
            group: null,
          },
          {
            name: 'Microturbine',
            value: 135,
            group: null,
          },
          {
            name: 'Reciprocating Engine',
            value: 135,
            group: null,
          },
        ],
      ],
    },
  ],
  energyToFromGrid: [
    {
      group: '00:00',
      values: [
        [
          {
            name: 'Energy provided by the Grid',
            value: 80,
            group: null,
          },
        ],
        [
          {
            name: 'Energy sent to the Grid',
            value: 65,
            group: null,
          },
        ],
      ],
    },
    {
      group: '02:00',
      values: [
        [
          {
            name: 'Energy provided by the Grid',
            value: 65,
            group: null,
          },
        ],
        [
          {
            name: 'Energy sent to the Grid',
            value: 30,
            group: null,
          },
        ],
      ],
    },
  ],
  averageEnergyUse: [
    {
      name: '00:00',
      value: 80,
      group: '2021-02-18',
    },
    {
      name: '02:00',
      value: 100,
      group: '2021-02-18',
    },
    {
      name: '04:00',
      value: 90,
      group: '2021-02-18',
    },
  ],
  maxEnergyDemand: [
    {
      name: '00:00',
      value: 80,
      group: 'January',
    },
    {
      name: '02:00',
      value: 100,
      group: 'January',
    },
    {
      name: '04:00',
      value: 90,
      group: 'January',
    },
  ],
  peakDemandByMonth: [
    {
      name: '00:00',
      value: 80,
      group: null,
    },
    {
      name: '01:00',
      value: 65,
      group: null,
    },
    {
      name: '02:00',
      value: 100,
      group: null,
    },
  ],
};
const configMock = {
  reportConfig: {
    interval: { value: 'Month', text: 'By Month' },
    scale: { value: 'Auto', text: 'Auto' },
  },
};

describe('< UsageVsProductionCharts />', () => {
  describe('Mount the component', () => {
    const mountComponent = (props) =>
      mount(
        <IntlProvider locale="en">
          <UsageVsProductionCharts {...props} />
        </IntlProvider>
      );

    it('should render < UsageVsProductionCharts /> component when no props are sent', () => {
      const expected = true;
      const usageVsProductionChartsWrapper = mountComponent(configMock);

      let actual = usageVsProductionChartsWrapper.exists();
      expect(actual).toBe(expected);

      actual = usageVsProductionChartsWrapper
        .find('[data-testid="chartContainer-usageVsProduction"]')
        .first()
        .exists();
      expect(actual).toBe(expected);

      actual = usageVsProductionChartsWrapper
        .find('[data-testid="chartContainer-energyToFromGrid"]')
        .first()
        .exists();
      expect(actual).toBe(expected);

      actual = usageVsProductionChartsWrapper
        .find('[data-testid="chartContainer-averageEnergyUse"]')
        .first()
        .exists();
      expect(actual).toBe(expected);

      actual = usageVsProductionChartsWrapper
        .find('[data-testid="chartContainer-maxEnergyDemand"]')
        .first()
        .exists();
      expect(actual).toBe(expected);
    });

    it('should render < UsageVsProductionCharts /> component when props data is sent', () => {
      const expected = true;
      const usageVsProductionChartsWrapper = mountComponent({
        ...productionVsFacilityUseChartsMock,
        ...configMock,
      });

      let actual = usageVsProductionChartsWrapper.exists();
      expect(actual).toBe(expected);

      actual = usageVsProductionChartsWrapper
        .find('[data-testid="chartContainer-usageVsProduction"]')
        .first()
        .exists();
      expect(actual).toBe(expected);

      actual = usageVsProductionChartsWrapper
        .find('[data-testid="chartContainer-energyToFromGrid"]')
        .first()
        .exists();
      expect(actual).toBe(expected);

      actual = usageVsProductionChartsWrapper
        .find('[data-testid="chartContainer-averageEnergyUse"]')
        .first()
        .exists();
      expect(actual).toBe(expected);

      actual = usageVsProductionChartsWrapper
        .find('[data-testid="chartContainer-maxEnergyDemand"]')
        .first()
        .exists();
      expect(actual).toBe(expected);
    });
  });
});
