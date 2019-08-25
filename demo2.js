const { setHarmonicInterval, clearHarmonicInterval } = require('./lib');

const setInt = setHarmonicInterval;

setInt(() => console.log(1), 1000);
setTimeout(() => {
  setInt(() => console.log(2), 1000);
}, 500);
