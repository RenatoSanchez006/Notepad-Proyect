import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Banner(props) {
    return <p>This is the first {props.name} in {props.day}.</p>
}

function BigBanner() {
    return(
        <div>
            <Banner name='session' day="week"></Banner>
            <Banner name='class' day="month"></Banner>
            <Banner name='course'></Banner>
        </div>
    );
}

function tick () {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
            <BigBanner/>
        </div>
    
    );
    
    ReactDOM.render(
        element, document.getElementById('root')
    );
}

setInterval(tick, 1000);