import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, Users, Target, Activity, Zap, MessageSquare, 
  Flame, Sparkles, AlertTriangle, Phone, MoreHorizontal, 
  Clock, CheckCircle2, Crown, ShieldCheck, HeartPulse, 
  ArrowRight, Search, Layout, Filter, BarChart3, Coins,
  Wallet, PieChart, Shield, RefreshCw, Loader2, ArrowUpRight,
  ArrowDownRight, Building2, ExternalLink, Award, ShieldAlert,
  Calendar, CreditCard, DollarSign, UserCheck, AlertCircle, UserPlus,
  ShoppingCart, ShieldX, XCircle, FileText, CheckCircle, Radio, Send
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, Pie, 
  LineChart, Line, Legend
} from 'recharts';
import { generateAdminInsights } from '../services/geminiService';
import { PlanTier } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'kpi' | 'solvency' | 'review' | 'execution'>('kpi');
  const [insights, setInsights] = useState<any[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);

  // Manual Review Queue Simulation for SAAS Commerce
  const [reviewQueue, setReviewQueue] = useState([
    { id: 'mq_101', user: 'Jason Miller', company: 'Miller RE', amount: 14750, plan: PlanTier.GROWTH, type: 'Bank Handshake Pulse', evidence: '/gcs/proofs/rec_992.jpg', date: '2h ago' },
    { id: 'mq_102', user: 'Elena Gilbert', company: 'Mystic Falls', amount: 0, plan: PlanTier.ENTERPRISE, type: 'Enterprise Scoping Request', evidence: null, date: '5h ago' }
  ]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const result = await generateAdminInsights({
          revenue: 248000,
          partners: 14,
          churn: 2.4,
          credits_burn: 420,
          new_customers: 124,
          active_customers: 850
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

  const handleApprove = (id: string) => {
    const item = reviewQueue.find(q => q.id === id);
    if (!item) return;
    
    setReviewQueue(reviewQueue.filter(q => q.id !== id));
    alert(`Financial Handshake Successful. Workforce activated for ${item.user}. Invoice mirroring to Ledger vault complete.`);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-full">
      {/* KPI TABS */}
      <div className="flex gap-4 p-1.5 bg-white border border-slate-200 rounded-3xl w-fit shadow-sm">
         {[
           { id: 'kpi', label: 'Ecosystem Pulse', icon: Activity },
           { id: 'execution', label: 'Trigger Load', icon: Radio },
           { id: 'solvency', label: 'Revenue integrity', icon: DollarSign },
           { id: 'review', label: 'Financial Review', icon: ShieldAlert, badge: reviewQueue.length }
         ].map(tab => (
           <button 
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeView === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}
           >
              <tab.icon size={16} /> 
              {tab.label}
              {tab.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[8px] ${activeView === tab.id ? 'bg-white text-indigo-600' : 'bg-rose-50 text-white'}`}>
                  {tab.badge}
                </span>
              )}
           </button>
         ))}
      </div>

      {activeView === 'kpi' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <KPICard title="Global Customers" value="1,284" change="12" icon={Users} color="bg-indigo-600" trend="up" />
            <KPICard title="Active Pulse" value="850" change="8" icon={ShieldCheck} color="bg-blue-500" trend="up" />
            <KPICard title="MRR Pulse" value="₹14.2L" change="15" icon={TrendingUp} color="bg-emerald-600" trend="up" />
            <KPICard title="Outbound Vel" value="1.2k/hr" change="24" icon={Send} color="bg-indigo-400" trend="up" />
            {/* Fix: Removed duplicate 'trend' attribute which was present on line 93 */}
            <KPICard title="AI Fuel Burn" value="1.2M" change="22" icon={Zap} color="bg-slate-900" trend="up" />
            <KPICard title="Execution Vol" value="42k" change="18" icon={Radio} color="bg-indigo-900" trend="up" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2 mb-10">
                  <TrendingUp size={24} className="text-indigo-600" /> Solvency Conversion Velocity
               </h3>
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={[{n: 'Free', v: 434}, {n: 'Starter', v: 240}, {n: 'Growth', v: 310}, {n: 'Pro', v: 120}, {n: 'Ent', v: 12}]}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} />
                        <Bar dataKey="v" radius={[10, 10, 0, 0]} barSize={50}>
                           {['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'].map((color, index) => (
                              <Cell key={`cell-${index}`} fill={color} />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[450px]">
               <div className="relative z-10 space-y-12">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <div className="p-5 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-md">
                           <Sparkles size={42} className="text-white animate-pulse" />
                        </div>
                        <div>
                           <h2 className="text-4xl font-black uppercase tracking-tight">Growth Strategist brain</h2>
                           <p className="text-indigo-100 text-lg font-medium italic mt-1 opacity-80">Autonomous Profit Integrity Pulse</p>
                        </div>
                     </div>
                  </div>

                  {loadingInsights ? (
                     <div className="flex flex-col items-center gap-6 py-20">
                        <Loader2 size={64} className="animate-spin text-indigo-300" />
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 gap-6">
                        {insights.slice(0, 2).map((insight, i) => (
                           <div key={i} className="p-8 bg-white/10 border border-white/10 rounded-[2.5rem] backdrop-blur-md hover:bg-white/20 transition-all group">
                              <div className="flex items-start gap-6">
                                 <div className={`p-4 rounded-2xl bg-white/10 ${insight.priority === 'high' ? 'text-rose-400' : 'text-emerald-400'}`}>
                                    {insight.priority === 'high' ? <ShieldAlert size={28} /> : <TrendingUp size={28} />}
                                 </div>
                                 <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{insight.category} Logic</p>
                                    <p className="text-lg font-black leading-tight tracking-tight">{insight.text}</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] -mr-80 -mt-80" />
            </div>
          </div>
        </>
      )}

      {activeView === 'execution' && (
        <div className="bg-white border border-slate-200 rounded-[4rem] overflow-hidden shadow-sm animate-in zoom-in-95 duration-500">
           <header className="px-12 py-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                    <Radio size={28} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Global Pulse Traffic</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Incoming Signals vs Outgoing Broadcasts</p>
                 </div>
              </div>
           </header>
           <div className="p-12">
              <div className="h-[400px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { t: '09:00', in: 420, out: 120 }, { t: '10:00', in: 850, out: 340 }, { t: '11:00', in: 620, out: 280 },
                      { t: '12:00', in: 980, out: 450 }, { t: '13:00', in: 1200, out: 520 }, { t: '14:00', in: 1100, out: 410 },
                      { t: '15:00', in: 1450, out: 680 }, { t: '16:00', in: 950, out: 300 }, { t: '17:00', in: 600, out: 210 }
                    ]}>
                       <defs>
                          <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} />
                       <Tooltip />
                       <Area type="monotone" dataKey="in" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorIn)" />
                       <Area type="monotone" dataKey="out" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorOut)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
      )}

      {activeView === 'review' && (
        <div className="bg-white border border-slate-200 rounded-[4rem] overflow-hidden shadow-sm animate-in zoom-in-95 duration-500">
           <header className="px-12 py-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-orange-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-orange-100">
                    <ShieldAlert size={28} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Manual Solvency Registry</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Pending Bank proofs & Enterprise Authorizations</p>
                 </div>
              </div>
           </header>

           <div className="divide-y divide-slate-100">
              {reviewQueue.map(item => (
                <div key={item.id} className="p-12 flex flex-col lg:flex-row items-center justify-between gap-10 hover:bg-slate-50/50 transition-colors group">
                   <div className="flex items-center gap-8 flex-1">
                      <div className="w-20 h-20 rounded-[2rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-600 text-2xl shadow-inner uppercase">
                         {item.user[0]}
                      </div>
                      <div className="space-y-2">
                         <div className="flex items-center gap-3">
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">{item.user}</h4>
                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase text-slate-400">{item.company}</span>
                         </div>
                         <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-1.5"><Calendar size={12} /> {item.date}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="flex items-center gap-1.5"><CreditCard size={12} /> {item.type}</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-12">
                      <div className="text-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Plan</p>
                         <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-xl border border-indigo-100 uppercase tracking-widest">{item.plan}</span>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Solvency Pulse</p>
                         <p className="text-3xl font-black text-slate-900">₹{item.amount.toLocaleString()}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-3">
                      {item.evidence && (
                        <button className="p-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm group/btn" title="View GCS Proof">
                           <FileText size={20} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleApprove(item.id)}
                        className="px-10 py-5 bg-emerald-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95 flex items-center gap-2"
                      >
                         <CheckCircle size={18} /> Authorize Ledger
                      </button>
                      <button className="p-5 bg-white border border-slate-200 text-slate-300 rounded-3xl hover:text-rose-600 hover:border-rose-100 transition-all active:scale-95">
                         <XCircle size={20} />
                      </button>
                   </div>
                </div>
              ))}
              {reviewQueue.length === 0 && (
                <div className="p-32 text-center space-y-6">
                   <div className="w-24 h-24 bg-slate-50 border-4 border-dashed border-slate-100 rounded-[3rem] mx-auto flex items-center justify-center text-slate-200 shadow-inner">
                      <CheckCircle2 size={48} />
                   </div>
                   <h4 className="text-xl font-black text-slate-400 uppercase tracking-widest">Global Solvency Queue Idle</h4>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

const KPICard = ({ title, value, change, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-500 transition-all duration-500">
    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className={`p-3 rounded-2xl ${color} shadow-lg shadow-current/10`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full border ${trend === 'up' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-rose-600 bg-rose-50 border-rose-100'}`}>
        {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {change}%
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</h3>
      <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
    </div>
    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
  </div>
);

export default AdminDashboard;