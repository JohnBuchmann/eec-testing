import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import EVLoadInMWH from '../evLoadInMWH';

const barChartDataMock = [
  { name: 'Jan', value: 0.038 },
  { name: 'Feb', value: 0.018 },
  { name: 'Mar', value: 0.058 },
  { name: 'Apr', value: 0.065 },
  { name: 'May', value: 0.008 },
  { name: 'Jun', value: 0.035 },
  { name: 'Jul', value: 0.035 },
  { name: 'Aug', value: 0.045 },
  { name: 'Sep', value: 0.022 },
  { name: 'Oct', value: 0.03 },
  { name: 'Nov', value: 0.022 },
  { name: 'Dec', value: 0.5 },
];

const reportConfigMock = {
  interval: 'Month',
  scale: 'Auto',
};

describe('<EVLoadInMWH />', () => {
  const mountComponent = (props = {}) =>
    mount(
      <IntlProvider locale="en">
        <EVLoadInMWH {...props} />
      </IntlProvider>
    );

  describe('#constructor', () => {
    it('should render < EVLoadInMWH /> component when no chart data is sent', () => {
      const expected = true;
      const evLoadInMWHWrapper = mountComponent({ config: reportConfigMock });

      const actual = evLoadInMWHWrapper.exists();
      expect(actual).toBe(expected);
    });

    it('should render < EVLoadInMWH /> component when chart data is sent', () => {
      const expected = true;
      const evLoadInMWHWrapper = mountComponent({
        data: barChartDataMock,
        config: reportConfigMock,
      });

      const actual = evLoadInMWHWrapper.exists();
      expect(actual).toBe(expected);
    });
  });

  describe('#OutRangeAlert', () => {
    it('should not display OutRangeAlert when scale is auto', () => {
      const config = {
        ...reportConfigMock,
        scale: 'Auto',
      };

      const expected = false;
      const evLoadInMWHWrapper = mountComponent({
        data: barChartDataMock,
        config,
      });

      const actual = evLoadInMWHWrapper
        .find('[data-testid="content-outRangealertContainer"]')
        .first()
        .exists();

      expect(actual).toBe(expected);
    });

    it('should not display OutRangeAlert when scale is greater than max value from chart data', () => {
      const config = {
        ...reportConfigMock,
        scale: '1000 kW',
      };

      const expected = false;
      const evLoadInMWHWrapper = mountComponent({
        data: barChartDataMock,
        config,
      });

      const actual = evLoadInMWHWrapper
        .find('[data-testid="content-outRangealertContainer"]')
        .first()
        .exists();

      expect(actual).toBe(expected);
    });

    it('should display OutRangeAlert when scale is less than max value from chart data', () => {
      const config = {
        ...reportConfigMock,
        scale: '100 kW',
      };

      const expected = true;
      const evLoadInMWHWrapper = mountComponent({
        data: barChartDataMock,
        config,
      });

      const actual = evLoadInMWHWrapper
        .find('[data-testid="content-outRangealertContainer"]')
        .first()
        .exists();

      expect(actual).toBe(expected);
    });
  });
});
