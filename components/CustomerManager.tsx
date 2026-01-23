
import React from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, MapPin, BadgeCheck, MessageSquare } from 'lucide-react';

const CustomerManager: React.FC = () => {
  const customers = [
    { id: '1', name: 'Arjun Mehta', company: 'Mehta Properties', phone: '+91 98765 43210', email: 'arjun@mehta.com', city: 'Mumbai', status: 'won', agent: 'Sarah AI' },
    { id: '2', name: 'Priya Verma', company: 'Verma Tech', phone: '+91 87654 32109', email: 'priya@vtech.in', city: 'Delhi', status: 'active', agent: 'Kevin AI' },
    { id: '3', name: 'Rahul Singh', company: 'Singh Logistics', phone: '+91 76543 21098', email: 'rahul@singh.com', city: 'Pune', status: 'won', agent: 'Sarah AI' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Customer Directory</h2>
          <p className="text-slate-500 text-sm font-medium">Manage established relationships and active accounts.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-sm">Export CSV</button>
          <button className="px-6 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">+ New Account</button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
        <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3 text-slate-400" size={16} />
            <input type="text" placeholder="Filter by name, company, or city..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all"><Filter size={18} /></button>
        </header>
        
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/20">
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Identity</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Connect</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Location</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Autonomous Status</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Assigned AI</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-indigo-600 text-xs">
                      {c.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-tight">{c.name}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Phone size={12} className="text-slate-400" /> {c.phone}</div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Mail size={12} className="text-slate-400" /> {c.email}</div>
                   </div>
                </td>
                <td className="px-10 py-6">
                   <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                      <MapPin size={14} className="text-indigo-400" /> {c.city}
                   </div>
                </td>
                <td className="px-10 py-6">
                  <span className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest border ${
                    c.status === 'won' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                  }`}>
                    {c.status === 'won' ? 'Contracted' : 'Nurturing'}
                  </span>
                </td>
                <td className="px-10 py-6">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{c.agent}</span>
                   </div>
                </td>
                <td className="px-10 py-6 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm"><MessageSquare size={16} /></button>
                      <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 shadow-sm"><MoreVertical size={16} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerManager;
