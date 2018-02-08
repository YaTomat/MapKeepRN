import types from '../../src/constants/actionTypes';
import reducer from '../../src/reducers/marker';

const INITIAL_STATE = {
  loading: false,
  markers: []
};

describe('Locations reducer', () => {
  
  test('should returns initial state', () => {
    // Given
    const action = {
      type: 'ANY'
    };
    
    // When
    const actualStore = reducer(undefined, action);
    
    // Then
    expect(actualStore.markers).toEqual([]);
    expect(actualStore.loading).toBe(false);
  });
  
  test('should not clean current locations and indicate loading', () => {
    // Given
    const action = {
      type: types.GET_DEFAULT_COORDINATES_START
    };
    let initialStore = {
      ...INITIAL_STATE,
      markers: [{
        name: 'Izhevsk',
        lat: 0,
        lng: 0,
        note: 'Note'
      }]
    };
    
    // When
    const actualStore = reducer(initialStore, action);
    
    // Then
    expect(actualStore.markers).toEqual(initialStore.markers);
    expect(actualStore.loading).toBe(true);
  });
  
  test('should handle locations receiving', () => {
    // Given
    const action = {
      type: types.GET_DEFAULT_COORDINATES_SUCCESS,
      payload: {
        locations: [{
          name: 'Sarapul',
          lat: 1,
          lng: 1
        }]
      }
    };
    
    // When
    const actualStore = reducer({
      ...INITIAL_STATE,
      markers: []
    }, action);
    
    // Then
    expect(actualStore.markers).toEqual(action.payload.locations);
    expect(actualStore.loading).toBe(false);
  });
  
  test('should save new location', () => {
    // Given
    const coordinate = {
      latitude: 2,
      longitude: 2
    };
    const action = {
      type: types.ADD_MARKER,
      payload: {
        coordinate
      }
    };
    
    // When
    let initialState = {
      ...INITIAL_STATE,
      markers: []
    };
    const actualStore = reducer(initialState, action);
    
    // Then
    expect(actualStore.markers).toEqual([{ lng: 2, lat: 2, name: '', note: '' }]);
    expect(actualStore.loading).toBe(false);
  });
  
  test('should stop loading on error and save initial', () => {
    // Given
    const action = {
      type: types.GET_DEFAULT_COORDINATES_FAIL,
      payload: 'JSON wrong format'
    };
    
    // When
    const actualStore = reducer(INITIAL_STATE, action);
    
    // Then
    expect(actualStore.markers).toEqual(INITIAL_STATE.markers);
    expect(actualStore.loading).toBe(false);
  });
});