
import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles, ShieldCheck, Globe } from 'lucide-react';

const LeadCapturePublic: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Supabase Insert + n8n Trigger
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center p-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-4">Request Received!</h2>
        <p className="text-slate-500 leading-relaxed font-medium">
          Our AI Concierge is currently analyzing your profile to match you with the best strategy. Expect a WhatsApp message shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
      <div className="md:w-2/5 bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
            <Sparkles size={20} />
          </div>
          <h3 className="text-2xl font-bold leading-tight mb-4">Get Your AI Audit</h3>
          <p className="text-slate-400 text-sm font-medium">
            Join 500+ firms using autonomous lead intelligence.
          </p>
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <ShieldCheck size={14} className="text-emerald-500" /> Secure Encryption
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Globe size={14} className="text-indigo-500" /> Instant Analysis
          </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-10 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
              <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all" placeholder="Jane" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
              <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all" placeholder="Smith" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
            <input required type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all" placeholder="jane@company.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Industry</label>
            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all appearance-none">
              <option>Real Estate</option>
              <option>SaaS / Tech</option>
              <option>Finance</option>
              <option>Healthcare</option>
            </select>
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 group"
        >
          {loading ? 'Processing...' : 'Run AI Analysis'}
          <Send size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        
        <p className="text-[9px] text-center text-slate-400 font-medium leading-relaxed">
          By submitting, you agree to our terms. Data is processed via secure Google Gemini protocol.
        </p>
      </form>
    </div>
  );
};

export default LeadCapturePublic;
