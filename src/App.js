import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './components/Chart';
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

function App() {
  const [fundingData, setFundingData] = useState([]);
  const [dataOptions, setDataOptions] = useState('fundingAmount')

  useEffect(() => {
    fetch('http://demo0377384.mockable.io/funding-test')
      .then(res => res.json())
      .then(data => {
        setFundingData(data);
      })
  }, []);

  function handleSelect(value) {
    setDataOptions(value);
  }

  return (
    <div className="app-container">
      <h1>Funding by Industry Analytics</h1>
      <div className="select-container">
        <div>Data:</div>
        <Select defaultValue="fundingAmount" onChange={handleSelect} style={{ width: 210 }}>
          <Option value="fundingAmount">Funding amount</Option>
          <Option value="fundingRounds">Number of funding rounds</Option>
        </Select>
      </div>
      <Chart fundingData={fundingData} dataOptions={dataOptions}></Chart>
    </div>
  )
}

export default App;
