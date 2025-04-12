export function useGameLoop() {
  /** @type {number} */
  let previousTimestamp;

  /** @type {((delta: number) => void)[]} */
  const onTickCallbacks = [];

  const loop = (timestamp) => {
    const delta = (timestamp - (previousTimestamp ?? timestamp)) / 1000.0;
    previousTimestamp = timestamp;

    for (const callback of onTickCallbacks) {
      callback(delta);
    }

    window.requestAnimationFrame(loop);
  };

  const start = () => {
    window.requestAnimationFrame(loop);
  };

  const onTick = (callback) => {
    onTickCallbacks.push(callback);
  };

  return [start, onTick];
}
