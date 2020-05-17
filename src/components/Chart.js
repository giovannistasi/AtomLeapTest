import React, { useEffect } from 'react';
import * as d3 from 'd3';

function Chart({ fundingData }) {
  useEffect(() => {
    const nestedData = groupData(fundingData);
    drawChart(nestedData);
  }, [fundingData])

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
      .sort((a, b) => {
        return a.value.fundingRounds.length - b.value.fundingRounds.length;
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

    // define y axis
    const y = d3.scaleLinear()
      .domain([0, 10])
      .range([height, 0]);
    svg.append('g')
      .call(d3.axisLeft(y));

    // define size of bubble
    const z = d3.scaleLinear()
      .domain([0, 80])
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
        return y(d.value.fundingRounds.length)
      })
      .attr('r', d => {
        return z(Math.sqrt(d.value.fundingAmount))
      })
      .style('fill', 'gray')
      .style('opacity', '0.5')

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
      .text('# of funding rounds')
      .style('fill', 'gray')
  }

  return (
    <div id="chart-container"></div>
  )
}

export default Chart;