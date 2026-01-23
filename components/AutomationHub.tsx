
import React, { useState } from 'react';
import { 
  Zap, Code, Download, Copy, CheckCircle2, 
  ExternalLink, Terminal, Shield, Play, 
  Cpu, Activity, Database, Sparkles, RefreshCw, Send, Lock, Coins, Share2,
  Clock, ArrowRight, MessageSquare, Mail, Phone, ShieldAlert, Target,
  Megaphone, Globe, DollarSign
} from 'lucide-react';

const WORKFLOW_BLUEPRINTS = [
  {
    id: 'sub-guard',
    name: 'Subscription Validator Node',
    desc: 'The mandatory hard-block node. Placed at the start of every workflow to verify active solvency. Automatically halts execution if the digital employee "salary" (subscription) is unpaid.',
    triggers: 'Placed after any Webhook Trigger',
    actions: ['SB: Fetch Status', 'Conditional Split', 'Error Log (Overdue)', 'Continue Path'],
    json: {
      "name": "Revenue Protection Guard",
      "nodes": [
        { "name": "Trigger: Webhook", "type": "webhook", "position": [100, 200] },
        { "name": "Logic: Validator", "type": "function", "position": [350, 200], "code": "if ($json.overdue) throw new Error('Salary unpaid - Workforce on strike');" },
        { "name": "Continue: Logic", "type": "noOp", "position": [600, 200] }
      ]
    }
  },
  {
    id: 'partner-payout',
    name: 'Partner Revenue Handshake',
    desc: 'Automated RazorpayX distribution engine. Periodically scans partner wallets, checks threshold (₹500), creates Razorpay contacts, and dispatches commission payouts.',
    triggers: 'Cron (Every Monday 09:00 IST)',
    actions: ['Fetch Wallets >= 500', 'RazorpayX Contact Handshake', 'Execute IMPS Payout', 'Update SB Ledger', 'Notify Partner'],
    json: {
      "name": "Partner Payout Orchestrator",
      "nodes": [
        { "name": "Trigger: Weekly Pulse", "type": "cron", "position": [100, 200] },
        { "name": "SB: Get Eligible partners", "type": "supabase", "position": [350, 200] },
        { "name": "RPX: Create Payout", "type": "razorpayx", "position": [700, 200] },
        { "name": "Logic: Record Transaction", "type": "supabase", "position": [1000, 200] },
        { "name": "WA: Notify Success", "type": "whatsapp", "position": [1300, 200] }
      ]
    }
  },
  {
    id: 'master-ai-brain',
    name: 'Master AI Lead Brain',
    desc: 'The central orchestrator. Detects lead scenarios, routes to specific AI personas, generates high-conversion action plans, and dispatches via omnichannel providers.',
    triggers: 'Webhook (New Lead) or Cron (Periodic Check)',
    actions: ['Scenario Detector', 'Prompt Router', 'Gemini Decision Engine', 'Channel Executor', 'SB Ledger Update'],
    json: {
      "name": "AI Lead Brain Orchestrator",
      "nodes": [
        { "name": "Trigger: Webhook", "type": "webhook", "position": [100, 200] },
        { "name": "SB: Fetch Lead Context", "type": "supabase", "position": [300, 200] },
        { "name": "Logic: Scenario Detector", "type": "function", "position": [500, 200] },
        { "name": "Gemini: Decision Engine", "type": "aiAgent", "position": [950, 200] },
        { "name": "WA: Dispatcher", "type": "http", "position": [1550, 100] },
        { "name": "SB: Log Interaction", "type": "supabase", "position": [1950, 200] }
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
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Zap size={24} className="fill-white" />
            </div>
            <h2 className="text-3xl font-black tracking-tight uppercase">Automation Engine Architecture</h2>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed font-medium italic">
            Hardened n8n blueprints with built-in **Subscription Enforcement** and **Partner Revenue Solvency**.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Security Blueprints</h3>
          {WORKFLOW_BLUEPRINTS.map(wf => (
            <button 
              key={wf.id}
              onClick={() => setSelectedId(wf.id)}
              className={`w-full p-6 text-left rounded-[2rem] border transition-all flex flex-col gap-3 group ${
                selectedId === wf.id 
                  ? 'bg-white border-indigo-600 shadow-xl ring-4 ring-indigo-500/5' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${selectedId === wf.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                  {wf.id === 'sub-guard' ? <Shield size={18} /> : wf.id === 'master-ai-brain' ? <Cpu size={18} /> : <DollarSign size={18} />}
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${selectedId === wf.id ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
                   {wf.id === 'sub-guard' ? 'Security' : wf.id === 'partner-payout' ? 'Revenue' : 'Pulse'}
                </div>
              </div>
              <div>
                <h4 className={`font-black uppercase text-xs tracking-widest ${selectedId === wf.id ? 'text-indigo-600' : 'text-slate-900'}`}>{wf.name}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">{wf.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex flex-col min-h-[600px]">
            <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shadow-sm">
                  <Terminal size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">{activeWf?.name}</h3>
                  <p className="text-[9px] text-indigo-600 font-black uppercase tracking-widest">{activeWf?.triggers}</p>
                </div>
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Export JSON Node Map'}
              </button>
            </header>

            <div className="flex-1 p-10 space-y-10 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Activity size={14} /> Enforcement Logic
                  </h4>
                  <div className="space-y-3">
                    {activeWf?.actions.map((act, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group cursor-default hover:bg-white hover:shadow-sm transition-all">
                        <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-indigo-600 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {i + 1}
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 rounded-[2.5rem] p-8 relative overflow-hidden border border-slate-800 shadow-2xl group">
                  <pre className="text-[11px] font-mono text-indigo-100/40 leading-relaxed overflow-auto max-h-[300px]">
                    {JSON.stringify(activeWf?.json, null, 2)}
                  </pre>
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
