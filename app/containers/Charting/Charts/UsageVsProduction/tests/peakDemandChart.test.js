import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import PeakDemandChart from '../peakDemandChart';

const peakDemandChartMock = [
  {
    name: 4,
    value: 0.079,
    group: 'January',
  },
  {
    name: 6,
    value: 0.15,
    group: 'February',
  },
  {
    name: 6,
    value: 0.079,
    group: 'March',
  },
];
const configMock = {
  config: {
    interval: { value: 'Month', text: 'By Month' },
    scale: { value: 'Auto', text: 'Auto' },
  },
};

describe('< PeakDemandChart />', () => {
  const mountComponent = (props) =>
    mount(
      <IntlProvider locale="en">
        <PeakDemandChart {...props} />
      </IntlProvider>
    );
  describe('Mount the component', () => {
    it('should render < PeakDemandChart /> component when no props are sent', () => {
      const expected = true;
      const peakDemandChartWrapper = mountComponent(configMock);

      const actual = peakDemandChartWrapper.exists();
      expect(actual).toBe(expected);
    });

    it('should render < PeakDemandChart /> component when data props are sent', () => {
      const expected = true;
      const peakDemandChartWrapper = mountComponent({
        data: peakDemandChartMock,
        ...configMock,
      });

      const actual = peakDemandChartWrapper.exists();
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
        data: peakDemandChartMock,
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
        data: peakDemandChartMock,
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
        data: peakDemandChartMock,
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
