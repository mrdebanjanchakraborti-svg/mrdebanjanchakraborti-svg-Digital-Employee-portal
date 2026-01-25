import React, { useState } from 'react';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Search, Filter, 
  Download, Clock, CheckCircle2, AlertCircle, RefreshCw,
  FileText, Coins, Landmark, Calendar, MoreHorizontal,
  ChevronRight, ArrowRight, ShieldCheck, Zap, Activity,
  Database, Shield, Terminal, TrendingUp, Sparkles,
  Archive, ExternalLink
} from 'lucide-react';
import { WalletTransaction, TransactionType } from '../types';

const MOCK_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'TXN_PULSE_9921',
    type: TransactionType.CREDIT,
    amount: 2500,
    purpose: 'Starter Plan Activation Pulse',
    payment_method: 'Razorpay (Auth: rzp_live_***)',
    status: 'success',
    created_at: '2024-11-20T10:00:00Z',
    gst_data: {
      base_amount: 2118.64,
      cgst: 190.68,
      sgst: 190.68,
      igst: 0,
      total_payable: 2500,
      gst_rate: 18
    }
  },
  {
    id: 'TXN_PULSE_9922',
    type: TransactionType.DEBIT,
    amount: 15,
    purpose: 'AI Voice Outreach Protocol: Elena Gilbert',
    status: 'success',
    created_at: '2024-11-20T11:15:00Z',
    reference_id: 'call_id_882x'
  },
  {
    id: 'TXN_PULSE_9923',
    type: TransactionType.DEBIT,
    amount: 3,
    purpose: 'WhatsApp Automated Handshake: Lead Inquiry',
    status: 'success',
    created_at: '2024-11-20T12:05:00Z',
    reference_id: 'wa_msg_771'
  },
  {
    id: 'TXN_PULSE_9924',
    type: TransactionType.DEBIT,
    amount: 5,
    purpose: 'AI Image Generation: Q4 Banner Alpha',
    status: 'success',
    created_at: '2024-11-21T09:30:00Z',
    reference_id: 'gcs_obj_442'
  },
  {
    id: 'TXN_PULSE_9925',
    type: TransactionType.CREDIT,
    amount: 1000,
    purpose: 'Fuel Injection: Wallet Top-up',
    payment_method: 'UPI (Auth: upi_gateway_v2)',
    status: 'success',
    created_at: '2024-11-22T14:45:00Z'
  }
];

const WalletLedger: React.FC<{ balance: number }> = ({ balance }) => {
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [search, setSearch] = useState('');

  const filteredTxns = MOCK_TRANSACTIONS.filter(t => {
    const matchesFilter = filter === 'all' || t.type === filter;
    const matchesSearch = t.purpose.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-full">
      {/* HIGH-IMPACT HEADER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Balance Pulse */}
        <div className="bg-[#0B1530] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[320px] group transition-all duration-700">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
               <h3 className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.4em] flex items-center gap-3">
                 <Coins size={18} className="animate-pulse" /> Current Wallet Balance
               </h3>
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-emerald-400 uppercase tracking-widest">Live Ledger</span>
            </div>
            <div className="flex items-baseline gap-2">
               <p className="text-7xl font-black tracking-tighter leading-none">{balance.toLocaleString()}</p>
               <p className="text-xl font-black text-indigo-400 uppercase tracking-widest opacity-60">CR</p>
            </div>
            <p className="text-[11px] font-bold text-slate-400 max-w-xs italic leading-relaxed">
              "Total AI fuel pool. Includes subscription credits and manual fuel injections."
            </p>
          </div>
          <div className="relative z-10 flex gap-4 pt-6 mt-6 border-t border-white/5">
             <button className="flex-1 py-4 bg-white text-[#0B1530] rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all hover:bg-indigo-50 flex items-center justify-center gap-2">
               <RefreshCw size={14} /> Instant Recharge
             </button>
             <button className="p-4 bg-white/5 border border-white/10 rounded-[1.5rem] text-white hover:bg-white/10 transition-all">
                <Terminal size={18} />
             </button>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:scale-125 transition-transform duration-1000" />
        </div>

        {/* Consumption Breakdown Card */}
        <div className="bg-white border border-slate-200 rounded-[3.5rem] p-10 flex flex-col shadow-sm">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
             <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Activity size={16} className="text-indigo-600" /> Consumption protocol
             </h4>
             <span className="text-[10px] font-black text-slate-900">LAST 24H</span>
           </div>
           <div className="flex-1 space-y-6">
              {[
                { l: 'Voice AI Outreach', p: 65, c: 'text-orange-500', bg: 'bg-orange-50' },
                { l: 'WhatsApp Handshakes', p: 25, c: 'text-emerald-500', bg: 'bg-emerald-50' },
                { l: 'Trigger Analysis', p: 10, c: 'text-indigo-500', bg: 'bg-indigo-50' }
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
                <span className="text-[9px] font-black text-slate-400 uppercase">Total Burn</span>
                <span className="text-xl font-black text-slate-900">432 Cr</span>
              </div>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-indigo-600 transition-all"><ArrowRight size={18} /></button>
           </div>
        </div>

        {/* Security & Integrity Card */}
        <div className="bg-white border border-slate-200 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-sm group">
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner group-hover:rotate-12 transition-transform">
                    <Shield size={28} />
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">Integrity Lock</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">GCS Encrypted Ledger</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">HMAC-SHA256 Sign Verified</span>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <Database size={18} className="text-indigo-400" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Multi-Tenant Vaulting Active</span>
                 </div>
              </div>
           </div>
           <div className="pt-6 border-t border-slate-50">
              <p className="text-[9px] text-slate-400 font-bold italic leading-relaxed">
                "Financial signatures are mirrored across three independent cloud nodes to ensure zero-loss integrity."
              </p>
           </div>
        </div>
      </div>

      {/* LEDGER REPOSITORY SECTION */}
      <div className="bg-white border border-slate-200 rounded-[3.5rem] overflow-hidden shadow-sm flex flex-col">
        <header className="px-12 py-10 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-slate-50/20">
          <div className="flex items-center gap-8 flex-1">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-900 shadow-xl shadow-slate-100">
                  <Archive size={28} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Ledger Repository</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">Full Traceability Pulse</p>
               </div>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Filter by ID, Reference or Payload..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-inner" 
              />
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex gap-1.5 p-1.5 bg-slate-100/50 rounded-2xl border border-slate-200 shadow-sm">
               {['all', 'credit', 'debit'].map(t => (
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
               <Download size={16} /> Global Export
            </button>
          </div>
        </header>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol Identity</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Temporal Pulse</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Action Logic / Payload</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Credit Value</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Solvency status</th>
                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTxns.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-12 py-8">
                    <div className="flex items-center gap-4">
                       <div className={`p-2 rounded-xl ${txn.type === TransactionType.CREDIT ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          {txn.type === TransactionType.CREDIT ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                       </div>
                       <span className="text-[11px] font-mono font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors uppercase">{txn.id}</span>
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{new Date(txn.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{new Date(txn.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <div className="space-y-2 max-w-xs">
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:translate-x-1 transition-transform">{txn.purpose}</p>
                      {txn.payment_method ? (
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-indigo-50 border border-indigo-100 rounded-lg w-fit">
                           <Landmark size={10} className="text-indigo-500" />
                           <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{txn.payment_method}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg w-fit">
                           <Zap size={10} className="text-slate-400" />
                           <span className="text-[9px] font-black text-suffix-500 uppercase tracking-widest">Ref: {txn.reference_id || 'System_Pulse'}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <div className="flex flex-col">
                       <div className={`flex items-center gap-1.5 text-xl font-black tracking-tighter ${txn.type === TransactionType.CREDIT ? 'text-emerald-600' : 'text-rose-600'}`}>
                         {txn.type === TransactionType.CREDIT ? '+' : '-'}{txn.amount.toLocaleString()}
                         <span className="text-[9px] uppercase tracking-[0.2em] font-black opacity-40">{txn.payment_method ? 'INR' : 'CR'}</span>
                       </div>
                       {txn.gst_data && (
                         <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">INC. 18% GST Protocol</span>
                       )}
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${txn.status === 'success' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'} animate-pulse`} />
                       <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{txn.status}</span>
                    </div>
                  </td>
                  <td className="px-12 py-8 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      {txn.type === TransactionType.CREDIT ? (
                        <button className="p-3 bg-white border border-slate-200 rounded-2xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90" title="Download Tax Invoice">
                          <FileText size={18} />
                        </button>
                      ) : (
                        <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-90" title="View Execution Trace">
                          <Terminal size={18} />
                        </button>
                      )}
                      <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm active:scale-90">
                         <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTxns.length === 0 && (
          <div className="p-32 text-center space-y-8 animate-in fade-in zoom-in duration-500">
             <div className="w-24 h-24 bg-slate-50 border-4 border-dashed border-slate-100 rounded-[3rem] mx-auto flex items-center justify-center text-slate-200 shadow-inner group">
                <Search size={48} className="group-hover:scale-110 transition-transform duration-700" />
             </div>
             <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Ecosystem Ledger Empty</h4>
                <p className="text-sm text-slate-400 font-medium italic max-w-sm mx-auto leading-relaxed">"No signals matching your current filter criteria were found in the global repository pulse."</p>
             </div>
          </div>
        )}

        <footer className="p-12 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-10">
           <div className="flex gap-16">
              <div className="space-y-1.5">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Compliance Protocol</p>
                 <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <p className="text-xs font-black text-slate-600 uppercase tracking-tighter">Verified Business entity</p>
                 </div>
              </div>
              <div className="space-y-1.5">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ledger Handshake</p>
                 <div className="flex items-center gap-2 text-indigo-600">
                    <Zap size={16} fill="currentColor" />
                    <p className="text-xs font-black uppercase tracking-tighter">Live Pulse Node v2.8</p>
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-indigo-600 transition-all group">
                <Shield size={14} /> Full Integrity Audit <ExternalLink size={12} className="group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <div className="w-px h-8 bg-slate-200" />
              <button className="flex items-center gap-3 text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] hover:underline group">
                Global Settlement Audit <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default WalletLedger;