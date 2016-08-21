import React from 'react';
import { connect } from 'react-redux';
import {cubeCount} from './constants';
import styles from './Bench.scss';

export const Cube = ({ith, active}, {getColor}) => {

  const fromIth = (i) => {
    const completeRatio = i ? ((i * 1.0) / cubeCount) : 0;
    const rawMag = 255 * completeRatio;
    const magnitude = Math.round(rawMag);
    return magnitude;
  }



  const r = fromIth(ith);
  const g = fromIth(ith);
  const b = fromIth(ith);

  const vals = [r,g,b];
  const valString = vals.join(',');
  const rgb = 'rgb('+ valString +')'

  const backgroundColor = getColor() || rgb;

  const style = {
    backgroundColor,
  }

  // var iterationMod = iteration % cubeCount;

  if(!active){
    style.backgroundColor = 'transparent';
  }

  return <div className={['panel', 'ith-' + ith, styles.cube].join(' ') } style={style}/>
}

Cube.contextTypes = {getColor: React.PropTypes.func};

const mapStateToProps = ({iteration: iterationNumber = 0, start = '', memoizing}, {ith}) => {
  const cursor = iterationNumber % cubeCount;
  const active = cursor >= ith;

  const iteration = !memoizing && iterationNumber;

  return {
    active,
    iteration,

    // iteration,
  };
};
const createMapStateToProps = (memoize) => mapStateToProps;

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch({type: 'NEXT'}),
});

const createMapDispatchToProps = (memoize) => mapDispatchToProps;

export const ConnectedCube = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cube);

export default ConnectedCube;
