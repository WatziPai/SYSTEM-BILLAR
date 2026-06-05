// Service Worker para caché y performance
const CACHE_NAME = 'billar-system-v1';
const urlsToCache = [
  '/SYSTEM-BILLAR/',
  '/SYSTEM-BILLAR/index.html',
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Activar y limpiar cachés antiguos
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

// Estrategia: Network First, fallback to Cache
self.addEventListener('fetch', (event) => {
  // Solo cachear requests GET
  if (event.request.method !== 'GET') return;
  
  // No cachear requests a Firebase
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('firebase')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Solo cachear respuestas exitosas
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Si falla la red, intentar desde caché
        return caches.match(event.request);
      })
  );
});
