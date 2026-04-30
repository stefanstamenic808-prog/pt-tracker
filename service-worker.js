// service-worker.js — offline cache za StamenicFitt
// Verzioniraj cache name pri svakom deploy-u da se stari fajlovi obrišu
const CACHE_NAME = 'pt-tracker-v1';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './js/auth.js',
  './js/db.js',
  './js/supabase-config.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Install — cache svih osnovnih fajlova
self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(c){return c.addAll(ASSETS);})
      .then(function(){return self.skipWaiting();})
  );
});

// Activate — obriši stare cache verzije
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){return k!==CACHE_NAME;})
        .map(function(k){return caches.delete(k);}));
    }).then(function(){return self.clients.claim();})
  );
});

// Fetch — cache-first za statiku, network-only za Supabase API
self.addEventListener('fetch', function(e){
  var url = new URL(e.request.url);

  // Supabase API i WebSocket — nikad cache, uvek mreža
  if(url.hostname.indexOf('supabase.co')>-1 ||
     url.hostname.indexOf('supabase.in')>-1 ||
     url.protocol==='wss:' || url.protocol==='ws:'){
    return;
  }

  // Samo GET zahteve cache-iramo
  if(e.request.method!=='GET')return;

  e.respondWith(
    caches.match(e.request).then(function(cached){
      // Network-first: pokušaj sveže, fall back na cache
      var fetchPromise = fetch(e.request).then(function(resp){
        if(resp.ok){
          var clone = resp.clone();
          caches.open(CACHE_NAME).then(function(c){c.put(e.request,clone);});
        }
        return resp;
      }).catch(function(){
        return cached || caches.match('./index.html');
      });
      return cached || fetchPromise;
    })
  );
});
