// 리온영어 통합 API (Vercel KV REST)
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function kv(command) {
  const r = await fetch(KV_URL + "/" + command.map(encodeURIComponent).join("/"), {
    headers: { Authorization: "Bearer " + KV_TOKEN },
  });
  const j = await r.json();
  return j.result;
}
function isAdmin(u) {
  const code = (u.searchParams.get("code") || "").trim();
  return process.env.ADMIN_CODE && code === process.env.ADMIN_CODE;
}
function todayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (!KV_URL || !KV_TOKEN) { res.status(500).json({ error: "storage not configured" }); return; }

  const u = new URL(req.url, "http://localhost");
  const action = u.searchParams.get("action") || "";

  try {
    // ===== 학생 계정 =====
    if (action === "create") {
      if (!isAdmin(u)) { res.status(401).json({ error: "unauthorized" }); return; }
      const name = (u.searchParams.get("name") || "").trim().slice(0, 20);
      const pin = (u.searchParams.get("pin") || "").trim().slice(0, 4);
      if (!name || !/^\d{4}$/.test(pin)) { res.status(400).json({ error: "name/pin invalid" }); return; }
      let id = "";
      for (let t = 0; t < 20; t++) {
        const cand = "r" + Math.floor(1000 + Math.random() * 9000);
        const exists = await kv(["exists", "rion:u:" + cand]);
        if (!exists) { id = cand; break; }
      }
      if (!id) { res.status(500).json({ error: "id gen failed" }); return; }
      const rec = { id, name, pin, created: todayStr(), records: [] };
      await kv(["set", "rion:u:" + id, JSON.stringify(rec)]);
      await kv(["sadd", "rion:users", id]);
      res.status(200).json({ id, name, pin });
      return;
    }

    if (action === "login") {
      const id = (u.searchParams.get("id") || "").trim();
      const pin = (u.searchParams.get("pin") || "").trim();
      const raw = await kv(["get", "rion:u:" + id]);
      if (!raw) { res.status(404).json({ error: "no_user" }); return; }
      const rec = JSON.parse(raw);
      if (rec.pin !== pin) { res.status(401).json({ error: "wrong_pin" }); return; }
      res.status(200).json({ id: rec.id, name: rec.name, records: rec.records || [] });
      return;
    }

    if (action === "list") {
      if (!isAdmin(u)) { res.status(401).json({ error: "unauthorized" }); return; }
      const ids = (await kv(["smembers", "rion:users"])) || [];
      const out = [];
      for (const id of ids) {
        const raw = await kv(["get", "rion:u:" + id]);
        if (raw) { try { out.push(JSON.parse(raw)); } catch (e) {} }
      }
      out.sort((a, b) => (a.name||"").localeCompare(b.name||""));
      res.status(200).json({ students: out });
      return;
    }

    if (action === "delete") {
      if (!isAdmin(u)) { res.status(401).json({ error: "unauthorized" }); return; }
      const id = (u.searchParams.get("id") || "").trim();
      await kv(["del", "rion:u:" + id]);
      await kv(["srem", "rion:users", id]);
      res.status(200).json({ ok: true });
      return;
    }

    // ===== 결과 기록 (선생님이 입력) =====
    if (action === "addrecord") {
      if (!isAdmin(u)) { res.status(401).json({ error: "unauthorized" }); return; }
      const id = (u.searchParams.get("id") || "").trim();
      const raw = await kv(["get", "rion:u:" + id]);
      if (!raw) { res.status(404).json({ error: "no_user" }); return; }
      const rec = JSON.parse(raw);
      const entry = {
        date: (u.searchParams.get("date") || todayStr()),
        book: (u.searchParams.get("book") || "").slice(0, 40),
        hwScore: (u.searchParams.get("hw") || "").slice(0, 12),
        wordScore: (u.searchParams.get("word") || "").slice(0, 12),
        reading: u.searchParams.get("reading") === "1",   // 낭독 숙제 완료
        writing: u.searchParams.get("writing") === "1",   // 쓰기 숙제 완료
        listening: u.searchParams.get("listening") === "1", // 흘려듣기 완료
        memo: (u.searchParams.get("memo") || "").slice(0, 60),
        ts: Date.now(),
      };
      rec.records = rec.records || [];
      rec.records.unshift(entry);
      if (rec.records.length > 200) rec.records = rec.records.slice(0, 200);
      await kv(["set", "rion:u:" + id, JSON.stringify(rec)]);
      res.status(200).json({ ok: true });
      return;
    }

    if (action === "delrecord") {
      if (!isAdmin(u)) { res.status(401).json({ error: "unauthorized" }); return; }
      const id = (u.searchParams.get("id") || "").trim();
      const ts = parseInt(u.searchParams.get("ts") || "0", 10);
      const raw = await kv(["get", "rion:u:" + id]);
      if (!raw) { res.status(404).json({ error: "no_user" }); return; }
      const rec = JSON.parse(raw);
      rec.records = (rec.records || []).filter((x) => x.ts !== ts);
      await kv(["set", "rion:u:" + id, JSON.stringify(rec)]);
      res.status(200).json({ ok: true });
      return;
    }

    // ===== 교재 관리 (선생님이 앱에서 추가·삭제) =====
    if (action === "books") {
      const raw = await kv(["get", "rion:books"]);
      const books = raw ? JSON.parse(raw) : [];
      res.status(200).json({ books });
      return;
    }
    if (action === "setbooks") {
      if (!isAdmin(u)) { res.status(401).json({ error: "unauthorized" }); return; }
      const raw = u.searchParams.get("books") || "[]";
      let books;
      try { books = JSON.parse(raw); } catch (e) { res.status(400).json({ error: "bad json" }); return; }
      await kv(["set", "rion:books", JSON.stringify(books.slice(0, 100))]);
      res.status(200).json({ ok: true, count: books.length });
      return;
    }

    res.status(400).json({ error: "unknown action" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
