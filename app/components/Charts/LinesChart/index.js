import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Colors } from 'Theme';
import { scaledFormatYAxis } from 'Utils/reports';
import './styles.css';

const DEFAULT_MARGIN_TOP = 50;
const DEFAULT_MARGIN_BOTTOM = 100;
const DEFAULT_MARGIN_LEFT = 60;
const DEFAULT_MARGIN_RIGHT = 30;
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 300;
const DEFAULT_LEGEND_GROUP = 4;

/**
 * LinesChart
 * Creates and renders the LinesChart component using the d3 library.
 * `id` required property to instance the component and draw the chart.
 * `data` required property to instance the component and draw the chart.
 *  */
export class LinesChart extends Component {
  constructor() {
    super();

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.renderChart();
  }

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
    const { groupLines } = this.props;
    const xAxisTitleMarginTop = this.props.xAxisTitleMarginTop || 0;
    const xAxisLabelRotate = this.props.xAxisLabelRotate || 0;
    const xAxisLabelMarginLeft = this.props.xAxisLabelMarginLeft || 0;
    const xAxisLabelMarginTop = this.props.xAxisLabelMarginTop || 0;
    const hideLegends = this.props.hideLegends || false;
    const xAxisScaleType = this.props.xAxisScaleType || 'scaleLinear';
    const legendGroup = this.props.legendGroup || DEFAULT_LEGEND_GROUP;
    const curveMethod = this.props.curveMethod || d3.curveBasis;
    const yAxisMaxValue = this.props.yAxisMaxValue || null;
    const offsetLabels = this.props.offsetLabels || 0;
    const maxValueData = d3.max(data, (d) => +d.value) || 0;
    const fontSize = '0.6rem';
    const setmaxheight = 400;

    const svg = d3
      .select(this.chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', setmaxheight)
      .attr('class', 'chart')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    let x;

    // Draw X axis Labels
    if (xAxisScaleType !== 'scaleLinear') {
      x = d3
        .scaleBand()
        .range([0, chartWidth])
        .domain(data.map((d) => d.name));
    } else {
      x = d3
        .scaleLinear()
        .range([0, chartWidth])
        .domain(d3.extent(data, (d) => d.name));
    }

    svg
      .append('g')
      .attr('class', 'axis')
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
      .style('font-size', fontSize)
      .attr('alignment-baseline', 'middle');

    const extentData = d3.extent(data, (d) => d.value);
    // Validate if "yAxisMaxValue" is not null and "extentData" array have more than 1 value,
    // because extentData[1] save "Y" maxValue
    if (yAxisMaxValue && extentData.length > 1) {
      extentData[1] = yAxisMaxValue;
    }
    // Draw Y Axis labels
    const y = d3
      .scaleLinear()
      .range([chartHeight, 0])
      .domain(extentData);

    const ticks = y.ticks();
    // Add an extra tick at the top
    ticks.push(ticks[ticks.length - 1] + (ticks[1] - ticks[0]));
    // Add the Y Axis
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

    // Y Axis Title
    svg
      .append('text')
      .attr('x', -(chartHeight + margin.top) / 2)
      .attr('y', -margin.left + 15)
      .text(yAxisTitle)
      .style('font-size', fontSize)
      .attr('transform', 'translate(0,0)rotate(-90)')
      .attr('alignment-baseline', 'middle');

    const sumstat = d3.group(data, (d) => d.group);

    const fixedData = [];

    sumstat.forEach((item) => {
      fixedData.push({
        group: item[0].group,
        values: item,
        solidLine: item[0].solidLine,
      });
    });

    const groupNames = fixedData.map((item) => item.group);

    let colorByGroup;

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

    fixedData.forEach((item) => {
      svg
        .append('path')
        .datum(item.values)
        .attr('class', 'line')
        .style('stroke', colorByGroup(item.group))
        .style('stroke-dasharray', lineStrokeStyle(item.group))
        .attr('id', item.group) // assign ID
        .attr(
          'd',
          d3
            .line()
            .curve(curveMethod)
            .x((d) => x(d.name))
            .y((d) => y(d.value))
        );
    });

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
              .attr('y1', chartHeight + margin.top + offsetLabels + 20 * idxRow)
              .attr('y2', chartHeight + margin.top + offsetLabels + 20 * idxRow)
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
              .attr('y', chartHeight + margin.top + offsetLabels + 20 * idxRow)
              .text(groupLinesIdx.group)
              .style('font-size', fontSize)
              .attr('alignment-baseline', 'middle');
          }
          column++;
        }
      }
    }
  }

  render() {
    const id = this.props.id || 'LinesChart';
    const backgroundColor = Colors.white;
    return (
      <div
        id={id}
        ref={this.chartRef}
        style={{ backgroundColor }}
        data-testid="lines-chart-component"
      />
    );
  }
}

LinesChart.propTypes = {
  data: PropTypes.array.isRequired,
  chartMarginTop: PropTypes.number,
  chartMarginRight: PropTypes.number,
  chartMarginBottom: PropTypes.number,
  chartMarginLeft: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  xAxisTitle: PropTypes.string,
  yAxisTitle: PropTypes.string,
  groupLines: PropTypes.array,
  id: PropTypes.string.isRequired,
  xAxisLabelRotate: PropTypes.number,
  xAxisLabelMarginLeft: PropTypes.number,
  xAxisLabelMarginTop: PropTypes.number,
  xAxisTitleMarginTop: PropTypes.number,
  hideLegends: PropTypes.bool,
  xAxisScaleType: PropTypes.string,
  legendGroup: PropTypes.number,
  curveMethod: PropTypes.object,
  yAxisMaxValue: PropTypes.number,
  offsetLabels: PropTypes.number,
};

export default LinesChart;
