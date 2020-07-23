import React, { useState, useEffect, useMemo } from 'react';
import ListItems from './ListItems';
import { Typography, Button, TextField, FormControl } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

// const todos = new Array(50).fill(null).map(() => ({ id: uuid(), name: 'spider', status: false, isEdit: false }));
// const dones = new Array(50).fill(null).map(() => ({ id: uuid(), name: 'man', status: true, isEdit: false }));

export default function InputFormFunctional(props) {
  const [text, setText] = useState('');
  const [editionMode, setEditionMode] = useState(false);
  const [editionText, setEditionText] = useState('');
  const [items, setItems] = useState([
    { id: uuid(), name: 'a', status: false, isEdit: false },
    { id: uuid(), name: 'b', status: true, isEdit: false },
    { id: uuid(), name: 'c', status: false, isEdit: false },
    { id: uuid(), name: 'd', status: true, isEdit: false },
    { id: uuid(), name: 'e', status: true, isEdit: false },
    // ...todos, ...dones
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
    newItems.find(item => item.id === itemId).status = newStatus; // Update item status by id
    setItems(newItems);
  }
  
  const editMode = (itemId, newEdit) => {
    if (!editionMode) {
      setEditionMode(true);
      const itemsCopy = [...items];
      itemsCopy.find(item => item.id === itemId).isEdit = !newEdit; // Update isEdit by id
      setItems(itemsCopy);
      const newEditText = itemsCopy.find(item => item.id === itemId).name; // Get item to edit name by id
      setEditionText(newEditText);
    }
  }
  
  const onEditTextChange = (e) => {
    setEditionText(e.target.value);
  }

  const saveEditChange = (itemId) => {
    const itemsCopy = [...items];
    itemsCopy.find(item => item.id === itemId).name = editionText;
    itemsCopy.find(item => item.id === itemId).isEdit = false;
    setItems(itemsCopy);
    setEditionText('');
    setEditionMode(false);
  }
  
  const cancelEditChange = (itemId) => {
    const itemsCopy = [...items];
    itemsCopy.find(item => item.id === itemId).isEdit = false;
    setItems(itemsCopy);
    setEditionText('');
    setEditionMode(false);
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
            onEditTextChange={onEditTextChange}
            editionText={editionText}
            saveChange={saveEditChange}
            cancelChange={cancelEditChange}
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
            onEditTextChange={onEditTextChange}
            editionText={editionText}
            saveChange={saveEditChange}
            cancelChange={cancelEditChange}
          />
        </div>
      }
    </div>
  )
}