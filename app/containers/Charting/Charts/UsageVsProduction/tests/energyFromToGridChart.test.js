import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import EnergyFromToGridChart from '../energyFromToGridChart';

const energyToFromGridChartMock = [
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
];
const configMock = {
  config: {
    interval: { value: 'Month', text: 'By Month' },
    scale: { value: 'Auto', text: 'Auto' },
  },
};

describe('< EnergyFromToGridChart />', () => {
  describe('Mount the component', () => {
    const mountComponent = (props) =>
      mount(
        <IntlProvider locale="en">
          <EnergyFromToGridChart {...props} />
        </IntlProvider>
      );

    it('should render < EnergyFromToGridChart /> component when no props are sent', () => {
      const expected = true;
      const energyFromToGridChartWrapper = mountComponent(configMock);

      const actual = energyFromToGridChartWrapper.exists();
      expect(actual).toBe(expected);
    });

    it('should render < EnergyFromToGridChart /> component when data props are sent', () => {
      const expected = true;
      const energyFromToGridChartWrapper = mountComponent({
        data: energyToFromGridChartMock,
        ...configMock,
      });

      const actual = energyFromToGridChartWrapper.exists();
      expect(actual).toBe(expected);
    });
  });
});
