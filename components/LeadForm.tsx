
import React, { useState } from 'react';
import { X, Save, Sparkles, Zap, UserCheck, DollarSign, Clock, Target, CheckCircle2, ShieldCheck, UserPlus, AlertCircle, Check } from 'lucide-react';

interface LeadFormProps {
  onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onClose }) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [bant, setBant] = useState({
    need: false,
    authority: false,
    budget: false,
    timeline: 'Select Protocol...'
  });

  const toggleBant = (field: keyof typeof bant) => {
    setValidationError(null);
    if (field === 'need') {
      const newVal = !bant.need;
      setBant({
        ...bant,
        need: newVal,
        // Reset others if need is disabled to maintain data integrity
        authority: newVal ? bant.authority : false,
        budget: newVal ? bant.budget : false,
        timeline: newVal ? bant.timeline : 'Select Protocol...'
      });
    } else {
      setBant({ ...bant, [field]: !bant[field as keyof typeof bant] });
    }
  };

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // BANT Validation Logic
    if (bant.need) {
      const missingFields = [];
      if (!bant.authority) missingFields.push("'Authority'");
      if (!bant.budget) missingFields.push("'Budget'");
      if (bant.timeline === 'Select Protocol...') missingFields.push("'Timeline'");

      if (missingFields.length > 0) {
        const fieldList = missingFields.join(', ');
        setValidationError(`Protocol Violation: ${fieldList} must be confirmed for 'Need' qualified leads.`);
        return;
      }
    }

    setValidationError(null);
    alert("Pulse Recorded: Lead signal committed to global ledger.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <header className="px-10 py-6 border-b border-slate-200 flex items-center justify-between shrink-0">
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

        <form onSubmit={handleCommit} className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          {/* Section: Identity Data */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Identity Data</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <input required type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-sm shadow-inner" placeholder="John" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <input required type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-sm shadow-inner" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <input required type="email" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-sm shadow-inner" placeholder="john@company.com" />
            </div>
          </div>

          {/* Section: BANT Qualification */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between ml-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">BANT Qualification</h3>
              {bant.need && (
                <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                  <CheckCircle2 size={10} /> Valid Signal
                </span>
              )}
            </div>

            {/* Need Checkbox */}
            <div 
              onClick={() => toggleBant('need')}
              className={`flex items-center justify-between p-5 rounded-[1.5rem] border transition-all cursor-pointer group ${bant.need ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-all shadow-inner ${bant.need ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-white text-slate-400'}`}>
                  <Target size={20} />
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${bant.need ? 'text-indigo-600' : 'text-slate-400'}`}>Identified Need</p>
                  <p className={`text-xs font-bold ${bant.need ? 'text-slate-900' : 'text-slate-500'}`}>Does the lead have a clear pain point?</p>
                </div>
              </div>
              
              <div className="relative flex items-center justify-center shrink-0">
                <div className={`w-8 h-8 rounded-xl border-2 transition-all flex items-center justify-center ${
                  bant.need ? 'bg-indigo-600 border-indigo-600 shadow-lg' : 'bg-white border-slate-200 group-hover:border-slate-300'
                }`}>
                  {bant.need && <Check size={18} strokeWidth={4} className="text-white animate-in zoom-in duration-200" />}
                </div>
              </div>
            </div>

            {/* Conditional BANT Fields */}
            <div className={`space-y-4 transition-all duration-500 origin-top ${bant.need ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-20 scale-95 pointer-events-none'}`}>
              
              {/* Authority Toggle */}
              <div className={`flex items-center justify-between p-5 rounded-[1.5rem] border transition-all ${bant.authority ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-all shadow-inner ${bant.authority ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-slate-50 text-slate-400'}`}>
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${bant.authority ? 'text-emerald-600' : 'text-slate-400'}`}>Decision Maker</p>
                    <p className={`text-xs font-bold ${bant.authority ? 'text-slate-900' : 'text-slate-500'}`}>Does lead have buying authority?</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => toggleBant('authority')}
                  className={`w-14 h-7 rounded-full transition-all relative shrink-0 ${bant.authority ? 'bg-emerald-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${bant.authority ? 'translate-x-7' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Budget Toggle */}
              <div className={`flex items-center justify-between p-5 rounded-[1.5rem] border transition-all ${bant.budget ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-all shadow-inner ${bant.budget ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-slate-50 text-slate-400'}`}>
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${bant.budget ? 'text-emerald-600' : 'text-slate-400'}`}>Budget Confirmed</p>
                    <p className={`text-xs font-bold ${bant.budget ? 'text-slate-900' : 'text-slate-500'}`}>Is funding available for the project?</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => toggleBant('budget')}
                  className={`w-14 h-7 rounded-full transition-all relative shrink-0 ${bant.budget ? 'bg-emerald-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${bant.budget ? 'translate-x-7' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Temporal Window (Timeline)</label>
                <div className="relative">
                  <select 
                    value={bant.timeline}
                    onChange={(e) => {
                      setBant({ ...bant, timeline: e.target.value });
                      setValidationError(null);
                    }}
                    className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold appearance-none shadow-sm transition-all"
                  >
                    <option>Select Protocol...</option>
                    <option>Immediate / Urgent</option>
                    <option>1 - 3 Months</option>
                    <option>Exploratory (Long Term)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Clock size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
               <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
               <p className="text-[10px] font-black text-rose-700 uppercase tracking-tight leading-relaxed">{validationError}</p>
            </div>
          )}

          {/* AI Strategy Info Box */}
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group shrink-0">
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-3">
                  <Sparkles size={24} className="text-indigo-400 animate-pulse" />
                  <p className="text-xs font-black uppercase tracking-widest">Autonomous Scoring</p>
               </div>
               <p className="text-xs font-medium text-slate-400 leading-relaxed italic">
                 "Our AI Strategy Brain automatically refines these qualification attributes by analyzing subsequent omnichannel interactions."
               </p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          </div>
        </form>

        <footer className="p-10 border-t border-slate-200 bg-slate-50 flex gap-4 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 bg-white border border-slate-200 rounded-2xl hover:bg-slate-100 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            type="submit"
            onClick={handleCommit}
            className="flex-[2] py-4 text-xs font-black uppercase tracking-widest text-white bg-slate-900 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
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
