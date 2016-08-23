const mapValues = (obj, fn) => Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {});

const pick = (obj, fn) => Object.keys(obj).reduce((result, key) => {
    if (fn(obj[key])) result[key] = obj[key];
    return result;
  }, {});

const bindActionCreator = (actionCreator, dispatch) => (...args) => dispatch(actionCreator(...args));

export const bindActionCreators = (actionCreators, dispatch) => {
  return typeof actionCreators === 'function' ? bindActionCreator(actionCreators, dispatch) :
    mapValues(actionCreators, actionCreator => bindActionCreator(actionCreator, dispatch)
  );
}

export const compose = (...funcs) => {
  return arg => funcs.reduceRight((composed, f) => f(composed), arg);
}

export const applyMiddleware = (...middlewares) => (next) => (reducer, initialState) => {
    var store = next(reducer, initialState);
    var dispatch = store.dispatch;
    var chain = [];

    chain = middlewares.map(middleware => middleware({
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }));
    dispatch = compose(...chain)(store.dispatch);

    return { ...store, dispatch };
  };
}

export const combineReducers = (reducers) => {
  var finalReducers = pick(reducers, (val) => typeof val === 'function');
  return (state = {}, action) => mapValues(finalReducers,
    (reducer, key) => reducer(state[key], action)
  );
}

export const createStore = (reducer, initialState) => {
  var currentReducer = reducer;
  var currentState = initialState;
  var listeners = [];
  var isDispatching = false;

  const getState = () => {
    return currentState;
  }

  const subscribe = (listener) => {
    listeners.push(listener);

    return function unsubscribe() {
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  const dispatch = (action) => {
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    listeners.slice().forEach(listener => listener());
    return action;
  }

  const replaceReducer = (nextReducer) => {
    currentReducer = nextReducer;
    dispatch({ type: '@@redux/INIT' });
  }

  dispatch({ type: '@@redux/INIT' });

  return { dispatch, subscribe, getState, replaceReducer };
}
