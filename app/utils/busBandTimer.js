const busBandTimer = (() => {
  const DURATION = 1800000;
  let timer;

  function createTimer(callback) {
    timer = setTimeout(() => {
      callback();
      timer = undefined;
    }, DURATION);
  }

  function destroyTimer() {
    clearInterval(timer);
    timer = undefined;
  }

  return {
    createTimer(callback) {
      if (!timer) {
        createTimer(callback);
        return true;
      }
      return false;
    },
    clearTimer() {
      destroyTimer();
      return false;
    },
  };
})();

export default busBandTimer;
