import { self } from '$app/service-worker';
import { version } from '$app/env';
import { assets, immutable } from '$app/manifest';
import { asset, resolve } from '$app/paths';
import type { Path } from '$app/types';

const CACHE_NAME = `amoeben-indikator-${version}`;
const APP_ASSETS = [
    ...immutable.map(({ path }) => resolve(path as Path)),
    ...assets.map(({ path }) => asset(path))
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames
                        .filter(
                            (cacheName) => cacheName.startsWith('amoeben-indikator-') && cacheName !== CACHE_NAME
                        )
                        .map((cacheName) => caches.delete(cacheName))
                )
            )
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => cachedResponse ?? fetch(event.request))
    );
});
