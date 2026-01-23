
import React from 'react';
import { Users, Filter, Plus, Target, MessageSquare, TrendingUp, Globe, Facebook, Search } from 'lucide-react';

const Segments: React.FC = () => {
  const segments = [
    { id: '1', name: 'IndiaMART Hot Leads', count: 124, source: 'IndiaMART', color: 'bg-emerald-600' },
    { id: '2', name: 'Facebook Ad Signal', count: 482, source: 'Facebook', color: 'bg-indigo-600' },
    { id: '3', name: 'Website Form (GMB)', count: 85, source: 'Google', color: 'bg-red-600' },
    { id: '4', name: 'High ROI Prospects', count: 32, source: 'Internal', color: 'bg-slate-900' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Revenue Segments</h2>
          <p className="text-slate-500 text-sm font-medium">Categorize signals by intent, source, and lifecycle stage.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
          <Plus size={18} /> Define Segment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {segments.map((seg) => (
          <div key={seg.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 ${seg.color} opacity-5 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform`} />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl ${seg.color} flex items-center justify-center text-white shadow-lg`}>
                   {seg.source === 'Google' ? <Globe size={20} /> : 
                    seg.source === 'Facebook' ? <Facebook size={20} /> : 
                    seg.source === 'IndiaMART' ? <TrendingUp size={20} /> : <Users size={20} />}
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signals</p>
                   <p className="text-2xl font-black text-slate-900">{seg.count}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase mb-1">{seg.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Origin: {seg.source}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
        <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
           <div className="flex items-center gap-6">
             <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">IndiaMART Integration</h3>
             <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg border border-emerald-100 uppercase tracking-tighter">Live Protocol</span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg border border-indigo-100 uppercase tracking-tighter">Auto-Score Active</span>
             </div>
           </div>
           <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm"><Filter size={18} /></button>
        </header>
        <div className="p-12 text-center space-y-4">
           <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mx-auto text-slate-300">
             <Search size={32} />
           </div>
           <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">Lead Explorer Interface</h4>
           <p className="text-sm text-slate-500 max-w-sm mx-auto font-medium">
             Connect your IndiaMART CRM API key to view live leads directly within your Digital Employee workspace.
           </p>
           <button className="px-8 py-3 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
             Secure IndiaMART Handshake
           </button>
        </div>
      </div>
    </div>
  );
};

export default Segments;
