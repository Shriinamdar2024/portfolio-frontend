import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowRight } from 'lucide-react';

const Hero = ({ name, bio }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    {/* Animated Background Grid */}
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-8"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-medium uppercase tracking-widest">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        Open for opportunities
      </div>

      <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white">
        {name?.split(' ')[0]}<span className="text-gradient">.</span>
      </h1>

      <p className="max-w-xl mx-auto text-lg text-slate-400 leading-relaxed font-light">
        {bio || "Building high-performance applications with the MERN stack and modern cloud architecture."}
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
        
        <div className="flex gap-4">
           <a href="https://github.com/Shriinamdar2024" className="p-3 glass-card rounded-full hover:border-indigo-500/50 transition-all"><Github size={20}/></a>
           <a href="https://www.linkedin.com/in/shrirup-inamdar-179b98328" className="p-3 glass-card rounded-full hover:border-indigo-500/50 transition-all"><Linkedin size={20}/></a>
        </div>
      </div>
    </motion.div>
  </section>
);

export default Hero;