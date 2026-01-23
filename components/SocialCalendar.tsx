
import React, { useState } from 'react';
// Added Globe, ShieldCheck, and TrendingUp to the imports below
import { 
  ChevronLeft, ChevronRight, Linkedin, Instagram, Facebook, 
  Twitter, Plus, MoreHorizontal, MessageSquare, Heart, Sparkles,
  Calendar as CalendarIcon, Clock, Filter, Share2, Crown, Info,
  CheckCircle2, AlertTriangle, Eye, Send, Globe, ShieldCheck, TrendingUp
} from 'lucide-react';
import { PostStatus, SocialPlatform } from '../types';

const SocialCalendar: React.FC<{ onCompose: () => void }> = ({ onCompose }) => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 3); 

  const events = [
    { id: '1', date: 15, platform: SocialPlatform.LINKEDIN, title: 'AI Automation Guide', status: PostStatus.SCHEDULED, time: '10:30 AM' },
    { id: '2', date: 15, platform: SocialPlatform.INSTAGRAM, title: 'Office Culture Snippet', status: PostStatus.PUBLISHED, time: '02:15 PM' },
    { id: '3', date: 18, platform: SocialPlatform.TWITTER, title: 'Product Hunt Launch', status: PostStatus.PENDING_APPROVAL, time: '09:00 AM' },
    { id: '4', date: 22, platform: SocialPlatform.LINKEDIN, title: 'Case Study: Real Estate', status: PostStatus.DRAFT, time: '11:45 AM' },
    { id: '5', date: 15, platform: SocialPlatform.FACEBOOK, title: 'Webinar Alert', status: PostStatus.SCHEDULED, time: '05:00 PM' },
  ];

  const getPlatformIcon = (p: SocialPlatform) => {
    switch(p) {
      case 'linkedin': return <Linkedin size={10} className="text-white" />;
      case 'instagram': return <Instagram size={10} className="text-white" />;
      case 'facebook': return <Facebook size={10} className="text-white" />;
      case 'twitter': return <Twitter size={10} className="text-white" />;
      default: return <Globe size={10} className="text-white" />;
    }
  };

  const getPlatformColor = (p: SocialPlatform) => {
    switch(p) {
      case 'linkedin': return 'bg-blue-600';
      case 'instagram': return 'bg-pink-600';
      case 'facebook': return 'bg-indigo-600';
      case 'twitter': return 'bg-slate-900';
      default: return 'bg-indigo-400';
    }
  };

  const getStatusColor = (status: PostStatus) => {
    switch(status) {
      case PostStatus.PUBLISHED: return 'border-emerald-500 ring-emerald-500/20';
      case PostStatus.SCHEDULED: return 'border-blue-500 ring-blue-500/20';
      case PostStatus.PENDING_APPROVAL: return 'border-orange-500 ring-orange-500/20';
      default: return 'border-slate-300 ring-slate-100';
    }
  };

  return (
    <div className="flex h-full gap-8 animate-in fade-in duration-500 pb-20">
      {/* Main Calendar View */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
        <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/20">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 text-white">
                  <CalendarIcon size={24} />
               </div>
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">November 2024</h2>
            </div>
            <div className="flex gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-sm shrink-0">
               {['month', 'week', 'day'].map((m) => (
                 <button 
                  key={m}
                  onClick={() => setViewMode(m as any)}
                  className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === m ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}
                 >
                   {m}
                 </button>
               ))}
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-all"><ChevronLeft size={18} /></button>
              <button className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm">Today</button>
              <button className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-all"><ChevronRight size={18} /></button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all"><Filter size={18} /></button>
            <button 
              onClick={onCompose}
              className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-95"
            >
              <Plus size={16} />
              Commit New Post
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-7 bg-slate-50/50 sticky top-0 z-10 border-b border-slate-100">
            {days.map(day => (
              <div key={day} className="px-6 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-r border-slate-100 last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 flex-1 min-h-[900px]">
            {dates.map((date, i) => {
              const dayEvents = events.filter(e => e.date === date);
              const isToday = date === 15;
              const isInactive = date < 1 || date > 30;
              
              return (
                <div key={i} className={`min-h-[160px] p-4 border-r border-b border-slate-50 group hover:bg-slate-50/50 transition-colors relative ${isInactive ? 'bg-slate-50/20 opacity-30' : ''}`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-black transition-all ${isToday ? 'w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-xl shadow-xl shadow-indigo-100 -mt-1 -ml-1 scale-110' : 'text-slate-400 group-hover:text-slate-900'}`}>
                      {date > 0 && date <= 30 ? date : ''}
                    </span>
                    {!isInactive && (
                      <button className="opacity-0 group-hover:opacity-100 p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 rounded-lg transition-all shadow-sm">
                        <Plus size={14} />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {dayEvents.map((e, idx) => (
                      <div 
                        key={idx} 
                        className={`px-3 py-2.5 rounded-2xl border-l-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer ring-1 ${getStatusColor(e.status)} bg-white group/post relative overflow-hidden`}
                      >
                        <div className="flex items-center justify-between mb-1.5 relative z-10">
                           <div className={`p-1 rounded-lg shadow-sm ${getPlatformColor(e.platform)}`}>
                             {getPlatformIcon(e.platform)}
                           </div>
                           <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{e.time}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-900 leading-tight line-clamp-2 relative z-10">
                          {e.title}
                        </p>
                        <div className={`absolute top-0 right-0 w-8 h-8 opacity-5 rounded-bl-[2rem] ${getPlatformColor(e.platform)}`} />
                      </div>
                    ))}
                    
                    {isToday && dayEvents.length === 0 && (
                      <div className="p-4 border-2 border-dashed border-indigo-100 rounded-3xl bg-indigo-50/30 text-center space-y-2 animate-in fade-in zoom-in duration-700">
                         <Sparkles size={16} className="text-indigo-400 mx-auto animate-pulse" />
                         <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Employee suggestion</p>
                         <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg">Auto-Fill</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Post Queue & Intelligence */}
      <div className="w-80 space-y-8 shrink-0 flex flex-col">
         {/* Pending Approvals */}
         <div className="bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm flex flex-col min-h-[350px]">
            <header className="flex items-center justify-between mb-8">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-orange-500" /> Pending Approval
               </h3>
               <span className="bg-orange-50 text-orange-600 text-[8px] font-black px-2 py-0.5 rounded-full">3 Waiting</span>
            </header>
            <div className="flex-1 overflow-y-auto space-y-4">
               {events.filter(e => e.status === PostStatus.PENDING_APPROVAL).map(e => (
                 <div key={e.id} className="p-5 bg-slate-50 border border-slate-100 rounded-[2rem] hover:border-indigo-300 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center gap-2">
                          <div className={`p-1 rounded-lg ${getPlatformColor(e.platform)}`}>{getPlatformIcon(e.platform)}</div>
                          <span className="text-[8px] font-black uppercase text-slate-400">{e.platform}</span>
                       </div>
                       <span className="text-[8px] font-bold text-slate-400 italic">By Sarah (Creator)</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-900 leading-relaxed mb-4">"{e.title}"</p>
                    <div className="flex gap-2">
                       <button className="flex-1 py-2 bg-emerald-600 text-white text-[8px] font-black uppercase rounded-xl shadow-lg shadow-emerald-500/10 hover:bg-emerald-700 transition-all">Approve</button>
                       <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-400 text-[8px] font-black uppercase rounded-xl hover:bg-slate-100 transition-all">Reject</button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Collaboration Pulse */}
         <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 rounded-xl">
                     <Heart size={16} fill="currentColor" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Team Engagement</h4>
               </div>
               <div className="space-y-4">
                  {[
                    { user: "JD", msg: "Can we use darker lighting in this IG Reel?", time: "2m ago" },
                    { user: "SA", msg: "Added the Real Estate variations.", time: "10m ago" }
                  ].map((chat, i) => (
                    <div key={i} className="flex gap-3 items-start">
                       <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-black text-[9px] shrink-0 border border-white/10">{chat.user}</div>
                       <div>
                          <p className="text-[10px] text-slate-300 font-medium leading-relaxed italic line-clamp-2">"{chat.msg}"</p>
                          <span className="text-[8px] text-slate-500 uppercase font-black">{chat.time}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="relative z-10 pt-8 mt-4 border-t border-white/5">
               <div className="relative">
                  <input type="text" placeholder="Ping team members..." className="w-full pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none text-[10px] font-medium text-white focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                  <button className="absolute right-3 top-2.5 text-indigo-400"><Send size={16} /></button>
               </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-[60px]" />
         </div>

         {/* ROI Quick Insight */}
         <div className="bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <TrendingUp size={14} className="text-emerald-500" /> ROI Projection
            </h4>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Est. Leads</span>
                  <span className="text-xl font-black text-slate-900">124</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Avg. CPC</span>
                  <span className="text-xl font-black text-emerald-600">₹8.40</span>
               </div>
               <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[78%] rounded-full animate-pulse" />
               </div>
               <p className="text-[9px] text-slate-400 italic leading-relaxed text-center">
                  LinkedIn strategy is performing <strong className="text-indigo-600">+12% better</strong> than Instagram for real-estate niche today.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SocialCalendar;
