import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import SolarProductionChart from '../solarProduction';

describe('SolarProduction', () => {
  const mountComponent = (props) =>
    mount(
      <IntlProvider locale="en">
        <SolarProductionChart {...props} />
      </IntlProvider>
    );
  const solarProductionMock = [
    {
      name: 1,
      value: 1.0,
      group: 'Solar',
    },
    {
      name: 3,
      value: 0.15,
      group: 'Solar',
    },
    {
      name: 5,
      value: 0.09,
      group: 'Solar',
    },
  ];
  const configMock = {
    config: {
      interval: { value: 'Month', text: 'By Month' },
      scale: { value: 'Auto', text: 'Auto' },
    },
  };
  describe('#constructor', () => {
    const wrapper = mountComponent(configMock);
    it('should mount component', () => {
      const expected = true;
      const actual = wrapper.exists();
      expect(actual).toBe(expected);
    });
  });
  describe('#OutRangeAlert', () => {
    it('should not display OutRangeAlert when scale is auto', () => {
      const config = {
        ...configMock.config,
        scale: 'Auto',
      };

      const expected = false;
      const wrapper = mountComponent({
        data: solarProductionMock,
        config,
      });

      const actual = wrapper
        .find('[data-testid="content-outRangealertContainer"]')
        .first()
        .exists();

      expect(actual).toBe(expected);
    });

    it('should not display OutRangeAlert when scale is greater than max value from chart data', () => {
      const config = {
        ...configMock.config,
        scale: '1000 kW',
      };

      const expected = false;
      const wrapper = mountComponent({
        data: solarProductionMock,
        config,
      });

      const actual = wrapper
        .find('[data-testid="content-outRangealertContainer"]')
        .first()
        .exists();

      expect(actual).toBe(expected);
    });

    it('should display OutRangeAlert when scale is less than max value from chart data', () => {
      const config = {
        ...configMock.config,
        scale: '100 kW',
      };

      const expected = true;
      const wrapper = mountComponent({
        data: solarProductionMock,
        config,
      });

      const actual = wrapper
        .find('[data-testid="content-outRangealertContainer"]')
        .first()
        .exists();

      expect(actual).toBe(expected);
    });
  });
});
