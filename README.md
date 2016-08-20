## Synopsis
Benchmark the [redux-limiter](http://github.com/joaker/redux-limiter) module

## Motivation

It's better to show than to tell

## Usage

```
$ git clone https://github.com/joaker/redux-limiter.git
$ webpack-dev-server
```

## Usage
```js
import {createStore} from 'redux';
import limitStore from 'redux-limiter';
import {Provider} from 'react-redux';
import App from 'components/App'; // or whatever your base component is

// create a reducer
const reducer = (state = 1, action) => {
  switch (action.type) {
    case 'NEXT':
      return state + 1;
  }
  return state;
}

// create a base store
const baseStore = createStore(reducer, defaultState);

// choose a rate to for throttle updates (rate >= 1; default rate is 1)
const throttleRate = 2;

// limit the store with react-limiter
const store = limitStore(baseStore, throttleRate);

// register the store with your provider
return (
  <Provider store={store}>
    <App/>
  </Provider>
);
```
<!-- ## Tests

TODO: npm test -->

## Modules
react, redux, react-router
socketio, webpack/express
css-modules

<!-- mongodb -->

## Contributors

Jack Ofnotrade

## License

MIT
