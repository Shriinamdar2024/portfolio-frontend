import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/portfolio/Hero";
import { Badge } from "../components/ui/Badge";
import {
  Briefcase,
  GraduationCap,
  Github,
  ChevronRight,
  Linkedin,
  UserCheck,
  Mail,
  Globe,
  Terminal,
  Layout,
  Cpu,
  Sun,
  Moon,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence, useInView } from "framer-motion";
import API from "../services/api";

const PortfolioHome = () => {
  const [data, setData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const myEmail = "shriinamdar88@gmail.com";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const res = await API.get("/portfolio");
        const d = res.data;
        setData({
          ...d,
          education: d.education || [],
          skills: d.skills || [],
          socials: d.socials || { github: "", linkedin: "" },
        });
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchPortfolioData();
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Animation variants for consistency
  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div
      className={`${isDarkMode ? "bg-[#030303] text-slate-300" : "bg-[#f8f9fa] text-slate-900"} min-h-screen font-sans selection:bg-indigo-500/30 overflow-x-hidden transition-colors duration-1000`}
    >
      {/* 1. INITIAL LOADER - STYLIZED */}
      <AnimatePresence mode="wait">
        {!data && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[200] bg-[#000] flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-24 h-24 border-t-2 border-indigo-500 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-600 to-purple-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className={`fixed top-8 right-8 z-50 p-4 rounded-full backdrop-blur-2xl border transition-all duration-500 ${isDarkMode ? "bg-white/5 border-white/10 text-yellow-400" : "bg-black/5 border-black/10 text-indigo-600 shadow-xl"}`}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      {/* Professional Ambient Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute top-[-10%] left-[10%] w-[600px] h-[600px] ${isDarkMode ? "bg-indigo-600/10" : "bg-indigo-400/5"} blur-[150px] rounded-full`}
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className={`absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] ${isDarkMode ? "bg-purple-600/10" : "bg-purple-400/5"} blur-[150px] rounded-full`}
        />
      </div>

      {data && (
        <>
          <Navbar onSync={setData} isDarkMode={isDarkMode} />

          <main className="max-w-7xl mx-auto px-6 sm:px-12 space-y-40 pb-32 relative z-10">
            {/* HERO SECTION */}
            <section className="pt-10 min-h-screen flex flex-col justify-center items-center">
              <Hero name={data.fullName} bio={data.bio} email={myEmail} isDarkMode={isDarkMode} />
            </section>

            {/* CREATIVE ABOUT BENTO */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <motion.div
                variants={revealVariants}
                className={`${isDarkMode ? "bg-[#0d0d12] border-white/5" : "bg-white border-slate-200 shadow-2xl"} border p-10 md:p-16 rounded-[3.5rem] lg:col-span-2 relative overflow-hidden group`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><UserCheck size={18}/></div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black text-indigo-500">The_Philosophy</span>
                </div>
                <h2 className={`text-4xl md:text-7xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"} mb-8 leading-[1.1]`}>
                  Building for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 italic">next generation</span> of the web.
                </h2>
                <p className={`${isDarkMode ? "text-slate-400" : "text-slate-600"} text-lg md:text-2xl font-light leading-relaxed`}>
                  {data.aboutMe}
                </p>
              </motion.div>

              <div className="grid gap-6">
                <motion.div
                  variants={revealVariants}
                  whileHover={{ y: -5 }}
                  className="bg-indigo-600 rounded-[2.5rem] p-10 flex flex-col justify-between text-white relative overflow-hidden group"
                >
                  <Layout className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                  <span className="text-[10px] uppercase tracking-widest font-black opacity-60">Projects</span>
                  <div className="text-7xl font-black">{data.projects.length}+</div>
                </motion.div>
                <motion.div
                  variants={revealVariants}
                  whileHover={{ y: -5 }}
                  className={`${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-slate-200"} border rounded-[2.5rem] p-10 flex flex-col justify-between`}
                >
                  <Cpu className="text-indigo-500" size={32} />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-500">Experience</span>
                    <div className="text-4xl font-black">{data.experience.length} Positions</div>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* TECH STACK GRID */}
            <section id="tech-stack" className="space-y-16">
              <div className="flex items-end gap-4">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter">ENGINE.</h2>
                <div className="h-px flex-1 bg-indigo-500/20 mb-4 ml-4 hidden md:block" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {data.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -10, backgroundColor: isDarkMode ? "rgba(99, 102, 241, 0.05)" : "rgba(99, 102, 241, 0.02)" }}
                    className={`p-10 rounded-[2.5rem] border ${isDarkMode ? "bg-[#0d0d12]/60 border-white/5" : "bg-white border-slate-100"} transition-all flex flex-col items-center gap-4`}
                  >
                    {skill.iconUrl ? (
                      <img src={skill.iconUrl} alt={skill.name} className="w-12 h-12 grayscale group-hover:grayscale-0 transition-all" />
                    ) : (
                      <Terminal size={32} className="text-indigo-500" />
                    )}
                    <span className="text-[9px] font-black uppercase tracking-widest text-center">{skill.name || skill}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* PROJECTS CATALOGUE */}
            <section id="projects" className="space-y-20">
              <div className="flex justify-between items-center">
                <h2 className="text-6xl md:text-9xl font-black tracking-tighter">WORKS</h2>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest font-black opacity-40">Scroll to explore</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {data.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className={`relative aspect-video rounded-[3rem] overflow-hidden border ${isDarkMode ? "border-white/5 bg-zinc-900" : "border-slate-100 bg-white shadow-xl"} transition-all duration-700`}>
                      <img
                        src={project.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[80%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1s]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-8 right-8 flex gap-2">
                        {project.liveLink && (
                          <motion.a href={project.liveLink} whileHover={{ scale: 1.1 }} className="p-4 bg-white text-black rounded-full shadow-xl"><ArrowUpRight size={20}/></motion.a>
                        )}
                      </div>
                      <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                        <div className="flex gap-2">
                          <span className="text-[10px] text-white/60 font-black uppercase tracking-widest">Full Case Study — 2024</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* EXPERIENCE & EDUCATION SPLIT */}
            <section className="grid lg:grid-cols-2 gap-20 border-t border-indigo-500/10 pt-40">
              <div id="experience" className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-indigo-500" />
                  <h2 className="text-2xl font-black uppercase tracking-widest">Experience</h2>
                </div>
                {data.experience.map((exp, i) => (
                  <motion.div key={i} whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} className="relative pl-8 border-l-2 border-indigo-500/20 group pb-12">
                    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-indigo-500 scale-0 group-hover:scale-100 transition-transform" />
                    <span className="text-[11px] font-black text-indigo-500 mb-2 block">{exp.duration}</span>
                    <h4 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{exp.role}</h4>
                    <p className="text-indigo-500 text-sm font-bold mb-4">{exp.company}</p>
                    <p className="text-slate-400 font-light leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>

              <div id="education" className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-purple-500" />
                  <h2 className="text-2xl font-black uppercase tracking-widest">Education</h2>
                </div>
                {data.education.map((edu, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className={`${isDarkMode ? "bg-white/5" : "bg-white shadow-lg"} p-8 rounded-[2rem] border border-white/5`}
                  >
                    <div className="flex justify-between items-start mb-6">
                       <Badge className="bg-indigo-500/10 text-indigo-500 border-none px-4 py-1 rounded-full text-[10px]">{edu.year}</Badge>
                       <span className="text-3xl font-black opacity-10">{edu.grade}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                    <p className="text-sm text-slate-500">{edu.college}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </main>

          {/* MINIMALIST PROFESSIONAL FOOTER */}
          <footer className={`mt-40 ${isDarkMode ? "bg-[#050505]" : "bg-slate-100"} py-20 border-t border-indigo-500/10`}>
            <div className="max-w-7xl mx-auto px-8 flex flex-col items-center">
              <motion.h2 
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                className="text-6xl md:text-[10rem] font-black tracking-tighter opacity-10 mb-20"
              >
                SHRIRUP.
              </motion.h2>
              <div className="flex flex-col md:flex-row justify-between w-full items-center gap-10">
                <div className="flex gap-8">
                  {[
                    { icon: Github, link: data.socials.github },
                    { icon: Linkedin, link: data.socials.linkedin },
                    { icon: Mail, link: `mailto:${myEmail}` }
                  ].map((social, idx) => (
                    <a key={idx} href={social.link} className="p-4 rounded-2xl bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors">
                      <social.icon size={20} className="text-indigo-500" />
                    </a>
                  ))}
                </div>
                <p className="text-[10px] font-black tracking-[0.5em] text-slate-500">
                  © {new Date().getFullYear()} — {data.fullName.toUpperCase()}
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default PortfolioHome;