// Function that attempts to request a screen wake lock.
export const requestWakeLock = async () => {
  if ('wakeLock' in navigator) {
    try {
      await navigator.wakeLock.request();
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  }
};
