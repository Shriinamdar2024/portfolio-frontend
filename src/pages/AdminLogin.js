import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';
import API from '../api'
const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // You'll need to create this auth/login endpoint in your backend
      const res = await API.post('/auth/login', { password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/dev'); // Redirect to your Developer Console
    } catch (err) {
      setError("Unauthorized access. Key rejected.");
    }finally {
    setLoading(false); // Stop loading regardless of result
    }
  };

  return (
    <div className="h-screen bg-[#030014] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
        <div className="bg-indigo-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-indigo-500/20">
          <Lock className="text-indigo-500" size={32} />
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-2">System Authentication</h2>
        <p className="text-slate-500 text-center text-sm mb-10 font-mono tracking-tight">Access restricted to site administrator only.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input 
              type="password" 
              placeholder="Enter Private Access Key"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-center"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p className="text-red-400 text-xs text-center font-medium">{error}</p>}
          
          {/* <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
           {loading ? "Authenticating..." :<ShieldCheck size={20} /> Authorize Access</>}
          </button> */}
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
  {loading ? "Authenticating..." : <><ShieldCheck size={20} /> Authorize Access</>}
</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;