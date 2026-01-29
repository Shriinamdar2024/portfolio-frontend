import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

const ResumeSync = ({ onSyncSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setStatus('uploading');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await axios.post('http://localhost:5000/api/portfolio/sync', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000); // Reset after 3s
      if (onSyncSuccess) onSyncSuccess(res.data.data);
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <label className="cursor-pointer group">
        <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf" disabled={loading} />
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300
            ${status === 'success' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 
              status === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-400' :
              'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:border-indigo-500/60 hover:bg-indigo-500/20'}
          `}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <RefreshCw size={18} />
              </motion.div>
            ) : status === 'success' ? (
              <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 size={18} /></motion.div>
            ) : status === 'error' ? (
              <motion.div key="error" initial={{ scale: 0 }} animate={{ scale: 1 }}><AlertCircle size={18} /></motion.div>
            ) : (
              <Sparkles size={18} className="group-hover:animate-pulse" />
            )}
          </AnimatePresence>

          <span className="text-sm font-bold tracking-wide uppercase">
            {loading ? 'Analyzing...' : status === 'success' ? 'Profile Synced' : 'Sync Resume'}
          </span>
        </motion.div>
      </label>

      {/* Background Glow Effect */}
      <div className="absolute inset-0 -z-10 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default ResumeSync;