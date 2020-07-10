import React from 'react';
import Actions from './Actions';

export default function ListItems({ items, deleteItem }) {
  const listItems = items.map((item, index) => {
    const delItem = () => deleteItem(index);
    return (
      <div key={index}>
        <li>{item}</li>
        <Actions delItem={delItem} />
      </div>

    );
  });

  return (
    <ul>
      {listItems}
    </ul>
  );
}