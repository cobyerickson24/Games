// Pips service worker: always try the network first, so opening the app shows the newest
// version instead of an old saved copy. The saved copy is only used when the network is
// unavailable or very slow, which also lets the game open offline.
const CACHE = 'pips-v1';
const SLOW_MS = 3500;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // fonts and 3D libraries load as usual
  if (url.searchParams.has('check')) return;       // the in-page update check goes straight to the network

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = url.pathname; // one saved copy per file, whatever the ?v= in the address
    try {
      const res = await Promise.race([
        fetch(req.url, { cache: 'no-store', credentials: 'same-origin' }), // fresh copy, never the browser's saved one
        new Promise((_, reject) => setTimeout(() => reject(new Error('slow')), SLOW_MS)),
      ]);
      if (res && res.ok) cache.put(key, res.clone());
      return res;
    } catch (e) {
      const saved = await cache.match(key);
      return saved || fetch(req); // nothing saved yet: behave like a normal page load
    }
  })().catch(() => fetch(req)));
});
