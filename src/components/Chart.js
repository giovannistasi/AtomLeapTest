import React, { useEffect } from 'react';
import * as d3 from 'd3';

function Chart({ fundingData, dataOptions, handleCircleClick }) {

  useEffect(() => {
    const data = groupData(fundingData);
    drawChart(data);
  }, [fundingData, dataOptions])

  // group the data by category and calculate the total funding
  function groupData(data) {
    const nestedData = d3.nest()
      .key(d => d.category)
      .rollup(v => {
        return {
          fundingAmount: d3.sum(v, d => d.fundingAmount),
          fundingRounds: v
        }
      })
      .entries(data)
      // sort circles in ascending order based on the type of data selected
      .sort((a, b) => {
        return dataOptions === 'fundingAmount' ?
          a.value.fundingRounds.length - b.value.fundingRounds.length :
          a.value.fundingAmount - b.value.fundingAmount;
      });
    return nestedData;
  }

  function drawChart(nestedData) {
    // remove previous svg before drawing new one
    d3.select('#chart-container > svg').remove();

    // declare chart size
    const margin = { top: 70, right: 20, bottom: 60, left: 70 },
      width = 710 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const category = d3.map(nestedData, d => d.key).keys();

    // append svg to container
    const svg = d3.select('#chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // define x axis
    const x = d3.scalePoint()
      .range([0, width])
      .domain(category)
      .padding(0.3);
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // define y axis, linear if displaying number of rounds or log if displaying funding amount
    const y = dataOptions === 'fundingAmount' ?
      d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0]) :
      d3.scaleLog()
        .domain([10000, 50000000])
        .range([height, 0])
        .base(10);

    // modify tick values and format depending on type of data selected
    if (dataOptions === 'fundingAmount') {
      svg.append('g')
        .call(d3.axisLeft(y))
    } else {
      svg.append('g')
        .call(d3.axisLeft(y)
          .tickValues([10000, 100000, 1000000, 10000000, 50000000])
          .tickFormat(d => d3.format('.2s')(d)));
    }

    // define size of bubble depending on type of data selected
    const z = d3.scaleLinear()
      .domain(dataOptions === 'fundingAmount' ? [0, 80] : [0, 10])
      .range([0, 1]);

    // create circles
    const circles = svg.selectAll('g.circles')
      .data(nestedData)
      .enter()
      .append('g')
      .classed('circles', true);

    circles.append('svg:circle');
    circles.selectAll('circle')
      .attr('cx', d => x(d.key))
      .attr('cy', d => {
        return dataOptions === 'fundingAmount' ?
          y(d.value.fundingRounds.length) :
          y(d.value.fundingAmount);
      })
      .attr('r', d => {
        return dataOptions === 'fundingAmount' ?
          z(Math.sqrt(d.value.fundingAmount)) :
          10 * d.value.fundingRounds.length;
      })
      .style('fill', () => 'hsl(' + Math.random() * 360 + ',100%,50%)')
      .style('opacity', '0.5')

    // append text anchor to circles displaying their z (size) value
    circles.append('text');
    circles.selectAll('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(d => {
        return dataOptions === 'fundingAmount' ?
          d3.format('.2s')(d.value.fundingAmount) :
          d.value.fundingRounds.length;
      })
      .attr('x', d => x(d.key))
      .attr('y', d => {
        return dataOptions === 'fundingAmount' ?
          y(d.value.fundingRounds.length) :
          y(d.value.fundingAmount);
      })
      .attr('class', 'bubble-text')
      .attr('fill', 'black')
      .style('opacity', '0.8');

    // append label to x axis
    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('text-anchor', 'middle')
      .text('Categories')
      .style('fill', 'gray')

    // append label to y axis
    svg.append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2))
      .attr('y', -50)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text(dataOptions === 'fundingAmount' ?
        '# of funding rounds' :
        'Funding amount')
      .style('fill', 'gray')

    // add click event on circles
    svg.selectAll('circle')
      .on('click', handleCircleClick);
  };

  return (
    <div id="chart-container"></div>
  )
}

export default Chart;