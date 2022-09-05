import React from 'react';
import { message, Popconfirm } from 'antd';


export  const PopConfirmComponent= () => {
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('Click on Yes');
  };
  
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
  };
  return (
  <Popconfirm
    title="Are you sure to delete this task?"
    onConfirm={() => confirm}
    onCancel={() => cancel}
    okText="Yes"
    cancelText="No"
  >
    <a href="#">Delete</a>
  </Popconfirm>
  )
};
