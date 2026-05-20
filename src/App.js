import { useState, useEffect, useRef } from "react";

const TEAL = "#00d4aa";
const NAV_ITEMS = ["home","about","education","skills","projects","certifications","contact"];

const SKILLS = [
  {name:"Java",level:92,color:"#f89820"},
  {name:"JavaScript",level:82,color:"#e9c920"},
  {name:"React.js",level:85,color:"#61dafb"},
  {name:"Spring Boot",level:88,color:"#6db33f"},
  {name:"Hibernate JPA",level:82,color:"#00d4aa"},
  {name:"REST APIs",level:90,color:"#00d4aa"},
  {name:"AWS",level:80,color:"#ff9900"},
  {name:"Azure",level:78,color:"#0089d6"},
  {name:"SQL / NoSQL",level:82,color:"#e95420"},
  {name:"DevOps / CI-CD",level:80,color:"#6db33f"},
  {name:"GitHub",level:82,color:"#c8d3f5"},
  {name:"SpringMVC",level:82,color:"#6db33f"},
];

const TECH = [
  {ic:"☕",n:"Java",s:"Core + Advanced"},
  {ic:"🌱",n:"Spring",s:"Boot · MVC · JPA"},
  {ic:"⚛️",n:"React",s:"Hooks · Redux"},
  {ic:"☁️",n:"AWS",s:"EC2 · S3 · Lambda"},
  {ic:"🔷",n:"Azure",s:"Cloud Services"},
  {ic:"🐳",n:"Docker",s:"Containers"},
  {ic:"🗄️",n:"SQL/NoSQL",s:"MySQL · Postgres"},
  {ic:"🔗",n:"REST APIs",s:"Design · Docs"},
  {ic:"⚙️",n:"CI/CD",s:"GitHub Actions"},
];

const PROJECTS = [
  {
    icon:"🏦", color:"#f89820",
    title:"Vault — Full Stack Banking App",
    desc:"Full-stack banking web application with React.js frontend, Spring Boot RESTful APIs backend, and MySQL for secure database management. Features account management, transaction history, and fund transfers.",
    tags:["Java","Spring Boot","Hibernate JPA","React","Azure","MySQL"],
    github:"https://github.com/SaiKrishnaKasimalla-839",
  },
  {
    icon:"🤖", color:"#00d4aa",
    title:"NeuralOps — AI Agent Orchestration",
    desc:"Full-stack AI agent management portal with React frontend and Spring Boot backend. Real-time orchestration of multiple AI agents, task queuing, monitoring dashboards, and performance analytics.",
    tags:["Java","Spring Boot","React.js","MySQL","Azure VMs"],
    github:"https://github.com/SaiKrishnaKasimalla-839",
  },
  {
    icon:"🖥️", color:"#0089d6",
    title:"Virtual Classroom System",
    desc:"LLM-integrated virtual classroom with Spring AI, Ollama DeepSeek, and MongoDB. Real-time collaboration tools, automated grading assistance, and smart note generation.",
    tags:["Java","Spring AI","Ollama","MongoDB","React.js"],
    github:"https://github.com/SaiKrishnaKasimalla-839",
  },
  {
    icon:"🔐", color:"#a78bfa",
    title:"Blockchain Product Verification",
    desc:"Final year capstone — led a four-member team to build a blockchain-based product authenticity verification system. Immutable audit trails, QR-based lookup, and decentralized trust layer.",
    tags:["Blockchain","Java","React","Solidity","Web3"],
    github:"https://github.com/SaiKrishnaKasimalla-839",
  },
];

const CERTS = [
  {
    icon:"☁️",
    color:"#f89820",
    bg:"rgba(248,152,32,0.08)",
    border:"rgba(248,152,32,0.3)",
    title:"AWS Certified Cloud Practitioner",
    issuer:"Amazon Web Services",
    year:"2024",
    badge:"CLF-C02",
    desc:"Cloud architecture fundamentals — EC2, S3, Lambda, IAM, VPC, RDS, and core AWS services.",
  },
  {
    icon:"☕",
    color:"#f89820",
    bg:"rgba(248,152,32,0.08)",
    border:"rgba(248,152,32,0.3)",
    title:"IT Specialist — Java",
    issuer:"Pearson VUE",
    year:"2023",
    badge:"Pearson",
    desc:"Certified Java specialist covering OOP principles, data structures, algorithms, and software design patterns.",
  },
];

/* ─────────── Particle canvas ─────────── */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    const pts = Array.from({length:70}, () => ({
      x:Math.random()*c.width, y:Math.random()*c.height,
      vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
      r:Math.random()*1.8+.4, a:Math.random(),
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      pts.forEach((p,i) => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>c.width) p.vx*=-1;
        if(p.y<0||p.y>c.height) p.vy*=-1;
        pts.slice(i+1).forEach(q => {
          const d = Math.hypot(p.x-q.x,p.y-q.y);
          if(d<120){
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,170,${(1-d/120)*.18})`;
            ctx.lineWidth=.7;
            ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(0,212,170,${.5+p.a*.5})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.55,pointerEvents:"none"}} />;
}

/* ─────────── Skill bar ─────────── */
function SkillBar({name, level, color, idx, visible}) {
  return (
    <div style={{marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:13,color:"#c8d3f5",letterSpacing:".05em"}}>{name}</span>
        <span style={{fontSize:12,color}}>{level}%</span>
      </div>
      <div style={{height:6,background:"rgba(255,255,255,.06)",borderRadius:3,overflow:"hidden"}}>
        <div style={{
          height:"100%",
          width: visible ? level+"%" : "0%",
          background:`linear-gradient(90deg,${color}88,${color})`,
          borderRadius:3,
          transition:`width 1.2s cubic-bezier(.4,0,.2,1) ${idx*.08}s`,
          boxShadow:`0 0 10px ${color}66`,
        }} />
      </div>
    </div>
  );
}

/* ─────────── Project card ─────────── */
function ProjectCard({icon,color,title,desc,tags,github}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:"rgba(255,255,255,.03)",
        border:"1px solid rgba(255,255,255,.08)",
        borderRadius:16,padding:30,position:"relative",overflow:"hidden",cursor:"default",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? "0 20px 60px rgba(0,212,170,.15)" : "none",
        transition:"transform .3s,box-shadow .3s",
      }}
    >
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${color},transparent)`}} />
      <div style={{fontSize:36,marginBottom:16}}>{icon}</div>
      <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:"#e8f0ff",marginBottom:10}}>{title}</h3>
      <p style={{fontSize:13,color:"#8892b0",lineHeight:1.8,marginBottom:20}}>{desc}</p>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        {tags.map(t=>(
          <span key={t} style={{fontSize:10,padding:"4px 10px",borderRadius:4,background:`${color}18`,border:`1px solid ${color}55`,color}}>{t}</span>
        ))}
      </div>
      <a href={github} target="_blank" rel="noreferrer"
        style={{fontSize:11,color:TEAL,letterSpacing:".08em",textDecoration:"none",borderBottom:`1px solid ${TEAL}44`}}>
        View on GitHub →
      </a>
    </div>
  );
}

/* ─────────── Cert card ─────────── */
function CertCard({icon,color,bg,border,title,issuer,year,badge,desc}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background: bg,
        border:`1px solid ${border}`,
        borderRadius:16,padding:32,position:"relative",overflow:"hidden",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? `0 20px 60px ${color}22` : "none",
        transition:"transform .3s,box-shadow .3s",
      }}
    >
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${color},transparent)`}} />
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
        <div style={{fontSize:44}}>{icon}</div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
          <span style={{fontSize:10,color,background:`${color}18`,border:`1px solid ${color}44`,borderRadius:4,padding:"3px 10px",letterSpacing:".08em"}}>{badge}</span>
          <span style={{fontSize:11,color:"#8892b0"}}>{year}</span>
        </div>
      </div>
      <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#e8f0ff",marginBottom:6}}>{title}</h3>
      <div style={{fontSize:13,color,marginBottom:12,letterSpacing:".04em"}}>{issuer}</div>
      <p style={{fontSize:13,color:"#8892b0",lineHeight:1.8}}>{desc}</p>
    </div>
  );
}

/* ─────────── Main App ─────────── */
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("home");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({x:-250,y:-250});
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [glitchName, setGlitchName] = useState("KRISHNA");
  const skillsRef = useRef(null);

  /* cursor glow */
  useEffect(() => {
    const handler = e => setMousePos({x:e.clientX-250, y:e.clientY-250});
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  },[]);

  /* typed text */
  useEffect(() => {
    const type = (setter, text, delay) => setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        setter(text.slice(0,++i)+"▋");
        if(i>=text.length){clearInterval(iv); setter(text);}
      },38);
    }, delay);
    type(setT1,"saikrishna@seeking-opportunities:~",700);
    type(setT2,"Java · Spring · React · AWS · Open to Work",2200);
  },[]);

  /* glitch */
  useEffect(() => {
    const GC = "!<>-_\\/[]{}—=+*^?#@$%&";
    const src = "KRISHNA";
    const glitch = () => {
      let it = 0;
      const iv = setInterval(() => {
        setGlitchName(src.split("").map((c,i)=>i<it?src[i]:GC[Math.floor(Math.random()*GC.length)]).join(""));
        if((it+=.5)>=src.length){clearInterval(iv); setGlitchName(src);}
      },28);
    };
    const interval = setInterval(glitch, 4000);
    return () => clearInterval(interval);
  },[]);

  /* skills intersection */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setSkillsVisible(true); },{threshold:.2});
    if(skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  },[]);

  /* active nav on scroll */
  useEffect(() => {
    const handler = () => {
      for(const id of [...NAV_ITEMS].reverse()){
        const el = document.getElementById(id);
        if(el && window.scrollY >= el.offsetTop - 120){
          setActiveNav(id); break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  },[]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setActiveNav(id);
  };

  const styles = {
    page:{minHeight:"100vh",background:"#070b14",color:"#c8d3f5",fontFamily:"'JetBrains Mono',monospace",overflowX:"hidden"},
    secLabel:{display:"flex",alignItems:"center",gap:16,marginBottom:50},
    secLabelText:{fontSize:13,color:TEAL,letterSpacing:".1em"},
    secLabelLine:{flex:1,height:1,background:"linear-gradient(90deg,rgba(0,212,170,.3),transparent)"},
    syne:{fontFamily:"'Syne',sans-serif"},
  };

  return (
    <div style={styles.page}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>

      {/* Global styles */}
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#070b14}
        ::-webkit-scrollbar-thumb{background:#00d4aa44;border-radius:2px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 20px #00d4aa33}50%{box-shadow:0 0 40px #00d4aa88}}
        @keyframes blinkBorder{0%,100%{border-color:#00d4aa44}50%{border-color:#00d4aacc}}
        .hero-tag{animation:fadeUp .7s ease both}
        .float-a{animation:floatA 3s ease-in-out infinite}
        .float-b{animation:floatB 3.5s ease-in-out infinite}
        .pulse-dot{animation:pulseGlow 2s infinite}
        .avatar-ring{animation:blinkBorder 2.5s infinite}
        .tag-pill{transition:all .2s;cursor:default}
        .tag-pill:hover{background:rgba(0,212,170,.25)!important}
        .send-btn:hover{transform:scale(1.05);box-shadow:0 8px 30px rgba(0,212,170,.4)}
        .contact-input:focus{border-color:#00d4aa88;outline:none}
        .nav-link-item{position:relative;cursor:pointer;transition:all .2s}
        .nav-link-item::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:2px;background:#00d4aa;transform:scaleX(0);transition:transform .2s}
        .nav-link-item:hover::after,.nav-link-item.active::after{transform:scaleX(1)}
      `}</style>

      {/* Cursor glow */}
      <div style={{position:"fixed",pointerEvents:"none",zIndex:0,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,170,.04) 0%,transparent 70%)",transition:"left .08s,top .08s",left:mousePos.x,top:mousePos.y}} />
      {/* Scan line */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#00d4aa22,transparent)",animation:"scan 6s linear infinite",zIndex:1,pointerEvents:"none"}} />
      {/* Grid */}
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(0,212,170,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,.03) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />

      {/* ── NAV ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"20px 5vw",display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(7,11,20,.88)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,212,170,.1)"}}>
        <div style={{...styles.syne,fontWeight:800,fontSize:18,color:TEAL}}>&lt;SK /&gt;</div>
        <div style={{display:"flex",gap:28}}>
          {NAV_ITEMS.map(id=>(
            <span key={id}
              className={`nav-link-item${activeNav===id?" active":""}`}
              onClick={()=>scrollTo(id)}
              style={{fontSize:11,letterSpacing:".1em",textTransform:"uppercase",color:activeNav===id?TEAL:"#8892b0"}}
            >{id}</span>
          ))}
        </div>
      </nav>

      
      <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"160px 5vw 100px",position:"relative",overflow:"hidden"}}>
        <ParticleCanvas />

       
        <div style={{position:"absolute",right:"4vw",top:"50%",transform:"translateY(-50%)",zIndex:2,display:"flex",flexDirection:"column",gap:8}}>
          {[
            {ic:"☁️",label:"Aspiring Cloud",color:"#f89820",border:"rgba(248,152,32,.4)",cls:"float-a"},
            {ic:"⚛️",label:"React Learner",color:"#61dafb",border:"rgba(97,218,251,.35)",cls:"float-b"},
            {ic:"🌱",label:"Spring Boot",color:"#6db33f",border:"rgba(109,179,63,.4)",cls:"float-a"},
            {ic:"🔷",label:"Azure Exploring",color:"#0089d6",border:"rgba(0,137,214,.4)",cls:"float-b"},
          ].map((b,i)=>(
            <div key={i} className={b.cls} style={{animationDelay:`${i*.4}s`}}>
              <div style={{background:"rgba(7,11,20,.75)",borderRadius:12,padding:"12px 16px",textAlign:"center",minWidth:108,backdropFilter:"blur(8px)",border:`1px solid ${b.border}`}}>
                <div style={{fontSize:22}}>{b.ic}</div>
                <div style={{fontSize:10,color:b.color,marginTop:5,letterSpacing:".05em",fontWeight:700}}>{b.label}</div>
              </div>
            </div>
          ))}
        </div>

      
        <div style={{position:"absolute",left:"2vw",top:"50%",transform:"translateY(-50%)",zIndex:2,display:"flex",flexDirection:"column",gap:8}}>
          {[
            {ic:"☕",label:"Java Focused",color:"#f89820",border:"rgba(248,152,32,.3)",cls:"float-b"},
            {ic:"🚀",label:"Seeking Role",color:TEAL,border:"rgba(0,212,170,.3)",cls:"float-a"},
          ].map((b,i)=>(
            <div key={i} className={b.cls} style={{animationDelay:`${i*.6}s`}}>
              <div style={{background:"rgba(7,11,20,.75)",borderRadius:12,padding:"12px 16px",textAlign:"center",minWidth:108,backdropFilter:"blur(8px)",border:`1px solid ${b.border}`}}>
                <div style={{fontSize:22}}>{b.ic}</div>
                <div style={{fontSize:10,color:b.color,marginTop:5,letterSpacing:".05em",fontWeight:700}}>{b.label}</div>
              </div>
            </div>
          ))}
        </div>

      
        <div style={{position:"relative",zIndex:2,maxWidth:780,width:"100%",margin:"0 auto"}}>
          <div className="hero-tag" style={{animationDelay:".1s",marginBottom:22}}>
            <span style={{fontSize:12,letterSpacing:".2em",color:TEAL,textTransform:"uppercase"}}>● Aspiring Software Engineer · Open to Opportunities</span>
          </div>
          <div className="hero-tag" style={{animationDelay:".2s",marginBottom:20}}>
            <h1 style={{...styles.syne,fontSize:"clamp(48px,8vw,96px)",fontWeight:800,lineHeight:1.05,color:"#e8f0ff",letterSpacing:"-.03em"}}>
              SAI<br/><span style={{color:TEAL}}>{glitchName}</span>
            </h1>
          </div>
          <div className="hero-tag" style={{animationDelay:".4s",marginBottom:42,maxWidth:520}}>
            <p style={{fontSize:15,lineHeight:1.9,color:"#8892b0",letterSpacing:".02em"}}>
              Aspiring to build scalable systems with Java &amp; Spring Boot.<br/>
              Looking to craft beautiful UIs with React.js.<br/>
              Eager to deploy production apps on AWS &amp; Azure.
            </p>
          </div>
          <div className="hero-tag" style={{animationDelay:".5s",display:"flex",gap:16,flexWrap:"wrap",marginBottom:60}}>
            <button className="send-btn" onClick={()=>scrollTo("projects")} style={{background:"linear-gradient(135deg,#00d4aa,#0089d6)",border:"none",color:"#070b14",fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:13,padding:"14px 32px",borderRadius:6,cursor:"pointer",letterSpacing:".08em",transition:"all .3s"}}>View Projects →</button>
            <button onClick={()=>scrollTo("contact")} style={{background:"transparent",border:"1px solid rgba(0,212,170,.4)",color:TEAL,fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,padding:"14px 32px",borderRadius:6,cursor:"pointer",letterSpacing:".08em",transition:"all .3s"}}>Contact Me</button>
          </div>
          <div className="hero-tag" style={{animationDelay:".7s"}}>
            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(0,212,170,.15)",borderRadius:10,padding:"18px 24px",maxWidth:420,backdropFilter:"blur(10px)"}}>
              <div style={{display:"flex",gap:6,marginBottom:14}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:"#ff5f57"}}/>
                <div style={{width:10,height:10,borderRadius:"50%",background:"#febc2e"}}/>
                <div style={{width:10,height:10,borderRadius:"50%",background:"#28c840"}}/>
              </div>
              <div style={{lineHeight:2.1}}>
                <div style={{color:"#8892b0",fontSize:12}}>$ whoami</div>
                <span style={{color:TEAL,fontSize:13}}>{t1}</span><br/>
                <div style={{color:"#8892b0",fontSize:12,marginTop:4}}>$ stack --list</div>
                <span style={{color:"#61dafb",fontSize:13}}>{t2}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section id="about" style={{padding:"120px 5vw"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={styles.secLabel}><span style={styles.secLabelText}></span><div style={styles.secLabelLine}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24}}>
              <div className="avatar-ring" style={{width:200,height:200,borderRadius:"50%",border:"2px solid #00d4aa44",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",background:"radial-gradient(circle at 40% 35%,rgba(0,212,170,.12),rgba(7,11,20,.8))"}}>
                <div style={{width:160,height:160,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa22,#0089d622)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:64}}>👨‍💻</div>
                <div style={{position:"absolute",bottom:8,right:8,width:24,height:24,borderRadius:"50%",background:TEAL,border:"3px solid #070b14"}}/>
              </div>
              <div style={{display:"flex",gap:12}}>
                {[["🎓","B.Tech"],["🏅","2x Certified"],["🌐","Hyderabad"]].map(([ic,lb])=>(
                  <div key={lb} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(0,212,170,.15)",borderRadius:8,padding:"8px 14px",textAlign:"center"}}>
                    <div style={{fontSize:18}}>{ic}</div>
                    <div style={{fontSize:10,color:"#8892b0",marginTop:2}}>{lb}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{...styles.syne,fontSize:32,fontWeight:800,color:"#e8f0ff",marginBottom:20,lineHeight:1.2}}>Looking to build the future,<br/><span style={{color:TEAL}}>one commit</span> at a time.</h2>
              <p style={{fontSize:14,lineHeight:1.9,color:"#8892b0",marginBottom:20}}>I'm a fresh CS graduate aspiring to grow as a Full Stack Java Developer. With hands-on experience in Java, Spring Boot microservices, and React.js through training and personal projects, I'm eager to turn real-world problems into elegant, scalable solutions.</p>
              <p style={{fontSize:14,lineHeight:1.9,color:"#8892b0",marginBottom:28}}>From designing RESTful APIs to deploying on AWS and Azure, I've built end-to-end projects that reflect my commitment to shipping quality software. Actively looking for my first professional role where I can contribute and grow.</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {["AWS Cloud Practitioner","IT Specialist Java","Spring Boot","React.js"].map(t=>(
                  <span key={t} className="tag-pill" style={{fontSize:11,padding:"6px 12px",borderRadius:4,letterSpacing:".05em",background:"rgba(0,212,170,.1)",border:"1px solid rgba(0,212,170,.25)",color:TEAL}}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          
          <div style={{marginTop:80}}>
            <h3 style={{...styles.syne,fontSize:22,color:"#e8f0ff",marginBottom:36}}>Experience &amp; Journey</h3>
            <div style={{position:"relative",paddingLeft:30}}>
              <div style={{position:"absolute",left:8,top:0,bottom:0,width:1,background:"linear-gradient(180deg,#00d4aa44,transparent)"}}/>
              {[
                {year:"2024",ic:"💼",title:"Java Full Stack Developer Trainee",sub:"TechWing",desc:"Trained in enterprise app development with Spring Boot microservices & React dashboards. Gained hands-on experience in REST API design, Hibernate JPA, and cloud deployments."},
                {year:"2024",ic:"☁️",title:"AWS Cloud Practitioner Certified",sub:"Amazon Web Services",desc:"Earned certification in cloud architecture, EC2, S3, Lambda, and IAM security — building toward cloud-native roles."},
                {year:"2023",ic:"🏆",title:"IT Specialist — Java",sub:"Pearson",desc:"Validated Java foundations covering OOP, data structures, and algorithms."},
              ].map((e,i)=>(
                <div key={i} style={{position:"relative",marginBottom:i<2?36:0,paddingLeft:24}}>
                  <div className="pulse-dot" style={{position:"absolute",left:-30,top:4,width:16,height:16,borderRadius:"50%",background:"#070b14",border:`2px solid ${TEAL}`}}/>
                  <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:6}}>
                    <span style={{fontSize:11,color:TEAL,letterSpacing:".1em"}}>{e.year}</span>
                    <span>{e.ic}</span>
                    <span style={{...styles.syne,fontSize:16,fontWeight:700,color:"#e8f0ff"}}>{e.title}</span>
                  </div>
                  <div style={{fontSize:12,color:"#61dafb",marginBottom:6}}>{e.sub}</div>
                  <div style={{fontSize:13,color:"#8892b0",lineHeight:1.7}}>{e.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    
      <section id="education" style={{padding:"120px 5vw",background:"linear-gradient(180deg,transparent,rgba(0,212,170,.015),transparent)"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={styles.secLabel}><span style={styles.secLabelText}></span><div style={styles.secLabelLine}/></div>
          <h2 style={{...styles.syne,fontSize:32,fontWeight:800,color:"#e8f0ff",marginBottom:56,lineHeight:1.2}}>Education</h2>
          <div style={{position:"relative",paddingLeft:52}}>
            <div style={{position:"absolute",left:16,top:10,bottom:0,width:1,background:"rgba(0,212,170,.35)"}}/>
            {[
              {period:"2021 – 2025",ic:"🎓",title:"Bachelor of Technology",inst:"Godavari Institute Of Engineering And Technology",field:"Computer Science & Engineering",badge:"📊 CGPA: 8.61 / 10.0",bc:"#00d4aa",bb:"rgba(0,212,170,.08)",bbd:"rgba(0,212,170,.2)"},
              {period:"2019 – 2021",ic:"📘",title:"Intermediate (MPC)",inst:"State Board of Intermediate Education, Telangana",field:"Mathematics, Physics & Chemistry",badge:"🏅 94%",bc:"#61dafb",bb:"rgba(97,218,251,.08)",bbd:"rgba(97,218,251,.2)"},
              {period:"2019",ic:"🏫",title:"SSC — 10th Standard",inst:"Board of Secondary Education, Telangana",field:"Secondary School Certificate",badge:"🏅 95%",bc:"#f89820",bb:"rgba(248,152,32,.08)",bbd:"rgba(248,152,32,.2)"},
            ].map((e,i)=>(
              <div key={i} style={{position:"relative",marginBottom:i<2?48:0}}>
                <div style={{position:"absolute",left:-52,top:2,width:20,height:20,borderRadius:"50%",background:"#0d1117",border:`2px solid ${TEAL}`,zIndex:2}}/>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:13,color:TEAL,letterSpacing:".08em",fontWeight:500}}>{e.period}</span>
                  <span>{e.ic}</span>
                  <span style={{...styles.syne,fontSize:18,fontWeight:800,color:"#e8f0ff"}}>{e.title}</span>
                </div>
                <div style={{fontSize:13,color:TEAL,marginBottom:6}}>{e.inst}</div>
                <div style={{fontSize:13,color:"#8892b0",lineHeight:1.7}}>{e.field}</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:10,fontSize:12,color:e.bc,background:e.bb,border:`1px solid ${e.bbd}`,borderRadius:5,padding:"4px 12px"}}>{e.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section id="skills" style={{padding:"120px 5vw"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={styles.secLabel}><span style={styles.secLabelText}></span><div style={styles.secLabelLine}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60}}>
            <div>
              <h3 style={{...styles.syne,fontSize:22,color:"#e8f0ff",marginBottom:32}}>Proficiency Levels</h3>
              <div ref={skillsRef}>
                {SKILLS.map((s,i)=><SkillBar key={s.name} {...s} idx={i} visible={skillsVisible}/>)}
              </div>
            </div>
            <div>
              <h3 style={{...styles.syne,fontSize:22,color:"#e8f0ff",marginBottom:32}}>Tech Ecosystem</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {TECH.map(t=>(
                  <div key={t.n} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:10,padding:"16px 12px",textAlign:"center",cursor:"default",transition:"transform .3s,box-shadow .3s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 20px 60px rgba(0,212,170,.15)"}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}
                  >
                    <div style={{fontSize:26,marginBottom:6}}>{t.ic}</div>
                    <div style={{fontSize:12,color:"#e8f0ff",fontWeight:700}}>{t.n}</div>
                    <div style={{fontSize:10,color:"#8892b0",marginTop:2}}>{t.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section id="projects" style={{padding:"120px 5vw",background:"linear-gradient(180deg,transparent,rgba(0,212,170,.015),transparent)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={styles.secLabel}><span style={styles.secLabelText}></span><div style={styles.secLabelLine}/></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24}}>
            {PROJECTS.map(p=><ProjectCard key={p.title} {...p}/>)}
          </div>
        </div>
      </section>

     
      <section id="certifications" style={{padding:"120px 5vw"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={styles.secLabel}><span style={styles.secLabelText}></span><div style={styles.secLabelLine}/></div>
          <h2 style={{...styles.syne,fontSize:32,fontWeight:800,color:"#e8f0ff",marginBottom:14,lineHeight:1.2}}>
            Verified <span style={{color:TEAL}}>Credentials</span>
          </h2>
          <p style={{fontSize:14,color:"#8892b0",marginBottom:48,lineHeight:1.8}}>Industry-recognized certifications earned to validate and grow expertise in cloud and software engineering — building toward a career in tech.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24,marginBottom:60}}>
            {CERTS.map(c=><CertCard key={c.title} {...c}/>)}
          </div>

         
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginTop:20}}>
            {[
              {value:"2+",label:"Certifications",color:TEAL},
              {value:"3",label:"Major Projects",color:"#61dafb"},
              {value:"8.61",label:"CGPA",color:"#f89820"},
              {value:"2025",label:"Grad Year",color:"#a78bfa"},
            ].map(s=>(
              <div key={s.label} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"24px 16px",textAlign:"center"}}>
                <div style={{...styles.syne,fontSize:32,fontWeight:800,color:s.color,marginBottom:6}}>{s.value}</div>
                <div style={{fontSize:11,color:"#8892b0",letterSpacing:".08em",textTransform:"uppercase"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section id="contact" style={{padding:"120px 5vw 80px"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={styles.secLabel}><span style={styles.secLabelText}></span><div style={styles.secLabelLine}/></div>
          <h2 style={{...styles.syne,fontSize:40,fontWeight:800,color:"#e8f0ff",marginBottom:14,lineHeight:1.2}}>Looking to build something<br/><span style={{color:TEAL}}>great together.</span></h2>
          <p style={{fontSize:14,color:"#8892b0",marginBottom:40,lineHeight:1.8}}>Actively seeking full-time roles, internships, and exciting collaborations. I'm eager to contribute, learn, and grow — drop me a message and let's connect!</p>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <input className="contact-input" placeholder="Your Name" style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(0,212,170,.2)",borderRadius:8,padding:"12px 16px",color:"#c8d3f5",fontFamily:"'JetBrains Mono',monospace",fontSize:13,width:"100%",transition:"border-color .2s"}}/>
              <input className="contact-input" placeholder="Your Email" style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(0,212,170,.2)",borderRadius:8,padding:"12px 16px",color:"#c8d3f5",fontFamily:"'JetBrains Mono',monospace",fontSize:13,width:"100%",transition:"border-color .2s"}}/>
            </div>
            <input className="contact-input" placeholder="Subject" style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(0,212,170,.2)",borderRadius:8,padding:"12px 16px",color:"#c8d3f5",fontFamily:"'JetBrains Mono',monospace",fontSize:13,width:"100%",transition:"border-color .2s"}}/>
            <textarea className="contact-input" placeholder="Your message..." rows={5} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(0,212,170,.2)",borderRadius:8,padding:"12px 16px",color:"#c8d3f5",fontFamily:"'JetBrains Mono',monospace",fontSize:13,width:"100%",resize:"vertical",transition:"border-color .2s"}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <button className="send-btn" style={{background:"linear-gradient(135deg,#00d4aa,#0089d6)",border:"none",color:"#070b14",fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:13,padding:"14px 32px",borderRadius:8,cursor:"pointer",letterSpacing:".08em",transition:"all .3s"}}>Send Message ↗</button>
              <div style={{display:"flex",gap:20}}>
                {[
                  {ic:"💼",label:"LinkedIn",href:"https://linkedin.com/in/sai-krishna-kasimalla-126b67252"},
                  {ic:"🐙",label:"GitHub",href:"https://github.com/SaiKrishnaKasimalla-839"},
                  {ic:"📧",label:"Email",href:"mailto:saikrishnakasimalla@gmail.com"},
                ].map(({ic,label,href})=>(
                  <a key={label} href={href} target="_blank" rel="noreferrer" style={{fontSize:11,color:"#8892b0",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,transition:"color .2s",textDecoration:"none"}}
                    onMouseEnter={e=>e.currentTarget.style.color=TEAL}
                    onMouseLeave={e=>e.currentTarget.style.color="#8892b0"}
                  ><span style={{fontSize:20}}>{ic}</span>{label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{borderTop:"1px solid rgba(0,212,170,.1)",padding:"30px 5vw",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{...styles.syne,fontWeight:800,fontSize:16,color:TEAL}}>&lt;SK /&gt;</div>
        <div style={{fontSize:11,color:"#4a5568",letterSpacing:".1em"}}>© 2026 SAI KRISHNA · BUILT WITH ⚛️ REACT</div>
        <div style={{fontSize:11,color:TEAL,letterSpacing:".05em"}}>OPEN TO OPPORTUNITIES ●</div>
      </footer>
    </div>
  );
}
