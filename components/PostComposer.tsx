import React, { useState, useRef } from 'react';
import { 
  X, Sparkles, Loader2, Send, Save, 
  Linkedin, Instagram, Facebook, Twitter, Globe,
  Image as ImageIcon, Hash, Clock, CheckCircle2,
  AlertCircle, MessageSquare, ShieldCheck, ChevronRight, Upload
} from 'lucide-react';
import { generateSocialPostVariants } from '../services/geminiService';
import { SocialPlatform, PostStatus } from '../types';

interface PostComposerProps {
  onClose: () => void;
  onSave: (post: any) => void;
}

const PostComposer: React.FC<PostComposerProps> = ({ onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>(SocialPlatform.LINKEDIN);
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([SocialPlatform.LINKEDIN, SocialPlatform.INSTAGRAM]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [postData, setPostData] = useState({
    id: 'post_' + Math.random().toString(36).substr(2, 9),
    title: '',
    topic: '',
    tone: 'Professional',
    goal: 'Get More Leads',
    variants: {} as Record<string, { caption: string; hashtags: string[] }>,
    media_url: '',
    scheduledAt: '',
    status: PostStatus.DRAFT
  });

  const handleAICompose = async () => {
    if (!postData.topic) return;
    setIsLoading(true);
    try {
      const generated = await generateSocialPostVariants({
        topic: postData.topic,
        tone: postData.tone,
        goal: postData.goal,
        platforms: selectedPlatforms
      });
      setPostData({ ...postData, variants: generated });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaUpload = () => {
    setIsUploading(true);
    // Simulation: frontend -> edge function -> GCS (/social/{post.id}/media.jpg)
    setTimeout(() => {
      setIsUploading(false);
      setPostData({ ...postData, media_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750' });
      alert("Social asset securely sync'd to GCS media vault.");
    }, 1500);
  };

  const togglePlatform = (p: SocialPlatform) => {
    if (selectedPlatforms.includes(p)) {
      setSelectedPlatforms(selectedPlatforms.filter(item => item !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <header className="px-10 py-8 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Sparkles size={24} fill="currentColor" />
             </div>
             <div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Social Content Specialist</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Adaptable Omnichannel Strategy Engine</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
            <X size={28} />
          </button>
        </header>

        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel: Intelligence Inputs */}
          <div className="w-80 border-r border-slate-100 p-8 space-y-10 overflow-y-auto bg-slate-50/30">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Platform Matrix</h3>
              <div className="grid grid-cols-3 gap-2">
                {[SocialPlatform.LINKEDIN, SocialPlatform.INSTAGRAM, SocialPlatform.FACEBOOK, SocialPlatform.TWITTER, SocialPlatform.GMB, SocialPlatform.YOUTUBE].map(p => (
                  <button 
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${
                      selectedPlatforms.includes(p) 
                        ? 'bg-white border-indigo-600 shadow-lg ring-4 ring-indigo-500/5' 
                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {p === 'linkedin' && <Linkedin size={18} />}
                    {p === 'instagram' && <Instagram size={18} />}
                    {p === 'facebook' && <Facebook size={18} />}
                    {p === 'twitter' && <Twitter size={18} />}
                    {p === 'gmb' && <Globe size={18} />}
                    {p === 'youtube' && <Globe size={18} />}
                    <span className="text-[8px] font-black uppercase">{p}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Strategy parameters</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Core Topic</label>
                  <textarea 
                    value={postData.topic}
                    onChange={e => setPostData({...postData, topic: e.target.value})}
                    placeholder="e.g. Why AI is the best employee you'll ever hire..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/5 text-sm font-medium shadow-inner transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tone of Voice</label>
                  <select 
                    value={postData.tone}
                    onChange={e => setPostData({...postData, tone: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-xs font-bold appearance-none shadow-sm"
                  >
                    <option>Professional</option>
                    <option>Witty / Modern</option>
                    <option>Aggressive / Scarcity</option>
                    <option>Educational / Long-form</option>
                  </select>
                </div>
              </div>
              
              <button 
                onClick={handleAICompose}
                disabled={isLoading || !postData.topic || selectedPlatforms.length === 0}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 active:scale-95"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {isLoading ? 'Employee is drafting...' : 'Consult Strategic Brain'}
              </button>
            </div>
          </div>

          {/* Right Panel: Adaptation Workspace */}
          <div className="flex-1 p-10 flex flex-col bg-white overflow-hidden">
            {selectedPlatforms.length > 0 ? (
              <>
                <div className="flex gap-2 border-b border-slate-100 mb-8 overflow-x-auto pb-px shrink-0">
                  {selectedPlatforms.map(p => (
                    <button 
                      key={p}
                      onClick={() => setActivePlatform(p)}
                      className={`px-6 py-3 text-[10px] font-black transition-all border-b-4 relative -mb-px capitalize flex items-center gap-2 ${
                        activePlatform === p ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {p} {postData.variants[p] && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto space-y-10 pr-4">
                  {postData.variants[activePlatform] ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-slate-900 uppercase tracking-tighter text-2xl flex items-center gap-3">
                          {activePlatform} Adaptation
                        </h3>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg border border-indigo-100 uppercase tracking-widest">
                            Best Time: 10:45 AM
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="relative group">
                            <textarea 
                              value={postData.variants[activePlatform].caption}
                              onChange={(e) => {
                                const newVariants = { ...postData.variants };
                                newVariants[activePlatform].caption = e.target.value;
                                setPostData({ ...postData, variants: newVariants });
                              }}
                              className="w-full h-80 p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] outline-none focus:ring-4 focus:ring-indigo-500/5 text-sm leading-relaxed font-medium shadow-inner resize-none transition-all"
                            />
                         </div>

                        <div className="grid grid-cols-2 gap-4">
                          <input type="file" className="hidden" ref={fileInputRef} onChange={handleMediaUpload} />
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-indigo-300 hover:text-indigo-600 transition-all bg-slate-50/20 group"
                          >
                            {isUploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} className="group-hover:scale-110 transition-transform" />}
                            {postData.media_url ? 'HD Media Pulse Ready' : 'Attach HD Media (GCS)'}
                          </button>
                          <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-3 shadow-inner">
                            <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                               <Hash size={12} /> Adaptive Hashtags
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {postData.variants[activePlatform].hashtags.map((tag, i) => (
                                <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 text-indigo-600 rounded-lg text-[9px] font-black shadow-sm">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
                      <div className="w-24 h-24 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200 shadow-inner">
                        <MessageSquare size={48} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-black text-slate-500 uppercase tracking-widest text-sm">No Content Adaptation Yet</h3>
                        <p className="text-xs text-slate-400 max-w-xs font-medium leading-relaxed">Fill out the topic and click "Consult Strategic Brain" to let your Social Employee draft variants.</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                 <div className="w-24 h-24 bg-indigo-50 rounded-[3rem] flex items-center justify-center text-indigo-600 shadow-inner animate-pulse">
                    <Linkedin size={48} />
                 </div>
                 <h3 className="font-black text-slate-400 uppercase tracking-widest text-sm italic">Select Platforms to Initialize Pulse</h3>
              </div>
            )}
          </div>
        </main>

        <footer className="p-10 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-all flex items-center gap-2">
              <Save size={16} /> Save Protocol Draft
            </button>
            <div className="w-px h-6 bg-slate-200" />
            <div className="flex items-center gap-3">
               <Clock size={16} className="text-slate-400" />
               <input type="datetime-local" className="bg-transparent border-none outline-none text-[10px] font-black uppercase text-slate-500" />
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => onSave({...postData, status: PostStatus.SCHEDULED})}
              className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-95 group"
            >
              Authorize Deployment
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PostComposer;