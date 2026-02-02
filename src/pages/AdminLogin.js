import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, Cpu, Fingerprint, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../services/api';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', { password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/dev');
    } catch (err) {
      setError("UNAUTHORIZED_ACCESS: KEY_REJECTED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#02010a] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Tech Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full relative z-10"
      >
        {/* Decorative Corner Accents */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-indigo-500 rounded-tl-lg" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-indigo-500 rounded-br-lg" />

        <div className="bg-slate-900/40 border border-white/10 p-8 sm:p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Animated Header Icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-indigo-500/30 rounded-full"
            />
            <div className="absolute inset-2 bg-indigo-500/10 rounded-full flex items-center justify-center border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              {loading ? (
                <Cpu className="text-indigo-400 animate-pulse" size={40} />
              ) : (
                <Lock className="text-indigo-500" size={36} />
              )}
            </div>
          </div>
          
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Nexus Core</h2>
            <div className="flex items-center justify-center gap-2">
               <Terminal size={12} className="text-indigo-500" />
               <p className="text-indigo-400/70 text-[10px] font-mono font-bold tracking-[0.3em] uppercase">Auth_Protocol_v3.0</p>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <motion.div 
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="ENCRYPTION_KEY"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-14 pr-5 py-5 text-white outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all font-mono tracking-widest placeholder:text-slate-700 placeholder:tracking-normal text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-3"
                >
                  <p className="text-red-400 text-[10px] text-center font-bold font-mono tracking-wider">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button 
              type="submit" 
              disabled={loading}
              whileHover={{ scale: 1.02, backgroundColor: '#4f46e5' }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full overflow-hidden bg-indigo-600 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-500/10 flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Decrypting...
                </span>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Authorize Access
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-slate-600 text-[9px] font-bold uppercase tracking-widest">
            Level 5 Security Clearance Required
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;