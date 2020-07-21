import React from 'react';
import Actions from './Actions';
import { List, ListItem, ListItemText, Checkbox, ListItemIcon, Divider, TextField, Box } from '@material-ui/core';

export default function ListItems({ items, deleteItem, checkStatus, editMode }) {
  const listItems = items.map((item, index) => {
    const delItem = () => deleteItem(index, item.status);
    const editItem = () => editMode (index, item.isEditing, item.status);
    return (
      <div key={index}>
        <ListItem>
          <ListItemIcon>
            <Checkbox onChange={checkStatus} checked={item.status} value={index} />
          </ListItemIcon>
          <Box width="80%">
          {
            item.isEditing ?
            <TextField fullWidth value={item.name} /> : 
            <ListItemText>{item.name}</ListItemText>
          }
          </Box>
          <Actions delItem={delItem} editItem={editItem} isEdit={item.isEditing}/>
        </ListItem>
        <Divider />
      </div>
    );
  });

  return (
    <List>
      {listItems}
    </List>
  );
}
