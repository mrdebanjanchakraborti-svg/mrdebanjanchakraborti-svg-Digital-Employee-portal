
import React from 'react';
import { 
  Star, Share2, MessageSquare, Plus, 
  ChevronRight, ArrowRight, CheckCircle2, 
  Award, Heart, Sparkles, Filter
} from 'lucide-react';

const ReviewManager: React.FC = () => {
  const stats = [
    { label: "Review Requests Sent", value: "482", icon: Star, color: "text-amber-500 bg-amber-50" },
    { label: "New Reviews", value: "84", icon: Award, color: "text-emerald-500 bg-emerald-50" },
    { label: "Referrals Generated", value: "32", icon: Heart, color: "text-rose-500 bg-rose-50" },
    { label: "Conversion Value", value: "₹2.4L", icon: Sparkles, color: "text-indigo-500 bg-indigo-50" }
  ];

  const recentActivity = [
    { id: '1', name: 'Rohan Sharma', company: 'Sharma Realty', type: 'Review Received', rating: 5, date: '2h ago' },
    { id: '2', name: 'Priya Verma', company: 'V-Tech Solutions', type: 'Referral Provided', rating: null, date: '1d ago' },
    { id: '3', name: 'Amit Singh', company: 'Global Logistics', type: 'Review Requested', rating: null, date: '2d ago' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase text-lg">Reviews & Referrals</h2>
          <p className="text-slate-500 text-sm font-medium">Automate post-sale social proof and word-of-mouth growth.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
            Manage Links
          </button>
          <button className="px-6 py-2.5 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            Send Bulk Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className={`w-10 h-10 rounded-2xl ${stat.color} flex items-center justify-center border border-current/10 mb-4`}>
              <stat.icon size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
          <header className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Recent Social Proof</h3>
            <button className="text-slate-400 hover:text-slate-600"><Filter size={18} /></button>
          </header>
          <div className="divide-y divide-slate-50">
            {recentActivity.map(item => (
              <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-50">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 tracking-tight">{item.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${item.type.includes('Received') ? 'text-emerald-600' : 'text-indigo-600'}`}>
                      {item.type}
                    </p>
                    <div className="flex items-center justify-end gap-0.5">
                      {item.rating ? (
                         Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={10} className={i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} />
                        ))
                      ) : (
                        <span className="text-[9px] font-bold text-slate-300">Pending</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</p>
                    <button className="text-indigo-600 hover:text-indigo-700 transition-colors p-1">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-100 transition-all border-t border-slate-100">
            View Full Growth Audit
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
            <h3 className="text-xl font-black mb-4 leading-tight uppercase tracking-tight">Post-Sale Strategy</h3>
            <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-8">
              We automatically request reviews and referrals <span className="text-white font-bold">24 hours</span> after a deal is marked as "WON".
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/10 border border-white/10 rounded-2xl">
                 <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                 <span className="text-xs font-bold">WhatsApp Template Active</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/10 border border-white/10 rounded-2xl">
                 <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                 <span className="text-xs font-bold">GMB Review Link Connected</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Top Referrers</h4>
            <div className="space-y-4">
              {[
                { name: 'Arjun Mehta', count: 12, value: '₹45k' },
                { name: 'Sonal Kapoor', count: 8, value: '₹32k' },
                { name: 'Deepak Raj', count: 5, value: '₹18k' }
              ].map((ref, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-50">
                      {i + 1}
                    </div>
                    <span className="text-xs font-black text-slate-900">{ref.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{ref.count} Referrals</p>
                    <p className="text-[9px] font-bold text-slate-400">{ref.value} Earned</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewManager;
