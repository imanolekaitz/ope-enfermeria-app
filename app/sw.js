const CACHE_NAME = 'ope-enfermeria-cache-v1';
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

// Interceptar peticiones para servir desde caché local
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // En cache local offline
                }
                return fetch(event.request);
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
