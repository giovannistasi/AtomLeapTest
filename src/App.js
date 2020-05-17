import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './components/Chart';


function App() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    fetch('http://demo0377384.mockable.io/funding-test')
      .then(res => res.json())
      .then(data => {
        setFundingData(data);
      })
  }, [])

  return (
    <Chart fundingData={fundingData}></Chart>
  )
}

export default App;
