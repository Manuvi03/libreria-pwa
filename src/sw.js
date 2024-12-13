const CACHE_NAME = 'book-search-cache-v1';
const urlsToCache = [
  './',
  'libreria-pwa/index.html',
  'libreria-pwa/manifest.json',
  'libreria-pwa/robots.txt',
  'libreria-pwa/favicon.ico',
  'libreria-pwa/favicon-16x16.png',
  'libreria-pwa/favicon-32x32.png',
  'libreria-pwa/android-chrome-192x192.png',
  'libreria-pwa/android-chrome-512x512.png',
  'libreria-pwa/apple-touch-icon.png',
  'libreria-pwa/default-cover.png',
  'libreria-pwa/src/styles/global.css',
  'libreria-pwa/src/styles/index.css',
  'libreria-pwa/src/App.js',
  'libreria-pwa/src/index.js',
  'libreria-pwa/src/pages/Home.js',
  'libreria-pwa/src/components/Book.js',
  'libreria-pwa/src/components/BookList.js',
  'libreria-pwa/src/components/FilterBar.js',
  'libreria-pwa/src/components/SearchBar.js',
  'libreria-pwa/src/services/api.js',
  'libreria-pwa/src/reportWebVitals.js',
  'libreria-pwa/src/sw.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Error al instalar la cache', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});