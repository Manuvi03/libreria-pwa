const CACHE_NAME = 'book-search-cache-v1';
const urlsToCache = [
  './',
  'librería-pwa/index.html',
  'librería-pwa/manifest.json',
  'librería-pwa/robots.txt',
  'librería-pwa/favicon.ico',
  'librería-pwa/favicon-16x16.png',
  'librería-pwa/favicon-32x32.png',
  'librería-pwa/android-chrome-192x192.png',
  'librería-pwa/android-chrome-512x512.png',
  'librería-pwa/apple-touch-icon.png',
  'librería-pwa/default-cover.png',
  'librería-pwa/src/styles/global.css',
  'librería-pwa/src/styles/index.css',
  'librería-pwa/src/App.js',
  'librería-pwa/src/index.js',
  'librería-pwa/src/pages/Home.js',
  'librería-pwa/src/components/Book.js',
  'librería-pwa/src/components/BookList.js',
  'librería-pwa/src/components/FilterBar.js',
  'librería-pwa/src/components/SearchBar.js',
  'librería-pwa/src/services/api.js',
  'librería-pwa/src/reportWebVitals.js',
  'librería-pwa/src/sw.js'
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