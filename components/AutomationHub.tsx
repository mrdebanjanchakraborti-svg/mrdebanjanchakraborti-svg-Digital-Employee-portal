import React, { useState } from 'react';
import { 
  Zap, Code, Download, Copy, CheckCircle2, 
  ExternalLink, Terminal, Shield, Play, 
  Cpu, Activity, Database, Sparkles, RefreshCw, Send, Lock, Coins, Share2,
  Clock, ArrowRight, MessageSquare, Mail, Phone, ShieldAlert, Target,
  Megaphone, Globe, DollarSign, ArrowDown, ShieldCheck, Fingerprint,
  // Added UserCheck to fix the "Cannot find name 'UserCheck'" error
  UserCheck
} from 'lucide-react';

// Fix: Moved Radio definition before STANDARD_NODES to resolve "Block-scoped variable 'Radio' used before its declaration" error
const Radio = ({ size, ...props }: any) => <Activity size={size} {...props} />;

const STANDARD_NODES = [
  { id: 1, name: 'Webhook Trigger', desc: 'Auth Headers Pulse', icon: Radio },
  { id: 2, name: 'Signature Validator', desc: 'HMAC Handshake', icon: Fingerprint },
  { id: 3, name: 'Subscription Validator', desc: 'Solvency Check', icon: ShieldCheck },
  { id: 4, name: 'AI Credit Pre-Check', desc: 'Balance Verification', icon: Coins },
  { id: 5, name: 'Workflow Logic', desc: 'Decision Engine', icon: Cpu },
  { id: 6, name: 'Credit Deduction', desc: 'Atomic Ledger Burn', icon: Zap },
  { id: 7, name: 'Outgoing Dispatch', desc: 'Trigger Broadcasting', icon: Share2 },
  { id: 8, name: 'Execute Sub-Workflow', desc: 'Delivery Layer (WA/Email)', icon: Send }
];

const WORKFLOW_BLUEPRINTS = [
  {
    id: 'lead-created-orchestrator',
    name: 'Lead Created Orchestrator',
    desc: 'Mandatory 8-node sequence for new lead ingestion. Includes scoring, reply generation, and WhatsApp delivery.',
    triggers: 'Event: lead.created',
    cost: '6 Credits Total',
    actions: ['Node 1: Webhook', 'Node 2: HMAC Sign', 'Node 3: can_execute_workflow()', 'Node 4: Pre-check (6Cr)', 'Node 5: Gemini Scoring', 'Node 6: deduct_ai_credits()', 'Node 7: Lead Won Sync', 'Node 8: Sub-Workflow (WA)'],
    json: {
      "name": "Standard Lead Orchestrator",
      "nodes": [
        { "name": "Trigger: Webhook", "type": "webhook", "position": [0, 0] },
        { "name": "Logic: Validator", "type": "function", "position": [200, 0] },
        { "name": "RPC: can_execute_workflow", "type": "supabase", "position": [400, 0] },
        { "name": "Gemini: Decision", "type": "aiAgent", "position": [800, 0] },
        { "name": "RPC: deduct_ai_credits", "type": "supabase", "position": [1200, 0] },
        { "name": "Execute: Delivery", "type": "executeWorkflow", "position": [1600, 0] }
      ]
    }
  },
  {
    id: 'reengage-pulse',
    name: 'Re-engagement Pulse',
    desc: 'Protocol for leads not responding. Generates a strategic follow-up message and optional visual asset.',
    triggers: 'Event: lead.not_responding',
    cost: '3-8 Credits',
    actions: ['Node 1-4: Auth & Pre-check', 'Node 5: Context Analysis', 'Node 5b: (Optional) Image Gen', 'Node 6: Burn Credits', 'Node 8: WA Delivery'],
    json: {
      "name": "Re-engagement Orchestrator",
      "nodes": [
        { "name": "Trigger: Cron/Webhook", "type": "webhook", "position": [0, 0] },
        { "name": "Logic: BANT Memory Fetch", "type": "supabase", "position": [300, 0] },
        { "name": "Gemini: Follow-up Gen", "type": "aiAgent", "position": [600, 0] },
        { "name": "RPC: Burn", "type": "supabase", "position": [900, 0] },
        { "name": "Execute: Delivery", "type": "executeWorkflow", "position": [1200, 0] }
      ]
    }
  }
];

const AutomationHub: React.FC = () => {
  const [selectedId, setSelectedId] = useState(WORKFLOW_BLUEPRINTS[0].id);
  const [copied, setCopied] = useState(false);

  const activeWf = WORKFLOW_BLUEPRINTS.find(w => w.id === selectedId);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(activeWf?.json, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      {/* 8-NODE ORCHESTRATION STANDARD VISUALIZATION */}
      <div className="bg-slate-950 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden border-2 border-indigo-500/30">
        <div className="relative z-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
             <div className="space-y-3">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-indigo-600 rounded-xl shadow-xl shadow-indigo-500/20">
                      <ShieldCheck size={24} className="text-white" />
                   </div>
                   <h2 className="text-3xl font-black tracking-tight uppercase">Orchestration Standard v2.8</h2>
                </div>
                <p className="text-slate-400 text-lg font-medium italic">Mandatory 8-node sequence architecture for DigitalEmployee.me</p>
             </div>
             <div className="flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Strict Governance Mode: Active</span>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative">
             {STANDARD_NODES.map((node, i) => (
               <div key={node.id} className="relative group">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-indigo-600 transition-all cursor-default flex flex-col items-center text-center gap-4 h-full group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 z-10 relative">
                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-400 group-hover:text-white transition-colors">
                        <node.icon size={20} />
                     </div>
                     <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white/60 mb-1">NODE 0{node.id}</p>
                        <h4 className="text-[10px] font-black uppercase leading-tight group-hover:text-white">{node.name}</h4>
                     </div>
                  </div>
                  {i < STANDARD_NODES.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-0 text-white/10">
                       <ArrowRight size={16} />
                    </div>
                  )}
               </div>
             ))}
          </div>

          <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex gap-6 items-center">
             <ShieldAlert size={32} className="text-amber-500 shrink-0" />
             <p className="text-[11px] text-amber-200/80 font-bold italic leading-relaxed">
               "Workflows that bypass Node 3 (Subscription) or Node 6 (Atomic Burn) will be automatically halted by the Supabase Guard."
             </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[140px] -mr-96 -mt-96" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Compliant Blueprints</h3>
          {WORKFLOW_BLUEPRINTS.map(wf => (
            <button 
              key={wf.id}
              onClick={() => setSelectedId(wf.id)}
              className={`w-full p-8 text-left rounded-[3rem] border transition-all flex flex-col gap-4 group ${
                selectedId === wf.id 
                  ? 'bg-white border-indigo-600 shadow-xl ring-8 ring-indigo-500/5' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${selectedId === wf.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                  {wf.id.includes('created') ? <UserCheck size={20} /> : <RefreshCw size={20} />}
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${selectedId === wf.id ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
                   {wf.cost}
                </div>
              </div>
              <div>
                <h4 className={`font-black uppercase text-sm tracking-tight ${selectedId === wf.id ? 'text-indigo-600' : 'text-slate-900'}`}>{wf.name}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-2 line-clamp-3 italic">"{wf.desc}"</p>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-[4rem] overflow-hidden shadow-sm flex flex-col min-h-[700px]">
            <header className="px-12 py-10 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/30">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shadow-xl shadow-slate-200/20">
                  <Terminal size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{activeWf?.name}</h3>
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest flex items-center gap-2 mt-1">
                     <Activity size={12} /> {activeWf?.triggers}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-95"
              >
                {copied ? <CheckCircle2 size={18} /> : <Code size={18} />}
                {copied ? 'Copied' : 'Export Compliant JSON'}
              </button>
            </header>

            <div className="flex-1 p-12 space-y-12 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                    <Fingerprint size={16} className="text-indigo-600" /> MANDATORY Sequence Trace
                  </h4>
                  <div className="space-y-3">
                    {activeWf?.actions.map((act, i) => (
                      <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-[2rem] group cursor-default hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-inner flex items-center justify-center text-[11px] font-black text-indigo-600 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {i + 1}
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                    <Database size={16} className="text-indigo-600" /> n8n Node Map
                  </h4>
                  <div className="bg-slate-950 rounded-[3rem] p-10 relative overflow-hidden border-2 border-slate-800 shadow-2xl group flex-1">
                    <pre className="text-[11px] font-mono text-indigo-100/30 leading-relaxed overflow-auto max-h-[400px] scrollbar-hide">
                      {JSON.stringify(activeWf?.json, null, 2)}
                    </pre>
                    <div className="absolute top-4 right-4 p-2 bg-white/5 border border-white/10 rounded-lg">
                       <Lock size={14} className="text-slate-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationHub;