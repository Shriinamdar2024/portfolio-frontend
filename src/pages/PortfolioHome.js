import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/portfolio/Hero";
import OrbitalSkills from "../components/portfolio/OrbitalSkills";
import About from "../components/portfolio/About";
import Projects from "../components/portfolio/Projects";
import Experience from "../components/portfolio/Experience";
import Education from "../components/portfolio/Education";
import Contact from "../components/portfolio/Contact";
import Footer from "../components/portfolio/Footer";

import {
  Terminal,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence, useInView, useMotionValueEvent } from "framer-motion";
import API from "../services/api";

/* ─── Animated counter hook (Left for potential future use) ────────────────────────────────── */
// eslint-disable-next-line no-unused-vars
function useCountUp(target, duration = 1200) {
  const [count, setCount] = React.useState(0);
  const ref               = useRef(null);
  const inView            = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !target) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ─── Framer variants ──────────────────────────────────────────────────── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════ */
const PortfolioHome = () => {
  const [data, setData]           = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const myEmail = "shriinamdar88@gmail.com";

  /* Scroll progress bar */
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowTopBtn(latest > 600);
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  /* Fetch portfolio data — UNCHANGED */
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const res = await API.get("/portfolio");
        const d   = res.data;
        setData({
          ...d,
          education: d.education || [],
          skills:    d.skills    || [],
          socials:   d.socials   || { github: "", linkedin: "" },
        });
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchPortfolioData();
  }, []);

  const toggleTheme = () => setIsDarkMode(p => !p);

  return (
    <div
      className={`${isDarkMode ? "bg-[#08080a] text-slate-300" : "bg-[#fcfcfd] text-slate-800"} min-h-screen font-sans selection:bg-indigo-500/30 overflow-x-hidden`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Loading Screen ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {!data && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[200] bg-[#050507] flex flex-col items-center justify-center gap-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="w-20 h-20 rounded-full"
                style={{ background: "conic-gradient(#6366f1, #8b5cf6, #ec4899, transparent)", padding: 3 }}
              >
                <div className="w-full h-full rounded-full bg-[#050507] flex items-center justify-center">
                  <Terminal size={28} className="text-indigo-500" />
                </div>
              </motion.div>
              <div className="absolute inset-0 blur-xl bg-indigo-500/20 rounded-full" />
            </div>

            <div className="flex flex-col items-center gap-2">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] uppercase tracking-[0.6em] text-indigo-500 font-black"
              >
                Initializing Portfolio...
              </motion.span>
              <div className="w-48 h-[2px] rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="h-full w-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll Progress Bar ─────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* ── Theme Toggle ────────────────────────────────────── */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`fixed top-24 right-6 z-50 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
          isDarkMode ? "bg-white/5 border-white/10 text-yellow-400" : "bg-black/5 border-black/10 text-indigo-600"
        }`}
        style={{ transition: "background 0.3s, border-color 0.3s" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDarkMode ? "moon" : "sun"}
            initial={{ y: 10, opacity: 0, rotate: -45 }}
            animate={{ y: 0,  opacity: 1, rotate: 0 }}
            exit={{   y: -10, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {isDarkMode ? <Sun size={22} fill="currentColor" /> : <Moon size={22} fill="currentColor" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* ── Ambient background ──────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] ${isDarkMode ? "bg-indigo-700/8" : "bg-indigo-400/4"} blur-[140px] rounded-full`} />
        <div className={`absolute bottom-40 right-1/4 w-[500px] h-[500px] ${isDarkMode ? "bg-violet-700/8" : "bg-violet-400/4"} blur-[130px] rounded-full`} />
        <div className={`absolute inset-0 ${isDarkMode ? "bg-[radial-gradient(#ffffff03_1px,transparent_1px)]" : "bg-[radial-gradient(#00000004_1px,transparent_1px)]"} [background-size:36px_36px]`} />
      </div>

      {data && (
        <>
          <Navbar onSync={setData} isDarkMode={isDarkMode} />

          <Hero
            name={data?.fullName}
            bio={data?.bio}
            email={myEmail}
            isDarkMode={isDarkMode}
            profileImage={data?.profileImage}
            socials={data?.socials}
          />

          <main className="max-w-7xl mx-auto px-6 sm:px-12 space-y-40 md:space-y-56 pb-40 relative z-10">
            <About data={data} isDarkMode={isDarkMode} stagger={stagger} fadeUp={fadeUp} />
            <div className="section-accent" />
          </main>

          <OrbitalSkills skills={data?.skills ?? []} isDarkMode={isDarkMode} />

          <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full pt-20">
            <div className="section-accent" />
          </div>

          <main className="max-w-7xl mx-auto px-6 sm:px-12 space-y-40 md:space-y-56 pb-40 relative z-10 pt-20">
            <Projects 
              data={data} 
              isDarkMode={isDarkMode} 
              selectedProject={selectedProject} 
              setSelectedProject={setSelectedProject} 
            />
            <div className="section-accent" />
            <Experience data={data} isDarkMode={isDarkMode} />
            <div className="section-accent" />
            <Education data={data} isDarkMode={isDarkMode} />
          </main>

          <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full pb-10">
            <div className="section-accent" />
          </div>

          <div className={`relative px-6 sm:px-12 pt-32 pb-12 transition-colors duration-700 ${isDarkMode ? "bg-[#050508]" : "bg-slate-50"}`}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-700/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto space-y-32">
              <Contact isDarkMode={isDarkMode} myEmail={myEmail} />
              <Footer isDarkMode={isDarkMode} socials={data?.socials} />
            </div>
          </div>

          <AnimatePresence>
            {showTopBtn && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{    opacity: 0, scale: 0.5 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-10 right-10 z-[100] w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 flex items-center justify-center hover:bg-indigo-500 transition-colors group"
              >
                <ChevronRight size={24} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default PortfolioHome;
