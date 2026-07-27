import https from "https";
const cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000;

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "GET") { res.status(405).json({ error: "Method Not Allowed" }); return; }
  let q = "";
  try { q = (new URL(req.url, "http://localhost").searchParams.get("q") || "").trim(); } catch (e) {}
  if (!q) { res.status(400).json({ error: "q required" }); return; }
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) { res.status(500).json({ error: "API key not configured" }); return; }

  const ck = q.toLowerCase();
  const c = cache.get(ck);
  if (c && Date.now() - c.time < CACHE_TTL) {
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.status(200).json({ items: c.items }); return;
  }
  const params = new URLSearchParams({
    part: "snippet", type: "video", maxResults: "12", q: q + " audio",
    safeSearch: "strict", videoEmbeddable: "true", relevanceLanguage: "en", key,
  });
  const url = "https://www.googleapis.com/youtube/v3/search?" + params.toString();
  return new Promise((resolve) => {
    https.get(url, (r) => {
      let data = "";
      r.on("data", (x) => (data += x));
      r.on("end", () => {
        try {
          const j = JSON.parse(data);
          if (j.error) { res.status(500).json({ error: j.error.message }); return resolve(); }
          const items = (j.items || []).filter((it)=>it.id&&it.id.videoId).map((it) => ({
            id: it.id.videoId, title: it.snippet.title, channel: it.snippet.channelTitle,
            thumb: it.snippet.thumbnails ? (it.snippet.thumbnails.medium||it.snippet.thumbnails.default).url : "",
          }));
          cache.set(ck, { items, time: Date.now() });
          res.setHeader("Cache-Control", "public, max-age=86400");
          res.status(200).json({ items });
        } catch (e) { res.status(500).json({ error: "parse error" }); }
        resolve();
      });
    }).on("error", (e) => { res.status(500).json({ error: e.message }); resolve(); });
  });
}
