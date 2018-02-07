import { handleActions, combineActions } from 'redux-actions'
import types from '../constants/actionTypes'

const initialState = {
  loading: false,
  markers: [],
  newItem: {
    lng: 0,
    lat: 0,
    note: '',
    name: ''
  }
}

export default handleActions({
  [types.UPDATE_MARKER]: (state, { payload }) => ({
    ...state,
    newItem: { note: payload.note }
  }),
  [types.GET_DEFAULT_COORDINATES_START]: (state, { payload }) => ({
    ...state,
    loading: true
  }),
  [types.GET_DEFAULT_COORDINATES_SUCCESS]: (state, { payload }) => ({
    ...state,
    markers: state.markers.concat(payload.locations.filter(location => !state.markers.find(item => item.lng === location.lng && item.lat === location.lat && location.name === item.name))),
    loading: false,
  }),
  [types.GET_DEFAULT_COORDINATES_FAIL]: (state, { payload }) => ({
    ...state,
    loading: false
  }),
}, initialState)