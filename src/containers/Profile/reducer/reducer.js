/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

/**
 * 不允许在多个reducer中出现同样的action type!
 */
import {
  COUNTER_INCREMENT,
} from './constants';

// The initial state of the App
const initialState = 0;

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case COUNTER_INCREMENT:
      return state + 1;
    default:
      return state;
  }
}
