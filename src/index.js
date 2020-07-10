import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InputForm from './components/InputForm';

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
