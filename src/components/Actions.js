import React from 'react';
import { IconButton } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';

export default function Actions({ delItem }) {
  return (
    <div>
      <IconButton color="primary">
        <EditOutlined />
      </IconButton>
      <IconButton color="secondary" onClick={delItem}>
        <DeleteOutlined />
      </IconButton>
    </div>
  )
}