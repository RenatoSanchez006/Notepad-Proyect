import React, { useState, useMemo, useCallback } from 'react';
import ListItems from './ListItems';
import { Typography, Button, TextField, FormControl } from '@material-ui/core';

function fetchAllData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        done: [{ name: 'take garbage out', status: true }],
        todo: [{ name: 'finish chores', status: false  }]
      });
    }, 3000);
  });
}

const todoPayload = new Array(100).fill(null).map(() => ({ name: 'a', status: false, isEditing: false }));
const donePayload = new Array(100).fill(null).map(() => ({ name: 'b', status: true, isEditing: false }));
export default function InputFormFunctional(props) {
  const [text, setText] = useState('');
  const [items, setItems] = useState([...todoPayload, ...donePayload]);

  const done = useMemo(() => {
    return items.filter(item => item.status === true);
  }, [items]);
  const todo = useMemo(() => {
    return items.filter(item => item.status === false);
  }, [items]);

  const getLists = useCallback((itemStatus) => {
    const doneCopy = [...done];
    const todoCopy = [...todo];
    if (itemStatus) {
      return [doneCopy, todoCopy];
    }

    return [todoCopy, doneCopy];
  }, [done, todo]);
  
  const addNewText = useCallback((newText) => {
    const newItem = { name: newText, status: false, isEditing: false };
    const itemsCopy = [...items];
    itemsCopy.unshift(newItem);
    setItems(itemsCopy);
  }, [items])

  const submitForm = useCallback((e) => {
    e.preventDefault();
    if (!text || !text.trim()) {
      alert('Empty Input');
    } else {
      addNewText(text);
    }
    setText('');
  }, [text, addNewText]);


  const deleteItem = useCallback((itemIndex, itemStatus) => {
    const [itemsCopy, newItems] = getLists(itemStatus);
    itemsCopy.splice(itemIndex, 1);
    newItems.push(...itemsCopy);
    setItems(newItems);
  }, [getLists])
  
  const checkChange = useCallback((e) => {
    setText(e.target.value);
  }, []);
  
  const updateStatus = useCallback((newStatus, index) => {
    const [itemsCopy, newItems] = getLists(!newStatus);
    itemsCopy[index].status = newStatus;
    newItems.push(...itemsCopy);
    setItems(newItems);
  }, [getLists])
  
  const editMode = useCallback((index, isEdit, itemStatus) => {
    const [itemsCopy, newItems] = getLists(itemStatus);
    itemsCopy[index].isEditing = !isEdit;
    newItems.push(...itemsCopy);
    setItems(newItems);
  }, [getLists]);
  
  const onEditChange = useCallback((e, index, itemStatus) => {
    const [itemsCopy, newItems] = getLists(itemStatus);
    itemsCopy[index].name = e.target.value;
    newItems.push(...itemsCopy);
    setItems(newItems);
  }, [getLists]);

  return (
    <div>
      <FormControl fullWidth>
        <TextField label="Enter Task:" value={text} onChange={checkChange} />
        <Button color="primary" onClick={submitForm}>Submit</Button>
      </FormControl>
      {
        !!todo.length &&
        <div>
          <Typography variant="h5">To do:</Typography>
          <ListItems
            items={todo}
            deleteItem={deleteItem}
            checkStatus={updateStatus}
            editMode={editMode}
            onEditChange={onEditChange}
          />
        </div>
      }
      {
        !!done.length &&
        <div>
          <Typography variant="h5">Done:</Typography>
          <ListItems
            items={done}
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
