import React, { useState, useEffect } from 'react';
import ListItems from './ListItems';
import { Typography, Button, Input, InputLabel, FormControl } from '@material-ui/core';

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

export default function InputFormFunctional(props) {
  const [text, setText] = useState('');
  const [itemsTodo, setTodo] = useState([]);
  const [itemsDone, setDone] = useState([]);
  const [isAllDone, setAllDone] = useState(false);

  useEffect(() => {
    async function fetchData(argument) {
      const { done, todo } = await fetchAllData();
      setTodo(todo);
      setDone(done);
    }

    fetchData();
  }, [])

  useEffect(() => {
    if (itemsDone.length && !itemsTodo.length) {
      setAllDone(true);
    } else {
      setAllDone(false);
    }
  }, [itemsDone, itemsTodo]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!text || text.trim().length === 0) {
      alert('Empty Input');
    } else {
      addNewText(text);
    }
    setText('');
  }

  const addNewText = (newText) => {
    const todoClone = [...itemsTodo];
    const newItem = { name: newText, status: false };
    todoClone.unshift(newItem);
    setTodo(todoClone);
  }

  const deleteItem = (index, status) => {
    if (status) {
      const doneClone = [...itemsDone];
      doneClone.splice(index, 1);
      setDone(doneClone);
    } else {
      const todoClone = [...itemsTodo]
      todoClone.splice(index, 1);
      setTodo(todoClone);
    }

  }
  
  const checkChange = (e) => {
    setText(e.target.value);
  }
  
  const updateStatus = (event) => {
    const todoClone = [...itemsTodo]
    const doneClone = [...itemsDone];
    const index = event.target.value;
    const status = event.target.checked;
    const name = status ? todoClone[index].name : doneClone[index].name;
    const newItem = { name, status };
    
    deleteItem(index, !status);

    if (status) {
      doneClone.push(newItem)
      setDone(doneClone);
    } else {
      todoClone.push(newItem)
      setTodo(todoClone);
    }
  }

  const todoLen = itemsTodo.length;
  const doneLen = itemsDone.length;
  return (
    <div>
      {isAllDone ? "You're Done!" : null}
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
