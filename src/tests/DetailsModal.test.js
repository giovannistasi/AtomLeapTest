import DetailsModal from '../components/DetailsModal';
import mockData from './mocks';
import ReactDOM from 'react-dom';
import React from 'react';

describe('DetailsModal', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <DetailsModal
        tableData={mockData}
        visible={true}
        toggleModal={() => { }}
      />,
      div
    );
  });

});