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
    console.log(nestedData);
  }

  return (
    <div>Hello</div>
  )
}

export default Chart;