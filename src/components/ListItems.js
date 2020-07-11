import React from 'react';
import Actions from './Actions';
import '../index.css';
import { List, ListItem, ListItemText, Checkbox, ListItemIcon } from '@material-ui/core';

export default function ListItems({ items, deleteItem }) {
  const listItems = items.map((item, index) => {
    const delItem = () => deleteItem(index);
    return (
      <ListItem key={index}>
        <ListItemIcon>
          <Checkbox /* checked={true}  *//>
        </ListItemIcon>
        <ListItemText>{item.name}</ListItemText>
        <Actions delItem={delItem} />
      </ListItem>

    );
  });

  return (
    <List>
      {listItems}
    </List>
  );
}