import types from '../constants/actionTypes'
import Config from 'react-native-config'
import { Downloader } from '../utils/Downloader'

export function updateMarker(note) {
  return ({ type: types.UPDATE_MARKER_START, payload: { note } });
}

export function getMarkers() {
  return (dispatch) => {
    dispatch({ type: types.GET_DEFAULT_COORDINATES_START })
    Downloader.getJson(Config.DEFAULT_LOCATION_URI).then(result => {
      dispatch({ type: types.GET_DEFAULT_COORDINATES_SUCCESS, payload: result });
    }).catch(error => {
      dispatch({ type: types.GET_DEFAULT_COORDINATES_FAIL, payload: error });
      
    })
  };
}