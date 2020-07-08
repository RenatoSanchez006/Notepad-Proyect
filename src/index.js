import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''}
        
        this.checkChange = this.checkChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm (e) {
        e.preventDefault()
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
