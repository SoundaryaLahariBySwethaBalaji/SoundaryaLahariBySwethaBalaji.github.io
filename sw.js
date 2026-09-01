/* ================================================================
   Offline support.

   You should never need to open this file. The one thing worth
   knowing: if you ever change index.html itself, bump VERSION
   below by one. That tells every phone to throw away its old copy.

   Changing songs.txt or adding audio needs NO change here.
   ================================================================ */

const VERSION = 3;

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
  "./icon-192.png",
  "./icon-512.png"
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

/* ----------------------------------------------------------------
   Recordings

   A browser does not ask for an audio file in one go. It asks for
   byte ranges, and gets back "206 Partial Content" each time. That
   is why a played slokam used to vanish the moment you went offline:
   a 206 is a fragment, and caching fragments is useless.

   So: the first time a recording is asked for, fetch the whole file
   once, keep that, and answer the player by cutting the piece it
   asked for out of the copy we now hold.
   ---------------------------------------------------------------- */

function sliceOf(response, rangeHeader){
  return response.arrayBuffer().then(buf => {
    const total = buf.byteLength;
    const m = /bytes=(\d*)-(\d*)/.exec(rangeHeader) || [];
    let start = m[1] ? parseInt(m[1], 10) : 0;
    let end   = m[2] ? parseInt(m[2], 10) : total - 1;
    if(isNaN(start) || start < 0) start = 0;
    if(isNaN(end) || end >= total) end = total - 1;
    if(start > end) start = end;

    const part = buf.slice(start, end + 1);
    return new Response(part, {
      status: 206,
      statusText: "Partial Content",
      headers: {
        "Content-Type":   response.headers.get("Content-Type") || "audio/mp4",
        "Content-Length": String(part.byteLength),
        "Content-Range":  `bytes ${start}-${end}/${total}`,
        "Accept-Ranges":  "bytes"
      }
    });
  });
}

async function serveRecording(key, range, req){
  const cache = await caches.open(MEDIA);
  let held = await cache.match(key);

  if(!held){
    let full;
    try{
      full = await fetch(key);
    }catch(err){
      return fetch(req);              // offline and not saved: let it fail normally
    }
    if(!full.ok || full.status !== 200) return fetch(req);
    await cache.put(key, full.clone());
    held = full;
  }

  return range ? sliceOf(held, range) : held;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;

  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;

  const isAudio    = url.pathname.endsWith(".m4a");
  const isSongList = url.pathname.endsWith("songs.txt");
  const isPage     = req.mode === "navigate";

  if(isAudio){
    e.respondWith(serveRecording(url.origin + url.pathname,
                                 req.headers.get("range"),
                                 req));
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

  /* Icons and anything else: cache first, they do not change.
     (The fonts are inside index.html, so there is nothing to fetch.) */
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
