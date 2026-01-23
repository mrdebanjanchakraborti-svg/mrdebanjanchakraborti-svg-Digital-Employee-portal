
import React from 'react';
import { X, Save, Sparkles, Zap, UserCheck, DollarSign, Clock } from 'lucide-react';

interface LeadFormProps {
  onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <header className="px-10 py-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl">
                <Zap size={20} fill="currentColor" />
             </div>
             <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Signal Ingestion</h2>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </header>

        <form className="flex-1 overflow-y-auto p-10 space-y-8">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Identity Data</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <input type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-sm" placeholder="John" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <input type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-sm" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <input type="email" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-sm" placeholder="john@company.com" />
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">BANT Qualification (Manual)</h3>
            <div className="grid grid-cols-2 gap-4">
               <button type="button" className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-200 transition-all group">
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-indigo-600 transition-colors"><UserCheck size={16} /></div>
                  <span className="text-[10px] font-black uppercase text-slate-500">Authority</span>
               </button>
               <button type="button" className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-200 transition-all group">
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-indigo-600 transition-colors"><DollarSign size={16} /></div>
                  <span className="text-[10px] font-black uppercase text-slate-500">Budget</span>
               </button>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Anticipated Timeline</label>
              <select className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold">
                 <option>Select Protocol...</option>
                 <option>Immediate / Urgent</option>
                 <option>1 - 3 Months</option>
                 <option>Exploratory (Long Term)</option>
              </select>
            </div>
          </div>

          <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group">
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-3">
                  <Sparkles size={24} className="text-indigo-300 animate-pulse" />
                  <p className="text-xs font-black uppercase tracking-widest">Autonomous Scoring</p>
               </div>
               <p className="text-xs font-medium text-indigo-100 leading-relaxed italic">
                 "Our AI Strategy Brain will automatically refine these attributes based on subsequent WhatsApp and Voice interactions."
               </p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
          </div>
        </form>

        <footer className="p-10 border-t border-slate-200 bg-slate-50 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 bg-white border border-slate-200 rounded-2xl hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button className="flex-[2] py-4 text-xs font-black uppercase tracking-widest text-white bg-slate-900 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
            <Save size={18} />
            Commit Signal
          </button>
        </footer>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default LeadForm;
