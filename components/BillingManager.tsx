import React, { useState } from 'react';
import { 
  CreditCard, Zap, Check, ShieldCheck, Crown, Coins, Loader2, 
  RefreshCw, Sparkles, Heart, FileText, Download, ExternalLink, 
  ShoppingCart, ChevronRight, X, Building2, BadgeCheck, 
  Info, AlertCircle, ShieldAlert, DollarSign, ArrowRight, Trash2,
  Ticket, Landmark, ReceiptText, Printer, Wallet, Clock, Lock,
  MessageSquare, Mail, Phone, PhoneCall, Globe, Target, CheckCircle2
} from 'lucide-react';
import { PlanTier, SubscriptionStatus, GSTBreakdown, CartItem, Payment } from '../types';

// Razorpay Configuration
const RZP_KEY_ID = 'rzp_live_S7OpKckU34utHp';

const PLAN_DETAILS = [
  {
    id: PlanTier.FREE,
    name: 'Free Tier',
    price: 0,
    setupFee: 100,
    paymentLink: 'https://rzp.io/rzp/DMn3Ls7A',
    validity: '14 days',
    credits: 200,
    dailyLimit: 20,
    triggers: 1,
    automation: 'Disabled',
    features: ['Access dashboard & UI', 'View workflows (read-only)', 'Upload brand details', '1 Outgoing Trigger'],
    color: 'border-slate-200',
    accent: 'bg-slate-500',
    textColor: 'text-slate-900',
    btnText: 'Activate Trial'
  },
  {
    id: PlanTier.STARTER,
    name: 'Starter Plan',
    price: 2500,
    setupFee: 10000,
    paymentLink: 'https://rzp.io/rzp/5tgzoh2',
    validity: '30 days',
    credits: 1500,
    dailyLimit: 150,
    triggers: 3,
    automation: 'Basic',
    features: ['WhatsApp + Email automation', 'Campaign builder', 'Unified inbox', '3 Outgoing Triggers'],
    color: 'border-blue-200',
    accent: 'bg-blue-600',
    textColor: 'text-slate-900',
    btnText: 'Buy Starter'
  },
  {
    id: PlanTier.GROWTH,
    name: 'Growth Plan',
    price: 6500,
    setupFee: 25000,
    paymentLink: 'https://rzp.io/rzp/7eCx0RD8',
    validity: '30 days',
    credits: 5000,
    dailyLimit: 500,
    triggers: 10,
    automation: 'Advanced',
    features: ['WhatsApp + Email + SMS', 'AI image & video', 'Advanced workflows', '10 Outgoing Triggers'],
    color: 'border-orange-200',
    accent: 'bg-orange-500',
    textColor: 'text-slate-900',
    btnText: 'Upgrade to Growth',
    popular: true
  },
  {
    id: PlanTier.PRO,
    name: 'Professional Plan',
    price: 15000,
    setupFee: 35000,
    paymentLink: 'https://rzp.io/rzp/wf3lxmh',
    validity: '30 days',
    credits: 15000,
    dailyLimit: 2000,
    triggers: 25,
    automation: 'Enterprise',
    features: ['AI Voice Calls', 'SLA & audit logs', 'Role-based access', '25 Outgoing Triggers'],
    color: 'border-red-200',
    accent: 'bg-red-600',
    textColor: 'text-slate-900',
    btnText: 'Go Professional'
  },
  {
    id: PlanTier.ENTERPRISE,
    name: 'Enterprise Plan',
    price: 35500,
    setupFee: 50000,
    paymentLink: 'https://rzp.io/rzp/cGGRobq',
    validity: 'Custom',
    credits: 40000,
    dailyLimit: 5000,
    triggers: 999,
    automation: 'Unlimited',
    features: ['Dedicated pipelines', 'Custom AI cost rules', 'n8n private workflows', 'Unlimited Outgoing'],
    color: 'border-purple-200',
    accent: 'bg-purple-600',
    textColor: 'text-slate-900',
    btnText: 'Authorize Enterprise'
  }
];

const CREDIT_COSTS = [
  { action: 'Trigger Hit', cost: 1, icon: Zap },
  { action: 'Lead Scoring', cost: 2, icon: Target },
  { action: 'AI Message', cost: 3, icon: MessageSquare },
  { action: 'AI Image Generation', cost: 5, icon: Sparkles },
  { action: 'AI Video Generation', cost: '10+', icon: Globe },
  { action: 'AI Voice Call', cost: 15, icon: PhoneCall },
];

const BillingManager: React.FC = () => {
  const [activePlan, setActivePlan] = useState<PlanTier>(PlanTier.STARTER);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  // Load Razorpay Script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePurchase = (plan: typeof PLAN_DETAILS[0]) => {
    // Open the direct link for setup fees + recurring subscription
    window.open(plan.paymentLink, '_blank');
  };

  const handleRecharge = async (amount: number = 1000) => {
    setIsProcessing(true);
    const res = await loadRazorpay();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessing(false);
      return;
    }

    const options = {
      key: RZP_KEY_ID,
      amount: amount * 100, // in paise
      currency: 'INR',
      name: 'AI Credit Recharge',
      description: 'Injection of AI Pulse Fuel',
      image: 'https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png',
      handler: function (response: any) {
        setPaymentStatus('success');
        setIsProcessing(false);
        console.log('Recharge Handshake Success:', response);
      },
      prefill: {
        name: 'Digital Employee Admin',
        email: 'billing@digitalemployee.me',
      },
      theme: {
        color: '#5143E1'
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const CircularMeter = ({ used, total, label, sublabel, colorClass }: any) => {
    const percentage = Math.min((used / total) * 100, 100);
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex flex-col items-center">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
          <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className={colorClass} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className="text-2xl font-black text-slate-900">{used.toLocaleString()}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">/ {total.toLocaleString()}</span>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{label}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{sublabel}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      {/* SUCCESS OVERLAY */}
      {paymentStatus === 'success' && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl">
           <div className="max-w-md w-full bg-white rounded-[4rem] p-16 text-center space-y-8 shadow-2xl animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[3rem] mx-auto flex items-center justify-center shadow-inner">
                 <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              <div className="space-y-2">
                 <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Ledger Authorized</h2>
                 <p className="text-slate-500 font-medium italic">"The payment handshake was successful. Your AI fuel reserves have been replenished."</p>
              </div>
              <button 
                onClick={() => setPaymentStatus('idle')}
                className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95"
              >
                Back to Cockpit
              </button>
           </div>
        </div>
      )}

      {/* SECTION 1: MY SUBSCRIPTION (DASHBOARD) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CURRENT PLAN CARD */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-8 relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Protocol</h3>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-black text-slate-900 uppercase tracking-tight">{activePlan}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={12} /> 22 Days remaining until cycle reset
              </p>
            </div>
            <button 
              onClick={() => {
                const growthSection = document.getElementById('pricing-grid');
                growthSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Scale Workforce Tier <ArrowRight size={14} />
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50" />
        </div>

        {/* USAGE METERS */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm flex flex-col md:flex-row items-center justify-around gap-8">
          <CircularMeter used={1240} total={5000} label="AI Credits Remaining" sublabel="Monthly Fuel Pulse" colorClass="text-indigo-600" />
          <div className="w-px h-32 bg-slate-100 hidden md:block" />
          <CircularMeter used={18} total={150} label="Daily Pulse Usage" sublabel="24h Execution Limit" colorClass="text-emerald-500" />
          <div className="flex flex-col gap-4 w-full md:w-auto">
             <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Triggers Used</p>
                   <span className="text-xs font-black text-slate-900">1 / 5</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-600 w-[20%] rounded-full" />
                </div>
                <button 
                  onClick={() => handleRecharge(2500)}
                  disabled={isProcessing}
                  className="w-full py-2.5 bg-white border border-slate-200 text-[9px] font-black text-indigo-600 uppercase tracking-widest rounded-xl hover:bg-indigo-50 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {isProcessing ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />} Instant Pulse Recharge
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PRICING GRID (UPGRADES) */}
      <div id="pricing-grid" className="space-y-12 pt-12 border-t border-slate-100 scroll-mt-24">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Authorize Workforce Expansion</h2>
          <p className="text-slate-500 text-lg font-medium italic">High-performance protocols for scaling your autonomous sales fleet.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PLAN_DETAILS.map((plan) => (
            <div key={plan.id} className={`bg-white border ${plan.color} rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm relative group hover:shadow-2xl transition-all duration-500 ${plan.popular ? 'ring-2 ring-orange-500 ring-offset-4' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">Most Effective</div>
              )}
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">{plan.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">₹{plan.price.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">/ month</span>
                  </div>
                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 mt-2">
                     <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">One-time Set-Up: ₹{plan.setupFee.toLocaleString()}</p>
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{plan.validity} VALIDITY</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl space-y-3">
                   <div className="flex items-center gap-2 text-indigo-600">
                      <Zap size={14} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{plan.credits.toLocaleString()} AI CREDITS</span>
                   </div>
                   <div className="flex items-center gap-2 text-slate-400">
                      <Clock size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{plan.dailyLimit} DAILY LIMIT</span>
                   </div>
                   <div className="flex items-center gap-2 text-slate-400">
                      <Globe size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{plan.triggers} OUTGOING</span>
                   </div>
                </div>

                <div className="space-y-3">
                   {plan.features.map((f, i) => (
                     <div key={i} className="flex items-start gap-2">
                        <Check size={12} className="text-emerald-500 shrink-0 mt-0.5" strokeWidth={4} />
                        <span className="text-[10px] font-bold text-slate-500 leading-tight">{f}</span>
                     </div>
                   ))}
                </div>
              </div>

              <button 
                onClick={() => handlePurchase(plan)}
                className={`w-full mt-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${plan.accent} text-white hover:brightness-110 shadow-current/10`}
              >
                {plan.btnText} <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: CREDIT USAGE FOOTER */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="relative z-10 flex items-center gap-8">
            <div className="w-20 h-20 bg-white/10 rounded-[2.5rem] border border-white/20 flex items-center justify-center backdrop-blur-md">
               <Coins size={40} className="text-indigo-400" />
            </div>
            <div className="space-y-2">
               <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                 How AI Credits Work
                 <button onClick={() => setShowInfoModal(true)} className="p-1 text-indigo-400 hover:text-white transition-colors"><Info size={20} /></button>
               </h3>
               <p className="text-slate-400 text-sm font-medium italic opacity-80">Credits are deducted **only on successful execution**. Signals return to ledger if endpoints fail.</p>
            </div>
         </div>
         <div className="relative z-10 flex gap-4">
            <button 
              onClick={() => handleRecharge(1000)}
              disabled={isProcessing}
              className="px-10 py-5 bg-white text-slate-900 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />} Recharge Wallet
            </button>
            <button 
              onClick={() => {
                const growthSection = document.getElementById('pricing-grid');
                growthSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:brightness-110 transition-all"
            >
              Upgrade Workforce
            </button>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      </div>

      {/* CREDIT INFO MODAL */}
      {showInfoModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowInfoModal(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
             <header className="px-12 py-10 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                      <Coins size={24} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight">How AI Credits Work</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Consumption Handshake Protocol</p>
                   </div>
                </div>
                <button onClick={() => setShowInfoModal(false)} className="p-3 bg-slate-100 text-slate-400 rounded-2xl hover:text-slate-900 transition-all">
                   <X size={24} />
                </button>
             </header>

             <main className="p-12 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 gap-3">
                   {CREDIT_COSTS.map((c, i) => (
                     <div key={i} className="p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex items-center justify-between group hover:border-indigo-300 transition-all">
                        <div className="flex items-center gap-4">
                           <div className="p-2 bg-white rounded-xl shadow-sm group-hover:text-indigo-600 transition-colors">
                              <c.icon size={20} />
                           </div>
                           <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{c.action}</span>
                        </div>
                        <span className="text-lg font-black text-slate-900">{c.cost} Cr</span>
                     </div>
                   ))}
                </div>

                <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl flex gap-4">
                   <Info size={24} className="text-indigo-600 shrink-0" />
                   <p className="text-[11px] text-indigo-700 font-bold leading-relaxed italic">
                      Execution automatically halts if daily limits or credit balance are exceeded. All recharges are processed securely via Razorpay Gateway.
                   </p>
                </div>
             </main>

             <footer className="p-10 bg-slate-50 border-t border-slate-100 flex gap-4 shrink-0">
                <button 
                  onClick={() => setShowInfoModal(false)}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                >
                  Handshake Acknowledged
                </button>
             </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingManager;