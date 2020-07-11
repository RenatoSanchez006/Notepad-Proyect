import React from 'react';
import ListItems from './ListItems';
import { Button, Input, InputLabel } from '@material-ui/core';

export default class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: ['a', 'b', 'c'],
    }
    this.checkChange = this.checkChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
    items.push(newText);
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
        <ListItems items={items} deleteItem={this.deleteItem}/>
      </div>
    )
  }
}