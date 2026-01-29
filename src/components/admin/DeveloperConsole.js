import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Save, Plus, Trash2, LayoutDashboard, User, 
  Briefcase, Rocket, Globe, Github, Image as ImageIcon,
  GraduationCap, FileText, Code2, Link as LinkIcon, Sparkles,
  Terminal, ShieldCheck, Cpu, X, ChevronRight, CheckCircle2, CloudUpload, Mail, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../services/api';

const DeveloperConsole = () => {
  const [data, setData] = useState({ 
    fullName: '', bio: '', aboutMe: '', email: '', resumeUrl: '',
    socials: { github: '', linkedin: '', twitter: '' },
    experience: [], projects: [], skills: [], education: [],
    tempResume: null 
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('identity');
  const [newSkill, setNewSkill] = useState({ name: '', tempFile: null, preview: '' });

  const fetchData = async () => {
    try {
      const res = await API.get('/portfolio');
      setData({
        ...res.data,
        socials: res.data.socials || { github: '', linkedin: '', twitter: '' },
        experience: res.data.experience || [],
        projects: res.data.projects || [],
        skills: res.data.skills || [],
        education: res.data.education || [],
        tempResume: null 
      });
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleFileChange = (e, index, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const newData = { ...data };
    if (type === 'exp') {
      newData.experience[index].tempFile = file;
      newData.experience[index].preview = URL.createObjectURL(file);
    } else if (type === 'proj') {
      newData.projects[index].tempFile = file;
      newData.projects[index].preview = URL.createObjectURL(file);
    } else if (type === 'resume') {
      newData.tempResume = file; 
    }
    setData(newData);
  };

  const handleSkillFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSkill({ ...newSkill, tempFile: file, preview: URL.createObjectURL(file) });
    }
  };

  const addNewSkill = () => {
    if (!newSkill.name) return;
    setData({ ...data, skills: [...data.skills, { ...newSkill }] });
    setNewSkill({ name: '', tempFile: null, preview: '' });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEdu = [...data.education];
    updatedEdu[index][field] = value;
    setData({ ...data, education: updatedEdu });
  };

  const handleSave = async () => {
    const formData = new FormData();
    const token = localStorage.getItem('adminToken');
    
    const cleanExp = data.experience.map(({ tempFile, preview, ...rest }) => rest);
    const cleanProj = data.projects.map(({ tempFile, preview, ...rest }) => rest);
    const cleanSkills = data.skills.map(({ tempFile, preview, ...rest }) => rest);

    formData.append('fullName', data.fullName);
    formData.append('bio', data.bio);
    formData.append('aboutMe', data.aboutMe);
    formData.append('email', data.email); 
    formData.append('socials', JSON.stringify(data.socials));
    formData.append('experience', JSON.stringify(cleanExp));
    formData.append('projects', JSON.stringify(cleanProj));
    formData.append('skills', JSON.stringify(cleanSkills));
    formData.append('education', JSON.stringify(data.education));

    if (data.tempResume) {
      formData.append('resume', data.tempResume);
    }
    
    data.experience.forEach((exp, i) => { 
      if (exp.tempFile) formData.append(`logo-${i}`, exp.tempFile); 
    });
    
    data.projects.forEach((proj, i) => { 
      if (proj.tempFile) formData.append(`projectCover-${i}`, proj.tempFile); 
    });
    
    data.skills.forEach((skill, i) => { 
      if (skill.tempFile) formData.append(`skillIcon-${i}`, skill.tempFile); 
    });

    try {
      await API.post('/portfolio/manual-update', formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data' 
        }
      });
      alert("✓ SYSTEM_SYNCHRONIZED");
      fetchData(); 
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("ERROR: Check Console");
    }
  };

  const navItems = [
    { id: 'identity', label: 'Global Identity', icon: User },
    { id: 'skills', label: 'Tech Arsenal', icon: Cpu },
    { id: 'experience', label: 'Career Path', icon: Briefcase },
    { id: 'projects', label: 'Project Docks', icon: Rocket },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  if (loading) return (
    <div className="bg-[#020202] h-screen flex flex-col items-center justify-center font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] rounded-full scale-150" />
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }} 
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }} 
        className="mb-6 relative z-10"
      >
        <Cpu className="text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" size={50} />
      </motion.div>
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: "200px" }} 
        className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden"
      >
        <motion.div 
          animate={{ left: ["-100%", "100%"] }} 
          transition={{ repeat: Infinity, duration: 1.5 }} 
          className="h-full w-1/2 bg-indigo-500 relative" 
        />
      </motion.div>
      <div className="text-indigo-400 text-[10px] tracking-[0.5em] uppercase font-bold animate-pulse">Initializing_Core...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans flex overflow-hidden selection:bg-indigo-500/30">
      
      <aside className="w-80 border-r border-white/5 bg-[#080808]/50 backdrop-blur-xl hidden lg:flex flex-col p-8 space-y-10 relative">
        <div className="flex items-center gap-4 px-2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-indigo-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-10 h-10 bg-black rounded-lg flex items-center justify-center border border-white/10">
              <Terminal size={20} className="text-indigo-500" />
            </div>
          </div>
          <div>
            <h1 className="font-black text-white tracking-tighter text-xl leading-none">NEXUS</h1>
            <p className="text-[10px] text-indigo-500 font-mono font-bold tracking-widest">ADMIN_OS_V3</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-indigo-500/10 text-white border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.05)]' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={activeTab === item.id ? "text-indigo-400" : "group-hover:text-indigo-400 transition-colors"} />
                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
              </div>
              {activeTab === item.id && <motion.div layoutId="activeTab" className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />}
            </button>
          ))}
        </nav>

        <div className="bg-gradient-to-br from-indigo-500/10 to-transparent rounded-3xl p-6 border border-white/5">
          <div className="flex items-center gap-2 text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-3">
            <Activity size={12} className="animate-pulse" /> System Integrity
          </div>
          <div className="space-y-2">
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div animate={{ width: "88%" }} className="h-full bg-indigo-500" />
            </div>
            <p className="text-[9px] text-slate-600 font-mono">ENCRYPTED_SESSION_ACTIVE</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative h-screen bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent">
        <header className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-10 py-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <h2 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">
              Console <span className="text-slate-600 px-2">/</span> {navItems.find(n => n.id === activeTab).label}
            </h2>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="group relative px-8 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest overflow-hidden transition-all shadow-xl shadow-white/5"
          >
            <span className="relative z-10 flex items-center gap-2">Push to Production <Save size={14} /></span>
            <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>
        </header>

        <div className="p-10 max-w-6xl mx-auto pb-40">
          <AnimatePresence mode="wait">
            
            {activeTab === 'identity' && (
              <motion.section 
                key="identity"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Operator_Legal_Name</label>
                    <input className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all shadow-inner" value={data.fullName} onChange={e => setData({...data, fullName: e.target.value})} />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Credential_Artifact (PDF)</label>
                    <label className="flex items-center justify-between bg-white/5 border border-dashed border-white/10 rounded-2xl p-5 cursor-pointer hover:border-indigo-500/40 hover:bg-white/10 transition-all group">
                      <span className="text-xs text-slate-400 truncate font-mono">{data.tempResume ? data.tempResume.name : "upload_resume.exe"}</span>
                      <CloudUpload size={20} className="text-slate-500 group-hover:text-indigo-500 transition-colors" />
                      <input type="file" className="hidden" accept=".pdf" onChange={e => handleFileChange(e, null, 'resume')} />
                    </label>
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                      <Mail size={12} /> Communication_Hub
                    </label>
                    <input className="w-full bg-white/5 border border-indigo-500/20 rounded-2xl p-5 text-white focus:border-indigo-500 outline-none transition-all" placeholder="name@domain.tech" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Short_Directive (Bio)</label>
                    <input className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white focus:border-indigo-500/50 outline-none transition-all" value={data.bio} onChange={e => setData({...data, bio: e.target.value})} />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Comprehensive_Narrative</label>
                  <textarea rows="6" className="w-full bg-white/5 border border-white/5 rounded-[2rem] p-8 text-slate-400 focus:border-indigo-500/50 outline-none transition-all leading-relaxed text-sm" value={data.aboutMe} onChange={e => setData({...data, aboutMe: e.target.value})} />
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-4">
                  {['github', 'linkedin', 'twitter'].map((key) => (
                    <div key={key} className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl px-5 py-4 focus-within:border-indigo-500/40 transition-all group">
                      <LinkIcon size={14} className="text-slate-600 group-focus-within:text-indigo-500" />
                      <input className="bg-transparent outline-none text-[10px] w-full text-indigo-400 font-mono uppercase tracking-widest" placeholder={`${key}_ENDPOINT`} value={data.socials[key]} onChange={e => setData({...data, socials: {...data.socials, [key]: e.target.value}})} />
                    </div>
                  ))}
                </motion.div>
              </motion.section>
            )}

            {activeTab === 'skills' && (
              <motion.section key="skills" variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {data.skills.map((skill, i) => (
                    <motion.div variants={itemVariants} key={i} className="group relative bg-white/5 border border-white/5 rounded-[2rem] p-8 flex flex-col items-center gap-4 hover:border-indigo-500/30 transition-all hover:-translate-y-2">
                      <button onClick={() => setData({...data, skills: data.skills.filter((_, idx) => idx !== i)})} className="absolute top-4 right-4 text-slate-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                        <X size={16} />
                      </button>
                      <div className="w-16 h-16 flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 shadow-xl">
                        {(skill.preview || skill.iconUrl) ? (
                          <img src={skill.preview || skill.iconUrl} className="w-10 h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all" alt="" />
                        ) : <Code2 className="text-indigo-500/50" size={30} />}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-500/10 to-transparent border border-white/10 p-10 rounded-[3rem] flex flex-col md:flex-row gap-10 items-center">
                   <label className="w-24 h-24 bg-black border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all overflow-hidden shrink-0 group">
                      {newSkill.preview ? <img src={newSkill.preview} className="w-full h-full object-contain p-4" /> : <ImageIcon size={28} className="text-slate-700 group-hover:text-indigo-500 transition-colors" />}
                      <input type="file" className="hidden" accept="image/*" onChange={handleSkillFileChange} />
                   </label>
                   <div className="flex-1 space-y-4 w-full">
                     <input className="w-full bg-transparent border-b-2 border-white/5 p-4 text-xl text-white outline-none focus:border-indigo-500 font-black tracking-tighter placeholder:text-slate-800" placeholder="MODULE_NAME (e.g. React.js)" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} onKeyDown={e => e.key === 'Enter' && addNewSkill()} />
                     <button onClick={addNewSkill} className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">
                        Inject New Module <Plus size={14} />
                     </button>
                   </div>
                </motion.div>
              </motion.section>
            )}

            {activeTab === 'experience' && (
              <motion.section key="experience" variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tighter">Chronological_Logs</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Experience mapping protocol</p>
                  </div>
                  <button onClick={() => setData({...data, experience: [...data.experience, {role: '', company: '', description: '', companyLogo: '', duration: ''}]})} className="bg-indigo-500 hover:bg-indigo-400 text-white p-3 rounded-xl transition-all">
                    <Plus size={20} />
                  </button>
                </div>
                {data.experience.map((exp, i) => (
                  <motion.div variants={itemVariants} key={i} className="group bg-white/5 border border-white/5 rounded-[2.5rem] p-10 relative hover:border-indigo-500/20 transition-all">
                    <button onClick={() => setData({...data, experience: data.experience.filter((_, idx) => idx !== i)})} className="absolute top-10 right-10 text-slate-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={20} /></button>
                    <div className="flex flex-col md:flex-row gap-10">
                        <label className="w-24 h-24 bg-black rounded-3xl border border-white/10 flex items-center justify-center p-4 cursor-pointer overflow-hidden shrink-0 shadow-2xl relative group/img">
                          <img src={exp.preview || exp.companyLogo || "https://via.placeholder.com/150"} className="w-full h-full object-contain group-hover/img:opacity-20 transition-opacity" alt="" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <CloudUpload className="text-indigo-500" />
                          </div>
                          <input type="file" className="hidden" onChange={e => handleFileChange(e, i, 'exp')} />
                        </label>
                        <div className="flex-1 grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Designation</label>
                            <input className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm outline-none focus:border-indigo-500/30" placeholder="Senior Engineer" value={exp.role} onChange={e => { const n = [...data.experience]; n[i].role = e.target.value; setData({...data, experience: n}); }} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Organization</label>
                            <input className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm outline-none focus:border-indigo-500/30" placeholder="Stark Industries" value={exp.company} onChange={e => { const n = [...data.experience]; n[i].company = e.target.value; setData({...data, experience: n}); }} />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Operational_Timeline</label>
                            <input className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm outline-none focus:border-indigo-500/30 font-mono" placeholder="2022_01 >> PRESENT" value={exp.duration} onChange={e => { const n = [...data.experience]; n[i].duration = e.target.value; setData({...data, experience: n}); }} />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Mission_Summary</label>
                            <textarea className="w-full bg-black/40 border border-white/5 rounded-xl p-6 text-sm outline-none focus:border-indigo-500/30 min-h-[120px] leading-relaxed" placeholder="Detailed responsibilities..." value={exp.description} onChange={e => { const n = [...data.experience]; n[i].description = e.target.value; setData({...data, experience: n}); }} />
                          </div>
                        </div>
                    </div>
                  </motion.div>
                ))}
              </motion.section>
            )}

            {activeTab === 'projects' && (
              <motion.section key="projects" variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
                 <div className="flex justify-between items-center bg-indigo-500/5 p-8 rounded-[2rem] border border-indigo-500/10">
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tighter">Project_Deployment_Docks</h3>
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Active builds and live repositories</p>
                  </div>
                  <button onClick={() => setData({...data, projects: [...data.projects, {title: '', description: '', githubLink: '', liveLink: '', coverImage: ''}]})} className="bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">Dock New Project</button>
                </div>
                <div className="grid lg:grid-cols-2 gap-10">
                  {data.projects.map((proj, i) => (
                    <motion.div variants={itemVariants} key={i} className="bg-[#0d0d0d] border border-white/5 rounded-[3rem] overflow-hidden group hover:border-indigo-500/30 transition-all flex flex-col">
                      <div className="relative aspect-video bg-black/40 border-b border-white/5 overflow-hidden">
                        <img src={proj.preview || proj.coverImage || "https://via.placeholder.com/600x400"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40 group-hover:opacity-100" alt="" />
                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/60 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                          <CloudUpload className="text-white mb-2" size={30} />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Update_Manifest_Image</span>
                          <input type="file" className="hidden" onChange={e => handleFileChange(e, i, 'proj')} />
                        </label>
                      </div>
                      <div className="p-10 space-y-6 flex-1">
                        <div className="flex justify-between items-center">
                           <input className="bg-transparent text-2xl font-black text-white outline-none w-full tracking-tighter placeholder:text-slate-800" placeholder="PROJECT_ALPHA" value={proj.title} onChange={e => { const n = [...data.projects]; n[i].title = e.target.value; setData({...data, projects: n}); }} />
                           <button onClick={() => setData({...data, projects: data.projects.filter((_, idx) => idx !== i)})} className="text-slate-700 hover:text-red-500 transition-colors p-2"><Trash2 size={18} /></button>
                        </div>
                        <textarea className="w-full bg-black/50 border border-white/5 p-6 rounded-2xl text-sm text-slate-400 outline-none focus:border-indigo-500/30 resize-none" rows="4" placeholder="Brief technical overview..." value={proj.description} onChange={e => { const n = [...data.projects]; n[i].description = e.target.value; setData({...data, projects: n}); }} />
                        <div className="flex gap-4">
                          <div className="flex-1 space-y-2">
                            <label className="text-[9px] font-black text-slate-600 uppercase ml-1">Source_Code</label>
                            <div className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-xl px-4 py-3">
                              <Github size={14} className="text-slate-500" />
                              <input className="bg-transparent text-[10px] text-indigo-400 font-mono outline-none w-full" placeholder="GITHUB_URL" value={proj.githubLink} onChange={e => { const n = [...data.projects]; n[i].githubLink = e.target.value; setData({...data, projects: n}); }} />
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <label className="text-[9px] font-black text-slate-600 uppercase ml-1">Production_URI</label>
                            <div className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-xl px-4 py-3">
                              <Globe size={14} className="text-slate-500" />
                              <input className="bg-transparent text-[10px] text-indigo-400 font-mono outline-none w-full" placeholder="LIVE_LINK" value={proj.liveLink} onChange={e => { const n = [...data.projects]; n[i].liveLink = e.target.value; setData({...data, projects: n}); }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {activeTab === 'education' && (
              <motion.section key="education" variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Knowledge_Acquisition_Base</h3>
                  <button onClick={() => setData({...data, education: [...data.education, {degree: '', college: '', year: '', status: '', grade: ''}]})} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-[10px] font-black uppercase tracking-widest">
                    <Plus size={16} /> Update Academy
                  </button>
                </div>
                {data.education.map((edu, i) => (
                  <motion.div variants={itemVariants} key={i} className="bg-white/5 border border-white/5 rounded-[2rem] p-10 relative group">
                    <button onClick={() => setData({...data, education: data.education.filter((_, idx) => idx !== i)})} className="absolute top-10 right-10 text-slate-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={20} /></button>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] text-indigo-500 uppercase font-black tracking-widest ml-1">Degree_Certification</label>
                        <input className="w-full bg-black/50 border border-white/5 rounded-xl p-5 text-sm outline-none focus:border-indigo-500/30" placeholder="Masters in Computer Science" value={edu.degree} onChange={e => handleEducationChange(i, 'degree', e.target.value)} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] text-slate-600 uppercase font-black tracking-widest ml-1">Learning_Institution</label>
                        <input className="w-full bg-black/50 border border-white/5 rounded-xl p-5 text-sm outline-none focus:border-indigo-500/30" placeholder="MIT, Boston" value={edu.college} onChange={e => handleEducationChange(i, 'college', e.target.value)} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] text-slate-600 uppercase font-black tracking-widest ml-1">Graduation_Window</label>
                        <input className="w-full bg-black/50 border border-white/5 rounded-xl p-5 text-sm outline-none focus:border-indigo-500/30 font-mono" placeholder="2018 - 2022" value={edu.year} onChange={e => handleEducationChange(i, 'year', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-[10px] text-slate-600 uppercase font-black tracking-widest ml-1">Status</label>
                          <input className="w-full bg-black/50 border border-white/5 rounded-xl p-5 text-sm outline-none focus:border-indigo-500/30" placeholder="Verified" value={edu.status} onChange={e => handleEducationChange(i, 'status', e.target.value)} />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] text-slate-600 uppercase font-black tracking-widest ml-1">GPA_Index</label>
                          <input className="w-full bg-black/50 border border-white/5 rounded-xl p-5 text-sm outline-none focus:border-indigo-500/30 font-mono" placeholder="4.0 / 4.0" value={edu.grade} onChange={e => handleEducationChange(i, 'grade', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.section>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DeveloperConsole;