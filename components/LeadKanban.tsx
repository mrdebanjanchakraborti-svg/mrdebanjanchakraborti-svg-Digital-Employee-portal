
import React, { useState } from 'react';
import { LeadStatus, LeadTemperature, LeadGrade, KanbanLead, Agent } from '../types';
import { 
  MoreHorizontal, Star, MessageSquare, Flame, Sparkles, Activity, 
  Snowflake, TrendingUp, DollarSign, UserCheck, Zap, Clock, 
  AlertTriangle, BellRing, ShieldAlert, BrainCircuit, Loader2, 
  Search, BarChart3, Timer, UserPlus, MapPin, User
} from 'lucide-react';

const MOCK_AGENTS: Agent[] = [
  { id: 'ag_1', name: 'Rahul M.', workload: 12, base_city: 'Mumbai', avatar_color: 'bg-blue-600' },
  { id: 'ag_2', name: 'Sarah K.', workload: 8, base_city: 'Delhi', avatar_color: 'bg-rose-600' },
  { id: 'ag_3', name: 'Kevin B.', workload: 15, base_city: 'Bangalore', avatar_color: 'bg-emerald-600' },
];

const LeadKanban: React.FC = () => {
  const [scoringLeadId, setScoringLeadId] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);

  const columns: { title: string; status: LeadStatus; icon?: any; colorClass?: string }[] = [
    { title: 'Blitz: Instant Outreach', status: LeadStatus.ACTION_REQUIRED, icon: Flame, colorClass: 'bg-[#5143E1]' },
    { title: 'Critical / Urgent', status: LeadStatus.URGENT, icon: Zap, colorClass: 'bg-rose-600' },
    { title: 'AI Priority Alerts', status: LeadStatus.ATTENTION, icon: ShieldAlert, colorClass: 'bg-orange-600' },
    { title: 'Intelligence Queue', status: LeadStatus.NEW },
    { title: 'Active Contact', status: LeadStatus.CONTACTED },
    { title: 'Decision Makers', status: LeadStatus.QUALIFIED },
  ];

  const initialLeads: Record<string, KanbanLead[]> = {
    [LeadStatus.ACTION_REQUIRED]: [
      { id: 'blitz_1', name: 'Vikram Malhotra', company: 'Malhotra Tech', score: 99, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.HOT, scenario: 'high_intent_signal', interactionCount: 28, lastSignal: 'Downloaded Enterprise Deck', lastActive: '2m ago', requiresImmediateFollowup: true, assigned_to: 'ag_1', assigned_agent_name: 'Rahul M.', metadata: { city: 'Mumbai' }, bant: { need: true, authority: true, budget: true, timeline: 'Immediate' } },
    ],
    [LeadStatus.URGENT]: [
      { id: 'urgent_1', name: 'Rohan Kapoor', company: 'Kapoor Real Estate', score: 98, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.HOT, scenario: 'missed_call_recovery', interactionCount: 12, lastSignal: 'High Intensity Missed Call', lastActive: '15m ago', assigned_to: 'ag_2', assigned_agent_name: 'Sarah K.', metadata: { city: 'Delhi' }, bant: { need: true, authority: true, budget: false, timeline: 'Immediate' } },
    ],
    [LeadStatus.ATTENTION]: [
      { id: 'att_1', name: 'Kabir Singhania', company: 'Singhania Group', score: 96, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.HOT, scenario: 'high_intent_signal', interactionCount: 45, lastSignal: 'Viewed Pricing 4 times in 10m', lastActive: '10m ago', requiresImmediateFollowup: true, metadata: { city: 'Mumbai' }, bant: { need: true, authority: true, budget: true, timeline: 'Immediate' } },
    ],
    [LeadStatus.NEW]: [
      { id: '1', name: 'Alex Rivera', company: 'TechFlow', score: 12, grade: LeadGrade.COLD, priority: 'Medium', temperature: LeadTemperature.COLD, scenario: 'validation', interactionCount: 2, lastSignal: 'New Inbound', lastActive: '1h ago', needsRescore: true, metadata: { city: 'Bangalore' }, bant: { need: false, authority: false, budget: false, timeline: 'Unknown' } },
      { id: '2', name: 'Samantha Reed', company: 'Global Solutions', score: 82, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.WARM, scenario: 'lead_recovery', interactionCount: 18, lastSignal: 'Replied: WhatsApp', lastActive: '45m ago', metadata: { city: 'Delhi' }, bant: { need: true, authority: false, budget: false, timeline: 'Short-term' } },
      { id: 'low_1', name: 'Tushar Garg', company: 'Garg Traders', score: 5, grade: LeadGrade.COLD, priority: 'Low', temperature: LeadTemperature.COLD, interactionCount: 1, lastSignal: 'Just Ingested', lastActive: '3h ago', needsRescore: true, metadata: { city: 'Jaipur' }, bant: { need: false, authority: false, budget: false, timeline: 'Unknown' } },
    ],
    [LeadStatus.CONTACTED]: [
      { id: '3', name: 'Marcus Chen', company: 'Nexus IT', score: 55, grade: LeadGrade.WARM, priority: 'Medium', temperature: LeadTemperature.WARM, scenario: 'pricing_objection', interactionCount: 8, lastSignal: 'Asked for Pricing', lastActive: '5h ago', assigned_to: 'ag_3', assigned_agent_name: 'Kevin B.', metadata: { city: 'Bangalore' }, bant: { need: true, authority: true, budget: false, timeline: 'Immediate' } },
    ],
    [LeadStatus.QUALIFIED]: [
      { id: '4', name: 'Elena Gilbert', company: 'Mystic Falls RE', score: 94, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.HOT, scenario: 'closing_mode', interactionCount: 32, lastSignal: 'Buying Signal: Call', lastActive: '1h ago', assigned_to: 'ag_1', assigned_agent_name: 'Rahul M.', metadata: { city: 'Mumbai' }, bant: { need: true, authority: true, budget: true, timeline: '15 days' } },
    ],
  };

  const [leads, setLeads] = useState(initialLeads);

  const handleScorePulse = (leadId: string) => {
    setScoringLeadId(leadId);
    setTimeout(() => {
      setScoringLeadId(null);
      const newScore = 75 + Math.floor(Math.random() * 20);
      alert(`AI Pulse Complete. Intent detected: "Exploring Scale". Score updated to ${newScore}.`);
    }, 2000);
  };

  const handleAutoAssign = () => {
    setIsAssigning(true);
    
    // Logic simulation
    setTimeout(() => {
      const newLeads = { ...leads };
      const unassignedInNew = (newLeads[LeadStatus.NEW] || []).filter(l => !l.assigned_to);
      
      unassignedInNew.forEach(lead => {
        // Calculate Agent Score: Lower workload is better (0.7 weight), Match city is bonus (0.3 weight)
        let bestAgent = MOCK_AGENTS[0];
        let bestScore = -Infinity;

        MOCK_AGENTS.forEach(agent => {
          // Normalizing workload: assuming max is around 50 for this scale
          const workloadScore = (1 - (agent.workload / 50)) * 0.7;
          const proximityScore = (lead.metadata?.city === agent.base_city ? 1 : 0) * 0.3;
          const totalScore = workloadScore + proximityScore;

          if (totalScore > bestScore) {
            bestScore = totalScore;
            bestAgent = agent;
          }
        });

        lead.assigned_to = bestAgent.id;
        lead.assigned_agent_name = bestAgent.name;
        // Mocking workload increment for the visualization session
        bestAgent.workload += 1;
      });

      setLeads(newLeads);
      setIsAssigning(false);
      alert("Workforce Orchestration Complete: All leads in Intelligence Queue assigned to optimal agents based on load and location.");
    }, 2500);
  };

  const getGradeBadge = (grade: LeadGrade) => {
    switch (grade) {
      case LeadGrade.HOT: 
        return <span className="flex items-center gap-1 text-[9px] font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-100 uppercase shadow-sm"><Flame size={10} fill="currentColor" /> Hot</span>;
      case LeadGrade.WARM: 
        return <span className="flex items-center gap-1 text-[9px] font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100 uppercase">🟡 Warm</span>;
      case LeadGrade.COLD: 
        return <span className="flex items-center gap-1 text-[9px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 uppercase"><Snowflake size={10} /> Cold</span>;
    }
  };

  return (
    <div className="flex gap-6 h-full min-w-[2100px] animate-in fade-in duration-500 overflow-x-auto pb-10 custom-scrollbar">
      <style>{`
        @keyframes flash-urgent {
          0%, 100% { border-color: rgba(244, 63, 94, 0.4); box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); background-color: #fff; }
          50% { border-color: rgba(244, 63, 94, 1); box-shadow: 0 0 20px 4px rgba(244, 63, 94, 0.15); background-color: #fffafb; }
        }
        .animate-flash-urgent {
          animation: flash-urgent 1.5s infinite ease-in-out;
          border-width: 2px;
        }
      `}</style>
      {columns.map((col) => {
        const isPriorityCol = col.status === LeadStatus.URGENT || col.status === LeadStatus.ATTENTION || col.status === LeadStatus.ACTION_REQUIRED;
        const isNewCol = col.status === LeadStatus.NEW;
        
        return (
          <div key={col.status} className="flex-1 flex flex-col min-w-[340px]">
            <div className={`flex items-center justify-between mb-4 px-4 py-4 rounded-[1.5rem] ${col.colorClass ? `${col.colorClass} text-white shadow-xl` : 'bg-slate-50 text-slate-900 border border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <h3 className="font-black flex items-center gap-2 text-sm tracking-tight uppercase">
                  {col.icon && <col.icon size={18} className={isPriorityCol ? 'animate-pulse' : ''} />}
                  {col.title}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isPriorityCol ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {(leads[col.status] || []).length}
                  </span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {isNewCol && (
                   <button 
                    onClick={handleAutoAssign}
                    disabled={isAssigning}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white text-indigo-600 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-indigo-600 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                   >
                     {isAssigning ? <Loader2 size={12} className="animate-spin" /> : <UserPlus size={12} />}
                     {isAssigning ? 'Deploying...' : 'Auto-Assign'}
                   </button>
                )}
                <button className={`${isPriorityCol ? 'text-white/60' : 'text-slate-400'} hover:text-slate-600`}>
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            <div className={`flex-1 ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'bg-rose-50/30' : col.status === LeadStatus.ACTION_REQUIRED ? 'bg-indigo-50/30' : 'bg-orange-50/30') : 'bg-slate-100/50'} rounded-[3rem] p-4 space-y-4 overflow-y-auto border ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'border-rose-100' : col.status === LeadStatus.ACTION_REQUIRED ? 'border-indigo-100' : 'border-orange-100') : 'border-slate-200/50'}`}>
              {(leads[col.status] || []).map((lead) => {
                const isVeryHighIntent = lead.score > 90 || lead.requiresImmediateFollowup;
                const isScoringInProgress = scoringLeadId === lead.id;
                const showScoringWarning = lead.needsRescore || lead.score < 20;
                const isUrgent = lead.requiresImmediateFollowup;
                const isHighEngagement = lead.interactionCount > 20;
                const agent = MOCK_AGENTS.find(a => a.id === lead.assigned_to);

                return (
                  <div key={lead.id} className={`bg-white p-6 rounded-[2.5rem] border transition-all group relative overflow-hidden ${isUrgent ? 'animate-flash-urgent border-rose-500' : isVeryHighIntent ? (col.status === LeadStatus.URGENT ? 'border-rose-200 shadow-xl shadow-rose-500/5 ring-1 ring-rose-500/10' : 'border-indigo-200 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/10') : showScoringWarning ? 'border-amber-100 bg-amber-50/20' : 'border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1'}`}>
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="flex flex-wrap gap-2">
                        {getGradeBadge(lead.grade)}
                        {lead.scenario && (
                          <span className={`flex items-center gap-1 text-[8px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-tighter shadow-sm ${isPriorityCol ? 'bg-white/80 text-slate-700 border-slate-200' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                            <Sparkles size={8} /> {lead.scenario.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                      <div className={`flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-xl border ${lead.score > 90 ? (col.status === LeadStatus.URGENT ? 'bg-rose-600 text-white border-rose-600' : 'bg-indigo-600 text-white border-indigo-600') + ' shadow-lg animate-pulse' : lead.score > 80 ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-50 text-slate-900 border-slate-100'}`}>
                        <Activity size={10} />
                        {lead.score}
                      </div>
                    </div>
                    
                    <h4 className={`text-lg group-hover:text-indigo-600 transition-colors leading-tight mb-0.5 ${isUrgent ? 'font-black text-rose-700' : 'font-bold text-slate-900'}`}>{lead.name}</h4>
                    <div className="flex items-center justify-between mb-4">
                       <p className="text-xs text-slate-500 font-medium tracking-tight">{lead.company}</p>
                       <div className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                          <MapPin size={8} className="text-indigo-400" /> {lead.metadata?.city || 'Global'}
                       </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div title="Need Identified" className={`p-2 rounded-xl flex items-center justify-center border transition-all ${lead.bant.need ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                        <Zap size={14} />
                      </div>
                      <div title="Authority Confirmed" className={`p-2 rounded-xl flex items-center justify-center border transition-all ${lead.bant.authority ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                        <UserCheck size={14} />
                      </div>
                      <div title="Budget confirmed" className={`p-2 rounded-xl flex items-center justify-center border transition-all ${lead.bant.budget ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                        <DollarSign size={14} />
                      </div>
                      <div title={`Timeline: ${lead.bant.timeline}`} className={`p-2 rounded-xl flex items-center justify-center border transition-all ${lead.bant.timeline !== 'Unknown' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                        <Clock size={14} />
                      </div>
                    </div>

                    {showScoringWarning && !isScoringInProgress && (
                      <div className="mb-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex flex-col gap-3">
                         <div className="flex items-center gap-2 text-amber-700">
                            <AlertTriangle size={14} />
                            <p className="text-[10px] font-black uppercase tracking-widest">Incomplete Intelligence</p>
                         </div>
                         <button 
                          onClick={() => handleScorePulse(lead.id)}
                          className="w-full py-2.5 bg-white border border-amber-200 text-amber-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                         >
                            <BrainCircuit size={14} /> Run Scoring Protocol
                         </button>
                      </div>
                    )}

                    {isScoringInProgress && (
                      <div className="mb-4 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex flex-col items-center justify-center gap-2 animate-pulse">
                         <Loader2 size={24} className="text-indigo-600 animate-spin" />
                         <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Employee Analysis Active...</p>
                      </div>
                    )}

                    {/* ASSIGNED AGENT INDICATOR */}
                    <div className={`mb-4 p-3 rounded-2xl border flex items-center justify-between transition-all ${lead.assigned_to ? 'bg-indigo-50/30 border-indigo-100' : 'bg-slate-50 border-slate-100 border-dashed'}`}>
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-black shadow-lg ${agent?.avatar_color || 'bg-slate-300'}`}>
                             {lead.assigned_agent_name ? lead.assigned_agent_name.substring(0, 2).toUpperCase() : <User size={14} />}
                          </div>
                          <div>
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">SDR Resource</p>
                             <p className={`text-[10px] font-black uppercase ${lead.assigned_agent_name ? 'text-indigo-600' : 'text-slate-400 italic'}`}>
                                {lead.assigned_agent_name || 'Unassigned Pulse'}
                             </p>
                          </div>
                       </div>
                       {lead.assigned_to && (
                          <div className="flex flex-col items-end">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Load</p>
                             <span className="text-[10px] font-black text-slate-700">{agent?.workload} Leads</span>
                          </div>
                       )}
                    </div>

                    <div className={`${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'bg-rose-50/50' : col.status === LeadStatus.ACTION_REQUIRED ? 'bg-indigo-50/50' : col.status === LeadStatus.ATTENTION ? 'bg-orange-50/50' : 'bg-slate-50') : 'bg-slate-50'} p-3 rounded-2xl mb-4 border ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'border-rose-100' : col.status === LeadStatus.ACTION_REQUIRED ? 'border-indigo-100' : 'border-orange-100') : 'border-slate-100'}`}>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Intelligence Signal</p>
                       <p className={`text-[11px] font-bold flex items-center gap-1.5 italic ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'text-rose-700' : col.status === LeadStatus.ACTION_REQUIRED ? 'text-indigo-700' : 'text-orange-700') : 'text-slate-700'}`}>
                          {isPriorityCol ? <AlertTriangle size={12} className={col.status === LeadStatus.URGENT ? 'text-rose-500' : col.status === LeadStatus.ACTION_REQUIRED ? 'text-indigo-500' : 'text-orange-500'} /> : <TrendingUp size={12} className="text-emerald-500" />} {lead.lastSignal || 'No signals recorded'}
                       </p>
                    </div>

                    {/* Prominent Interaction Engagement Tracking */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-2xl mb-4 shadow-inner">
                       <div className="flex flex-col">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Interaction Pulse</p>
                          <div className="flex items-center gap-2">
                             <MessageSquare size={14} className={isHighEngagement ? 'text-indigo-600' : 'text-slate-400'} />
                             <span className={`text-sm font-black ${isHighEngagement ? 'text-indigo-600' : 'text-slate-700'}`}>{lead.interactionCount} <span className="text-[10px] opacity-60">Hits</span></span>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Last Active</p>
                          <div className="flex items-center gap-1.5 justify-end">
                             <Timer size={12} className="text-slate-400" />
                             <span className="text-[10px] font-bold text-slate-600">{lead.lastActive || 'N/A'}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-xl ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'bg-rose-600' : col.status === LeadStatus.ACTION_REQUIRED ? 'bg-indigo-600' : 'bg-orange-600') : 'bg-slate-900'} flex items-center justify-center text-[10px] font-black text-white shadow-xl`}>
                          {lead.name.substring(0, 2).toUpperCase()}
                        </div>
                        {isHighEngagement && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded-lg text-[8px] font-black text-indigo-600 uppercase">
                            <TrendingUp size={10} /> Velocity
                          </div>
                        )}
                        {lead.requiresImmediateFollowup && (
                          <div className={`w-2 h-2 rounded-full animate-ping ${col.status === LeadStatus.ACTION_REQUIRED ? 'bg-indigo-500' : 'bg-rose-500'}`} />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300 group-hover:text-indigo-600 transition-colors">
                        <BarChart3 size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <button className={`w-full py-6 border-2 border-dashed rounded-[2.5rem] text-[10px] font-black transition-all uppercase tracking-[0.2em] bg-white/50 ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'border-rose-200 text-rose-400 hover:border-rose-400 hover:text-rose-600' : col.status === LeadStatus.ACTION_REQUIRED ? 'border-indigo-200 text-indigo-400 hover:border-indigo-400 hover:text-indigo-600' : 'border-orange-200 text-orange-400 hover:border-orange-400 hover:text-orange-600') : 'border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-600'}`}>
                + Inject Lead Signal
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeadKanban;
