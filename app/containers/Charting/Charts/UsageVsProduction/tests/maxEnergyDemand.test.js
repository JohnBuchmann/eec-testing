import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import MaxEnergyDemandChart from '../maxEnergyDemand';

const maxEnergyDemandChartMock = [
  {
    name: '00:00',
    value: 0.08,
    group: 'January',
  },
  {
    name: '02:00',
    value: 0.15,
    group: 'January',
  },
  {
    name: '04:00',
    value: 0.09,
    group: 'January',
  },
];
const configMock = {
  config: {
    interval: { value: 'Month', text: 'By Month' },
    scale: { value: 'Auto', text: 'Auto' },
  },
};

describe('< MaxEnergyDemandChart />', () => {
  const mountComponent = (props) =>
    mount(
      <IntlProvider locale="en">
        <MaxEnergyDemandChart {...props} />
      </IntlProvider>
    );
  describe('Mount the component', () => {
    it('should render < MaxEnergyDemandChart /> component when no props are sent', () => {
      const expected = true;
      const MaxEnergyDemandChartWrapper = mountComponent(configMock);

      const actual = MaxEnergyDemandChartWrapper.exists();
      expect(actual).toBe(expected);
    });

    it('should render < MaxEnergyDemandChart /> component when data props are sent', () => {
      const expected = true;
      const MaxEnergyDemandChartWrapper = mountComponent({
        data: maxEnergyDemandChartMock,
        ...configMock,
      });

      const actual = MaxEnergyDemandChartWrapper.exists();
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
        data: maxEnergyDemandChartMock,
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
        data: maxEnergyDemandChartMock,
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
        data: maxEnergyDemandChartMock,
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
