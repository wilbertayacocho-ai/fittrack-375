const CACHE = 'fittrack375-v3';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/fittrack-icon.svg',
  './assets/exercise-guide-overview.png'
];

self.addEventListener('install', event => {
  self.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP_SHELL).catch(() => Promise.resolve()))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith('fittrack375-') && key !== CACHE)
            .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin;
  const appPage = sameOrigin &&
    (url.pathname.endsWith('/index.html') || url.pathname.endsWith('/fittrack-375/'));

  // Always try the network first for app HTML so new GitHub Pages changes appear.
  if (appPage) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (sameOrigin && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
