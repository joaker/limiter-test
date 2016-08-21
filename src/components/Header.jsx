import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {cubeCount, loopCount, randomize} from './constants';
import styles from './Bench.scss';

const places = 100;
const steps = //[0, 1, 2,4,16,64];
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
  ];


const Header = ({iteration, start, loops, rate: currentRate }) => {

  const thenString = start;
  const then = moment(thenString);
  const now = moment();

  const diff = now - then;
  const seconds = diff / 1000;


  const rate = Math.round(places*(iteration / seconds))/places;
  const fps = 60 / currentRate;



  const rateOptions = steps.map((step, i) => {
    return (
      <option value={step.rate} key={i}>
        {step.label}
      </option>);
  })
  const rateChooser = (
    <select value={currentRate} onChange={(e) => (window.location = '/index.html?' + e.target.value)}>
      {rateOptions}
    </select>
  );

  return (
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
          {rateChooser}
        </div>
      </h2>
    </div>
  );
}


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


const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
export default ConnectedHeader;
