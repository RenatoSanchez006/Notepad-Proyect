import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ListItems from './ListItems';
import { Typography, Button, TextField, FormControl } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

export default function InputFormFunctional(props) {
  const [text, setText] = useState('');
  const [editionMode, setEditionMode] = useState(false);
  const [editionText, setEditionText] = useState('');
  const [items, setItems] = useState([]);
  
  const iDone = useMemo(() => {
    return items.filter(item => item.status === true);
  }, [items]);
  const iTodo = useMemo(() => {
    return items.filter(item => item.status === false);
  }, [items]);
  
  useEffect(() => {
    console.log(items);
  }, [items]);
  
  const addNewText = useCallback((newText) => {
    const newItem = { id: uuid(), name: newText, status: false, isEdit: false };
    const itemsCopy = [...items];
    itemsCopy.unshift(newItem);
    setItems(itemsCopy);
  }, [items]);

  const submitForm = useCallback((e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Empty Task');
    } else {
      addNewText(text);
    }
    setText('');
  }, [text, addNewText]);

  const deleteItem = useCallback((itemId) => {
    const newItems = [...items];
    const indexToRemove = newItems.findIndex(item => item.id === itemId);
    newItems.splice(indexToRemove, 1);
    setItems(newItems);
  }, [items]);
  
  const checkChange = useCallback((e) => {
    setText(e.target.value);
  }, []);
  
  const updateStatus = useCallback((newStatus, itemId) => {
    if (editionMode) { // Verify if an element it's currently in edition Mode 
      alert('Save or cancel changes');
      return;
    }
    const newItems = [...items];
    newItems.find(item => item.id === itemId).status = newStatus; // Update item status by id
    setItems(newItems);
  }, [items, editionMode]);
  
  const editMode = useCallback((itemId, newEdit) => {
    if (!editionMode) { // Verify if an element it's currently in edition Mode
      setEditionMode(true);
      const itemsCopy = [...items];
      itemsCopy.find(item => item.id === itemId).isEdit = !newEdit; // Update isEdit by id
      setItems(itemsCopy);
      const newEditText = itemsCopy.find(item => item.id === itemId).name; // Get item to edit name by id
      setEditionText(newEditText);
    }
  }, [items, editionMode]);
  
  const onEditTextChange = useCallback((e) => {
    setEditionText(e.target.value);
  }, []);

  const saveEditChange = useCallback((itemId) => {
    if (!editionText.trim()) {
      alert('Empty Task');
      return;
    }
    const itemsCopy = [...items];
    itemsCopy.find(item => item.id === itemId).name = editionText; // Set item.name to editionText
    itemsCopy.find(item => item.id === itemId).isEdit = false; // Set item.isEdit to false
    setItems(itemsCopy);
    setEditionText('');
    setEditionMode(false);
  }, [items, editionText]);
  
  const cancelEditChange = useCallback((itemId) => {
    const itemsCopy = [...items];
    itemsCopy.find(item => item.id === itemId).isEdit = false;
    setItems(itemsCopy);
    setEditionText('');
    setEditionMode(false);
  }, [items]);
  
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