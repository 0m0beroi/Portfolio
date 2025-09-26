/* Basic service worker for caching static assets */
const CACHE_NAME = 'portfolio-cache-v5';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/tw.css',
  '/css/config.css',
  '/js/data.js',
  '/js/script.js',
  '/js/includes.js',
  '/js/projects-render.js',
  '/js/lightbox.js',
  '/assets/images/profile.jpg'
];
self.addEventListener('install', (e)=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=> cache.addAll(CORE_ASSETS).catch(()=>{}))
  );
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
  );
});
self.addEventListener('fetch', (e)=>{
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);

  // Network-first for HTML pages and partials to avoid serving stale content
  const isDocument = req.destination === 'document' || req.headers.get('accept')?.includes('text/html');
  const isPartial = url.pathname.startsWith('/partials/');
  if(isDocument || isPartial){
    e.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(cache=> cache.put(req, copy)).catch(()=>{});
        return resp;
      }).catch(()=> caches.match(req))
    );
    return;
  }

  // Cache-first for other static assets
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp=>{
      const copy = resp.clone();
      caches.open(CACHE_NAME).then(cache=> cache.put(req, copy)).catch(()=>{});
      return resp;
    }).catch(()=> cached || new Response('Offline', {status:503})))
  );
});
