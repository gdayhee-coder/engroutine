import { useState, useEffect } from "react";

const C = {
  bg:"#FFF8F2", paper:"#FFFFFF", border:"#FBE4D8", borderStrong:"#F3C9B3",
  sage:"#FF9466", sageDark:"#FF7A5C", sageDeep:"#D85A3E", sageLight:"#FFB199",
  gold:"#F0B429", coral:"#FFA24C", blue:"#5FB8D4",
  text:"#5A2E1F", textMid:"#A85A3E", textMuted:"#C58165",
  warn:"#D8473E",
};
const FF = "'Noto Sans KR',sans-serif";

const Logo = ({ size = 40, radius }) => (
  <div style={{ width:size, height:size, borderRadius:radius ?? size*0.28, background:"#FF7A5C", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 6px rgba(216,90,62,0.3)", flexShrink:0 }}>
    <svg width={size*0.72} height={size*0.72} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="15" fill="none" stroke="#D8473E" strokeWidth="5"/>
      <path d="M24 9a15 15 0 0112 24" fill="none" stroke="#FFE29A" strokeWidth="5" strokeLinecap="round"/>
      <text x="24" y="29" fontSize="13" fontWeight="900" textAnchor="middle" fill="#fff" fontFamily="sans-serif">E</text>
    </svg>
  </div>
);

// 부드러운 면(soft-fill) 아이콘 세트
const Ic = {
  ring: (c="#FF7A5C", s=16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill="none" stroke="#FBE4D8" strokeWidth="3"/>
      <path d="M12 3a9 9 0 016.5 15.2" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  book: (c="#FF7A5C", s=28) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <rect x="5" y="6" width="22" height="20" rx="3.5" fill={c} opacity="0.18"/>
      <path d="M16 8.5C13.5 7 9.5 7 7.5 7.5C6.7 7.7 6 8.4 6 9.3V22c0 1 .9 1.7 1.9 1.5C9.7 23.2 13.5 23.2 16 24.5V8.5Z" fill={c}/>
      <path d="M16 8.5C18.5 7 22.5 7 24.5 7.5C25.3 7.7 26 8.4 26 9.3V22c0 1-.9 1.7-1.9 1.5C22.3 23.2 18.5 23.2 16 24.5V8.5Z" fill={c} opacity="0.55"/>
    </svg>
  ),
  quiz: (c="#FF7A5C", s=28) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <rect x="6" y="5" width="20" height="22" rx="4" fill={c} opacity="0.18"/>
      <rect x="9" y="8" width="14" height="16" rx="2.5" fill={c}/>
      <path d="M13 13.5c0-1.4 1.2-2.5 3-2.5s3 1 3 2.4c0 1.2-.8 1.7-1.6 2.2-.7.4-1.4.8-1.4 1.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="16" cy="20.5" r="1.1" fill="#fff"/>
    </svg>
  ),
  study: (c="#FF7A5C", s=28) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <rect x="5" y="7" width="22" height="18" rx="3.5" fill={c} opacity="0.18"/>
      <path d="M16 10L26 13.5 16 17 6 13.5 16 10Z" fill={c}/>
      <path d="M10 15.5V20c0 .5.3 1 .8 1.2 1.5.7 3.4 1.3 5.2 1.3s3.7-.6 5.2-1.3c.5-.2.8-.7.8-1.2v-4.5L16 18.5 10 15.5Z" fill={c} opacity="0.55"/>
    </svg>
  ),
  chart: (c="#FF7A5C", s=24) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <rect x="5" y="5" width="22" height="22" rx="5" fill={c} opacity="0.18"/>
      <rect x="9" y="16" width="3.5" height="7" rx="1.6" fill={c}/>
      <rect x="14.3" y="12" width="3.5" height="11" rx="1.6" fill={c}/>
      <rect x="19.5" y="9" width="3.5" height="14" rx="1.6" fill={c} opacity="0.6"/>
    </svg>
  ),
  reading: (c="#D85A3E", s=20) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <path d="M16 9C13.5 7.5 9.5 7.5 7.5 8C6.7 8.2 6 8.9 6 9.8V22c0 1 .9 1.7 1.9 1.5C9.7 23 13.5 23 16 24.5V9Z" fill={c}/>
      <path d="M16 9C18.5 7.5 22.5 7.5 24.5 8C25.3 8.2 26 8.9 26 9.8V22c0 1-.9 1.7-1.9 1.5C22.3 23 18.5 23 16 24.5V9Z" fill={c} opacity="0.5"/>
    </svg>
  ),
  writing: (c="#B08842", s=20) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <path d="M8 22l-1 3 3-1L23 12.5 20.5 10 8 22Z" fill={c} opacity="0.55"/>
      <path d="M21.5 8.5l2.5 2.5c.6.6.6 1.5 0 2l-1.3 1.3-4.5-4.5 1.3-1.3c.6-.6 1.4-.6 2 0Z" fill={c}/>
    </svg>
  ),
  headphone: (c="#FFA24C", s=20) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <path d="M8 18v-2a8 8 0 0116 0v2" stroke={c} strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <rect x="6" y="17" width="4.5" height="8" rx="2.2" fill={c}/>
      <rect x="21.5" y="17" width="4.5" height="8" rx="2.2" fill={c}/>
    </svg>
  ),
  pencil: (c="#6A8494", s=20) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <rect x="7" y="9" width="18" height="14" rx="3" fill={c} opacity="0.18"/>
      <path d="M11 14h10M11 18h7" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  words: (c="#8A72A0", s=20) => (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <rect x="6" y="7" width="20" height="18" rx="3.5" fill={c} opacity="0.18"/>
      <path d="M11 13h10M11 17h6" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="21" cy="19" r="2.2" fill={c}/>
    </svg>
  ),
};

// 외부 연결 주소 (필요 시 여기만 수정)
const LINK_BOOKTUBE = "https://mybooktube.vercel.app";
const LINK_AR = "https://login.renaissance.com/15871dda-ed8c-46e9-afdf-2bfa5c306006?state=16f0c7f4-9f78-44e7-914b-d0d7cbca3a0c"; // 르네상스 AR 로그인 페이지

export default function App() {
  const [user, setUser] = useState(null);
  const [idIn, setIdIn] = useState("");
  const [pinIn, setPinIn] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("home"); // home | books | records
  const [books, setBooks] = useState([]);
  const [selBook, setSelBook] = useState(null);
  const [ytItems, setYtItems] = useState([]);
  const [ytLoading, setYtLoading] = useState(false);
  const [playing, setPlaying] = useState(null);

  // 로그인 복원
  useEffect(() => {
    try {
      const uid = localStorage.getItem("rion-uid");
      const upin = localStorage.getItem("rion-upin");
      const unm = localStorage.getItem("rion-uname");
      if (uid && upin && unm) {
        setUser({ id: uid, pin: upin, name: unm });
        refreshUser(uid, upin);
      }
    } catch (e) {}
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const r = await fetch("/api/data?action=books");
      const j = await r.json();
      setBooks(j.books || []);
    } catch (e) {}
  };

  const refreshUser = async (id, pin) => {
    try {
      const r = await fetch(`/api/data?action=login&id=${encodeURIComponent(id)}&pin=${encodeURIComponent(pin)}`);
      if (r.ok) { const j = await r.json(); setUser({ id: j.id, pin, name: j.name, records: j.records || [] }); }
    } catch (e) {}
  };

  const doLogin = async () => {
    const id = idIn.trim(), pin = pinIn.trim();
    if (!id || !pin) return;
    setLoginErr(""); setLoading(true);
    try {
      const r = await fetch(`/api/data?action=login&id=${encodeURIComponent(id)}&pin=${encodeURIComponent(pin)}`);
      if (r.status === 404) { setLoginErr("아이디를 찾을 수 없어요."); return; }
      if (r.status === 401) { setLoginErr("비밀번호가 올바르지 않아요."); return; }
      const j = await r.json();
      if (j.error) throw new Error(j.error);
      localStorage.setItem("rion-uid", j.id);
      localStorage.setItem("rion-upin", pin);
      localStorage.setItem("rion-uname", j.name);
      setUser({ id: j.id, pin, name: j.name, records: j.records || [] });
      setIdIn(""); setPinIn("");
    } catch (e) { setLoginErr("로그인 실패. 잠시 후 다시 시도해주세요."); }
    finally { setLoading(false); }
  };

  const doLogout = () => {
    ["rion-uid","rion-upin","rion-uname"].forEach(k=>localStorage.removeItem(k));
    setUser(null); setView("home");
  };

  const openBook = async (b) => {
    setSelBook(b); setView("books"); setYtLoading(true); setYtItems([]);
    try {
      const q = b.query || b.name;
      const r = await fetch("/api/youtube?q=" + encodeURIComponent(q));
      const j = await r.json();
      setYtItems(j.items || []);
    } catch (e) {} finally { setYtLoading(false); }
  };

  // ===== 로그인 화면 =====
  if (!user) {
    return (
      <div style={{ fontFamily:FF, background:C.bg, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:20 }}>
        <div style={{ marginBottom:16 }}><Logo size={80} radius={22} /></div>
        <div style={{ fontSize:24, fontWeight:900, color:C.text, letterSpacing:"-0.5px" }}>잉글루틴</div>
        <div style={{ fontSize:12.5, color:C.textMuted, marginTop:4, marginBottom:24 }}>매일의 영어 습관 · 로그인하세요</div>
        <div style={{ width:"100%", maxWidth:320, background:C.paper, borderRadius:16, padding:20, border:`1.5px solid ${C.border}`, boxShadow:"0 4px 16px rgba(94,112,73,0.08)" }}>
          <input value={idIn} onChange={(e)=>setIdIn(e.target.value)} placeholder="아이디 (예: r1234)"
            style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:15, outline:"none", fontFamily:FF, marginBottom:8, boxSizing:"border-box" }} />
          <input value={pinIn} onChange={(e)=>setPinIn(e.target.value.replace(/\D/g,"").slice(0,4))} type="password" inputMode="numeric" placeholder="비밀번호 4자리"
            onKeyDown={(e)=>e.key==="Enter"&&doLogin()}
            style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:15, outline:"none", fontFamily:FF, marginBottom:12, boxSizing:"border-box", textAlign:"center", letterSpacing:"6px" }} />
          <button onClick={doLogin} disabled={loading}
            style={{ width:"100%", padding:"13px", background:C.sageDark, color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:FF }}>
            {loading ? "확인 중…" : "로그인"}
          </button>
          {loginErr && <div style={{ fontSize:12, color:C.warn, marginTop:10, textAlign:"center" }}>{loginErr}</div>}
          {!loginErr && <div style={{ fontSize:11, color:C.textMuted, marginTop:12, textAlign:"center", lineHeight:1.6 }}>선생님께 받은 아이디와 비밀번호로<br/>로그인하세요 <span style={{ display:"inline-flex", verticalAlign:"middle" }}>{Ic.ring(C.sageDark, 13)}</span></div>}
        </div>
      </div>
    );
  }

  // ===== 영상 재생 =====
  if (playing) {
    return (
      <div style={{ position:"fixed", inset:0, background:"#252B23", zIndex:100, display:"flex", flexDirection:"column", fontFamily:FF }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:C.sageDeep }}>
          <button onClick={()=>setPlaying(null)} style={{ padding:"9px 16px", background:"rgba(255,255,255,0.15)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:FF }}>← 목록</button>
          <div style={{ flex:1, color:"#fff", fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }} dangerouslySetInnerHTML={{ __html: playing.title }} />
        </div>
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 12px 20px" }}>
          <div style={{ width:"100%", maxWidth:1000, aspectRatio:"16/9" }}>
            <iframe src={`https://www.youtube.com/embed/${playing.id}?autoplay=1&rel=0`} title={playing.title}
              style={{ width:"100%", height:"100%", border:"none", borderRadius:14 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      </div>
    );
  }

  const Header = () => (
    <div style={{ background:`linear-gradient(160deg, #FFB199, #FF7A5C)`, padding:"16px 20px" }}>
      <div style={{ maxWidth:720, margin:"0 auto", display:"flex", alignItems:"center", gap:11 }}>
        <Logo size={40} radius={11} />
        <div>
          <div style={{ fontSize:18, fontWeight:900, color:"#5A2E1F", letterSpacing:"-0.3px" }}>잉글루틴</div>
          <div style={{ fontSize:11, color:"rgba(90,46,31,0.75)" }}>👤 {user.name}님</div>
        </div>
        <button onClick={doLogout} style={{ marginLeft:"auto", padding:"7px 13px", background:"rgba(255,255,255,0.55)", color:"#5A2E1F", border:"none", borderRadius:20, fontSize:11.5, fontWeight:700, cursor:"pointer", fontFamily:FF }}>로그아웃</button>
      </div>
    </div>
  );

  // ===== 교재학습 화면 =====
  // ===== 북퀴즈 화면 (iframe) =====
  if (view === "quiz") {
    return (
      <div style={{ fontFamily:FF, background:C.bg, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <div style={{ background:`linear-gradient(160deg, #FFB199, #FF7A5C)`, padding:"10px 16px", display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={()=>setView("home")}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", background:"rgba(255,255,255,0.55)", color:"#5A2E1F", border:"none", borderRadius:20, fontSize:12.5, fontWeight:700, cursor:"pointer", fontFamily:FF }}>
            {Ic.book("#5A2E1F", 15)} 홈으로
          </button>
          <div style={{ fontSize:13.5, fontWeight:800, color:"#5A2E1F" }}>📝 북퀴즈</div>
          <a href={LINK_AR} target="_blank" rel="noopener noreferrer"
            style={{ marginLeft:"auto", fontSize:11.5, color:"#5A2E1F", textDecoration:"underline", opacity:0.85 }}>
            새 창에서 열기 ↗
          </a>
        </div>
        <div style={{ flex:1, position:"relative" }}>
          <iframe
            src={LINK_AR}
            title="북퀴즈 - 르네상스 AR"
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }}
          />
        </div>
      </div>
    );
  }

  if (view === "books") {
    return (
      <div style={{ fontFamily:FF, background:C.bg, minHeight:"100vh" }}>
        <Header />
        <div style={{ maxWidth:720, margin:"0 auto", padding:"18px 20px 40px" }}>
          <button onClick={()=>{ setView("home"); setSelBook(null); setYtItems([]); }} style={{ background:"none", border:"none", color:C.sageDeep, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:FF, marginBottom:14, padding:0 }}>← 학습 메인으로</button>

          {!selBook ? (
            <div>
              <div style={{ fontSize:17, fontWeight:900, color:C.text, marginBottom:4, display:"flex", alignItems:"center", gap:7 }}>{Ic.study(C.sageDark, 24)} 교재학습</div>
              <div style={{ fontSize:12.5, color:C.textMid, marginBottom:16 }}>학습할 교재를 선택하면 듣기 음원을 찾아드려요.</div>
              {books.length === 0 ? (
                <div style={{ textAlign:"center", padding:"50px 20px", color:C.textMuted, fontSize:13, background:C.paper, borderRadius:14, border:`1.5px dashed ${C.borderStrong}` }}>
                  아직 등록된 교재가 없어요.<br/>선생님이 교재를 등록하면 여기에 표시돼요.
                </div>
              ) : (
                <div style={{ display:"grid", gap:10 }}>
                  {books.map((b,i)=>(
                    <button key={i} onClick={()=>openBook(b)}
                      style={{ display:"flex", alignItems:"center", gap:12, background:C.paper, border:`1.5px solid ${C.border}`, borderLeft:`6px solid ${[C.sage,C.gold,C.coral,C.blue,C.sageLight][i%5]}`, borderRadius:12, padding:"14px 16px", cursor:"pointer", fontFamily:FF, textAlign:"left", boxShadow:"2px 3px 0 rgba(255,122,92,0.1)" }}>
                      <span style={{ fontSize:22 }}>📖</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{b.name}</div>
                        {b.desc && <div style={{ fontSize:11, color:C.textMuted, marginTop:2 }}>{b.desc}</div>}
                      </div>
                      <span style={{ color:C.sageDark, fontSize:16 }}>▶</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize:16, fontWeight:900, color:C.text, marginBottom:3 }}>📖 {selBook.name}</div>
              <div style={{ fontSize:12, color:C.textMid, marginBottom:16 }}>듣기 음원이에요. 영상을 눌러 재생하세요.</div>
              {ytLoading ? (
                <div style={{ textAlign:"center", padding:"50px 20px", color:C.textMid, fontSize:14 }}><div style={{ fontSize:34, marginBottom:8 }}>🎧</div>음원을 찾는 중…</div>
              ) : ytItems.length === 0 ? (
                <div style={{ textAlign:"center", padding:"40px 20px", color:C.textMuted, fontSize:13 }}>음원을 찾지 못했어요. 다른 교재를 선택해보세요.</div>
              ) : (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:14 }}>
                  {ytItems.map((v)=>(
                    <div key={v.id} onClick={()=>setPlaying(v)} style={{ background:C.paper, borderRadius:12, overflow:"hidden", border:`1px solid ${C.border}`, cursor:"pointer", boxShadow:"2px 3px 0 rgba(255,122,92,0.12)" }}>
                      <div style={{ position:"relative", aspectRatio:"16/9", background:C.bg }}>
                        {v.thumb && <img src={v.thumb} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />}
                        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(74,85,68,0.55)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:18, paddingLeft:3 }}>▶</div>
                        </div>
                      </div>
                      <div style={{ padding:"9px 11px" }}>
                        <div style={{ fontSize:12.5, fontWeight:700, color:C.text, lineHeight:1.4, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }} dangerouslySetInnerHTML={{ __html: v.title }} />
                        <div style={{ fontSize:10.5, color:C.textMuted, marginTop:3 }}>{v.channel}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===== 내 학습 기록 화면 =====
  if (view === "records") {
    const recs = user.records || [];
    return (
      <div style={{ fontFamily:FF, background:C.bg, minHeight:"100vh" }}>
        <Header />
        <div style={{ maxWidth:720, margin:"0 auto", padding:"18px 20px 40px" }}>
          <button onClick={()=>setView("home")} style={{ background:"none", border:"none", color:C.sageDeep, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:FF, marginBottom:14, padding:0 }}>← 학습 메인으로</button>
          <div style={{ fontSize:17, fontWeight:900, color:C.text, marginBottom:4, display:"flex", alignItems:"center", gap:7 }}>{Ic.chart(C.sageDark, 24)} 내 학습 기록</div>
          <div style={{ fontSize:12.5, color:C.textMid, marginBottom:16 }}>선생님이 확인해주신 나의 학습 현황이에요.</div>
          {(()=>{
            const now=new Date(); const pre=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0");
            const mo=recs.filter(r=>(r.date||"").startsWith(pre));
            const rC=mo.filter(r=>r.reading).length, wC=mo.filter(r=>r.writing).length, lC=mo.filter(r=>r.listening).length;
            return (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
                <div style={{ background:C.paper, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"14px 8px", textAlign:"center" }}>
                  <div style={{ display:"flex", justifyContent:"center", marginBottom:4 }}>{Ic.reading(C.sageDeep, 26)}</div>
                  <div style={{ fontSize:19, fontWeight:900, color:C.sageDeep }}>{rC}</div>
                  <div style={{ fontSize:10.5, color:C.textMuted }}>이번달 낭독</div>
                </div>
                <div style={{ background:C.paper, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"14px 8px", textAlign:"center" }}>
                  <div style={{ display:"flex", justifyContent:"center", marginBottom:4 }}>{Ic.writing("#B08842", 26)}</div>
                  <div style={{ fontSize:19, fontWeight:900, color:"#B08842" }}>{wC}</div>
                  <div style={{ fontSize:10.5, color:C.textMuted }}>이번달 쓰기</div>
                </div>
                <div style={{ background:C.paper, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"14px 8px", textAlign:"center" }}>
                  <div style={{ display:"flex", justifyContent:"center", marginBottom:4 }}>{Ic.headphone(C.coral, 26)}</div>
                  <div style={{ fontSize:19, fontWeight:900, color:C.coral }}>{lC}</div>
                  <div style={{ fontSize:10.5, color:C.textMuted }}>이번달 듣기</div>
                </div>
              </div>
            );
          })()}
          {/* 요일별 수행 현황 (최근 28일) */}
          {(()=>{
            const dateSet = {};
            recs.forEach((r) => { if (r.date) dateSet[r.date] = (dateSet[r.date] || 0) + (r.reading?1:0) + (r.writing?1:0) + (r.listening?1:0); });
            const days = [];
            const today = new Date();
            for (let i = 27; i >= 0; i--) {
              const d = new Date(); d.setDate(today.getDate() - i);
              const key = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
              days.push({ key, date: d, count: dateSet[key] || 0 });
            }
            const weekLabel = ["일","월","화","수","목","금","토"];
            const colorFor = (c) => c === 0 ? C.bg : c === 1 ? "#D8E4CC" : c === 2 ? "#AFC79B" : C.sageDeep;
            return (
              <div style={{ background:C.paper, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"14px 16px", marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:800, color:C.text, marginBottom:3 }}>📅 최근 4주 수행 현황</div>
                <div style={{ fontSize:11, color:C.textMuted, marginBottom:10 }}>진할수록 그날 활동을 많이 했어요. 빈 칸은 활동이 없던 날이에요.</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:4, marginBottom:6 }}>
                  {weekLabel.map((w) => (
                    <div key={w} style={{ textAlign:"center", fontSize:9.5, color:C.textMuted, fontWeight:700 }}>{w}</div>
                  ))}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:4 }}>
                  {days.map((d) => (
                    <div key={d.key} title={`${d.key} · 활동 ${d.count}개`}
                      style={{ aspectRatio:"1", borderRadius:6, background:colorFor(d.count), border:`1px solid ${d.count===0 ? C.border : "transparent"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:d.count>=3?"#fff":C.textMuted }}>
                      {d.date.getDate()}
                    </div>
                  ))}
                </div>
                {(() => {
                  const activeDays = days.filter((d) => d.count > 0).length;
                  const rate = Math.round((activeDays / 28) * 100);
                  return (
                    <div style={{ fontSize:11.5, color:C.textMid, marginTop:10, textAlign:"center" }}>
                      최근 28일 중 <b style={{ color:C.sageDeep }}>{activeDays}일</b> 활동 · 수행률 <b style={{ color:C.sageDeep }}>{rate}%</b>
                    </div>
                  );
                })()}
              </div>
            );
          })()}
          {recs.length === 0 ? (
            <div style={{ textAlign:"center", padding:"50px 20px", color:C.textMuted, fontSize:13, background:C.paper, borderRadius:14, border:`1.5px dashed ${C.borderStrong}` }}>아직 기록이 없어요.<br/>선생님이 결과를 입력하면 여기에 표시돼요.</div>
          ) : (
            <div style={{ display:"grid", gap:10 }}>
              {recs.map((r,i)=>(
                <div key={i} style={{ background:C.paper, border:`1px solid ${C.border}`, borderRadius:12, padding:"13px 15px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <span style={{ fontSize:13.5, fontWeight:700, color:C.text }}>{r.book || "학습"}</span>
                    <span style={{ fontSize:11, color:C.textMuted }}>{r.date}</span>
                  </div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {r.reading && <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11.5, padding:"4px 9px 4px 6px", borderRadius:8, background:"#EDF2E4", color:C.sageDeep, fontWeight:700 }}>{Ic.reading(C.sageDeep,15)} 낭독</span>}
                    {r.writing && <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11.5, padding:"4px 9px 4px 6px", borderRadius:8, background:"#F5F0E0", color:"#B08842", fontWeight:700 }}>{Ic.writing("#B08842",15)} 쓰기</span>}
                    {r.listening && <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11.5, padding:"4px 9px 4px 6px", borderRadius:8, background:"#F3EDE8", color:C.coral, fontWeight:700 }}>{Ic.headphone(C.coral,15)} 듣기</span>}
                    {r.hwScore && <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11.5, padding:"4px 9px 4px 6px", borderRadius:8, background:"#EAF0F2", color:"#6A8494", fontWeight:700 }}>{Ic.pencil("#6A8494",15)} 숙제 {r.hwScore}</span>}
                    {r.wordScore && <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11.5, padding:"4px 9px 4px 6px", borderRadius:8, background:"#EFEAF2", color:"#8A72A0", fontWeight:700 }}>{Ic.words("#8A72A0",15)} 단어 {r.wordScore}</span>}
                  </div>
                  {r.memo && <div style={{ fontSize:11.5, color:C.textMid, marginTop:8 }}>💬 {r.memo}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===== 학습 메인(홈) =====
  const recentRec = (user.records || [])[0];
  return (
    <div style={{ fontFamily:FF, background:C.bg, minHeight:"100vh" }}>
      <Header />
      <div style={{ maxWidth:720, margin:"0 auto", padding:"20px 20px 40px" }}>
        <div style={{ fontSize:15, fontWeight:900, color:C.text, marginBottom:3, display:"flex", alignItems:"center", gap:6 }}>안녕하세요, {user.name}님 {Ic.ring(C.sageDark, 15)}</div>
        <div style={{ fontSize:12.5, color:C.textMid, marginBottom:18 }}>오늘도 신나게 영어 공부해요!</div>

        {/* 학습 메뉴 3개 */}
        <div style={{ display:"grid", gap:12, marginBottom:18 }}>
          <a href={`${LINK_BOOKTUBE}?uid=${encodeURIComponent(user.id)}&upin=${encodeURIComponent(user.pin)}`} target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", gap:14, background:C.paper, border:`1.5px solid ${C.border}`, borderLeft:`7px solid ${C.sage}`, borderRadius:14, padding:"18px 18px", textDecoration:"none", boxShadow:"2px 3px 0 rgba(255,122,92,0.12)" }}>
            {Ic.book(C.sage, 34)}
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:800, color:C.text }}>집중듣기</div>
              <div style={{ fontSize:11.5, color:C.textMuted, marginTop:2 }}>북튜브에서 원서 낭독·흘려듣기</div>
            </div>
            <span style={{ color:C.sageDark, fontSize:18 }}>↗</span>
          </a>

          <button onClick={()=>setView("quiz")}
            style={{ display:"flex", alignItems:"center", gap:14, background:C.paper, border:`1.5px solid ${C.border}`, borderLeft:`7px solid ${C.gold}`, borderRadius:14, padding:"18px 18px", cursor:"pointer", fontFamily:FF, textAlign:"left", width:"100%", boxShadow:"2px 3px 0 rgba(255,122,92,0.12)" }}>
            {Ic.quiz(C.gold, 34)}
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:800, color:C.text }}>북퀴즈</div>
              <div style={{ fontSize:11.5, color:C.textMuted, marginTop:2 }}>르네상스 AR 퀴즈 풀기</div>
            </div>
            <span style={{ color:C.sageDark, fontSize:18 }}>→</span>
          </button>

          <button onClick={()=>setView("books")}
            style={{ display:"flex", alignItems:"center", gap:14, background:C.paper, border:`1.5px solid ${C.border}`, borderLeft:`7px solid ${C.coral}`, borderRadius:14, padding:"18px 18px", cursor:"pointer", fontFamily:FF, textAlign:"left", boxShadow:"2px 3px 0 rgba(255,122,92,0.12)" }}>
            {Ic.study(C.coral, 34)}
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:800, color:C.text }}>교재학습</div>
              <div style={{ fontSize:11.5, color:C.textMuted, marginTop:2 }}>교재 선택하고 듣기 음원 재생</div>
            </div>
            <span style={{ color:C.sageDark, fontSize:18 }}>→</span>
          </button>
        </div>

        {/* 내 학습 기록 요약 */}
        <button onClick={()=>setView("records")}
          style={{ width:"100%", background:C.paper, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"15px 18px", cursor:"pointer", fontFamily:FF, textAlign:"left", boxShadow:"2px 3px 0 rgba(255,122,92,0.1)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:recentRec?8:0 }}>
            <span style={{ fontSize:14, fontWeight:800, color:C.text, display:"flex", alignItems:"center", gap:6 }}>{Ic.chart(C.sageDark, 20)} 내 학습 기록</span>
            <span style={{ fontSize:12, color:C.sageDark, fontWeight:700 }}>전체 보기 →</span>
          </div>
          {recentRec ? (
            <div style={{ fontSize:11.5, color:C.textMid }}>
              최근: {recentRec.book || "학습"} · {recentRec.hwScore && `숙제 ${recentRec.hwScore} `}{recentRec.wordScore && `· 단어 ${recentRec.wordScore}`} <span style={{ color:C.textMuted }}>({recentRec.date})</span>
            </div>
          ) : (
            <div style={{ fontSize:11.5, color:C.textMuted }}>아직 기록이 없어요. 선생님이 결과를 입력하면 여기 표시돼요.</div>
          )}
        </button>
      </div>
    </div>
  );
}
