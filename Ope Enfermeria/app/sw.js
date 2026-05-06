// Cambiar CACHE_NAME para forzar una actualización profunda inmediata
const CACHE_NAME = 'ope-enfermeria-cache-v2';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './main.js',
    './icon.png'
];

// Instalar SW y pre-cachear los recursos esenciales para que funcione sin internet
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar peticiones para servir desde RED primero, fallback a CACHE si no hay internet (Network First)
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                // Guardamos una copia temporal de lo nuevo que llega de internet
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            })
            .catch(() => {
                // Si falla (estamos offline), usamos la memoria caché
                return caches.match(event.request);
            })
    );
});

// Limpiar caches antiguos cuando se actualiza
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
