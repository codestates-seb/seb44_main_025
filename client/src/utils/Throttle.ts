export const throttle = (
  callback: (parameter?: any) => void,
  delay: number
) => {
  let throttling = false;
  let timeoutId: null | ReturnType<typeof setTimeout> = null;
  let time: number;
  return function (...args: any[]) {
    if (!throttling) {
      callback(...args);
      throttling = true;
      timeoutId = setTimeout(() => {
        throttling = false;
        time = Date.now();
      }, delay);
    } else {
      if (Date.now() - delay > time) {
        callback(...args);
        throttling = true;
        timeoutId = setTimeout(() => {
          throttling = false;
          time = Date.now();
        });
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          throttling = false;
          time = Date.now();
        }, delay + time - Date.now());
      }
    }
  };
};
