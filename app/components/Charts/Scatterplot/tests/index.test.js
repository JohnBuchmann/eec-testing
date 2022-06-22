import React from 'react';
import { mount, shallow } from 'enzyme';
import Scatterplot from '..';
import { Colors } from 'Theme';

describe('<Scatterplot />', () => {
  const peakDemandByMonth = [
    {
      name: 4,
      value: 79,
      dotColor: Colors.tarawera,
      group: 'January',
    },
    {
      name: 6,
      value: 90,
      dotColor: Colors.olivine,
      group: 'February',
    },
    {
      name: 6,
      value: 79,
      dotColor: Colors.pacificBlue,
      group: 'March',
    },
    {
      name: 8,
      value: 90,
      dotColor: Colors.thunderbird,
      group: 'April',
    },
    {
      name: 8,
      value: 79,
      dotColor: Colors.goldenDream,
      group: 'May',
    },
    {
      name: 10,
      value: 115,
      dotColor: Colors.eucalyptus,
      group: 'June',
    },
    {
      name: 12,
      value: 79,
      dotColor: Colors.peachYellow,
      group: 'July',
    },
    {
      name: 12,
      value: 59,
      dotColor: Colors.buccaneer,
      group: 'August',
    },
    {
      name: 14,
      value: 95,
      dotColor: Colors.cancan,
      group: 'September',
    },
    {
      name: 14,
      value: 79,
      dotColor: Colors.black,
      group: 'October',
    },
    {
      name: 16,
      value: 79,
      dotColor: Colors.cadillac,
      group: 'November',
    },
    {
      name: 20,
      value: 79,
      dotColor: Colors.christine,
      group: 'December',
    },
  ];

  const id = 'scatterPlotId';
  describe('<Scatterplot /> render component', () => {
    it('should the scatterplot chart component exists', () => {
      const wrapper = shallow(<Scatterplot id={id} data={peakDemandByMonth} />);
      const actual = wrapper
        .find('[data-testid="scatterplot-chart-component"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the chartReference exists', () => {
      const wrapper = mount(<Scatterplot id={id} data={peakDemandByMonth} />);
      const actual = wrapper.instance().chartRef.current;
      expect(actual).toBeTruthy();
    });
  });

  describe('#getNextRoundUpValue', () => {
    it('should the getNextRoundUpValue method to have been called', () => {
      const wrapper = shallow(<Scatterplot id={id} data={peakDemandByMonth} />);
      const actual = jest.spyOn(wrapper.instance(), 'getNextRoundUpValue');
      wrapper.instance().getNextRoundUpValue();
      expect(actual).toHaveBeenCalled();
    });
    it('should the getNextRoundUpValue method returns null', () => {
      const wrapper = shallow(<Scatterplot id={id} data={peakDemandByMonth} />);
      const actual = wrapper.instance().getNextRoundUpValue();
      const expected = null;
      expect(actual).toBe(expected);
    });
    it('should the getNextRoundUpValue method returns float number', () => {
      const testData = 0.1;
      const wrapper = shallow(<Scatterplot id={id} data={peakDemandByMonth} />);
      const result = wrapper.instance().getNextRoundUpValue(testData);
      const actual = !!(result % 1);
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the getNextRoundUpValue method returns Int number', () => {
      const testData = 1;
      const wrapper = shallow(<Scatterplot id={id} data={peakDemandByMonth} />);
      const result = wrapper.instance().getNextRoundUpValue(testData);
      const actual = !!(result % 1 === 0);
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
