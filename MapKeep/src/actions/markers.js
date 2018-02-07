import types from '../constants/actionTypes'
import Config from 'react-native-config'
import { Downloader } from '../utils/Downloader'
import { NavigationActions } from 'react-navigation';

export function updateMarker(coordinate, name, note) {
  return ({ type: types.UPDATE_MARKER, payload: { note, coordinate, name } });
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

export function addMarker(coordinate) {
  return (dispatch) => {
    dispatch({type: types.ADD_MARKER, payload: {coordinate}})
    dispatch(NavigationActions.navigate({ routeName: 'Details', params: {coordinate}}))
  };
}