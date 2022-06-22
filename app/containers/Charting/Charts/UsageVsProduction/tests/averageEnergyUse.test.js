import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import AverageEnergyUse from '../averageEnergyUse';

const averageEnergyUseMock = [
  {
    name: '00:00',
    value: 1.0,
    group: '2021-02-18',
  },
  {
    name: '02:00',
    value: 0.15,
    group: '2021-02-18',
  },
  {
    name: '04:00',
    value: 0.09,
    group: '2021-02-18',
  },
];
const configMock = {
  config: {
    interval: { value: 'Month', text: 'By Month' },
    scale: { value: 'Auto', text: 'Auto' },
  },
};

describe('< AverageEnergyUse />', () => {
  const mountComponent = (props) =>
    mount(
      <IntlProvider locale="en">
        <AverageEnergyUse {...props} />
      </IntlProvider>
    );
  describe('Mount the component', () => {
    it('should render < AverageEnergyUse /> component when no props are sent', () => {
      const expected = true;
      const averageEnergyUseWrapper = mountComponent(configMock);

      const actual = averageEnergyUseWrapper.exists();
      expect(actual).toBe(expected);
    });

    it('should render < AverageEnergyUse /> component when data props are sent', () => {
      const expected = true;
      const averageEnergyUseWrapper = mountComponent({
        data: averageEnergyUseMock,
        ...configMock,
      });

      const actual = averageEnergyUseWrapper.exists();
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
        data: averageEnergyUseMock,
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
        data: averageEnergyUseMock,
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
        data: averageEnergyUseMock,
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
