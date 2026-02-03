export default function getNow(req) {
  // Deterministic time 
  if (process.env.TEST_MODE === "1") {
    const headerTime = req?.headers["x-test-now-ms"];
    if (headerTime) {
      return new Date(Number(headerTime));
    }
  }

  // Real system time
  return new Date();
}
