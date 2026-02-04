import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowRight, Sparkles } from 'lucide-react';

const Hero = ({ name, bio }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden bg-[#030712]">
      {/* 1. Creative Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.2, 0.4, 0.2],
            x: [0, -70, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" 
        />
        
        {/* Refined Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 text-center"
      >
        {/* 2. Status Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="group relative flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:border-indigo-500/50 transition-colors duration-500 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300 group-hover:text-white transition-colors">
              Available for new projects
            </span>
            <Sparkles size={14} className="ml-1 text-indigo-400" />
          </div>
        </motion.div>

        {/* 3. Hero Title with Reveal Effect */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight text-white leading-none">
            <span className="inline-block hover:scale-[1.02] transition-transform duration-300">
              {name?.split(' ')[0] || "Creative"}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x px-2">
              .
            </span>
          </h1>
        </motion.div>

        {/* 4. Bio with Enhanced Typography */}
        <motion.p 
          variants={itemVariants}
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed font-light mb-10"
        >
          {bio || "Architecting digital experiences through high-performance code and avant-garde design principles."}
        </motion.p>

        {/* 5. Interactive Call to Actions */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="group relative px-8 py-4 bg-indigo-600 rounded-full font-bold text-white overflow-hidden transition-all hover:bg-indigo-500 active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <div className="relative z-10 flex items-center gap-2">
              View My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <div className="flex gap-4">
            {[
              { icon: <Github size={22} />, url: "https://github.com/Shriinamdar2024" },
              { icon: <Linkedin size={22} />, url: "https://www.linkedin.com/in/shrirup-inamdar-179b98328" }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.url}
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all duration-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 6. Bottom Fade for seamless scrolling */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;