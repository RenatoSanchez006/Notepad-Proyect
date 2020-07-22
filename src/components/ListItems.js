import React from 'react';
import Actions from './Actions';
import { List, ListItem, ListItemText, Checkbox, ListItemIcon, Divider, TextField, Box } from '@material-ui/core';


export default function ListItems({ items, deleteItem, checkStatus, editMode, onEditChange }) {
  const listItems = items.map(({
    status,
    name,
    isEditing
  }, index) => {
    const delItem = () => deleteItem(index, status);
    const newStatus = (event) => checkStatus (event.target.checked, index);
    const editItem = () => editMode (index, isEditing, status);
    const edit = (event) => onEditChange (event, index, status);
    return (
      <div key={index}>
        <ListItem>
          <ListItemIcon>
            <Checkbox onChange={newStatus} checked={status}/>
          </ListItemIcon>
          <Box width="80%">
          {
            isEditing ?
            <TextField fullWidth value={name} onChange={edit}/> : 
            <ListItemText>{name}{isEditing}</ListItemText>
          }
          </Box>
          <Actions delItem={delItem} editItem={editItem} isEdit={isEditing}/>
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
