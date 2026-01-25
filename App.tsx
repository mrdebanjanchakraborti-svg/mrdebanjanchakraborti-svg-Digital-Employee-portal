
import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Layout, Users, Settings, Shield, Plus, MessageSquare, 
  Zap, Megaphone, Share2, Inbox, Sparkles, PhoneCall, 
  Activity, Star, Layers, Code, ShieldAlert, AlertTriangle, 
  ArrowRight, PieChart, Award, DollarSign, Crown, UserCircle,
  Archive, Rocket, ChevronUp, Lock, Radio, PlayCircle, History, Share, HeartPulse,
  Plus as PlusIcon, Wallet, FileText, Receipt, Timer, LogOut
} from 'lucide-react';
import LeadKanban from './components/LeadKanban';
import LeadAnalytics from './components/LeadAnalytics';
import LeadForm from './components/LeadForm';
import DatabaseSchema from './components/DatabaseSchema';
import DashboardOverview from './components/DashboardOverview';
import Login from './components/Login';
import OnboardingFlow from './components/OnboardingFlow';
import CampaignList from './components/CampaignList';
import CampaignBuilder from './components/CampaignBuilder';
import SocialCalendar from './components/SocialCalendar';
import PostComposer from './components/PostComposer';
import UnifiedInbox from './components/UnifiedInbox';
import ContentEngine from './components/ContentEngine';
import AutomationHub from './components/AutomationHub';
import BillingManager from './components/BillingManager';
import VoiceManager from './components/VoiceManager';
import WorkflowEngine from './components/WorkflowEngine';
import ReviewManager from './components/ReviewManager';
import MessageQueue from './components/MessageQueue'; 
import Segments from './components/Segments';
import EdgeFunctionsCode from './components/EdgeFunctionsCode';
import ObjectionLibrary from './components/ObjectionLibrary';
import ReportingManager from './components/ReportingManager';
import PartnerHub from './components/PartnerHub';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import AssetLibrary from './components/AssetLibrary';
import TriggerManager from './components/TriggerManager';
import OutgoingTriggerManager from './components/OutgoingTriggerManager';
import WalletLedger from './components/WalletLedger';
import SubscriptionLedger from './components/SubscriptionLedger';
import { UserRole, PlanTier, SubscriptionStatus, SubscriptionOrder } from './types';

interface NavigationItem {
  id: string;
  name: string;
  icon: any;
  role?: UserRole;
  badge?: number;
  isCore?: boolean; // Always accessible even if expired
}

interface NavigationSection {
  section: string;
  items: NavigationItem[];
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isActivated, setIsActivated] = useState(false); 
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCampaignBuilderOpen, setIsCampaignBuilderOpen] = useState(false);
  const [isPostComposerOpen, setIsPostComposerOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);
  
  const [subscription, setSubscription] = useState({
    tier: PlanTier.FREE, 
    status: SubscriptionStatus.PENDING_APPROVAL,
    overdue: false, 
    credits: 0, 
    expiresAt: '2024-12-30'
  });

  const [orders, setOrders] = useState<SubscriptionOrder[]>([]);

  // Calculate if the Free Tier is expired
  const isExpired = useMemo(() => {
    if (!isActivated || subscription.tier !== PlanTier.FREE) return false;
    return new Date() > new Date(subscription.expiresAt);
  }, [subscription.expiresAt, subscription.tier, isActivated]);

  useEffect(() => {
    const saved = localStorage.getItem('pulse_activated');
    const savedCredits = localStorage.getItem('pulse_credits');
    const savedExpiry = localStorage.getItem('pulse_expiry');
    const savedOrders = localStorage.getItem('pulse_orders');
    
    if (saved === 'true') {
      setIsActivated(true);
      setSubscription(prev => ({
        ...prev,
        status: SubscriptionStatus.ACTIVE,
        credits: savedCredits ? parseInt(savedCredits) : 200,
        expiresAt: savedExpiry || prev.expiresAt
      }));
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    if (isActivated) {
      localStorage.setItem('pulse_credits', subscription.credits.toString());
      localStorage.setItem('pulse_expiry', subscription.expiresAt);
      localStorage.setItem('pulse_orders', JSON.stringify(orders));
    }
  }, [subscription.credits, subscription.expiresAt, isActivated, orders]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Optionally clear temporary session data here if needed
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  if (!isOnboardingComplete) {
    return <OnboardingFlow onComplete={() => {
      setIsOnboardingComplete(true);
      setActiveTab('billing');
    }} />;
  }

  const navigation: NavigationSection[] = [
    { section: 'Executive', items: [
      { id: 'ceo-cockpit', name: 'CEO Cockpit', icon: Crown, role: UserRole.ADMIN },
      { id: 'dashboard', name: 'Revenue Overview', icon: Layout, isCore: true },
    ]},
    { section: 'Intelligence', items: [
      { id: 'inbox', name: 'Unified Inbox', icon: MessageSquare, badge: 3 },
      { id: 'objections', name: 'Objection Library', icon: ShieldAlert },
      { id: 'voice', name: 'Voice AI', icon: PhoneCall },
    ]},
    { section: 'Growth', items: [
      { id: 'campaigns', name: 'AI Campaigns', icon: Megaphone },
      { id: 'social', name: 'Social Planner', icon: Share2 },
      { id: 'creative', name: 'Content Engine', icon: Sparkles },
      { id: 'assets', name: 'Storage Vault', icon: Archive },
      { id: 'segments', name: 'Audience segments', icon: Layers },
    ]},
    { section: 'Financials', items: [
      { id: 'reporting', name: 'Integrity Reporting', icon: PieChart },
      { id: 'partner', name: 'Partner Hub', icon: Award },
      { id: 'billing', name: 'Billing & Credits', icon: DollarSign, isCore: true },
      { id: 'ledger', name: 'Wallet Ledger', icon: Wallet, isCore: true },
      { id: 'subscription-ledger', name: 'Subscription Audit', icon: Receipt, isCore: true },
    ]},
    { section: 'Automation', items: [
      { id: 'triggers-in', name: 'Incoming Triggers', icon: Radio },
      { id: 'triggers-out', name: 'Outgoing Triggers', icon: Share },
      { id: 'workflows', name: 'Workflows', icon: PlayCircle },
      { id: 'executions', name: 'Executions', icon: History, badge: 28 },
      { id: 'automation-hub', name: 'Blueprint Hub', icon: Zap },
    ]},
    { section: 'Ops & Scale', items: [
      { id: 'leads', name: 'Lead Kanban', icon: Users },
      { id: 'reviews', name: 'Reviews & referrals', icon: Star },
    ]},
    { section: 'Infrastructure', items: [
      { id: 'engine', name: 'Engine Room', icon: Code },
      { id: 'schema', name: 'Master Schema', icon: Shield },
      { id: 'profile', name: 'My Pulse Profile', icon: UserCircle, isCore: true },
      { id: 'settings', name: 'Settings', icon: Settings, isCore: true },
    ]}
  ];

  const handleTabChange = (id: string) => {
    if (!isActivated && id !== 'billing' && id !== 'ledger') {
      alert("Authorization Required: Please activate your workforce plan in the Billing Hub.");
      return;
    }
    setActiveTab(id);
  };

  const handleActivation = (tier: PlanTier) => {
    let credits = 200;
    let validityDays = 10;
    let price = 0;
    let setup = 100;

    if (tier === PlanTier.STARTER) { credits = 1500; validityDays = 30; price = 2500; setup = 10000; }
    else if (tier === PlanTier.GROWTH) { credits = 6000; validityDays = 30; price = 6500; setup = 25000; }
    else if (tier === PlanTier.PRO) { credits = 15000; validityDays = 30; price = 15000; setup = 35000; }
    else if (tier === PlanTier.ENTERPRISE) { credits = 40500; validityDays = 30; price = 35500; setup = 50000; }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validityDays);
    const expiryStr = expiryDate.toISOString().split('T')[0];

    // Generate Order Record for Audit Ledger
    const newOrder: SubscriptionOrder = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      order_date: new Date().toISOString(),
      company_name: 'Workforce Workspace',
      industry_focus: 'Automation',
      order_id: `ORD_${tier.toUpperCase()}_${Math.floor(Math.random() * 10000)}`,
      razorpay_order_id: `order_${Math.random().toString(36).substr(2, 12)}`,
      razorpay_payment_id: `pay_${Math.random().toString(36).substr(2, 12)}`,
      razorpay_signature: Math.random().toString(36).substr(2, 32),
      active_plan: tier,
      purchase_amount: price + setup,
      renewal_date: expiryStr,
      renewal_amount: price,
      status: 'active'
    };

    setIsActivated(true);
    localStorage.setItem('pulse_activated', 'true');
    setOrders(prev => [newOrder, ...prev]);
    setSubscription(prev => ({
      ...prev,
      tier,
      status: SubscriptionStatus.ACTIVE,
      credits: prev.credits + credits,
      expiresAt: expiryStr
    }));
  };

  const handleRecharge = (amount: number) => {
    setSubscription(prev => ({
      ...prev,
      credits: prev.credits + amount
    }));
  };

  const isTabLocked = (itemId: string) => {
    const item = navigation.flatMap(g => g.items).find(i => i.id === itemId);
    if (!item) return false;
    // Expired Free tier only allows "Core" items
    if (isExpired && !item.isCore) return true;
    return false;
  };

  const filteredNavigation = navigation.map(group => ({
    ...group,
    items: group.items.filter(item => !item.role || item.role === userRole)
  })).filter(group => group.items.length > 0);

  return (
    <div className="flex h-screen bg-white text-slate-900 font-sans relative overflow-hidden">
      {/* GLOBAL BANNER */}
      {!isActivated ? (
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-[#5143E1] text-white z-[100] flex items-center justify-center gap-6 px-10 border-b border-white/10 shadow-2xl animate-in slide-in-from-top duration-500">
           <Rocket size={20} className="animate-bounce" />
           <p className="text-[12px] font-black uppercase tracking-[0.25em]">Running on Free Pulse – Deployment restricted until activation</p>
           <button onClick={() => setActiveTab('billing')} className="bg-white text-[#5143E1] px-6 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg active:scale-95">Activate Now</button>
        </div>
      ) : subscription.overdue ? (
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-red-600 text-white z-[100] flex items-center justify-between px-10 border-b border-white/10 shadow-2xl animate-in slide-in-from-top duration-500">
           <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="animate-pulse" />
              <p className="text-[12px] font-black uppercase tracking-widest">Workforce Protocol Blocked: Ledger Overdue.</p>
           </div>
           <button onClick={() => setActiveTab('billing')} className="bg-white text-red-600 px-6 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg">Settle Ledger</button>
        </div>
      ) : subscription.tier === PlanTier.FREE ? (
        <div className={`absolute top-0 left-0 right-0 h-[60px] text-white z-[100] flex items-center justify-center gap-6 px-10 border-b border-white/10 shadow-2xl animate-in slide-in-from-top duration-500 ${isExpired ? 'bg-rose-600' : 'bg-[#0B1530]'}`}>
           {isExpired ? <Timer size={20} className="animate-pulse" /> : <Zap size={20} className="text-emerald-400" fill="currentColor" />}
           <p className="text-[11px] font-black uppercase tracking-[0.25em]">
             {isExpired ? 'FREE VALIDITY EXPIRED - INTELLIGENCE OFFLINE' : `FREE TIER ACTIVE: ${subscription.credits} CREDITS | EXPIRES: ${subscription.expiresAt}`}
           </p>
           <button onClick={() => setActiveTab('billing')} className="bg-indigo-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
             {isExpired ? 'Restore Pulse (Upgrade)' : 'Scale to Starter'}
           </button>
        </div>
      ) : null}

      <aside className={`w-80 bg-white border-r border-slate-100 flex flex-col z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-500 ${(isActivated && (subscription.tier === PlanTier.FREE || subscription.overdue)) || !isActivated ? 'mt-[60px]' : ''}`}>
        <div className="p-8">
          <div className="p-4 flex justify-center group">
            <img src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" alt="Logo" className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300 drop-shadow-xl" />
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-6 overflow-y-auto scrollbar-hide pb-10">
          {filteredNavigation.map((group) => (
            <div key={group.section} className="space-y-1">
              <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{group.section}</h4>
              {group.items.map((item) => {
                const locked = isTabLocked(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    disabled={(!isActivated && item.id !== 'billing' && item.id !== 'ledger') || (locked && !item.isCore)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all relative ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-[#5143E1] to-[#7164f0] text-white shadow-xl shadow-indigo-100'
                        : locked ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-300'} />
                    <span className="truncate">{item.name}</span>
                    {locked && <Lock size={12} className="ml-auto text-slate-300 shrink-0" />}
                    {item.badge && isActivated && !locked && (
                      <span className={`ml-auto w-5 h-5 ${activeTab === item.id ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600'} text-[9px] font-black flex items-center justify-center rounded-full shrink-0`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50 bg-slate-50/30 space-y-4">
          <div className="flex items-center gap-3 px-4 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-black border border-indigo-100 text-xs md:text-sm shadow-inner shrink-0">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-slate-900 truncate uppercase tracking-tight">Founders Hub</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{isActivated ? subscription.credits.toLocaleString() : 0} Cr</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              title="Terminate Session"
            >
              <LogOut size={18} />
            </button>
          </div>
          <div className="p-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[1.25rem] shadow-lg shadow-indigo-100">
             <button onClick={() => setActiveTab('billing')} className="w-full py-4 bg-[#5143E1] text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-[1.2rem] hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2">
                <ChevronUp size={14} /> {isActivated ? 'UPGRADE PULSE' : 'ACTIVATE PULSE'}
             </button>
          </div>
        </div>
      </aside>

      <main className={`flex-1 flex flex-col min-w-0 overflow-hidden bg-white transition-all duration-500 ${(isActivated && (subscription.tier === PlanTier.FREE || subscription.overdue)) || !isActivated ? 'mt-[60px]' : ''}`}>
        <header className="h-20 md:h-24 border-b border-slate-100 flex items-center justify-between px-6 md:px-12 shrink-0 z-20 bg-white">
          <h1 className="text-[12px] md:text-[14px] font-black text-slate-900 uppercase tracking-[0.4em] md:tracking-[0.6em] truncate pr-4">
            {activeTab === 'billing' ? 'BILLING' : activeTab === 'ledger' ? 'WALLET LEDGER' : activeTab === 'subscription-ledger' ? 'SUBSCRIPTION AUDIT' : activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-3 md:gap-6">
            <div className={`hidden sm:flex items-center gap-3 px-6 py-2.5 bg-[#E8F5F1] text-[#059669] rounded-2xl text-[11px] font-black uppercase tracking-widest border border-[#D1FAE5] shadow-sm`}>
              <HeartPulse size={16} className="animate-pulse text-[#059669]" /> PROTOCOL: {isExpired ? 'SUSPENDED' : 'RUNNING'}
            </div>
            <button 
              disabled={!isActivated || isExpired || subscription.overdue}
              onClick={() => setIsFormOpen(true)}
              className={`${(!isActivated || isExpired || subscription.overdue) ? 'bg-[#E5E9F0] opacity-50 cursor-not-allowed text-slate-400' : 'bg-[#E5E9F0] hover:bg-slate-200 text-slate-900 shadow-sm active:scale-95'} px-6 md:px-10 py-3 md:py-4 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 md:gap-3 transition-all border border-slate-200 shrink-0`}
            >
              <PlusIcon size={18} strokeWidth={3} /> <span className="hidden sm:inline">ADD SIGNAL</span><span className="sm:hidden">ADD</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-white relative custom-scrollbar">
          <div className="p-6 md:p-12 h-full">
            {isTabLocked(activeTab) ? (
              <FeatureLock 
                isExpired={isExpired}
                description={isExpired ? "Free Tier validity has expired. Your Digital Employee is on mandatory leave." : "Feature restricted."} 
              />
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 h-full">
                {activeTab === 'ceo-cockpit' && <AdminDashboard />}
                {activeTab === 'dashboard' && <DashboardOverview userPlan={subscription.tier} />}
                {activeTab === 'inbox' && <UnifiedInbox />}
                {activeTab === 'objections' && <ObjectionLibrary />}
                {activeTab === 'leads' && <LeadKanban />}
                {activeTab === 'social' && <SocialCalendar onCompose={() => setIsPostComposerOpen(true)} />}
                {activeTab === 'creative' && <ContentEngine />}
                {activeTab === 'assets' && <AssetLibrary />}
                {activeTab === 'segments' && <Segments />}
                {activeTab === 'triggers-in' && <TriggerManager userPlan={subscription.tier} />}
                {activeTab === 'triggers-out' && <OutgoingTriggerManager userPlan={subscription.tier} isExpired={isExpired} />}
                {activeTab === 'executions' && <MessageQueue />}
                {activeTab === 'voice' && <VoiceManager />}
                {activeTab === 'workflows' && <WorkflowEngine />}
                {activeTab === 'reviews' && <ReviewManager />}
                {activeTab === 'automation-hub' && <AutomationHub />}
                {activeTab === 'engine' && <EdgeFunctionsCode />}
                {activeTab === 'billing' && <BillingManager onActivate={handleActivation} onRecharge={handleRecharge} globalBalance={subscription.credits} />}
                {activeTab === 'ledger' && <WalletLedger balance={subscription.credits} />}
                {activeTab === 'subscription-ledger' && <SubscriptionLedger externalOrders={orders} />}
                {activeTab === 'reporting' && <ReportingManager />}
                {activeTab === 'partner' && <PartnerHub />}
                {activeTab === 'profile' && <UserProfile user={{ id: 'u_1', full_name: 'John Doe', email: 'john@digitalemployee.me', role: userRole, workspace: 'Workforce HQ' }} wallet_balance={subscription.credits} subscription={{ plan: subscription.tier.toUpperCase(), status: subscription.status, expiry: subscription.expiresAt }} />}
                {activeTab === 'campaigns' && <CampaignList onCreate={() => setIsCampaignBuilderOpen(true)} />}
                {activeTab === 'analytics' && <LeadAnalytics />}
                {activeTab === 'schema' && <DatabaseSchema />}
                {activeTab === 'settings' && <div className="p-10 bg-white rounded-3xl border border-slate-200">Settings Protocol...</div>}
              </div>
            )}
          </div>
        </div>
      </main>

      {isFormOpen && <LeadForm onClose={() => setIsFormOpen(false)} />}
      {isCampaignBuilderOpen && <CampaignBuilder onClose={() => setIsCampaignBuilderOpen(false)} onSave={() => setIsCampaignBuilderOpen(false)} />}
      {isPostComposerOpen && <PostComposer onClose={() => setIsPostComposerOpen(false)} onSave={() => setIsPostComposerOpen(false)} />}
    </div>
  );
};

const FeatureLock: React.FC<{ description: string, isExpired?: boolean }> = ({ description, isExpired }) => (
  <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white rounded-[3rem] md:rounded-[5rem] border border-slate-100 shadow-sm space-y-8 md:space-y-12 animate-in zoom-in-95 duration-500">
    <div className={`w-24 h-24 ${isExpired ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'} rounded-[3rem] md:rounded-[4rem] flex items-center justify-center shadow-inner group transition-transform hover:scale-110`}>
       {isExpired ? <Timer size={48} className="md:size-16" /> : <ShieldAlert size={48} className="md:size-16" />}
    </div>
    <div className="space-y-4 max-w-xl mx-auto px-4">
       <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
         {isExpired ? 'Handshake validity Expired' : 'Intelligence Restricted'}
       </h3>
       <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed italic">"{description} Upgrade your workforce protocol to Starter or Growth to resume autonomous actions."</p>
    </div>
    <button 
      onClick={() => { window.dispatchEvent(new CustomEvent('changeTab', { detail: 'billing' })); }}
      className={`px-10 md:px-14 py-4 md:py-6 text-white rounded-2xl md:rounded-[2rem] font-black text-[10px] md:text-[11px] uppercase tracking-widest shadow-xl transition-all flex items-center gap-4 ${isExpired ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-100' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'}`}>
       Access Billing Hub <ArrowRight size={16} className="md:size-5" />
    </button>
  </div>
);

export default App;
