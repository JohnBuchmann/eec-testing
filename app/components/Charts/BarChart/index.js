import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Colors } from 'Theme';
import { scaledFormatYAxis } from 'Utils/reports';
import './styles.css';

const DEFAULT_MARGIN_TOP = 50;
const DEFAULT_MARGIN_BOTTOM = 100;
const DEFAULT_MARGIN_LEFT = 60;
const DEFAULT_MARGIN_RIGHT = 30;
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 300;
const DEFAULT_BAR_WIDTH = 10;
const DEFAULT_BAR_COLOR = 'steelblue';

/**
 * BarChart
 * Creates and renders the BarChart component using the d3 library.
 * `id` required property to instance the component and draw the chart.
 * `data` required property to instance the component and draw the chart.
 */
export class BarChart extends Component {
  constructor() {
    super();

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.renderChart();
  }

  /**
   * getNextRoundUpValue
   * Rounds up to the next limit value number
   * @param {Number} value Number to round up
   */
  getNextRoundUpValue = (value) => {
    // Get the first number and add 1
    if (!value) {
      return null;
    }

    let numberToCheck = value;
    const isDecimal = value.toString(10).indexOf('.') > 0;
    const firstNumber = parseInt(value.toString(10).slice(0, 1), 10);
    if (isDecimal && firstNumber === 0) {
      const decimalNumber = value.toString(10).split('.');
      numberToCheck = parseInt(decimalNumber[1].toString(10).slice(0, 1), 10);
    }

    let result = parseInt(numberToCheck.toString(10).slice(0, 1), 10) + 1;
    const integerPart = parseInt(numberToCheck, 10);
    const additionalZero = integerPart.toString(10).length;
    const additionalTotal = result > 9 ? additionalZero + 1 : additionalZero;
    // Add 0's at the end
    result = result.toString().padEnd(additionalTotal, '0');
    if (isDecimal && firstNumber === 0) {
      result = `0.${result}`;
    }

    return isDecimal && firstNumber === 0
      ? parseFloat(result)
      : parseInt(result, 10);
  };

  /**
   * renderChart
   * Renders Bar Chart
   */
  renderChart() {
    const data = this.props.data || [];
    const margin = {
      top: this.props.chartMarginTop || DEFAULT_MARGIN_TOP,
      right: this.props.chartMarginRight || DEFAULT_MARGIN_RIGHT,
      bottom: this.props.chartMarginBottom || DEFAULT_MARGIN_BOTTOM,
      left: this.props.chartMarginLeft || DEFAULT_MARGIN_LEFT,
    };
    const width = this.props.width || DEFAULT_WIDTH;
    const chartWidth = width - margin.left - margin.right;
    const height = this.props.height || DEFAULT_HEIGHT;
    const chartHeight = height - margin.top - margin.bottom;
    const xAxisTitle = this.props.xAxisTitle || '';
    const yAxisTitle = this.props.yAxisTitle || '';
    const barWidth = this.props.barWidth || DEFAULT_BAR_WIDTH;
    const barColor = this.props.barColor || DEFAULT_BAR_COLOR;
    const yAxisMaxValue = this.props.yAxisMaxValue || null;
    const maxValue = d3.max(data, (d) => +d.value);
    const xAxisTitleMarginTop = this.props.xAxisTitleMarginTop || 0;
    const xAxisLabelRotate = this.props.xAxisLabelRotate || 0;
    const xAxisLabelMarginLeft = this.props.xAxisLabelMarginLeft || 0;
    const xAxisLabelMarginTop = this.props.xAxisLabelMarginTop || 0;

    const svg = d3
      .select(this.chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'chart')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw X axis Labels
    const x = d3
      .scaleBand()
      .range([0, chartWidth])
      .domain(data.map((d) => d.name));

    svg
      .append('g')
      .attr(
        'transform',
        `translate(${xAxisLabelMarginLeft},${chartHeight +
          xAxisLabelMarginTop})`
      )
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', `rotate(${xAxisLabelRotate})`)
      .style('text-anchor', 'middle');

    // X Axis Title
    svg
      .append('text')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + margin.top - 15 + xAxisTitleMarginTop)
      .text(xAxisTitle)
      .style('font-size', '0.6rem')
      .attr('alignment-baseline', 'middle');

    // Draw Y Axis labels
    const roundUpValue = yAxisMaxValue || this.getNextRoundUpValue(maxValue);
    const y = d3
      .scaleLinear()
      .domain([0, roundUpValue])
      .range([chartHeight, 0]);

    svg
      .append('g')
      .call(
        d3
          .axisLeft(y)
          .tickFormat((d) => scaledFormatYAxis(yAxisMaxValue, maxValue, d))
      );

    // Y Axis Title
    svg
      .append('text')
      .attr('x', -(chartHeight + margin.top) / 2)
      .attr('y', -margin.left + 15)
      .text(yAxisTitle)
      .style('font-size', '0.6rem')
      .attr('transform', 'translate(0,0)rotate(-90)')
      .attr('alignment-baseline', 'middle');

    // Y Horizontal lines, check /styles.css for the style of the lines
    svg
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(y)
          .tickSize(-chartWidth)
          .tickFormat('')
      );

    // Bars
    svg
      .selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .style('fill', barColor)
      .attr('x', (d) => x(d.name))
      .attr('width', barWidth)
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => chartHeight - y(d.value));
  }

  render() {
    const id = this.props.id || 'BarChart';
    const backgroundColor = Colors.white;
    return (
      <div
        id={id}
        ref={this.chartRef}
        style={{ backgroundColor }}
        data-testid="bar-chart-component"
      />
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  chartMarginTop: PropTypes.number,
  chartMarginRight: PropTypes.number,
  chartMarginBottom: PropTypes.number,
  chartMarginLeft: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  xAxisTitle: PropTypes.string,
  yAxisTitle: PropTypes.string,
  barWidth: PropTypes.number,
  barColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  xAxisLabelRotate: PropTypes.number,
  xAxisLabelMarginLeft: PropTypes.number,
  xAxisLabelMarginTop: PropTypes.number,
  xAxisTitleMarginTop: PropTypes.number,
  yAxisMaxValue: PropTypes.number,
};

export default BarChart;
