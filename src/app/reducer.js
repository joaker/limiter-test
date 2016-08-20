import moment from 'moment';

export const defaultState = {
  iteration: 1,
  start: moment(),
};

export const reducerFactory = (initialState = defaultState) => (state = initialState, action) => {
  switch(action.type){
    case 'NEXT':
      return Object.assign({}, state, { iteration: (state.iteration + 1) });
  }
  return state;
}

const reducer = reducerFactory();

export default reducer;
