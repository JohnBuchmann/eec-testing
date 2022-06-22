import React from 'react';
import * as d3 from 'd3';
import { mount } from 'enzyme';
import { Colors } from 'Theme';
import LinesTimeZoomChart from '../index';

describe('LinesTimeZoomChart', () => {
  const data = [
    {
      group: 'Solar',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:09'),
      value: 22,
    },
    {
      group: 'Solar',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:10'),
      value: 30,
    },
    {
      group: 'Solar',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:11'),
      value: 35,
    },
    {
      group: 'Solar',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:12'),
      value: 45,
    },
    {
      group: 'Solar',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:13'),
      value: 50,
    },
    {
      group: 'Solar',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:14'),
      value: 52,
    },
    {
      group: 'Solar',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:15'),
      value: 4,
    },
    {
      group: 'Total Production',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:16'),
      value: 32,
    },
    {
      group: 'Total Production',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:17'),
      value: 40,
    },
    {
      group: 'Total Production',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:18'),
      value: 45,
    },
    {
      group: 'Total Production',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:19'),
      value: 55,
    },
    {
      group: 'Total Production',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:20'),
      value: 50,
    },
    {
      group: 'Total Production',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:21'),
      value: 32,
    },
    {
      group: 'Total Production',
      date: d3.timeParse('%Y-%m-%dT%H:%M')('2021-0803T13:22'),
      value: 14,
    },
  ];
  const groupLines = [
    { group: 'Solar', color: Colors.red },
    { group: 'Total Production', color: Colors.green },
  ];
  const chartId = 'linesTimeZoomChartId';
  it('should render and exist', () => {
    const wrapper = mount(
      <LinesTimeZoomChart data={data} id={chartId} groupLines={groupLines} />
    );
    const actual = wrapper
      .find('[data-testid="lines-time-zoom-chart-component"]')
      .first()
      .exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
  it('should the chartReference exists', () => {
    const wrapper = mount(
      <LinesTimeZoomChart data={data} id={chartId} groupLines={groupLines} />
    );
    const actual = wrapper.instance().chartRef.current;
    expect(actual).toBeTruthy();
  });
  it('should the renderChart method have been called', () => {
    const wrapper = mount(
      <LinesTimeZoomChart data={data} id={chartId} groupLines={groupLines} />
    );
    const actual = jest.spyOn(wrapper.instance(), 'renderChart');
    wrapper.instance().renderChart();
    expect(actual).toHaveBeenCalled();
  });

  it('should the renderChart method have been called without groupLines', () => {
    const wrapper = mount(<LinesTimeZoomChart data={data} id={chartId} />);
    const actual = jest.spyOn(wrapper.instance(), 'renderChart');
    wrapper.instance().renderChart();
    expect(actual).toHaveBeenCalled();
  });
});
