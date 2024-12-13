const CACHE_NAME = 'book-search-cache-v1';
const urlsToCache = [
  './',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/default-cover.png',
  '/src/styles/global.css',
  '/src/styles/index.css',
  '/src/App.js',
  '/src/index.js',
  '/src/pages/Home.js',
  '/src/components/Book.js',
  '/src/components/BookList.js',
  '/src/components/FilterBar.js',
  '/src/components/SearchBar.js',
  '/src/services/api.js',
  '/src/reportWebVitals.js',
  '/src/sw.js'
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