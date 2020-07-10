import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Actions({ onDelete }) {
    return (
        <button onClick={onDelete}>
            Delete
        </button>
    )
}

function ListItems ({ items, onDelete }) {
  const listItems = items.map((item, index) => {
    const deleteItem = () => onDelete(index);
    return (
      <div key={index}>
        <li>{item}</li>
        <Actions onDelete={deleteItem} />
      </div>
    );
  });

  return (
    <ul>
      {listItems}
    </ul>
  );
}

class InputForm extends React.Component {
    constructor(props) {
        super(props);
      this.state = {
        text: '',
        items: [],
      };
        
        this.checkChange = this.checkChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    submitForm (e) {
        e.preventDefault()
        const { text } = this.state;
        this.addNewText(text);
        this.setState({text: ''});
    }

    checkChange (e) {
        this.setState({text: e.target.value});
    }

    addNewText (newText) {
      const { items } = this.state;

      items.push(newText);
      this.setState ({ items });
    }

    deleteItem(index) {
      const { items } = this.state;
      items.splice(index, 1);
      this.setState({ items });
    }

    render() {
      const  { items, text } = this.state;
      return (
          <div>
              <form onSubmit={this.submitForm}>
                  <label>
                      Enter Text:
                      <input value={text} onChange={this.checkChange}/>
                  </label>
                  <input type="submit"></input>
              </form>
              <ListItems items={items} onDelete={this.deleteItem} />
          </div>
      );
    }
}

function App() {
    return (
        <div>
            <h1> Hello World! </h1>
              <InputForm />
        </div>
    )
}

ReactDOM.render(
    <App />, document.getElementById('root')
);
