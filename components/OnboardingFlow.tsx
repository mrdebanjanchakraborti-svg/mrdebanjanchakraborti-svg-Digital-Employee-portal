
import React, { useState, useEffect } from 'react';
import { 
  Building2, BrainCircuit, MessageCircle, Phone, 
  Users, CreditCard, CheckCircle2, ArrowRight, ArrowLeft,
  Sparkles, Loader2, Zap, Asterisk
} from 'lucide-react';
import { generateAITrainingSuggestions } from '../services/geminiService';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const steps = [
  { id: 'company_setup', name: 'COMPANY', step: 'STEP 01', icon: Building2, desc: 'DEFINE YOUR\nBUSINESS ENTITY' },
  { id: 'ai_training', name: 'AI BRAIN', step: 'STEP 02', icon: BrainCircuit, desc: 'ARCHITECT YOUR\nINTELLIGENCE' },
  { id: 'whatsapp_connect', name: 'WHATSAPP', step: 'STEP 03', icon: MessageCircle, desc: 'OMNICHANNEL\nHANDSHAKE' },
  { id: 'voice_connect', name: 'VOICE', step: 'STEP 04', icon: Phone, desc: 'VOICE PULSE\nCONFIGURATION' },
  { id: 'team_invite', name: 'TEAM', step: 'STEP 05', icon: Users, desc: 'WORKSPACE\nCOLLABORATION' },
  { id: 'plan_selection', name: 'SUBSCRIPTION', step: 'STEP 06', icon: CreditCard, desc: 'PLAN\nSELECTION' },
  { id: 'complete', name: 'ACTIVATE', step: 'STEP 07', icon: Zap, desc: 'DEPLOY DIGITAL\nEMPLOYEE' }
];

const plans = [
  { id: 'FREE', name: 'FREE\nTIER' },
  { id: 'STARTER', name: 'STARTER' },
  { id: 'GROWTH', name: 'GROWTH' },
  { id: 'PRO', name: 'PRO' },
  { id: 'ENTERPRISE', name: 'ENTERPRISE' }
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    industryFocus: '',
    brainFocus: '',
    whatsappNumber: '',
    voiceProvider: '',
    teamEmails: '',
    selectedPlan: ''
  });

  const currentStep = steps[currentStepIndex];

  const canAdvance = () => {
    if (currentStepIndex === 0) return formData.companyName.length > 2 && formData.industryFocus.length > 2;
    if (currentStepIndex === 1) return formData.brainFocus.length > 2;
    if (currentStepIndex === 2) return formData.whatsappNumber.length > 8;
    if (currentStepIndex === 3) return formData.voiceProvider !== '';
    if (currentStepIndex === 4) return formData.teamEmails.includes('@');
    if (currentStepIndex === 5) return formData.selectedPlan !== '';
    return true;
  };

  const handleNext = async () => {
    if (!canAdvance()) return;

    if (currentStep.id === 'ai_training' && !aiSuggestions && formData.industryFocus) {
      setIsLoading(true);
      try {
        const suggestions = await generateAITrainingSuggestions(formData.industryFocus);
        setAiSuggestions(suggestions);
      } catch (e) {
        console.error("AI Suggestions error:", e);
      } finally {
        setIsLoading(false);
        setCurrentStepIndex(prev => prev + 1); 
      }
      return;
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-hidden">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-100 px-12 py-6 shrink-0 z-10">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" 
              alt="Logo" 
              className="h-16 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            />
          </div>
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">Setup Progress</span>
              <span className="text-lg font-black text-slate-900 mt-0.5">{Math.round(((currentStepIndex + 1) / steps.length) * 100)}% Complete</span>
            </div>
            <div className="w-64 h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/50 p-0.5">
              <div 
                className="h-full bg-[#5143E1] transition-all duration-1000 ease-out shadow-md shadow-indigo-100 rounded-full" 
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden p-8 lg:p-12">
        <div className="max-w-[1600px] mx-auto flex gap-12 h-full">
          {/* Vertical Stepper Sidebar */}
          <div className="hidden lg:flex flex-col w-56 space-y-6 shrink-0 pt-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStepIndex;
              const isCompleted = idx < currentStepIndex;
              return (
                <div key={step.id} className="flex items-center gap-4 group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                    isActive ? 'bg-[#5143E1] border-[#5143E1] text-white shadow-lg scale-110' :
                    isCompleted ? 'bg-white border-emerald-500 text-emerald-500 shadow-sm' : 'bg-white border-slate-100 text-slate-200'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[10px] font-black uppercase tracking-[0.1em] ${isActive ? 'text-[#5143E1]' : isCompleted ? 'text-slate-900' : 'text-slate-300'}`}>
                      {step.name}
                    </p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest opacity-60">STEP 0{idx + 1}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Content Card */}
          <div className="flex-1 flex flex-col h-full min-h-0">
            <div className="bg-white border border-slate-100 rounded-[3rem] shadow-[0_30px_90px_rgba(0,0,0,0.02)] flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-10 lg:p-16 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                <div className="mb-10">
                  <h2 className="text-5xl lg:text-[72px] font-black text-[#0B1530] mb-4 tracking-tighter uppercase leading-[0.85] whitespace-pre-line">
                    {currentStep.desc}
                  </h2>
                  <p className="text-[#9BA3B5] text-lg lg:text-xl font-medium leading-relaxed italic mt-4 opacity-80">Configure the intelligence parameters for your workspace.</p>
                </div>

                <div className="flex-1 min-h-0 flex flex-col">
                  {currentStep.id === 'company_setup' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">COMPANY NAME</label>
                          <input 
                            type="text" 
                            value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-bold text-base shadow-inner" 
                            placeholder="Acme Innovations" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">INDUSTRY FOCUS</label>
                          <input 
                            type="text" 
                            value={formData.industryFocus}
                            onChange={(e) => setFormData({...formData, industryFocus: e.target.value})}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-bold text-base shadow-inner" 
                            placeholder="SaaS, Real Estate..." 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep.id === 'plan_selection' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col justify-center py-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                         {plans.map(p => (
                           <button 
                             key={p.id}
                             onClick={() => setFormData({...formData, selectedPlan: p.id})}
                             className={`flex flex-col items-center justify-center py-10 px-4 rounded-[6rem] text-center transition-all duration-500 border-2 ${
                               formData.selectedPlan === p.id 
                                 ? 'bg-white border-[#5143E1] shadow-[0_20px_60px_rgba(81,67,225,0.12)] ring-[8px] ring-indigo-500/5 scale-105 z-10' 
                                 : 'bg-[#F9FBFF] border-transparent hover:bg-white hover:border-slate-200'
                             }`}
                           >
                              <p className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.2em] text-[#9BA3B5] mb-6 leading-tight">SELECTION<br/>REQUIRED</p>
                              <h4 className={`text-[1.5rem] lg:text-[1.8rem] font-black tracking-tighter leading-[0.95] whitespace-pre-line ${formData.selectedPlan === p.id ? 'text-[#0B1530]' : 'text-[#B0B8C8]'}`}>
                                {p.name}
                              </h4>
                           </button>
                         ))}
                      </div>
                    </div>
                  )}

                  {/* Generic Handshake UI */}
                  {currentStep.id !== 'company_setup' && currentStep.id !== 'plan_selection' && currentStep.id !== 'complete' && (
                    <div className="flex-1 flex flex-col items-center justify-center py-12">
                      <div className="w-full max-w-2xl bg-[#F8FAFC] border border-slate-100 rounded-[3rem] p-12 flex flex-col items-center text-center gap-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md text-[#5143E1]">
                          {isLoading ? <Loader2 size={42} className="animate-spin" /> : <currentStep.icon size={42} />}
                        </div>
                        <div>
                          <p className="text-sm lg:text-base font-black text-slate-900 uppercase tracking-widest">CONFIGURATION PROTOCOL</p>
                          <p className="text-xs lg:text-sm text-slate-400 mt-2 font-medium italic">Please complete the required handshake for {currentStep.name.toUpperCase()}.</p>
                        </div>
                        <div className="w-full px-4">
                          <input 
                            type="text"
                            value={
                              currentStep.id === 'ai_training' ? formData.brainFocus :
                              currentStep.id === 'whatsapp_connect' ? formData.whatsappNumber :
                              currentStep.id === 'voice_connect' ? formData.voiceProvider :
                              currentStep.id === 'team_invite' ? formData.teamEmails : ''
                            }
                            onChange={(e) => {
                              const val = e.target.value;
                              if (currentStep.id === 'ai_training') setFormData({...formData, brainFocus: val});
                              if (currentStep.id === 'whatsapp_connect') setFormData({...formData, whatsappNumber: val});
                              if (currentStep.id === 'voice_connect') setFormData({...formData, voiceProvider: val});
                              if (currentStep.id === 'team_invite') setFormData({...formData, teamEmails: val});
                            }}
                            className="w-full px-8 py-6 bg-white border border-slate-200 rounded-[1.5rem] outline-none text-base font-bold shadow-sm focus:ring-4 focus:ring-[#5143E1]/5 transition-all text-center"
                            placeholder={currentStep.id === 'ai_training' ? "e.g. Sales Automation" : `Enter ${currentStep.name}...`}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FINAL ACTIVATE STEP - MATCHING SCREENSHOT */}
                  {currentStep.id === 'complete' && (
                    <div className="py-12 text-center animate-in zoom-in-95 duration-700 flex-1 flex flex-col items-center justify-center space-y-10">
                      <div className="w-40 h-40 bg-[#E9F7F0] rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Zap size={80} className="text-[#10B981]" fill="#10B981" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-5xl font-black text-[#0B1530] uppercase tracking-tighter leading-none">PROTOCOL VERIFIED</h3>
                        <p className="text-2xl text-[#9BA3B5] font-medium max-w-xl mx-auto italic leading-relaxed">Identity handshake complete. Deploy your digital fleet now.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* FOOTER ACTION BAR */}
              <div className="px-16 py-10 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
                <button 
                  onClick={handleBack}
                  disabled={currentStepIndex === 0}
                  className="flex items-center gap-3 text-[14px] font-black uppercase tracking-[0.4em] text-[#9BA3B5] hover:text-[#0B1530] disabled:opacity-0 transition-all"
                >
                  <ArrowLeft size={24} strokeWidth={3} />
                  REVERSE
                </button>
                
                <button 
                  onClick={handleNext}
                  disabled={!canAdvance() || isLoading}
                  className={`relative flex items-center justify-between gap-10 pl-14 pr-8 py-6 rounded-full font-black text-[16px] uppercase tracking-[0.4em] transition-all overflow-hidden ${
                    canAdvance() 
                      ? 'bg-[#E5E9F0] text-[#0B1530] shadow-xl hover:bg-[#D8DDE4] active:scale-95' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <span className="flex-1 text-center font-black">
                    {isLoading ? 'INITIATING...' : currentStep.id === 'complete' ? 'DEPLOY' : 'ADVANCE'}
                  </span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${canAdvance() ? 'bg-white/60 text-[#0B1530] shadow-sm' : 'bg-slate-200 text-slate-400'}`}>
                    {isLoading ? <Loader2 size={24} className="animate-spin" /> : <ArrowRight size={28} strokeWidth={3} />}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingFlow;
