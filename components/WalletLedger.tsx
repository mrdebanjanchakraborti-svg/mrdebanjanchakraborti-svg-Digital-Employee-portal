
import React, { useState } from 'react';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Search, Filter, 
  Download, Clock, CheckCircle2, AlertCircle, RefreshCw,
  FileText, Coins, Landmark, Calendar, MoreHorizontal,
  ChevronRight, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { WalletTransaction, TransactionType } from '../types';

const MOCK_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'TXN_9921',
    type: TransactionType.CREDIT,
    amount: 2500,
    purpose: 'Starter Plan Activation',
    payment_method: 'Razorpay (Card •••• 4210)',
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
    id: 'TXN_9922',
    type: TransactionType.DEBIT,
    amount: 15,
    purpose: 'AI Voice Outreach: Elena Gilbert',
    status: 'success',
    created_at: '2024-11-20T11:15:00Z',
    reference_id: 'call_210'
  },
  {
    id: 'TXN_9923',
    type: TransactionType.DEBIT,
    amount: 3,
    purpose: 'WhatsApp Automated Reply',
    status: 'success',
    created_at: '2024-11-20T12:05:00Z',
    reference_id: 'msg_882'
  },
  {
    id: 'TXN_9924',
    type: TransactionType.DEBIT,
    amount: 5,
    purpose: 'AI Image Generation (Content Engine)',
    status: 'success',
    created_at: '2024-11-21T09:30:00Z',
    reference_id: 'asset_442'
  },
  {
    id: 'TXN_9925',
    type: TransactionType.CREDIT,
    amount: 1000,
    purpose: 'Wallet Top-up',
    payment_method: 'UPI (rzp_pay_99x2)',
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
      {/* KPI HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0B1530] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[280px] group">
          <div className="relative z-10 space-y-2">
            <h3 className="text-[10px] font-black text-indigo-300/60 uppercase tracking-[0.3em] flex items-center gap-2">
              <Coins size={14} /> Fuel Solvency
            </h3>
            <p className="text-6xl font-black tracking-tighter leading-none">{balance.toLocaleString()}</p>
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic opacity-70">AI Credits Pulse Ready</p>
          </div>
          <button className="w-full py-4 bg-white text-[#0B1530] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all hover:bg-slate-100 relative z-10 flex items-center justify-center gap-2">
            <RefreshCw size={14} /> Instant Recharge
          </button>
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
        </div>

        <div className="bg-white border border-slate-200 rounded-[3rem] p-10 flex flex-col justify-between shadow-sm">
           <div className="space-y-6">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Debit Velocity (24h)</p>
             <div className="flex items-center gap-4">
                <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl">
                   <ArrowUpRight size={24} />
                </div>
                <div>
                   <p className="text-3xl font-black text-slate-900">420 Cr</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase">Automation Consumption</p>
                </div>
             </div>
           </div>
           <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Efficiency: 98%</span>
              <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Breakdown</button>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[3rem] p-10 flex flex-col justify-between shadow-sm">
           <div className="space-y-6">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recharge Pulse</p>
             <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                   <ArrowDownLeft size={24} />
                </div>
                <div>
                   <p className="text-3xl font-black text-slate-900">₹3,500</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase">Total Ledger Credits</p>
                </div>
             </div>
           </div>
           <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last: UPI • 2h ago</span>
              <ShieldCheck size={16} className="text-emerald-500" />
           </div>
        </div>
      </div>

      {/* LEDGER TABLE */}
      <div className="bg-white border border-slate-200 rounded-[3.5rem] overflow-hidden shadow-sm flex flex-col">
        <header className="px-12 py-8 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/30">
          <div className="flex items-center gap-8">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-3 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search ledger by ID or purpose..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all" 
              />
            </div>
            <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl shrink-0">
               {['all', 'credit', 'debit'].map(t => (
                 <button 
                  key={t}
                  onClick={() => setFilter(t as any)}
                  className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                 >
                   {t}
                 </button>
               ))}
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95">
             <Download size={14} /> Export Pulse Ledger
          </button>
        </header>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 sticky top-0 z-10">
              <tr>
                <th className="px-12 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Handshake ID</th>
                <th className="px-12 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Temporal Pulse</th>
                <th className="px-12 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Purpose / Payload</th>
                <th className="px-12 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Credit / Value</th>
                <th className="px-12 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-12 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTxns.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-12 py-6">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase group-hover:text-indigo-600 transition-colors">{txn.id}</span>
                  </td>
                  <td className="px-12 py-6">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-900 uppercase">{new Date(txn.created_at).toLocaleDateString()}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{new Date(txn.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </td>
                  <td className="px-12 py-6">
                    <div className="space-y-1 max-w-xs">
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tighter leading-none">{txn.purpose}</p>
                      {txn.payment_method ? (
                        <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                           <Landmark size={10} /> {txn.payment_method}
                        </p>
                      ) : (
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 italic">
                           <Zap size={10} /> Ref: {txn.reference_id || 'Internal Sequence'}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-12 py-6">
                    <div className={`flex items-center gap-2 text-lg font-black tracking-tighter ${txn.type === TransactionType.CREDIT ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {txn.type === TransactionType.CREDIT ? '+' : '-'}{txn.amount.toLocaleString()}
                      <span className="text-[9px] uppercase tracking-widest opacity-50">{txn.payment_method ? 'INR' : 'CR'}</span>
                    </div>
                  </td>
                  <td className="px-12 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${txn.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                       <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{txn.status}</span>
                    </div>
                  </td>
                  <td className="px-12 py-6 text-right">
                    {txn.type === TransactionType.CREDIT ? (
                      <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm active:scale-90">
                        <Download size={16} />
                      </button>
                    ) : (
                      <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-300 hover:text-slate-600 transition-all cursor-help" title="Usage Logs available in Execution Registry">
                        <Clock size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTxns.length === 0 && (
          <div className="p-20 text-center space-y-4">
             <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl mx-auto flex items-center justify-center text-slate-200">
                <Search size={32} />
             </div>
             <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No matching pulse in ledger</p>
          </div>
        )}

        <footer className="p-10 border-t border-slate-50 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex gap-10">
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Wallet Lifecycle</p>
                 <p className="text-xs font-bold text-slate-600">Active since Nov 2024</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">GST Protocol</p>
                 <p className="text-xs font-bold text-emerald-600 italic">Verified Entity • 18% Rule</p>
              </div>
           </div>
           <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline group">
              Global Transaction Audit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </footer>
      </div>
    </div>
  );
};

export default WalletLedger;
