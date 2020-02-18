/*
An almost static stack: https://medium.com/superhighfives/an-almost-static-stack-6df0a2791319
*/

import React from 'react';
import { render } from 'react-snapshot';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Fira Sans:200,300,400,500,600,700', 'sans-serif']
  }
});

// This render method substitutes ReactDOM.render()
// if any problems arise, revert the changes
render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
