# set-harmonic-interval

Works similar to `setInterval`, but calls all callbacks scheduled using `setHarmonicInterval` all at once, which have same
delay in milliseconds.

## Install

```
npm install set-harmonic-interval
```

## Usage

```js
const { setHarmonicInterval, clearHarmonicInterval } = require('set-harmonic-interval');

setHarmonicInterval(() => console.log(1), 1000);
setHarmonicInterval(() => console.log(2), 1000);
```


## License

[Unlicense](LICENSE) &mdash; public domain.
