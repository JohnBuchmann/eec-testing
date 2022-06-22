import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './styles.css';
import { Colors } from 'Theme';
import { scaledFormatYAxis } from 'Utils/reports';

const DEFAULT_MARGIN_TOP = 5;
const DEFAULT_MARGIN_BOTTOM = 130;
const DEFAULT_MARGIN_LEFT = 60;
const DEFAULT_MARGIN_RIGHT = 30;
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 300;

/**
 * Scatterplot
 * Creates and renders the Scatterplot component using the d3 library.
 * `id` required property to instance the component and draw the chart.
 * `data` required property to instance the component and draw the chart.
 */
export class Scatterplot extends Component {
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
   * renderChart
   * Renders Scatterplot Chart
   */
  renderChart() {
    const data = this.props.data || [];

    // set the dimensions and margins of the graph
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
    const yAxisMaxValue = this.props.yAxisMaxValue || null;
    const xMaxValue = d3.max(data, (d) => +d.name);
    const xMinValue = d3.min(data, (d) => +d.name);
    const yMaxValue = yAxisMaxValue || d3.max(data, (d) => +d.value);
    const yMinValue = d3.min(data, (d) => +d.value);
    const xAxisTitle = this.props.xAxisTitle || '';
    const yAxisTitle = this.props.yAxisTitle || '';
    const xAxisTitleMarginTop = this.props.xAxisTitleMarginTop || 0;
    const xAxisLabelRotate = this.props.xAxisLabelRotate || 0;
    const xAxisLabelMarginLeft = this.props.xAxisLabelMarginLeft || 0;
    const xAxisLabelMarginTop = this.props.xAxisLabelMarginTop || 0;
    const hideLegends = this.props.hideLegends || false;
    const offsetLabels = this.props.offsetLabels || false;
    const legendsColors = data.map((d) => d.dotColor) || [];
    const dotColors = [...new Set(legendsColors)];
    const fontSize = '0.6rem';

    const svg = d3
      .select(this.chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'chart')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X axis
    const x = d3
      .scaleLinear()
      .range([0, chartWidth])
      .domain([xMinValue, xMaxValue]);

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
      .attr('y', chartHeight + margin.top + 25 + xAxisTitleMarginTop)
      .text(xAxisTitle)
      .style('font-size', '0.6rem')
      .attr('alignment-baseline', 'middle');

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([yMinValue, yMaxValue])
      .range([chartHeight, 0]);
    svg
      .append('g')
      .call(
        d3
          .axisLeft(y)
          .tickFormat((d) => scaledFormatYAxis(yAxisMaxValue, yMaxValue, d))
      );

    // Y Axis Title
    svg
      .append('text')
      .attr('x', -(chartHeight + margin.top + 55) / 2)
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

    // Color scale: give me a specie name, I return a color
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.group))
      .range(dotColors);

    // Add dots
    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function(d) {
        return x(d.name);
      })
      .attr('cy', function(d) {
        return y(d.value);
      })
      .attr('r', 5)
      .style('fill', function(d) {
        return color(d.group);
      });

    const totalLegends = data.map((d) => d.group);
    const legends = [...new Set(totalLegends)];
    const legendGroup = 3;

    // Print Legends
    if (!hideLegends) {
      const totalRows = Math.ceil(legends.length / legendGroup);
      const offsetLabelValue = offsetLabels ? 30 : 0;
      for (let idxRow = 0; idxRow < totalRows; idxRow++) {
        let column = 0;
        for (
          let idxGroup = idxRow * legendGroup, len = (idxRow + 1) * legendGroup;
          idxGroup < len;
          idxGroup++
        ) {
          const idxGroupLegends = legends[`${idxGroup}`];
          const dotColor = dotColors[`${idxGroup}`];

          if (idxGroup < legends.length) {
            svg
              .append('rect')
              .attr('x', column * ((width - 10) / legendGroup) - 10)
              .attr(
                'y',
                chartHeight + margin.top + 50 + offsetLabelValue + 20 * idxRow
              )
              .style('font-size', fontSize)
              .attr('width', 10)
              .attr('height', 10)
              .attr('rx', 2)
              .attr('fill', dotColor);
            svg
              .append('text')
              .attr('x', column * ((width - 10) / legendGroup) + 15)
              .attr(
                'y',
                chartHeight + (margin.top + 56) + offsetLabelValue + 20 * idxRow
              )
              .text(idxGroupLegends)
              .style('font-size', fontSize)
              .attr('alignment-baseline', 'middle');
          }
          column++;
        }
      }
    }
  }

  render() {
    const id = this.props.id || 'Scatterplot';
    const backgroundColor = Colors.white;
    return (
      <div
        id={id}
        ref={this.chartRef}
        style={{ backgroundColor }}
        data-testid="scatterplot-chart-component"
      />
    );
  }
}

Scatterplot.propTypes = {
  data: PropTypes.array.isRequired,
  chartMarginTop: PropTypes.number,
  chartMarginRight: PropTypes.number,
  chartMarginBottom: PropTypes.number,
  chartMarginLeft: PropTypes.number,
  id: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  xAxisTitle: PropTypes.string,
  yAxisTitle: PropTypes.string,
  xAxisLabelRotate: PropTypes.number,
  xAxisLabelMarginLeft: PropTypes.number,
  xAxisLabelMarginTop: PropTypes.number,
  xAxisTitleMarginTop: PropTypes.number,
  hideLegends: PropTypes.bool,
  offsetLabels: PropTypes.bool,
  yAxisMaxValue: PropTypes.number,
};

export default Scatterplot;
