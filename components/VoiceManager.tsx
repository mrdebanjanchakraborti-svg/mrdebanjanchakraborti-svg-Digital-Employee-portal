
import React, { useState, useEffect } from 'react';
import { 
  Phone, PhoneCall, PhoneIncoming, PhoneOutgoing, 
  Clock, Calendar, Play, Download, BarChart3, 
  Activity, CheckCircle2, XCircle, AlertCircle, Search,
  Mic, Brain, Zap, MessageSquare, Flame, User, Info,
  TrendingUp, Ghost, ShieldAlert, BadgeCheck, LifeBuoy,
  FileText
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CALL_DATA = [
  { time: '09:00', calls: 12 },
  { time: '10:00', calls: 24 },
  { time: '11:00', calls: 18 },
  { time: '12:00', calls: 35 },
  { time: '13:00', calls: 28 },
  { time: '14:00', calls: 42 },
  { time: '15:00', calls: 50 },
  { time: '16:00', calls: 32 },
];

const VoiceManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'history' | 'analyze'>('monitor');
  const [isLive, setIsLive] = useState(false);

  const mockCalls = [
    { id: '1', contact: 'Samantha Reed', phone: '+91 98765 43210', direction: 'outgoing', status: 'completed', duration: '12:45', date: '20m ago', recording_url: 'gcs://voice/call_1/rec.mp3' },
    { id: '2', contact: 'Marcus Chen', phone: '+91 87654 32109', direction: 'incoming', status: 'no_answer', duration: '0:00', date: '1h ago', recording_url: null },
  ];

  const handlePlayRecording = (url: string) => {
    alert(`Generating Signed Pulse for GCS path: ${url}. (Valid for 15m)`);
  };

  const liveTranscript = [
    { speaker: 'ai', text: 'Hello Elena ji, am I speaking at a good time?' },
    { speaker: 'user', text: 'Yes, but I was busy. What is this about?' },
    { speaker: 'ai', text: 'I understand. I am calling from Expedify regarding the AI audit for your real estate portfolio.' },
    { speaker: 'user', text: 'Oh, okay. But it seems expensive for our current scale.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex gap-4 p-1.5 bg-white border border-slate-200 rounded-[2rem] w-fit shadow-sm">
          {[
            { id: 'monitor', label: 'Live Brain', icon: Activity },
            { id: 'history', label: 'Call Ledger', icon: Clock },
            { id: 'analyze', label: 'ROI Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-95">
          <Phone size={18} fill="currentColor" />
          Initiate Outreach
        </button>
      </header>

      {activeTab === 'monitor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 5-Layer Architecture Visualization */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                     <div className="relative">
                        <div className="w-20 h-20 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                           <Mic size={32} className={isLive ? 'animate-pulse' : ''} />
                        </div>
                        {isLive && <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-4 border-slate-900 rounded-full animate-ping" />}
                     </div>
                     <div>
                        <h2 className="text-3xl font-black tracking-tight uppercase">Live Voice Intelligence</h2>
                        <div className="flex items-center gap-3 mt-1">
                           <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Channel: Connected
                           </span>
                           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Target: Elena Gilbert</span>
                        </div>
                     </div>
                  </div>
                  <button 
                    onClick={() => setIsLive(!isLive)}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isLive ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20'}`}
                  >
                    {isLive ? 'Terminate Session' : 'Start Simulation'}
                  </button>
               </div>
               <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] -mr-40 -mt-40" />
            </div>

            <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-10">
               <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Brain size={16} className="text-indigo-600" /> Conversational Stack
                  </h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-lg border border-emerald-100 uppercase">Objection Mode Active</span>
                  </div>
               </div>

               <div className="space-y-6">
                  {liveTranscript.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.speaker === 'ai' ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 duration-300`}>
                      <div className={`max-w-[75%] p-6 rounded-[2.5rem] text-sm shadow-sm relative ${
                        msg.speaker === 'ai' 
                          ? 'bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-tl-none' 
                          : 'bg-slate-900 text-white rounded-tr-none'
                      }`}>
                        <div className="absolute -top-3 left-6 px-2 py-0.5 bg-white border border-slate-100 rounded-full text-[8px] font-black uppercase text-slate-400 shadow-sm">
                          {msg.speaker === 'ai' ? 'Digital Employee' : 'Lead (Elena)'}
                        </div>
                        <p className="leading-relaxed font-medium italic">"{msg.text}"</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Sidebar: Real-time Analysis */}
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm space-y-8">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                 <Zap size={14} className="text-orange-500" /> Live Signal Analysis
               </h4>
               
               <div className="space-y-4">
                  <div className="p-5 bg-orange-50 border border-orange-100 rounded-2xl flex items-center gap-4">
                     <ShieldAlert size={24} className="text-orange-600 shrink-0" />
                     <div>
                        <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Objection Detected</p>
                        <p className="text-xs font-bold text-orange-900">Price / Scale concern</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Binary Call Ledger (GCS)</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Entity</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Temporal Pulse</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vault Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockCalls.map(call => (
                  <tr key={call.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-black text-slate-900">{call.contact}</p>
                      <p className="text-xs text-slate-400 font-bold">{call.phone}</p>
                    </td>
                    <td className="px-8 py-5">
                       <p className="text-xs font-black text-slate-600 uppercase">{call.date}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-xs font-black text-slate-600">
                        <Clock size={14} className="text-slate-400" />
                        {call.duration}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex gap-2">
                        {call.recording_url ? (
                          <>
                            <button 
                              onClick={() => handlePlayRecording(call.recording_url!)}
                              className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2"
                            >
                               <Play size={16} fill="currentColor" /> <span className="text-[10px] font-black uppercase">Play</span>
                            </button>
                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Download size={16} /></button>
                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"><FileText size={16} /></button>
                          </>
                        ) : (
                          <span className="text-[9px] font-black text-slate-300 uppercase italic">No Recording</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}

      {/* ... analyze tab ... */}
    </div>
  );
};

export default VoiceManager;
