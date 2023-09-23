import { writable } from 'svelte/store';

export const showInstallDialog = writable(false);

export const activateServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((reg) => {
          console.log('%c[activate-service-worker.js] Service Worker registered', 'color: #00ABD2');
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                console.log(
                  '%c[activate-service-worker.js] New or updated content is available',
                  'color: #00ABD2',
                );
                showInstallDialog.set(true);
              }
            };
          };
        })
        .catch((e) => {
          console.error(
            '%c[activate-service-worker.js] Error during service worker registration:',
            e,
          );
        });
    });
  }
};
