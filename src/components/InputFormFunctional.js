import React, { useState } from 'react';
import ListItems from './ListItems';
import { Typography, Button, Input, InputLabel, FormControl } from '@material-ui/core';

export default function InputFormFunctional(props) {
  const [text, setText] = useState('');
  const [itemsTodo, setTodo] = useState([{ name: 'a', status: false }]);
  const [itemsDone, setDone] = useState([{ name: 'a', status: true }]);

  const submitForm = (e) => {
    e.preventDefault();
    if (text === '' || text.trim().length === 0) {
      alert('Empty Input');
    } else {
      addNewText(text);
    }
    setText('');
  }

  const addNewText = (newText) => {
    const newItem = { name: newText, status: false };
    itemsTodo.unshift(newItem);
    setTodo(itemsTodo);
  }

  const deleteItem = (index, status) => {
    status ? itemsDone.splice(index, 1) : itemsTodo.splice(index, 1);
    setTodo(itemsTodo);
    setDone(itemsDone);
  }

  const checkChange = (e) => {
    setText(e.target.value);
  }

  // updateStatus(event) {
  //   const { itemsTodo, itemsDone } = this.state;
  //   const index = event.target.value;
  //   const status = event.target.checked;
  //   const name = status ? itemsTodo[index].name : itemsDone[index].name;
  //   const newItem = { name, status };

  //   this.deleteItem(index, !status);
  //   status ? itemsDone.push(newItem) : itemsTodo.push(newItem);
  //   this.setState({ itemsTodo, itemsDone });
  // }

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
          // checkStatus={this.updateStatus}
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
          // checkStatus={this.updateStatus}
          />
        </div>
      }
    </div>
  )
}