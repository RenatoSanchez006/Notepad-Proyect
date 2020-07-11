import React from 'react';
import Actions from './Actions';
import { List, ListItem } from '@material-ui/core';

export default function ListItems({ items, deleteItem }) {
  const listItems = items.map((item, index) => {
    const delItem = () => deleteItem(index);
    return (
      <div key={index}>
        <ListItem>{item}</ListItem>
        <Actions delItem={delItem} />
      </div>

    );
  });

  return (
    <List>
      {listItems}
    </List>
  );
}