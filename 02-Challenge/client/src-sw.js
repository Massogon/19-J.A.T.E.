const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache the assets from Webpack's manifest
precacheAndRoute(self.__WB_MANIFEST);

// Page cache (HTML caching)
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200], // Cache only successful or opaque responses
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache pages for 30 days
    }),
  ],
});

// Preload important pages like index.html into cache
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Cache navigational requests (HTML pages)
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Asset caching (CSS, JS, Web Worker files)
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Only cache valid responses
      }),
      // new ExpirationPlugin({
      //   maxEntries: 60, // Cache up to 60 assets
      //   maxAgeSeconds: 30 * 24 * 60 * 60, // Cache assets for 30 days
      // }),
    ],
  })
);

// Optional: Add an offline fallback (for when the user is offline and asset is missing)
// offlineFallback({
//   pageFallback: '/offline.html',
// });
