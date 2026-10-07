// Simple offline cache: app shell + images. Videos stream from the network.
const CACHE = 'fxthoomx-v2';
const SHELL = [
  "./",
  "index.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "assets/avatar.jpg",
  "assets/b1.jpg",
  "assets/b2.jpg",
  "assets/b3.jpg",
  "assets/b4.jpg",
  "assets/b5.jpg",
  "assets/b6.jpg",
  "assets/b7.jpg",
  "assets/p1.jpg",
  "assets/p10.jpg",
  "assets/p11.jpg",
  "assets/p12.jpg",
  "assets/p13.jpg",
  "assets/p14.jpg",
  "assets/p2.jpg",
  "assets/p3.jpg",
  "assets/p4.jpg",
  "assets/p5.jpg",
  "assets/p6.jpg",
  "assets/p7.jpg",
  "assets/p8.jpg",
  "assets/p9.jpg",
  "assets/v1p.jpg",
  "assets/v2p.jpg",
  "assets/v3p.jpg",
  "assets/v4p.jpg"
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || req.url.endsWith('.mp4') || req.headers.has('range')) return;
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
