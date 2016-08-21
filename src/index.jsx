// require('./style/global.css');
import styles from './index.scss'
import limitStore from 'redux-limiter';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {createStore,  applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import colorize from './util/colors';
import reducer, {defaultState} from './app/reducer';
import Bench from './components/Bench';


const blue = 240;
const green = 120;
const red = 360;

const toHSL = ({hue, saturation, light}) => 'hsl(' + hue + ',' +saturation+ ',' +light+ ')'

const redProps = {
  rate:1,
  hsl: {
    hue: red,
    saturation: '100%',
    light: undefined,
    toString: function(){  var value = toHSL(this); return value; },
  },
}

const greenProps = {
  rate:4,
  hsl: {
    hue: red,
    saturation: '100%',
    light: undefined,
    toString: function(){  var value = toHSL(this); return value; },
  },
}

const blueProps = {
  rate: 8,
  hsl: {
    hue: blue,
    saturation: '100%',
    light: undefined,
    toString: function(){  var value = toHSL(this); return value; },
  },
};

const frameRate = 1;

const baseStore = createStore(reducer, defaultState);


// start broadcasting
// store.start();

const wrapper = true;


const getRate = () =>{
  const search = window.location.search || '?0';
  const rating = window.location.search.substring(1);
  const rate = parseInt(rating) || 0;
  return rate;
}

const aStore = createStore(reducer, defaultState);
const theStore = (!!getRate()) ? limitStore(aStore, getRate()) : aStore;


const getColor = () => {
  const state = theStore.getState();
  const {iteration} = state;
  const color = colorize(iteration);
  return color;
}


class Wrapper extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
       rate: getRate(),
       hsl: {
         hue: 120,
         saturation: '100%',
         light: undefined,
         toString: function(){  var value = toHSL(this); return value; },
       },
     };
     this.setRate = this.setRate.bind(this);
  }

  getChildContext() {
    return {getColor,};
  }

  setRate(newRate){
    console.log('vv hey vv');
    console.log(newRate);
    const parsed = parseInt(newRate);
    console.log(parsed);
    this.setState({})
  }

  render(){

    return (
      <Provider store={theStore}>
        <Bench {...this.state} setRate={this.setRate}/>
      </Provider>
    );
  }
}

Wrapper.childContextTypes = {
  getColor: React.PropTypes.func
};


ReactDOM.render(
  <div className={styles.appWrap}>
    {wrapper && <Wrapper/>}
  </div>,
  document.getElementById('app')
);
