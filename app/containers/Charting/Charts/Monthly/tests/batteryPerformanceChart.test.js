import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import BatteryPerformanceChart from '../batteryPerformance';

describe('BatteryPerformanceChart', () => {
  const mountComponent = (props) =>
    mount(
      <IntlProvider locale="en">
        <BatteryPerformanceChart {...props} />
      </IntlProvider>
    );
  const batteryPerformanceMock = {
    socs: [
      {
        date: '2021-08-25T22:27',
        value: 1.0,
        group: 'SoC',
      },
      {
        date: '2021-08-25T22:28',
        value: 0.15,
        group: 'SoC',
      },
      {
        date: '2021-08-25T22:29',
        value: 0.09,
        group: 'SoC',
      },
    ],
    batteryPowers: [
      {
        date: '2021-08-25T22:27',
        value: 1.0,
        group: 'Battery Power',
      },
      {
        date: '2021-08-25T22:28',
        value: 0.15,
        group: 'Battery Power',
      },
      {
        date: '2021-08-25T22:29',
        value: 0.09,
        group: 'Battery Power',
      },
    ],
  };

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

    // it()
  });
  describe('#OutRangeAlert', () => {
    it('should not display OutRangeAlert when scale is auto', () => {
      const config = {
        ...configMock.config,
        scale: 'Auto',
      };

      const expected = false;
      const wrapper = mountComponent({
        data: batteryPerformanceMock,
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
        data: batteryPerformanceMock,
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
        data: batteryPerformanceMock,
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
