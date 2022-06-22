import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Colors } from 'Theme';
import { scaledFormatYAxis, getMaxValueFromChartLevels } from 'Utils/reports';
import './styles.css';

const DEFAULT_MARGIN_TOP = 50;
const DEFAULT_MARGIN_BOTTOM = 100;
const DEFAULT_MARGIN_LEFT = 60;
const DEFAULT_MARGIN_RIGHT = 30;
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 300;
const DEFAULT_BAR_WIDTH = 10;
const DEFAULT_LEGEND_GROUP = 4;

/**
 * StackedBarChart
 * Creates and renders the StackedBarChart component using the d3 library.
 * `id` required property to instance the component and draw the chart.
 * `data` required property to instance the component and draw the chart.
 * `barColors` required property to instance the component and draw the chart.
 */
export class StackedBarChart extends Component {
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
    const xAxisTitleMarginTop = this.props.xAxisTitleMarginTop || 0;
    const xAxisLabelRotate = this.props.xAxisLabelRotate || 0;
    const xAxisLabelMarginLeft = this.props.xAxisLabelMarginLeft || 0;
    const xAxisLabelMarginTop = this.props.xAxisLabelMarginTop || 0;
    const { barColors } = this.props;
    const hideLegends = this.props.hideLegends || false;
    const legendGroup = this.props.legendGroup || DEFAULT_LEGEND_GROUP;
    const offsetLabels = this.props.offsetLabels || 0;
    const yAxisMaxValue = this.props.yAxisMaxValue || null;
    const maxValueData = getMaxValueFromChartLevels(data) || 0;
    const subGroups = [];
    const colorSubGroup = [];
    const fontSize = '0.6rem';

    let maxSubGroupLength = 0;

    let maxValue = 0;

    // Get the number of subgroups
    data.forEach((item) => {
      for (let i = 0, len = item.values.length; i < len; i++) {
        let subGroupTotal = 0;

        for (
          let j = 0, lenSubGroup = item.values[`${i}`].length;
          j < lenSubGroup;
          j++
        ) {
          if (typeof subGroups[`${i}`] === 'undefined') {
            subGroups[`${i}`] = [];
            colorSubGroup[`${i}`] = [];
          }

          subGroupTotal += item.values[`${i}`][`${j}`].value;

          const subGroupIndex = subGroups[`${i}`].indexOf(
            item.values[`${i}`][`${j}`].name
          );

          if (subGroupIndex === -1) {
            subGroups[`${i}`].push(item.values[`${i}`][`${j}`].name);
            colorSubGroup[`${i}`].push(item.values[`${i}`][`${j}`].color);
          }
        }
        if (subGroups[`${i}`].length > maxSubGroupLength) {
          maxSubGroupLength = subGroups[`${i}`].length;
        }

        if (subGroupTotal > maxValue) {
          maxValue = subGroupTotal;
        }
      }
    });

    const chartData = data.map((item) => {
      const subGroupsData = [];

      // Initialize data
      for (let i = 0, len = subGroups.length; i < len; i++) {
        subGroupsData.push([]);
        subGroups[`${i}`].forEach(() => {
          subGroupsData[`${i}`].push({ value: 0, color: '' });
        });
      }

      // Fill Data with values
      for (let i = 0, len = item.values.length; i < len; i++) {
        for (
          let j = 0, lenSubGroup = item.values[`${i}`].length;
          j < lenSubGroup;
          j++
        ) {
          const idxElement = subGroups[`${i}`].indexOf(
            item.values[`${i}`][`${j}`].name
          );
          subGroupsData[`${i}`][`${idxElement}`].value =
            item.values[`${i}`][`${j}`].value;
          subGroupsData[`${i}`][`${idxElement}`].color =
            item.values[`${i}`][`${j}`].color;
        }
      }

      return {
        name: item.group,
        values: subGroupsData,
      };
    });

    maxValue = yAxisMaxValue || this.getNextRoundUpValue(maxValue);

    // append the svg object to the body of the page
    const svg = d3
      .select(this.chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'chart')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg
      .append('text')
      .attr('x', -(chartHeight + margin.top) / 2)
      .attr('y', -margin.left + 15)
      .text(yAxisTitle)
      .style('font-size', fontSize)
      .attr('transform', 'translate(0,0)rotate(-90)')
      .attr('alignment-baseline', 'middle');

    // X axis

    const x = d3
      .scaleBand()
      .range([0, chartWidth])
      .domain(data.map((d) => d.group))
      .padding(0.2);

    svg
      .append('text')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + margin.top - 15 + xAxisTitleMarginTop)
      .text(xAxisTitle)
      .style('font-size', fontSize)
      .attr('alignment-baseline', 'middle');

    // Draw X axis groups
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

    // Y axis
    const y = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([chartHeight, 0]);

    // Draw Y Axis labels

    svg
      .append('g')
      .call(
        d3
          .axisLeft(y)
          .tickFormat((d) => scaledFormatYAxis(yAxisMaxValue, maxValueData, d))
      );
    // Y Horizontal lines, check styles for the style of the lines
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

    const legends = [];

    // Cycle through Sub Groups
    for (let idxGroup = 0, len = subGroups.length; idxGroup < len; idxGroup++) {
      for (
        let idxSubGroup = 0, lenSubGroup = subGroups[`${idxGroup}`].length;
        idxSubGroup < lenSubGroup;
        idxSubGroup++
      ) {
        const barColor = barColors.find(
          (item) => item.name === subGroups[`${idxGroup}`][`${idxSubGroup}`]
        );
        svg
          .selectAll('mybar')
          .data(chartData)
          .enter()
          .append('rect')
          .attr('x', (d) => x(d.name) + barWidth * idxGroup)
          .attr('y', (d) => {
            let totalValue = d.values[`${idxGroup}`][`${idxSubGroup}`].value;
            if (idxSubGroup > 0) {
              for (let i = 0; i < idxSubGroup; i++) {
                totalValue += d.values[`${idxGroup}`][`${i}`].value;
              }
            }

            return y(totalValue);
          })
          .attr('width', barWidth)
          .attr(
            'height',
            (d) =>
              chartHeight - y(d.values[`${idxGroup}`][`${idxSubGroup}`].value)
          )
          .attr('fill', barColor.color);

        if (!hideLegends) {
          legends.push({
            title: subGroups[`${idxGroup}`][`${idxSubGroup}`],
            color: barColor.color,
          });
        }
      }
    }

    // Print Legends

    if (!hideLegends) {
      const totalRows = Math.ceil(legends.length / legendGroup);
      const offsetLabelValue = offsetLabels;

      for (let idxRow = 0; idxRow < totalRows; idxRow++) {
        let column = 0;

        for (
          let idxGroup = idxRow * legendGroup, len = (idxRow + 1) * legendGroup;
          idxGroup < len;
          idxGroup++
        ) {
          const idxGroupLegends = legends[`${idxGroup}`];
          if (idxGroup < legends.length) {
            svg
              .append('line')
              .attr('x1', column * ((width - 10) / legendGroup) - 10)
              .attr('x2', column * ((width - 10) / legendGroup))
              .attr(
                'y1',
                chartHeight + margin.top + offsetLabelValue + 20 * idxRow
              )
              .attr(
                'y2',
                chartHeight + margin.top + offsetLabelValue + 20 * idxRow
              )
              .style('font-size', fontSize)
              .attr('width', 10)
              .attr('height', 10)
              .attr('class', 'line')
              .style('stroke', idxGroupLegends.color);

            svg
              .append('text')
              .attr('x', column * ((width - 10) / legendGroup) + 15)
              .attr(
                'y',
                chartHeight + margin.top + offsetLabelValue + 20 * idxRow
              )
              .text(idxGroupLegends.title)
              .style('font-size', fontSize)
              .attr('alignment-baseline', 'middle');
          }
          column++;
        }
      }
    }
  }

  render() {
    const id = this.props.id || 'StackedBarChart';
    const backgroundColor = Colors.white;
    return (
      <div
        id={id}
        ref={this.chartRef}
        style={{ backgroundColor }}
        data-testid="stackedbar-chart-component"
      />
    );
  }
}

StackedBarChart.propTypes = {
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
  id: PropTypes.string.isRequired,
  barColors: PropTypes.array.isRequired,
  xAxisLabelRotate: PropTypes.number,
  xAxisLabelMarginLeft: PropTypes.number,
  xAxisLabelMarginTop: PropTypes.number,
  xAxisTitleMarginTop: PropTypes.number,
  hideLegends: PropTypes.bool,
  legendGroup: PropTypes.number,
  offsetLabels: PropTypes.number,
  yAxisMaxValue: PropTypes.number,
};

export default StackedBarChart;
