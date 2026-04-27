import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeSync from '../portfolio/ResumeSync';
import { Terminal, Cpu, Globe, Layers, Menu, X, GraduationCap, Atom } from 'lucide-react';

const NAV_LINKS = [
  { name: "About", href: "#about", icon: <Cpu size={13} /> },
  { name: "Skills", href: "#skills", icon: <Atom size={13} /> },
  { name: "Projects", href: "#projects", icon: <Globe size={13} /> },
  { name: "Experience", href: "#experience", icon: <Layers size={13} /> },
  { name: "Education", href: "#education", icon: <GraduationCap size={13} /> },
];

const Navbar = ({ onSync, isDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* Scroll shadow + active section tracking */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 px-6 py-4 ${scrolled ? 'md:py-2' : 'md:py-5'
        }`}
    >
      <nav
        className={`
          mx-auto max-w-7xl h-16 flex items-center justify-between px-6 rounded-2xl
          transition-all duration-500 border
          ${scrolled
            ? (isDarkMode
              ? 'bg-[#0d0d14]/85 backdrop-blur-xl border-white/8 shadow-[0_8px_40px_rgba(0,0,0,0.6)]'
              : 'bg-white/85 backdrop-blur-xl border-slate-200 shadow-xl')
            : 'bg-transparent border-transparent'
          }
        `}
      >
        {/* ── Logo ──────────────────────────────────────────── */}
        <motion.a
          href="/"
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="p-2.5 rounded-xl shadow-lg shadow-indigo-500/20"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              <Terminal size={17} className="text-white" />
            </motion.div>
            <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </div>
          <span
            className={`font-black tracking-widest text-sm uppercase hidden sm:block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Shrirup<span className="text-indigo-500 italic" style={{ fontFamily: "Georgia, serif" }}>.</span>Dev
          </span>
        </motion.a>

        {/* ── Desktop Nav ───────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-2">
          <div className={`flex items-center p-1.5 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
            {NAV_LINKS.map(link => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`
                    relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all overflow-hidden group
                    ${isActive
                      ? 'text-indigo-400'
                      : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600')
                    }
                  `}
                >
                  <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                  <span className="relative z-10">{link.name}</span>

                  {/* Underline animated hover effect */}
                  <div className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-indigo-500 transition-transform duration-300 origin-center ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />

                  {/* Subtle glow for active item */}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none" />
                  )}
                </motion.a>
              );
            })}
          </div>

          <div className={`w-[1px] h-6 mx-3 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

          {/* Sync button */}
          <div className="hover:scale-105 transition-transform active:scale-95">
            <ResumeSync onSyncSuccess={newData => onSync(newData)} isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* ── Mobile Trigger ───────────────────────────────── */}
        <div className="md:hidden flex items-center gap-3">
          <ResumeSync onSyncSuccess={newData => onSync(newData)} isDarkMode={isDarkMode} />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(o => !o)}
            className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900'}`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* ── Mobile Menu ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden mt-3 rounded-2xl border overflow-hidden backdrop-blur-3xl shadow-2xl ${isDarkMode ? 'bg-[#0d0d14]/95 border-white/8' : 'bg-white/95 border-slate-200'
              }`}
          >
            <div className="flex flex-col p-5 gap-1">
              {NAV_LINKS.map(link => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-4 text-sm font-black uppercase tracking-widest p-4 rounded-xl transition-colors ${isActive
                        ? 'text-indigo-400 bg-indigo-500/10'
                        : (isDarkMode ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-slate-50 text-slate-800')
                      }`}
                  >
                    <span className="text-indigo-500">{link.icon}</span>
                    {link.name}
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;