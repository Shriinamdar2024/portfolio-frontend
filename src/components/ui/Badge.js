import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Badge = ({ children, className = "" }) => {
  // Magnetic movement variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Subtle tilt effect on hover
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.08 }}
      className="inline-block perspective-1000"
    >
      <motion.span
        className={`
          relative overflow-hidden inline-flex items-center justify-center
          px-5 py-2 rounded-full border 
          bg-indigo-500/5 border-indigo-500/30 
          backdrop-blur-md
          text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]
          transition-all duration-500 select-none cursor-pointer
          shadow-[0_0_20px_rgba(79,70,229,0.1)]
          hover:border-indigo-400 hover:text-white hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]
          ${className}
        `}
      >
        {/* Glowing Background Follower */}
        <motion.div
          style={{
            x: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]),
          }}
          className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
        />

        {/* Animated Glossy Shimmer (Refined) */}
        <motion.span
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            repeatDelay: 1
          }}
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg] z-10"
        />

        {/* Live Indicator Dot */}
        <span className="relative flex h-2 w-2 mr-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-40"></span>
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500 border border-white/20 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
          />
        </span>

        <span className="relative z-20 flex items-center gap-1">
          {children}
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-[8px] opacity-60 ml-1"
          >
            ●
          </motion.span>
        </span>
      </motion.span>
    </motion.div>
  );
};