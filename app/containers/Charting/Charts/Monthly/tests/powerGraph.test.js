import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import PowerGraphChart from '../powerGraph';

describe('PowerGraph', () => {
  const mountComponent = (props) =>
    mount(
      <IntlProvider locale="en">
        <PowerGraphChart {...props} />
      </IntlProvider>
    );
  const powerGraphMock = [
    {
      name: 1,
      value: 1.0,
      group: 'Total Production',
    },
    {
      name: 3,
      value: 0.15,
      group: 'Total Production',
    },
    {
      name: 5,
      value: 0.09,
      group: 'Total Production',
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
        data: powerGraphMock,
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
        data: powerGraphMock,
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
        data: powerGraphMock,
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
