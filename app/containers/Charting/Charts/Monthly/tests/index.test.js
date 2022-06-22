import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import MonthlyCharts from '../index';

describe('MonthlyCharts', () => {
  const configMock = {
    reportConfig: {
      interval: { value: 'Month', text: 'By Month' },
      scale: { value: 'Auto', text: 'Auto' },
    },
  };
  const mountComponent = (props) =>
    mount(
      <IntlProvider locale="en">
        <MonthlyCharts {...props} />
      </IntlProvider>
    );
  const wrapper = mountComponent(configMock);
  it('should mount the component', () => {
    const actual = wrapper.exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
  it('should mount the Solar Production chart', () => {
    const solarChart = wrapper
      .find('[data-testid="content-solarProductionChart"]')
      .first();
    const actual = solarChart.exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
  it('should mount the Power Graph chart', () => {
    const powerChart = wrapper
      .find('[data-testid="content-powerGraphChart"]')
      .first();
    const actual = powerChart.exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
  // should not, since we are hiding it for now. revert when we un-hide.
  it('should not mount the Uptime Performance chart', () => {
    const uptimePerformanceChart = wrapper
      .find('[data-testid="content-uptimePerformanceChart"]')
      .first();
    const actual = uptimePerformanceChart.exists();
    const expected = true;
    expect(actual).not.toBe(expected);
  });
  it('should mount the Battery Performance chart', () => {
    const batteryPerformanceChart = wrapper
      .find('[data-testid="content-batteryPerformanceChart"]')
      .first();
    const actual = batteryPerformanceChart.exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
});
