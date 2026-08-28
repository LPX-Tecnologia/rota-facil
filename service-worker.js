const CACHE_NAME = 'rotafacil-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/auth.js',
  './js/storage.js',
  './js/scanner.js',
  './js/ocr.js',
  './js/map.js',
  './js/route.js',
  './js/navigation.js',
  './js/perfil.js',
  './js/historico.js',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
