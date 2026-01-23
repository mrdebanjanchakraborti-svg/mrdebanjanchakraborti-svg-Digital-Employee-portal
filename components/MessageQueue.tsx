import React from 'react';
// Added Sparkles to the imports below
import { Clock, Send, AlertTriangle, CheckCircle, MessageSquare, Mail, Phone, ExternalLink, Calendar, Search, Filter, RefreshCw, Radio, Zap, Sparkles } from 'lucide-react';

const ExecutionLogs: React.FC = () => {
  const executions = [
    { id: 'ex_1', entity: 'IndiaMART Sync', type: 'trigger_hit', channel: 'webhook', content: 'Lead: Rohan Sharma (Mumbai)', scheduled: '2 mins ago', status: 'success', cost: 1 },
    { id: 'ex_2', entity: 'Elena Gilbert', type: 'dispatch', channel: 'whatsapp', content: 'Strategic Reply: Pricing ROI...', scheduled: '10 mins ago', status: 'success', cost: 1 },
    { id: 'ex_3', entity: 'AI Auditor', type: 'scoring', channel: 'gemini', content: 'BANT Analysis: High Intent', scheduled: '45 mins ago', status: 'success', cost: 2 },
    { id: 'ex_4', entity: 'FB Ad Signal', type: 'trigger_hit', channel: 'webhook', content: 'Lead: Sarah J (Delhi)', scheduled: '1 hour ago', status: 'success', cost: 1 },
    { id: 'ex_5', entity: 'Sonal Kapoor', type: 'dispatch', channel: 'whatsapp', content: 'Campaign: Q4 Reactivation', scheduled: '2 hours ago', status: 'failed', cost: 0, error: 'Solvency Failure' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Execution Registry</h2>
          <p className="text-slate-500 text-sm font-medium">Audit the live heartbeat and credit consumption of your autonomous infrastructure.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <RefreshCw size={14} /> Refresh Pulse
          </button>
          <button className="px-5 py-2.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-xl active:scale-95">
            Clear Success Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Executions (24h)", value: "1,284", icon: Zap, color: "text-indigo-600 bg-indigo-50" },
          { label: "Fuel Consumed", value: "3,420", icon: Send, color: "text-emerald-600 bg-emerald-50" },
          { label: "Trigger Hits", value: "850", icon: Radio, color: "text-blue-600 bg-blue-50" },
          { label: "Failed Protocols", value: "12", icon: AlertTriangle, color: "text-orange-600 bg-orange-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center border border-current/10 shadow-lg shadow-current/5`}>
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
        <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-8">
            <div className="relative w-64">
              <Search className="absolute left-4 top-3 text-slate-400" size={16} />
              <input type="text" placeholder="Search executions..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white text-[9px] font-black uppercase rounded-lg shadow-lg shadow-indigo-100">All Pulse</button>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 text-[9px] font-black uppercase rounded-lg hover:bg-slate-50">Trigger Hits</button>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 text-[9px] font-black uppercase rounded-lg hover:bg-slate-50">AI Decisions</button>
            </div>
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all"><Filter size={18} /></button>
        </header>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/20">
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol / Entity</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Execution Type</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payload Trace</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Fuel Cost</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {executions.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-500 text-[10px]">
                      {item.channel === 'webhook' ? <Radio size={14} /> : item.channel === 'gemini' ? <Sparkles size={14} /> : <Send size={14} />}
                    </div>
                    <div>
                       <span className="text-xs font-black text-slate-900 tracking-tight block">{item.entity}</span>
                       <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.scheduled}</span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-widest">
                    {item.type.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-10 py-6">
                  <p className="text-xs font-medium text-slate-500 line-clamp-1 italic max-w-xs">"{item.content}"</p>
                </td>
                <td className="px-10 py-6 text-center">
                  <span className="text-sm font-black text-slate-900">{item.cost}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase block">Credits</span>
                </td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest border ${
                      item.status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {item.status}
                    </span>
                    {item.error && <span className="text-[8px] font-bold text-red-400 italic line-clamp-1">{item.error}</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-center">
           <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-all">
             <Calendar size={14} /> Full Execution Ledger <ExternalLink size={12} />
           </button>
        </footer>
      </div>
    </div>
  );
};

export default ExecutionLogs;