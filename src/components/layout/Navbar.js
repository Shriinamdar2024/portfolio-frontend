import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeSync from '../portfolio/ResumeSync';
import { Terminal, Cpu, Globe, Layers, Menu, X } from 'lucide-react';

const Navbar = ({ onSync, isDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for "Floating" effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", icon: <Cpu size={14} /> },
    { name: "Experience", href: "#experience", icon: <Layers size={14} /> },
    { name: "Projects", href: "#projects", icon: <Globe size={14} /> },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
        scrolled ? 'md:py-2' : 'md:py-6'
      }`}
    >
      <nav className={`
        mx-auto max-w-7xl h-16 flex items-center justify-between px-6 rounded-2xl
        transition-all duration-500 border
        ${scrolled 
          ? (isDarkMode 
            ? 'bg-[#0d0d12]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
            : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl')
          : 'bg-transparent border-transparent'
        }
      `}>
        
        {/* LOGO: Magnetic Effect & Terminal Icon */}
        <motion.div 
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="p-2.5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20"
            >
              <Terminal size={18} className="text-white" />
            </motion.div>
            <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
          </div>
          
          <span className={`font-black tracking-widest text-sm uppercase hidden sm:block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Shrirup<span className="text-indigo-500 font-serif italic">.</span>Dev
          </span>
        </motion.div>

        {/* DESKTOP MENU: Animated Indicators */}
        <div className="hidden md:flex items-center gap-2">
          <div className={`flex items-center p-1.5 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative flex items-center gap-2 px-5 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider
                  transition-colors group
                  ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600'}
                `}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-1 text-indigo-500">
                  /
                </span>
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className={`w-[1px] h-6 mx-4 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

          {/* SYNC BUTTON: Professional Elevation */}
          <div className="hover:scale-105 transition-transform active:scale-95">
            <ResumeSync onSyncSuccess={(newData) => onSync(newData)} isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* MOBILE TRIGGER */}
        <div className="md:hidden flex items-center gap-4">
          <ResumeSync onSyncSuccess={(newData) => onSync(newData)} isDarkMode={isDarkMode} />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900'}`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU: Fullscreen Blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden mt-4 rounded-2xl border overflow-hidden backdrop-blur-3xl shadow-2xl ${
              isDarkMode ? 'bg-[#0d0d12]/95 border-white/10' : 'bg-white/95 border-slate-200'
            }`}
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 text-sm font-black uppercase tracking-widest p-4 rounded-xl ${
                    isDarkMode ? 'hover:bg-white/5 text-white' : 'hover:bg-slate-50 text-slate-900'
                  }`}
                >
                  <span className="text-indigo-500">{link.icon}</span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;