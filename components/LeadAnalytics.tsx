
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { TrendingUp, Users, Target, Activity, Zap, Flame, Snowflake } from 'lucide-react';

const ROI_DATA = [
  { month: 'Jan', investment: 4000, revenue: 2400 },
  { month: 'Feb', investment: 3000, revenue: 1398 },
  { month: 'Mar', investment: 2000, revenue: 9800 },
  { month: 'Apr', investment: 2780, revenue: 3908 },
  { month: 'May', investment: 1890, revenue: 4800 },
  { month: 'Jun', investment: 2390, revenue: 3800 },
];

const SOURCE_DATA = [
  { name: 'Direct', value: 400 },
  { name: 'Referral', value: 300 },
  { name: 'LinkedIn', value: 300 },
  { name: 'Ads', value: 200 },
];

const GRADE_DISTRIBUTION = [
  { name: 'Hot Leads', value: 18, color: '#ef4444' },
  { name: 'Warm Leads', value: 35, color: '#f59e0b' },
  { name: 'Cold Leads', value: 47, color: '#3b82f6' }
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

const LeadAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Scoring Precision", value: "94%", icon: Activity, color: "bg-indigo-600" },
          { label: "Hot Lead Velocity", value: "+12.4%", icon: Flame, color: "bg-red-600" },
          { label: "AI Decision ROI", value: "₹4.8L", icon: Zap, color: "bg-amber-500" }
        ].map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-3xl font-black text-slate-900">{s.value}</p>
            </div>
            <div className={`w-14 h-14 rounded-3xl ${s.color} flex items-center justify-center text-white shadow-xl shadow-current/20`}>
              <s.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-2">
            <Target size={20} className="text-indigo-600" />
            AI Intelligence Grade distribution
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={GRADE_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {GRADE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-600" />
            Lead Velocity Index (Hot vs Warm)
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ROI_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h4 className="text-3xl font-black uppercase tracking-tighter mb-4">Strategic Pulse Audit</h4>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Our AI Auditor has detected a <span className="text-emerald-400 font-bold">18% lift</span> in lead-to-meeting conversion by implementing the <strong className="text-white">Price Objection Script v4</strong>.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                Scale Strategy Global
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                Download Audit PDF
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[
               { label: "Capture Velocity", val: "High", color: "text-emerald-400" },
               { label: "AI Response Time", val: "1.2s", color: "text-indigo-400" },
               { label: "Closing Ratio", val: "22%", color: "text-amber-400" },
               { label: "Recovery Rate", val: "45%", color: "text-rose-400" }
             ].map((m, i) => (
               <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{m.label}</p>
                 <p className={`text-2xl font-black ${m.color}`}>{m.val}</p>
               </div>
             ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -mr-64 -mt-64" />
      </div>
    </div>
  );
};

export default LeadAnalytics;
