import React from 'react';
import ListItems from './ListItems';
import { Button, Input, InputLabel } from '@material-ui/core';

export default class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      itemsTodo: [
        { name: 'a', status: false }
      ],
      itemsDone: [
        { name: 'd', status: true }
      ],
    }
    this.checkChange = this.checkChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  submitForm(e) {
    e.preventDefault()
    const { text } = this.state;
    if (text === '' || text.trim().length === 0){
      alert('Empty Input');
    } else {
      this.addNewText(text);
    }
    this.setState({ text: '' });
  }

  addNewText(newText) {
    const { itemsTodo } = this.state;
    const newItem = { name: newText, status: false };
    itemsTodo.unshift(newItem);
    this.setState({ itemsTodo });
  }

  deleteItem(index, status) {
    const { itemsTodo, itemsDone } = this.state;
    status ? itemsDone.splice(index, 1) : itemsTodo.splice(index, 1);
    this.setState({ itemsTodo, itemsDone });
  }

  checkChange(e) {
    this.setState({ text: e.target.value })
  }

  updateStatus(event) {
    const { itemsTodo, itemsDone } = this.state;
    const index = event.target.value;
    const status = event.target.checked;
    const name = status ? itemsTodo[index].name : itemsDone[index].name;
    const newItem = { name, status };

    this.deleteItem(index, !status);
    status ? itemsDone.push(newItem) : itemsTodo.push(newItem);
    this.setState({ itemsTodo, itemsDone });
  }

  render() {
    const { itemsTodo, itemsDone, text } = this.state;
    const todoLen = itemsTodo.length;
    const doneLen = itemsDone.length;
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <InputLabel>
            Enter Text:
            <Input value={text} onChange={this.checkChange} />
          </InputLabel>
          <Button type="submit">Submit</Button>
        </form>
        {
          todoLen > 0 &&
          <div>
            <h3>To do:</h3>
            <ListItems
              items={itemsTodo}
              deleteItem={this.deleteItem}
              checkStatus={this.updateStatus}
            />
          </div>
        }
        {
          doneLen > 0 &&
          <div>
            <h3>Done: </h3>
            <ListItems
              items={itemsDone}
              deleteItem={this.deleteItem}
              checkStatus={this.updateStatus}
            />
          </div>
        }
      </div>
    )
  }
}