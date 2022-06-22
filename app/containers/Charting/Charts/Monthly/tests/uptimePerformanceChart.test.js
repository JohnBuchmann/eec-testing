import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import UptimePerformanceChart from '../uptimePerformanceChart';

describe('SolarProduction', () => {
  const mountComponent = (props) =>
    mount(
      <IntlProvider locale="en">
        <UptimePerformanceChart {...props} />
      </IntlProvider>
    );
  const data = [
    { name: 'Running', value: 45 },
    { name: 'Unplanned Outage', value: 6 },
    { name: 'Planned Outage', displayValue: '', value: 9 },
  ];

  const wrapper = mountComponent(data);
  it('should mount component', () => {
    const expected = true;
    const actual = wrapper.exists();
    expect(actual).toBe(expected);
  });
});
