import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, Users, Target, Activity, Zap, MessageSquare, 
  Flame, Sparkles, AlertTriangle, Phone, MoreHorizontal, 
  Clock, CheckCircle2, Crown, ShieldCheck, HeartPulse, 
  ArrowRight, Search, Layout, Filter, BarChart3, Coins,
  FileText, Image as ImageIcon, Video, Download, Archive, 
  Lock, Globe, Shield, ShieldAlert, Rocket, ArrowUpRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateDashboardInsights } from '../services/geminiService';
import { PlanTier } from '../types';

const DashboardOverview: React.FC<{ userPlan: PlanTier }> = ({ userPlan }) => {
  const [insights, setInsights] = useState<any[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const result = await generateDashboardInsights({
          leads_new: 15,
          hot_leads: 3,
          whatsapp_replies: 24,
          calls_connected: 12
        });
        if (result && result.insights) setInsights(result.insights);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingInsights(false);
      }
    };
    fetchInsights();
  }, []);

  const defaultInsights = [
    { text: "WhatsApp engagement is 160% higher than new lead volume; reallocate SDR bandwidth from cold calls to WhatsApp follow-ups to maximize conversion.", priority: "medium" },
    { text: "20% lead-to-hot conversion detected; implement a 15-minute response SLA for the 3 identified hot leads to prevent funnel leakage.", priority: "high" },
    { text: "The 2:1 ratio of WhatsApp replies to connected calls indicates a clear channel preference; use text-first scheduling to increase the call connection success rate.", priority: "medium" }
  ];

  const displayInsights = insights.length > 0 ? insights : defaultInsights;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* KPI BAR MATCHING SCREENSHOT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatsCard title="Total Leads" value="1,284" change="12" icon={Users} color="text-indigo-600" bgColor="bg-indigo-50" />
        <StatsCard title="New Today" value="42" change="8" icon={Activity} color="text-blue-600" bgColor="bg-blue-50" />
        <StatsCard title="Active Pulse" value="156" change="24" icon={MessageSquare} color="text-emerald-600" bgColor="bg-emerald-50" />
        <StatsCard title="Calls Handled" value="18" change="5" icon={Phone} color="text-orange-600" bgColor="bg-orange-50" />
        <StatsCard title="LTV Solvency" value="₹4.8L" change="15" icon={Coins} color="text-slate-900" bgColor="bg-slate-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI INSIGHTS PANEL (AUTONOMOUS STRATEGY BRAIN) */}
        <div className="lg:col-span-2">
          <div className="bg-[#0F111A] rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden h-full">
            <div className="relative z-10 flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#5143E1] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                  <Sparkles size={28} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Autonomous Strategy Brain</h2>
              </div>
              <button className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-slate-400">
                Audit Metrics
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {displayInsights.map((insight, i) => (
                <div key={i} className={`p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all flex flex-col justify-between group cursor-default ${i === 2 ? 'md:col-span-1' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <TrendingUp size={18} className="text-emerald-400" />
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-300 italic">
                      "{insight.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -ml-32 -mb-32" />
          </div>
        </div>

        {/* SIDEBAR CARDS */}
        <div className="space-y-8">
           {/* FUEL SOLVENCY CARD */}
           <div className="bg-white border border-slate-100 rounded-[3.5rem] p-10 shadow-[0_24px_48px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="relative z-10 space-y-10">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Fuel Solvency</h3>
                    <span className="px-3 py-1 bg-indigo-50 text-[#5143E1] text-[8px] font-black rounded-lg border border-indigo-100 uppercase tracking-widest">
                       Starter Tier
                    </span>
                 </div>
                 <div className="space-y-2">
                    <p className="text-6xl font-black text-slate-900 tracking-tighter">1,240</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Credits Pulse</p>
                 </div>
                 <div className="space-y-3">
                   <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <div className="h-full w-[65%] bg-[#5143E1] rounded-full shadow-lg" />
                   </div>
                 </div>
              </div>
              <button className="w-full py-5 bg-[#0F111A] text-white rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-slate-900/20 active:scale-95 transition-all hover:bg-slate-800 relative z-10">
                 Manual Recharge
              </button>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-50/30 rounded-full blur-3xl" />
           </div>

           {/* ENCRYPTION PULSE CARD */}
           <div className="bg-[#0F111A] rounded-[3.5rem] p-10 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-8">
                 <h3 className="text-[10px] font-black text-indigo-300/60 uppercase tracking-[0.25em] flex items-center gap-2">
                   <Shield size={16} /> Encryption Pulse
                 </h3>
                 <div className="space-y-6">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Lock size={20} className="text-indigo-400" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">RLS Vaulting</p>
                          <p className="text-xs font-black text-emerald-400 uppercase tracking-tighter">Authenticated 100%</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Globe size={20} className="text-indigo-400" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">CDN Distribution</p>
                          <p className="text-xs font-black text-indigo-400 uppercase tracking-tighter">Edge Pulse Active</p>
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

const StatsCard = ({ title, value, change, icon: Icon, color, bgColor }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_12px_24px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
    <div className="flex items-start justify-between mb-8 relative z-10">
      <div className={`p-4 rounded-2xl ${bgColor} ${color} shadow-inner`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
        <ArrowUpRight size={12} />
        {change}%
      </div>
    </div>
    <div className="relative z-10 space-y-1">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h3>
      <p className="text-4xl font-black text-slate-900 tracking-tight">{value}</p>
    </div>
    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-slate-50/50 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
  </div>
);

export default DashboardOverview;