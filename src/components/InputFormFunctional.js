import React, { useState } from 'react';
import ListItems from './ListItems';
import { Typography, Button, TextField, FormControl } from '@material-ui/core';

export default function InputFormFunctional(props) {
  const [text, setText] = useState('');
  const [itemsTodo, setTodo] = useState([{ name: 'a', status: false, isEditing: false }]);
  const [itemsDone, setDone] = useState([]);

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
    const iTodoCopy = [...itemsTodo];
    iTodoCopy.unshift(newItem);
    setTodo(iTodoCopy);
  }

  const deleteItem = (index, status) => {
    if (status) {
      const iDoneCopy = [...itemsDone];
      iDoneCopy.splice(index, 1);
      setDone(iDoneCopy);
    } else {
      const iTodoCopy = [...itemsTodo];
      iTodoCopy.splice(index, 1);
      setTodo(iTodoCopy);
    }
  }
  
  const checkChange = (e) => {
    setText(e.target.value);
  }
  
  const updateStatus = (newStatus, index) => {
    const item = newStatus ? itemsTodo[index] : itemsDone[index];
    const newItem = {
      ...item,
      status: newStatus
    }

    deleteItem(index, !newStatus);
    if (newStatus) {
      const iDoneCopy = [...itemsDone];
      iDoneCopy.push(newItem);
      setDone(iDoneCopy);
    } else {
      const iTodoCopy = [...itemsTodo];
      iTodoCopy.push(newItem);
      setTodo(iTodoCopy);
    }
  }

  const editMode = (index, isEdit, status) => {
    if (status) {
      const iDoneCopy = [...itemsDone];
      iDoneCopy[index].isEditing = !isEdit;
      setDone(iDoneCopy);
    } else {
      const iTodoCopy = [...itemsTodo];
      iTodoCopy[index].isEditing = !isEdit;
      setTodo(iTodoCopy);
    }
  }

  const onEditChange = (e, index, itemStatus) => {
    if (itemStatus) {
      const iDoneCopy = [...itemsDone];
      iDoneCopy[index].name = e.target.value;
      setDone(iDoneCopy);
    } else {
      const iTodoCopy = [...itemsTodo];
      iTodoCopy[index].name = e.target.value;
      setTodo(iTodoCopy);
    }
  }

  const todoLen = itemsTodo.length;
  const doneLen = itemsDone.length;
  return (
    <div>
      <FormControl fullWidth>
        <TextField label="Enter Task:" value={text} onChange={checkChange} />
        <Button color="primary" onClick={submitForm}>Submit</Button>
      </FormControl>
      {
        todoLen > 0 &&
        <div>
          <Typography variant="h5">To do:</Typography>
          <ListItems
            items={itemsTodo}
            deleteItem={deleteItem}
            checkStatus={updateStatus}
            editMode={editMode}
            onEditChange={onEditChange}
          />
        </div>
      }
      {
        doneLen > 0 &&
        <div>
          <Typography variant="h5">Done:</Typography>
          <ListItems
            items={itemsDone}
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