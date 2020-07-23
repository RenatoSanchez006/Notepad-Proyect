import React from 'react';
import Actions from './Actions';
import { List, ListItem, ListItemText, Checkbox, ListItemIcon, Divider, TextField, Box } from '@material-ui/core';


export default function ListItems({ items, deleteItem, updateStatus, editMode, onEditChange }) {
  const listItems = items.map((item) => {
    const delItem = () => deleteItem(item.id);
    const newStatus = (event) => updateStatus(event.target.checked, item.id);
    const editItem = () => editMode(item.id);
    const edit = (event) => onEditChange(event, item.id);
    return (
      <div key={item.id}>
        <ListItem>
          <ListItemIcon>
            <Checkbox onChange={newStatus} checked={item.status}/>
          </ListItemIcon>
          <Box width="80%">
          {
            item.isEdit ?
            <TextField fullWidth value={item.name} onChange={edit}/> : 
            <ListItemText>{item.name}</ListItemText>
          }
          </Box>
          <Actions delItem={delItem} editItem={editItem} isEdit={item.isEdit}/>
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