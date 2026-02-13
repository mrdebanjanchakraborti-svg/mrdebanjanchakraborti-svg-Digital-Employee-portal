
import React, { useState } from 'react';
import { 
  Building2, BrainCircuit, MessageCircle, Phone, 
  Users, CreditCard, CheckCircle2, ArrowRight, ArrowLeft,
  Loader2, Zap, Globe, Smartphone, Mic
} from 'lucide-react';
import { supabase } from '../supabase';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const steps = [
  { id: 'company_setup', name: 'COMPANY', step: 'STEP 01', icon: Building2, desc: 'DEFINE YOUR\nBUSINESS ENTITY' },
  { id: 'omnichannel', name: 'INTERFACE', step: 'STEP 02', icon: Smartphone, desc: 'CONFIGURE\nCHANNELS' },
  { id: 'complete', name: 'ACTIVATE', step: 'STEP 03', icon: Zap, desc: 'DEPLOY DIGITAL\nEMPLOYEE' }
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industryFocus: '',
    whatsappNumber: '',
    preferredVoice: 'Zephyr'
  });

  const handleDeploy = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Authentication required to deploy workforce.");

      // 1. Create Workspace with Explicit Mapped Details
      // The SQL Trigger 'on_workspace_created' handles the subscription and credit initialization
      const { data: ws, error: wsError } = await supabase
        .from('workspaces')
        .insert([{
          owner_id: user.id,
          company_name: formData.companyName,
          industry_sector: formData.industryFocus,
          whatsapp_number: formData.whatsappNumber,
          preferred_voice: formData.preferredVoice,
          onboarding_completed: true
        }])
        .select()
        .single();

      if (wsError) throw wsError;

      // Pulse verified. Workspace data is now in public.workspaces.
      onComplete();
    } catch (e: any) {
      console.error("Deploy Protocol Failed:", e);
      alert("Deployment Interrupted: " + (e.message || "Ledger sync error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStepIndex === steps.length - 1) {
      handleDeploy();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-hidden">
      <header className="bg-white border-b border-slate-100 px-12 py-6 shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <img src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" alt="Logo" className="h-16 w-auto" />
          <div className="flex items-center gap-6">
             <div className="flex gap-2">
                {steps.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === currentStepIndex ? 'bg-indigo-600 w-8' : 'bg-slate-200'} transition-all duration-500`} />
                ))}
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{currentStep.step}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl p-16 space-y-12">
          <div className="flex items-center gap-6">
             <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl">
                <currentStep.icon size={32} />
             </div>
             <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none whitespace-pre-line">
               {currentStep.desc}
             </h2>
          </div>

          {currentStep.id === 'company_setup' && (
            <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Official Entity Name</label>
                <input 
                  type="text" 
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all font-bold" 
                  placeholder="e.g. Acme Corporation" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Industry Sector</label>
                <select 
                  value={formData.industryFocus}
                  onChange={(e) => setFormData({...formData, industryFocus: e.target.value})}
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all font-bold appearance-none"
                >
                   <option value="">Select Domain...</option>
                   <option>Real Estate</option>
                   <option>SaaS / Tech</option>
                   <option>E-commerce</option>
                   <option>Legal Services</option>
                </select>
              </div>
            </div>
          )}

          {currentStep.id === 'omnichannel' && (
            <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">WhatsApp Pulse Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all font-bold" 
                    placeholder="+91 98765 43210" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">AI Vocal Profile (Voice)</label>
                <div className="grid grid-cols-2 gap-4">
                   {['Zephyr', 'Kore', 'Puck', 'Fenrir'].map(voice => (
                     <button 
                      key={voice}
                      onClick={() => setFormData({...formData, preferredVoice: voice})}
                      className={`p-6 border rounded-[1.5rem] flex items-center gap-4 transition-all ${formData.preferredVoice === voice ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl' : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-white'}`}
                     >
                        <Mic size={18} />
                        <span className="font-black text-xs uppercase tracking-widest">{voice}</span>
                     </button>
                   ))}
                </div>
              </div>
            </div>
          )}

          {currentStep.id === 'complete' && (
            <div className="text-center py-10 space-y-6 animate-in zoom-in-95 duration-500">
               <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
                  <Zap size={48} fill="currentColor" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase text-slate-900">Identity Handshake Complete</h3>
                  <p className="text-slate-500 font-medium italic">"Company: {formData.companyName} is ready for global autonomous scaling."</p>
               </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-10 border-t border-slate-100">
            <button 
              onClick={() => setCurrentStepIndex(prev => prev - 1)} 
              disabled={currentStepIndex === 0} 
              className="text-slate-400 font-black uppercase text-[10px] tracking-widest disabled:opacity-0 flex items-center gap-2 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={16} /> Previous
            </button>
            <button 
              onClick={handleNext} 
              disabled={isLoading || (currentStep.id === 'company_setup' && !formData.companyName)} 
              className="px-12 py-5 bg-[#5143E1] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : currentStep.id === 'complete' ? 'ACTIVATE WORKFORCE' : 'ADVANCE SEQUENCE'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingFlow;
