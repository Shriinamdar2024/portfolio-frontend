import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Download, Sparkles, ArrowRight, ExternalLink } from "lucide-react";

const Hero = ({ name, bio, resumeUrl }) => {
  // Animation variants for a staggered entrance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20 px-6">
      {/* CREATIVE BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center z-10 max-w-5xl"
      >
        {/* Status Badge */}
        <motion.div variants={item} className="flex justify-center mb-10">
          <div className="group flex items-center gap-3 px-5 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md hover:border-indigo-500/40 transition-all cursor-default">
            <Sparkles size={14} className="text-indigo-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">
              System_Identity_Verified
            </span>
          </div>
        </motion.div>

        {/* FULL NAME - Removed the split logic to show full name from backend */}
        <motion.h1 
          variants={item}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85] select-none"
        >
          {name || "DEVELOPER"}
          <span className="text-indigo-500">.</span>
        </motion.h1>

        {/* BIO */}
        <motion.p 
          variants={item}
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-12"
        >
          {bio || "Crafting high-performance digital architectures with the MERN stack and modern cloud solutions."}
        </motion.p>

        {/* ACTION AREA */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          
          {/* ANIMATED DOWNLOAD BUTTON */}
          <motion.a
            href={resumeUrl} // This comes from your backend portfolio data
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Download size={18} className="relative z-10 group-hover:text-white transition-colors" />
            <span className="relative z-10 group-hover:text-white transition-colors">Download Resume</span>
            <ArrowRight size={18} className="relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </motion.a>

          {/* SOCIAL DOCK */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/Shriinamdar2024" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/shrirup-inamdar-179b98328" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                whileHover={{ y: -5, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                className="p-4 rounded-2xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all backdrop-blur-sm"
              >
                <social.icon size={22} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Visual Accent: Bottom Gradient Shade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;