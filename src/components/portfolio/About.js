import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Layout, Terminal, Sparkles, Cpu } from "lucide-react";

const About = ({ data, isDarkMode, stagger, fadeUp }) => {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      className="relative min-h-screen py-24 flex items-center"
    >
      {/* Background ambient text */}
      <div className="absolute top-[10%] left-0 opacity-[0.02] pointer-events-none text-[12rem] md:text-[18rem] font-black leading-none whitespace-nowrap z-0 select-none overflow-hidden" style={{ fontFamily: "Outfit, sans-serif" }}>
        ABOUT ME
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-r from-indigo-500/10 to-violet-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full relative z-10">
        {/* Left: Text Content */}
        <motion.div variants={fadeUp} className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-4">
            <span className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500 shadow-lg shadow-indigo-500/20">
              <UserCheck size={20} />
            </span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-indigo-500 font-black">
              Identity_Brief
            </span>
          </div>
          
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-black ${isDarkMode ? "text-white" : "text-slate-900"} leading-[1.1] tracking-tight`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Bridging the gap between{" "}
            <span className="text-gradient italic font-serif">design</span>{" "}
            & function.
          </h2>

          <div className={`space-y-6 text-lg font-light leading-relaxed max-w-2xl ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            <p>
              {data?.aboutMe || "I am a passionate MERN stack developer dedicated to building high-performance, visually stunning web applications. My career focus lies in creating immersive user experiences backed by robust, scalable architectures."}
            </p>
            
            {/* Premium Stack Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { title: "Frontend UI", desc: "React, Next.js, Framer", icon: Layout },
                { title: "Backend API", desc: "Node.js, Express, MongoDB", icon: Terminal },
              ].map((item, i) => (
                <div key={i} className={`p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] group hover:-translate-y-1 overflow-hidden relative ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:border-indigo-500/30' : 'bg-white border-slate-200 hover:border-indigo-500/30'}`}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-transparent blur-xl rounded-full transition-transform duration-500 group-hover:scale-150" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-sm">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Modern Stat Tiles Masonry layout */}
        <motion.div variants={fadeUp} className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6 relative mt-10 lg:mt-0">
           <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
           
           {/* Column 1 (Flows slightly down) */}
           <div className="flex flex-col gap-4 sm:gap-6 sm:translate-y-12">
             {/* Projects Tile */}
             <div className={`p-6 sm:p-8 rounded-[2rem] border backdrop-blur-md shadow-2xl ${isDarkMode ? 'bg-[#0d0d14]/90 border-white/5 hover:border-indigo-500/30' : 'bg-white border-slate-100 shadow-slate-200/50'} group hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center relative overflow-hidden`}>
                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                  <Layout size={100} />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                  <Layout size={24} />
                </div>
                <div className={`text-5xl font-black tracking-tighter mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: "Outfit, sans-serif" }}>
                  {data?.projects?.length || 0}
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1">Completed Projects</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
             </div>

             {/* Experience Tile */}
             <div className={`p-6 sm:p-8 rounded-[2rem] border backdrop-blur-md shadow-xl ${isDarkMode ? 'bg-[#0d0d14]/90 border-white/5 hover:border-pink-500/30' : 'bg-white border-slate-100'} group hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center relative overflow-hidden`}>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-pink-500/10">
                  <Sparkles size={24} />
                </div>
                <div className={`text-5xl font-black tracking-tighter mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: "Outfit, sans-serif" }}>
                  {data?.experience?.length || 0}
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1">Role Experiences</p>
             </div>
           </div>

           {/* Column 2 (Flows slightly up) */}
           <div className="flex flex-col gap-4 sm:gap-6 sm:-translate-y-4">
             {/* Primary Gradient Tile */}
             <div className={`p-6 sm:p-8 rounded-[2rem] border backdrop-blur-md shadow-2xl shadow-indigo-500/20 group hover:-translate-y-2 transition-all duration-500 overflow-hidden relative h-[220px] sm:h-[260px] flex flex-col justify-center`} style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 blur-2xl rounded-full" />
                <div className="absolute -right-10 -bottom-10 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700">
                   <Cpu size={140} className="text-white" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-6 backdrop-blur-sm relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-inner">
                  <Cpu size={24} />
                </div>
                <div className="text-5xl font-black tracking-tighter mb-2 text-white relative z-10" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {data?.skills?.length || 0}
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-indigo-100 relative z-10">Tech Arsenal</p>
             </div>

             {/* Quality Tile */}
             <div className={`p-6 sm:p-8 rounded-[2rem] border backdrop-blur-md shadow-xl ${isDarkMode ? 'bg-[#0d0d14]/90 border-white/5 hover:border-emerald-500/30' : 'bg-white border-slate-100'} group hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center relative overflow-hidden`}>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                  <Terminal size={24} />
                </div>
                <div className={`text-2xl sm:text-3xl font-black tracking-tighter mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'} leading-tight`} style={{ fontFamily: "Outfit, sans-serif" }}>
                  Clean <br/> Code
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-2">Architecture</p>
             </div>
           </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
