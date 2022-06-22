import React from 'react';
import { mount, shallow } from 'enzyme';
import { Colors } from 'Theme';
import PieChart from '../index';

describe('<PieChart />', () => {
  const data = [
    { name: 'Solar', displayValue: 'A', value: 300, color: Colors.bostonBlue },
    { name: 'ESS', displayValue: 'B', value: 200, color: Colors.bamboo },
    { name: 'Engines', displayValue: 'C', value: 80, color: Colors.goldenSand },
    { name: 'Utility', displayValue: 'D', value: 400, color: Colors.fern },
  ];
  const noDisplayValueData = [
    { name: 'Jan', value: 35 },
    { name: 'Feb', value: 18 },
    { name: 'Mar', value: 58 },
  ];
  const chartId = 'pieChartId';

  describe('<PieChart /> should render and exists', () => {
    it('should render the component and exists', () => {
      const wrapper = shallow(<PieChart data={data} id={chartId} />);
      const actual = wrapper
        .find('[data-testid="pie-chart-component"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the chartReference exists', () => {
      const wrapper = mount(
        <PieChart data={data} id={chartId} displayLegends />
      );
      const actual = wrapper.instance().chartRef.current;
      expect(actual).toBeTruthy();
    });
    it('should the renderChart method have been called', () => {
      const wrapper = shallow(
        <PieChart data={data} id={chartId} displayLegends />
      );
      const actual = jest.spyOn(wrapper.instance(), 'renderChart');
      wrapper.instance().renderChart();
      expect(actual).toHaveBeenCalled();
    });
    it('should component exists without displayValue property', () => {
      const wrapper = shallow(
        <PieChart data={noDisplayValueData} id={chartId} />
      );
      const actual = wrapper
        .find('[data-testid="pie-chart-component"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });

  describe('#getDisplayValue', () => {
    it('should the method getDisplayValue to have been called', () => {
      const wrapper = shallow(
        <PieChart data={data} id={chartId} displayLegends />
      );
      const actual = jest.spyOn(wrapper.instance(), 'getDisplayValue');
      wrapper.instance().getDisplayValue();
      expect(actual).toHaveBeenCalled();
    });
    it('should the method getDisplayValue returns the displayValue from the item data', () => {
      const wrapper = shallow(
        <PieChart data={data} id={chartId} displayLegends />
      );
      const item = data[0];
      const actual = wrapper.instance().getDisplayValue(item);
      const expected = item.displayValue;
      expect(actual).toBe(expected);
    });
    it('should the method getDisplayValue returns an empty string passing the parameter', () => {
      const wrapper = shallow(
        <PieChart data={noDisplayValueData} id={chartId} displayLegends />
      );
      const item = noDisplayValueData[0];
      const actual = wrapper.instance().getDisplayValue(item);
      const expected = '';
      expect(actual).toBe(expected);
    });
  });
});
