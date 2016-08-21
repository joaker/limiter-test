import moment from 'moment';
import {cubeCount, loopCount, randomize} from '../components/constants';
// import colorize from '../utils/colors';

export const defaultState = {
  iteration: 1,
  start: moment(),
  lastStart: 1,
  memoizing: 'memoizing',
};

export const reducerFactory = (initialState = defaultState) => (state = initialState, action) => {
  let nextState = state;
  switch(action.type){
    case 'NEXT':
      const iteration = state.iteration + 1;
      nextState = Object.assign({}, state, { iteration, });
      return nextState;
    case 'START':
      const start = moment();
      nextState = Object.assign({}, state, { start, lastStart: state.iteration })
      return nextState;
    case 'SET':
      return nextState = Object.assign({}, state, action.payload)
    default:
      break;
  }
  return state;
}

const reducer = reducerFactory();

export default reducer;
