import React, { Component } from 'react';

import Navigation from './containers/Navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { navigationMiddleware } from './utils/navigationRedux';
import reducer from './reducers';

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      navigationMiddleware,
      thunkMiddleware
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
