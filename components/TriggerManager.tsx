
import React, { useState } from 'react';
import { 
  Radio, Plus, Search, Filter, Copy, CheckCircle, Trash2, 
  Settings2, Zap, ShieldCheck, Globe, Loader2, Info, 
  ArrowRight, CreditCard, Clock, Activity, Target, Landmark, X,
  Terminal, ShieldAlert, Pause, Play, MoreVertical, Shield
} from 'lucide-react';
import { TriggerType, TriggerStatus, PlanTier, Trigger } from '../types';

const PLAN_LIMITS: Record<PlanTier, number> = {
  [PlanTier.FREE]: 0,
  [PlanTier.STARTER]: 1,
  [PlanTier.GROWTH]: 5,
  [PlanTier.PRO]: 15,
  [PlanTier.ENTERPRISE]: 999
};

const MOCK_TRIGGERS: Trigger[] = [
  {
    id: 'tr_rzp_revenue',
    workspace_id: 'ws_123',
    name: 'Razorpay Revenue Pulse',
    type: TriggerType.CUSTOM_WEBHOOK,
    status: TriggerStatus.ACTIVE,
    webhook_url: 'https://digitalemployee.me/api/webhook',
    secret: 'whsk_rzp_7d9f3b1a2e',
    event_type: 'payment.captured, payment.failed',
    usage_count: 42,
    created_at: '2024-11-21T08:00:00Z'
  },
  {
    id: 'tr_1',
    workspace_id: 'ws_123',
    name: 'IndiaMART Lead Sync',
    type: TriggerType.LEAD_INGESTION,
    status: TriggerStatus.ACTIVE,
    webhook_url: 'https://digitalemployee.me/ingest/indiamart-9921',
    secret: 'sig_a82b3c',
    event_type: 'new_lead',
    usage_count: 1240,
    created_at: '2024-11-10T10:00:00Z'
  }
];

const TriggerManager: React.FC<{ userPlan: PlanTier }> = ({ userPlan }) => {
  const [triggers, setTriggers] = useState<Trigger[]>(userPlan === PlanTier.FREE ? [] : MOCK_TRIGGERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTesting, setIsTesting] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newTrigger, setNewTrigger] = useState({
    name: '',
    type: TriggerType.LEAD_INGESTION
  });

  const limit = PLAN_LIMITS[userPlan];
  const usage = triggers.length;

  const handleCreateTrigger = () => {
    if (userPlan === PlanTier.FREE) {
       alert("Scale Blocked: Incoming triggers are restricted in the Free tier.");
       setIsModalOpen(false);
       return;
    }

    if (usage >= limit) {
      alert(`Limit Reached: Upgrade to authorize more triggers.`);
      setIsModalOpen(false);
      return;
    }

    const t: Trigger = {
      id: 'tr_' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      workspace_id: 'ws_123',
      name: newTrigger.name,
      type: newTrigger.type,
      status: TriggerStatus.ACTIVE,
      webhook_url: `https://digitalemployee.me/ingest/${newTrigger.name.toLowerCase().replace(/\s+/g, '-')}`,
      secret: 'sig_' + Math.random().toString(36).substr(2, 6),
      event_type: 'custom_pulse',
      usage_count: 0,
      created_at: new Date().toISOString()
    };

    setTriggers([t, ...triggers]);
    setIsModalOpen(false);
    setNewTrigger({ name: '', type: TriggerType.LEAD_INGESTION });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTest = (id: string) => {
    setIsTesting(id);
    setTimeout(() => {
      setIsTesting(null);
      alert("Pulse Handshake Success: Captured signal verified.");
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
           <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">Incoming Triggers</h2>
           <p className="text-slate-500 text-lg font-medium italic mt-2">Manage autonomous signal handshakes from external sources.</p>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workspace Signal Capacity</p>
              <p className="text-lg font-black text-slate-900">{usage} / {limit === 999 ? '∞' : limit} Triggers Active</p>
           </div>
           <button 
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${userPlan === PlanTier.FREE || usage >= limit ? 'bg-slate-100 text-slate-400 opacity-60' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'}`}
           >
              <Plus size={18} /> New Protocol Link
           </button>
        </div>
      </header>

      {/* TRIGGER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {triggers.map(t => (
          <div key={t.id} className={`bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm group hover:border-indigo-600 transition-all flex flex-col justify-between min-h-[420px] relative overflow-hidden ${t.id === 'tr_rzp_revenue' ? 'ring-2 ring-indigo-500/20' : ''}`}>
             <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                   <div className={`p-3 rounded-2xl ${t.id === 'tr_rzp_revenue' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 shadow-inner'}`}>
                      {t.id === 'tr_rzp_revenue' ? <CreditCard size={24} /> : <Radio size={24} />}
                   </div>
                   <div className="flex gap-2">
                      {t.id === 'tr_rzp_revenue' && (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-lg border border-emerald-100 uppercase tracking-tighter">Live Revenue Monitoring</span>
                      )}
                      <button className="text-slate-400 hover:text-slate-900 p-1"><MoreVertical size={18}/></button>
                   </div>
                </div>

                <div>
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">{t.name}</h4>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5 line-clamp-1">
                      {t.event_type.split(',').map((evt, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-indigo-500">{evt.trim()}</span>
                      ))}
                   </p>
                </div>

                <div className="space-y-3">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Endpoint Interface</p>
                   <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group/code shadow-inner">
                      <code className="text-[10px] font-mono font-bold text-slate-500 truncate w-40">{t.webhook_url}</code>
                      <button 
                         onClick={() => handleCopy(t.webhook_url, t.id)}
                         className="p-2 bg-white rounded-xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all"
                      >
                         {copiedId === t.id ? <CheckCircle size={14} /> : <Copy size={14} />}
                      </button>
                   </div>
                   <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                         <Shield size={12} className="text-indigo-400" />
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secret: {t.secret.substring(0, 8)}***</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Clock size={12} className="text-slate-300" />
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.usage_count} Hits</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="pt-8 mt-8 border-t border-slate-50 flex gap-3 relative z-10">
                <button 
                   onClick={() => handleTest(t.id)}
                   disabled={!!isTesting}
                   className="flex-1 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2 transition-all hover:bg-indigo-600"
                >
                   {isTesting === t.id ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                   Fire Handshake
                </button>
                <button className="p-3.5 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-indigo-600 transition-all shadow-sm">
                   <Settings2 size={18}/>
                </button>
                <button className="p-3.5 bg-white border border-slate-200 text-slate-300 hover:text-rose-500 transition-all shadow-sm">
                   <Trash2 size={18} />
                </button>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-40 group-hover:scale-110 transition-transform duration-700" />
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <header className="px-12 py-10 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-[#5143E1] rounded-2xl flex items-center justify-center text-white shadow-xl">
                      <Radio size={28} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Configure Protocol</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Define your secure incoming interface</p>
                   </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-100 text-slate-400 rounded-2xl hover:text-slate-900 transition-all">
                   <X size={24} />
                </button>
             </header>

             <main className="p-12 space-y-10 bg-[#FBFCFE]">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Source Identifier (Name)</label>
                   <input 
                    type="text" 
                    value={newTrigger.name}
                    onChange={e => setNewTrigger({...newTrigger, name: e.target.value})}
                    placeholder="e.g. Razorpay Main Webhook"
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold shadow-inner transition-all"
                   />
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Interface Protocol</label>
                   <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: TriggerType.LEAD_INGESTION, name: 'Lead Pulse', desc: 'Standard CRM Entry' },
                        { id: TriggerType.CUSTOM_WEBHOOK, name: 'Revenue Handshake', desc: 'Financial Events' }
                      ].map(type => (
                        <button 
                          key={type.id}
                          onClick={() => setNewTrigger({...newTrigger, type: type.id as any})}
                          className={`p-6 border rounded-3xl text-left transition-all relative overflow-hidden group ${newTrigger.type === type.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl' : 'bg-white border-slate-200 hover:border-indigo-600'}`}
                        >
                           <span className="text-[11px] font-black uppercase tracking-widest block">{type.name}</span>
                           <span className="text-[8px] font-bold opacity-60 uppercase">{type.desc}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="p-8 bg-[#0F111A] rounded-[2.5rem] flex gap-6 text-white shadow-2xl relative overflow-hidden">
                   <ShieldCheck size={32} className="text-indigo-400 shrink-0 mt-1" />
                   <div className="relative z-10">
                      <h4 className="text-xs font-black uppercase tracking-widest mb-1">X-Signature Verified</h4>
                      <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">
                        "Your backend endpoint will require a secure secret handshake to verify Razorpay signatures, ensuring only authenticated revenue signals hit your ledger."
                      </p>
                   </div>
                </div>
             </main>

             <footer className="p-12 bg-white border-t border-slate-100 flex gap-4 shrink-0">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Cancel</button>
                <button 
                  onClick={handleCreateTrigger}
                  disabled={!newTrigger.name}
                  className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50"
                >
                  Authorize Pulse Interface
                </button>
             </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default TriggerManager;
