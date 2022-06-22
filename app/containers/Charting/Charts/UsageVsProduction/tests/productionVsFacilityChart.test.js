import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ProductionVsFacilityChart from '../productionVsFacilityChart';

const productionVsFacilityUseMock = [
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
];
const configMock = {
  config: {
    interval: { value: 'Month', text: 'By Month' },
    scale: { value: 'Auto', text: 'Auto' },
  },
};

describe('< ProductionVsFacilityChart />', () => {
  describe('Mount the component', () => {
    const mountComponent = (props) =>
      mount(
        <IntlProvider locale="en">
          <ProductionVsFacilityChart {...props} />
        </IntlProvider>
      );

    it('should render < ProductionVsFacilityChart /> component when no props are sent', () => {
      const expected = true;
      const productionVsFacilityChartWrapper = mountComponent(configMock);

      const actual = productionVsFacilityChartWrapper.exists();
      expect(actual).toBe(expected);
    });

    it('should render < ProductionVsFacilityChart /> component when data props are sent', () => {
      const expected = true;
      const productionVsFacilityChartWrapper = mountComponent({
        data: productionVsFacilityUseMock,
        ...configMock,
      });

      const actual = productionVsFacilityChartWrapper.exists();
      expect(actual).toBe(expected);
    });
  });
});
