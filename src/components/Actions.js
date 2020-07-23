import React from 'react';
import { IconButton, Box } from '@material-ui/core';
import { DeleteOutlined, EditOutlined, CheckCircleOutline, CancelOutlined } from '@material-ui/icons';

export default function Actions({ delItem, editItem, isEdit, saveEdit, cancelEdit, status }) {
  return (
    <Box width="30%">
      {
        !isEdit ?
          <div>
            <IconButton color="primary" onClick={editItem} disabled={status}>
              <EditOutlined />
            </IconButton>
            <IconButton color="secondary" onClick={delItem}>
              <DeleteOutlined />
            </IconButton>
          </div> :
          <div>
            <IconButton color="primary" onClick={saveEdit}>
              <CheckCircleOutline />
            </IconButton>
            <IconButton color="secondary" onClick={cancelEdit}>
              <CancelOutlined />
            </IconButton>
          </div> 
      }
    </Box>
  )
}