import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Banner from './components/banner'
import './index.css';

class NewButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        this.manageClick = this.manageClick.bind(this);
    }

    manageClick() {
        this.setState( state => ({
            isToggleOn: !state.isToggleOn,
        }));
    }

    render () {
        return (
            <button onClick={this.manageClick}>
                {this.state.isToggleOn ? 'PRENDIDO' : 'APAGADO'}
            </button>

        )
    }
}

function BigBanner() {
    return(
        <div>
            <Banner name='session' day="week"></Banner>
            <Banner name='class' day="month"></Banner>
            <Banner name='course'></Banner>
            <NewButton />
        </div>
    );
}


function App () {
  let [time, setTime] = useState(new Date().toLocaleTimeString());
  let timerInterval = useRef(null);
  
  const getNewTime = () => {
    setTime(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    console.log('this is running');
    timerInterval.current = setInterval(getNewTime, 1000);
  }, []);

  const stopTimer = () => {
    clearInterval(timerInterval.current);
  };


  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {time}.</h2>
      <BigBanner/>
        <button onClick={stopTimer} >
        Click me
      </button>
    </div>
  );

}

ReactDOM.render(
  <App />, document.getElementById('root')
);
