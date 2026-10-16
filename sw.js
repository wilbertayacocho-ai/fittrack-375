const CACHE = 'fittrack375-v4';
const APP_FILES = [
  './','./index.html','./manifest.webmanifest','./icons/fittrack-icon.svg',
  './assets/exercise-guide-overview.png',
  './assets/exercises/push-ups.jpg','./assets/exercises/muscle-up.jpg',
  './assets/exercises/band-row.jpg','./assets/exercises/dead-bug.jpg',
  './assets/exercises/mobility.jpg','./assets/exercises/pull-up.jpg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_FILES).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('fittrack375-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url), same = url.origin === self.location.origin;
  const page = same && (url.pathname.endsWith('/index.html') || url.pathname.endsWith('/fittrack-375/'));
  if (page) {
    event.respondWith(fetch(event.request).then(response => { if (response.ok) { const c=response.clone(); caches.open(CACHE).then(cache=>cache.put(event.request,c)); } return response; }).catch(()=>caches.match(event.request).then(c=>c||caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(c=>c||fetch(event.request).then(response=>{ if(same&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));} return response; })));
});
