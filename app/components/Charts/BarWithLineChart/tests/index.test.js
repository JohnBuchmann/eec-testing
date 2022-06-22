import React from 'react';
import { mount, shallow } from 'enzyme';
import BarWithLinesChart from '../index';

describe('<BarWithLinesChart />', () => {
  const data = [
    {
      name: 'Jan',
      lineValue: 1,
      barValue: 2,
    },
    {
      name: 'Feb',
      lineValue: 0.5,
      barValue: 0.2,
    },
    {
      name: 'Mar',
      lineValue: 1.5,
      barValue: 2,
    },
  ];
  const id = 'barWithLinesChartId';
  describe('<BarWithLinesChart /> render component', () => {
    it('should the bar chart component exists', () => {
      const wrapper = shallow(<BarWithLinesChart data={data} id={id} />);
      const actual = wrapper
        .find('[data-testid="bar-line-chart-component"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the chartReference exists', () => {
      const wrapper = mount(<BarWithLinesChart data={data} id={id} />);
      const actual = wrapper.instance().chartRef.current;
      expect(actual).toBeTruthy();
    });
    it('should the renderChart method have been called', () => {
      const wrapper = shallow(<BarWithLinesChart data={data} id={id} />);
      const actual = jest.spyOn(wrapper.instance(), 'renderChart');
      wrapper.instance().renderChart();
      expect(actual).toHaveBeenCalled();
    });
  });

  describe('#getNextRoundUpValue', () => {
    it('should the getNextRoundUpValue method to have been called', () => {
      const wrapper = shallow(<BarWithLinesChart data={data} id={id} />);
      const actual = jest.spyOn(wrapper.instance(), 'getNextRoundUpValue');
      wrapper.instance().getNextRoundUpValue();
      expect(actual).toHaveBeenCalled();
    });
    it('should the getNextRoundUpValue method returns null', () => {
      const wrapper = shallow(<BarWithLinesChart data={data} id={id} />);
      const actual = wrapper.instance().getNextRoundUpValue();
      const expected = null;
      expect(actual).toBe(expected);
    });
    it('should the getNextRoundUpValue method returns float number', () => {
      const testData = 0.1;
      const wrapper = shallow(<BarWithLinesChart data={data} id={id} />);
      const result = wrapper.instance().getNextRoundUpValue(testData);
      const actual = !!(result % 1);
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the getNextRoundUpValue method returns Int number', () => {
      const testData = 1;
      const wrapper = shallow(<BarWithLinesChart data={data} id={id} />);
      const result = wrapper.instance().getNextRoundUpValue(testData);
      const actual = !!(result % 1 === 0);
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
  describe('#isMoreThanMaxLength', () => {
    const value = 1000000;
    const testData = [
      {
        name: 'Jan',
        lineValue: 1,
        barValue: value,
      },
    ];
    const maxLength = 6;
    const wrapper = shallow(<BarWithLinesChart data={testData} id={id} />);
    it('should isMoreThanMaxLengtht to have been called', () => {
      const actual = jest.spyOn(wrapper.instance(), 'isMoreThanMaxLength');
      wrapper.instance().isMoreThanMaxLength(value, maxLength);
      expect(actual).toHaveBeenCalled();
    });
    it('should isMoreThanMaxLengtht have more than 6 positions and returns true', () => {
      const actual = wrapper.instance().isMoreThanMaxLength(value, maxLength);
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
