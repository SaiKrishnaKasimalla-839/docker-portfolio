import { useState, useEffect, useRef, useCallback } from "react";

const TEAL = "#00d4aa";

const useWindowSize = () => {
  const [size, setSize] = useState({ w: typeof window !== "undefined" ? window.innerWidth : 1200 });
  useEffect(() => {
    const fn = () => setSize({ w: window.innerWidth });
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return size;
};

const NAV_ITEMS = ["home","about","education","skills","projects","certifications","contact"];

const SKILLS = [
  { name:"Java", level:92, color:"#f89820" },
  { name:"Spring Boot", level:88, color:"#6db33f" },
  { name:"React.js", level:85, color:"#61dafb" },
  { name:"REST APIs", level:90, color:"#00d4aa" },
  { name:"JavaScript", level:82, color:"#e9c920" },
  { name:"Hibernate JPA", level:82, color:"#00d4aa" },
  { name:"AWS", level:80, color:"#ff9900" },
  { name:"Azure", level:78, color:"#0089d6" },
  { name:"SQL / NoSQL", level:82, color:"#e95420" },
  { name:"DevOps / CI-CD", level:80, color:"#6db33f" },
  { name:"GitHub", level:82, color:"#c8d3f5" },
  { name:"Docker", level:72, color:"#2496ed" },
];

const TECH = [
  {ic:"☕",n:"Java",s:"Core + OOP"},
  {ic:"🌱",n:"Spring",s:"Boot · MVC · JPA"},
  {ic:"⚛️",n:"React",s:"Hooks · State"},
  {ic:"☁️",n:"AWS",s:"EC2 · S3 · Lambda"},
  {ic:"🔷",n:"Azure",s:"Cloud Services"},
  {ic:"🐳",n:"Docker",s:"Containers"},
  {ic:"🗄️",n:"SQL/NoSQL",s:"MySQL · MongoDB"},
  {ic:"🔗",n:"REST APIs",s:"Design · Docs"},
  {ic:"⚙️",n:"CI/CD",s:"GitHub Actions"},
];

const PROJECTS = [
  {
    icon:"🏦", color:"#f89820",
    title:"Vault — Full Stack Banking App",
    desc:"Full-stack banking platform with React.js frontend, Spring Boot REST API backend, and MySQL. Built with account management, transaction history, and fund transfers.",
    tags:["Java","Spring Boot","Hibernate JPA","React","Azure","MySQL"],
    github:"https://github.com/SaiKrishnaKasimalla-839",
  },
  {
    icon:"🤖", color:"#00d4aa",
    title:"NeuralOps — AI Agent Orchestration",
    desc:"AI agent management portal deployed to Azure. React frontend + Spring Boot Core API with real-time task queuing, monitoring dashboards, and performance analytics.",
    tags:["Java","Spring Boot","React.js","MySQL","Azure Static Web Apps"],
    github:"https://github.com/SaiKrishnaKasimalla-839",
  },
  {
    icon:"🖥️", color:"#0089d6",
    title:"Virtual Classroom — LLM Integrated",
    desc:"LLM-powered classroom system using Spring AI + Ollama DeepSeek and MongoDB. Smart note generation, automated grading assistance, and real-time collaboration.",
    tags:["Java","Spring AI","Ollama","MongoDB","React.js"],
    github:"https://github.com/SaiKrishnaKasimalla-839",
  },
  {
    icon:"🔐", color:"#a78bfa",
    title:"Blockchain Product Verification",
    desc:"Final year capstone project — served as Team Lead managing 3 members end-to-end. Delivered a blockchain-based product authenticity system with immutable audit trails, QR-based lookup, and decentralized trust layer.",
    tags:["Blockchain","Java","React","Solidity","Web3","Team Lead"],
    github:"https://github.com/SaiKrishnaKasimalla-839",
    highlight:"👑 Team Lead · 4 Members",
  },
];

const CERTS = [
  {
    icon:"☁️", color:"#f89820",
    bg:"rgba(248,152,32,0.07)", border:"rgba(248,152,32,0.3)",
    title:"AWS Certified Cloud Practitioner",
    issuer:"Amazon Web Services",
    year:"2024", badge:"CLF-C02",
    desc:"Cloud architecture, EC2, S3, Lambda, IAM, VPC, RDS — validated cloud fundamentals.",
  },
  {
    icon:"☕", color:"#6db33f",
    bg:"rgba(109,179,63,0.07)", border:"rgba(109,179,63,0.3)",
    title:"IT Specialist — Java",
    issuer:"Pearson VUE",
    year:"2023", badge:"Pearson",
    desc:"OOP principles, data structures, algorithms, and software design patterns — Java validated.",
  },
];

const HOBBIES = [
  { ic:"💻", label:"Solving LeetCode & DSA Problems" },
  { ic:"🤖", label:"Exploring AI & Automation Tools" },
  { ic:"🎙️", label:"Watching Tech Conferences & Podcasts" },
  { ic:"🛠️", label:"Creating Personal Tech Projects" },
  { ic:"🌐", label:"Open Source Contributions" },
  { ic:"🧩", label:"Competitive Problem Solving" },
];

const LANGS = [
  { name:"Telugu", level:"Native", pct:100, color:"#f89820" },
  { name:"English", level:"Fluent", pct:88, color:"#00d4aa" },
  { name:"Hindi", level:"Conversational", pct:65, color:"#61dafb" },
];

/* ── Particles ── */
function ParticleCanvas({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const c = ref.current;
    const ctx = c.getContext("2d");
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.6 + .4, a: Math.random(),
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        pts.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,170,${(1 - d / 110) * .15})`;
            ctx.lineWidth = .6;
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,170,${.4 + p.a * .5})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [active]);
  if (!active) return null;
  return <canvas ref={ref} style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:.45,pointerEvents:"none" }} />;
}

/* ── Skill bar ── */
function SkillBar({ name, level, color, idx, visible }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <span style={{ fontSize:12, color:"#c8d3f5", letterSpacing:".04em" }}>{name}</span>
        <span style={{ fontSize:11, color }}>{level}%</span>
      </div>
      <div style={{ height:5, background:"rgba(255,255,255,.06)", borderRadius:3, overflow:"hidden" }}>
        <div style={{
          height:"100%",
          width: visible ? level + "%" : "0%",
          background: `linear-gradient(90deg,${color}77,${color})`,
          borderRadius:3,
          transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${idx * .07}s`,
          boxShadow: `0 0 8px ${color}55`,
        }} />
      </div>
    </div>
  );
}

/* ── Project card ── */
function ProjectCard({ icon, color, title, desc, tags, github, highlight }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.08)",
        borderRadius:14, padding:"24px", position:"relative", overflow:"hidden",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov ? `0 16px 50px rgba(0,212,170,.12)` : "none",
        transition:"transform .3s,box-shadow .3s",
      }}
    >
      <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${color},transparent)` }} />
      {highlight && (
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginBottom:10, fontSize:10, color:"#a78bfa", background:"rgba(167,139,250,.12)", border:"1px solid rgba(167,139,250,.3)", borderRadius:4, padding:"3px 10px", letterSpacing:".05em" }}>
          {highlight}
        </div>
      )}
      <div style={{ fontSize:32, marginBottom:12 }}>{icon}</div>
      <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(15px,2vw,18px)", fontWeight:700, color:"#e8f0ff", marginBottom:8, lineHeight:1.3 }}>{title}</h3>
      <p style={{ fontSize:"clamp(12px,1.5vw,13px)", color:"#8892b0", lineHeight:1.75, marginBottom:16 }}>{desc}</p>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
        {tags.map(t => (
          <span key={t} style={{ fontSize:10, padding:"3px 9px", borderRadius:3, background:`${color}15`, border:`1px solid ${color}44`, color }}>{t}</span>
        ))}
      </div>
      <a href={github} target="_blank" rel="noreferrer"
        style={{ fontSize:11, color:TEAL, letterSpacing:".06em", textDecoration:"none", borderBottom:`1px solid ${TEAL}33` }}>
        View on GitHub →
      </a>
    </div>
  );
}

/* ── Cert card ── */
function CertCard({ icon, color, bg, border, title, issuer, year, badge, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: bg, border: `1px solid ${border}`,
        borderRadius:14, padding:"24px", position:"relative", overflow:"hidden",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov ? `0 16px 50px ${color}1a` : "none",
        transition:"transform .3s,box-shadow .3s",
      }}
    >
      <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${color},transparent)` }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div style={{ fontSize:38 }}>{icon}</div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5 }}>
          <span style={{ fontSize:9, color, background:`${color}18`, border:`1px solid ${color}44`, borderRadius:3, padding:"2px 9px", letterSpacing:".08em" }}>{badge}</span>
          <span style={{ fontSize:11, color:"#8892b0" }}>{year}</span>
        </div>
      </div>
      <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(15px,2vw,18px)", fontWeight:800, color:"#e8f0ff", marginBottom:5, lineHeight:1.3 }}>{title}</h3>
      <div style={{ fontSize:12, color, marginBottom:10, letterSpacing:".04em" }}>{issuer}</div>
      <p style={{ fontSize:"clamp(12px,1.5vw,13px)", color:"#8892b0", lineHeight:1.75 }}>{desc}</p>
    </div>
  );
}

/* ── Plain section heading (same style as "Languages") ── */
function PH({ children, mb = 28 }) {
  return (
    <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, color:"#e8f0ff", marginBottom:mb }}>
      {children}
    </h3>
  );
}

/* ══════════════════════════════════ MAIN APP ══════════════════════════════════ */
export default function Portfolio() {
  const { w } = useWindowSize();
  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;
  const isDesktop = w >= 1024;
  const showBadges = !isMobile;

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [glitchName, setGlitchName] = useState("KRISHNA");
  const [mousePos, setMousePos] = useState({ x: -300, y: -300 });
  const skillsRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    const fn = e => setMousePos({ x: e.clientX - 250, y: e.clientY - 250 });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [isMobile]);

  useEffect(() => {
    const type = (setter, text, delay) => {
      let i = 0;
      const t = setTimeout(() => {
        const iv = setInterval(() => {
          setter(text.slice(0, ++i) + "▋");
          if (i >= text.length) { clearInterval(iv); setter(text); }
        }, 40);
      }, delay);
      return t;
    };
    const a = type(setT1, "sai@open-to-work:~", 800);
    const b = type(setT2, "Java · Spring · React · AWS · Azure", 2400);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  useEffect(() => {
    const GC = "!<>-_\\/[]{}—=+*^?#@$%&";
    const src = "KRISHNA";
    const glitch = () => {
      let it = 0;
      const iv = setInterval(() => {
        setGlitchName(src.split("").map((c, i) => i < it ? src[i] : GC[Math.floor(Math.random() * GC.length)]).join(""));
        if ((it += .5) >= src.length) { clearInterval(iv); setGlitchName(src); }
      }, 30);
    };
    const interval = setInterval(glitch, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: .15 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fn = () => {
      for (const id of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActiveNav(id); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  }, []);

  const syne = { fontFamily:"'Syne',sans-serif" };

  return (
    <div style={{ minHeight:"100vh", background:"#070b14", color:"#c8d3f5", fontFamily:"'JetBrains Mono',monospace", overflowX:"hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { overflow-x:hidden; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#070b14; }
        ::-webkit-scrollbar-thumb { background:#00d4aa33; border-radius:2px; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scan  { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 14px #00d4aa22} 50%{box-shadow:0 0 30px #00d4aa66} }
        @keyframes blinkRing { 0%,100%{border-color:#00d4aa33} 50%{border-color:#00d4aaaa} }

        .hu { animation:fadeUp .6s ease both; }
        .float-a { animation:floatA 3.2s ease-in-out infinite; }
        .float-b { animation:floatB 3.8s ease-in-out infinite; }
        .pulse-dot { animation:pulseGlow 2s infinite; }
        .avatar-ring { animation:blinkRing 2.5s infinite; }
        .tag-pill:hover { background:rgba(0,212,170,.2) !important; }

        .nli { position:relative; cursor:pointer; transition:color .2s; }
        .nli::after { content:''; position:absolute; bottom:-3px; left:0; right:0; height:1.5px; background:#00d4aa; transform:scaleX(0); transition:transform .2s; transform-origin:left; }
        .nli:hover::after, .nli.active::after { transform:scaleX(1); }

        .mob-menu { position:fixed; inset:0; top:60px; background:rgba(7,11,20,.97); backdrop-filter:blur(20px); z-index:99; display:flex; flex-direction:column; padding:32px 24px; gap:4px; }
        .mob-item { padding:14px 0; font-size:14px; letter-spacing:.12em; text-transform:uppercase; color:#8892b0; cursor:pointer; border-bottom:1px solid rgba(255,255,255,.05); transition:color .2s; }
        .mob-item:hover, .mob-item.active { color:#00d4aa; }

        .btn-primary { background:linear-gradient(135deg,#00d4aa,#0089d6); border:none; color:#070b14; font-family:'JetBrains Mono',monospace; font-weight:700; font-size:12px; padding:12px 24px; border-radius:7px; cursor:pointer; letter-spacing:.07em; transition:all .3s; }
        .btn-primary:hover { transform:scale(1.04); box-shadow:0 6px 24px rgba(0,212,170,.3); }
        .btn-ghost { background:transparent; border:1px solid rgba(0,212,170,.4); color:#00d4aa; font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; padding:12px 24px; border-radius:7px; cursor:pointer; letter-spacing:.07em; transition:all .3s; }
        .btn-ghost:hover { background:rgba(0,212,170,.1); }

        .c-inp { background:rgba(255,255,255,.04); border:1px solid rgba(0,212,170,.18); border-radius:7px; padding:11px 14px; color:#c8d3f5; font-family:'JetBrains Mono',monospace; font-size:12px; width:100%; transition:border-color .2s; outline:none; }
        .c-inp:focus { border-color:#00d4aa77; }
        .c-inp::placeholder { color:#374151; }

        .hobby-pill { background:rgba(0,212,170,.06); border:1px solid rgba(0,212,170,.14); border-radius:8px; padding:10px 14px; display:flex; align-items:center; gap:9px; font-size:11px; color:#8892b0; transition:all .2s; cursor:default; }
        .hobby-pill:hover { background:rgba(0,212,170,.13); color:#c8d3f5; transform:translateY(-2px); }

        .soc-link { display:flex; flex-direction:column; align-items:center; gap:3px; font-size:9px; color:#8892b0; text-decoration:none; transition:color .2s; letter-spacing:.05em; }
        .soc-link:hover { color:#00d4aa; }

        .sec-pad { padding:80px 5vw; }
        @media (min-width:768px) { .sec-pad { padding:110px 6vw; } }
        @media (min-width:1024px) { .sec-pad { padding:120px 7vw; } }
      `}</style>

      {/* Cursor glow */}
      {!isMobile && (
        <div style={{ position:"fixed", pointerEvents:"none", zIndex:0, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,212,170,.04) 0%,transparent 70%)", transition:"left .08s,top .08s", left:mousePos.x, top:mousePos.y }} />
      )}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,#00d4aa1a,transparent)", animation:"scan 7s linear infinite", zIndex:1, pointerEvents:"none" }} />
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(0,212,170,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,.025) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding: isMobile ? "0 20px" : "0 5vw", height:60, display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(7,11,20,.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(0,212,170,.09)" }}>
        <div style={{ ...syne, fontWeight:800, fontSize:17, color:TEAL }}>&lt;SK /&gt;</div>
        {!isMobile && (
          <div style={{ display:"flex", gap: isTablet ? 16 : 26 }}>
            {NAV_ITEMS.map(id => (
              <span key={id} className={`nli${activeNav === id ? " active" : ""}`} onClick={() => scrollTo(id)}
                style={{ fontSize: isTablet ? 10 : 11, letterSpacing:".09em", textTransform:"uppercase", color: activeNav === id ? TEAL : "#8892b0" }}>
                {id}
              </span>
            ))}
          </div>
        )}
        {isMobile && (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background:"none", border:"1px solid rgba(0,212,170,.3)", borderRadius:6, padding:"6px 10px", cursor:"pointer", color:TEAL, fontSize:16 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div className="mob-menu">
          {NAV_ITEMS.map(id => (
            <div key={id} className={`mob-item${activeNav === id ? " active" : ""}`} onClick={() => scrollTo(id)}>{id}</div>
          ))}
          <div style={{ marginTop:20, padding:"16px 0", borderTop:"1px solid rgba(0,212,170,.1)" }}>
            <div style={{ fontSize:11, color:"#4a5568", marginBottom:12 }}>Find me at</div>
            <div style={{ display:"flex", gap:16 }}>
              <a href="https://linkedin.com/in/sai-krishna-kasimalla-126b67252" target="_blank" rel="noreferrer" style={{ fontSize:12, color:TEAL, textDecoration:"none" }}>LinkedIn ↗</a>
              <a href="https://github.com/SaiKrishnaKasimalla-839" target="_blank" rel="noreferrer" style={{ fontSize:12, color:TEAL, textDecoration:"none" }}>GitHub ↗</a>
              <a href="https://leetcode.com/Sai_krishna-123" target="_blank" rel="noreferrer" style={{ fontSize:12, color:TEAL, textDecoration:"none" }}>LeetCode ↗</a>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding: isMobile ? "100px 20px 60px" : "140px 5vw 80px", position:"relative", overflow:"hidden" }}>
        <ParticleCanvas active={isDesktop} />

        {showBadges && (
          <>
            <div style={{ position:"absolute", right:isDesktop ? "2vw" : "4px", top:"50%", transform:"translateY(-50%)", zIndex:2, display:"flex", flexDirection:"column", gap:6 }}>
              {[
                {ic:"☁️",l:"AWS Certified",c:"#f89820",b:"rgba(248,152,32,.35)",cls:"float-a",d:"0s"},
                {ic:"⚛️",l:"React Dev",c:"#61dafb",b:"rgba(97,218,251,.3)",cls:"float-b",d:".4s"},
                {ic:"🌱",l:"Spring Boot",c:"#6db33f",b:"rgba(109,179,63,.35)",cls:"float-a",d:".8s"},
                {ic:"🔷",l:"Azure Cloud",c:"#0089d6",b:"rgba(0,137,214,.35)",cls:"float-b",d:"1.2s"},
              ].map(b => (
                <div key={b.l} className={b.cls} style={{ animationDelay:b.d }}>
                  <div style={{ background:"rgba(7,11,20,.88)", border:`1px solid ${b.b}`, borderRadius:10, padding: isDesktop ? "10px 12px" : "7px 9px", textAlign:"center", minWidth: isDesktop ? 100 : 76, backdropFilter:"blur(10px)" }}>
                    <div style={{ fontSize: isDesktop ? 20 : 16 }}>{b.ic}</div>
                    <div style={{ fontSize: isDesktop ? 9 : 8, color:b.c, marginTop:3, letterSpacing:".05em", fontWeight:700, whiteSpace:"nowrap" }}>{b.l}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ position:"absolute", left:isDesktop ? "2vw" : "4px", top:"50%", transform:"translateY(-50%)", zIndex:2, display:"flex", flexDirection:"column", gap:6 }}>
              {[
                {ic:"☕",l:"Java Focused",c:"#f89820",b:"rgba(248,152,32,.3)",cls:"float-b",d:"0s"},
                {ic:"🚀",l:"Open to Work",c:TEAL,b:"rgba(0,212,170,.3)",cls:"float-a",d:".6s"},
              ].map(b => (
                <div key={b.l} className={b.cls} style={{ animationDelay:b.d }}>
                  <div style={{ background:"rgba(7,11,20,.88)", border:`1px solid ${b.b}`, borderRadius:10, padding: isDesktop ? "10px 12px" : "7px 9px", textAlign:"center", minWidth: isDesktop ? 100 : 76, backdropFilter:"blur(10px)" }}>
                    <div style={{ fontSize: isDesktop ? 20 : 16 }}>{b.ic}</div>
                    <div style={{ fontSize: isDesktop ? 9 : 8, color:b.c, marginTop:3, letterSpacing:".05em", fontWeight:700, whiteSpace:"nowrap" }}>{b.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ position:"relative", zIndex:2, maxWidth:780, width:"100%", margin:"0 auto" }}>
          <div className="hu" style={{ animationDelay:".1s", marginBottom:16 }}>
            <span style={{ fontSize: isMobile ? 10 : 12, letterSpacing:".2em", color:TEAL, textTransform:"uppercase" }}>● Aspiring Software Engineer · Open to Opportunities</span>
          </div>
          <div className="hu" style={{ animationDelay:".2s", marginBottom:18 }}>
            <h1 style={{ ...syne, fontSize:"clamp(42px,10vw,96px)", fontWeight:800, lineHeight:1.05, color:"#e8f0ff", letterSpacing:"-.03em" }}>
              SAI<br /><span style={{ color:TEAL }}>{glitchName}</span>
            </h1>
          </div>
          <div className="hu" style={{ animationDelay:".35s", marginBottom:32, maxWidth:520 }}>
            <p style={{ fontSize: isMobile ? 14 : 15, lineHeight:1.85, color:"#8892b0" }}>
              Aspiring to build scalable systems with Java &amp; Spring Boot.<br />
              Looking to craft modern UIs with React.js.<br />
              Eager to deploy real-world apps on AWS &amp; Azure.
            </p>
          </div>
          <div className="hu" style={{ animationDelay:".48s", display:"flex", gap:12, flexWrap:"wrap", marginBottom: isMobile ? 40 : 56 }}>
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects →</button>
            <button className="btn-ghost" onClick={() => scrollTo("contact")}>Contact Me</button>
          </div>
          <div className="hu" style={{ animationDelay:".65s" }}>
            <div style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(0,212,170,.14)", borderRadius:10, padding: isMobile ? "16px 18px" : "18px 24px", maxWidth: isMobile ? "100%" : 430, backdropFilter:"blur(10px)" }}>
              <div style={{ display:"flex", gap:5, marginBottom:12 }}>
                <div style={{ width:9, height:9, borderRadius:"50%", background:"#ff5f57" }} />
                <div style={{ width:9, height:9, borderRadius:"50%", background:"#febc2e" }} />
                <div style={{ width:9, height:9, borderRadius:"50%", background:"#28c840" }} />
              </div>
              <div style={{ lineHeight:2 }}>
                <div style={{ color:"#4a5568", fontSize:11 }}>$ whoami</div>
                <div style={{ color:TEAL, fontSize: isMobile ? 11 : 13, wordBreak:"break-all" }}>{t1}</div>
                <div style={{ color:"#4a5568", fontSize:11, marginTop:4 }}>$ stack --list</div>
                <div style={{ color:"#61dafb", fontSize: isMobile ? 11 : 13 }}>{t2}</div>
              </div>
            </div>
          </div>
          {isMobile && (
            <div style={{ display:"flex", gap:16, marginTop:28, flexWrap:"wrap" }}>
              {[
                {ic:"💼",l:"LinkedIn",h:"https://linkedin.com/in/sai-krishna-kasimalla-126b67252"},
                {ic:"🐙",l:"GitHub",h:"https://github.com/SaiKrishnaKasimalla-839"},
                {ic:"🏆",l:"LeetCode",h:"https://leetcode.com/Sai_krishna-123"},
              ].map(({ ic, l, h }) => (
                <a key={l} href={h} target="_blank" rel="noreferrer" className="soc-link">
                  <span style={{ fontSize:18 }}>{ic}</span>{l}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="sec-pad">
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <PH mb={44}>About Me</PH>

          {/* Recruiter highlight banner */}
          <div style={{ background:"linear-gradient(135deg,rgba(0,212,170,.08),rgba(0,137,214,.08))", border:"1px solid rgba(0,212,170,.2)", borderRadius:12, padding:"16px 22px", marginBottom:44, display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
            <span style={{ fontSize:24 }}>🚀</span>
            <div>
              <div style={{ fontSize:13, color:"#e8f0ff", fontWeight:700, marginBottom:3 }}>Actively Seeking Full-Time Roles &amp; Internships</div>
              <div style={{ fontSize:12, color:"#8892b0", lineHeight:1.7 }}>Fresh 2025 CS Graduate · Java Full Stack · Cloud Enthusiast · Team Lead Experience · AWS Certified · Available Immediately</div>
            </div>
            <div style={{ marginLeft:"auto" }}>
              <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ fontSize:11, padding:"9px 18px" }}>Hire Me →</button>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: isDesktop ? 60 : 40, alignItems:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
              <div className="avatar-ring" style={{ width:170, height:170, borderRadius:"50%", border:"2px solid #00d4aa44", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", background:"radial-gradient(circle at 40% 35%,rgba(0,212,170,.1),rgba(7,11,20,.8))" }}>
                <div style={{ width:136, height:136, borderRadius:"50%", background:"linear-gradient(135deg,#00d4aa1a,#0089d61a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:54 }}>👨‍💻</div>
                <div style={{ position:"absolute", bottom:6, right:6, width:20, height:20, borderRadius:"50%", background:TEAL, border:"3px solid #070b14" }} />
              </div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
                {[["🎓","B.Tech CS"],["🏅","2× Certified"],["🌐","Hyderabad"],["👑","Team Lead"],["🚀","Seeking Role"]].map(([ic,lb]) => (
                  <div key={lb} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(0,212,170,.14)", borderRadius:7, padding:"7px 12px", textAlign:"center" }}>
                    <div style={{ fontSize:16 }}>{ic}</div>
                    <div style={{ fontSize:9, color:"#8892b0", marginTop:2, whiteSpace:"nowrap" }}>{lb}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <PH mb={18}>Who I Am</PH>
              <p style={{ fontSize:"clamp(13px,1.6vw,14px)", lineHeight:1.9, color:"#8892b0", marginBottom:16 }}>
                I'm a 2025 CS graduate aspiring to grow as a Full Stack Java Developer. Through 6 months of hands-on training at TechWing and several self-driven projects, I've built real-world apps using Java, Spring Boot, and React.js — and deployed them to Azure.
              </p>
              <p style={{ fontSize:"clamp(13px,1.6vw,14px)", lineHeight:1.9, color:"#8892b0", marginBottom:16 }}>
                In my final year, I served as <strong style={{ color:"#a78bfa" }}>Team Lead for a 4-member team</strong>, successfully delivering a Blockchain Product Verification system end-to-end — managing task delegation, timelines, code reviews, and stakeholder demos.
              </p>
              <p style={{ fontSize:"clamp(13px,1.6vw,14px)", lineHeight:1.9, color:"#8892b0", marginBottom:24 }}>
                I bring ownership, initiative, and a growth mindset to every project. Looking for a team where I can contribute meaningfully, ship real software, and grow fast.
              </p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {["AWS Cloud Practitioner","IT Specialist Java","Spring Boot","React.js","Team Lead","Open to Work"].map(t => (
                  <span key={t} className="tag-pill" style={{ fontSize:10, padding:"5px 11px", borderRadius:4, letterSpacing:".04em", background:"rgba(0,212,170,.08)", border:"1px solid rgba(0,212,170,.22)", color:TEAL, cursor:"default", transition:"all .2s" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* What I'm Into + Languages */}
          <div style={{ marginTop:64, display:"grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap:40 }}>
            <div>
              <PH mb={20}>What I'm Into</PH>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {HOBBIES.map(h => (
                  <div key={h.label} className="hobby-pill">
                    <span style={{ fontSize:18, flexShrink:0 }}>{h.ic}</span>
                    <span style={{ fontSize:12 }}>{h.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <PH mb={20}>Languages</PH>
              {LANGS.map(l => (
                <div key={l.name} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:13, color:"#c8d3f5" }}>{l.name}</span>
                    <span style={{ fontSize:11, color:l.color }}>{l.level}</span>
                  </div>
                  <div style={{ height:4, background:"rgba(255,255,255,.05)", borderRadius:2, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:l.pct+"%", background:`linear-gradient(90deg,${l.color}66,${l.color})`, borderRadius:2 }} />
                  </div>
                </div>
              ))}

              {/* What makes me stand out */}
              <div style={{ marginTop:32 }}>
                <PH mb={16}>Why Hire Me</PH>
                {[
                  { ic:"👑", t:"Proven Leadership", d:"Led 4-member team to deliver capstone project on time" },
                  { ic:"⚡", t:"Fast Learner", d:"AWS certified + full stack trained within 6 months" },
                  { ic:"🔨", t:"Ships Real Products", d:"4 deployed projects across Azure & cloud platforms" },
                  { ic:"🧠", t:"AI-Curious", d:"Actively exploring AI tools, automation & LLM integrations" },
                ].map(r => (
                  <div key={r.t} style={{ display:"flex", gap:12, marginBottom:14, alignItems:"flex-start" }}>
                    <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>{r.ic}</span>
                    <div>
                      <div style={{ fontSize:12, color:"#e8f0ff", fontWeight:700, marginBottom:2 }}>{r.t}</div>
                      <div style={{ fontSize:11, color:"#8892b0", lineHeight:1.6 }}>{r.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ marginTop:64 }}>
            <PH mb={28}>Experience &amp; Journey</PH>
            <div style={{ position:"relative", paddingLeft:28 }}>
              <div style={{ position:"absolute", left:7, top:0, bottom:0, width:1, background:"linear-gradient(180deg,#00d4aa44,transparent)" }} />
              {[
                { year:"2024–2025", ic:"💼", title:"Java Full Stack Developer Trainee", sub:"TechWing", desc:"6 months hands-on training building Spring Boot microservices & React dashboards. Designed REST APIs, worked with Hibernate JPA, MySQL, and deployed applications to Azure." },
                { year:"2024", ic:"☁️", title:"AWS Cloud Practitioner Certified", sub:"Amazon Web Services", desc:"Earned CLF-C02 — cloud architecture, EC2, S3, Lambda, IAM, VPC. Building toward cloud-native engineering roles." },
                { year:"2023", ic:"🏆", title:"IT Specialist — Java Certified", sub:"Pearson VUE", desc:"Validated Java proficiency: OOP, data structures, algorithms, and design patterns." },
                { year:"2021–2025", ic:"🎓", title:"B.Tech Computer Science · Team Lead", sub:"GIET, Rajahmundry · CGPA 8.61", desc:"Graduated with strong CS fundamentals. Led a 4-member team as Team Lead for the final year Blockchain Product Verification capstone — managed sprint planning, code reviews, and demo delivery." },
              ].map((e, i, arr) => (
                <div key={i} style={{ position:"relative", marginBottom: i < arr.length - 1 ? 32 : 0, paddingLeft:22 }}>
                  <div className="pulse-dot" style={{ position:"absolute", left:-28, top:3, width:14, height:14, borderRadius:"50%", background:"#070b14", border:`2px solid ${TEAL}` }} />
                  <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:5, flexWrap:"wrap" }}>
                    <span style={{ fontSize:10, color:TEAL, letterSpacing:".09em" }}>{e.year}</span>
                    <span style={{ fontSize:14 }}>{e.ic}</span>
                    <span style={{ ...syne, fontSize:"clamp(13px,2vw,15px)", fontWeight:700, color:"#e8f0ff" }}>{e.title}</span>
                  </div>
                  <div style={{ fontSize:11, color:"#61dafb", marginBottom:5 }}>{e.sub}</div>
                  <div style={{ fontSize:"clamp(12px,1.5vw,13px)", color:"#8892b0", lineHeight:1.7 }}>{e.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile links */}
          <div style={{ marginTop:56 }}>
            <PH mb={20}>Find Me Online</PH>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              {[
                {ic:"💼",label:"LinkedIn",sub:"sai-krishna-kasimalla",href:"https://linkedin.com/in/sai-krishna-kasimalla-126b67252",color:"#0077b5"},
                {ic:"🐙",label:"GitHub",sub:"SaiKrishnaKasimalla-839",href:"https://github.com/SaiKrishnaKasimalla-839",color:"#c8d3f5"},
                {ic:"🏆",label:"LeetCode",sub:"Sai_krishna-123",href:"https://leetcode.com/Sai_krishna-123",color:"#f89820"},
              ].map(p => (
                <a key={p.label} href={p.href} target="_blank" rel="noreferrer"
                  style={{ textDecoration:"none", background:"rgba(255,255,255,.03)", border:`1px solid ${p.color}22`, borderRadius:10, padding:"14px 20px", display:"flex", alignItems:"center", gap:12, flex: isMobile ? "1 1 100%" : "0 0 auto", transition:"all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "66"; e.currentTarget.style.background = p.color + "0d"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = p.color + "22"; e.currentTarget.style.background = "rgba(255,255,255,.03)"; }}
                >
                  <span style={{ fontSize:24 }}>{p.ic}</span>
                  <div>
                    <div style={{ fontSize:13, color:"#e8f0ff", fontWeight:700 }}>{p.label}</div>
                    <div style={{ fontSize:10, color:p.color, marginTop:2 }}>{p.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="sec-pad" style={{ background:"linear-gradient(180deg,transparent,rgba(0,212,170,.013),transparent)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <PH mb={48}>Education</PH>
          <div style={{ position:"relative", paddingLeft: isMobile ? 36 : 52 }}>
            <div style={{ position:"absolute", left: isMobile ? 10 : 16, top:10, bottom:0, width:1, background:"rgba(0,212,170,.3)" }} />
            {[
              { period:"2021 – 2025",ic:"🎓",title:"Bachelor of Technology",inst:"Godavari Institute Of Engineering And Technology, Rajahmundry",field:"Computer Science & Engineering",badge:"📊 CGPA: 8.61 / 10.0",bc:"#00d4aa",bb:"rgba(0,212,170,.07)",bbd:"rgba(0,212,170,.2)" },
              { period:"2019 – 2021",ic:"📘",title:"Intermediate (MPC)",inst:"State Board of Intermediate Education, Telangana",field:"Mathematics, Physics & Chemistry",badge:"🏅 94%",bc:"#61dafb",bb:"rgba(97,218,251,.07)",bbd:"rgba(97,218,251,.2)" },
              { period:"2019",ic:"🏫",title:"SSC — 10th Standard",inst:"Board of Secondary Education, Telangana",field:"Secondary School Certificate",badge:"🏅 95%",bc:"#f89820",bb:"rgba(248,152,32,.07)",bbd:"rgba(248,152,32,.2)" },
            ].map((e, i) => (
              <div key={i} style={{ position:"relative", marginBottom: i < 2 ? 42 : 0 }}>
                <div style={{ position:"absolute", left: isMobile ? -36 : -52, top:2, width:18, height:18, borderRadius:"50%", background:"#0d1117", border:`2px solid ${TEAL}`, zIndex:2 }} />
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                  <span style={{ fontSize:11, color:TEAL, letterSpacing:".07em", fontWeight:500 }}>{e.period}</span>
                  <span style={{ fontSize:14 }}>{e.ic}</span>
                  <span style={{ ...syne, fontSize:"clamp(14px,2.5vw,18px)", fontWeight:800, color:"#e8f0ff" }}>{e.title}</span>
                </div>
                <div style={{ fontSize:"clamp(11px,1.5vw,13px)", color:TEAL, marginBottom:5 }}>{e.inst}</div>
                <div style={{ fontSize:"clamp(12px,1.5vw,13px)", color:"#8892b0", lineHeight:1.7 }}>{e.field}</div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:8, fontSize:11, color:e.bc, background:e.bb, border:`1px solid ${e.bbd}`, borderRadius:4, padding:"3px 11px" }}>{e.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="sec-pad">
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <PH mb={40}>Tech Stack</PH>
          <div style={{ display:"grid", gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr", gap: isDesktop ? 60 : 48 }}>
            <div>
              <PH mb={24}>Proficiency Levels</PH>
              <div ref={skillsRef}>
                {SKILLS.map((s, i) => <SkillBar key={s.name} {...s} idx={i} visible={skillsVisible} />)}
              </div>
            </div>
            <div>
              <PH mb={24}>Tech Ecosystem</PH>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                {TECH.map(t => (
                  <div key={t.n}
                    style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, padding:"14px 10px", textAlign:"center", cursor:"default", transition:"transform .3s,box-shadow .3s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,212,170,.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ fontSize:22, marginBottom:5 }}>{t.ic}</div>
                    <div style={{ fontSize:11, color:"#e8f0ff", fontWeight:700 }}>{t.n}</div>
                    <div style={{ fontSize:9, color:"#8892b0", marginTop:2 }}>{t.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="sec-pad" style={{ background:"linear-gradient(180deg,transparent,rgba(0,212,170,.013),transparent)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <PH mb={40}>Projects</PH>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr", gap:20 }}>
            {PROJECTS.map(p => <ProjectCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="sec-pad">
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <PH mb={10}>Certifications</PH>
          <p style={{ fontSize:"clamp(12px,1.5vw,14px)", color:"#8892b0", marginBottom:40, lineHeight:1.8 }}>
            Industry-recognized certifications earned to validate my cloud and Java engineering skills — building toward a career in tech.
          </p>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:20, marginBottom:48 }}>
            {CERTS.map(c => <CertCard key={c.title} {...c} />)}
          </div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap:14 }}>
            {[
              { value:"2+", label:"Certifications", color:TEAL },
              { value:"4", label:"Projects Built", color:"#61dafb" },
              { value:"8.61", label:"CGPA", color:"#f89820" },
              { value:"2025", label:"Grad Year", color:"#a78bfa" },
            ].map(s => (
              <div key={s.label} style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, padding:"20px 14px", textAlign:"center" }}>
                <div style={{ ...syne, fontSize:"clamp(24px,4vw,32px)", fontWeight:800, color:s.color, marginBottom:5 }}>{s.value}</div>
                <div style={{ fontSize:10, color:"#8892b0", letterSpacing:".07em", textTransform:"uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec-pad" style={{ paddingBottom:60 }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <PH mb={10}>Contact</PH>
          <h2 style={{ ...syne, fontSize:"clamp(26px,5vw,40px)", fontWeight:800, color:"#e8f0ff", marginBottom:12, lineHeight:1.2 }}>
            Looking to build something<br /><span style={{ color:TEAL }}>great together.</span>
          </h2>
          <p style={{ fontSize:"clamp(12px,1.5vw,14px)", color:"#8892b0", marginBottom:36, lineHeight:1.85 }}>
            Actively seeking full-time roles, internships, and collaborations. I'm eager to contribute, learn, and grow — drop me a message and let's connect!
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14 }}>
              <input className="c-inp" placeholder="Your Name" />
              <input className="c-inp" placeholder="Your Email" />
            </div>
            <input className="c-inp" placeholder="Subject" />
            <textarea className="c-inp" placeholder="Your message..." rows={5} style={{ resize:"vertical" }} />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
              <button className="btn-primary">Send Message ↗</button>
              <div style={{ display:"flex", gap:18 }}>
                {[
                  {ic:"💼",label:"LinkedIn",href:"https://linkedin.com/in/sai-krishna-kasimalla-126b67252"},
                  {ic:"🐙",label:"GitHub",href:"https://github.com/SaiKrishnaKasimalla-839"},
                  {ic:"🏆",label:"LeetCode",href:"https://leetcode.com/Sai_krishna-123"},
                  {ic:"📧",label:"Email",href:"mailto:saikrishna@example.com"},
                ].map(({ ic, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="soc-link">
                    <span style={{ fontSize:18 }}>{ic}</span>{label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid rgba(0,212,170,.09)", padding: isMobile ? "24px 20px" : "28px 5vw", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ ...syne, fontWeight:800, fontSize:15, color:TEAL }}>&lt;SK /&gt;</div>
        <div style={{ fontSize:10, color:"#374151", letterSpacing:".08em", textAlign:"center" }}>© 2026 SAI KRISHNA KASIMALLA · BUILT WITH ⚛️ REACT</div>
        <div style={{ fontSize:10, color:TEAL, letterSpacing:".06em" }}>OPEN TO OPPORTUNITIES ●</div>
      </footer>
    </div>
  );
}
