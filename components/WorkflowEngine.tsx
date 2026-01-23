
import React, { useState } from 'react';
// Added Activity to the imports below
import { 
  Zap, Plus, Clock, MessageSquare, Mail, Phone, 
  Pause, Play, ChevronRight, Sparkles, 
  Ghost, ShieldAlert, TrendingUp, LifeBuoy, MoreVertical, Settings2,
  AlertTriangle, Target, Activity
} from 'lucide-react';
import { WorkflowScenario, CampaignType } from '../types';

interface Workflow {
  id: string;
  name: string;
  scenario: WorkflowScenario;
  isActive: boolean;
  steps: {
    id: string;
    type: CampaignType;
    delay: string;
    content: string;
  }[];
}

const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: 'wf_1',
    name: 'Silent Lead Recovery Protocol',
    scenario: WorkflowScenario.SILENT_LEAD_RECOVERY,
    isActive: true,
    steps: [
      { id: 's1', type: CampaignType.WHATSAPP, delay: '30 sec', content: 'Hi {{name}}, checking in on your inquiry from {{source}}... Sab theek?' },
      { id: 's2', type: CampaignType.SMS, delay: '10 min', content: 'Quick follow up - did you see my WhatsApp? I have some exciting updates for {{company}}.' },
      { id: 's3', type: CampaignType.EMAIL, delay: '1 hour', content: 'RE: Your Inquiry. Here is the ROI whitepaper we discussed.' }
    ]
  },
  {
    id: 'wf_2',
    name: 'Missed Call Handshake',
    scenario: WorkflowScenario.MISSED_CALL_RECOVERY,
    isActive: true,
    steps: [
      { id: 's4', type: CampaignType.WHATSAPP, delay: '0 min', content: 'Sorry we missed your call! I am {{company}} AI assistant. How can I help today?' }
    ]
  },
  {
    id: 'wf_3',
    name: 'Value Proposition Defense',
    scenario: WorkflowScenario.PRICING_OBJECTION,
    isActive: true,
    steps: [
      { id: 's5', type: CampaignType.WHATSAPP, delay: '2 min', content: 'I understand budget is a priority. I have a custom ROI sheet I can share to show the long-term savings.' },
      { id: 's6', type: CampaignType.VOICE, delay: '1 day', content: 'AI Dialer: Automated follow-up call to discuss specific objections.' }
    ]
  }
];

const WorkflowEngine: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(MOCK_WORKFLOWS);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Scenario Orchestrator</h2>
          <p className="text-slate-500 text-sm font-medium italic">Define the autonomous behavior of your digital workforce.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2">
            <Target size={14} /> Audit Engine
          </button>
          <button className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
            <Plus size={18} /> New Scenario Protocol
          </button>
        </div>
      </header>

      {/* Intelligence Banner */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20">
              <Sparkles size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-black tracking-tight uppercase">Infinity AI Strategy Insight</h3>
          </div>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Data reveals <span className="text-white font-black">42% of ghosted leads</span> respond if contacted within 5 minutes. 
            We recommend prioritizing the <strong className="text-indigo-400 uppercase tracking-wide">Rapid Recovery Protocol</strong>.
          </p>
        </div>
        <button className="px-10 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/30 active:scale-95 shrink-0">
          Activate Recovery Pulse
        </button>
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] -mr-40 -mt-40" />
      </div>

      <div className="grid grid-cols-1 gap-10">
        {workflows.map(wf => (
          <div key={wf.id} className="bg-white border border-slate-200 rounded-[4rem] p-12 shadow-sm group hover:border-indigo-300 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 rounded-[3rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  {wf.scenario === WorkflowScenario.SILENT_LEAD_RECOVERY ? <Ghost size={42} /> : 
                   wf.scenario === WorkflowScenario.MISSED_CALL_RECOVERY ? <LifeBuoy size={42} /> : 
                   <ShieldAlert size={42} />}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{wf.name}</h3>
                    <span className={`px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border ${wf.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400'}`}>
                      {wf.isActive ? 'Pulse Active' : 'Suspended'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={12} className="text-indigo-500" /> Scenario: {wf.scenario.replace(/_/g, ' ')}
                    </p>
                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Activity size={12} className="text-emerald-500" /> Health: 98% Optimal
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="p-5 bg-slate-50 text-slate-400 rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                  {wf.isActive ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button className="p-5 bg-slate-50 text-slate-400 rounded-3xl hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                  <Settings2 size={24} />
                </button>
                <button className="p-5 bg-slate-50 text-slate-400 rounded-3xl hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                  <MoreVertical size={24} />
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                   Strategic Sequence <TrendingUp size={14} className="text-emerald-500" />
                </h4>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Average Duration: 24h</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {wf.steps.map((step, idx) => (
                  <div key={step.id} className="relative group/step">
                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[3rem] relative overflow-hidden group-hover/step:border-indigo-300 transition-all shadow-inner hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-8">
                        <div className={`p-4 rounded-[1.5rem] bg-white shadow-xl border border-slate-100 ${
                          step.type === CampaignType.WHATSAPP ? 'text-emerald-500' : 
                          step.type === CampaignType.SMS ? 'text-blue-500' : 
                          step.type === CampaignType.VOICE ? 'text-orange-500' : 'text-indigo-500'
                        }`}>
                          {step.type === CampaignType.WHATSAPP && <MessageSquare size={24} />}
                          {step.type === CampaignType.SMS && <MessageSquare size={24} />}
                          {step.type === CampaignType.EMAIL && <Mail size={24} />}
                          {step.type === CampaignType.VOICE && <Phone size={24} />}
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-black text-slate-900 uppercase mb-1">Step {idx + 1}</span>
                           <span className="text-[9px] font-black text-slate-400 flex items-center gap-1 uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-slate-100">
                            <Clock size={10} /> {step.delay}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-800 uppercase tracking-tighter">{step.type} DISPATCH</p>
                        <p className="text-[11px] font-semibold text-slate-500 line-clamp-4 leading-relaxed italic">
                          "{step.content}"
                        </p>
                      </div>
                    </div>
                    {idx < wf.steps.length - 1 && (
                      <div className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-10 text-slate-200 group-hover/step:text-indigo-400 transition-colors animate-pulse">
                        <ChevronRight size={40} strokeWidth={4} />
                      </div>
                    )}
                  </div>
                ))}
                
                <button className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-all bg-slate-50/20 group h-full min-h-[220px]">
                  <Plus size={48} className="mb-4 group-hover:scale-125 transition-transform duration-700" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Append Scenario Action</span>
                </button>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-16">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Queue Volume</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">12,482</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Recovery Lift</span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-emerald-600 tracking-tighter">+18.4%</span>
                    <TrendingUp size={24} className="text-emerald-500" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                 <button className="px-6 py-3 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all">
                    View Logs
                 </button>
                 <button className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-100 transition-all">
                  <Sparkles size={16} /> Gemini Audit
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowEngine;
