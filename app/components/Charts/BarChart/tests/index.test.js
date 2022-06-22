import React from 'react';
import { mount, shallow } from 'enzyme';
import BarChart from '../index';

describe('<BarChart />', () => {
  const data = [
    {
      name: 'Jan',
      value: 1,
    },
    {
      name: 'Feb',
      value: 1.5,
    },
    {
      name: 'Mar',
      value: 0.5,
    },
  ];
  const id = 'barChartId';
  describe('<BarChart /> render component', () => {
    it('should the bar chart component exists', () => {
      const wrapper = shallow(<BarChart data={data} id={id} />);
      const actual = wrapper
        .find('[data-testid="bar-chart-component"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the chartReference exists', () => {
      const wrapper = mount(<BarChart data={data} id={id} />);
      const actual = wrapper.instance().chartRef.current;
      expect(actual).toBeTruthy();
    });
  });

  describe('#getNextRoundUpValue', () => {
    it('should the getNextRoundUpValue method to have been called', () => {
      const wrapper = shallow(<BarChart data={data} id={id} />);
      const actual = jest.spyOn(wrapper.instance(), 'getNextRoundUpValue');
      wrapper.instance().getNextRoundUpValue();
      expect(actual).toHaveBeenCalled();
    });
    it('should the getNextRoundUpValue method returns null', () => {
      const wrapper = shallow(<BarChart data={data} id={id} />);
      const actual = wrapper.instance().getNextRoundUpValue();
      const expected = null;
      expect(actual).toBe(expected);
    });
    it('should the getNextRoundUpValue method returns float number', () => {
      const testData = 0.1;
      const wrapper = shallow(<BarChart data={data} id={id} />);
      const result = wrapper.instance().getNextRoundUpValue(testData);
      const actual = !!(result % 1);
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the getNextRoundUpValue method returns Int number', () => {
      const testData = 1;
      const wrapper = shallow(<BarChart data={data} id={id} />);
      const result = wrapper.instance().getNextRoundUpValue(testData);
      const actual = !!(result % 1 === 0);
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
