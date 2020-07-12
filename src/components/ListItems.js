import React from 'react';
import Actions from './Actions';
import { List, ListItem, ListItemText, Checkbox, ListItemIcon, Divider } from '@material-ui/core';

export default function ListItems({ items, deleteItem, checkStatus }) {
  const listItems = items.map((item, index) => {
    const delItem = () => deleteItem(index, item.status);
    return (
      <div>
        <ListItem key={index}>
          <ListItemIcon>
            <Checkbox onChange={checkStatus} checked={item.status} value={index} />
          </ListItemIcon>
          <ListItemText>{item.name}</ListItemText>
          <Actions delItem={delItem} />
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