
import Slide from 'rc-slider'
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Cube from './Cube';
import styles from './Bench.scss';
import {cubeCount, loopCount, randomize} from './constants';


const randit = (val) => Math.round(Math.random() * 2 * val);

const rands = [];

class Bench extends React.Component {
  componentDidMount(){

    setInterval(() => {
      const props = this.props || {};
      const {loops} = this.props || 1;
      const {next = () => {console.log('warning! "next" is not a per')}} = props;

      const laps = randomize ? randit(loops) : loops;
      rands.push(laps);
      for(let i = 0; i < laps; i++){
        next();
      }
      const avgLaps = rands.length && (rands.reduce((memo, ith) => memo + ith, 0) / rands.length);
      console.log('last: ' + laps);
      console.log('average: ' + avgLaps);
    }, 0);
  }

  render(){

    let cubes = [];
    for(var i = 0; i < cubeCount; i++){
      cubes.push((
        <Cube ith={i} key={i}/>
        ))
    }

    const thenString = this.props.start;
    const then = moment(thenString);
    const now = moment();

    const diff = now - then;
    const seconds = diff / 1000;


    const places = 100;
    const rate = Math.round(places*(this.props.iteration / seconds))/places;

    let steps = //[0, 1, 2,4,16,64];
      [
        {
          rate: 0,
          label: 'None',
        },
        {
          rate: 1,
          label: '60fps - Normal',
        },
        {
          rate: 2,
          label: '30fps',
        },
        {
          rate: 6,
          label: '10fps - continuity',
        },
        {
          rate: 20,
          label: '4fps',
        },
        {
          rate: 32,
          label: '2fps - Max'
        },
      ]
    let links = [];
    const iprops = {
      type: 'range',
      min: 2,
      max: 20,
      step: 2,
    };


    const link = ({rate: linkRate, label}) => {
      const isSelected = this.props.rate === linkRate ? 'active' : '';
      links.push(<a key={rate} className={isSelected} href={"/index.html?" + rate}>{label}</a>);
      ;
    }

    steps.map(s => link(s));

    const fps = 60 / this.props.rate;

    const rateOptions = steps.map(step => {
      const isSelected = this.props.rate == step.rate;
      return (
        <option value={step.rate} selected={isSelected}>
          {step.label}
        </option>);
    })
    const rateChooser = (
      <select onChange={(e) => (window.location = '/index.html?' + e.target.value)}>
        {rateOptions}
      </select>
    );

    return (
    <div className="bench" >
      <div className={styles.controls}>
        <h2 className={styles.rateName}>
        Dispatch / Second: {rate.toFixed(2)}
        </h2>
        <h2 className={styles.rateName}>
        FramePerSecond: {fps}
        </h2>
        <h2 className={styles.throttle}>
          <label>Rate</label>
          <div className={styles.rateList}>
            {rateChooser || links}

          </div>
        </h2>
      </div>
      <div className={"application " + styles.container} >
          {cubes}
      </div>
    </div>);
  }
};

const mapStateToProps = ({iteration = 0, start = '', loops = loopCount}) => {
  return {
    iteration,
    start,
    loops,
  };
};

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch({type: 'NEXT'}),
});

export const ConnectedBench = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bench);

export default ConnectedBench;
