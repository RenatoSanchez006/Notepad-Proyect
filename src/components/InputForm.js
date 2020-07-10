import React from 'react';
import ListItems from './ListItems';

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
    this.addNewText(text);
    this.setState({ text: '' })
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
          <label>
            Enter Text:
            <input value={text} onChange={this.checkChange} />
          </label>
          <input type="submit"></input>
        </form>
        <ListItems items={items} deleteItem={this.deleteItem}/>
      </div>
    )
  }
}