const CACHE_NAME = 'contador-v1';
const urlsToCache = [
  '/index.html', // O /contador.html si así se llama tu archivo
  '/style.css', // Si tienes un CSS externo
  '/script.js', // Si tienes un JS externo
  '/icon-192x192.png',
  '/icon-512x512.png'
  // Puedes añadir más rutas de tus imágenes aquí si quieres que se guarden en caché
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});