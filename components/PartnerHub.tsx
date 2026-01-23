
import React, { useState } from 'react';
import { 
  Users, TrendingUp, Award, Smartphone, Copy, 
  Download, Target, PieChart, ExternalLink, ShieldCheck,
  CheckCircle2, Sparkles, Heart, Zap, Globe, MessageSquare,
  ChevronRight, Wallet, DollarSign, Clock, CreditCard,
  Building2, ArrowRight, Info, AlertTriangle, Briefcase, Filter,
  Upload, FileText, Loader2, Landmark, Shield, Archive,
  Image as ImageIcon, Lock, ShieldAlert, RefreshCw
} from 'lucide-react';

const PartnerHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'payouts' | 'bank' | 'creatives'>('overview');
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const handleDocUpload = (type: string) => {
    setIsUploading(type);
    // Path Mapping: /partners/{partnerId}/kyc/{type}.pdf
    setTimeout(() => {
      setIsUploading(null);
      alert(`Binary Pulse sync'd to GCS: /partners/id_772/kyc/${type.toLowerCase()}.pdf`);
    }, 1500);
  };

  const partnerCreatives = [
    { id: '1', title: 'Q4 Realtor Reactivation Banner', type: 'image', size: '1.2 MB', url: '/partners/id/creatives/realtor_q4.png' },
    { id: '2', title: 'AI Automation Pitch PDF', type: 'doc', size: '4.8 MB', url: '/partners/id/creatives/automation_v3.pdf' },
    { id: '3', title: 'IG Story Template', type: 'image', size: '2.4 MB', url: '/partners/id/creatives/story_v1.jpg' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="text-left space-y-2">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Distribution Pulse</h2>
          <p className="text-slate-500 text-lg font-medium italic">Autonomous **Revenue Sharing** & Asset Handshake.</p>
        </div>
        <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm shrink-0">
          {[
            { id: 'overview', label: 'Identity', icon: Zap },
            { id: 'payouts', label: 'Earnings', icon: DollarSign },
            { id: 'bank', label: 'Handshake', icon: Building2 },
            { id: 'creatives', label: 'GCS Vault', icon: Archive }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[350px] group">
              <div className="relative z-10">
                <h3 className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Zap size={16} fill="currentColor" /> Active Identity
                </h3>
                <div className="mt-4 flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl font-mono text-sm text-indigo-400 shadow-inner group-hover:border-indigo-500/30 transition-colors">
                   PARTNER_ALFA_99
                   <button className="ml-auto p-2 hover:bg-white/10 rounded-lg text-indigo-300 transition-all active:scale-95"><Copy size={16} /></button>
                </div>
              </div>
              <div className="relative z-10 space-y-4">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic leading-relaxed">"Your unique referral signal used for identity mapping across all conversion pulses."</p>
                 <button className="w-full py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-900 active:scale-95 flex items-center justify-center gap-2">
                   <Globe size={14} /> My Referrer Page
                 </button>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
            </div>

            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Target size={16} className="text-indigo-600" /> Tier Performance Pulse
                    </h3>
                    <span className="px-4 py-1 bg-orange-50 text-orange-600 text-[9px] font-black rounded-lg border border-orange-100 uppercase tracking-widest">Growth Alpha: Tier 2</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                     {[
                       { label: "Signup cut", val: "20%", icon: Sparkles, color: "text-indigo-600" },
                       // Fixed missing RefreshCw icon import from lucide-react
                       { label: "Renewal pulse", val: "15%", icon: RefreshCw, color: "text-emerald-600" },
                       { label: "Ref. Velocity", val: "12 / mo", icon: TrendingUp, color: "text-amber-500" },
                       { label: "Alpha LTV", val: "₹1.4L", icon: DollarSign, color: "text-indigo-900" }
                     ].map((m, i) => (
                       <div key={i} className="space-y-1">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <m.icon size={10} className={m.color} /> {m.label}
                          </p>
                          <p className="text-xl font-black text-slate-900">{m.val}</p>
                       </div>
                     ))}
                  </div>

                  <div className="pt-6 border-t border-slate-50">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tight mb-3">
                        <span className="text-slate-400 italic">Progress to Tier 3 (25% Split)</span>
                        <span className="text-indigo-600">82% Efficiency</span>
                     </div>
                     <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full w-[82%] bg-indigo-600 rounded-full shadow-lg animate-pulse" />
                     </div>
                  </div>
               </div>
            </div>
        </div>
      )}

      {activeTab === 'creatives' && (
        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex items-center justify-between group">
              <div className="relative z-10 flex items-center gap-6">
                 <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl">
                    <Archive size={32} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Marketing Pulse Vault</h3>
                    <p className="text-slate-400 text-sm font-medium italic opacity-80">Synced via **GCS Distribution Network**. Optimized for high-conversion outreach.</p>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {partnerCreatives.map(c => (
               <div key={c.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between group hover:border-indigo-600 transition-all hover:shadow-xl hover:shadow-indigo-500/5">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                      {c.type === 'image' ? <ImageIcon size={20} /> : <FileText size={20} />}
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase">{c.title}</h4>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{c.size} • Private Object</p>
                   </div>
                 </div>
                 <div className="bg-slate-50 p-3 rounded-xl mb-6 font-mono text-[9px] text-slate-400 truncate">
                    {c.url}
                 </div>
                 <button className="w-full py-4 bg-slate-900 text-white text-[10px] font-black uppercase rounded-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl">
                    <Download size={14} /> Authorize Signed Pulse
                 </button>
               </div>
             ))}
           </div>
        </div>
      )}

      {activeTab === 'bank' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm space-y-10">
                 <div className="flex items-center gap-4">
                    <div className="p-4 bg-indigo-600 rounded-[2rem] text-white shadow-xl">
                       <Landmark size={32} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Financial Disbursement Handshake</h3>
                       <p className="text-slate-400 text-sm font-medium italic">Configure your autonomous settlement engine via **RazorpayX Protocol**.</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payee Identity</label>
                       <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 text-sm font-bold" placeholder="Legal Entity Name" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Settlement Account (Ciphered)</label>
                       <div className="relative">
                          <input type="password" value="********4210" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 text-sm font-bold" readOnly />
                          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-indigo-600 uppercase">Update</button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] flex items-center gap-2">
                          <Shield size={16} /> Identity Compliance (GCS)
                       </h3>
                    </div>
                    
                    <div className="space-y-6">
                       {[
                         { id: 'pan', label: 'PAN Identity Binary', type: 'PAN' },
                         { id: 'gst', label: 'Tax Governance (GST)', type: 'GST' },
                         { id: 'cheque', label: 'Cancelled Ledger Pulse', type: 'CHEQUE' },
                       ].map(doc => (
                         <div key={doc.id} className="space-y-2 group/item">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{doc.label}</p>
                            <button 
                              onClick={() => handleDocUpload(doc.type)}
                              disabled={!!isUploading}
                              className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group/doc relative overflow-hidden"
                            >
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-400 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                     {isUploading === doc.type ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                                  </div>
                                  <div className="text-left">
                                     <span className="text-[10px] font-black uppercase text-indigo-100 block">Sync Binary</span>
                                     <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Authenticated Pulse Only</span>
                                  </div>
                               </div>
                               <Upload size={16} className="text-slate-500 group-hover/doc:text-indigo-400 transition-colors" />
                            </button>
                         </div>
                       ))}
                    </div>
                    
                    <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-4">
                       <ShieldAlert size={20} className="text-amber-500 shrink-0" />
                       <p className="text-[10px] text-amber-200 font-bold leading-relaxed italic">"Objects are encrypted in transit and stored in a private GCS bucket with restricted service account access."</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PartnerHub;
