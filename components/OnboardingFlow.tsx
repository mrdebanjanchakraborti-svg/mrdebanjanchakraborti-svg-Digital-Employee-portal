import React, { useState } from 'react';
import { 
  Building2, BrainCircuit, MessageCircle, Phone, 
  Users, CreditCard, CheckCircle2, ArrowRight, ArrowLeft,
  Sparkles, Loader2, Zap
} from 'lucide-react';
import { generateAITrainingSuggestions } from '../services/geminiService';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const steps = [
  { id: 'company_setup', name: 'COMPANY', step: 'STEP 01', icon: Building2, desc: 'DEFINE YOUR BUSINESS ENTITY' },
  { id: 'ai_training', name: 'AI BRAIN', step: 'STEP 02', icon: BrainCircuit, desc: 'ARCHITECT YOUR INTELLIGENCE' },
  { id: 'whatsapp_connect', name: 'WHATSAPP', step: 'STEP 03', icon: MessageCircle, desc: 'OMNICHANNEL HANDSHAKE' },
  { id: 'voice_connect', name: 'VOICE', step: 'STEP 04', icon: Phone, desc: 'VOICE PULSE CONFIGURATION' },
  { id: 'team_invite', name: 'TEAM', step: 'STEP 05', icon: Users, desc: 'WORKSPACE COLLABORATION' },
  { id: 'plan_selection', name: 'SUBSCRIPTION', step: 'STEP 06', icon: CreditCard, desc: 'WORKFORCE PLAN SELECTION' },
  { id: 'complete', name: 'ACTIVATE', step: 'STEP 07', icon: Zap, desc: 'DEPLOY DIGITAL EMPLOYEE' }
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [businessType, setBusinessType] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  const currentStep = steps[currentStepIndex];

  const handleNext = async () => {
    if (currentStep.id === 'ai_training' && !aiSuggestions && businessType) {
      setIsLoading(true);
      const suggestions = await generateAITrainingSuggestions(businessType);
      setAiSuggestions(suggestions);
      setIsLoading(false);
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* HEADER MATCHING SCREENSHOT WITH ENHANCED LOGO SCALING - REMOVED INNER BACKGROUND */}
      <header className="bg-white border-b border-slate-100 px-16 py-12 shrink-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo area - No background, maximum fit */}
            <div className="flex items-center justify-center transition-all duration-500 hover:scale-105 group">
              <img 
                src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" 
                alt="Logo" 
                className="h-32 w-auto object-contain cursor-pointer drop-shadow-2xl"
              />
            </div>
          </div>
          <div className="flex items-center gap-12">
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Setup Progress</span>
              <span className="text-xl font-black text-slate-900 mt-1.5">{Math.round(((currentStepIndex + 1) / steps.length) * 100)}% Complete</span>
            </div>
            <div className="w-72 h-3.5 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/50 p-1">
              <div 
                className="h-full bg-[#5143E1] transition-all duration-1000 ease-out shadow-lg shadow-indigo-100 rounded-full" 
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-12 lg:p-24">
        <div className="max-w-7xl mx-auto flex gap-24">
          {/* Vertical Stepper Sidebar */}
          <div className="hidden lg:flex flex-col w-64 space-y-12 shrink-0">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStepIndex;
              const isCompleted = idx < currentStepIndex;
              return (
                <div key={step.id} className="flex items-center gap-6 group">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    isActive ? 'bg-[#5143E1] border-[#5143E1] text-white shadow-2xl shadow-indigo-200 scale-110' :
                    isCompleted ? 'bg-emerald-50 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-300'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={28} /> : <Icon size={28} />}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[12px] font-black uppercase tracking-widest ${isActive ? 'text-[#5143E1]' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {step.name}
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest opacity-60">{step.step}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Content Card - Refined Layout */}
          <div className="flex-1">
            <div className="bg-white border border-slate-100 rounded-[5rem] shadow-[0_80px_200px_rgba(0,0,0,0.05)] overflow-hidden min-h-[750px] flex flex-col">
              <div className="p-24 flex-1">
                <div className="mb-24">
                  <h2 className="text-8xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-none">{currentStep.desc}</h2>
                  <p className="text-slate-400 text-2xl font-medium leading-relaxed italic opacity-80">Configure the intelligence parameters for your workspace.</p>
                </div>

                {currentStep.id === 'company_setup' && (
                  <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="grid grid-cols-2 gap-16">
                      <div className="space-y-5">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest ml-1">COMPANY NAME</label>
                        <input type="text" className="w-full px-12 py-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500/20 outline-none transition-all font-bold text-xl shadow-inner" placeholder="Acme Innovations" />
                      </div>
                      <div className="space-y-5">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest ml-1">INDUSTRY FOCUS</label>
                        <input 
                          type="text" 
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="w-full px-12 py-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500/20 outline-none transition-all font-bold text-xl shadow-inner" 
                          placeholder="SaaS, Real Estate..." 
                        />
                      </div>
                    </div>
                    <div className="space-y-8">
                      <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest ml-1">PRIMARY GROWTH GOAL</label>
                      <div className="grid grid-cols-3 gap-8">
                        {['LEAD GENERATION', 'SALES HANDOFF', 'CLIENT RETENTION'].map(goal => (
                          <button key={goal} className="p-12 border-2 border-slate-100 rounded-[3.5rem] text-sm font-black uppercase tracking-widest text-slate-600 hover:border-[#5143E1] hover:text-[#5143E1] hover:bg-indigo-50 transition-all text-center bg-slate-50/20 shadow-sm active:scale-95 group">
                            {goal}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep.id === 'ai_training' && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center py-40 text-slate-500">
                        <div className="relative">
                          <Loader2 className="animate-spin text-[#5143E1]" size={100} strokeWidth={3} />
                          <Sparkles className="absolute -top-5 -right-5 text-orange-400 animate-pulse" size={40} />
                        </div>
                        <p className="font-black text-slate-900 mt-16 text-4xl uppercase tracking-tighter">Consulting Strategic Brain...</p>
                        <p className="text-2xl text-slate-400 mt-4 font-medium italic">Analyzing sector DNA...</p>
                      </div>
                    ) : aiSuggestions ? (
                      <div className="space-y-16">
                        <div className="p-14 bg-indigo-50/50 border border-indigo-100 rounded-[5rem] flex gap-10 items-start shadow-inner">
                          <Sparkles className="text-[#5143E1] shrink-0 mt-1" size={50} />
                          <div>
                            <p className="text-3xl font-black text-indigo-900 uppercase tracking-tighter mb-4">INTELLIGENCE SUGGESTED</p>
                            <p className="text-xl text-indigo-600/80 leading-relaxed font-medium italic">"High-conversion DNA mapped. Deploy these protocols into your workforce engine."</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-12">
                          <div className="p-14 border border-slate-100 rounded-[5rem] bg-slate-50/30 space-y-10 shadow-inner">
                            <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.25em]">Pain Points Identified</h4>
                            <div className="flex flex-wrap gap-5">
                              {aiSuggestions.pain_points.map((point: string, i: number) => (
                                <span key={i} className="px-8 py-4 bg-white border border-slate-200 rounded-[2rem] text-xs font-black uppercase tracking-tight text-slate-700 shadow-sm hover:border-[#5143E1] transition-all cursor-pointer">{point}</span>
                              ))}
                            </div>
                          </div>
                          <div className="p-14 border border-slate-100 rounded-[5rem] bg-slate-50/30 space-y-10 shadow-inner">
                            <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.25em]">Suggested FAQ Protocols</h4>
                            <div className="space-y-6">
                              {aiSuggestions.faqs.slice(0, 2).map((faq: any, i: number) => (
                                <div key={i} className="p-8 bg-white rounded-[3rem] border border-slate-200 shadow-sm text-xs hover:border-[#5143E1] transition-all cursor-pointer group/item">
                                  <p className="font-black text-slate-900 mb-3 uppercase tracking-tighter">Q: {faq.question}</p>
                                  <p className="text-slate-500 font-medium italic leading-relaxed">A: {faq.answer}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-40 text-center border-4 border-dashed border-slate-100 rounded-[6rem] flex flex-col items-center hover:border-indigo-100 transition-colors">
                        <div className="w-32 h-32 bg-indigo-50 rounded-[4rem] flex items-center justify-center text-[#5143E1] mb-14 shadow-inner group-hover:scale-110 transition-transform">
                          <BrainCircuit size={72} />
                        </div>
                        <h3 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Automated Training Handshake</h3>
                        <p className="text-2xl text-slate-500 max-w-xl mx-auto font-medium italic leading-relaxed">
                          Let our AI Consultant suggest the core knowledge DNA for your digital employees.
                        </p>
                        <button onClick={handleNext} className="mt-16 px-16 py-8 bg-[#5143E1] text-white font-black text-sm uppercase tracking-[0.3em] rounded-[3rem] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-95">
                           IDENTIFY BEST PRACTICES
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {currentStepIndex > 1 && (
                  <div className="py-48 text-center animate-in zoom-in-95 duration-700">
                    <div className="w-48 h-48 bg-slate-50 border border-slate-100 rounded-[5rem] flex items-center justify-center mx-auto mb-16 text-slate-200 shadow-inner group-hover:scale-110 transition-transform">
                      {currentStep.icon && <currentStep.icon size={100} />}
                    </div>
                    <h3 className="text-6xl font-black text-slate-900 mb-8 uppercase tracking-tighter">CONFIGURE {currentStep.name}</h3>
                    <p className="text-3xl text-slate-400 font-medium max-w-2xl mx-auto italic leading-relaxed">Initialize the connectivity parameters for this workforce module.</p>
                  </div>
                )}
              </div>

              <div className="p-20 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between shrink-0">
                <button 
                  onClick={handleBack}
                  disabled={currentStepIndex === 0}
                  className="flex items-center gap-5 text-[12px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all"
                >
                  <ArrowLeft size={32} />
                  REVERSE PROTOCOL
                </button>
                <button 
                  onClick={handleNext}
                  className="flex items-center gap-6 px-20 py-8 bg-slate-900 text-white font-black text-[12px] uppercase tracking-[0.5em] rounded-[3rem] hover:bg-[#5143E1] transition-all shadow-2xl shadow-slate-200 active:scale-95 group/btn"
                >
                  {currentStep.id === 'complete' ? 'DEPLOY WORKFORCE' : 'ADVANCE SEQUENCE'}
                  <ArrowRight size={32} className="group-hover/btn:translate-x-2 transition-transform" />
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