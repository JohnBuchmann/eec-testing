import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Colors } from 'Theme';
import { scaledFormatYAxis } from 'Utils/reports';
import './styles.css';

const DEFAULT_MARGIN_TOP = 40;
const DEFAULT_MARGIN_BOTTOM = 60;
const DEFAULT_MARGIN_LEFT = 60;
const DEFAULT_MARGIN_RIGHT = 30;
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 300; // height of the entire container
const DEFAULT_LEGEND_GROUP = 4;
/**
 * LinesTimeZoomChart
 * Creates and renders the LinesTimeZoomChart component using the d3 library.
 */
export class LinesTimeZoomChart extends Component {
  constructor() {
    super();
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.renderChart();
  }

  renderChart() {
    const data = this.props.data || [];
    const y2Data = this.props.y2Data || [];
    const margin = {
      top: this.props.chartMarginTop || DEFAULT_MARGIN_TOP,
      right: this.props.chartMarginRight || DEFAULT_MARGIN_RIGHT,
      bottom: this.props.chartMarginBottom || DEFAULT_MARGIN_BOTTOM,
      left: this.props.chartMarginLeft || DEFAULT_MARGIN_LEFT,
    };
    const width = this.props.width || DEFAULT_WIDTH;
    const chartWidth = width - margin.left - margin.right;
    const height = this.props.height || DEFAULT_HEIGHT;
    const chartHeight = height - margin.top - margin.bottom - 60;
    const xAxisTitle = this.props.xAxisTitle || '';
    const yAxisTitle = this.props.yAxisTitle || '';
    const y2AxisTitle = this.props.y2AxisTitle || '';
    const { groupLines } = this.props;
    const xAxisTitleMarginTop = this.props.xAxisTitleMarginTop || 0;
    const xAxisLabelMarginLeft = this.props.xAxisLabelMarginLeft || 0;
    const xAxisLabelMarginTop = this.props.xAxisLabelMarginTop || 0;
    const hideLegends = this.props.hideLegends || false;
    const legendGroup = this.props.legendGroup || DEFAULT_LEGEND_GROUP;
    const xAxisLabelRotate = this.props.xAxisLabelRotate || 0;
    const curveMethod = this.props.curveMethod || d3.curveLinear;
    const yAxisMaxValue = this.props.yAxisMaxValue || null;
    const y2AxisMaxValue = this.props.y2AxisMaxValue || null;
    const offsetLabels = this.props.offsetLabels || 0;
    const maxValueData = d3.max(data, (d) => +d.value) || 0;
    const y2GroupName = this.props.y2GroupName || '';
    const fontSize = '0.6rem';
    let sumstat = d3.group(data, (d) => d.group);
    const maxTime = 350;
    const linesArray = [];
    const fixedData = [];
    let idleTimeout;
    let colorByGroup;
    let brush;
    let y2;

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
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, chartWidth]);
    const xAxis = svg
      .append('g')
      .attr(
        'transform',
        `translate(${xAxisLabelMarginLeft},${chartHeight +
          xAxisLabelMarginTop})`
      )
      .call(d3.axisBottom(x));
    xAxis
      .selectAll('text')
      .attr('transform', `rotate(${xAxisLabelRotate})`)
      .attr('y', 35)
      .style('text-anchor', 'middle');

    svg
      .append('text')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + margin.top + xAxisTitleMarginTop + 15)
      .text(xAxisTitle)
      .style('font-size', fontSize)
      .attr('alignment-baseline', 'middle');
    const extentData = d3.extent(data, (d) => d.value);
    // Validate if "yAxisMaxValue" is not null and "extentData" array have more than 1 value,
    // because extentData[1] save "Y" maxValue
    if (yAxisMaxValue && extentData.length > 1) {
      extentData[1] = yAxisMaxValue;
    }
    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain(extentData)
      .range([chartHeight, 0]);
    const ticks = y.ticks();
    // Add an extra tick at the top
    ticks.push(ticks[ticks.length - 1] + (ticks[1] - ticks[0]));
    // Add an extra tick at the bottom if it would not result in a negative number
    const isNegative = ticks[0] - (ticks[1] - ticks[0]) < 0;
    if (!isNegative) {
      ticks.unshift(ticks[0] - (ticks[1] - ticks[0]));
    }
    const yAxis = d3
      .axisLeft(y)
      .tickValues(ticks)
      .tickFormat((d) => scaledFormatYAxis(yAxisMaxValue, maxValueData, d));
    svg
      .append('g')
      .attr('class', 'axis')
      .call(yAxis);
    svg
      .append('g')
      .attr('class', 'grid')
      .call(yAxis.tickSize(-chartWidth).tickFormat(''));
    // Validate if have Y2 data for right position on chart
    if (y2Data.length > 0) {
      const extentDataRight = d3.extent(y2Data, (d) => d.value);
      // Validate if "y2AxisMaxValue" is not null and "extentDataRight" array have more than 1 value,
      // because extentDataRight[1] save "Y" maxValue
      if (y2AxisMaxValue && y2Data.length > 1) {
        extentDataRight[1] = y2AxisMaxValue;
      }
      const chartData = [...data, ...y2Data];
      sumstat = d3.group(chartData, (d) => d.group);
      linesArray.push(svg.append('g').attr('clip-path', 'url(#clip)'));
      y2 = d3
        .scaleLinear()
        .domain(extentDataRight)
        .range([chartHeight, 0]);
      const yAxis2 = d3.axisRight(y2);
      svg
        .append('g')
        .attr('class', 'axis')
        .attr('transform', `translate( ${chartWidth}, 0 )`)
        .call(yAxis2);
      // Y2 Title
      svg
        .append('text')
        .attr('x', -(chartHeight + margin.top) / 2)
        .attr('y', margin.left + 475)
        .text(y2AxisTitle)
        .style('font-size', fontSize)
        .attr('transform', 'translate(0,0)rotate(-90)')
        .attr('alignment-baseline', 'middle');
    }
    // Y Axis Title
    svg
      .append('text')
      .attr('x', -(chartHeight + margin.top) / 2)
      .attr('y', -margin.left + 15)
      .text(yAxisTitle)
      .style('font-size', fontSize)
      .attr('transform', 'translate(0,0)rotate(-90)')
      .attr('alignment-baseline', 'middle');
    // Add a clipPath: everything out of this area won't be drawn.
    svg
      .append('defs')
      .append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('width', chartWidth)
      .attr('height', height)
      .attr('x', 0)
      .attr('y', 0);

    sumstat.forEach((item) => {
      linesArray.push(svg.append('g').attr('clip-path', 'url(#clip)'));
      fixedData.push({
        group: item[0].group,
        values: item,
        solidLine: item[0].solidLine,
      });
    });
    const idled = () => {
      idleTimeout = null;
    };
    /**
     * @method getYValueByGroup
     * Get Y object with value comparing the Y's group name
     * @param {string} group receive group name
     * @param {number} value receive value
     * @returns {object}
     */
    const getYValueByGroup = (group, value) =>
      group === y2GroupName ? y2(value) : y(value);
    /**
     * @method updateChart
     * Handle update line chart with zoom from brush, affect the xAxis and the lines
     * @param {object} event receive event object properties
     */
    // eslint-disable-next-line consistent-return
    const updateChart = (event) => {
      const extent = event.selection;
      if (!extent) {
        // This allows to wait a little bit
        if (!idleTimeout) {
          /* eslint-disable */
          return (idleTimeout = setTimeout(idled, maxTime));
          /* eslint-enable */
        }
        x.domain([4, 8]);
      } else {
        x.domain([x.invert(extent[0]), x.invert(extent[1])]);
        linesArray[`${linesArray.length - 1}`]
          .select('.brush')
          .call(brush.move, null);
      }
      // Update axis and line position
      xAxis
        .transition()
        .duration(1000)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', `rotate(${xAxisLabelRotate})`)
        .style('text-anchor', 'middle');
      linesArray.forEach((line) => {
        line
          .select('.line')
          .transition()
          .duration(1000)
          .attr(
            'd',
            d3
              .line()
              .curve(curveMethod)
              .x((d) => x(d.date))
              .y((d) => getYValueByGroup(d.group, d.value))
          );
      });
    };
    // Add brushing
    brush = d3
      .brushX()
      .extent([[0, 0], [chartWidth, chartHeight]])
      .on('end', updateChart);
    linesArray.forEach((line) => {
      line
        .append('g')
        .attr('class', 'brush')
        .call(brush);
    });
    // Group Names from Data
    const groupNames = fixedData.map((item) => item.group);
    if (groupLines && groupLines.length === groupNames.length) {
      /**
       * colorByGroup
       * Method to get the line colorgiven by group line parameters
       * @param {string} groupName Group Name
       */
      colorByGroup = (groupName) => {
        const groupColor = groupLines.find((item) => item.group === groupName);
        return groupColor ? groupColor.color : Colors.black;
      };
    } else {
      colorByGroup = d3
        .scaleOrdinal()
        .domain(groupNames)
        .range([
          Colors.alizarinCrimson,
          Colors.bostonBlue,
          Colors.apple,
          Colors.affair,
          Colors.flushOrange,
          Colors.goldenFizz,
          Colors.paarl,
          Colors.persianPink,
          Colors.dustGray,
        ]);
    }
    /**
     * lineStrokeStyle
     * Method to get the line stroke style given by group line parameters
     * @param {string} groupName Group Name
     */
    const lineStrokeStyle = (groupName) => {
      if (groupLines) {
        const groupLine = groupLines.find((item) => item.group === groupName);
        if (groupLine) {
          return groupLine.isDashed ? '3, 3' : '0';
        }
      }

      return '0';
    };
    // Paint the lines from group
    fixedData.forEach((item, index) => {
      linesArray[`${index}`]
        .append('path')
        .datum(item.values)
        .attr('class', 'line')
        .style('stroke', colorByGroup(item.group))
        .style('stroke-dasharray', lineStrokeStyle(item.group))
        .attr('stroke-width', 1.5)
        .attr('id', item.group) // assign ID
        .attr(
          'd',
          d3
            .line()
            .curve(curveMethod)
            .x((d) => x(d.date))
            .y((d) => getYValueByGroup(d.group, d.value))
        );
    });
    // Display Legends to bottom by group
    if (!hideLegends) {
      const totalRows =
        groupLines && groupLines.length
          ? Math.ceil(groupLines.length / legendGroup)
          : 0;

      for (let idxRow = 0; idxRow < totalRows; idxRow++) {
        let column = 0;
        for (
          let idxGroup = idxRow * legendGroup, len = (idxRow + 1) * legendGroup;
          idxGroup < len;
          idxGroup++
        ) {
          if (idxGroup < groupLines.length) {
            const groupLinesIdx = groupLines[`${idxGroup}`];
            svg
              .append('line')
              .attr('x1', column * ((width - 10) / legendGroup) - 10)
              .attr('x2', column * ((width - 10) / legendGroup))
              .attr(
                'y1',
                chartHeight + margin.top + 23 + offsetLabels + 20 * idxRow
              )
              .attr(
                'y2',
                chartHeight + margin.top + 23 + offsetLabels + 20 * idxRow
              )
              .text(groupLinesIdx.group)
              .style('font-size', fontSize)
              .attr('width', 10)
              .attr('height', 10)
              .attr('class', 'line')
              .style('stroke', groupLinesIdx.color)
              .style('stroke-dasharray', lineStrokeStyle(groupLinesIdx.group));

            svg
              .append('text')
              .attr('x', column * ((width - 10) / legendGroup) + 15)
              .attr(
                'y',
                chartHeight + margin.top + 23 + offsetLabels + 20 * idxRow
              )
              .text(groupLinesIdx.group)
              .style('font-size', fontSize)
              .attr('alignment-baseline', 'middle');
          }
          column++;
        }
      }
    }
    // If user double click, reinitialize the chart
    svg.on('dblclick', () => {
      x.domain(d3.extent(data, (d) => d.date));
      xAxis
        .transition()
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', `rotate(${xAxisLabelRotate})`)
        .style('text-anchor', 'middle');
      linesArray.forEach((line) => {
        line
          .select('.line')
          .transition()
          .attr(
            'd',
            d3
              .line()
              .curve(curveMethod)
              .x((d) => x(d.date))
              .y((d) => getYValueByGroup(d.group, d.value))
          );
      });
    });
  }

  render() {
    const id = this.props.id || 'LinesTimeZoomChart';
    const backgroundColor = Colors.white;
    return (
      <div
        id={id}
        ref={this.chartRef}
        style={{ backgroundColor }}
        data-testid="lines-time-zoom-chart-component"
      />
    );
  }
}

LinesTimeZoomChart.propTypes = {
  data: PropTypes.array.isRequired,
  y2Data: PropTypes.array,
  y2GroupName: PropTypes.string,
  chartMarginTop: PropTypes.number,
  chartMarginRight: PropTypes.number,
  chartMarginBottom: PropTypes.number,
  chartMarginLeft: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  id: PropTypes.string.isRequired,
  xAxisTitle: PropTypes.string,
  yAxisTitle: PropTypes.string,
  y2AxisTitle: PropTypes.string,
  groupLines: PropTypes.array,
  xAxisTitleMarginTop: PropTypes.number,
  hideLegends: PropTypes.bool,
  legendGroup: PropTypes.number,
  curveMethod: PropTypes.object,
  yAxisMaxValue: PropTypes.number,
  y2AxisMaxValue: PropTypes.number,
  offsetLabels: PropTypes.number,
  xAxisLabelRotate: PropTypes.number,
  xAxisLabelMarginLeft: PropTypes.number,
  xAxisLabelMarginTop: PropTypes.number,
};

export default LinesTimeZoomChart;
