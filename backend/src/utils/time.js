let fakeTime = Date.now();

export function now() {
  if (process.env.TEST_MODE === "1") {
    return fakeTime;
  }
  return Date.now();
}

export function advanceTime(seconds) {
  fakeTime += seconds * 1000;
}
