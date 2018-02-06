import { handleActions, combineActions } from 'redux-actions'
import types from '../constants/actionTypes'

const initialState = {
  loading: false,
}

export default handleActions({
}, initialState)