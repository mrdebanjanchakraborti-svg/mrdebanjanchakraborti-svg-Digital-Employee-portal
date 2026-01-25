
import React from 'react';
import { LeadStatus, LeadTemperature, LeadGrade } from '../types';
import { MoreHorizontal, Star, MessageSquare, Flame, Sparkles, Activity, Snowflake, TrendingUp, DollarSign, UserCheck, Zap, Clock, AlertTriangle, BellRing } from 'lucide-react';

interface KanbanLead {
  id: string;
  name: string;
  company: string;
  score: number;
  grade: LeadGrade;
  priority: 'High' | 'Medium' | 'Low';
  temperature: LeadTemperature;
  scenario?: string;
  lastSignal?: string;
  interactionCount: number;
  requiresImmediateFollowup?: boolean;
  bant: {
    need: boolean;
    authority: boolean;
    budget: boolean;
    timeline: string;
  };
}

const LeadKanban: React.FC = () => {
  const columns: { title: string; status: LeadStatus; icon?: any; colorClass?: string }[] = [
    { title: 'Critical / Urgent', status: LeadStatus.URGENT, icon: Zap, colorClass: 'bg-rose-600' },
    { title: 'Immediate Follow-up', status: LeadStatus.FOLLOW_UP, icon: BellRing, colorClass: 'bg-amber-500' },
    { title: 'Intelligence Queue', status: LeadStatus.NEW },
    { title: 'Active Contact', status: LeadStatus.CONTACTED },
    { title: 'Decision Makers', status: LeadStatus.QUALIFIED },
    { title: 'Closed Revenue', status: LeadStatus.WON },
  ];

  const leads: Record<string, KanbanLead[]> = {
    [LeadStatus.URGENT]: [
      { id: 'urgent_1', name: 'Rohan Kapoor', company: 'Kapoor Real Estate', score: 98, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.HOT, scenario: 'missed_call_recovery', interactionCount: 1, lastSignal: 'High Intensity Missed Call', bant: { need: true, authority: true, budget: false, timeline: 'Immediate' } },
    ],
    [LeadStatus.FOLLOW_UP]: [
      { id: 'fup_1', name: 'Ishita Gupta', company: 'Gupta & Sons', score: 92, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.HOT, scenario: 'pricing_objection', interactionCount: 12, lastSignal: 'Asked for discount', requiresImmediateFollowup: true, bant: { need: true, authority: true, budget: true, timeline: 'Immediate' } },
      { id: 'fup_2', name: 'Aditya Varma', company: 'Varma Logistics', score: 91, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.HOT, scenario: 'lead_recovery', interactionCount: 4, lastSignal: 'No reply for 4h', requiresImmediateFollowup: true, bant: { need: true, authority: false, budget: false, timeline: 'Next Week' } },
    ],
    [LeadStatus.NEW]: [
      { id: '1', name: 'Alex Rivera', company: 'TechFlow', score: 25, grade: LeadGrade.COLD, priority: 'Medium', temperature: LeadTemperature.COLD, scenario: 'validation', interactionCount: 2, lastSignal: 'New Inbound', bant: { need: false, authority: false, budget: false, timeline: 'Unknown' } },
      { id: '2', name: 'Samantha Reed', company: 'Global Solutions', score: 82, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.WARM, scenario: 'lead_recovery', interactionCount: 5, lastSignal: 'Replied: WhatsApp', bant: { need: true, authority: false, budget: false, timeline: 'Short-term' } },
    ],
    [LeadStatus.CONTACTED]: [
      { id: '3', name: 'Marcus Chen', company: 'Nexus IT', score: 55, grade: LeadGrade.WARM, priority: 'Medium', temperature: LeadTemperature.WARM, scenario: 'pricing_objection', interactionCount: 8, lastSignal: 'Asked for Pricing', bant: { need: true, authority: true, budget: false, timeline: 'Immediate' } },
    ],
    [LeadStatus.QUALIFIED]: [
      { id: '4', name: 'Elena Gilbert', company: 'Mystic Falls RE', score: 94, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.HOT, scenario: 'closing_mode', interactionCount: 14, lastSignal: 'Buying Signal: Call', bant: { need: true, authority: true, budget: true, timeline: '15 days' } },
    ],
    [LeadStatus.WON]: [
      { id: '5', name: 'Stefan Salvatore', company: 'Bloodlines LLC', score: 100, grade: LeadGrade.HOT, priority: 'High', temperature: LeadTemperature.HOT, scenario: 'post_sale', interactionCount: 20, lastSignal: 'Contract Won', bant: { need: true, authority: true, budget: true, timeline: 'Complete' } },
    ],
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
    <div className="flex gap-6 h-full min-w-[1800px] animate-in fade-in duration-500 overflow-x-auto pb-10 custom-scrollbar">
      {columns.map((col) => {
        const isPriorityCol = col.status === LeadStatus.URGENT || col.status === LeadStatus.FOLLOW_UP;
        
        return (
          <div key={col.status} className="flex-1 flex flex-col min-w-[320px]">
            <div className={`flex items-center justify-between mb-4 px-4 py-3 rounded-2xl ${col.colorClass ? `${col.colorClass} text-white shadow-lg` : 'bg-transparent text-slate-900'}`}>
              <h3 className="font-black flex items-center gap-2 text-sm tracking-tight uppercase">
                {col.icon && <col.icon size={16} className={isPriorityCol ? 'animate-pulse' : ''} />}
                {col.title}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isPriorityCol ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {(leads[col.status] || []).length}
                </span>
              </h3>
              <button className={`${isPriorityCol ? 'text-white/60' : 'text-slate-400'} hover:text-slate-600`}>
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className={`flex-1 ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'bg-rose-50/30' : 'bg-amber-50/30') : 'bg-slate-100/50'} rounded-[2.5rem] p-4 space-y-4 overflow-y-auto border ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'border-rose-100' : 'border-amber-100') : 'border-slate-200/50'}`}>
              {(leads[col.status] || []).map((lead) => {
                const isVeryHighIntent = lead.score > 90 || lead.requiresImmediateFollowup;
                
                return (
                  <div key={lead.id} className={`bg-white p-6 rounded-3xl border transition-all group cursor-grab active:cursor-grabbing relative overflow-hidden ${isVeryHighIntent ? (col.status === LeadStatus.URGENT ? 'border-rose-200 shadow-xl shadow-rose-500/5 ring-1 ring-rose-500/10' : 'border-amber-200 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/10') : 'border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1'}`}>
                    {isVeryHighIntent && (
                      <div className={`absolute top-0 right-0 w-16 h-16 ${col.status === LeadStatus.URGENT ? 'bg-rose-500/10' : 'bg-amber-500/10'} rounded-bl-[3rem] -mr-4 -mt-4 blur-xl`} />
                    )}
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="flex flex-wrap gap-2">
                        {getGradeBadge(lead.grade)}
                        {lead.scenario && (
                          <span className={`flex items-center gap-1 text-[8px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-tighter shadow-sm ${isPriorityCol ? 'bg-white/80 text-slate-700 border-slate-200' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                            <Sparkles size={8} /> {lead.scenario.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                      <div className={`flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-xl border ${lead.score > 90 ? (col.status === LeadStatus.URGENT ? 'bg-rose-600 text-white border-rose-600' : 'bg-amber-600 text-white border-amber-600') + ' shadow-lg animate-pulse' : lead.score > 80 ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-50 text-slate-900 border-slate-100'}`}>
                        <Activity size={10} />
                        {lead.score}
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors leading-tight mb-0.5">{lead.name}</h4>
                    <p className="text-xs text-slate-500 font-medium tracking-tight mb-4">{lead.company}</p>

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

                    <div className={`${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'bg-rose-50/50' : 'bg-amber-50/50') : 'bg-slate-50'} p-3 rounded-2xl mb-4 border ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'border-rose-100' : 'border-amber-100') : 'border-slate-100'}`}>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Intelligence Signal</p>
                       <p className={`text-[11px] font-bold flex items-center gap-1.5 italic ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'text-rose-700' : 'text-amber-700') : 'text-slate-700'}`}>
                          {isPriorityCol ? <AlertTriangle size={12} className={col.status === LeadStatus.URGENT ? 'text-rose-500' : 'text-amber-500'} /> : <TrendingUp size={12} className="text-emerald-500" />} {lead.lastSignal}
                       </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-xl ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'bg-rose-600' : 'bg-amber-500') : 'bg-slate-900'} flex items-center justify-center text-[10px] font-black text-white shadow-xl`}>
                          {lead.name.substring(0, 2).toUpperCase()}
                        </div>
                        {lead.requiresImmediateFollowup && (
                          <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MessageSquare size={14} className="group-hover:text-indigo-500 transition-colors" />
                          <span className="text-[10px] font-black">{lead.interactionCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <button className={`w-full py-5 border-2 border-dashed rounded-[2.5rem] text-[10px] font-black transition-all uppercase tracking-[0.2em] bg-white/50 ${isPriorityCol ? (col.status === LeadStatus.URGENT ? 'border-rose-200 text-rose-400 hover:border-rose-400 hover:text-rose-600' : 'border-amber-200 text-amber-400 hover:border-amber-400 hover:text-amber-600') : 'border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-600'}`}>
                + Add Lead signal
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeadKanban;
