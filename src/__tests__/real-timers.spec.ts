import {setHarmonicInterval, clearHarmonicInterval} from '..';

test('calls timer', async () => {
  const spy = jest.fn();

  expect(spy).toHaveBeenCalledTimes(0);

  const ref = setHarmonicInterval(spy, 5);

  expect(spy).toHaveBeenCalledTimes(0);

  await new Promise(r => setTimeout(r, 5));
  expect(spy).toHaveBeenCalledTimes(1);

  clearHarmonicInterval(ref);

  await new Promise(r => setTimeout(r, 6));
  expect(spy).toHaveBeenCalledTimes(1);
});

test('calls all callbacks at the same time, and clears', async () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();

  const ref1 = setHarmonicInterval(spy1, 30);
  await new Promise(r => setTimeout(r, 15));
  const ref2 = setHarmonicInterval(spy2, 30);

  expect(spy1).toHaveBeenCalledTimes(0);
  expect(spy2).toHaveBeenCalledTimes(0);

  await new Promise(r => setTimeout(r, 16));

  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledTimes(1);

  clearHarmonicInterval(ref1);
  clearHarmonicInterval(ref2);

  await new Promise(r => setTimeout(r, 31));

  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledTimes(1);
});
