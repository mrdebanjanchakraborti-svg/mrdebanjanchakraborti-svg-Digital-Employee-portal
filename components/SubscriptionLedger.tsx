
import React, { useState } from 'react';
import { 
  Receipt, Search, Filter, Download, Calendar, 
  CreditCard, ShieldCheck, ArrowUpRight, Copy,
  CheckCircle2, Info, ChevronRight, Hash, DollarSign,
  Clock, Zap, RefreshCw, FileText, Lock, ArrowRight,
  Building2, Briefcase
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
  },
  {
    id: '2',
    order_date: '2024-10-21T14:30:00Z',
    company_name: 'Blue Harbor Realty',
    industry_focus: 'Real Estate',
    order_id: 'SUB_INFRA_8842',
    razorpay_order_id: 'order_AM2x9b3c4d5e6f',
    razorpay_payment_id: 'pay_BM2x9b3c4d5e6f',
    razorpay_signature: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
    active_plan: PlanTier.STARTER,
    purchase_amount: 2500,
    renewal_date: '2024-11-21',
    renewal_amount: 2500,
    status: 'expired'
  }
];

const SubscriptionLedger: React.FC = () => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredOrders = MOCK_SUBSCRIPTION_ORDERS.filter(o => 
    o.company_name.toLowerCase().includes(search.toLowerCase()) ||
    o.order_id.toLowerCase().includes(search.toLowerCase()) ||
    o.razorpay_order_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-full">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between group hover:border-indigo-600 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner mb-6 group-hover:scale-110 transition-transform">
               <Building2 size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Accounts</p>
               <p className="text-3xl font-black text-slate-900">1,284</p>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between group hover:border-indigo-600 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner mb-6 group-hover:scale-110 transition-transform">
               <DollarSign size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Recurring Pulse</p>
               <p className="text-3xl font-black text-slate-900">₹4.2L</p>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between group hover:border-indigo-600 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner mb-6 group-hover:scale-110 transition-transform">
               <RefreshCw size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Renewal Value</p>
               <p className="text-3xl font-black text-slate-900">₹6,500</p>
            </div>
         </div>
         <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between group">
            <div className="relative z-10">
               <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Ecosystem Audit</p>
               <p className="text-2xl font-black uppercase tracking-tight">Verified Solvency</p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-[10px] font-bold text-emerald-400">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               SIGNATURE_AUTH_READY
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
         </div>
      </div>

      {/* LEDGER TABLE */}
      <div className="bg-white border border-slate-200 rounded-[3.5rem] overflow-hidden shadow-sm flex flex-col">
        <header className="px-10 py-8 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/30">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm">
               <Receipt size={24} />
            </div>
            <div>
               <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none">Subscription Audit Ledger</h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Full Transaction & Identity Mapping</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-3 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search Company, ID, or Razorpay Ref..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all" 
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all"><Filter size={18} /></button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
               <Download size={16} /> Export CSV
            </button>
          </div>
        </header>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 min-w-[140px]">Temporal</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 min-w-[200px]">Identity & Focus</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 min-w-[240px]">Internal & RZP Order</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 min-w-[200px]">Payment ID & Sign</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 min-w-[140px]">Active Plan</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right min-w-[120px]">Purchase</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right min-w-[160px]">Renewal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-[11px] font-black text-slate-900 uppercase">{new Date(order.order_date).toLocaleDateString()}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{new Date(order.order_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building2 size={12} className="text-indigo-400" />
                        <p className="text-sm font-black text-slate-900 tracking-tight">{order.company_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={10} className="text-slate-300" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.industry_focus}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 group/id">
                        <code className="text-[9px] font-mono font-bold text-indigo-600 truncate">{order.order_id}</code>
                        <button onClick={() => handleCopy(order.order_id, order.id + '_oid')} className="p-1 text-slate-300 hover:text-indigo-600 transition-all">
                           {copiedId === order.id + '_oid' ? <CheckCircle2 size={10} /> : <Copy size={10} />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2 p-2 bg-indigo-50/30 rounded-xl border border-indigo-100 group/id">
                        <div className="flex items-center gap-1.5 truncate">
                           <Hash size={10} className="text-indigo-400 shrink-0" />
                           <code className="text-[9px] font-mono font-bold text-slate-500 truncate">{order.razorpay_order_id}</code>
                        </div>
                        <button onClick={() => handleCopy(order.razorpay_order_id, order.id + '_roid')} className="p-1 text-slate-300 hover:text-indigo-600 transition-all">
                           {copiedId === order.id + '_roid' ? <CheckCircle2 size={10} /> : <Copy size={10} />}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 group/id">
                        <div className="flex items-center gap-1.5 truncate">
                           <CreditCard size={10} className="text-slate-400 shrink-0" />
                           <code className="text-[9px] font-mono font-bold text-slate-500 truncate">{order.razorpay_payment_id}</code>
                        </div>
                        <button onClick={() => handleCopy(order.razorpay_payment_id, order.id + '_rpid')} className="p-1 text-slate-300 hover:text-indigo-600 transition-all">
                           {copiedId === order.id + '_rpid' ? <CheckCircle2 size={10} /> : <Copy size={10} />}
                        </button>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                           <Lock size={10} className="text-indigo-400 shrink-0" />
                           <code className="text-[8px] font-mono font-bold text-indigo-100/30 truncate">{order.razorpay_signature}</code>
                        </div>
                        <button onClick={() => handleCopy(order.razorpay_signature, order.id + '_sig')} className="p-1 text-indigo-300/50 hover:text-indigo-300 transition-all">
                           {copiedId === order.id + '_sig' ? <CheckCircle2 size={10} /> : <Copy size={10} />}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`p-2 rounded-lg ${order.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          <Zap size={14} fill={order.status === 'active' ? 'currentColor' : 'none'} />
                       </div>
                       <div>
                          <p className="text-[11px] font-black text-slate-900 uppercase tracking-tighter leading-none">{order.active_plan}</p>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${order.status === 'active' ? 'text-emerald-500' : 'text-slate-400'}`}>
                             {order.status === 'active' ? 'Live' : 'Inactive'}
                          </span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <p className="text-sm font-black text-slate-900 tracking-tighter">₹{order.purchase_amount.toLocaleString()}</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">INC. GST</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="space-y-1">
                       <div className="flex items-center justify-end gap-1.5 text-indigo-600">
                          <Calendar size={10} />
                          <span className="text-[10px] font-black uppercase tracking-tighter">{new Date(order.renewal_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                       </div>
                       <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Cycle: ₹{order.renewal_amount.toLocaleString()}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="p-32 text-center space-y-6">
             <div className="w-20 h-20 bg-slate-50 border-4 border-dashed border-slate-100 rounded-[2.5rem] mx-auto flex items-center justify-center text-slate-200">
                <Search size={40} />
             </div>
             <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">No Matching Signal</h4>
                <p className="text-sm text-slate-400 font-medium italic">Adjust your filters to reveal hidden ledger pulses.</p>
             </div>
          </div>
        )}

        <footer className="p-10 border-t border-slate-50 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-10">
           <div className="flex gap-12">
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Audit Mechanism</p>
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <p className="text-xs font-bold text-slate-600">HMAC-SHA256 Integrity Verified</p>
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol Path</p>
                 <p className="text-xs font-bold text-indigo-600">Omnichannel Billing Hub v2.8</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-all">
                 <FileText size={14} /> Full Schema Audit
              </button>
              <div className="w-px h-8 bg-slate-200" />
              <button className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 group">
                 Financial Pulse Controls <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default SubscriptionLedger;
