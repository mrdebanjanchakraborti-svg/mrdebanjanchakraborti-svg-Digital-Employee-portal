
import React, { useState, useMemo } from 'react';
import { 
  Receipt, Search, Filter, Download, Calendar, 
  CreditCard, ShieldCheck, ArrowUpRight, Copy,
  CheckCircle2, Info, ChevronRight, Hash, DollarSign,
  Clock, Zap, RefreshCw, FileText, Lock, ArrowRight,
  Building2, Briefcase, Shield, Activity, Database,
  TrendingUp, Sparkles, Archive, ExternalLink, ShieldAlert,
  MoreHorizontal
} from 'lucide-react';
import { PlanTier, SubscriptionOrder } from '../types';

const MOCK_SUBSCRIPTION_ORDERS: SubscriptionOrder[] = [
  {
    id: '1',
    order_date: '2024-11-20T10:00:00Z',
    company_name: 'Nexus Tech Solutions',
    industry_focus: 'SaaS / Enterprise',
    order_id: 'SUB_INFRA_9921',
    razorpay_order_id: 'order_PN8y7z1v2w3x4y',
    razorpay_payment_id: 'pay_QN8y7z1v2w3x4y',
    razorpay_signature: '7d9f3b1a2e4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c',
    active_plan: PlanTier.GROWTH,
    purchase_amount: 6500,
    renewal_date: '2024-12-20',
    renewal_amount: 6500,
    status: 'active'
  }
];

interface SubscriptionLedgerProps {
  externalOrders?: SubscriptionOrder[];
}

const SubscriptionLedger: React.FC<SubscriptionLedgerProps> = ({ externalOrders = [] }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const combinedOrders = useMemo(() => {
    // Combine mock data with real external orders, real ones first
    const all = [...externalOrders, ...MOCK_SUBSCRIPTION_ORDERS];
    // Filter by search and status
    return all.filter(o => {
      const matchesSearch = o.company_name.toLowerCase().includes(search.toLowerCase()) ||
                           o.order_id.toLowerCase().includes(search.toLowerCase()) ||
                           o.razorpay_order_id.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || o.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [externalOrders, search, filter]);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20 max-w-full">
      {/* HIGH-IMPACT REVENUE ARCHITECTURE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Solvency Pulse: MRR & Fleet Status */}
        <div className="bg-[#0B1530] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[320px] group transition-all duration-700">
          <div className="relative z-10 space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.4em] flex items-center gap-3">
                  <Activity size={18} className="animate-pulse" /> Solvency Pulse
                </h3>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[9px] font-black text-emerald-400 uppercase tracking-widest">Revenue Live</span>
             </div>
             <div className="flex items-baseline gap-2">
                <p className="text-7xl font-black tracking-tighter leading-none">₹24.8L</p>
                <p className="text-xl font-black text-indigo-400 uppercase tracking-widest opacity-60">MRR</p>
             </div>
             <p className="text-[11px] font-bold text-slate-400 max-w-xs italic leading-relaxed">
               "Global recurring revenue synchronized via Razorpay Handshake. Workforce integrity verified 100%."
             </p>
          </div>
          <div className="relative z-10 flex gap-4 pt-6 mt-6 border-t border-white/5">
             <div className="flex-1 flex flex-col">
                <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Active Fleet</span>
                <span className="text-xl font-black">1,284 Entities</span>
             </div>
             <button className="p-4 bg-white/5 border border-white/10 rounded-[1.5rem] text-white hover:bg-white/10 transition-all">
                <TrendingUp size={18} />
             </button>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:scale-125 transition-transform duration-1000" />
        </div>

        {/* Fleet Distribution Protocol */}
        <div className="bg-white border border-slate-200 rounded-[3.5rem] p-10 flex flex-col shadow-sm">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
             <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Zap size={16} className="text-indigo-600" /> Fleet Distribution
             </h4>
             <span className="text-[10px] font-black text-slate-900">BY TIER</span>
           </div>
           <div className="flex-1 space-y-6">
              {[
                { l: 'Starter Protocols', p: 45, c: 'text-blue-500' },
                { l: 'Growth Solvency', p: 35, c: 'text-emerald-500' },
                { l: 'Pro & Enterprise', p: 20, c: 'text-indigo-600' }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tight">
                      <span className="text-slate-500">{item.l}</span>
                      <span className={item.c}>{item.p}%</span>
                   </div>
                   <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                      <div className={`h-full ${item.c.replace('text', 'bg')} rounded-full transition-all duration-1000`} style={{ width: `${item.p}%` }} />
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase">Avg. Lifecycle</span>
                <span className="text-xl font-black text-slate-900">8.4 Months</span>
              </div>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-indigo-600 transition-all"><ChevronRight size={18} /></button>
           </div>
        </div>

        {/* Financial Signature Lock */}
        <div className="bg-white border border-slate-200 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-sm group">
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner group-hover:rotate-12 transition-transform">
                    <ShieldCheck size={28} />
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">Signature Lock</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">HMAC-SHA256 Pulse</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <Lock size={18} className="text-indigo-400" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Razorpay Auth Verified</span>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <Archive size={18} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Invoices Mirrored to GCS</span>
                 </div>
              </div>
           </div>
           <div className="pt-6 border-t border-slate-50">
              <p className="text-[9px] text-slate-400 font-bold italic leading-relaxed">
                "All subscription handshakes are cryptographically signed and archived in the binary vault for multi-tenant compliance."
              </p>
           </div>
        </div>
      </div>

      {/* SUBSCRIPTION AUDIT LEDGER */}
      <div className="bg-white border border-slate-200 rounded-[3.5rem] overflow-hidden shadow-sm flex flex-col">
        <header className="px-12 py-10 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-slate-50/20">
          <div className="flex items-center gap-8 flex-1">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-900 shadow-xl shadow-slate-100">
                  <Receipt size={28} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Audit Repository</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">Full Subscription Integrity Pulse</p>
               </div>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Filter by Order, Company or Signature..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-inner" 
              />
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex gap-1.5 p-1.5 bg-slate-100/50 rounded-2xl border border-slate-200 shadow-sm">
               {['all', 'active', 'expired'].map(t => (
                 <button 
                  key={t}
                  onClick={() => setFilter(t as any)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white'}`}
                 >
                   {t}
                 </button>
               ))}
            </div>
            <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all active:scale-95"><Filter size={20} /></button>
            <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
               <Download size={16} /> Ledger Export
            </button>
          </div>
        </header>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Temporal & Identity</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Entity Focus</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">RZP Metadata Pulse</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Handshake Signature</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Purchase value</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Solvency status</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {combinedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-12 py-8">
                    <div className="space-y-1">
                       <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{new Date(order.order_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                       <p className="text-[11px] font-mono font-black text-indigo-600 uppercase">{order.order_id}</p>
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building2 size={12} className="text-indigo-400" />
                        <p className="text-sm font-black text-slate-900 tracking-tight">{order.company_name}</p>
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{order.industry_focus}</p>
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <div className="space-y-2 max-w-xs">
                       <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-xl w-fit">
                          <Hash size={10} className="text-indigo-400" />
                          <code className="text-[9px] font-mono font-bold text-slate-500 truncate w-32">{order.razorpay_order_id}</code>
                          <button onClick={() => handleCopy(order.razorpay_order_id, order.id + '_roid')} className="text-slate-300 hover:text-indigo-600 transition-all"><Copy size={10} /></button>
                       </div>
                       <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-xl w-fit">
                          <CreditCard size={10} className="text-slate-400" />
                          <code className="text-[9px] font-mono font-bold text-slate-500 truncate w-32">{order.razorpay_payment_id}</code>
                          <button onClick={() => handleCopy(order.razorpay_payment_id, order.id + '_rpid')} className="text-slate-300 hover:text-indigo-600 transition-all"><Copy size={10} /></button>
                       </div>
                    </div>
                  </td>
                  <td className="px-12 py-8">
                     <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 max-w-[200px]">
                        <code className="text-[8px] font-mono font-bold text-indigo-100/30 truncate">{order.razorpay_signature}</code>
                        <button onClick={() => handleCopy(order.razorpay_signature, order.id + '_sig')} className="p-1.5 bg-white/5 text-indigo-300 hover:text-indigo-100 transition-all rounded-lg"><Copy size={12} /></button>
                     </div>
                  </td>
                  <td className="px-12 py-8">
                    <div className="flex flex-col">
                       <div className="flex items-center gap-1.5 text-xl font-black tracking-tighter text-slate-900">
                         ₹{order.purchase_amount.toLocaleString()}
                         <span className="text-[9px] uppercase tracking-[0.2em] font-black opacity-40">INR</span>
                       </div>
                       <span className="text-[8px] font-bold text-indigo-600 uppercase tracking-widest mt-1">{order.active_plan} PROTOCOL</span>
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${order.status === 'active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'} animate-pulse`} />
                       <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{order.status}</span>
                    </div>
                  </td>
                  <td className="px-12 py-8 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-3 bg-white border border-slate-200 rounded-2xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90" title="Download Subscription Invoice">
                        <FileText size={18} />
                      </button>
                      <button className="p-3 bg-white border border-slate-200 rounded-2xl text-suffix-500 hover:text-indigo-600 shadow-sm active:scale-90">
                         <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {combinedOrders.length === 0 && (
          <div className="p-32 text-center space-y-8 animate-in fade-in zoom-in duration-500">
             <div className="w-24 h-24 bg-slate-50 border-4 border-dashed border-slate-100 rounded-[3rem] mx-auto flex items-center justify-center text-slate-200 shadow-inner group">
                <Search size={48} className="group-hover:scale-110 transition-transform duration-700" />
             </div>
             <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Ledger Registry Empty</h4>
                <p className="text-sm text-slate-400 font-medium italic max-w-sm mx-auto leading-relaxed">"No subscription signals found in the pulse repository matching your query."</p>
             </div>
          </div>
        )}

        <footer className="p-12 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-10">
           <div className="flex gap-16">
              <div className="space-y-1.5">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Governance Protocol</p>
                 <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <p className="text-xs font-black text-slate-600 uppercase tracking-tighter">Verified Revenue Audit v2.8</p>
                 </div>
              </div>
              <div className="space-y-1.5">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Financial Handshake</p>
                 <div className="flex items-center gap-2 text-indigo-600">
                    <Database size={16} />
                    <p className="text-xs font-black uppercase tracking-tighter">Mirrored to Cloud Ledger</p>
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-indigo-600 transition-all group">
                <ShieldAlert size={14} /> Full Security Trace <ExternalLink size={12} className="group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <div className="w-px h-8 bg-slate-200" />
              <button className="flex items-center gap-3 text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] hover:underline group">
                Authorize Global Settlement <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default SubscriptionLedger;
