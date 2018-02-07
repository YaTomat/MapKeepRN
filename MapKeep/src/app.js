import React, { Component } from 'react';

import Navigation from './containers/Navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { navigationMiddleware } from './utils/navigationRedux';
import reducers from './reducers';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const configPersist = {
  key: 'root',
  storage,
  blacklist: ['nav']
};

const reducer = persistCombineReducers(configPersist, reducers);

function configureStore() {
  const middleware = applyMiddleware(
    navigationMiddleware,
    thunkMiddleware
  );
  const store = createStore(reducer, middleware);
  const persistor = persistStore(store);
  
  return {
    store,
    persistor,
  };
}

const { store, persistor } = configureStore({});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
