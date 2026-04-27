import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Sparkles, Code2, Zap, Globe } from "lucide-react";

/* ─── Typewriter hook (unchanged logic) ───────────────────────── */
const ROLES = [
  "MERN Stack Developer",
  "Frontend Architect",
  "UI / UX Innovator",
  "Full Stack Engineer",
];

function useTypewriter(roles, speed = 75, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setRoleIdx((r) => (r + 1) % roles.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx, roles, speed, pause]);

  return display;
}

/* ─── Particle data — count scaled by device ─────────────────── */
const PARTICLE_COUNT = typeof window !== "undefined"
  ? (window.innerWidth < 768 ? 15 : window.innerWidth < 1024 ? 28 : 40)
  : 40;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  size: Math.random() * 2.5 + 0.5,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  dur: `${7 + Math.random() * 8}s`,
  opacity: Math.random() * 0.4 + 0.1,
}));

/* ─── Animation variants ──────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const slideIn = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 } },
};

/* ═══════════════════════════════════════════════════════════════
   HERO COMPONENT — All props unchanged
   ═══════════════════════════════════════════════════════════════ */
const Hero = ({ name, bio, email, isDarkMode, profileImage, socials }) => {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, -80]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);
  const imageY = useTransform(scrollY, [0, 600], [0, -30]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const role = useTypewriter(ROLES);
  const firstName = name?.split(" ")[0] ?? "Developer";
  const lastName = name?.split(" ").slice(1).join(" ") ?? "";

  /* Count-up for the XP badge */
  const [xp, setXp] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setXp((v) => { if (v >= 1) { clearInterval(timer); return 1; } return v + 0.05; }), 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`relative h-screen flex items-center overflow-hidden pt-16 ${isDarkMode ? "bg-[#08080a] text-white" : "bg-[#f8f9ff] text-slate-900"
        }`}
    >
      {/* ── LAYER 0: Ambient animated mesh blobs ──────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", filter: "blur(70px)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill={isDarkMode ? "#fff" : "#6366f1"} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>

        {/* Floating particles */}
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-indigo-400"
            style={{
              width: p.size, height: p.size,
              top: p.top, left: p.left,
              opacity: p.opacity,
              animationName: "float-particle",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}
      </motion.div>

      {/* ── LAYER 1: Main grid layout ──────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-[1fr_auto] gap-8 xl:gap-12 items-center py-0">

        {/* ── LEFT COLUMN ──────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
          className="flex flex-col gap-4 max-w-3xl"
        >
          {/* Availability badge */}
          <motion.div variants={itemVariants}>
            <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border text-xs font-black uppercase tracking-[0.25em] backdrop-blur-xl transition-all duration-500 ${isDarkMode
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10"
                : "bg-emerald-50 border-emerald-200 text-emerald-600"
              }`}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              Available for new opportunities
              <Sparkles size={12} className="opacity-60" />
            </div>
          </motion.div>

          {/* Name headline */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1
              className="font-black leading-[0.88] tracking-tighter"
              style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
            >
              <span className={isDarkMode ? "text-white" : "text-slate-900"}>{firstName}</span>
              {lastName && (
                <>
                  <br />
                  <span
                    className="font-light tracking-[0.15em] uppercase"
                    style={{ fontSize: "clamp(1.2rem, 3vw, 2.5rem)", letterSpacing: "0.25em" }}
                  >
                    <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>{lastName}</span>
                  </span>
                </>
              )}
            </h1>
            {/* Gradient underline bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
              className="h-1 w-48 rounded-full origin-left"
              style={{ background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)" }}
            />
          </motion.div>

          {/* Typewriter role badge */}
          <motion.div variants={itemVariants}>
            <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-md font-mono text-base md:text-lg font-semibold ${isDarkMode ? "bg-white/[0.03] border-white/10 text-slate-200" : "bg-white border-slate-200 shadow-md text-slate-700"
              }`}>
              <Code2 size={18} className="text-indigo-500 shrink-0" />
              <span className="text-indigo-500 opacity-50">{"<"}</span>
              <span className="text-indigo-400 min-w-[16ch]">{role}</span>
              <span className="text-indigo-500 opacity-50">{"/>"}</span>
              {/* Blinking cursor */}
              <span className="w-0.5 h-5 bg-indigo-400 rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-xl leading-relaxed font-light max-w-xl ${isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
          >
            {bio ||
              "Crafting premium user interfaces and engineering scalable backend systems to bridge design and functionality. Specializing in high-density, performance-optimized web architectures."}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            {/* Primary CTA */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest text-white overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.45)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_100%] animate-shimmer" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }} />
              <span className="relative z-10 flex items-center gap-2">
                Explore Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest border transition-all duration-300 ${isDarkMode
                  ? "border-white/10 text-white hover:border-indigo-500/60 hover:bg-indigo-500/5 shadow-xl"
                  : "border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50 shadow-lg"
                }`}
            >
              <Globe size={15} /> Let's Connect
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 pt-1">
            <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>Connect</span>
            <div className={`h-px w-8 ${isDarkMode ? "bg-white/10" : "bg-slate-300"}`} />
            {[
              { href: socials?.github ?? "https://github.com", icon: Github, label: "GitHub" },
              { href: socials?.linkedin ?? "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -4, scale: 1.18 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-3 rounded-2xl border transition-all duration-300 group ${isDarkMode
                    ? "border-white/8 bg-white/[0.03] text-slate-400 hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-500/5"
                    : "border-slate-200 bg-white text-slate-500 hover:border-indigo-400 hover:text-indigo-600 shadow-sm"
                  }`}
              >
                <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon size={18} className="relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Profile image + floating cards ─────── */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate="visible"
          style={{ y: imageY }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          {/* Outer size wrapper */}
          <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] xl:w-[360px] xl:h-[360px]">

            {/* Rotating gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full hero-gradient-border opacity-50"
            />
            {/* Second slower ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full opacity-20"
              style={{ border: "1px dashed rgba(99,102,241,0.5)" }}
            />

            {/* Glow halo */}
            <div
              className="absolute -inset-4 rounded-full opacity-40 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)", filter: "blur(20px)" }}
            />

            {/* Profile image container */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className={`relative w-full h-full rounded-full overflow-hidden border-4 z-10 shadow-2xl ${isDarkMode ? "border-indigo-500/30 bg-[#0d0d14]" : "border-indigo-300/50 bg-white"
                }`}
            >
              <img
                src={profileImage || "/SIPortfolio.jpeg"}
                alt={firstName}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ filter: "contrast(1.05) saturate(1.1)" }}
              />
              {/* Inner vignette */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(0,0,0,0.4)] pointer-events-none" />
            </motion.div>

            {/* ── FLOATING CARD 1: Code snippet ───────────────────── */}
            <motion.div
              animate={{ y: [-12, 12, -12], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -top-6 -left-8 sm:-left-16 p-4 rounded-2xl border shadow-2xl z-20 backdrop-blur-xl max-w-[200px] ${isDarkMode ? "bg-[#10101c]/95 border-white/8" : "bg-white/95 border-slate-200"
                }`}
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className={`ml-1 text-[8px] font-mono font-bold uppercase tracking-widest ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>app.js</span>
              </div>
              <pre className="text-[9px] sm:text-[10px] font-mono leading-[1.6] overflow-hidden">
                <code>
                  <span className="text-pink-400">const </span>
                  <span className={isDarkMode ? "text-white" : "text-slate-800"}>dev</span>
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}> = {"{"}</span>
                  {"\n"}
                  <span className="text-indigo-400">{"  "}stack</span>
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>: </span>
                  <span className="text-emerald-400">'MERN'</span>
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>,</span>
                  {"\n"}
                  <span className="text-indigo-400">{"  "}passion</span>
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>: </span>
                  <span className="text-emerald-400">'∞'</span>
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>,</span>
                  {"\n"}
                  <span className="text-yellow-400">{"  "}build</span>
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>() {"{"} </span>
                  {"\n"}
                  <span className="text-pink-400">{"    "}return </span>
                  <span className="text-emerald-400">'🚀'</span>
                  {"\n"}
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>  {"}"}</span>
                  {"\n"}
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>{"}"}</span>
                </code>
              </pre>
            </motion.div>

            {/* ── FLOATING CARD 2: XP badge ───────────────────────── */}
            <motion.div
              animate={{ y: [12, -12, 12], rotate: [1.5, -1.5, 1.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className={`absolute -bottom-4 -right-4 sm:-right-14 p-4 rounded-2xl border shadow-2xl z-20 backdrop-blur-xl flex items-center gap-3 ${isDarkMode ? "bg-[#10101c]/95 border-white/8" : "bg-white/95 border-slate-200"
                }`}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}>
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Experience</p>
                <p className={`text-sm font-black ${isDarkMode ? "text-white" : "text-slate-800"}`}>1 yr as intern</p>
                <div className="mt-1 h-1 w-20 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* ── FLOATING CARD 3: Tech stack pills ───────────────── */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className={`absolute top-1/2 -right-2 sm:-right-10 -translate-y-1/2 p-3 rounded-2xl border shadow-xl z-20 backdrop-blur-xl ${isDarkMode ? "bg-[#10101c]/95 border-white/8" : "bg-white/95 border-slate-200"
                }`}
            >
              {["React", "Node", "Mongo"].map((t, i) => (
                <div key={t} className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg mb-1.5 last:mb-0 ${i === 0 ? "bg-cyan-500/15 text-cyan-400"
                    : i === 1 ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-violet-500/15 text-violet-400"
                  }`}>
                  {t}
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className={`text-[9px] uppercase tracking-[0.4em] font-bold ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-indigo-500/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-indigo-500" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
