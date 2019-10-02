import {setHarmonicInterval, clearHarmonicInterval} from '..';

jest.useFakeTimers();

const setIntervalSpy = (setInterval as any) as jest.SpyInstance;
const clearIntervalSpy = (clearInterval as any) as jest.SpyInstance;

beforeEach(() => {
  setIntervalSpy.mockReset();
  clearIntervalSpy.mockReset();
  jest.runAllTimers();
});

test('exports methods', () => {
  expect(typeof setHarmonicInterval).toBe('function');
  expect(typeof clearHarmonicInterval).toBe('function');
});

test('can schedule harmonic interval', () => {
  setHarmonicInterval(() => {}, 1000);
});

test('returns timer reference', () => {
  const ref = setHarmonicInterval(() => {}, 1000);
  expect(typeof ref).toBe('object');
});

test('calls setInterval()', () => {
  setHarmonicInterval(() => {}, 123);
  expect(setIntervalSpy).toHaveBeenCalledTimes(1);
  expect(setIntervalSpy.mock.calls[0][1]).toBe(123);
});

test('combines multiple calls with the same ms delay', () => {
  expect(setIntervalSpy).toHaveBeenCalledTimes(0);
  setHarmonicInterval(() => {}, 222);
  expect(setIntervalSpy).toHaveBeenCalledTimes(1);
  setHarmonicInterval(() => {}, 222);
  expect(setIntervalSpy).toHaveBeenCalledTimes(1);
  setHarmonicInterval(() => {}, 222);
  expect(setIntervalSpy).toHaveBeenCalledTimes(1);
  setHarmonicInterval(() => {}, 9999);
  expect(setIntervalSpy).toHaveBeenCalledTimes(2);
  setHarmonicInterval(() => {}, 222);
  expect(setIntervalSpy).toHaveBeenCalledTimes(2);
  setHarmonicInterval(() => {}, 9999);
  expect(setIntervalSpy).toHaveBeenCalledTimes(2);
});

test('clears interval when last listener removed', () => {
  const ref1 = setHarmonicInterval(() => {}, 333);
  const ref2 = setHarmonicInterval(() => {}, 333);
  const ref3 = setHarmonicInterval(() => {}, 444);

  expect(clearIntervalSpy).toHaveBeenCalledTimes(0);

  clearHarmonicInterval(ref1);
  expect(clearIntervalSpy).toHaveBeenCalledTimes(0);

  clearHarmonicInterval(ref3);
  expect(clearIntervalSpy).toHaveBeenCalledTimes(1);

  clearHarmonicInterval(ref2);
  expect(clearIntervalSpy).toHaveBeenCalledTimes(2);
});
