import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Star } from "lucide-react";

const ACCENTS = [
  { from: "#7c3aed", to: "#ec4899", shadow: "rgba(124,58,237,0.45)" },
  { from: "#6366f1", to: "#7c3aed", shadow: "rgba(99,102,241,0.4)"  },
  { from: "#8b5cf6", to: "#06b6d4", shadow: "rgba(139,92,246,0.4)"  },
];
const ac = (i) => ACCENTS[i % ACCENTS.length];

/* ─── Single education card ───────────────────────────────────── */
const KnowledgeNode = ({ edu, index, isDarkMode }) => {

  const a = ac(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
      className="relative group"
    >
      <div
        className="relative rounded-[2rem] overflow-hidden transition-all duration-500 cursor-pointer"
        style={{
          background: isDarkMode ? "rgba(12,12,20,0.88)" : "rgba(255,255,255,0.95)",
          border: isDarkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid #e8e0f4",
          boxShadow: isDarkMode ? "0 20px 60px rgba(0,0,0,0.5)" : "0 8px 40px rgba(0,0,0,0.07)",
          backdropFilter: "blur(16px)",
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 24px 80px rgba(0,0,0,0.5), 0 0 50px ${a.shadow}`; e.currentTarget.style.transform = "translateY(-6px) scale(1.01)"; e.currentTarget.style.borderColor = `${a.from}50`; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = isDarkMode ? "0 20px 60px rgba(0,0,0,0.5)" : "0 8px 40px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = isDarkMode ? "rgba(255,255,255,0.07)" : "#e8e0f4"; }}

      >
        {/* Gradient top accent */}
        <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${a.from}, ${a.to})` }} />

        {/* Large faint background icon */}
        <div className="absolute -right-8 -bottom-8 pointer-events-none transition-all duration-700 group-hover:scale-125 group-hover:opacity-[0.06] opacity-[0.025]"
          style={{ color: a.from }}>
          <BookOpen size={180} />
        </div>

        <div className="p-7 sm:p-8 space-y-5 relative z-10">
          {/* Top row */}
          <div className="flex items-start justify-between gap-3">
            <div className="p-3.5 rounded-2xl transition-all duration-500 group-hover:scale-110"
              style={{ background: `${a.from}18`, border: `1px solid ${a.from}28`, color: a.from }}>
              <Award size={22} />
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {edu?.year && (
                <span className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-xl"
                  style={{ background: `${a.from}15`, border: `1px solid ${a.from}25`, color: a.from }}>
                  {edu.year}
                </span>
              )}
              {edu?.status && (
                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}>
                  {edu.status}
                </span>
              )}
            </div>
          </div>

          {/* Degree & College */}
          <div className="space-y-2">
            <h4 className="font-black tracking-tight leading-tight uppercase italic"
              style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.2rem,2.8vw,1.7rem)",
                color: isDarkMode ? "#fff" : "#1e1b4b" }}>
              {edu?.degree}
            </h4>
            <p className="font-black uppercase tracking-[0.18em] text-sm" style={{ color: a.from }}>
              {edu?.college}
            </p>
          </div>

          {/* Grade bar */}
          {edu?.grade && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest"
                  style={{ color: isDarkMode ? "rgba(148,163,184,0.6)" : "#94a3b8" }}>
                  Result / Grade
                </span>
                <span className="text-sm font-black text-white px-4 py-1.5 rounded-xl shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, boxShadow: `0 4px 16px ${a.shadow}` }}>
                  {edu.grade}
                </span>
              </div>
              {/* Animated progress bar (decorative) */}
              <div className="h-1 rounded-full overflow-hidden"
                style={{ background: isDarkMode ? "rgba(255,255,255,0.06)" : "#f1f5f9" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${a.from}, ${a.to})`, boxShadow: `0 0 8px ${a.shadow}` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "80%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 + 0.4 }}
                />
              </div>
            </div>
          )}

          {/* Stars decoration */}
          <div className="flex gap-1 pt-1">
            {[...Array(5)].map((_, si) => (
              <motion.div key={si}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + si * 0.08 + 0.5 }}
              >
                <Star size={11} fill={si < 4 ? a.from : "transparent"} style={{ color: a.from, opacity: si < 4 ? 1 : 0.3 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Index number badge (floating outside card) */}
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-black z-20 shadow-lg"
        style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, boxShadow: `0 0 16px ${a.shadow}` }}>
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   EDUCATION — props: data, isDarkMode (unchanged)
   ═══════════════════════════════════════════════════════════════ */
const Education = ({ data, isDarkMode }) => {
  const education = data?.education ?? [];

  return (
    <section id="education" className="py-24 relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* ── Section header ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-20"
      >
        <motion.div
          whileHover={{ rotate: -6 }}
          className="p-5 rounded-[2.5rem] text-white shadow-2xl mb-8 border border-white/10"
          style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)", boxShadow: "0 20px 60px rgba(124,58,237,0.45)" }}
        >
          <GraduationCap size={32} />
        </motion.div>
        <p className="text-[10px] uppercase tracking-[0.8em] font-black mb-4" style={{ color: "#7c3aed" }}>
          Academic_Foundation
        </p>
        <h2 className="font-black uppercase tracking-tighter leading-none"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(3rem,8vw,6rem)",
            color: isDarkMode ? "#fff" : "#1e1b4b" }}>
          ACADEMICS
        </h2>
        <div className="flex items-center gap-3 mt-6">
          <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #7c3aed)" }} />
          <GraduationCap size={14} className="text-violet-400" />
          <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(90deg, #7c3aed, transparent)" }} />
        </div>

        {/* Stat pill */}
        {education.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border"
            style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "#a78bfa" }}
          >
            <BookOpen size={13} />
            <span className="text-[10px] font-black uppercase tracking-widest">{education.length} Qualifications</span>
          </motion.div>
        )}
      </motion.div>

      {/* ── Cards grid with connecting path ──────────────────── */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">

        {/* Glowing path behind the cards (desktop only) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none hidden lg:block overflow-hidden">
          <div className="absolute inset-0" style={{ background: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)" }} />
          <motion.div
            className="absolute top-0 inset-x-0"
            style={{ background: "linear-gradient(to bottom, #7c3aed, #ec4899)", boxShadow: "0 0 10px rgba(124,58,237,0.6)", transformOrigin: "top" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {education.map((edu, i) => (
            <KnowledgeNode key={i} edu={edu} index={i} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
