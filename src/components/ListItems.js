import React from 'react';
import Actions from './Actions';

export default function ListItems({ items }) {

  const listItems = items.map((item, index) =>
    <div key={index}>
      <li>{item}</li>
      {/* <Actions onClick={this.deleteItem} /> */}
    </div>
  )

  return (
    <ul>
      {listItems}
    </ul>
  )
}