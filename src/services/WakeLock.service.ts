// Function that attempts to request a screen wake lock.
export const requestWakeLock = async () => {
  if ('wakeLock' in navigator) {
    try {
      await navigator.wakeLock.request('screen');
    } catch (err) {
      if (err && typeof err === 'object' && 'name' in err && 'message' in err) {
        console.error(`${err.name}, ${err.message}`);
      }
    }
  }
};
