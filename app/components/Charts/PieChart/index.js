import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './styles.css';

import { Colors } from 'Theme';

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 350;
const DEFAULT_MARGIN = 50;

/**
 * PieChart
 * Creates and renders the PieChart component using the d3 library.
 * `id` required property to instance the component and draw the chart.
 * `data` required property to instance the component and draw the chart.
 */
export class PieChart extends Component {
  constructor() {
    super();

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.renderChart();
  }

  /**
   * @method getDisplayValue
   * Gets the element displayValue
   * property to format the chart with its value.
   * @param item The chart item data.
   * @return {string}
   */
  getDisplayValue = (item) => {
    if (!item) {
      return '';
    }
    return item.displayValue ? `${item.displayValue}` : '';
  };

  /**
   * Renders Pie Chart
   */
  renderChart() {
    const data = this.props.data || [];
    const displayLegends = this.props.displayLegends || false;
    const width = this.props.width || DEFAULT_WIDTH;
    const height = this.props.height || DEFAULT_HEIGHT;
    const margin = this.props.margin || DEFAULT_MARGIN;

    // Creates sources <svg> element
    const svg = d3
      .select(this.chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'chart');

    const graph = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const radius = Math.min(width - margin, height - margin) / 2;

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3.pie().value((d) => d.value);

    const arcs = graph
      .selectAll('slices')
      .data(pie(data))
      .join((enter) =>
        enter
          .append('path')
          .attr('class', 'arc')
          .style('stroke', 'white')
      );

    arcs.attr('d', arc).style('fill', (d) => d.data.color);

    graph
      .selectAll('slices')
      .data(pie(data))
      .enter()
      .append('text')
      .text((d) => this.getDisplayValue(d.data))
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', 18)
      .style('font-weight', 800)
      .attr('class', 'shadow');

    let rowIndex = 0;
    let colIndex = 0;

    if (displayLegends) {
      for (let idxGroup = 0, len = data.length; idxGroup < len; idxGroup++) {
        const idxGroupData = data[`${idxGroup}`];
        svg
          .append('rect')
          .attr('x', margin / 2 + colIndex * (width / 3))
          .attr('y', height - (margin - 20) + rowIndex * 15)
          .text(idxGroupData.name)
          .style('font-size', '0.6rem')
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', idxGroupData.color);

        svg
          .append('text')
          .attr('x', margin / 2 + colIndex * (width / 3) + 15)
          .attr('y', height - (margin - 25) + rowIndex * 15)
          .text(idxGroupData.name)
          .style('font-size', '0.6rem')
          .attr('alignment-baseline', 'middle');

        colIndex++;

        if (colIndex === 3) {
          colIndex = 0;
          rowIndex++;
        }
      }
    }
  }

  render() {
    const id = this.props.id || 'PieChart';
    const backgroundColor = Colors.white;
    return (
      <div
        id={id}
        ref={this.chartRef}
        style={{ backgroundColor }}
        data-testid="pie-chart-component"
      />
    );
  }
}

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.number,
  displayLegends: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

export default PieChart;
