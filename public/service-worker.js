var CACHE_NAME = "pokemon-pwa";
var urlsToCache = ["/", "/my-pokemon"];

// Install service worker
self.addEventListener("install", (event) => {
    // Perform the install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Cache and return the requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return response as Cache is hit
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

// Update service worker
self.addEventListener("activate", (event) => {
    var cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
