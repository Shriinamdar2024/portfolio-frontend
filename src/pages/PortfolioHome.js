import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/layout/Navbar'; 
import Hero from '../components/portfolio/Hero';
import { Badge } from '../components/ui/Badge';
import { 
  Briefcase, GraduationCap,
  Github,ChevronRight, Linkedin, UserCheck, Mail,  Globe, 
   Terminal, Layout, Cpu, Sun, Moon,
} from 'lucide-react';
import { motion,  useScroll, useSpring } from 'framer-motion';

const PortfolioHome = () => {
  const [data, setData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const myEmail = "shriinamdar88@gmail.com";
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const res = await axios.get('https://shrirupportfolio.onrender.com/api/portfolio');
        const d = res.data;
        setData({
          ...d,
          education: d.education || [],
          skills: d.skills || [], 
          socials: d.socials || { github: '', linkedin: '' }
        });
      } catch (err) { 
        console.error("Fetch Error:", err);
      }
    };
    fetchPortfolioData();
  }, []);

  if (!data) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <motion.div 
          animate={{ 
            rotate: 360,
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            scale: [1, 1.2, 1.2, 1, 1]
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-16 h-16 border-t-4 border-indigo-500 border-r-4 border-r-transparent rounded-xl"
        />
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.5em] text-indigo-500 font-black animate-pulse"
        >
          System_Initializing...
        </motion.span>
      </div>
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`${isDarkMode ? 'bg-[#08080a] text-slate-300' : 'bg-[#fcfcfd] text-slate-800'} min-h-screen font-sans selection:bg-indigo-500/30 overflow-x-hidden transition-colors duration-700`}>
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-[100]" style={{ scaleX }} />

      {/* Theme Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className={`fixed top-24 right-8 z-50 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-black/5 border-black/10 text-indigo-600'}`}
      >
        {isDarkMode ? <Sun size={22} fill="currentColor" /> : <Moon size={22} fill="currentColor" />}
      </motion.button>

      {/* Professional Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] ${isDarkMode ? 'bg-indigo-600/10' : 'bg-indigo-400/5'} blur-[120px] rounded-full`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] ${isDarkMode ? 'bg-purple-600/10' : 'bg-purple-400/5'} blur-[120px] rounded-full`} />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-[radial-gradient(#ffffff03_1px,transparent_1px)]' : 'bg-[radial-gradient(#00000005_1px,transparent_1px)]'} [background-size:40px_40px]`} />
      </div>

      <Navbar onSync={setData} isDarkMode={isDarkMode} />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-12 space-y-32 md:space-y-48 pb-32 relative z-10">
        
        {/* HERO SECTION */}
        <section className="pt-24 min-h-[95vh] flex flex-col justify-center items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Hero name={data.fullName} bio={data.bio} email={myEmail} isDarkMode={isDarkMode} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-20 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Scroll to explore</span>
            <div className={`w-[2px] h-16 bg-gradient-to-b ${isDarkMode ? 'from-indigo-500' : 'from-indigo-300'} to-transparent`} />
          </motion.div>
        </section>

        {/* ORGANIZED BENTO GRID */}
        <motion.section 
          id="about" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid lg:grid-cols-4 gap-6"
        >
          <motion.div 
            variants={fadeInUp}
            className={`${isDarkMode ? 'bg-[#0d0d12]/80 border-white/5' : 'bg-white border-slate-200 shadow-xl'} border p-8 md:p-14 rounded-[3rem] lg:col-span-3 flex flex-col justify-center group relative overflow-hidden backdrop-blur-sm`}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-colors" />
            <div className="flex items-center gap-4 mb-8">
              <span className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><UserCheck size={20}/></span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-indigo-500 font-black">Identity_Brief</span>
            </div>
            <h2 className={`text-4xl md:text-7xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-8 leading-[1.05] tracking-tight`}>
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 italic font-serif">seamless</span> digital experiences.
            </h2>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-lg md:text-2xl font-light leading-relaxed max-w-3xl`}>
              {data.aboutMe || "I bridge the gap between complex backend logic and beautiful, functional user interfaces."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            <motion.div 
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="bg-indigo-600 rounded-[2.5rem] p-10 flex flex-col justify-between text-white overflow-hidden relative group shadow-2xl shadow-indigo-500/30"
            >
              <Layout className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
              <span className="text-[10px] uppercase tracking-widest font-black opacity-80">Portfolio_Size</span>
              <div className="text-5xl md:text-6xl font-black tracking-tighter">{data.projects.length}+ <span className="text-xl opacity-60">Works</span></div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className={`${isDarkMode ? 'bg-[#0d0d12] border-white/5' : 'bg-white border-slate-200 shadow-xl'} border rounded-[2.5rem] p-10 flex flex-col justify-between group transition-all`}
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                 <Cpu size={24} />
              </div>
              <div>
                <span className={`text-[10px] uppercase tracking-widest font-black ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Stack_Complexity</span>
                <div className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} tracking-tighter`}>{data.skills.length} Technologies</div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* PROFESSIONAL TECH STACK */}
        <section id="tech-stack" className="space-y-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-center gap-6 border-l-4 border-indigo-500 pl-8"
          >
            <h2 className={`text-5xl md:text-8xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Engine</h2>
            <p className="max-w-xs text-sm font-medium uppercase tracking-widest opacity-50">Tools and technologies that power my development workflow.</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-5"
          >
            {data.skills.map((skill, index) => {
              const name = typeof skill === 'string' ? skill : skill.name;
              const iconUrl = typeof skill === 'object' ? skill.iconUrl : null;
              
              return (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`relative p-8 rounded-[2rem] overflow-hidden group border ${isDarkMode ? 'bg-[#0d0d12]/50 border-white/5 hover:border-indigo-500/50' : 'bg-white border-slate-100 shadow-lg hover:border-indigo-500/50'} transition-all text-center`}
                >
                  <div className="relative z-10 flex flex-col items-center gap-5">
                    <div className="w-16 h-16 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                        {iconUrl ? (
                          <img src={iconUrl} alt={name} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <Terminal size={32} className="text-indigo-500" />
                        )}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{name}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent translate-y-1 group-hover:translate-y-0 transition-transform" />
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* PROJECT CATALOGUE */}
        <section id="projects" className="space-y-20">
          <div className="flex justify-between items-end">
            <h2 className={`text-5xl md:text-8xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>PROJECTS</h2>
            <div className="hidden md:block h-[2px] flex-1 mx-12 bg-indigo-500/10" />
            <motion.div whileHover={{ x: 5 }} className="flex items-center gap-2 cursor-pointer group">
              <span className="text-xs font-black uppercase tracking-widest">View All</span>
              <ChevronRight className="text-indigo-500 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {data.projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-none" // Optional: custom cursor would be nice here
              >
                <div className={`relative aspect-[16/10] rounded-[3rem] overflow-hidden border-2 ${isDarkMode ? 'border-white/5 bg-zinc-900' : 'border-slate-100 bg-white shadow-2xl'} transition-all duration-700`}>
                  <img 
                    src={project.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">
                    <motion.h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">{project.title}</motion.h3>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                      {project.liveLink && <a href={project.liveLink} className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all"><Globe size={14} /> Live Project</a>}
                      {project.githubLink && <a href={project.githubLink} className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all"><Github size={20} /></a>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="grid lg:grid-cols-2 gap-20">
          <div id="experience" className="space-y-16">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20 text-white"><Briefcase size={30} /></div>
              <h2 className={`text-4xl font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Experience</h2>
            </div>
            <div className="space-y-14 relative before:absolute before:left-[19px] before:top-2 before:h-[95%] before:w-[2px] before:bg-indigo-500/10">
              {data.experience.map((exp, i) => (
                <motion.div key={i} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -30 }} className="relative pl-14 group">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#08080a] border-2 border-indigo-500/20 flex items-center justify-center group-hover:border-indigo-500 transition-colors z-10">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  </div>
                  <span className="text-[11px] font-black text-indigo-500 uppercase tracking-widest mb-3 block">{exp.duration}</span>
                  <h4 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h4>
                  <p className="text-sm text-indigo-400 font-bold mb-6">{exp.company}</p>
                  <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-lg leading-relaxed font-light`}>{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div id="education" className="space-y-16">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-purple-500 rounded-2xl shadow-lg shadow-purple-500/20 text-white"><GraduationCap size={30} /></div>
              <h2 className={`text-4xl font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Education</h2>
            </div>
            <div className="grid gap-8">
              {data.education.map((edu, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className={`${isDarkMode ? 'bg-[#0d0d12]/50 border-white/5 hover:border-purple-500/30' : 'bg-white border-slate-100 shadow-xl'} p-10 rounded-[3rem] border transition-all relative overflow-hidden group`}
                >
                  <div className="absolute right-0 top-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                    <GraduationCap size={120} />
                  </div>
                  <div className="flex justify-between items-start mb-8">
                    <Badge className="bg-indigo-500 text-white border-none px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{edu.status}</Badge>
                    <span className={`text-5xl font-black ${isDarkMode ? 'text-white/5' : 'text-black/5'} group-hover:text-indigo-500/10 transition-colors`}>{edu.grade}</span>
                  </div>
                  <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{edu.degree}</h3>
                  <p className="text-sm text-slate-500 mb-8 font-medium">{edu.college}</p>
                  <div className="text-[10px] text-indigo-500 font-black tracking-[0.5em] uppercase px-4 py-2 bg-indigo-500/5 rounded-lg inline-block">{edu.year}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={`${isDarkMode ? 'bg-[#050507]' : 'bg-slate-50'} pt-32 pb-16 relative overflow-hidden transition-colors`}>
        <div className="max-w-7xl mx-auto px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center space-y-12 mb-32"
            >
              <h2 className={`text-6xl md:text-[12rem] font-black tracking-tighter uppercase leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">TOUCH.</span>
              </h2>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href={`mailto:${myEmail}`} 
                className={`text-2xl md:text-5xl ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} hover:text-indigo-500 transition-colors font-thin tracking-tighter border-b-2 border-indigo-500/20 pb-4`}
              >
                {myEmail}
              </motion.a>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-between pt-16 border-t border-indigo-500/10 gap-10">
              <div className="flex gap-12">
                {[
                  { icon: Github, link: data.socials.github, name: "Github" },
                  { icon: Linkedin, link: data.socials.linkedin, name: "Linkedin" },
                  { icon: Mail, link: `mailto:${myEmail}`, name: "Email" }
                ].map((social, idx) => (
                  <motion.a 
                    key={idx}
                    whileHover={{ y: -5, color: "#6366f1" }}
                    href={social.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`${isDarkMode ? 'text-slate-600' : 'text-slate-400'} transition-colors flex items-center gap-3`}
                  >
                    <social.icon size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{social.name}</span>
                  </motion.a>
                ))}
              </div>
              <p className={`text-[10px] font-black uppercase tracking-[0.6em] ${isDarkMode ? 'text-slate-800' : 'text-slate-300'}`}>
                © {new Date().getFullYear()} {data.fullName.toUpperCase()} — DIGITAL_ENGINEER
              </p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioHome;