import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowDown, Terminal } from "lucide-react";

const Contact = ({ isDarkMode, myEmail }) => {
  return (
    <motion.section 
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-[3rem] border overflow-hidden p-8 md:p-16 lg:p-20 shadow-2xl ${isDarkMode ? "bg-gradient-to-b from-[#10101c] to-[#0a0a10] border-white/5" : "bg-gradient-to-b from-white to-white border-indigo-100"}`}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 relative z-10 items-center">
        <div className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.6em] text-indigo-500 font-black">Get_In_Touch</p>
          <h2 className={`text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95] ${isDarkMode ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "Outfit, sans-serif" }}>
            Let's <span className="text-gradient">Build</span> Together.
          </h2>
          <p className={`text-base font-light leading-relaxed max-w-md ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            I'm currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open!
          </p>
          <div className="pt-6">
            <a href={`mailto:${myEmail}`} className={`inline-flex items-center gap-4 group px-6 py-4 rounded-2xl border transition-all ${isDarkMode ? "bg-white/5 border-white/10 hover:border-indigo-500 hover:bg-white/10 text-white" : "bg-slate-50 border-slate-200 hover:border-indigo-500 text-slate-900"}`}>
               <Mail size={20} className="text-indigo-500" />
               <span className="font-bold tracking-wide">{myEmail}</span>
               <ArrowDown size={16} className="-rotate-90 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-indigo-500" />
            </a>
          </div>
        </div>

        <div>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative group">
                <input type="text" required id="name" placeholder=" " className={`floating-input peer w-full bg-transparent px-6 py-4 rounded-xl border outline-none font-medium transition-all duration-300 focus:border-indigo-500 focus:shadow-[0_0_25px_rgba(99,102,241,0.15)] ${isDarkMode ? "border-white/10 text-white placeholder-transparent" : "border-slate-200 text-black shadow-sm"}`} />
                <label htmlFor="name" className={`floating-label absolute left-5 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest transition-all duration-300 pointer-events-none px-1 rounded-sm ${isDarkMode ? "bg-[#0a0a10] text-slate-500 peer-focus:text-indigo-400" : "bg-white text-slate-400 peer-focus:text-indigo-600"}`}>
                  Your Name
                </label>
              </div>
              <div className="relative group">
                <input type="email" required id="email" placeholder=" " className={`floating-input peer w-full bg-transparent px-6 py-4 rounded-xl border outline-none font-medium transition-all duration-300 focus:border-indigo-500 focus:shadow-[0_0_25px_rgba(99,102,241,0.15)] ${isDarkMode ? "border-white/10 text-white placeholder-transparent" : "border-slate-200 text-black shadow-sm"}`} />
                <label htmlFor="email" className={`floating-label absolute left-5 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest transition-all duration-300 pointer-events-none px-1 rounded-sm ${isDarkMode ? "bg-[#0a0a10] text-slate-500 peer-focus:text-indigo-400" : "bg-white text-slate-400 peer-focus:text-indigo-600"}`}>
                  Email Address
                </label>
              </div>
            </div>
            <div className="relative group">
              <textarea required id="message" rows="4" placeholder=" " className={`floating-input peer w-full resize-none bg-transparent px-6 py-4 rounded-xl border outline-none font-medium transition-all duration-300 focus:border-indigo-500 focus:shadow-[0_0_25px_rgba(99,102,241,0.15)] ${isDarkMode ? "border-white/10 text-white placeholder-transparent" : "border-slate-200 text-black shadow-sm"}`} />
              <label htmlFor="message" className={`floating-label absolute left-5 top-6 -translate-y-1/2 text-xs font-bold uppercase tracking-widest transition-all duration-300 pointer-events-none px-1 rounded-sm ${isDarkMode ? "bg-[#0a0a10] text-slate-500 peer-focus:text-indigo-400" : "bg-white text-slate-400 peer-focus:text-indigo-600"}`}>
                How can I help you?
              </label>
            </div>
            <button type="submit" className="w-full relative px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest text-white overflow-hidden group/btn shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 background-size-[200%] animate-shimmer transition-transform duration-300 group-hover/btn:scale-105" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                Send Message <Terminal size={16} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
