export type Listener = () => void;
export type ClearHarmonicInterval = () => void;

export interface Bucket {
  ms: number;
  timer: any;
  listeners: Record<number, Listener>;
}

export interface TimerReference {
  bucket: Bucket;
  id: number;
}

let counter = 0;
const buckets: Record<number, Bucket> = {};

export const setHarmonicInterval = (fn: Listener, ms: number): TimerReference => {
  const id = counter++;

  if (buckets[ms]) {  
    buckets[ms].listeners[id] = fn;
  } else {
    const timer = setInterval(() => {
      const {listeners} = buckets[ms];
      let didThrow = false;
      let lastError: any;

      for (const listener of Object.values(listeners)) {
        try {
          listener();
        } catch (error) {
          didThrow = true;
          lastError = error;
        }
      }

      if (didThrow) throw lastError;
    }, ms);
    
    buckets[ms] = {
      ms,
      timer,
      listeners: {
        [id]: fn,
      },
    };
  }

  return {
    bucket: buckets[ms],
    id,
  };
};

export const clearHarmonicInterval = ({bucket, id}: TimerReference): void => {
  delete bucket.listeners[id];

  let hasListeners = false;
  for (const listener in bucket.listeners) {
    hasListeners = true;
    break;
  }

  if (!hasListeners) {
    clearInterval(bucket.timer);
    delete buckets[bucket.ms];
  }
};
