import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, Cpu, Fingerprint, Terminal, Eye, EyeOff, Activity, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CryptoJS from 'crypto-js'; // ADDED: Hashing library
import API from '../services/api';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // SECURE STEP: Hash the password before it leaves the browser
      const hashedPayload = CryptoJS.SHA512(password).toString();
      
      const res = await API.post('/auth/login', { password: hashedPayload });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/dev');
    } catch (err) {
      setError("CRITICAL_ERROR: ACCESS_DENIED_BY_CORE");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#010103] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(79,70,229,0.1),_transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full relative z-10"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[3rem] blur opacity-75" />
        
        <div className="relative bg-[#0a0a0f]/80 border border-white/10 p-8 sm:p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-dashed border-indigo-500/40 rounded-full" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-3 border-2 border-indigo-500/20 rounded-full border-t-indigo-500" />
            <div className="absolute inset-6 bg-indigo-600/10 rounded-full flex items-center justify-center border border-indigo-500/30 backdrop-blur-md">
              {loading ? <Activity className="text-indigo-400 animate-pulse" size={32} /> : error ? <ShieldAlert className="text-red-500 animate-bounce" size={32} /> : <Lock className="text-indigo-400" size={32} />}
            </div>
          </div>
          
          <div className="text-center space-y-3 mb-8">
            <motion.h2 initial={{ letterSpacing: "0.2em" }} animate={{ letterSpacing: "0.1em" }} className="text-2xl font-black text-white uppercase tracking-wider">System Gateway</motion.h2>
            <div className="flex items-center justify-center gap-3">
               <span className="h-px w-8 bg-indigo-500/30" />
               <Terminal size={14} className="text-indigo-500" />
               <span className="text-indigo-400/60 text-[10px] font-mono font-bold uppercase tracking-widest">Secure_Protocol</span>
               <span className="h-px w-8 bg-indigo-500/30" />
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative group">
              <motion.div whileTap={{ scale: 0.995 }}>
                <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="AUTHORIZATION_KEY"
                  className="w-full bg-black/50 border border-white/5 rounded-2xl pl-14 pr-14 py-5 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all font-mono text-xs tracking-[0.3em] placeholder:tracking-normal placeholder:text-slate-600"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </motion.div>
            </div>
            
            <AnimatePresence mode='wait'>
              {error && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="bg-red-500/5 border-l-2 border-red-500/50 p-3 flex items-center gap-3">
                  <ShieldAlert size={14} className="text-red-500" />
                  <p className="text-red-400 text-[9px] font-black font-mono tracking-tighter uppercase">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative w-full h-16 overflow-hidden rounded-2xl bg-indigo-600 font-black text-[11px] uppercase tracking-[0.2em] text-white shadow-2xl shadow-indigo-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center gap-3">
                {loading ? <Cpu className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                <span>{loading ? "Decrypting..." : "Initialise Access"}</span>
              </div>
            </motion.button>
          </form>

          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex gap-2">
               {[...Array(3)].map((_, i) => (
                 <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} className="w-1.5 h-1.5 rounded-full bg-indigo-500/40"/>
               ))}
            </div>
            <p className="text-slate-600 text-[8px] font-bold uppercase tracking-[0.4em] text-center leading-loose">
              Warning: Unauthorized access is logged <br /> & monitored by Nexus Security
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;