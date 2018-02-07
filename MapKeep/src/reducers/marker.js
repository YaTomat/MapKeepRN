import { handleActions } from 'redux-actions'
import types from '../constants/actionTypes'
import { equalityCoordinates, equalityCoordinatesFunc } from "../utils/Coordinate";

const initialState = {
  loading: false,
  markers: []
}

const findItemByLocation = (markers, coordinate) => markers.find(equalityCoordinatesFunc(coordinate));

export default handleActions({
  [types.UPDATE_MARKER]: (state, { payload }) => {
    let item = findItemByLocation(state.markers, {
      lng: payload.coordinate.longitude,
      lat: payload.coordinate.latitude
    })
    item.name = payload.name
    item.note = payload.note
    let markers = state.markers.slice(0).filter(marker => !equalityCoordinates({
      lng: item.lng,
      lat: item.lat
    }, marker)).concat(item)
    return ({
      ...state,
      markers
    })
  },
  [types.GET_DEFAULT_COORDINATES_START]: (state, { payload }) => ({
    ...state,
    loading: true
  }),
  [types.GET_DEFAULT_COORDINATES_SUCCESS]: (state, { payload }) => ({
    ...state,
    markers: state.markers.concat(payload.locations.filter(location => !findItemByLocation(state.markers, location))),
    loading: false,
  }),
  [types.GET_DEFAULT_COORDINATES_FAIL]: (state, { payload }) => ({
    ...state,
    loading: false
  }),
  [types.ADD_MARKER]: (state, { payload }) => ({
    ...state,
    markers: state.markers.concat({
      lat: payload.coordinate.latitude,
      lng: payload.coordinate.longitude,
      note: '',
      name: ''
    })
  }),
}, initialState)