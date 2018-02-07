import types from '../constants/actionTypes'
import { Downloader } from '../utils/Downloader'
import { NavigationActions } from 'react-navigation';

export function updateMarker(coordinate, name, note) {
  return ({ type: types.UPDATE_MARKER, payload: { note, coordinate, name } });
}

export function getMarkers() {
  return (dispatch) => {
    dispatch({ type: types.GET_DEFAULT_COORDINATES_START })
    Downloader.getJson('http://bit.ly/test-locations').then(result => {
      dispatch({ type: types.GET_DEFAULT_COORDINATES_SUCCESS, payload: result });
    }).catch(error => {
      console.log(error)
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