import { addMarker } from '../../src/actions/markers'
import types from '../../src/constants/actionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const promisifyMiddleware = ({ dispatch, getState }) => next => action => {
  return new Promise((resolve) => resolve(next(action)))
}
const middlewares = [promisifyMiddleware, thunk];
const mockStore = configureMockStore(middlewares);
let store
jest.mock('react-navigation', () => {
  return {
    NavigationActions: {
      navigate: () => {
      },
    }
  }
});

describe('marker actions', () => {
  
  it('add marker action should open new screen and add marker', (done) => {
    store = mockStore({});
    store.dispatch(addMarker({ longitude: 0, latitude: 0 })).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions).toContainEqual({"type": types.ADD_MARKER, payload: {coordinate: { longitude: 0, latitude: 0 }}});
      done();
    })
    
  });
})