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

/* ─── Cinematic Constants ─────────────────────────────────────── */
const TILT_X = 30; // Perspective tilt (degrees)
const ROT_Z = -15; // Slant/Tilt angle (degrees)
const TILT_X_RAD = (TILT_X * Math.PI) / 180;
const ROT_Z_RAD = (ROT_Z * Math.PI) / 180;

const cosX = Math.cos(TILT_X_RAD);
const sinX = Math.sin(TILT_X_RAD);
const cosZ = Math.cos(ROT_Z_RAD);
const sinZ = Math.sin(ROT_Z_RAD);



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
const Satellite = ({ index, total, skill, progress, rx, ry, planetSize }) => {
  const [hovered, setHovered] = useState(false);
  const angleOffset = (360 / total) * index;

  // Orbit rotation with subtle easing variance for "gravitational" feel
  const angle = useTransform(progress, (p) => {
    const raw = (p + angleOffset) % 360;
    // Add a tiny bit of ease-in-out to the linear motion
    const rad = (raw * Math.PI) / 180;
    const smooth = raw + Math.sin(rad * 2) * 2; 
    return smooth;
  });

  /* 3D Projection Math */
  const angleRad = useTransform(angle, (a) => (a * Math.PI) / 180);
  
  // 1. Position on XZ plane (un-tilted orbit)
  const px = useTransform(angleRad, (r) => rx * Math.cos(r));
  const pz = useTransform(angleRad, (r) => rx * Math.sin(r)); // using rx for circular orbit in 3D

  // 2. Rotate around X axis (Tilt)
  // x' = px
  // y' = pz * sinX
  // z' = pz * cosX
  const y2 = useTransform(pz, (z) => z * sinX);
  const z2 = useTransform(pz, (z) => z * cosX);

  // 3. Rotate around Z axis (Cinematic Slant)
  // screenX = x' * cosZ - y' * sinZ
  // screenY = x' * sinZ + y' * cosZ
  const x = useTransform([px, y2], ([xVal, yVal]) => xVal * cosZ - yVal * sinZ);
  const y = useTransform([px, y2], ([xVal, yVal]) => xVal * sinZ + yVal * cosZ);
  
  // Depth Z determines scale, opacity, blur, and zIndex
  // z2 ranges from -rx*cosX to rx*cosX
  const maxDepth = rx * cosX;
  const relativeDepth = useTransform(z2, [-maxDepth, maxDepth], [-1, 1]);

  // Scale: 0.65 (back) → 1.3 (front)
  const baseScale = useTransform(relativeDepth, [-1, 1], [0.65, 1.3]);
  
  // Opacity & Blur
  const opacity = useTransform(relativeDepth, [-1, -0.3, 1], [0.4, 0.7, 1]);
  const blur = useTransform(relativeDepth, [-1, 0, 1], ["2px", "0px", "0px"]);
  
  // Brightness & Glow
  const brightness = useTransform(relativeDepth, [-1, 1], [0.5, 1.2]);
  const boxShadow = useTransform(relativeDepth, [0.5, 1], [
    "0 4px 18px rgba(0,0,0,0.5)",
    "0 0 25px rgba(99,102,241,0.6), 0 0 50px rgba(99,102,241,0.2)"
  ]);

  // Occlusion: zIndex switches at z=0
  const zIndex = useTransform(relativeDepth, (d) => (d > 0 ? 80 : 20));

  const iconUrl = skill.iconUrl || getSkillLogo(skill.name);
  const needInvert = NEED_INVERT.includes((skill.name || "").toLowerCase());

  return (
    <motion.div
      className="absolute flex flex-col items-center cursor-pointer"
      style={{
        x, y,
        scale: hovered ? 1.5 : baseScale,
        opacity,
        zIndex,
        filter: useTransform(blur, (b) => `blur(${b})`),
        translateX: "-50%",
        translateY: "-50%",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Icon bubble */}
      <motion.div 
        style={{
          width: 56, height: 56, borderRadius: 18, display: "flex",
          alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(12px)",
          background: hovered ? "rgba(99,102,241,0.3)" : "rgba(8,8,25,0.9)",
          border: hovered ? "2px solid rgba(139,92,246,1)" : "1.5px solid rgba(255,255,255,0.15)",
          boxShadow,
          filter: useTransform(brightness, (b) => `brightness(${b})`),
          transition: "background 0.3s, border 0.3s, box-shadow 0.3s",
        }}
      >
        {iconUrl
          ? <img src={iconUrl} alt={skill.name} style={{ width: 30, height: 30, objectFit: "contain" }}
              className={needInvert ? "invert brightness-200" : ""} />
          : <Code2 size={24} style={{ color: "#818cf8" }} />}
      </motion.div>

      {/* Tooltip */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? -10 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ position: "absolute", bottom: "calc(100% + 10px)", zIndex: 200, pointerEvents: "none" }}
      >
        <div style={{
          padding: "4px 12px", borderRadius: 10, fontSize: 10, fontWeight: 900,
          letterSpacing: "0.2em", textTransform: "uppercase", whiteSpace: "nowrap",
          background: "rgba(10,10,30,0.95)", border: "1px solid rgba(99,102,241,0.5)",
          color: "#c7d2fe", boxShadow: "0 0 20px rgba(0,0,0,0.5)",
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
const OrbitRingSVG = ({ rx, half }) => {
  // rx is the 3D radius. In projection, it's tilted and slanted.
  // The projected shape is an ellipse.
  // Semi-major axis = rx
  // Semi-minor axis = rx * sinX (apparent vertical height)
  const ry_proj = rx * sinX;
  
  const d = half === "back"
    ? `M ${rx},0 A ${rx},${ry_proj} 0 0,0 ${-rx},0`
    : `M ${-rx},0 A ${rx},${ry_proj} 0 0,0 ${rx},0`;

  const size = (rx + 100) * 2;
  const center = size / 2;

  return (
    <svg
      className="absolute pointer-events-none"
      style={{ width: size, height: size, left: "50%", top: "50%",
        transform: `translate(-50%,-50%) rotate(${ROT_Z}deg)`, overflow: "visible",
        zIndex: half === "back" ? 30 : 70 }}
      viewBox={`0 0 ${size} ${size}`}
    >
      <g transform={`translate(${center},${center})`}>
        {/* Glow layer */}
        <path d={d} fill="none"
          stroke={half === "back" ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.25)"}
          strokeWidth="8" />
        
        {/* Solid base */}
        <path d={d} fill="none"
          stroke={half === "back" ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.4)"}
          strokeWidth="1.5" />
          
        {/* Animated glint */}
        <path d={d} fill="none"
          stroke={half === "back" ? "rgba(139,92,246,0.5)" : "rgba(139,92,246,0.9)"}
          strokeWidth={half === "back" ? 1.5 : 2.5}
          strokeDasharray="30 2000"
          style={{ animation: `orb-dash ${half === "back" ? 45 : 35}s linear infinite` }} />
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
    let next = progress.get() + delta * 0.015; // Slightly faster for smoothness
    if (next >= 360) next -= 360;
    progress.set(next);
  });

  /* ── ORBITAL PARAMETERS ── */
  // Planet size
  const planetSize = winW < 640 ? 120 : winW < 1024 ? 160 : 200;
  
  // Orbit Radius in 3D
  // Rule: Front arc must be OUTSIDE planet.
  // Front-most Y in projection = rx * sinX.
  // We need rx * sinX > (planetSize/2 + satelliteHeight/2 + margin).
  // sin(30deg) = 0.5.
  // If planetSize=200, planetSize/2=100. SatHeight=56, SatHeight/2=28. Total=128.
  // If rx=440, 440 * 0.5 = 220. Plenty of space.
  // Mobile rx adjusted to 200 to ensure 200 * 0.5 = 100 > (60 + 28).
  const rx = winW < 640 ? 200 : winW < 1024 ? 300 : 440;

  const isMobile = winW < 768;

  const normalised = useMemo(() => {
    const all = skills?.length
      ? skills.map(s => typeof s === "string" ? { name: s, iconUrl: null } : { name: s?.name ?? "", iconUrl: s?.iconUrl ?? null })
      : ["React","JavaScript","Node.js","MongoDB","TypeScript","Express","Git","Next.js","Docker","Python"].map(n => ({ name: n, iconUrl: null }));
    // Cap at 6 satellites on mobile to reduce useTransform subscriptions
    return isMobile ? all.slice(0, 6) : all;
  }, [skills, isMobile]);

  /* Stage height accounts for tilted orbit overhang */
  const stageH = Math.max(560, (rx + rx * cosX) * 1.05);

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
        <OrbitRingSVG rx={rx} half="back" />

        {/* ── PLANET at z:50 ──────────────────────────────── */}
        <motion.div
          initial={{ scale:0.4, opacity:0 }}
          whileInView={{ scale:1, opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:1.5, ease:[0.34,1.56,0.64,1] }}
          style={{ zIndex:50, width:planetSize, height:planetSize, flexShrink:0, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}
        >
          {/* Planet Body with Glow */}
          <div style={{
            width:planetSize, height:planetSize, borderRadius:"50%",
            background:`radial-gradient(circle at 30% 30%, #4f46e5, #1e1b4b 60%, #020205 100%)`,
            boxShadow:[
              `inset -10px -10px 30px rgba(0,0,0,0.8)`,
              `inset 10px 10px 25px rgba(165,180,252,0.4)`,
              `0 0 60px rgba(79,70,229,0.4)`,
            ].join(","),
            position:"relative", overflow:"hidden"
          }}>
            {/* Surface Texture / Atmosphere shine */}
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)", opacity:0.5 }} />
            
            {/* Content */}
            <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%" }}>
              <Cpu size={winW<640?16:24} className="text-indigo-300 mb-1 opacity-80" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-indigo-200/60 font-black">Core</span>
              <div className="text-white font-black leading-tight flex items-baseline">
                <span style={{ fontSize: winW<640 ? 24 : 36 }}>{normalised.length}</span>
                <span className="text-xs text-indigo-400 ml-1">SKILLS</span>
              </div>
            </div>
          </div>

          {/* Orbital Aura Rings */}
          {[1.2, 1.6, 2.0].map((s, i) => (
            <motion.div key={i}
              animate={{ scale: [s, s * 1.05, s], opacity: [0.15, 0.05, 0.15] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", width: planetSize, height: planetSize, borderRadius: "50%",
                border: "1px solid rgba(99,102,241,0.2)", pointerEvents: "none" }}
            />
          ))}
        </motion.div>

        {/* ── FRONT arc — in front of planet ──────────────── */}
        <OrbitRingSVG rx={rx} half="front" />

        {/* ── SATELLITES — dynamic zIndex ─────────── */}
        <div style={{ position:"absolute", left:"50%", top:"50%", width:0, height:0, pointerEvents:"none" }}>
          <div style={{ pointerEvents:"auto" }}>
            {normalised.map((skill, i) => (
              <Satellite
                key={i} index={i} total={normalised.length}
                skill={skill} progress={progress}
                rx={rx} planetSize={planetSize}
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
