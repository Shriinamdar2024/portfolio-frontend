import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = ({ isDarkMode, socials }) => {
  return (
    <footer className="pt-8 border-t border-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
      <div className="flex flex-col items-center md:items-start gap-2">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-black text-sm">S</div>
            <span className={`text-xl font-black uppercase tracking-widest ${isDarkMode ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "Outfit, sans-serif" }}>Shrirup</span>
         </div>
         <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">Full-Stack Engineer & UI/UX Designer</p>
      </div>

      <div className="flex items-center gap-8">
        {socials?.github && (
          <a href={socials.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-500 transition-colors">
            <Github size={20} />
          </a>
        )}
        {socials?.linkedin && (
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-500 transition-colors">
            <Linkedin size={20} />
          </a>
        )}
      </div>

      <div className="flex flex-col items-center md:items-end gap-1">
         <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">© {new Date().getFullYear()} Crafted with Passion</p>
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest text-emerald-500 font-black">Systems_Operational</span>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
