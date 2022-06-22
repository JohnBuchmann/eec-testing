import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import VehicleAndFleetLoadsCharts from '..';
import { IntlProvider } from 'react-intl';

const configMock = {
  reportConfig: {
    interval: { value: 'Month', text: 'By Month' },
    scale: { value: 'Auto', text: 'Auto' },
  },
};

const dateMock = moment().format('MMM-YYYY');

describe('<VehicleAndFleetLoadsCharts />', () => {
  describe('<VehicleAndFleetLoadsCharts /> is mounted', () => {
    const mountComponent = (props) =>
      mount(
        <IntlProvider locale="en">
          <VehicleAndFleetLoadsCharts {...props} />
        </IntlProvider>
      );
    const wrapper = mountComponent(configMock);

    it('should mount the component', () => {
      const actual = wrapper.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should mount the EV LOAD IN MWH chart', () => {
      const actual = wrapper
        .find('[data-testid="content-chartTitle"]')
        .at(0)
        .text();
      const expected = `EV LOAD - ${dateMock}`;
      expect(actual).toContain(expected);
    });
  });
});
