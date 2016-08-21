
import Slide from 'rc-slider'
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Cube from './Cube';
import styles from './Bench.scss';
import {cubeCount, loopCount, randomize} from './constants';
import Header from './Header';
import colorize from '../util/colors';


const makeNullAction = (actionName = "<unknown action>") => () => {console.log('warning! "'+actionName+'" is not an action')}

const UnconnectedBenchCubes = ({}) => {
  let cubes = [];
  for(var i = 0; i < cubeCount; i++){
    cubes.push((
      <Cube ith={i} key={i}/>
      ));
  }
return (
  <div className={"application " + styles.container}>
    {cubes}
  </div>)
;
}
const BenchCubes = connect(({}) => ({}))(UnconnectedBenchCubes);

const randit = (val) => Math.round(Math.random() * 2 * val);

const rands = [];


const delay = 0;

let interval;
// const delay = 500;
class Bench extends React.Component {
  constructor(){
    super();
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  start(){
    if(!interval){
      const props = this.props || {};
      const {
        next = makeNullAction('next'),
        startTimer = makeNullAction('startTimer'),
      } = props;

      startTimer();
      interval = setInterval(() => {
        const {loops = 1} = this.props;

        const laps = randomize ? randit(loops) : loops;
        rands.push(laps);
        for(let i = 0; i < laps; i++){
          next();
        }
        // debugger;
        const avgLaps = rands.length && (rands.reduce((memo, ith) => memo + ith, 0) / rands.length);
        console.log('last: ' + laps);
        console.log('average: ' + avgLaps);
      }, delay);
      this.setState({})
    }
  }
  stop(){
    clearInterval(interval);
    interval = undefined;
    this.setState({})
  }

  componentDidMount(){
  }


  render(){
    const isRunning = !interval;
    const act = !interval ? (
      <button onClick={this.start}>Start</button>
    ) : (
      <button onClick={this.stop}>Stop</button>
    );

    return (
    <div className="bench" >
      <Header rate={this.props.rate}/>
      {act}
      <div className={"color-wrapper"} >
          <BenchCubes/>
      </div>
    </div>);
  }
};


const mapStateToProps = ({iteration = 0, start = '', loops = loopCount}) => {
  return {
    iteration,
    // start,
    // loops,
  };
};

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch({type: 'NEXT'}),
  startTimer: () => dispatch({type: 'START'}),
});

export const ConnectedBench = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bench);

export default ConnectedBench;
