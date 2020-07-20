import React, { useState } from 'react';
import ListItems from './ListItems';
import { Typography, Button, Input, InputLabel, FormControl } from '@material-ui/core';

export default function InputFormFunctional(props) {
  const [text, setText] = useState('');
  const [itemsTodo, setTodo] = useState([{ name: 'a', status: false }]);
  const [itemsDone, setDone] = useState([{ name: 'a', status: true }]);

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
    const newItem = { name: newText, status: false };
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
  
  const updateStatus = (event) => {
    const index = event.target.value;
    const status = event.target.checked;
    const name = status ? itemsTodo[index].name : itemsDone[index].name;
    const newItem = { name, status };
    
    deleteItem(index, !status);
    if (status) {
      const iDoneCopy = [...itemsDone];
      iDoneCopy.push(newItem);
      setDone(iDoneCopy);
    } else {
      const iTodoCopy = [...itemsTodo];
      iTodoCopy.push(newItem);
      setTodo(iTodoCopy);
    }
  }

  const todoLen = itemsTodo.length;
  const doneLen = itemsDone.length;
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Enter Text:</InputLabel>
        <Input value={text} onChange={checkChange} />
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
          />
        </div>
      }
    </div>
  )
}