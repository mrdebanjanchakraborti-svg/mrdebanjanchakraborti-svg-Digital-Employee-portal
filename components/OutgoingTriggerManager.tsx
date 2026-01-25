
import React, { useState } from 'react';
import { 
  Share, Plus, Copy, CheckCircle, Trash2, 
  ShieldCheck, Loader2, Info, 
  ArrowRight, Clock, Activity, X,
  Terminal, ShieldAlert, Pause, Play, MoreVertical, Code,
  RefreshCw, Lock, MessageSquare, Send, Coins, Edit2,
  Zap, Target, Sparkles, PhoneCall, Globe
} from 'lucide-react';
import { OutgoingTrigger, OutgoingTriggerEvent, OutgoingDestinationType, TriggerStatus, PlanTier, RetryPolicy } from '../types';

const PLAN_LIMITS: Record<PlanTier, number> = {
  [PlanTier.FREE]: 1,
  [PlanTier.STARTER]: 3,
  [PlanTier.GROWTH]: 10,
  [PlanTier.PRO]: 25,
  [PlanTier.ENTERPRISE]: 999
};

interface OutgoingTriggerManagerProps {
  userPlan: PlanTier;
  isExpired?: boolean;
}

const OutgoingTriggerManager: React.FC<OutgoingTriggerManagerProps> = ({ userPlan, isExpired }) => {
  const [triggers, setTriggers] = useState<OutgoingTrigger[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrigger, setEditingTrigger] = useState<OutgoingTrigger | null>(null);
  const [isTesting, setIsTesting] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCreditInfo, setShowCreditInfo] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    event_type: OutgoingTriggerEvent.LEAD_CREATED,
    destination_type: OutgoingDestinationType.N8N,
    destination_url: '',
    retry_policy: RetryPolicy.INSTANT
  });

  // Effective limit drops to 0 if expired on free tier
  const effectiveLimit = (isExpired && userPlan === PlanTier.FREE) ? 0 : PLAN_LIMITS[userPlan];
  const usage = triggers.length;

  const handleOpenCreate = () => {
    if (isExpired && userPlan === PlanTier.FREE) {
      alert("Handshake Blocked: Your free validity has expired. No further outgoing protocols can be authorized.");
      return;
    }
    setEditingTrigger(null);
    setFormData({
      name: '',
      event_type: OutgoingTriggerEvent.LEAD_CREATED,
      destination_type: OutgoingDestinationType.N8N,
      destination_url: '',
      retry_policy: RetryPolicy.INSTANT
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: OutgoingTrigger) => {
    setEditingTrigger(t);
    setFormData({
      name: t.name,
      event_type: t.event_type,
      destination_type: t.destination_type,
      destination_url: t.destination_url,
      retry_policy: t.retry_policy
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editingTrigger) {
      setTriggers(prev => prev.map(t => t.id === editingTrigger.id ? { 
        ...t, 
        name: formData.name, 
        destination_url: formData.destination_url,
        event_type: formData.event_type,
        destination_type: formData.destination_type,
        retry_policy: formData.retry_policy
      } : t));
    } else {
      if (usage >= effectiveLimit) {
        alert(`Limit Exceeded: Your current status only allows ${effectiveLimit} outgoing trigger(s). Upgrade to restore outbound pulses.`);
        return;
      }

      const t: OutgoingTrigger = {
        id: 'ot_' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        workspace_id: 'ws_123_alpha',
        name: formData.name || `Outbound Protocol ${usage + 1}`,
        event_type: formData.event_type,
        destination_type: formData.destination_type,
        destination_url: formData.destination_url,
        secret: 'whsk_ot_' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        status: TriggerStatus.ACTIVE,
        retry_policy: formData.retry_policy,
        usage_count: 0,
        created_at: new Date().toISOString()
      };
      setTriggers([t, ...triggers]);
    }
    setIsModalOpen(false);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTest = (id: string) => {
    if (isExpired && userPlan === PlanTier.FREE) {
      alert("Pulse Blocked: Your free validity has expired. External broadcasts are disabled.");
      return;
    }
    
    const trigger = triggers.find(t => t.id === id);
    if (!trigger) return;

    setIsTesting(id);
    setTimeout(() => {
      setIsTesting(null);
      alert(`Outbound Pulse Success: X-Signature verified for '${trigger.name}'. Event '${trigger.event_type}' successfully reached destination. 1 AI Credit deducted from ledger.`);
      setTriggers(prev => prev.map(t => t.id === id ? { ...t, usage_count: t.usage_count + 1, last_dispatch_at: new Date().toISOString() } : t));
    }, 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-4">
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Outgoing Triggers</h2>
              <button onClick={() => setShowCreditInfo(true)} className="p-2 text-indigo-400 hover:bg-indigo-50 rounded-xl transition-all" title="How AI Credits Work">
                <Info size={28} />
              </button>
           </div>
           <p className="text-slate-500 text-xl font-medium max-w-2xl italic leading-relaxed opacity-80">
             Automated outbound broadcasts from platform events to your external stack.
           </p>
        </div>
        
        <div className="flex items-end gap-12">
           <div className="text-right space-y-1">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Plan Broadcast Capacity</p>
              <p className="text-3xl font-black text-slate-900">{usage} / {effectiveLimit === 999 ? '∞' : effectiveLimit} Protocols</p>
           </div>
           <div className="relative group">
             <button 
              onClick={handleOpenCreate}
              className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95 ${usage >= effectiveLimit ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#5143E1] text-white hover:bg-indigo-700 shadow-indigo-200'}`}
             >
                {(usage >= effectiveLimit || isExpired) ? <Lock size={20} /> : <Plus size={20} />} Create Outgoing Trigger
             </button>
           </div>
        </div>
      </header>

      {/* TRIGGER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {triggers.map(t => (
          <div key={t.id} className={`bg-white border border-slate-100 rounded-[4rem] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.04)] group transition-all flex flex-col justify-between min-h-[550px] relative overflow-hidden ${isExpired && userPlan === PlanTier.FREE ? 'opacity-60 grayscale' : ''}`}>
             <div className="space-y-10 relative z-10">
                <div className="flex items-center justify-between">
                   <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#5143E1] shadow-inner group-hover:scale-105 transition-transform duration-500">
                      <Share size={32} />
                   </div>
                   <div className="flex items-center gap-4">
                      <span className={`px-5 py-1.5 text-[10px] font-black rounded-xl border uppercase tracking-[0.25em] ${t.status === TriggerStatus.ACTIVE && (!isExpired || userPlan !== PlanTier.FREE) ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                         {isExpired && userPlan === PlanTier.FREE ? 'Suspended' : t.status}
                      </span>
                      <button onClick={() => handleOpenEdit(t)} className="text-slate-300 hover:text-slate-900 p-2 hover:bg-slate-50 rounded-xl transition-all"><MoreVertical size={24}/></button>
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-4xl font-black text-slate-900 uppercase tracking-tighter truncate" title={t.name}>{t.name}</h4>
                   <div className="flex flex-wrap gap-3">
                      <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100 uppercase tracking-widest">
                         {t.event_type.toUpperCase()}
                      </span>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-between group/code shadow-inner">
                      <code className="text-[12px] font-mono font-bold text-slate-500 truncate flex-1 pr-6">{t.destination_url}</code>
                      <div className="flex gap-2">
                        <button onClick={() => handleCopy(t.destination_url, t.id)} className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all active:scale-90">
                           {copiedId === t.id ? <CheckCircle size={20} /> : <Copy size={20} />}
                        </button>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between px-2 pt-2">
                    <div className="flex items-center gap-3 text-indigo-400/80">
                       <Clock size={16} />
                       <span className="text-[11px] font-black uppercase tracking-[0.25em]">{t.usage_count} Dispatches Total</span>
                    </div>
                </div>
             </div>

             <div className="pt-10 mt-10 border-t border-slate-50 flex items-center gap-4 relative z-10">
                <button 
                   onClick={() => handleTest(t.id)}
                   disabled={!!isTesting || (isExpired && userPlan === PlanTier.FREE)}
                   className="flex-[3] py-6 bg-[#0F111A] text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl active:scale-95 disabled:opacity-30 flex items-center justify-center gap-4 transition-all hover:bg-slate-800"
                >
                   {isTesting === t.id ? <Loader2 size={18} className="animate-spin" /> : <Activity size={18} />}
                   Fire Test Pulse
                </button>
                <button className="flex-1 py-6 bg-white border border-slate-100 text-slate-300 rounded-[2rem] hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm flex items-center justify-center active:scale-95">
                   <Pause size={24}/>
                </button>
                <button className="flex-1 py-6 bg-white border border-slate-100 text-slate-200 hover:text-rose-500 hover:border-rose-100 transition-all shadow-sm flex items-center justify-center active:scale-95">
                   <Trash2 size={24} />
                </button>
             </div>
          </div>
        ))}
        
        {usage < effectiveLimit && (
          <button 
             onClick={handleOpenCreate}
             className="border-4 border-dashed border-slate-100 rounded-[4rem] p-12 flex flex-col items-center justify-center text-slate-300 hover:border-indigo-200 hover:text-[#5143E1] transition-all bg-slate-50/20 group h-full min-h-[550px]"
          >
             <div className="w-24 h-24 rounded-[3rem] bg-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                <Plus size={56} />
             </div>
             <p className="text-xl font-black uppercase tracking-[0.3em]">Scale Outbound Fleet</p>
             <p className="text-[11px] font-bold text-slate-400 uppercase mt-4 tracking-widest italic">Protocol Slots Remaining: {effectiveLimit - usage}</p>
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[4rem] shadow-[0_60px_150px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
             <header className="px-12 py-10 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-[#5143E1] rounded-[1.25rem] flex items-center justify-center text-white shadow-xl">
                      <Share size={28} />
                   </div>
                   <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight">{editingTrigger ? 'Update Outbound Pulse' : 'Authorize Outbound Pulse'}</h3>
                   </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-4 bg-slate-100 text-slate-400 rounded-2xl hover:text-slate-900 transition-all">
                   <X size={28} />
                </button>
             </header>

             <main className="p-12 space-y-10 bg-[#FBFCFE]">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Fleet Identity (Name)</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. n8n High Intent Ingestion"
                    className="w-full px-8 py-5 bg-white border border-slate-200 rounded-[2rem] outline-none focus:ring-8 focus:ring-indigo-500/5 text-sm font-bold shadow-inner transition-all"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination Endpoint URL</label>
                  <textarea 
                    rows={2}
                    value={formData.destination_url}
                    onChange={e => setFormData({...formData, destination_url: e.target.value})}
                    placeholder="https://hooks.external.com/v1/..."
                    className="w-full px-8 py-5 bg-white border border-slate-200 rounded-[2rem] outline-none focus:ring-8 focus:ring-indigo-500/5 text-xs font-mono font-bold shadow-inner resize-none transition-all"
                  />
                </div>
             </main>

             <footer className="p-12 bg-white border-t border-slate-100 flex gap-5 shrink-0">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all active:scale-95">Discard</button>
                <button 
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.destination_url}
                  className="flex-[2] py-6 bg-[#5143E1] text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-95 disabled:opacity-50"
                >
                  {editingTrigger ? 'Update Sequence' : 'Authorize Sequence'}
                </button>
             </footer>
          </div>
        </div>
      )}

      {showCreditInfo && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowCreditInfo(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 p-12 space-y-12">
             <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-[#5143E1] rounded-[3rem] mx-auto flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
                   <Coins size={48} />
                </div>
                <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">AI Credit Handshake</h3>
             </div>
             <button onClick={() => setShowCreditInfo(false)} className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">Handshake Acknowledged</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutgoingTriggerManager;
