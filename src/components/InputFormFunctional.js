import React, { useState, useEffect, useMemo } from 'react';
import ListItems from './ListItems';
import { Typography, Button, TextField, FormControl } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

export default function InputFormFunctional(props) {
  const [text, setText] = useState('');
  const [items, setItems] = useState([
    { id: uuid(), name: 'a', status: false, isEditing: false },
    { id: uuid(), name: 'b', status: true, isEditing: false },
    { id: uuid(), name: 'c', status: false, isEditing: false },
    { id: uuid(), name: 'd', status: true, isEditing: false },
    { id: uuid(), name: 'e', status: true, isEditing: false },
  ]);
  
  const iDone = useMemo(() => {
    return items.filter(item => item.status === true);
  }, [items]);
  const iTodo = useMemo(() => {
    return items.filter(item => item.status === false);
  }, [items]);
  
  useEffect(() => {
    console.log(items);
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
    const newItem = { id: uuid(), name: newText, status: false, isEdit: false };
    const itemsCopy = [...items];
    itemsCopy.unshift(newItem);
    setItems(itemsCopy);
  }

  const deleteItem = (itemId) => {
    const newItems = [...items];
    const indexToRemove = newItems.findIndex(item => item.id === itemId);
    newItems.splice(indexToRemove, 1);
    setItems(newItems);
  }
  
  const checkChange = (e) => {
    setText(e.target.value);
  }
  
  const updateStatus = (newStatus, itemId) => {
    const newItems = [...items];
    const indexToUpdate = newItems.findIndex(item => item.id === itemId);
    newItems[indexToUpdate].status = newStatus;
    setItems(newItems);
  }
  
  const editMode = (itemId) => {
    const newItems = [...items];
    const indexToUpdate = newItems.findIndex(item => item.id === itemId);
    newItems[indexToUpdate].isEdit = !newItems[indexToUpdate].isEdit
    setItems(newItems);
  }
  
  const onEditChange = (e, itemId) => {
    const newItems = [...items];
    const indexToUpdate = newItems.findIndex(item => item.id === itemId);
    newItems[indexToUpdate].name = e.target.value;
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
            updateStatus={updateStatus}
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
            updateStatus={updateStatus}
            editMode={editMode}
            onEditChange={onEditChange}
          />
        </div>
      }
    </div>
  )
}