import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from 'containers/App';
import * as serviceWorker from './serviceWorker';
import configuredStore from 'store';

const store = configuredStore(undefined);
dfgdfgdfgdfg


sdfsdfd
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  gfgfgh
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
