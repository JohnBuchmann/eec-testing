import React from 'react';
import { mount, shallow } from 'enzyme';
import { Colors } from 'Theme';

import LinesChart from '../index';

describe('<LinesChart / >', () => {
  const data = [
    { group: 'Solar', name: 0, value: 22 },
    { group: 'Solar', name: 1, value: 30 },
    { group: 'Solar', name: 2, value: 35 },
    { group: 'Solar', name: 3, value: 45 },
    { group: 'Solar', name: 4, value: 50 },
    { group: 'Solar', name: 5, value: 52 },
    { group: 'Solar', name: 6, value: 4 },
    { group: 'Weekday', name: 0, value: 32 },
    { group: 'Weekday', name: 1, value: 40 },
    { group: 'Weekday', name: 2, value: 45 },
    { group: 'Weekday', name: 3, value: 55 },
    { group: 'Weekday', name: 4, value: 50 },
    { group: 'Weekday', name: 5, value: 32 },
    { group: 'Weekday', name: 6, value: 14 },
    { group: 'Weekend', name: 0, value: 12 },
    { group: 'Weekend', name: 1, value: 20 },
    { group: 'Weekend', name: 2, value: 25 },
    { group: 'Weekend', name: 3, value: 35 },
    { group: 'Weekend', name: 4, value: 30 },
    { group: 'Weekend', name: 5, value: 32 },
    { group: 'Weekend', name: 6, value: 4 },
  ];
  const groupLines = [
    { group: 'Solar', color: Colors.red },
    { group: 'Weekday', color: Colors.green },
    { group: 'Weekend', color: Colors.blue, isDashed: true },
  ];
  const chartId = 'linesChartId';
  describe('<LinesChart /> exists and renders', () => {
    it('should render and exists', () => {
      const wrapper = shallow(
        <LinesChart data={data} id={chartId} groupLines={groupLines} />
      );
      const actual = wrapper
        .find('[data-testid="lines-chart-component"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the chartReference exists', () => {
      const wrapper = mount(
        <LinesChart data={data} id={chartId} groupLines={groupLines} />
      );
      const actual = wrapper.instance().chartRef.current;
      expect(actual).toBeTruthy();
    });
    it('should the renderChart method have been called', () => {
      const wrapper = shallow(
        <LinesChart data={data} id={chartId} groupLines={groupLines} />
      );
      const actual = jest.spyOn(wrapper.instance(), 'renderChart');
      wrapper.instance().renderChart();
      expect(actual).toHaveBeenCalled();
    });
    it('should the renderChart method have been called without groupLines', () => {
      const wrapper = shallow(<LinesChart data={data} id={chartId} />);
      const actual = jest.spyOn(wrapper.instance(), 'renderChart');
      wrapper.instance().renderChart();
      expect(actual).toHaveBeenCalled();
    });
    it('should the renderChart method have been called with xAxisScaleType and hideLegends', () => {
      const xAxisScaleType = 'Test';
      const wrapper = shallow(
        <LinesChart
          data={data}
          id={chartId}
          xAxisScaleType={xAxisScaleType}
          hideLegends
        />
      );
      const actual = jest.spyOn(wrapper.instance(), 'renderChart');
      wrapper.instance().renderChart();
      expect(actual).toHaveBeenCalled();
    });
    it('should mount the component with different line data and reference exists', () => {
      const dataTest = [
        { group: 'Solar', name: 0, value: 22 },
        { group: 'Weekday', name: 0, value: 32 },
        { group: 'EC', name: 6, value: 4 },
      ];
      const wrapper = mount(
        <LinesChart data={dataTest} id={chartId} groupLines={groupLines} />
      );
      const actual = wrapper.instance().chartRef.current;
      expect(actual).toBeTruthy();
    });
  });
});
