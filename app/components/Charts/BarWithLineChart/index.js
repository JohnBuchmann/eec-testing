import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './styles.css';
import { Colors } from 'Theme';

const DEFAULT_MARGIN_TOP = 50;
const DEFAULT_MARGIN_BOTTOM = 100;
const DEFAULT_MARGIN_LEFT = 60;
const DEFAULT_MARGIN_RIGHT = 30;
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 300;
const DEFAULT_BAR_WIDTH = 10;
const DEFAULT_FONT_SIZE = '0.6rem';

/**
 * BarWithLinesChart
 * Creates and renders the BarWithLinesChart component using the d3 library.
 * `id` required property to instance the component and draw the chart.
 * `data` required property to instance the component and draw the chart.
 */
export class BarWithLinesChart extends Component {
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
    if (!value) {
      return null;
    }
    // Get the first number and add 1
    let numberToCheck = value;
    // Check decimal values
    const isDecimal = value.toString(10).indexOf('.') > 0;
    const firstNumber = parseInt(value.toString(10).slice(0, 1), 10);
    if (isDecimal && firstNumber === 0) {
      const decimalNumber = value.toString(10).split('.');
      numberToCheck = parseInt(decimalNumber[1].toString(10).slice(0, 1), 10);
    }
    // Check thousand values

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
   * @method isMoreThanMaxLength
   * This validates if the value is
   * less/more than the maxLength positions length
   * to update the font-size in chart.
   * @param value The value to validate
   * @param maxLength The max length to compare
   * @return {boolean}
   */
  isMoreThanMaxLength = (value, maxLength) =>
    !!value && value.toString(10).length > maxLength;

  /**
   * renderChart
   * Renders Bar Chart
   */
  renderChart() {
    const data = this.props.data || [];
    const height = this.props.height || DEFAULT_HEIGHT;
    const width = this.props.width || DEFAULT_WIDTH;
    const margin = {
      top: this.props.chartMarginTop || DEFAULT_MARGIN_TOP,
      right: this.props.chartMarginRight || DEFAULT_MARGIN_RIGHT,
      bottom: this.props.chartMarginBottom || DEFAULT_MARGIN_BOTTOM,
      left: this.props.chartMarginLeft || DEFAULT_MARGIN_LEFT,
    };
    const xAxisTitle = this.props.xAxisTitle || '';
    const yAxisTitle = this.props.yAxisTitle || '';
    const barWidth = this.props.barWidth || DEFAULT_BAR_WIDTH;
    const minValue = this.props.minValue || 0;
    const maxValue =
      this.props.maxValue ||
      d3.max(data, (d) => {
        if (d.barValue > d.lineValue) {
          return d.barValue;
        }
        return d.lineValue;
      });

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const barColor = this.props.barColor || Colors.red;
    const lineColor = this.props.lineColor || Colors.green;

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
      .domain(data.map((d) => d.name))
      .padding(0.3);

    svg
      .append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end');

    // X Axis Title
    svg
      .append('text')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + margin.top - 15)
      .text(xAxisTitle)
      .style('font-size', DEFAULT_FONT_SIZE)
      .attr('alignment-baseline', 'middle');

    // Draw Y Axis labels
    const y = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range([chartHeight, 0]);
    const maxLength = 6;
    const maxValueSize = this.isMoreThanMaxLength(maxValue, maxLength);

    svg
      .append('g')
      .call(d3.axisLeft(y))
      .style('font-size', maxValueSize ? '0.4rem' : '0.7rem');

    // Y Axis Title
    svg
      .append('text')
      .attr('x', -(chartHeight + margin.top) / 2)
      .attr('y', -margin.left + 5)
      .text(yAxisTitle)
      .style('font-size', DEFAULT_FONT_SIZE)
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
      .attr('y', (d) => y(d.barValue))
      .attr('height', (d) => chartHeight - y(d.barValue));

    svg
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .style('stroke', lineColor)
      .attr('stroke-width', 2)
      .attr('id', 'lineId') // assign ID
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveCardinal)
          .x((d) => x(d.name))
          .y((d) => y(d.lineValue))
      );
  }

  render() {
    const id = this.props.id || 'BarWithLineChart';
    const backgroundColor = Colors.white;
    return (
      <div
        id={id}
        ref={this.chartRef}
        style={{ backgroundColor }}
        data-testid="bar-line-chart-component"
      />
    );
  }
}

BarWithLinesChart.propTypes = {
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
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  lineColor: PropTypes.string,
  barColor: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default BarWithLinesChart;
