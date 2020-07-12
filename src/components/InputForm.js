import React from 'react';
import ListItems from './ListItems';
import { Button, Input, InputLabel } from '@material-ui/core';

export default class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: [
        {name: 'a', status: false},
        {name: 'b', status: false},
        {name: 'c', status: false}
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
      console.log('empy input');
      alert('empty input');
    } else {
      this.addNewText(text);
    }
    this.setState({ text: '' });
  }

  addNewText(newText) {
    const { items } = this.state;
    const newItem = {name: newText, status: false};
    items.unshift(newItem);
    this.setState({ items });
  }

  deleteItem(index){
    const { items } = this.state;
    items.splice(index, 1);
    this.setState({ items });
  }

  checkChange(e) {
    this.setState({ text: e.target.value })
  }

  updateStatus(event) {
    const { items } = this.state;
    const index = event.target.value;
    items[index] = { name: items[index].name, status: event.target.checked };
    this.setState(items);
  }

  render() {
    const { items, text } = this.state;
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <InputLabel>
            Enter Text:
            <Input value={text} onChange={this.checkChange} />
          </InputLabel>
          <Button type="submit">Submit</Button>
        </form>
        <ListItems 
          items={items} 
          deleteItem={this.deleteItem} 
          checkStatus={this.updateStatus}
        />
      </div>
    )
  }
}