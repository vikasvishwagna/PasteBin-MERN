let fakeNow = Date.now();

export default function getNow() {
  if (process.env.TEST_MODE === "1") {
    return fakeNow; 
  }
  return Date.now(); 
}

export function advanceTime(seconds) {
  fakeNow += seconds * 1000;
}
