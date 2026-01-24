
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

interface BillingManagerProps {
  onActivate?: (tier: PlanTier) => void;
}

const PLAN_DETAILS = [
  {
    id: PlanTier.FREE,
    name: 'FREE TIER',
    price: 0,
    setupFee: 100,
    paymentLink: 'https://rzp.io/rzp/DMn3Ls7A',
    validity: '14 DAYS VALIDITY',
    credits: 200,
    dailyLimit: 20,
    triggers: 1,
    automation: 'Disabled',
    features: ['Access dashboard & UI', 'View workflows (read-only)', 'Upload brand details', '1 Outgoing Trigger'],
    color: 'border-slate-100',
    accent: 'bg-slate-500',
    textColor: 'text-slate-900',
    btnText: 'Activate Trial'
  },
  {
    id: PlanTier.STARTER,
    name: 'STARTER PLAN',
    price: 2500,
    setupFee: 10000,
    paymentLink: 'https://rzp.io/rzp/5tgzoh2',
    validity: '30 DAYS VALIDITY',
    credits: 1500,
    dailyLimit: 150,
    triggers: 3,
    automation: 'Basic',
    features: ['WhatsApp + Email automation', 'Campaign builder', 'Unified inbox', '3 Outgoing Triggers'],
    color: 'border-blue-100',
    accent: 'bg-blue-600',
    textColor: 'text-slate-900',
    btnText: 'Buy Starter'
  },
  {
    id: PlanTier.GROWTH,
    name: 'GROWTH PLAN',
    price: 6500,
    setupFee: 25000,
    paymentLink: 'https://rzp.io/rzp/7eCx0RD8',
    validity: '30 DAYS VALIDITY',
    credits: 5000,
    dailyLimit: 500,
    triggers: 10,
    automation: 'Advanced',
    features: ['WhatsApp + Email + SMS', 'AI image & video', 'Advanced workflows', '10 Outgoing Triggers'],
    color: 'border-[#F97316]',
    accent: 'bg-[#F97316]',
    textColor: 'text-slate-900',
    btnText: 'Upgrade to Growth',
    popular: true
  },
  {
    id: PlanTier.PRO,
    name: 'PROFESSIONAL PLAN',
    price: 15000,
    setupFee: 35000,
    paymentLink: 'https://rzp.io/rzp/wf3lxmh',
    validity: '30 DAYS VALIDITY',
    credits: 15000,
    dailyLimit: 2000,
    triggers: 25,
    automation: 'Enterprise',
    features: ['AI Voice Calls', 'SLA & audit logs', 'Role-based access', '25 Outgoing Triggers'],
    color: 'border-red-100',
    accent: 'bg-red-600',
    textColor: 'text-slate-900',
    btnText: 'Go Professional'
  },
  {
    id: PlanTier.ENTERPRISE,
    name: 'ENTERPRISE PLAN',
    price: 35500,
    setupFee: 50000,
    paymentLink: 'https://rzp.io/rzp/cGGRobq',
    validity: 'CUSTOM VALIDITY',
    credits: 40000,
    dailyLimit: 5000,
    triggers: 999,
    automation: 'Unlimited',
    features: ['Dedicated pipelines', 'Custom AI cost rules', 'n8n private workflows', 'Unlimited Outgoing'],
    color: 'border-purple-100',
    accent: 'bg-purple-600',
    textColor: 'text-slate-900',
    btnText: 'Authorize Enterprise'
  }
];

const BillingManager: React.FC<BillingManagerProps> = ({ onActivate }) => {
  const [activePlan] = useState<PlanTier>(PlanTier.FREE);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  const handlePurchase = (plan: typeof PLAN_DETAILS[0]) => {
    if (plan.id === PlanTier.STARTER || plan.id === PlanTier.FREE) {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentStatus('success');
            onActivate?.(plan.id);
        }, 1500);
    } else {
        window.open(plan.paymentLink, '_blank');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-20 animate-in fade-in duration-500 pb-32">
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

      {/* PRICING GRID HEADER MATCHING SCREENSHOT */}
      <div id="pricing-grid" className="text-center space-y-8 pt-12">
        <h2 className="text-[90px] font-black text-[#0B1530] uppercase tracking-tight leading-none mb-4">AUTHORIZE WORKFORCE EXPANSION</h2>
        <p className="text-[#9BA3B5] text-3xl font-medium italic leading-relaxed">High-performance protocols for scaling your autonomous sales fleet.</p>
      </div>

      {/* PLAN GRID MATCHING SCREENSHOT */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 px-4">
        {PLAN_DETAILS.map((plan) => (
          <div key={plan.id} className={`bg-[#F8FAFC] border-2 ${plan.popular ? 'border-[#F97316] ring-[12px] ring-orange-500/5' : 'border-transparent'} rounded-[5rem] flex flex-col shadow-sm relative group hover:shadow-2xl transition-all duration-500 min-h-[850px]`}>
            {plan.popular && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#F97316] text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl z-20 whitespace-nowrap">
                Most Effective
              </div>
            )}
            
            <div className="p-12 flex flex-col flex-1">
               <div className="mb-12 space-y-6">
                  <h4 className="text-[13px] font-black uppercase tracking-[0.3em] text-[#9BA3B5] mb-2">{plan.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-7xl font-black text-[#0B1530] tracking-tighter">₹{plan.price.toLocaleString()}</span>
                    <span className="text-[11px] font-black text-[#9BA3B5] uppercase tracking-widest ml-1">/ month</span>
                  </div>
                  
                  <div className="inline-block px-8 py-5 bg-[#E0E7FF]/40 border border-[#C7D2FE]/60 rounded-3xl mt-4">
                    <p className="text-[11px] font-black text-[#5143E1] uppercase tracking-[0.2em]">One-time set-up: ₹{plan.setupFee.toLocaleString()}</p>
                  </div>
                  
                  <p className="text-[11px] font-black text-[#9BA3B5] uppercase tracking-[0.3em] pt-4">{plan.validity}</p>
               </div>

               {/* FEATURE WHITE BOX AS SEEN IN SCREENSHOT */}
               <div className="bg-white rounded-[4rem] p-10 flex-1 flex flex-col gap-10 shadow-inner border border-slate-100">
                  <div className="flex flex-col gap-8">
                     <div className="flex items-center gap-4 text-[#5143E1]">
                        <Zap size={20} fill="currentColor" />
                        <div className="flex flex-col">
                           <span className="text-xl font-black leading-tight">{plan.credits.toLocaleString()} AI</span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-[#9BA3B5]">Credits</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 text-slate-400">
                        <Clock size={20} />
                        <div className="flex flex-col">
                           <span className="text-xl font-black leading-tight text-slate-700">{plan.dailyLimit}</span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-[#9BA3B5]">Daily Limit</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 text-slate-400">
                        <Globe size={20} />
                        <div className="flex flex-col">
                           <span className="text-xl font-black leading-tight text-slate-700">{plan.triggers}</span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-[#9BA3B5]">Outgoing</span>
                        </div>
                     </div>
                  </div>

                  <div className="h-px bg-slate-50" />

                  <div className="space-y-5">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex items-center justify-center w-3 h-3 rounded-full bg-emerald-50 text-emerald-500">
                          <Check size={8} strokeWidth={6} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 leading-snug uppercase tracking-tight">{f}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <button 
                onClick={() => handlePurchase(plan)}
                disabled={isProcessing}
                className={`w-full mt-10 py-7 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.3em] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 ${plan.popular ? 'bg-[#0F111A] text-white hover:bg-slate-800' : 'bg-white text-[#0B1530] hover:bg-slate-50 border border-slate-200'} disabled:opacity-50`}
              >
                {isProcessing ? <Loader2 size={16} className="animate-spin" /> : plan.btnText}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RECHARGE FOOTER MATCHING SCREENSHOT STYLE */}
      <div className="bg-slate-900 rounded-[5rem] p-16 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 mx-4">
         <div className="relative z-10 flex items-center gap-10">
            <div className="w-24 h-24 bg-white/10 rounded-[3rem] border border-white/20 flex items-center justify-center backdrop-blur-md">
               <Coins size={48} className="text-indigo-400" />
            </div>
            <div className="space-y-2">
               <h3 className="text-4xl font-black uppercase tracking-tight flex items-center gap-6">
                 HOW AI CREDITS WORK
                 <button className="p-2 text-indigo-400 hover:text-white transition-colors"><Info size={28} /></button>
               </h3>
               <p className="text-slate-400 text-xl font-medium italic opacity-80 italic">Credits are deducted **only on successful execution**. Signals return to ledger if endpoints fail.</p>
            </div>
         </div>
         <div className="relative z-10 flex gap-6">
            <button 
              className="px-12 py-7 bg-white text-slate-900 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex items-center gap-3"
            >
              <CreditCard size={20} /> RECHARGE WALLET
            </button>
            <button 
              className="px-12 py-7 bg-[#5143E1] text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:brightness-110 transition-all"
            >
              UPGRADE WORKFORCE
            </button>
         </div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
      </div>
    </div>
  );
};

export default BillingManager;
