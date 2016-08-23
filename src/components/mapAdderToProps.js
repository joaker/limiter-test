

const factorial = (n, acc = 1) => (n <= 1 ? acc : factorial(n - 1, n * acc));

/* creates an inner function that wants to remember data across invocations */
export const createAdder = () => {
  let data = 0;
  const innerAdder = (ith) => {
    if(ith < 5){
      const key = ith+"key";
      data = data ? data + ith: ith;
      console.log('ith is: ' + ith);
      console.log('data is: ' + data);

      const fact = factorial(data);
      console.log('data factorial is: ' + fact);
      return data;
    };
  };
  return innerAdder;
};

/* defines a map state to props that users the provided adder */
export const mapStateToPropsForParam = (adder) => ({iteration: iterationNumber = 0, start = '', memoizing}, {ith}) => {
  const cursor = iterationNumber % cubeCount;
  const active = cursor >= ith;

  adder(ith);

  const iteration = !memoizing && iterationNumber;

  return {
    active,
    iteration,
  };
};

/* mapStateToProps where the adder data is shared between everything */
export const classMapStateToProps = mapStateToPropsForParam(createAdder());

export const instanceMapStateToProp = (memoize) => {
  const adder = createAdder();
  return mapStateToPropsForParam(adder);
};
