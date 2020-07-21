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
  const iDone = items.filter(item => item.status === true);
  const iTodo = items.filter(item => item.status === false);

  useEffect(() => {
    console.log('items modified');
  }, [iDone, iTodo]);

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

  // const editMode = (index, isEdit, status) => {
  //   if (status) {
  //     const iDoneCopy = [...itemsDone];
  //     iDoneCopy[index].isEditing = !isEdit;
  //     setDone(iDoneCopy);
  //   } else {
  //     const iTodoCopy = [...itemsTodo];
  //     iTodoCopy[index].isEditing = !isEdit;
  //     setTodo(iTodoCopy);
  //   }
  // }

  // const onEditChange = (e, index, itemStatus) => {
  //   if (itemStatus) {
  //     const iDoneCopy = [...itemsDone];
  //     iDoneCopy[index].name = e.target.value;
  //     setDone(iDoneCopy);
  //   } else {
  //     const iTodoCopy = [...itemsTodo];
  //     iTodoCopy[index].name = e.target.value;
  //     setTodo(iTodoCopy);
  //   }
  // }

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
            // editMode={editMode}
            // onEditChange={onEditChange}
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
            // editMode={editMode}
            // onEditChange={onEditChange}
          />
        </div>
      }
    </div>
  )
}