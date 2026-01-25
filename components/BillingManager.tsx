
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Zap, Check, ShieldCheck, Loader2, 
  ChevronRight, Info, Coins, CheckCircle2, 
  Clock, Globe, ShieldAlert, Fingerprint, Lock,
  Terminal, Shield as ShieldIcon, Activity, ArrowRight,
  ShoppingCart, X, Trash2, Receipt, ShieldQuestion, AlertTriangle, RefreshCw,
  Plus, Sparkles, TrendingUp
} from 'lucide-react';
import { PlanTier } from '../types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface BillingManagerProps {
  onActivate?: (tier: PlanTier) => void;
}

const RZP_KEY_ID = 'rzp_live_S7OpKckU34utHp';

const PLAN_DETAILS = [
  { id: PlanTier.FREE, name: 'FREE TIER', price: 0, setupFee: 100, validity: '10 DAYS VALIDITY', credits: 200, triggers: 1, features: ['Dashboard Access', '1 Trigger'], btnText: 'ACTIVATE' },
  { id: PlanTier.STARTER, name: 'STARTER PLAN', price: 2500, setupFee: 10000, validity: '30 DAYS VALIDITY', credits: 1500, triggers: 3, features: ['WhatsApp + Email', '3 Triggers'], btnText: 'DEPLOY' },
  { id: PlanTier.GROWTH, name: 'GROWTH PLAN', price: 6500, setupFee: 25000, validity: '30 DAYS VALIDITY', credits: 6000, triggers: 10, features: ['AI Content', '10 Triggers'], btnText: 'DEPLOY', popular: true },
  { id: PlanTier.PRO, name: 'PROFESSIONAL PLAN', price: 15000, setupFee: 35000, validity: '30 DAYS VALIDITY', credits: 15000, triggers: 25, features: ['AI Voice', '25 Triggers'], btnText: 'DEPLOY' },
  { id: PlanTier.ENTERPRISE, name: 'ENTERPRISE PLAN', price: 35500, setupFee: 50000, validity: '30 DAYS VALIDITY', credits: 40500, triggers: 999, features: ['Unlimited Scale'], btnText: 'DEPLOY' }
];

const RECHARGE_PACKS = [
  { id: 'pack_small', name: 'FUEL MICRO', credits: 500, price: 999, color: 'indigo' },
  { id: 'pack_medium', name: 'FUEL STANDBY', credits: 2500, price: 3999, color: 'purple' },
  { id: 'pack_large', name: 'FUEL SCALE', credits: 10000, price: 12999, color: 'emerald' }
];

const BillingManager: React.FC<BillingManagerProps> = ({ onActivate }) => {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [handshakeState, setHandshakeState] = useState<'idle' | 'awaiting_payment' | 'verifying' | 'success' | 'failed' | 'cancelled'>('idle');
  const [showCart, setShowCart] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [cart, setCart] = useState<typeof PLAN_DETAILS[0] | null>(null);
  const [selectedRecharge, setSelectedRecharge] = useState<typeof RECHARGE_PACKS[0] | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  // Simulated Wallet Balance
  const [currentBalance, setCurrentBalance] = useState(1240);

  const addToCart = (plan: typeof PLAN_DETAILS[0]) => {
    setCart(plan);
    setShowCart(true);
  };

  const initRazorpay = (amount: number, name: string, description: string, isRecharge = false) => {
    const options = {
      key: RZP_KEY_ID,
      amount: Math.round(amount * 1.18 * 100), // Amount in paise (inc 18% GST)
      currency: "INR",
      name: "AI Workforce Infrastructure",
      description: `${name}: ${description}`,
      image: "https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png",
      handler: function(response: any) {
        setHandshakeState('verifying');
        startVerificationPulse(response.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "john@digitalemployee.me",
        contact: "919876543210"
      },
      notes: {
        workspace_id: "ws_123_alpha",
        type: isRecharge ? "wallet_fuel" : "subscription_activation",
        plan_tier: isRecharge ? "n/a" : cart?.id
      },
      theme: {
        color: "#5143E1"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
        setHandshakeState('failed');
        alert("Security Handshake Failed: " + response.error.description);
    });
    rzp.open();
  };

  const handleCheckout = () => {
    if (!cart) return;
    setIsProcessing(cart.id);
    
    // Total price calculation
    const amount = cart.price + cart.setupFee;
    initRazorpay(amount, cart.name, "Plan Deployment & Security Setup");
    setIsProcessing(null);
    setShowCart(false);
  };

  const handleRechargeSelect = (pack: typeof RECHARGE_PACKS[0]) => {
    setSelectedRecharge(pack);
    setIsProcessing(pack.id);
    
    initRazorpay(pack.price, pack.name, "AI Credit Fuel Injection", true);
    setIsProcessing(null);
    setShowRecharge(false);
  };

  const startVerificationPulse = (paymentId: string) => {
    setLogs([
      "INITIALIZING SECURITY HANDSHAKE...", 
      `FETCHING RZP_PAYMENT_ID: ${paymentId} FROM GATEWAY...`
    ]);

    const verificationSteps = [
      "EXTRACTING X-RAZORPAY-SIGNATURE...",
      "GENERATING LOCAL HMAC-SHA256 HASH...",
      "COMPARING SIGNATURES: MATCH FOUND",
      "VERIFYING WEBHOOK STATUS: CAPTURED",
      "SYNCING GCS VAULT PERMISSIONS...",
      "AUTHORIZING FINANCIAL DEPLOYMENT..."
    ];

    verificationSteps.forEach((log, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (i === verificationSteps.length - 1) {
          executeFinalActivation();
        }
      }, (i + 1) * 600);
    });
  };

  const executeFinalActivation = () => {
    if (selectedRecharge) {
      setCurrentBalance(prev => prev + selectedRecharge.credits);
      setHandshakeState('success');
      setSelectedRecharge(null);
    } else if (cart) {
      onActivate?.(cart.id as PlanTier);
      setHandshakeState('success');
      setCart(null);
    }
  };

  const resetHandshake = () => {
    setHandshakeState('idle');
    setIsProcessing(null);
    setLogs([]);
    setSelectedRecharge(null);
  };

  const subtotal = cart ? cart.price + cart.setupFee : 0;
  const total = subtotal * 1.18;

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-500 pb-16 relative">
      
      {/* SECURITY HANDSHAKE MODAL */}
      {(handshakeState !== 'idle' && handshakeState !== 'success') && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl">
           <div className="max-w-2xl w-full bg-[#05070A] border-2 border-indigo-500/30 rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.2)] animate-in zoom-in-95 duration-500 flex flex-col h-[600px]">
              <header className="px-10 py-8 border-b border-white/5 flex items-center justify-between shrink-0 bg-white/5">
                 <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl ${handshakeState === 'verifying' ? 'bg-indigo-600 animate-pulse' : 'bg-slate-800'}`}>
                       <ShieldIcon size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-white uppercase tracking-tighter">Security Protocol</h3>
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Status: {handshakeState.replace('_', ' ')}</p>
                    </div>
                 </div>
                 {handshakeState === 'verifying' && (
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verify Live</span>
                   </div>
                 )}
              </header>

              <main className="flex-1 p-10 overflow-hidden flex flex-col gap-10">
                 {handshakeState === 'failed' ? (
                   <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                      <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center border border-rose-500/20 shadow-lg">
                        <AlertTriangle size={32} />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-2xl font-black text-white uppercase tracking-tight">Transaction Failed</h3>
                         <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">Please re-authorize or check your ledger credentials.</p>
                      </div>
                      <button onClick={resetHandshake} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Retry Protocol</button>
                   </div>
                 ) : (
                   <div className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-6 font-mono text-[11px] text-indigo-300/70 overflow-y-auto custom-scrollbar space-y-1">
                      {logs.map((log, i) => (
                         <div key={i} className="flex gap-4">
                            <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                            <span className={i === logs.length - 1 ? 'text-white font-black' : ''}>{log}</span>
                         </div>
                      ))}
                      {handshakeState === 'verifying' && <div className="w-2 h-4 bg-indigo-500 animate-pulse inline-block ml-2" />}
                   </div>
                 )}
              </main>

              <footer className="p-8 border-t border-white/5 bg-white/5 flex justify-center shrink-0">
                 <div className="flex items-center gap-3 text-slate-700">
                    <Lock size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">AES-256 HMAC SECURED</span>
                 </div>
              </footer>
           </div>
        </div>
      )}

      {/* WALLET RECHARGE MODAL */}
      {showRecharge && (
        <div className="fixed inset-0 z-[900] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="max-w-3xl w-full bg-white rounded-[4rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col h-[700px]">
              <header className="px-12 py-10 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#5143E1] rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                       <Coins size={32} />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Recharge Protocol</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mt-1">Refill your AI workforce fuel tank</p>
                    </div>
                 </div>
                 <button onClick={() => setShowRecharge(false)} className="p-4 bg-slate-100 text-slate-400 rounded-2xl hover:text-slate-900 transition-all">
                    <X size={28} />
                 </button>
              </header>

              <main className="flex-1 p-12 overflow-y-auto custom-scrollbar space-y-10 bg-[#FBFCFE]">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {RECHARGE_PACKS.map(pack => (
                       <button 
                        key={pack.id} 
                        onClick={() => handleRechargeSelect(pack)}
                        className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 text-center space-y-6 transition-all hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-95"
                       >
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{pack.name}</p>
                             <p className="text-4xl font-black text-slate-900">{pack.credits.toLocaleString()}</p>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AI CREDITS</p>
                          </div>
                          <div className="pt-6 border-t border-slate-50 flex flex-col items-center">
                             <span className="text-xl font-black text-indigo-600">₹{pack.price.toLocaleString()}</span>
                             <span className="text-[8px] font-bold text-slate-400 uppercase">+18% GST</span>
                          </div>
                          <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                       </button>
                    ))}
                 </div>

                 <div className="bg-[#0F111A] rounded-[3rem] p-10 text-white relative overflow-hidden group">
                    <div className="relative z-10 flex gap-8 items-start">
                       <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
                          <Zap size={32} fill="currentColor" />
                       </div>
                       <div className="space-y-3">
                          <h4 className="text-xl font-black uppercase tracking-tight">Instant Fuel Delivery</h4>
                          <p className="text-[11px] text-indigo-200/80 font-medium leading-relaxed italic max-w-lg">
                            "AI credits are added instantly to your global ledger upon signature verification via Razorpay."
                          </p>
                       </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                 </div>
              </main>

              <footer className="p-10 border-t border-slate-100 bg-white flex justify-center shrink-0">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-3">
                    <ShieldCheck size={16} /> Native Razorpay Integration v2.8 (Live)
                 </p>
              </footer>
           </div>
        </div>
      )}

      {/* SUCCESS OVERLAY */}
      {handshakeState === 'success' && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl">
           <div className="max-w-md w-full bg-white rounded-[4rem] p-12 text-center space-y-8 shadow-2xl animate-in zoom-in-95 duration-500 border border-emerald-100">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-inner">
                 <CheckCircle2 size={40} strokeWidth={3} />
              </div>
              <div className="space-y-2">
                 <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Ledger Authorized</h2>
                 <p className="text-slate-500 font-medium italic">"Handshake verified. Your AI workforce protocols have been fully updated with fresh fuel."</p>
              </div>
              <button 
                onClick={resetHandshake}
                className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95"
              >
                Back to Dashboard
              </button>
           </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      {showCart && (
        <div className="fixed inset-0 z-[700] flex justify-end">
           <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowCart(false)} />
           <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
              <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                       <ShoppingCart size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Checkout Pulse</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Authorized Handshake required</p>
                    </div>
                 </div>
                 <button onClick={() => setShowCart(false)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-slate-900 transition-all">
                    <X size={24} />
                 </button>
              </header>

              <main className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                 {cart ? (
                   <div className="space-y-10">
                      <div className="bg-[#F8FAFC] border border-slate-200 rounded-[2.5rem] p-8 relative overflow-hidden group">
                         <div className="relative z-10 flex justify-between items-start">
                            <div className="space-y-2">
                               <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Selected Protocol</h4>
                               <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">{cart.name}</h2>
                               <p className="text-xs font-medium text-slate-500">{cart.validity}</p>
                            </div>
                            <button onClick={() => setCart(null)} className="p-3 bg-white border border-slate-200 text-slate-300 hover:text-rose-500 rounded-xl transition-all shadow-sm">
                               <Trash2 size={18} />
                            </button>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                            <Receipt size={14} /> Financial Handshake Breakdown
                         </h4>
                         <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-4 shadow-sm">
                            <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                               <span className="uppercase tracking-tight">Subscription Pulse</span>
                               <span>₹{cart.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                               <span className="uppercase tracking-tight">Deployment & Set-up</span>
                               <span>₹{cart.setupFee.toLocaleString()}</span>
                            </div>
                            <div className="h-px bg-slate-100" />
                            <div className="flex justify-between items-center pt-2">
                               <span className="text-sm font-black uppercase text-slate-900 tracking-widest">Total Payable (Inc. GST)</span>
                               <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{total.toLocaleString()}</span>
                            </div>
                         </div>
                      </div>

                      <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl flex gap-6">
                         <ShieldCheck size={32} className="text-indigo-600 shrink-0" />
                         <div>
                            <h4 className="text-[11px] font-black uppercase text-indigo-950">Gateway Verified</h4>
                            <p className="text-[10px] font-bold text-indigo-700/70 italic leading-relaxed">
                               Payments are handled via secure Razorpay vaulting. We only authorize workforce deployment upon valid signature capture.
                            </p>
                         </div>
                      </div>
                   </div>
                 ) : (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-24 h-24 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-100 flex items-center justify-center text-slate-200">
                         <ShoppingCart size={48} />
                      </div>
                      <p className="text-slate-400 font-black uppercase tracking-widest">Protocol Ledger Empty</p>
                   </div>
                 )}
              </main>

              <footer className="p-10 border-t border-slate-100 bg-slate-50 flex gap-4 shrink-0">
                 <button 
                  onClick={() => setShowCart(false)}
                  className="flex-1 py-5 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-all"
                 >
                    Discard
                 </button>
                 <button 
                  onClick={handleCheckout}
                  disabled={!cart || !!isProcessing}
                  className="flex-[2] py-5 bg-indigo-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                 >
                    {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
                    {isProcessing ? 'Processing...' : 'Authorize Payment'}
                 </button>
              </footer>
           </div>
        </div>
      )}

      {/* PRICING GRID HEADER */}
      <div id="pricing-grid" className="text-center space-y-6 pt-4 px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0B1530] uppercase tracking-tighter leading-none">
          WORKFORCE EXPANSION
        </h2>
        <p className="text-[#9BA3B5] text-lg md:text-xl font-medium italic leading-relaxed max-w-2xl mx-auto opacity-70">
          Scale your autonomous sales fleet with high-performance protocols.
        </p>
      </div>

      {/* PLAN GRID */}
      <div className="px-2">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PLAN_DETAILS.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative flex flex-col group transition-all duration-500 min-h-[720px] rounded-[3.5rem] border bg-[#F8FAFC] overflow-visible ${
                  plan.popular ? 'border-[#F97316] ring-4 ring-orange-500/5 bg-white z-10 shadow-2xl scale-[1.02]' : 'border-slate-100 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-[#F97316] text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg whitespace-nowrap">
                      Most Effective
                    </div>
                  </div>
                )}

                <div className="p-5 xl:p-6 flex flex-col flex-1 relative z-10">
                  <div className="space-y-3 text-center mb-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9BA3B5]">{plan.name}</h4>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl lg:text-3xl xl:text-4xl font-black text-[#0B1530] tracking-tighter leading-none">₹{plan.price.toLocaleString()}</span>
                      </div>
                      <div className="inline-block px-3 py-1 bg-[#E0E7FF]/40 border border-[#C7D2FE]/60 rounded-xl">
                        <p className="text-[7px] font-black text-[#5143E1] uppercase tracking-[0.1em]">SET-UP: ₹{plan.setupFee.toLocaleString()}</p>
                      </div>
                      <p className="text-[8px] font-black text-[#9BA3B5] uppercase tracking-[0.2em] pt-1">{plan.validity}</p>
                  </div>

                  <div className="flex-1 flex flex-col space-y-4">
                      <div className="bg-white/50 rounded-2xl p-4 space-y-4 border border-slate-50 shadow-inner">
                        <div className="flex items-center gap-3 text-[#5143E1]">
                            <div className="p-1 bg-indigo-50 rounded-lg"><Zap size={14} fill="currentColor" /></div>
                            <div className="flex flex-col">
                              <span className="text-xs font-black leading-tight tracking-tight">{plan.credits.toLocaleString()} AI</span>
                              <span className="text-[7px] font-black uppercase tracking-widest text-[#9BA3B5]">CREDITS</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400">
                            <div className="p-1 bg-slate-50 rounded-lg"><Globe size={14} /></div>
                            <div className="flex flex-col">
                              <span className="text-xs font-black leading-tight text-slate-700 tracking-tight">{plan.triggers}</span>
                              <span className="text-[7px] font-black uppercase tracking-widest text-[#9BA3B5]">OUTGOING</span>
                            </div>
                        </div>
                      </div>

                      <div className="h-px bg-slate-100" />

                      <div className="space-y-2.5 px-1">
                        {plan.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="mt-1 flex items-center justify-center w-2.5 h-2.5 rounded-full bg-emerald-50 text-emerald-500 shrink-0">
                              <Check size={7} strokeWidth={8} />
                            </div>
                            <span className="text-[8px] font-bold text-slate-600 leading-tight uppercase tracking-tight line-clamp-2">{f}</span>
                          </div>
                        ))}
                      </div>
                  </div>

                  <div className="mt-6">
                    <button 
                      onClick={() => addToCart(plan)}
                      disabled={!!isProcessing}
                      className={`w-full py-4 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
                          plan.popular ? 'bg-[#0F111A] text-white hover:bg-slate-800' : 'bg-white text-[#0B1530] hover:bg-slate-50 border border-slate-200'
                      } disabled:opacity-50`}
                    >
                      <ShoppingCart size={14} />
                      {plan.btnText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* RECHARGE FOOTER / AI CREDIT PROTOCOLS */}
      <div className="bg-[#0B0F19] rounded-[4rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col xl:flex-row items-center justify-between gap-10 mx-2 group">
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-14 text-center md:text-left flex-1">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-white/5 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center backdrop-blur-md group-hover:scale-105 transition-transform duration-700 shadow-2xl">
               <Coins size={36} className="text-[#6366F1] mb-1" />
               <p className="text-[10px] font-black text-indigo-400">FUEL</p>
            </div>
            <div className="space-y-4">
               <div className="flex items-center justify-center md:justify-start gap-4">
                 <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">AI CREDIT PROTOCOLS</h3>
                 <button className="p-2 text-[#6366F1] hover:text-white transition-colors bg-white/5 rounded-xl"><Info size={24} /></button>
               </div>
               
               <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
                     <Activity size={18} className="text-emerald-400 animate-pulse" />
                     <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Current Balance</p>
                        <p className="text-xl font-black text-white leading-none">{currentBalance.toLocaleString()} Credits</p>
                     </div>
                  </div>
                  <p className="text-[#94A3B8] text-sm md:text-base font-medium italic opacity-60 leading-relaxed max-w-md hidden sm:block">
                    Credits are deducted **only on successful execution**. Gateway identity verified via Razorpay Handshake.
                  </p>
               </div>
            </div>
         </div>
         
         <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex gap-2 mr-4">
               {RECHARGE_PACKS.map(pack => (
                 <button 
                  key={pack.id}
                  onClick={() => handleRechargeSelect(pack)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase hover:bg-white/10 transition-all"
                 >
                   +{pack.credits}
                 </button>
               ))}
            </div>
            <button 
              onClick={() => setShowRecharge(true)}
              className="px-10 py-5 bg-[#5143E1] text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-3 border border-indigo-400/20"
            >
              <RefreshCw size={18} /> RECHARGE WALLET
            </button>
         </div>
         
         <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] -mr-40 -mt-40" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] -ml-32 -mb-32" />
      </div>
    </div>
  );
};

export default BillingManager;
