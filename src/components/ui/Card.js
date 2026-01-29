import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Card = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  
  // Mouse position for Spotlight and Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="perspective-1000 group/card-wrapper" 
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`
          relative overflow-hidden
          bg-[#0d0d12]/60 backdrop-blur-xl
          border border-white/5 
          rounded-[3rem] p-8 md:p-10
          transition-colors duration-500
          shadow-2xl shadow-black/50
          ${className}
        `}
      >
        {/* 1. Spotlight Effect - Follows Mouse */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover/card-wrapper:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(800px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(99, 102, 241, 0.15), transparent 40%)`
            ),
          }}
        />

        {/* 2. Kinetic Border Glow */}
        <div className="absolute inset-0 rounded-[3rem] border border-white/10 group-hover/card-wrapper:border-indigo-500/40 transition-colors duration-700 [mask-image:linear-gradient(120deg,black,transparent)]" />

        {/* 3. Deep Background Elements */}
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none translate-z-[-10px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full group-hover/card-wrapper:bg-indigo-600/20 transition-all duration-1000" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/5 blur-[100px] rounded-full" />
        </div>

        {/* 4. Content Layer - With Parallax Offset */}
        <motion.div 
          style={{ translateZ: "50px" }}
          className="relative z-10 h-full"
        >
          {children}
        </motion.div>

        {/* 5. Professional Corner Accent */}
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover/card-wrapper:opacity-100 transition-opacity duration-500">
           <div className="w-8 h-8 border-t-2 border-r-2 border-indigo-500/30 rounded-tr-xl" />
        </div>

        {/* 6. Dynamic Bottom Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          style={{
            width: "100%",
            scaleX: useSpring(useTransform(mouseX, [-0.5, 0.5], [0.2, 0.8]), { stiffness: 100, damping: 30 })
          }}
        />
      </motion.div>
    </div>
  );
};