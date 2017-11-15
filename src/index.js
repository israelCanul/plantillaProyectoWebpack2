import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import Home from './components/index';

const createStoreWithMiddleware = applyMiddleware(thunk,promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Home />
  </Provider>
  , document.getElementById('app'));
