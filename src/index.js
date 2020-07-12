import React from 'react';
import ReactDOM from 'react-dom';
import InputForm from './components/InputForm';
import { Typography } from '@material-ui/core';

function App() {
  return (
    <div>
      <Typography variant="h3"> Hello World! </Typography>
      <InputForm />
    </div>
  )
}

ReactDOM.render(
  <App />, document.getElementById('root')
);
