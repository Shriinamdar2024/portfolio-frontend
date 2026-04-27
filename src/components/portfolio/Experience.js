import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock, ChevronDown, Zap, MapPin } from "lucide-react";

/* ─── Accent palette per card index ──────────────────────────── */
const ACCENTS = [
  { from: "#6366f1", to: "#8b5cf6", shadow: "rgba(99,102,241,0.45)"  },
  { from: "#06b6d4", to: "#6366f1", shadow: "rgba(6,182,212,0.45)"   },
  { from: "#8b5cf6", to: "#ec4899", shadow: "rgba(139,92,246,0.45)"  },
  { from: "#f59e0b", to: "#ef4444", shadow: "rgba(245,158,11,0.4)"   },
];
const ac = (i) => ACCENTS[i % ACCENTS.length];

/* ─── Single experience card ──────────────────────────────────── */
const MissionCard = ({ exp, index, isDarkMode }) => {
  const [open, setOpen] = useState(false);
  const isLeft = index % 2 === 0;
  const a = ac(index);
  const isCurrent = exp?.duration?.toLowerCase().includes("present") ||
                    exp?.duration?.toLowerCase().includes("current");

  return (
    <div className={`relative flex items-start gap-0 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row pl-16 md:pl-0`}>

      {/* ── Content card ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.08 }}
        className="w-full md:w-[calc(50%-48px)]"
      >
        <div
          onClick={() => setOpen(o => !o)}
          className="group relative rounded-[2rem] border cursor-pointer overflow-hidden transition-all duration-500"
          style={{
            background: isDarkMode ? "rgba(13,13,20,0.85)" : "rgba(255,255,255,0.95)",
            border: isDarkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
            boxShadow: isDarkMode ? "0 20px 60px rgba(0,0,0,0.5)" : "0 8px 40px rgba(0,0,0,0.07)",
            backdropFilter: "blur(16px)",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 24px 80px rgba(0,0,0,0.5), 0 0 40px ${a.shadow}`; e.currentTarget.style.borderColor = `${a.from}55`; e.currentTarget.style.transform = "translateY(-4px)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = isDarkMode ? "0 20px 60px rgba(0,0,0,0.5)" : "0 8px 40px rgba(0,0,0,0.07)"; e.currentTarget.style.borderColor = isDarkMode ? "rgba(255,255,255,0.06)" : "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {/* Gradient top border */}
          <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${a.from}, ${a.to})` }} />

          <div className="p-7 sm:p-8 space-y-4">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.35em] px-3 py-1.5 rounded-xl border"
                    style={{ background: `${a.from}15`, borderColor: `${a.from}30`, color: a.from }}>
                    <Clock size={10} /> {exp?.duration}
                  </span>
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl text-emerald-400"
                      style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
                    </span>
                  )}
                </div>
                <h4 className="font-black tracking-tight leading-tight uppercase"
                  style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.3rem,3vw,1.9rem)",
                    color: isDarkMode ? "#fff" : "#0f172a" }}>
                  {exp?.role}
                </h4>
                <p className="text-sm font-black uppercase tracking-[0.2em] mt-1" style={{ color: a.from }}>
                  {exp?.company}
                </p>
              </div>

              {/* Company logo / initial */}
              <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}>
                {exp?.companyLogo
                  ? <img src={exp.companyLogo} alt={exp.company} className="w-full h-full object-cover" />
                  : (exp?.company?.charAt(0) ?? <Briefcase size={18} />)}
              </div>
            </div>

            {/* Expandable description */}
            <motion.div
              animate={{ height: open || !exp?.description ? "auto" : 60, opacity: 1 }}
              style={{ overflow: "hidden" }}
            >
              <p className="text-sm font-light leading-relaxed"
                style={{ color: isDarkMode ? "rgba(148,163,184,0.8)" : "#64748b" }}>
                {exp?.description}
              </p>
            </motion.div>

            {exp?.description && (
              <button
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors"
                style={{ color: a.from }}
                onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
              >
                {open ? "Collapse" : "Read more"}
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={13} />
                </motion.div>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Centre node — positioned absolutely on the spine ─── */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring", stiffness: 260 }}
          className="relative"
        >
          {isCurrent && (
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ background: a.from }}
            />
          )}
          <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl"
            style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, boxShadow: `0 0 24px ${a.shadow}` }}>
            <Briefcase size={18} />
          </div>
          {/* Index label */}
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white"
            style={{ background: a.to }}>
            {String(index + 1).padStart(2, "0")}
          </div>
        </motion.div>
      </div>

      {/* Mobile node (left side) */}
      <div className="flex md:hidden absolute left-0 top-6 z-20">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg text-xs font-black"
          style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}>
          {index + 1}
        </div>
      </div>

      {/* Spacer for the other side on desktop */}
      <div className="hidden md:block w-[calc(50%-48px)]" />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE — props: data, isDarkMode (unchanged)
   ═══════════════════════════════════════════════════════════════ */
const Experience = ({ data, isDarkMode }) => {
  const experiences = data?.experience ?? [];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* ── Section header ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-20"
      >
        <motion.div
          whileHover={{ rotate: 6 }}
          className="p-5 rounded-[2.5rem] text-white shadow-2xl mb-8 border border-white/10"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 20px 60px rgba(79,70,229,0.45)" }}
        >
          <Briefcase size={32} />
        </motion.div>
        <p className="text-[10px] uppercase tracking-[0.8em] font-black mb-4" style={{ color: "#6366f1" }}>
          Professional_Timeline
        </p>
        <h2 className="font-black uppercase tracking-tighter leading-none"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(3rem,8vw,6rem)",
            color: isDarkMode ? "#fff" : "#0f172a" }}>
          JOURNEY
        </h2>
        <div className="flex items-center gap-3 mt-6">
          <div className="h-px w-16 bg-indigo-500/30" />
          <Zap size={14} className="text-indigo-400" />
          <div className="h-px w-16 bg-indigo-500/30" />
        </div>
      </motion.div>

      {/* ── Timeline spine + cards ───────────────────────────── */}
      <div className="relative max-w-5xl mx-auto px-6 sm:px-10">

        {/* Vertical glowing spine */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 overflow-hidden pointer-events-none">
          {/* Base track */}
          <div className="absolute inset-0" style={{ background: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)" }} />
          {/* Animated energy beam */}
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{ background: "linear-gradient(to bottom, #6366f1, #8b5cf6, #ec4899)", boxShadow: "0 0 12px rgba(99,102,241,0.8)", transformOrigin: "top" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, margin: "-150px" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
          {/* Travelling glow dot */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{ background: "#a5b4fc", boxShadow: "0 0 12px #6366f1, 0 0 24px #6366f1" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Cards */}
        <div className="space-y-16 md:space-y-20 relative">
          {experiences.map((exp, i) => (
            <MissionCard key={i} exp={exp} index={i} isDarkMode={isDarkMode} />
          ))}
        </div>

        {/* End cap */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4, type: "spring" }}
          className="absolute left-4 md:left-1/2 bottom-0 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-indigo-500"
          style={{ background: "#6366f1", boxShadow: "0 0 16px rgba(99,102,241,0.8)" }}
        />
      </div>
    </section>
  );
};

export default Experience;
