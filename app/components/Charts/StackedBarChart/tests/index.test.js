import React from 'react';
import { mount, shallow } from 'enzyme';
import { Colors } from 'Theme';
import StackedBarChart from '../index';

describe('<StackedBarChart />', () => {
  const data = [
    {
      group: 'Jan',
      values: [
        [
          { name: 'EV Charging', value: 10, color: Colors.pacificBlue },
          { name: 'Facility Use', value: 5, color: Colors.stJohn },
        ],
        [
          { name: 'R.Engines', value: 44, color: Colors.peachYellow },
          { name: 'Solar', value: 15, color: Colors.thunderbird },
          { name: 'Microturbine', value: 15, color: Colors.goldenDream },
        ],
      ],
    },
    {
      group: 'Feb',
      values: [
        [
          { name: 'EV Charging', value: 10, color: Colors.pacificBlue },
          { name: 'Facility Use', value: 10, color: Colors.stJohn },
        ],
        [
          { name: 'R.Engines', value: 23, color: Colors.peachYellow },
          { name: 'Solar', value: 15, color: Colors.thunderbird },
          { name: 'Microturbine', value: 15, color: Colors.goldenDream },
        ],
      ],
    },
  ];
  const barColors = [
    { name: 'EV Charging', color: Colors.pacificBlue },
    { name: 'Facility Use', color: Colors.sanJuan },
    { name: 'R.Engines', color: Colors.olivine },
    { name: 'Solar', color: Colors.black },
    { name: 'Microturbine', color: Colors.red },
  ];
  const chartId = 'stackedBarChartId';

  describe('<StackedBarChart /> should render and exists', () => {
    it('should render the component and exists', () => {
      const wrapper = shallow(
        <StackedBarChart data={data} id={chartId} barColors={barColors} />
      );
      const actual = wrapper
        .find('[data-testid="stackedbar-chart-component"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the chartReference exists', () => {
      const wrapper = mount(
        <StackedBarChart data={data} id={chartId} barColors={barColors} />
      );
      const actual = wrapper.instance().chartRef.current;
      expect(actual).toBeTruthy();
    });
    it('should the chartReference exists with hideLegends property set to true', () => {
      const wrapper = mount(
        <StackedBarChart
          data={data}
          id={chartId}
          barColors={barColors}
          hideLegends
        />
      );
      const actual = wrapper.instance().chartRef.current;
      expect(actual).toBeTruthy();
    });
    it('should the chartReference exists with offsetLabels property set to true', () => {
      const wrapper = mount(
        <StackedBarChart
          data={data}
          id={chartId}
          barColors={barColors}
          offsetLabels
        />
      );
      const actual = wrapper.instance().chartRef.current;
      expect(actual).toBeTruthy();
    });
    it('should the renderChart method have been called', () => {
      const wrapper = shallow(
        <StackedBarChart data={data} id={chartId} barColors={barColors} />
      );
      const actual = jest.spyOn(wrapper.instance(), 'renderChart');
      wrapper.instance().renderChart();
      expect(actual).toHaveBeenCalled();
    });
  });

  describe('#getNextRoundUpValue', () => {
    it('should the getNextRoundUpValue method to have been called', () => {
      const wrapper = shallow(
        <StackedBarChart data={data} id={chartId} barColors={barColors} />
      );
      const actual = jest.spyOn(wrapper.instance(), 'getNextRoundUpValue');
      wrapper.instance().getNextRoundUpValue();
      expect(actual).toHaveBeenCalled();
    });
    it('should the getNextRoundUpValue method returns null', () => {
      const wrapper = shallow(
        <StackedBarChart data={data} id={chartId} barColors={barColors} />
      );
      const actual = wrapper.instance().getNextRoundUpValue();
      const expected = null;
      expect(actual).toBe(expected);
    });
    it('should the getNextRoundUpValue method returns float number', () => {
      const testData = 0.1;
      const wrapper = shallow(
        <StackedBarChart data={data} id={chartId} barColors={barColors} />
      );
      const result = wrapper.instance().getNextRoundUpValue(testData);
      const actual = !!(result % 1);
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the getNextRoundUpValue method returns Int number', () => {
      const testData = 1;
      const wrapper = shallow(
        <StackedBarChart data={data} id={chartId} barColors={barColors} />
      );
      const result = wrapper.instance().getNextRoundUpValue(testData);
      const actual = !!(result % 1 === 0);
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
