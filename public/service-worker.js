'use strict';

// Update cache names any time any of the cached files change.
const STATIC_CACHE = 'static-v6';

// Add list of files to cache here.
const STATIC_FILES = [
  '/',
  '/index.html',
  '/favicon.png',
  '/manifest.json',
  '/global.css',
  '/build/bundle.css',
  '/build/bundle.js',
  '/images/help/example-amount.png',
  '/images/help/example-color.png',
  '/images/help/example-filling.png',
  '/images/help/example-set-1.png',
  '/images/help/example-set-2.png',
  '/images/help/example-set-3.png',
  '/images/help/example-shape.png',
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-144x144.png',
  '/images/icons/icon-152x152.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-256x256.png',
  '/images/icons/icon-32x32.png',
  '/images/icons/icon-512x512.png',
  '/offline.html',
  'https://fonts.gstatic.com/s/arimo/v17/P5sMzZCDf9_T_10ZxCE.woff2',
  'https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap',
];

self.addEventListener('install', (event) => {
  console.log('%c[service-worker.js] Service Worker installed', 'color: #FEC233');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      cache.addAll(STATIC_FILES).then(() => {
        console.log('%c[service-worker.js] Files added to static cache', 'color: #FEC233');
        self.skipWaiting();
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("%c[service-worker.js] Service Worker activated", "color: #FEC233");
  event.waitUntil(
    // will return an array of cache names
    caches.keys().then((keys) => {
      return Promise.all(
        // go over all available keys
        keys.map((key) => {
          if (key !== STATIC_CACHE) {
            console.log("%c[service-worker.js] Deleting caches", "color: #FEC233");
            return caches.delete(key);
          }
        })
      );
    })
  );
  // ensure that the Service Worker is activated correctly (fail-safe)
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    // look at all caches for a match on the key (= request)
    caches.match(event.request, { ignoreVary: true }).then((response) => {
      if (response) {
        // return from cache
        return response;
      } else {
        // fetch it from the server and save to cache
        return fetch(event.request)
          .catch(() => {
            return caches.open(STATIC_CACHE).then((cache) => {
              if (event.request.headers.get("accept").includes("text/html")) {
                return cache.match("/offline.html");
              }
            });
          });
      }
    })
  );
});