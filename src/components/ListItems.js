import React from 'react';
import Actions from './Actions';
import { List, ListItem, ListItemText, Checkbox, ListItemIcon, Divider, TextField, Box } from '@material-ui/core';


export default function ListItems({ items, deleteItem, checkStatus, editMode, onEditChange }) {
  const listItems = items.map((item, index) => {
    const delItem = () => deleteItem(index, item.status);
    const newStatus = (event) => checkStatus (event.target.checked, index);
    const editItem = () => editMode (index, item.isEditing, item.status);
    const edit = (event) => onEditChange (event, index, item.status);
    return (
      <div key={index}>
        <ListItem>
          <ListItemIcon>
            <Checkbox onChange={newStatus} checked={item.status}/>
          </ListItemIcon>
          <Box width="80%">
          {
            item.isEditing ?
            <TextField fullWidth value={item.name} onChange={edit}/> : 
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
