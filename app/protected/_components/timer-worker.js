// timerWorker.js
self.onmessage = (e) => {
  const { startTime } = e.data;

  const tick = () => {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    self.postMessage({ type: "tick", elapsed });
  };

  setInterval(tick, 500);
};
