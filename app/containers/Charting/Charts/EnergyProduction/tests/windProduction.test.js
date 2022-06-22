import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import WindProduction from '../windProduction';

const configMock = {
  data: [{ value: 1.0, name: 'one' }, { value: 0.15, name: 'two' }],
  config: {
    interval: { value: 'Month', text: 'By Month' },
    scale: { value: 'Auto', text: 'Auto' },
  },
};

describe('<WindProduction />', () => {
  const mountComponent = (props) =>
    mount(
      <IntlProvider locale="en">
        <WindProduction {...props} />
      </IntlProvider>
    );
  describe('#constructor', () => {
    it('should mount the component', () => {
      const wrapper = mountComponent(configMock);
      const actual = wrapper.exists();
      const expected = true;
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
        data: configMock.data,
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
        data: configMock.data,
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
        data: configMock.data,
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
