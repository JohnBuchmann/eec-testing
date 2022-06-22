import React from 'react';
import { mount, shallow } from 'enzyme';
import { Colors } from 'Theme';

import DonutChart from '../index';

describe('<DonutChart />', () => {
  const DEFAULT_BAR_COLOR = Colors.primaryLight;

  const data = [
    { name: 'Solar', displayValue: 'A', value: 300, color: '#000000' },
    { name: 'ESS', displayValue: 'B', value: 200, color: '#db6400' },
    { name: 'Engines', displayValue: 'C', value: 0, color: '#f2d974' },
    { name: 'Utility', displayValue: 'D', value: 400, color: '#61b15a' },
  ];

  const barColors = [
    { name: 'EV Charging', color: Colors.pacificBlue },
    { name: 'Facility Use', color: Colors.sanJuan },
    { name: 'R.Engines', color: Colors.olivine },
    { name: 'Solar', color: Colors.black },
    { name: 'Microturbine', color: Colors.red },
  ];

  const index = 0;
  const dataIndex = data[`${index}`];
  const id = 'donutChartId';

  describe('<DonutChart /> is mounted', () => {
    it('component should render and exists', () => {
      const wrapper = shallow(
        <DonutChart data={data} id={id} barColors={barColors} />
      );
      const actual = wrapper
        .find('[data-testid="donut-chart-component"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the chartReference exists', () => {
      const wrapper = mount(
        <DonutChart data={data} id={id} barColors={barColors} />
      );
      const actual = wrapper.instance().chartRef.current;
      expect(actual).toBeTruthy();
    });
    it('should the renderChart method have been called', () => {
      const wrapper = shallow(
        <DonutChart data={data} id={id} barColors={barColors} />
      );
      const actual = jest.spyOn(wrapper.instance(), 'renderChart');
      wrapper.instance().renderChart();
      expect(actual).toHaveBeenCalled();
    });
    it('Should hide the legends from the chart', () => {
      const wrapper = shallow(
        <DonutChart data={data} id={id} barColors={barColors} hideLegends />
      );
      const actual = wrapper.instance().props.hideLegends;
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('Donut Chart exists when rendering alternate view with side rendered labels', () => {
      const wrapper = shallow(
        <DonutChart
          data={data}
          id={id}
          barColors={barColors}
          hideSliceLabels
          legendToSide
        />
      );
      const actual = wrapper
        .find('[data-testid="donut-chart-component"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });

  describe('#findBarColor', () => {
    const wrapper = shallow(
      <DonutChart data={data} id={id} barColors={barColors} />
    );
    it('Should findBarColor had been called', () => {
      const actual = jest.spyOn(wrapper.instance(), 'findBarColor');
      wrapper.instance().findBarColor(dataIndex, barColors);
      expect(actual).toHaveBeenCalled();
    });
    it('Should find a color in the array and returns its value', () => {
      const actual = wrapper.instance().findBarColor(dataIndex, barColors);
      const expected = dataIndex.color.toUpperCase();
      expect(actual).toBe(expected);
    });
    it('Should not find a color in the array and return the default color', () => {
      const actual = wrapper.instance().findBarColor(dataIndex);
      const expected = DEFAULT_BAR_COLOR;
      expect(actual).toBe(expected);
    });
  });

  describe('#getGraphText', () => {
    const wrapper = shallow(
      <DonutChart data={data} id={id} barColors={barColors} />
    );
    const altWrapper = shallow(
      <DonutChart
        data={data}
        id={id}
        barColors={barColors}
        hideSliceLabels
        legendToSide
      />
    );
    it('Should getGraphText had been called', () => {
      const actual = jest.spyOn(wrapper.instance(), 'getGraphText');
      wrapper.instance().getGraphText(dataIndex);
      expect(actual).toHaveBeenCalled();
    });
    it('Should return the displayValue from item provided', () => {
      const actual = wrapper
        .instance()
        .getGraphText(dataIndex)
        .toLowerCase();
      const expected = dataIndex.displayValue.toLowerCase();
      expect(actual).toBe(expected);
    });
    it('Should not return the displayValue from item provided', () => {
      const testIndex = 2;
      const dataTestIndex = data[`${testIndex}`];

      const actual = wrapper
        .instance()
        .getGraphText(dataTestIndex)
        .toLowerCase();
      const expected = '';
      expect(actual).toBe(expected);
    });
    it('getGraphText should not be called when hiding slice labels', () => {
      const actual = jest.spyOn(altWrapper.instance(), 'getGraphText');
      expect(actual).not.toHaveBeenCalled();
    });
  });
});
