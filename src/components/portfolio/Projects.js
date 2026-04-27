import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Globe, Github, ArrowUpRight, X, ExternalLink, Layers, Zap } from "lucide-react";

/* ─── 3D tilt hook ───────────────────────────────────────────── */
function useTilt(strength = 15) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { stiffness: 300, damping: 30 });

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

/* ─── Accent colours per index ──────────────────────────────── */
const ACCENTS = [
  { from: "#6366f1", via: "#8b5cf6", to: "#ec4899", shadow: "rgba(99,102,241,0.4)"  },
  { from: "#06b6d4", via: "#6366f1", to: "#8b5cf6", shadow: "rgba(6,182,212,0.4)"   },
  { from: "#f59e0b", via: "#ef4444", to: "#ec4899", shadow: "rgba(245,158,11,0.35)" },
  { from: "#10b981", via: "#06b6d4", to: "#6366f1", shadow: "rgba(16,185,129,0.35)" },
];

const accent = (i) => ACCENTS[i % ACCENTS.length];

/* ════════════════════════════════════════════════════════════════
   PROJECT MODAL — unchanged data bindings
   ════════════════════════════════════════════════════════════════ */
const ProjectModal = ({ project, isDarkMode, onClose }) => {
  if (!project) return null;
  const a = accent(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative max-w-3xl w-full rounded-[2.5rem] overflow-hidden border shadow-2xl ${
          isDarkMode ? "bg-[#0a0a10] border-white/8" : "bg-white border-slate-200"
        }`}
      >
        {/* Cover */}
        <div className="relative aspect-[16/7] overflow-hidden">
          <img
            src={project.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
            alt={project.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${isDarkMode ? "#0a0a10" : "#fff"} 0%, transparent 60%)` }} />
          {/* Scanning line effect */}
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            className="absolute inset-x-0 h-[2px] opacity-40 pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${a.from}, transparent)` }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors z-10"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-0 left-0 p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2" style={{ color: a.from }}>Case Study</p>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tighter" style={{ fontFamily: "Outfit, sans-serif" }}>
              {project.title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {project.description && (
            <p className={`text-base leading-relaxed font-light ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              {project.description}
            </p>
          )}
          {project.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border cursor-default"
                  style={{ background: `${a.from}15`, borderColor: `${a.from}30`, color: a.from }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveLink && (
              <motion.a
                href={project.liveLink} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl"
                style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, boxShadow: `0 0 30px ${a.shadow}` }}
              >
                <Globe size={14} /> Live Project <ArrowUpRight size={13} />
              </motion.a>
            )}
            {project.githubLink && (
              <motion.a
                href={project.githubLink} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border transition-colors ${
                  isDarkMode ? "border-white/10 text-white hover:border-indigo-500/50 hover:bg-white/5" : "border-slate-200 text-slate-700 hover:border-indigo-400"
                }`}
              >
                <Github size={14} /> Source Code
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════════════
   FEATURED PROJECT CARD (first project — large spotlight)
   ════════════════════════════════════════════════════════════════ */
const FeaturedCard = ({ project, isDarkMode, onClick }) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(8);
  const a = accent(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: isDarkMode ? "#0d0d14" : "#fff",
          border: isDarkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
          boxShadow: isDarkMode ? `0 40px 120px rgba(0,0,0,0.6)` : "0 20px 80px rgba(0,0,0,0.08)",
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className="relative group cursor-pointer rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-2xl"
      >
        {/* Image */}
        <div className="relative h-[340px] sm:h-[420px] overflow-hidden">
          <img
            src={project?.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
            alt={project?.title}
            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />

          {/* HUD corner brackets */}
          {[["top-4 left-4", "border-t-2 border-l-2"], ["top-4 right-4", "border-t-2 border-r-2"], ["bottom-4 left-4", "border-b-2 border-l-2"], ["bottom-4 right-4", "border-b-2 border-r-2"]].map(([pos, border], i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6 ${border} opacity-0 group-hover:opacity-60 transition-all duration-500 rounded-sm`} style={{ borderColor: a.from }} />
          ))}

          {/* Scanning line */}
          <motion.div
            animate={{ y: ["-100%", "400%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            className="absolute inset-x-0 h-px opacity-0 group-hover:opacity-50 pointer-events-none transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${a.from}, transparent)` }}
          />

          {/* Featured badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] text-white"
              style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}>
              ★ Featured
            </span>
            <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border backdrop-blur-md ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white/80 border-slate-200 text-slate-600"}`}>
              Case Study
            </span>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 inset-x-0 p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-8 rounded-full" style={{ background: a.from }} />
              <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: a.from }}>Project_01</span>
            </div>
            <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none uppercase mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              {project?.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project?.techStack?.slice(0, 4).map((tech, i) => (
                <span key={i} className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white border border-white/15 backdrop-blur-md bg-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div className="p-6 sm:p-8 flex items-center justify-between gap-4">
          <p className={`text-sm font-light leading-relaxed line-clamp-2 max-w-lg ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            {project?.description || "A premium digital solution engineered for performance and scalability."}
          </p>
          <motion.div
            whileHover={{ scale: 1.15, rotate: 45 }}
            className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════════════
   SECONDARY PROJECT CARD
   ════════════════════════════════════════════════════════════════ */
const ProjectCard = ({ project, index, isDarkMode, onClick }) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(12);
  const a = accent(index + 1);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: isDarkMode ? "#0d0d14" : "#fff",
          border: isDarkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid #e2e8f0",
          boxShadow: hovered
            ? `0 30px 80px rgba(0,0,0,0.4), 0 0 40px ${a.shadow}`
            : isDarkMode ? "0 20px 60px rgba(0,0,0,0.5)" : "0 8px 40px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.4s ease",
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={onClick}
        className="relative group cursor-pointer rounded-[2rem] overflow-hidden transition-colors duration-500"
      >
        {/* Gradient top border */}
        <div className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, ${a.from}, ${a.to})` }} />

        {/* Image */}
        <div className="relative h-[200px] sm:h-[240px] overflow-hidden">
          <img
            src={project?.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
            alt={project?.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Index label */}
          <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white"
            style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}>
            {String(index + 2).padStart(2, "0")}
          </div>

          {/* Hover overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center gap-3 backdrop-blur-sm bg-black/50"
              >
                {project?.liveLink && (
                  <motion.a
                    href={project.liveLink} target="_blank" rel="noreferrer"
                    initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.08 }}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-white shadow-xl"
                    style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, boxShadow: `0 0 20px ${a.shadow}` }}
                  >
                    <Globe size={13} /> Live Demo
                  </motion.a>
                )}
                {project?.githubLink && (
                  <motion.a
                    href={project.githubLink} target="_blank" rel="noreferrer"
                    initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.08 }}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-white border border-white/20 bg-white/10 backdrop-blur-md"
                  >
                    <Github size={13} /> Source
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`text-xl font-black tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              style={{ backgroundImage: `linear-gradient(135deg, ${a.from}, ${a.to})` }}>
              {project?.title}
            </h3>
            <motion.div
              animate={{ rotate: hovered ? 45 : 0 }}
              className="shrink-0 p-2 rounded-xl"
              style={{ background: `${a.from}15`, color: a.from }}
            >
              <ExternalLink size={16} />
            </motion.div>
          </div>

          <p className={`text-sm font-light leading-relaxed line-clamp-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            {project?.description || "An innovative digital solution designed for performance and scale."}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project?.techStack?.slice(0, 4).map((tech, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.08, y: -1 }}
                className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border"
                style={{ background: `${a.from}10`, borderColor: `${a.from}25`, color: a.from }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════════════
   MAIN PROJECTS SECTION
   ════════════════════════════════════════════════════════════════ */
const Projects = ({ data, isDarkMode, selectedProject, setSelectedProject }) => {
  const featured  = data?.projects?.[0];
  const secondary = data?.projects?.slice(1) ?? [];

  return (
    <>
      <section id="projects" className="py-24 space-y-20 relative overflow-hidden">

        {/* Section background glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full pointer-events-none -z-10"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none -z-10"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />

        {/* ── Section header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Layers size={18} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-indigo-500 font-black">Portfolio_Showcase</span>
            </div>
            <h2
              className={`font-black tracking-tighter leading-none ${isDarkMode ? "text-white" : "text-slate-900"}`}
              style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              FEATURED{" "}
              <span className="text-gradient">WORK</span>
            </h2>
          </div>

          <div className={`flex items-center gap-6 p-5 rounded-2xl border ${isDarkMode ? "bg-white/[0.03] border-white/8" : "bg-indigo-50 border-indigo-100"}`}>
            <div className="text-center">
              <div className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "Outfit, sans-serif" }}>
                {data?.projects?.length ?? 0}
              </div>
              <p className="text-[9px] uppercase tracking-widest font-bold text-indigo-400 mt-0.5">Projects</p>
            </div>
            <div className={`h-10 w-px ${isDarkMode ? "bg-white/10" : "bg-indigo-200"}`} />
            <div className="text-center">
              <div className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "Outfit, sans-serif" }}>
                <Zap size={24} className="text-indigo-500 mx-auto" />
              </div>
              <p className="text-[9px] uppercase tracking-widest font-bold text-indigo-400 mt-0.5">Live</p>
            </div>
          </div>
        </motion.div>

        {/* ── Featured project (first) ────────────────────────── */}
        {featured && (
          <FeaturedCard
            project={featured}
            isDarkMode={isDarkMode}
            onClick={() => setSelectedProject(featured)}
          />
        )}

        {/* ── Secondary grid ──────────────────────────────────── */}
        {secondary.length > 0 && (
          <>
            <div className="flex items-center gap-4">
              <div className={`h-px flex-1 ${isDarkMode ? "bg-white/5" : "bg-slate-200"}`} />
              <span className="text-[9px] uppercase tracking-[0.5em] font-black text-slate-500">More Projects</span>
              <div className={`h-px flex-1 ${isDarkMode ? "bg-white/5" : "bg-slate-200"}`} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {secondary.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  isDarkMode={isDarkMode}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isDarkMode={isDarkMode}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
