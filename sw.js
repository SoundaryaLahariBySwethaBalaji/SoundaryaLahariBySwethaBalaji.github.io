/* ================================================================
   Offline support.

   You should never need to open this file. The one thing worth
   knowing: if you ever change index.html itself, bump VERSION
   below by one. That tells every phone to throw away its old copy.

   Changing songs.txt or adding audio needs NO change here.
   ================================================================ */

const VERSION = 1;

const SHELL = `sl-shell-v${VERSION}`;
const MEDIA = `sl-media-v${VERSION}`;   // must match MEDIA_CACHE in index.html

/* Everything needed to open the app with no internet at all.
   The recordings are not in here on purpose — they are saved
   as they are played, or all at once from the button on the page. */
const SHELL_FILES = [
  "./",
  "./index.html",
  "./songs.txt",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./fonts/karla-latin.woff2",
  "./fonts/karla-latin-ext.woff2",
  "./fonts/tiro-devanagari.woff2",
  "./fonts/tiro-latin.woff2",
  "./fonts/tiro-latin-ext.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(SHELL)
      // addAll fails the whole install if one file 404s; add them
      // one at a time so a missing icon can never brick the app
      .then(c => Promise.all(SHELL_FILES.map(f => c.add(f).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(n => n !== SHELL && n !== MEDIA).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

/* songs.txt is fetched with a "?v=" on the end to dodge stale copies.
   Strip that so one cached entry serves every version of the URL. */
const keyFor = url => {
  const u = new URL(url);
  u.search = "";
  return u.toString();
};

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;

  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;

  const isAudio    = url.pathname.includes("/audio/");
  const isSongList = url.pathname.endsWith("songs.txt");
  const isPage     = req.mode === "navigate";

  /* Recordings never change once uploaded — serve from the cache
     when we have them, and quietly keep a copy when we don't. */
  if(isAudio){
    e.respondWith(
      caches.open(MEDIA).then(cache =>
        cache.match(req).then(hit => hit || fetch(req).then(res => {
          // 206 Partial Content comes back when the browser seeks; not cacheable
          if(res.ok && res.status === 200) cache.put(req, res.clone());
          return res;
        }))
      )
    );
    return;
  }

  /* The page and the song list should always be the newest version
     when there is a connection, and the last known one when there isn't. */
  if(isPage || isSongList){
    e.respondWith(
      fetch(req).then(res => {
        if(res.ok){
          const copy = res.clone();
          caches.open(SHELL).then(c => c.put(isSongList ? keyFor(req.url) : req, copy));
        }
        return res;
      }).catch(() =>
        caches.match(isSongList ? keyFor(req.url) : req)
          .then(hit => hit || caches.match("./index.html"))
      )
    );
    return;
  }

  /* Fonts and icons: cache first, they do not change. */
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if(res.ok && res.status === 200){
        const copy = res.clone();
        caches.open(SHELL).then(c => c.put(req, copy));
      }
      return res;
    }))
  );
});
