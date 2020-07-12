import React from 'react';
import ReactDOM from 'react-dom';
import InputFormFunctional from './components/InputFormFunctional';
// import InputForm from './components/InputForm';
import { Typography } from '@material-ui/core';

function App() {
  return (
    <div>
      <Typography variant="h3"> Hello World! </Typography>
      <InputFormFunctional />
      {/* <InputForm /> */}
    </div>
  )
}

ReactDOM.render(
  <App />, document.getElementById('root')
);
