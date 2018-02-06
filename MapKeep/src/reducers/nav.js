import { NavigationActions } from 'react-navigation';

import { RootStack } from '../containers/Navigation';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = RootStack.router.getActionForPathAndParams('Home');
const tempNavState = RootStack.router.getStateForAction(firstAction);
const initialNavState = RootStack.router.getStateForAction(
  tempNavState
);

export default function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Home':
      nextState = RootStack.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    default:
      nextState = RootStack.router.getStateForAction(action, state);
      break;
  }
  
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}