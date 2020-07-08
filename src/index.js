import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ListItems extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
        }
    }
    
    addNewText (newText) {
        let items = this.state.items;
        items.push(newText);
        this.setState ({items: items});
    }

    render () {
        const items = this.state.items;
        const listItems = items.map((item, index) => 
            <li key={index}>{item}</li>
        )
        return (
            <ul>
                {listItems}
            </ul>
        )
    }
}


class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''}
        
        this.checkChange = this.checkChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm (e) {
        e.preventDefault()
        let text = this.state.text;
        this.refs.addNewText.addNewText(text);
        this.setState({text: ''})
    }

    checkChange (e) {
        this.setState({text: e.target.value})
    }

    render() {
    return (
        <div>
            <form onSubmit={this.submitForm}>
                <label>
                    Enter Text:
                    <textarea value={this.state.text} onChange={this.checkChange}/>
                </label>
                <input type="submit"></input>
            </form>
            <ListItems ref="addNewText"/>
        </div>
        )
    }
}


function App() {
    return (
        <div>
            <h1> Hello World! </h1>
            <InputForm/>
        </div>
    )

}

ReactDOM.render(
    <App />, document.getElementById('root')
);
