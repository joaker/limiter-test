import Color from 'color';
import {cubeCount, loopCount, randomize} from '../components/constants';

export const max = 16777216;
export const min = 0;

const defaultLaps = 10;
const defaultBase = 0.1;


const createRainbow = (totalMaxSteps = cubeCount, laps = defaultLaps) => unboundedStep => {
    const maxSteps = totalMaxSteps / laps;
    const step = unboundedStep % maxSteps;

    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / maxSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}


export const toColor = (integer) => {
    integer >>>= 0;
    var b = integer & 0xFF,
        g = (integer & 0xFF00) >>> 8,
        r = (integer & 0xFF0000) >>> 16,
        a = ( (integer & 0xFF000000) >>> 24 ) / 255 ;
    return "rgb(" + [r, g, b].join(",") + ")";
}

export const makeColorizer = (sourceMax = cubeCount) => {
  const targetPerSource = max / sourceMax;

  return (unboundedSourceNumber) => {
    const sourceNumber = unboundedSourceNumber % sourceMax;
    const targetNumber = Math.round(sourceNumber * targetPerSource);
    const targetColor = toColor(targetNumber);
    return targetColor;
  }
}

export const colorize = createRainbow();


export const adjustColor = (totalMaxSteps = cubeCount, basePercent = defaultBase) => (colorString, unboundedSourceNumber) => {

  const adjustmentPercent = 1 - basePercent;

  const sourceNumber = unboundedSourceNumber % totalMaxSteps;
  const ratio = sourceNumber/totalMaxSteps;
  const movingPercent = ratio * adjustmentPercent;

  const adjustment = movingPercent + basePercent;

  const color = Color(colorString);
  // color.alpha(1 - adjustment).darken(adjustment);
  // color.darken(1-adjustment);
  color.lighten(adjustment);
  const hsl = color.hslString();
  return hsl;
}

const createAdjustedRainbow = (totalMaxSteps = cubeCount, basePercent = defaultBase) => {
  const rainbow = createRainbow(totalMaxSteps);
  const adjuster = adjustColor(totalMaxSteps, basePercent);
  const ajustedRainbow = (num) => {
    const simpleColor = rainbow(num);
    const adjustedColor = adjuster(simpleColor, num);
    return adjustedColor;
  };
  return ajustedRainbow;
}

export default createAdjustedRainbow();
