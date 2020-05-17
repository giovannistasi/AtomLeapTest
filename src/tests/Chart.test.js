import Chart from '../components/Chart';
import mockData from './mocks';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Chart', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Chart
        fundingData={mockData}
        dataOptions={'fundingAmount'}
        handleCircleClick={() => { }}
      />,
      div
    );
  });

  it('should render an svg inside its container', () => {
    const { container } = render(
      <Chart
        fundingData={mockData}
        dataOptions={'fundingAmount'}
        handleCircleClick={() => { }}
      />
    );
    expect(container.querySelector('#chart-container svg')).toBeTruthy();
  });

  it('should display different labels and ticks when a different data option is given', () => {

    render(
      <Chart
        fundingData={mockData}
        dataOptions={'fundingAmount'}
        handleCircleClick={() => { }}
      />
    );
    expect(screen.queryByText('# of funding rounds')).toBeTruthy();
    expect(screen.queryByText('10')).toBeTruthy();

    render(
      <Chart
        fundingData={mockData}
        dataOptions={'fundingRounds'}
        handleCircleClick={() => { }}
      />
    );
    expect(screen.queryByText('10M')).toBeTruthy();
  });


});