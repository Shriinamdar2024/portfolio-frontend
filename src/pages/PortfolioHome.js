import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useInView } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Layout,
  Cpu,
  Sun,
  Moon,
  ExternalLink,
  ArrowUpRight,
  Code2,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/portfolio/Hero";
import { Badge } from "../components/ui/Badge";
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

  // Advanced Animation Variants
  const revealVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#0A0A0A] text-slate-300" : "bg-[#F5F5F7] text-slate-900"
      } min-h-screen font-sans selection:bg-indigo-500/30 overflow-x-hidden transition-colors duration-500`}
    >
      {/* 1. INITIAL LOADER - ENHANCED BIOMETRIC FEEL */}
      <AnimatePresence mode="wait">
        {!data && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-[1px] border-indigo-500/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-[1px] border-indigo-500 rounded-full"
              />
              <Code2 className="absolute inset-0 m-auto text-indigo-500" size={24} />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-[1em] text-indigo-500 font-bold ml-[1em]">
                LOADING_SYSTEM
              </span>
              <div className="h-[1px] w-32 bg-white/10 overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="h-full w-full bg-indigo-500"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL PROGRESS - SHARP GRADIENT */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-indigo-500 origin-left z-[110] shadow-[0_0_10px_rgba(99,102,241,0.5)]"
        style={{ scaleX }}
      />

      {/* THEME TOGGLE - MINIMALIST FLOATING */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className={`fixed top-8 right-8 z-50 p-4 rounded-xl border transition-all duration-300 ${
          isDarkMode 
            ? "bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10" 
            : "bg-black/5 border-black/10 text-indigo-600 hover:bg-black/10"
        } backdrop-blur-md`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDarkMode ? "moon" : "sun"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* AMBIENT BACKGROUND - REDUCED MOTION FOR PERFORMANCE */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] ${isDarkMode ? "bg-indigo-500/5" : "bg-indigo-200/20"} blur-[120px] rounded-full`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] ${isDarkMode ? "bg-purple-500/5" : "bg-purple-200/20"} blur-[120px] rounded-full`} />
      </div>

      {data && (
        <>
          <Navbar onSync={setData} isDarkMode={isDarkMode} />

          <main className="max-w-7xl mx-auto px-6 sm:px-12 space-y-32 md:space-y-64 pb-32">
            
            {/* HERO SECTION - ARCHITECTURAL PRECISION */}
            <section className="pt-20 min-h-[90vh] flex flex-col justify-center relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Hero
                  name={data.fullName}
                  bio={data.bio}
                  email={myEmail}
                  isDarkMode={isDarkMode}
                />
              </motion.div>
              
              <div className="absolute bottom-10 left-0 w-full hidden md:flex items-center gap-6">
                <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
                <span className="text-[9px] uppercase tracking-[0.8em] font-bold opacity-30">Scroll_To_Explore</span>
                <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
              </div>
            </section>

            {/* BENTO GRID ABOUT - SHARP EDGES & STRUCTURE */}
            <section id="about" className="grid lg:grid-cols-12 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealVariants}
                className={`lg:col-span-8 p-12 md:p-20 border transition-all duration-500 ${
                  isDarkMode ? "bg-neutral-900/40 border-white/5 hover:border-indigo-500/30" : "bg-white border-neutral-200 shadow-xl shadow-neutral-200/50"
                } relative overflow-hidden group`}
              >
                <div className="flex items-center gap-3 mb-12">
                   <div className="h-1 w-12 bg-indigo-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Identity_Brief</span>
                </div>
                <h2 className={`text-4xl md:text-6xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-12 leading-[1.1] tracking-tight`}>
                  Engineering <span className="text-indigo-500">Functional</span> Digital Products with Scale.
                </h2>
                <p className={`text-lg md:text-xl font-light leading-relaxed max-w-2xl ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {data.aboutMe}
                </p>
                <ArrowUpRight className="absolute top-12 right-12 opacity-5 group-hover:opacity-100 group-hover:text-indigo-500 transition-all duration-700" size={48} />
              </motion.div>

              <div className="lg:col-span-4 grid gap-8">
                <motion.div 
                  variants={revealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`p-12 flex flex-col justify-between border transition-all duration-500 ${
                    isDarkMode ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  }`}
                >
                  <Layout size={32} strokeWidth={1.5} />
                  <div>
                    <div className="text-7xl font-black mb-2 tracking-tighter">{data.projects.length}</div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-80">Completed_Deployments</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={revealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`p-12 border transition-all duration-500 ${
                    isDarkMode ? "bg-neutral-900/40 border-white/5" : "bg-white border-neutral-200"
                  }`}
                >
                  <Cpu size={32} className="text-indigo-500 mb-10" strokeWidth={1.5} />
                  <div className="text-4xl font-black mb-2 tracking-tighter text-indigo-500">{data.skills.length}+</div>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Technical_Capabilities</p>
                </motion.div>
              </div>
            </section>

            {/* TECH STACK - TECHNICAL GRID */}
            <section id="tech-stack" className="space-y-24">
               <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-indigo-500/20 pb-12">
                  <div className="space-y-4">
                    <h3 className={`text-[10px] font-black uppercase tracking-[0.8em] ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}>Core_Competencies</h3>
                    <h2 className={`text-5xl md:text-8xl font-black tracking-tighter ${isDarkMode ? "text-white" : "text-black"}`}>TECH_STACK</h2>
                  </div>
                  <p className={`max-w-xs text-[10px] uppercase tracking-widest leading-loose opacity-50 mt-6 md:mt-0`}>
                    Specialized in building high-performance, scalable web applications using the modern ecosystem.
                  </p>
               </div>
               
               <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[1px] bg-indigo-500/10 border border-indigo-500/10 overflow-hidden"
               >
                  {data.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={revealVariants}
                      whileHover={{ backgroundColor: isDarkMode ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)" }}
                      className={`p-10 ${isDarkMode ? "bg-[#0A0A0A]" : "bg-white"} flex flex-col items-center gap-6 group transition-all cursor-default`}
                    >
                      <div className="relative">
                        {skill.iconUrl ? (
                          <img src={skill.iconUrl} alt={skill.name} className="w-12 h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                        ) : (
                          <Terminal size={32} className="text-slate-500 group-hover:text-indigo-500 transition-colors" />
                        )}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-indigo-500 transition-colors">
                        {typeof skill === 'string' ? skill : skill.name}
                      </span>
                    </motion.div>
                  ))}
               </motion.div>
            </section>

            {/* PROJECTS - HIGH END SHOWCASE */}
            <section id="projects" className="space-y-32">
              <div className="space-y-4">
                  <h2 className={`text-6xl md:text-9xl font-black tracking-tighter leading-none ${isDarkMode ? "text-white" : "text-black"}`}>SELECTED_</h2>
                  <h2 className={`text-6xl md:text-9xl font-black tracking-tighter leading-none text-transparent stroke-text ${isDarkMode ? "text-white" : "text-black"}`} 
                      style={{ WebkitTextStroke: isDarkMode ? '1px rgba(255,255,255,0.1)' : '1px rgba(0,0,0,0.1)' }}>
                    WORKS.
                  </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                {data.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group"
                  >
                    <div className={`relative aspect-[16/10] overflow-hidden border ${isDarkMode ? "border-white/5" : "border-neutral-200"}`}>
                      <img
                        src={project.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors duration-500" />
                      
                      <div className="absolute top-6 right-6 flex gap-2">
                        {project.githubLink && (
                          <a href={project.githubLink} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all">
                            <Github size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-indigo-500 tracking-widest">0{index + 1}</span>
                        <div className="h-[1px] w-12 bg-indigo-500/20" />
                        <div className="flex gap-2">
                          {project.tags?.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[8px] font-bold uppercase tracking-widest opacity-40">{tag}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-start">
                        <h3 className={`text-3xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-black"}`}>
                          {project.title}
                        </h3>
                        {project.liveLink && (
                          <motion.a
                            whileHover={{ x: 5, y: -5 }}
                            href={project.liveLink}
                            className={`p-2 border ${isDarkMode ? "border-white/10 text-white" : "border-black/10 text-black"} hover:bg-indigo-500 hover:border-indigo-500 transition-all`}
                          >
                            <ArrowUpRight size={20} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* EXPERIENCE & EDUCATION - SPLIT TECHNICAL VIEW */}
            <section className="grid lg:grid-cols-2 gap-32">
              <div id="experience" className="space-y-20">
                <div className="flex items-center gap-6">
                  <div className="h-[1px] w-16 bg-indigo-500" />
                  <h2 className={`text-3xl font-black uppercase tracking-widest ${isDarkMode ? "text-white" : "text-black"}`}>Experience</h2>
                </div>

                <div className="space-y-16">
                  {data.experience.map((exp, i) => (
                    <motion.div 
                      key={i} 
                      className="group relative"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    >
                      <span className="text-[10px] font-bold text-indigo-500 tracking-[0.3em] block mb-4 uppercase">{exp.duration}</span>
                      <h4 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"} mb-1`}>{exp.role}</h4>
                      <p className="text-xs font-bold text-indigo-500/60 mb-6 tracking-widest uppercase">@ {exp.company}</p>
                      <p className={`text-base font-light leading-relaxed max-w-xl ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div id="education" className="space-y-20">
                <div className="flex items-center gap-6">
                  <div className="h-[1px] w-16 bg-purple-500" />
                  <h2 className={`text-3xl font-black uppercase tracking-widest ${isDarkMode ? "text-white" : "text-black"}`}>Education</h2>
                </div>
                
                <div className="grid gap-8">
                  {data.education.map((edu, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 10 }}
                      className={`p-10 border transition-all ${
                        isDarkMode ? "bg-neutral-900/20 border-white/5 hover:border-indigo-500/30" : "bg-white border-neutral-100 hover:shadow-xl"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-8">
                        <div className={`p-4 ${isDarkMode ? "bg-white/5" : "bg-indigo-50"} text-indigo-500`}>
                          <GraduationCap size={20} />
                        </div>
                        <span className="text-sm font-black text-indigo-500">{edu.year}</span>
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>{edu.degree}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{edu.college}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          {/* FOOTER - THE IMPACTFUL CLOSURE */}
          <footer className={`${isDarkMode ? "bg-[#050505]" : "bg-white"} border-t ${isDarkMode ? "border-white/5" : "border-black/5"} pt-32 pb-16`}>
            <div className="max-w-7xl mx-auto px-8">
              <div className="flex flex-col items-center text-center space-y-12 mb-32">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="flex items-center gap-4 text-indigo-500"
                >
                  <Sparkles size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em]">Available_For_Projects</span>
                </motion.div>
                <motion.h2 
                  whileInView={{ y: [20, 0], opacity: [0, 1] }}
                  className={`text-[10vw] font-black tracking-tighter leading-none ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  GET_IN_TOUCH.
                </motion.h2>
                <a 
                  href={`mailto:${myEmail}`} 
                  className={`group relative text-xl md:text-4xl font-light overflow-hidden transition-colors py-4 px-8 border ${isDarkMode ? 'border-white/10 hover:border-indigo-500' : 'border-black/10 hover:border-indigo-500'}`}
                >
                  <span className="relative z-10">{myEmail}</span>
                  <motion.div 
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    className="absolute inset-0 bg-indigo-500 -z-0 transition-transform duration-300"
                  />
                </a>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center pt-16 gap-8 opacity-50">
                <div className="flex gap-12">
                  {[
                    { icon: Github, link: data.socials.github, label: "GH" },
                    { icon: Linkedin, link: data.socials.linkedin, label: "LN" },
                    { icon: Mail, link: `mailto:${myEmail}`, label: "EM" },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-bold tracking-widest hover:text-indigo-500 transition-colors"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.5em]">
                  © {new Date().getFullYear()} — SYSTEM_V1.0
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