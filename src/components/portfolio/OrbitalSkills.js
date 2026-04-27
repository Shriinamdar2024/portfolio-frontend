import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { Code2, Cpu } from "lucide-react";

/* ─── CDN skill logos ─────────────────────────────────────────── */
const getSkillLogo = (skillName) => {
  const name = (skillName || "").toLowerCase();
  const map = {
    "react":"react/react-original.svg","javascript":"javascript/javascript-original.svg",
    "typescript":"typescript/typescript-original.svg","html":"html5/html5-original.svg",
    "css":"css3/css3-original.svg","tailwind":"tailwindcss/tailwindcss-original.svg",
    "tailwind css":"tailwindcss/tailwindcss-original.svg","node.js":"nodejs/nodejs-original.svg",
    "node":"nodejs/nodejs-original.svg","express":"express/express-original.svg",
    "mongodb":"mongodb/mongodb-original.svg","git":"git/git-original.svg",
    "github":"github/github-original.svg","next.js":"nextjs/nextjs-original.svg",
    "nextjs":"nextjs/nextjs-original.svg","python":"python/python-original.svg",
    "java":"java/java-original.svg","c++":"cplusplus/cplusplus-original.svg",
    "docker":"docker/docker-original.svg","aws":"amazonwebservices/amazonwebservices-original-wordmark.svg",
    "firebase":"firebase/firebase-plain.svg","figma":"figma/figma-original.svg",
    "redux":"redux/redux-original.svg","mysql":"mysql/mysql-original.svg",
    "postgresql":"postgresql/postgresql-original.svg",
  };
  const path = map[name] || map[Object.keys(map).find(k => name.includes(k))];
  return path ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}` : null;
};
const NEED_INVERT = ["next.js","nextjs","express","github"];

/* ─── Tilt angle: -20° — gentle diagonal, fits all screen sizes ── */
const TILT_DEG = -20;
const TILT_RAD = TILT_DEG * Math.PI / 180;
const cosT = Math.cos(TILT_RAD); // ≈  0.7071
const sinT = Math.sin(TILT_RAD); // ≈ -0.7071

/* Apply 2D rotation matrix to a point on the ellipse */
function tiltPoint(rawX, rawY) {
  return {
    x: rawX * cosT - rawY * sinT,
    y: rawX * sinT + rawY * cosT,
  };
}

/* ─── Starfield ───────────────────────────────────────────────── */
const Starfield = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let raf, stars = [];
    const isMobile = window.innerWidth < 768;
    // Cap canvas at logical pixels — never multiply by devicePixelRatio
    // to avoid massive memory allocation on 3x retina phones
    const resize = () => {
      canvas.width  = canvas.parentElement.clientWidth;
      canvas.height = Math.min(canvas.parentElement.clientHeight, 900); // cap height
      const maxStars = isMobile ? 60 : 200;
      stars = Array.from({ length: Math.min(Math.floor(canvas.width * canvas.height / 8000), maxStars) }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,   o: Math.random(),
        s: Math.random() * 0.01 + 0.003,
      }));
    };
    // On mobile throttle to ~20fps to save battery/RAM
    let lastT = 0;
    const fpsInterval = isMobile ? 50 : 16; // ms
    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - lastT < fpsInterval) return;
      lastT = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.o += s.s; if (s.o > 1 || s.o < 0) s.s = -s.s;
        ctx.save(); ctx.globalAlpha = Math.abs(s.o);
        ctx.fillStyle = "#fff"; ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      });
    };
    window.addEventListener("resize", resize); resize(); raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
};

/* ═══════════════════════════════════════════════════════════════
   SATELLITE
   - Position computed via tilt rotation matrix
   - z-index ALWAYS > 50 (always in front of planet)
   - Scale & subtle opacity vary by depth for 3D realism
   ═══════════════════════════════════════════════════════════════ */
const Satellite = ({ index, total, skill, progress, rx, ry }) => {
  const [hovered, setHovered] = useState(false);
  const angleOffset = (360 / total) * index;

  /* Current angle on the ellipse */
  const angle = useTransform(progress, p => (p + angleOffset) % 360);

  /* Raw position on un-tilted ellipse */
  const rawX = useTransform(angle, a => rx * Math.cos(a * Math.PI / 180));
  const rawY = useTransform(angle, a => ry * Math.sin(a * Math.PI / 180));

  /* Apply tilt rotation */
  const x = useTransform([rawX, rawY], ([px, py]) => px * cosT - py * sinT);
  const y = useTransform([rawX, rawY], ([px, py]) => px * sinT + py * cosT);

  /* depth = sin(angle): +1 fully front, -1 fully back (before tilt) */
  const depth = useTransform(angle, a => Math.sin(a * Math.PI / 180));

  /* Scale: 0.75 (back) → 1.25 (front) */
  const baseScale = useTransform(depth, [-1, 0, 1], [0.72, 0.9, 1.25]);

  /* Subtle opacity — never fully invisible */
  const opacity = useTransform(depth, [-1, 0, 1], [0.55, 0.78, 1.0]);

  const iconUrl = skill.iconUrl || getSkillLogo(skill.name);
  const needInvert = NEED_INVERT.includes((skill.name || "").toLowerCase());

  return (
    <motion.div
      className="absolute flex flex-col items-center cursor-pointer"
      style={{
        x, y,
        scale: hovered ? 1.45 : baseScale,
        opacity,
        zIndex: 75,          /* always in front of planet (z:50) */
        translateX: "-50%",
        translateY: "-50%",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Icon bubble */}
      <div style={{
        width: 52, height: 52, borderRadius: 16, display: "flex",
        alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(12px)",
        background: hovered ? "rgba(99,102,241,0.28)" : "rgba(8,8,20,0.88)",
        border: hovered ? "1.5px solid rgba(139,92,246,0.95)" : "1.5px solid rgba(255,255,255,0.1)",
        boxShadow: hovered
          ? "0 0 26px rgba(99,102,241,0.85), 0 0 55px rgba(99,102,241,0.22)"
          : "0 4px 18px rgba(0,0,0,0.7)",
        transition: "background 0.2s, border 0.2s, box-shadow 0.2s",
      }}>
        {iconUrl
          ? <img src={iconUrl} alt={skill.name} style={{ width: 28, height: 28, objectFit: "contain" }}
              className={needInvert ? "invert brightness-200" : ""} />
          : <Code2 size={20} style={{ color: "#818cf8" }} />}
      </div>

      {/* Tooltip */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? -4 : 4 }}
        transition={{ duration: 0.16 }}
        style={{ position: "absolute", bottom: "calc(100% + 7px)", zIndex: 200, pointerEvents: "none" }}
      >
        <div style={{
          padding: "3px 11px", borderRadius: 9, fontSize: 9, fontWeight: 900,
          letterSpacing: "0.32em", textTransform: "uppercase", whiteSpace: "nowrap",
          background: "rgba(3,3,14,0.97)", border: "1px solid rgba(99,102,241,0.45)",
          color: "#a5b4fc", boxShadow: "0 0 14px rgba(99,102,241,0.28)",
        }}>
          {skill.name}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SPLIT ORBIT RING SVG
   The ellipse is rotated TILT_DEG so one end points top-right,
   the other points bottom-left.

   Back arc  (upper half before rotation → top-right after -45°)
   is drawn behind the planet (z:30).

   Front arc (lower half before rotation → bottom-left after -45°)
   is drawn in front of the planet (z:70).
   ═══════════════════════════════════════════════════════════════ */
const OrbitRingSVG = ({ rx, ry, half }) => {
  // "back" = upper semicircle (M rx,0 → through (0,-ry) → -rx,0)
  // "front" = lower semicircle (M -rx,0 → through (0,+ry) → rx,0)
  const d = half === "back"
    ? `M ${rx},0 A ${rx},${ry} 0 0,0 ${-rx},0`
    : `M ${-rx},0 A ${rx},${ry} 0 0,0 ${rx},0`;

  const size = (rx + 80) * 2;
  const center = size / 2;

  return (
    <svg
      className="absolute pointer-events-none"
      style={{ width: size, height: size, left: "50%", top: "50%",
        transform: "translate(-50%,-50%)", overflow: "visible",
        zIndex: half === "back" ? 30 : 70 }}
      viewBox={`0 0 ${size} ${size}`}
    >
      <g transform={`translate(${center},${center}) rotate(${TILT_DEG})`}>
        {/* Glow layer (simulated with a thicker, semi-transparent path) */}
        <path d={d} fill="none"
          stroke={half === "back" ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.25)"}
          strokeWidth="6" />
        
        {/* Solid base */}
        <path d={d} fill="none"
          stroke={half === "back" ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.38)"}
          strokeWidth="1.5" />
          
        {/* Animated glint */}
        <path d={d} fill="none"
          stroke={half === "back" ? "rgba(139,92,246,0.65)" : "rgba(139,92,246,0.92)"}
          strokeWidth={half === "back" ? 2 : 2.5}
          strokeDasharray="20 3000"
          style={{ animation: `orb-dash ${half === "back" ? 38 : 32}s linear infinite` }} />
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════ */
const OrbitalSkills = ({ skills = [], isDarkMode }) => {
  const [winW, setWinW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const progress = useMotionValue(0);

  useEffect(() => {
    const fn = () => setWinW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  /* Always spinning */
  useAnimationFrame((_, delta) => {
    let next = progress.get() + delta * 0.013;
    if (next >= 360) next -= 360;
    progress.set(next);
  });

  /* Orbit radii — sized to fit screen at -20° tilt */
  const rx = winW < 640 ? 140 : winW < 1024 ? 260 : 400;
  const ry = winW < 640 ?  44 : winW < 1024 ?  78 : 115;
  const planetSize = winW < 640 ? 110 : winW < 1024 ? 150 : 190;

  const isMobile = winW < 768;

  const normalised = useMemo(() => {
    const all = skills?.length
      ? skills.map(s => typeof s === "string" ? { name: s, iconUrl: null } : { name: s?.name ?? "", iconUrl: s?.iconUrl ?? null })
      : ["React","JavaScript","Node.js","MongoDB","TypeScript","Express","Git","Next.js","Docker","Python"].map(n => ({ name: n, iconUrl: null }));
    // Cap at 6 satellites on mobile to reduce useTransform subscriptions
    return isMobile ? all.slice(0, 6) : all;
  }, [skills, isMobile]);

  /* Stage height accounts for tilted orbit overhang */
  const stageH = Math.max(560, (rx + ry) * 1.05);

  return (
    <section id="skills" className="relative w-full overflow-hidden" style={{ background: "#020208" }}>
      <style>{`
        @keyframes orb-dash { from { stroke-dashoffset: 3000; } to { stroke-dashoffset: 0; } }
        @keyframes meteor-trail {
          0%   { transform: translateX(280px) translateY(-200px) rotate(-45deg); opacity:1; }
          80%  { opacity:.4; }
          100% { transform: translateX(-800px) translateY(650px) rotate(-45deg); opacity:0; }
        }
      `}</style>

      <Starfield />

      {/* Nebula */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", top:"8%", left:"4%", width:480, height:280, borderRadius:"50%",
          background:"radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)", filter:"blur(60px)" }} />
        <div style={{ position:"absolute", bottom:"8%", right:"4%", width:380, height:260, borderRadius:"50%",
          background:"radial-gradient(ellipse, rgba(139,92,246,0.09) 0%, transparent 70%)", filter:"blur(60px)" }} />
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)", filter:"blur(80px)" }} />
      </div>

      {/* Meteors — skip on mobile to reduce paint work */}
      {!isMobile && [0,1,2,3,4].map(i => (
        <div key={i} style={{
          position:"absolute", top:`${10+i*14}%`, left:`${65+i*6}%`,
          width:160, height:1.5, borderRadius:999, opacity:0,
          background:"linear-gradient(90deg,transparent,rgba(139,92,246,0.9),#fff,transparent)",
          boxShadow:"0 0 6px rgba(139,92,246,0.8)",
          animation:`meteor-trail ${8+i*3}s linear infinite`,
          animationDelay:`${i*3}s`, pointerEvents:"none",
        }} />
      ))}

      {/* Header */}
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.9 }}
        className="relative z-10 text-center pt-20 pb-2 px-6"
      >
        <span style={{ fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.6em", color:"#818cf8" }}>
          Tech_Galaxy
        </span>
        <h2 className="font-black text-white tracking-tighter leading-none mt-3"
          style={{ fontFamily:"Outfit, sans-serif", fontSize:"clamp(2.8rem,8vw,5.5rem)" }}>
          SKILL{" "}
          <span style={{ backgroundImage:"linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            UNIVERSE
          </span>
        </h2>
        <p style={{ marginTop:12, fontSize:13, fontWeight:300, color:"rgba(148,163,184,0.7)", maxWidth:400, margin:"12px auto 0" }}>
          Tilted orbit · skills always in view · hover to inspect
        </p>
      </motion.div>

      {/* ── ORBITAL STAGE ─────────────────────────────────────── */}
      <div className="relative flex items-center justify-center mx-auto max-w-7xl"
        style={{ minHeight: stageH, overflow:"visible" }}>

        {/* Core glow */}
        <div style={{
          position:"absolute", borderRadius:"50%", pointerEvents:"none",
          width: planetSize * 2.8, height: planetSize * 2.8,
          background:"radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          filter:"blur(40px)",
        }} />

        {/* ── BACK arc — behind planet ─────────────────────── */}
        <OrbitRingSVG rx={rx} ry={ry} half="back" />

        {/* ── PLANET at z:50 ──────────────────────────────── */}
        <motion.div
          initial={{ scale:0.4, opacity:0 }}
          whileInView={{ scale:1, opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:1.5, ease:[0.34,1.56,0.64,1] }}
          style={{ zIndex:50, width:planetSize, height:planetSize, flexShrink:0, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}
        >
          {/* Pulse auras */}
          {[1.5,2.1,2.8].map((s,i) => (
            <motion.div key={i}
              animate={{ scale:[s, s+0.2, s], opacity:[0.1,0.02,0.1] }}
              transition={{ duration:3.5+i, repeat:Infinity, ease:"easeInOut", delay:i*0.8 }}
              style={{ position:"absolute", width:planetSize, height:planetSize, borderRadius:"50%",
                border:"1px solid rgba(99,102,241,0.3)", pointerEvents:"none" }}
            />
          ))}

          {/* Planet sphere */}
          <div style={{
            width:planetSize, height:planetSize, borderRadius:"50%",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            background:`radial-gradient(circle at 33% 27%, #3730a3, #1e1b4b 52%, #04040f 92%)`,
            boxShadow:[
              `inset -${planetSize*.09}px -${planetSize*.09}px ${planetSize*.22}px rgba(0,0,0,0.96)`,
              `inset ${planetSize*.045}px ${planetSize*.045}px ${planetSize*.14}px rgba(99,102,241,0.42)`,
              `0 0 ${planetSize*.32}px rgba(99,102,241,0.58)`,
              `0 0 ${planetSize*.65}px rgba(99,102,241,0.22)`,
            ].join(","),
            position:"relative",
          }}>
            {/* Specular */}
            <div style={{ position:"absolute", borderRadius:"50%", background:"rgba(255,255,255,0.09)",
              width:planetSize*.26, height:planetSize*.13, top:planetSize*.17, left:planetSize*.22,
              filter:"blur(5px)", pointerEvents:"none" }} />
            {/* Spinning scanning ring */}
            <motion.div animate={{ rotate:360 }} transition={{ duration:7, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", inset:-7, borderRadius:"50%", border:"1px solid transparent",
                borderTopColor:"rgba(139,92,246,0.75)", borderRightColor:"rgba(139,92,246,0.28)",
                pointerEvents:"none" }} />
            {/* Text */}
            <div style={{ textAlign:"center", position:"relative", zIndex:1, padding:"0 8px", userSelect:"none" }}>
              <Cpu size={winW<640?13:17} style={{ color:"#a5b4fc", margin:"0 auto 3px", opacity:.72 }} />
              <span style={{ display:"block", fontSize:winW<640?7:9, fontWeight:900,
                textTransform:"uppercase", letterSpacing:"0.42em", color:"rgba(165,180,252,0.8)" }}>
                Developer
              </span>
              <span style={{ display:"block", fontFamily:"Outfit,sans-serif",
                fontSize:winW<640?20:28, fontWeight:900, color:"#fff", lineHeight:1.1 }}>
                {normalised.length}
                <span style={{ color:"#818cf8", fontSize:winW<640?10:14 }}> skills</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── FRONT arc — in front of planet ──────────────── */}
        <OrbitRingSVG rx={rx} ry={ry} half="front" />

        {/* ── SATELLITES — always z:75 (in front) ─────────── */}
        <div style={{ position:"absolute", left:"50%", top:"50%", width:0, height:0, zIndex:0, pointerEvents:"none" }}>
          <div style={{ pointerEvents:"auto" }}>
            {normalised.map((skill, i) => (
              <Satellite
                key={i} index={i} total={normalised.length}
                skill={skill} progress={progress}
                rx={rx} ry={ry}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }}
        viewport={{ once:true }} transition={{ delay:1.2 }}
        style={{ textAlign:"center", paddingBottom:64, fontSize:10, fontWeight:900,
          textTransform:"uppercase", letterSpacing:"0.4em", color:"rgba(255,255,255,0.12)",
          position:"relative", zIndex:10 }}
      >
        ◉ {normalised.length} Technologies · Continuously Orbiting
      </motion.p>
    </section>
  );
};

export default OrbitalSkills;
