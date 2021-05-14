// The wake lock sentinel.
let wakeLock = null;

// Function that attempts to request a screen wake lock.
export const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request();
            wakeLock.addEventListener('release', () => {
                console.log('Screen Wake Lock released:', wakeLock.released);
            });
            console.log('Screen Wake Lock released:', wakeLock.released);
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
    }
};


