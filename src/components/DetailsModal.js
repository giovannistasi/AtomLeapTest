import React from 'react';
import { Modal, Table } from 'antd';

function DetailsModal({ data, visible, toggleModal }) {
  // define column titles
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Funding Amount',
      dataIndex: 'fundingAmount',
    },
    {
      title: 'Announced Date',
      dataIndex: 'announcedDate',
    }
  ];
  return (
    <Modal
      title={'Details'}
      centered
      visible={visible}
      onCancel={toggleModal}
      footer={null}
    >
      <Table columns={columns} dataSource={data} pagination={false}></Table>
    </Modal>
  );
}

export default DetailsModal;