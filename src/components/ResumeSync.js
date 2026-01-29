import React, { useState } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, RefreshCcw, AlertCircle, FileCode, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeSync = ({ onSyncSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setStatus('loading');

    const formData = new FormData();
    formData.append('resume', file);
    const token = localStorage.getItem('adminToken');

    try {
      await axios.post('http://localhost:5000/api/portfolio/sync', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        },
      });
      setStatus('success');
      if (onSyncSuccess) onSyncSuccess();
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-2xl"
    >
      {/* Background Decorative Element */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-white italic tracking-tighter flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg shadow-inner">
              <RefreshCcw size={20} className={`text-indigo-400 ${loading ? 'animate-spin' : ''}`} />
            </div>
            NEURAL_RESUME_SYNC
          </h3>
          {status === 'success' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400">
              <Sparkles size={20} />
            </motion.div>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Custom File Upload Area */}
          <div className="relative group">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <div className={`
              border-2 border-dashed rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center gap-3
              ${file ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-slate-800 bg-black/20 group-hover:border-indigo-500/30'}
            `}>
              <div className={`p-3 rounded-xl ${file ? 'bg-indigo-500/20' : 'bg-slate-800'}`}>
                <FileCode size={24} className={file ? 'text-indigo-400' : 'text-slate-500'} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                  {file ? file.name : "Select Intelligence Source"}
                </p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-mono tracking-tighter">
                  Supported format: PDF (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`
              w-full relative group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black transition-all overflow-hidden
              ${!file || loading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/20'}
            `}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span className="italic tracking-widest uppercase text-xs">Parsing_Data...</span>
              </>
            ) : (
              <>
                <Upload size={18} className="group-hover:-translate-y-1 transition-transform" />
                <span className="italic tracking-widest uppercase text-xs">Execute_Synchronization</span>
              </>
            )}
          </button>

          {/* Status Feedback */}
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20 text-xs font-mono"
              >
                <CheckCircle size={16} /> 
                <span className="uppercase tracking-tighter">Database updated via parsing protocol</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20 text-xs font-mono"
              >
                <AlertCircle size={16} /> 
                <span className="uppercase tracking-tighter">Protocol_Error: Check source file</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeSync;