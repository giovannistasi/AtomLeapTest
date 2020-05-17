import React, { useEffect } from 'react';

function Chart ({ fundingData }) {
  useEffect(() => {
    console.log(fundingData)
  }, [fundingData])
  return (
    <div>Hello</div>
  )
}

export default Chart;