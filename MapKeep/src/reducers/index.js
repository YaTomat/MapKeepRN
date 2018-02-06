import { combineReducers } from 'redux';
import map from './map';
import nav from './nav'

const rootReducer = combineReducers({
  nav,
  map
})

export default function reducer(state, action) {
  return rootReducer(state, action,)
}
