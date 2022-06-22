import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import EnergyProductionChart from '..';

const configMock = {
  reportConfig: {
    charts: {
      solarProduction: [],
      windProduction: [],
      reciprocatingProduction: [],
      microturbineProduction: [],
    },
    interval: { value: 'Month', text: 'By Month' },
    scale: { value: 'Auto', text: 'Auto' },
  },
};

describe('<EnergyProductionChart />', () => {
  const mountComponent = (props) =>
    mount(
      <IntlProvider locale="en">
        <EnergyProductionChart {...props} />
      </IntlProvider>
    );
  const wrapper = mountComponent(configMock);
  it('should mount  the component', () => {
    const actual = wrapper.exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
});
