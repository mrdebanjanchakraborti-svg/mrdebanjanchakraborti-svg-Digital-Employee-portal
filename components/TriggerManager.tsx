import React, { useState } from 'react';
import { 
  Radio, Plus, Search, Filter, Copy, CheckCircle, Trash2, 
  Settings2, Zap, ShieldCheck, Globe, Loader2, Info, 
  ArrowRight, CreditCard, Clock, Activity, Target, Landmark, X,
  Terminal, ShieldAlert, Pause, Play, MoreVertical
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
  },
  {
    id: 'tr_2',
    workspace_id: 'ws_123',
    name: 'Website Pricing Modal',
    type: TriggerType.CUSTOM_WEBHOOK,
    status: TriggerStatus.PAUSED,
    webhook_url: 'https://digitalemployee.me/ingest/web-pricing-whsk',
    secret: 'sig_x7y2z1',
    event_type: 'intent_signal',
    usage_count: 85,
    created_at: '2024-11-12T15:30:00Z'
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
       alert("Scale Blocked: Incoming triggers are restricted in the Free tier. Upgrade to Starter or higher to authorize workforce interfaces.");
       setIsModalOpen(false);
       return;
    }

    if (usage >= limit) {
      alert(`Workforce Scale Blocked: You have reached the ${limit}-trigger limit for your ${userPlan.toUpperCase()} plan. Upgrade to Growth or Pro to authorize more incoming signals.`);
      setIsModalOpen(false);
      return;
    }

    const t: Trigger = {
      id: 'tr_' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      workspace_id: 'ws_123',
      name: newTrigger.name,
      type: newTrigger.type,
      status: TriggerStatus.ACTIVE,
      webhook_url: `https://digitalemployee.me/ingest/${newTrigger.name.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random()*1000)}`,
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
      alert("Pulse Handshake Success: Outbound n8n signal dispatched. Credits deducted: 1.");
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

      {/* FREE TIER BLOCKER BANNER */}
      {userPlan === PlanTier.FREE && (
        <div className="bg-indigo-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="relative z-10 flex items-center gap-8">
              <div className="w-20 h-20 bg-white/10 rounded-[2.5rem] border border-white/20 flex items-center justify-center backdrop-blur-md">
                 <ShieldAlert size={40} className="text-indigo-200" />
              </div>
              <div className="space-y-2">
                 <h3 className="text-3xl font-black uppercase tracking-tight">Upgrade to Authorize Triggers</h3>
                 <p className="text-indigo-100 text-sm font-medium italic opacity-80">Autonomous signal ingestion is restricted in the **Free Pulse** tier.</p>
              </div>
           </div>
           <button className="relative z-10 px-12 py-5 bg-white text-indigo-600 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:brightness-110 active:scale-95 transition-all">
              Go Starter Plan
           </button>
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        </div>
      )}

      {/* TRIGGER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {triggers.map(t => (
          <div key={t.id} className={`bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm group hover:border-indigo-600 transition-all flex flex-col justify-between min-h-[380px] relative overflow-hidden ${t.status === TriggerStatus.PAUSED ? 'opacity-70 bg-slate-50' : ''}`}>
             <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                   <div className={`p-3 rounded-2xl ${t.status === TriggerStatus.ACTIVE ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200 text-slate-400'}`}>
                      <Radio size={24} />
                   </div>
                   <div className="flex gap-2">
                      <span className={`px-3 py-1 text-[9px] font-black rounded-lg border uppercase tracking-widest ${t.status === TriggerStatus.ACTIVE ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                         {t.status}
                      </span>
                      <button className="text-slate-400 hover:text-slate-900 p-1"><MoreVertical size={18}/></button>
                   </div>
                </div>

                <div>
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">{t.name}</h4>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Zap size={10} className="text-indigo-500" /> {t.type.replace('_', ' ')}
                   </p>
                </div>

                <div className="space-y-3">
                   <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group/code">
                      <code className="text-[10px] font-mono font-bold text-slate-500 truncate w-40">{t.webhook_url}</code>
                      <button 
                         onClick={() => handleCopy(t.webhook_url, t.id)}
                         className="p-2 bg-white rounded-xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all"
                      >
                         {copiedId === t.id ? <CheckCircle size={14} /> : <Copy size={14} />}
                      </button>
                   </div>
                   <div className="flex items-center gap-2 px-1">
                      <Clock size={12} className="text-slate-300" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.usage_count} Signal Hits Today</span>
                   </div>
                </div>
             </div>

             <div className="pt-8 mt-8 border-t border-slate-50 flex gap-3 relative z-10">
                <button 
                   onClick={() => handleTest(t.id)}
                   disabled={!!isTesting || t.status === TriggerStatus.PAUSED}
                   className="flex-1 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2 transition-all hover:bg-indigo-600"
                >
                   {isTesting === t.id ? <Loader2 size={14} className="animate-spin" /> : <Activity size={14} />}
                   Test Pulse
                </button>
                <button className="p-3.5 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-indigo-600 transition-all shadow-sm">
                   {t.status === TriggerStatus.ACTIVE ? <Pause size={18}/> : <Play size={18}/>}
                </button>
                <button className="p-3.5 bg-white border border-slate-200 text-slate-300 hover:text-rose-500 transition-all shadow-sm">
                   <Trash2 size={18} />
                </button>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-40 group-hover:scale-110 transition-transform duration-700" />
          </div>
        ))}
        
        {userPlan !== PlanTier.FREE && usage < limit && (
          <button 
             onClick={() => setIsModalOpen(true)}
             className="border-2 border-dashed border-slate-200 rounded-[3rem] p-12 flex flex-col items-center justify-center text-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all bg-white group h-full min-h-[380px]"
          >
             <div className="w-20 h-20 rounded-[2.5rem] bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                <Plus size={40} />
             </div>
             <p className="text-xs font-black uppercase tracking-[0.2em]">New Protocol Interface</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Slots Remaining: {limit - usage}</p>
          </button>
        )}
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
             <header className="px-12 py-10 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                      <Radio size={24} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight">Authorize Pulse Link</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Identity Handshake Definition</p>
                   </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-100 text-slate-400 rounded-2xl hover:text-slate-900 transition-all">
                   <X size={24} />
                </button>
             </header>

             <main className="p-12 space-y-10">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Protocol Identifier (Name)</label>
                   <input 
                    type="text" 
                    value={newTrigger.name}
                    onChange={e => setNewTrigger({...newTrigger, name: e.target.value})}
                    placeholder="e.g. IndiaMART CRM Sync"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 text-sm font-bold shadow-inner transition-all"
                   />
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Interface Interface Type</label>
                   <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: TriggerType.LEAD_INGESTION, name: 'Lead Ingestion', desc: 'CRM Entry Pulse' },
                        { id: TriggerType.CUSTOM_WEBHOOK, name: 'Advanced Webhook', desc: 'Enterprise Bridge' }
                      ].map(type => (
                        <button 
                          key={type.id}
                          onClick={() => setNewTrigger({...newTrigger, type: type.id as any})}
                          className={`p-6 border rounded-[2rem] text-left transition-all relative overflow-hidden group ${newTrigger.type === type.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl' : 'bg-white border-slate-200 hover:border-indigo-600'}`}
                        >
                           <span className="text-[11px] font-black uppercase tracking-widest block">{type.name}</span>
                           <span className="text-[8px] font-bold opacity-60 uppercase">{type.desc}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="p-8 bg-slate-900 rounded-[2.5rem] flex gap-6 text-white shadow-2xl relative overflow-hidden">
                   <ShieldCheck size={32} className="text-indigo-400 shrink-0 mt-1" />
                   <div className="relative z-10">
                      <h4 className="text-xs font-black uppercase tracking-widest mb-1">Consumption Security</h4>
                      <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">
                        Signals from this trigger will consume 1 AI Credit per successful pulse recorded. Scale rules apply based on your current plan.
                      </p>
                   </div>
                </div>
             </main>

             <footer className="p-12 bg-slate-50 border-t border-slate-100 flex gap-4 shrink-0">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Cancel</button>
                <button 
                  onClick={handleCreateTrigger}
                  disabled={!newTrigger.name || usage >= limit}
                  className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50"
                >
                  Authorize Pulse Handshake
                </button>
             </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default TriggerManager;