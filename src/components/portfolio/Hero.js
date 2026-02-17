import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDownRight, Sparkles } from "lucide-react";

const Hero = ({ name, bio, email, isDarkMode }) => {
  // Animation for individual floating sparkles
  const sparkleVariants = {
    animate: (i) => ({
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.5, 1],
      y: [0, -20, 0],
      transition: {
        duration: 3 + i,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden py-20">
      
      {/* 1. DYNAMIC SPARKLE FIELD */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={sparkleVariants}
            animate="animate"
            className="absolute text-indigo-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center z-10 space-y-10"
      >
        {/* Status Badge with Sparkle Accent */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center"
        >
          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border ${
            isDarkMode ? "border-white/5 bg-white/5" : "border-indigo-100 bg-indigo-50/50"
          } backdrop-blur-md`}>
            <Sparkles size={14} className="text-indigo-400 animate-pulse" />
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? "text-indigo-300" : "text-indigo-600"}`}>
              Nexus System Active
            </span>
          </div>
        </motion.div>

        {/* Main Title with Sparkle 'I' or Dot */}
        <div className="relative inline-block">
          <h1 className={`text-7xl md:text-[10rem] font-black tracking-tighter leading-none ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            {name?.split(" ")[0]}
            <span className="relative text-indigo-500">
              .
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-8 text-indigo-400/50"
              >
                <Sparkles size={40} />
              </motion.div>
            </span>
          </h1>
        </div>

        {/* Bio Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`max-w-2xl mx-auto text-lg md:text-xl ${isDarkMode ? "text-slate-400" : "text-slate-600"} font-light leading-relaxed`}
        >
          {bio || "Engineer of elegant digital solutions and high-performance system architectures."}
        </motion.p>

        {/* Call to Action & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/Shriinamdar2024" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/shrirup-inamdar-179b98328" },
              { icon: Mail, href: `mailto:${email}` }
            ].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -5, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                href={social.href}
                className={`p-4 rounded-2xl border transition-all ${
                  isDarkMode 
                  ? "bg-[#0d0d12] border-white/5 text-slate-400 hover:text-white" 
                  : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="group relative flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold overflow-hidden"
          >
            {/* Sparkle background effect on button hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles size={16} className="relative z-10 group-hover:animate-spin" />
            <span className="relative z-10 text-sm uppercase tracking-widest">Access Files</span>
            <ArrowDownRight size={18} className="relative z-10" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;