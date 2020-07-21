import React, { useState, useEffect } from 'react';
import ListItems from './ListItems';
import { Typography, Button, TextField, FormControl } from '@material-ui/core';

export default function InputFormFunctional(props) {
  const [text, setText] = useState('');
  const [items, setItems] = useState([
    { name: 'a', status: false, isEditing: false },
    { name: 'b', status: true, isEditing: false },
    { name: 'c', status: false, isEditing: false },
    { name: 'd', status: true, isEditing: false },
    { name: 'e', status: true, isEditing: false },
  ]);
  const [iDone, setDone] = useState([]);
  const [iTodo, setTodo] = useState([]);
  
  useEffect(() => {
    const done = items.filter(item => item.status === true);
    setDone(done);
    const todo = items.filter(item => item.status === false);
    setTodo(todo);
  }, [items]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!text || !text.trim()) {
      alert('Empty Input');
    } else {
      addNewText(text);
    }
    setText('');
  }

  const addNewText = (newText) => {
    const newItem = { name: newText, status: false, isEditing: false };
    const itemsCopy = [...items];
    itemsCopy.unshift(newItem);
    setItems(itemsCopy);
  }

  const deleteItem = (itemIndex, itemStatus) => {
    const itemsCopy = items.filter(item => item.status === itemStatus); // Copy of items to change
    const newItems = items.filter(item => item.status === !itemStatus); // Copy of items that won't change
    itemsCopy.splice(itemIndex, 1);
    newItems.push(...itemsCopy);
    setItems(newItems);
  }
  
  const checkChange = (e) => {
    setText(e.target.value);
  }
  
  const updateStatus = (newStatus, index) => {
    const itemsCopy = items.filter(item => item.status !== newStatus); // Copy of items to change
    const newItems = items.filter(item => item.status === newStatus); // Copy of items that won't change
    itemsCopy[index].status = newStatus;
    newItems.push(...itemsCopy);
    setItems(newItems);
  }
  
  const editMode = (index, isEdit, itemStatus) => {
    const itemsCopy = items.filter(item => item.status === itemStatus); // Copy of items to change
    const newItems = items.filter(item => item.status !== itemStatus); // Copy of items that won't change
    
    itemsCopy[index].isEditing = !isEdit;
    newItems.push(...itemsCopy);
    setItems(newItems);
  }
  
  const onEditChange = (e, index, itemStatus) => {
    const itemsCopy = items.filter(item => item.status === itemStatus); // Copy of items to change
    const newItems = items.filter(item => item.status !== itemStatus); // Copy of items that won't change
    itemsCopy[index].name = e.target.value;
    newItems.push(...itemsCopy);
    setItems(newItems);
  }

  return (
    <div>
      <FormControl fullWidth>
        <TextField label="Enter Task:" value={text} onChange={checkChange} />
        <Button color="primary" onClick={submitForm}>Submit</Button>
      </FormControl>
      {
        !!iTodo.length &&
        <div>
          <Typography variant="h5">To do:</Typography>
          <ListItems
            items={iTodo}
            deleteItem={deleteItem}
            checkStatus={updateStatus}
            editMode={editMode}
            onEditChange={onEditChange}
          />
        </div>
      }
      {
        !!iDone.length &&
        <div>
          <Typography variant="h5">Done:</Typography>
          <ListItems
            items={iDone}
            deleteItem={deleteItem}
            checkStatus={updateStatus}
            editMode={editMode}
            onEditChange={onEditChange}
          />
        </div>
      }
    </div>
  )
}