/* eslint-disable no-undef */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.loadModule('workbox-background-sync');
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);


const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const cacheNetworkFirst = [
	'/api/events',
	'/api/auth/renew'
];
registerRoute(
	({ request, url }) => {
		if(cacheNetworkFirst.includes(url.pathname)) return true;
		return false;
	},
	new NetworkFirst()
);

const cacheFirst = [
	'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];
registerRoute(
	({ request, url }) => {
		if(cacheFirst.includes(url.href)) return true;
		return false;
	},
	new CacheFirst()
);

const bgSyncPlugin = new BackgroundSyncPlugin('postEventsOfflineQueue', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});
registerRoute(
	new RegExp("http://localhost:8000/api/events/add"),
	new NetworkOnly({
		plugins: [bgSyncPlugin]
	}),
	'POST'
);
registerRoute(
	new RegExp("http://localhost:8000/api/events/*/edit"),
	new NetworkOnly({
		plugins: [bgSyncPlugin]
	}),
	'PUT'
);
registerRoute(
	new RegExp("http://localhost:8000/api/events/*/delete"),
	new NetworkOnly({
		plugins: [bgSyncPlugin]
	}),
	'PUT'
);