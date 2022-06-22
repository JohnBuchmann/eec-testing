import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Colors } from 'Theme';
import './styles.css';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 300;
const DEFAULT_MARGIN = 50;
const INNER_RADIUS = 50;
const DEFAULT_LEGEND_GROUP = 3;
const DEFAULT_DONUT_WIDTH = 300;
const DEFAULT_FONT_SIZE = '0.6rem'; // This value is coming from FEAT
const DEFAULT_BAR_COLOR = Colors.primaryLight;

/**
 * DonutChart
 * Creates and renders the DonutChart component using the d3 library.
 * `id` required property to instance the component and draw the chart.
 * `data` required property to instance the component and draw the chart.
 * `barColors` required property to instance the component and draw the chart.
 */
export class DonutChart extends Component {
  constructor() {
    super();

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.renderChart();
  }

  /**
   * @method findBarColor
   * Finds the bar color assigned in the data object
   * into the barColors array to fill the donut bars.
   * @param item The object item from data to review
   * @param barColors The colors collection to compare.å
   * @return {string}
   */
  findBarColor = (item, barColors = []) => {
    const barColor = barColors.find(
      (color) => color.name.toUpperCase() === item.name.toUpperCase()
    );
    return barColor ? barColor.color : DEFAULT_BAR_COLOR;
  };

  /**
   * @method getGraphText
   * Gets the text to display in
   * the chart bar based on the value provided.
   * @param item The data item to display in the chart.
   * @return {string}
   */
  getGraphText = (item) =>
    item.value > 0 && item.displayValue ? `${item.displayValue}` : '';

  /**
   * Renders Pie Chart
   */
  renderChart() {
    const data = this.props.data || [];
    const width = this.props.width || DEFAULT_WIDTH;
    const donutWidth = this.props.donutWidth || DEFAULT_DONUT_WIDTH;
    const height = this.props.height || DEFAULT_HEIGHT;
    const margin = this.props.margin || DEFAULT_MARGIN;
    const innerRadius = this.props.radius || INNER_RADIUS;
    const hideLegends = this.props.hideLegends || false;
    const legendGroup = this.props.legendGroup || DEFAULT_LEGEND_GROUP;
    const legendToSide = this.props.legendToSide || false;
    const hideSliceLabels = this.props.hideSliceLabels || false;
    const { barColors } = this.props;
    // shift x-alignment of donut if legend shows next to it
    const xAlignment = legendToSide ? 4 : 2;
    // boost height of the donut if legend shows below it
    const yAlignment = legendToSide ? height / 2 : 130;
    // Creates sources <svg> element
    const svg = d3
      .select(this.chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'chart');

    const graph = svg
      .append('g')
      .attr('transform', `translate(${width / xAlignment}, ${yAlignment})`);

    const radius = Math.min(donutWidth - margin, height - margin) / 2;

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(innerRadius);

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

    arcs
      .attr('d', arc)
      .style('fill', (d) => this.findBarColor(d.data, barColors));

    graph
      .selectAll('slices')
      .data(pie(data))
      .enter()
      .append('text')
      .text((d) => (hideSliceLabels ? '' : this.getGraphText(d.data)))
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '13px')
      .style('font-weight', 800);

    let rowIndex = 0;
    let colIndex = 0;

    /**
     * displayValuePadding
     * @param {number} length input length of the value for which padding will be calculated.
     * returns number of px needed to pad that number. (horiz padding)
     */
    const displayValuePadding = (length) => {
      let len;
      switch (length) {
        case 4: // example: 0.4%
          len = 10;
          break;
        case 5: // example: 43.5%
          len = 5;
          break;
        default:
          // example: 100.0% or any other length
          len = 0;
          break;
      }
      return len;
    };

    if (!hideLegends) {
      for (let idxGroup = 0, len = data.length; idxGroup < len; idxGroup++) {
        const dataIdxGroup = data[`${idxGroup}`];
        const barColor = this.findBarColor(dataIdxGroup, barColors);
        if (legendToSide) {
          // whether or not we show legends on the side or below the donut
          svg
            .append('rect')
            .attr('x', 350)
            .attr('y', height / 2 - data.length * 7.5 + idxGroup * 15)
            .text(dataIdxGroup.name)
            .style('font-size', DEFAULT_FONT_SIZE)
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', barColor);

          svg
            .append('text')
            .attr('x', 365)
            .attr('y', height / 2 - data.length * 7.5 + idxGroup * 15 + 5)
            .text(dataIdxGroup.name)
            .style('font-size', DEFAULT_FONT_SIZE)
            .attr('alignment-baseline', 'middle');

          svg
            .append('text')
            .attr(
              'x',
              500 + displayValuePadding(dataIdxGroup.displayValue.length)
            )
            .attr('y', height / 2 - data.length * 7.5 + idxGroup * 15 + 5)
            .text(
              hideSliceLabels ? dataIdxGroup.displayValue : dataIdxGroup.value
            )
            .style('font-size', DEFAULT_FONT_SIZE)
            .attr('alignment-baseline', 'middle');
        } else {
          svg
            .append('rect')
            .attr('x', margin / 2 + colIndex * (width / legendGroup))
            .attr('y', height - (margin - 20) + rowIndex * 15)
            .text(dataIdxGroup.name)
            .style('font-size', DEFAULT_FONT_SIZE)
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', barColor);

          svg
            .append('text')
            .attr('x', margin / 2 + colIndex * (width / legendGroup) + 15)
            .attr('y', height - (margin - 25) + rowIndex * 15)
            .text(dataIdxGroup.name)
            .style('font-size', DEFAULT_FONT_SIZE)
            .attr('alignment-baseline', 'middle');

          svg
            .append('text')
            .attr('x', margin / 2 + colIndex * (width / legendGroup) + 25)
            .attr('y', height - (margin - 25) + rowIndex * 15 + 15)
            .text(dataIdxGroup.value)
            .style('font-size', DEFAULT_FONT_SIZE)
            .attr('alignment-baseline', 'middle');
        }
        colIndex++;

        if (colIndex === legendGroup) {
          colIndex = 0;
          rowIndex++;
        }
      }
    }
  }

  render() {
    const id = this.props.id || 'DonutChart';
    const backgroundColor = Colors.white;
    return (
      <div
        id={id}
        ref={this.chartRef}
        style={{ backgroundColor }}
        data-testid="donut-chart-component"
      />
    );
  }
}

DonutChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.number,
  radius: PropTypes.number,
  hideLegends: PropTypes.bool,
  id: PropTypes.string.isRequired,
  legendGroup: PropTypes.number,
  donutWidth: PropTypes.number,
  barColors: PropTypes.array.isRequired,
  legendToSide: PropTypes.bool,
  hideSliceLabels: PropTypes.bool,
};

export default DonutChart;
