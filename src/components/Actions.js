import React from 'react';
import { IconButton, Box } from '@material-ui/core';
import { DeleteOutlined, EditOutlined, Done } from '@material-ui/icons';

export default function Actions({ delItem, editItem, isEdit }) {
  return (
    <Box width="30%">
      {
        isEdit ?
        <IconButton onClick={editItem}>
          <Done />
        </IconButton>:
        <IconButton color="primary" onClick={editItem}>
          <EditOutlined />
        </IconButton> 
      }
      <IconButton color="secondary" onClick={delItem}>
        <DeleteOutlined />
      </IconButton>
    </Box>
  )
}