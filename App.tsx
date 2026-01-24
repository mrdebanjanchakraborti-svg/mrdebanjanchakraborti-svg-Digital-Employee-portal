
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Layout, Users, Settings, Shield, Plus, MessageSquare, 
  Zap, Megaphone, Share2, Inbox, Sparkles, PhoneCall, 
  Activity, Star, Layers, Code, ShieldAlert, AlertTriangle, 
  ArrowRight, PieChart, Award, DollarSign, Crown, UserCircle,
  Archive, Rocket, ChevronUp, Lock, Radio, PlayCircle, History, Share, HeartPulse,
  Plus as PlusIcon, Wallet, FileText, Receipt
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
import MessageQueue from './components/MessageQueue'; // This component now serves as Executions
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
import { UserRole, PlanTier, SubscriptionStatus } from './types';

interface NavigationItem {
  id: string;
  name: string;
  icon: any;
  role?: UserRole;
  badge?: number;
  restrictedForFree?: boolean;
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
  
  // Real-world Subscription state
  const [subscription, setSubscription] = useState({
    tier: PlanTier.FREE, 
    status: SubscriptionStatus.PENDING_APPROVAL,
    overdue: false, 
    credits: 0, 
    expiresAt: '2024-12-30'
  });

  // Load activation state from persistence if needed
  useEffect(() => {
    const saved = localStorage.getItem('pulse_activated');
    if (saved === 'true') {
      setIsActivated(true);
      // Mock loading subscription details
      setSubscription(prev => ({
        ...prev,
        status: SubscriptionStatus.ACTIVE,
        credits: 200 // Default to free if we don't know
      }));
    }
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  if (!isOnboardingComplete) {
    return <OnboardingFlow onComplete={() => {
      setIsOnboardingComplete(true);
      setActiveTab('billing'); // Force redirect to billing for initial payment
    }} />;
  }

  const navigation: NavigationSection[] = [
    { section: 'Executive', items: [
      { id: 'ceo-cockpit', name: 'CEO Cockpit', icon: Crown, role: UserRole.ADMIN },
      { id: 'dashboard', name: 'Revenue Overview', icon: Layout },
    ]},
    { section: 'Intelligence', items: [
      { id: 'inbox', name: 'Unified Inbox', icon: MessageSquare, badge: 3 },
      { id: 'objections', name: 'Objection Library', icon: ShieldAlert },
      { id: 'voice', name: 'Voice AI', icon: PhoneCall, restrictedForFree: true },
    ]},
    { section: 'Growth', items: [
      { id: 'campaigns', name: 'AI Campaigns', icon: Megaphone, restrictedForFree: true },
      { id: 'social', name: 'Social Planner', icon: Share2, restrictedForFree: true },
      { id: 'creative', name: 'Content Engine', icon: Sparkles, restrictedForFree: true },
      { id: 'assets', name: 'Storage Vault', icon: Archive },
      { id: 'segments', name: 'Audience segments', icon: Layers },
    ]},
    { section: 'Financials', items: [
      { id: 'reporting', name: 'Integrity Reporting', icon: PieChart },
      { id: 'partner', name: 'Partner Hub', icon: Award },
      { id: 'billing', name: 'Billing & Credits', icon: DollarSign },
      { id: 'ledger', name: 'Wallet Ledger', icon: Wallet },
      { id: 'subscription-ledger', name: 'Subscription Audit', icon: Receipt },
    ]},
    { section: 'Automation', items: [
      { id: 'triggers-in', name: 'Incoming Triggers', icon: Radio, restrictedForFree: true },
      { id: 'triggers-out', name: 'Outgoing Triggers', icon: Share, restrictedForFree: false },
      { id: 'workflows', name: 'Workflows', icon: PlayCircle, restrictedForFree: true },
      { id: 'executions', name: 'Executions', icon: History, badge: 28, restrictedForFree: true },
      { id: 'automation-hub', name: 'Blueprint Hub', icon: Zap, restrictedForFree: true },
    ]},
    { section: 'Ops & Scale', items: [
      { id: 'leads', name: 'Lead Kanban', icon: Users },
      { id: 'reviews', name: 'Reviews & referrals', icon: Star, restrictedForFree: true },
    ]},
    { section: 'Infrastructure', items: [
      { id: 'engine', name: 'Engine Room', icon: Code },
      { id: 'schema', name: 'Master Schema', icon: Shield },
      { id: 'profile', name: 'My Pulse Profile', icon: UserCircle },
      { id: 'settings', name: 'Settings', icon: Settings },
    ]}
  ];

  const handleTabChange = (id: string) => {
    if (!isActivated && id !== 'billing' && id !== 'ledger') {
      alert("Authorization Required: Please activate your workforce plan in the Billing Hub before accessing other protocols.");
      return;
    }
    setActiveTab(id);
  };

  const handleActivation = (tier: PlanTier) => {
    let credits = 200;
    if (tier === PlanTier.STARTER) credits = 1500;
    if (tier === PlanTier.GROWTH) credits = 6000;
    if (tier === PlanTier.PRO) credits = 15000;
    if (tier === PlanTier.ENTERPRISE) credits = 40500;

    const expiryDays = tier === PlanTier.FREE ? 10 : 30;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);

    setIsActivated(true);
    localStorage.setItem('pulse_activated', 'true');
    setSubscription({
      ...subscription,
      tier,
      status: SubscriptionStatus.ACTIVE,
      credits: credits,
      expiresAt: expiryDate.toISOString().split('T')[0]
    });
    // Give feedback that pages are now active
    console.log(`Pulse activated for tier: ${tier}`);
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
           <p className="text-[12px] font-black uppercase tracking-[0.25em]">Running on Free Pulse – Deployment restricted until upgrade</p>
           <button onClick={() => setActiveTab('billing')} className="bg-white text-[#5143E1] px-6 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg active:scale-95">Upgrade Now</button>
        </div>
      ) : subscription.overdue ? (
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-red-600 text-white z-[100] flex items-center justify-between px-10 border-b border-white/10 shadow-2xl animate-in slide-in-from-top duration-500">
           <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="animate-pulse" />
              <p className="text-[12px] font-black uppercase tracking-widest">Workforce Protocol Blocked: Subscription Overdue. AI Employee is on strike.</p>
           </div>
           <button onClick={() => setActiveTab('billing')} className="bg-white text-red-600 px-6 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg">Settle Ledger</button>
        </div>
      ) : subscription.tier === PlanTier.FREE ? (
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-[#0B1530] text-white z-[100] flex items-center justify-center gap-6 px-10 border-b border-white/10 shadow-2xl animate-in slide-in-from-top duration-500">
           <Zap size={20} className="text-emerald-400" fill="currentColor" />
           <p className="text-[11px] font-black uppercase tracking-[0.25em]">FREE TIER PULSE: {subscription.credits} CREDITS REMAINING</p>
           <button onClick={() => setActiveTab('billing')} className="bg-indigo-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95">Scale to Starter</button>
        </div>
      ) : null}

      <aside className={`w-80 bg-white border-r border-slate-100 flex flex-col z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-500 ${(!isActivated || subscription.overdue) ? 'mt-[60px]' : (subscription.tier === PlanTier.FREE ? 'mt-[60px]' : '')}`}>
        <div className="p-8">
          <div className="p-4 flex justify-center group">
            <img 
              src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" 
              alt="Logo" 
              className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300 drop-shadow-xl"
            />
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-6 overflow-y-auto scrollbar-hide pb-10">
          {filteredNavigation.map((group) => (
            <div key={group.section} className="space-y-1">
              <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{group.section}</h4>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  disabled={!isActivated && item.id !== 'billing' && item.id !== 'ledger' && item.id !== 'subscription-ledger'}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all relative ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-[#5143E1] to-[#7164f0] text-white shadow-xl shadow-indigo-100'
                      : !isActivated && item.id !== 'billing' && item.id !== 'ledger' && item.id !== 'subscription-ledger' ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-300'} />
                  <span className="truncate">{item.name}</span>
                  {((!isActivated && item.id !== 'billing' && item.id !== 'ledger' && item.id !== 'subscription-ledger') || (item.restrictedForFree && subscription.tier === PlanTier.FREE)) && (
                    <Lock size={12} className="ml-auto text-slate-300 shrink-0" />
                  )}
                  {item.badge && isActivated && (
                    <span className={`ml-auto w-5 h-5 ${activeTab === item.id ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600'} text-[9px] font-black flex items-center justify-center rounded-full shrink-0`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
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
          </div>
          <div className="p-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[1.25rem] shadow-lg shadow-indigo-100">
             <button onClick={() => setActiveTab('billing')} className="w-full py-4 bg-[#5143E1] text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-[1.2rem] hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2">
                <ChevronUp size={14} /> {isActivated ? 'UPGRADE PULSE' : 'ACTIVATE PULSE'}
             </button>
          </div>
        </div>
      </aside>

      <main className={`flex-1 flex flex-col min-w-0 overflow-hidden bg-white transition-all duration-500 ${(!isActivated || subscription.overdue || subscription.tier === PlanTier.FREE) ? 'mt-[60px]' : ''}`}>
        <header className="h-20 md:h-24 border-b border-slate-100 flex items-center justify-between px-6 md:px-12 shrink-0 z-20 bg-white">
          <h1 className="text-[12px] md:text-[14px] font-black text-slate-900 uppercase tracking-[0.4em] md:tracking-[0.6em] truncate pr-4">
            {activeTab === 'billing' ? 'BILLING' : activeTab === 'ledger' ? 'WALLET LEDGER' : activeTab === 'subscription-ledger' ? 'SUBSCRIPTION AUDIT' : activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-3 md:gap-6">
            <div className={`hidden sm:flex items-center gap-3 px-6 py-2.5 bg-[#E8F5F1] text-[#059669] rounded-2xl text-[11px] font-black uppercase tracking-widest border border-[#D1FAE5] shadow-sm`}>
              <HeartPulse size={16} className="animate-pulse text-[#059669]" /> PROTOCOL: RUNNING
            </div>
            <button 
              disabled={!isActivated || subscription.overdue || (subscription.tier === PlanTier.FREE && activeTab !== 'dashboard' && activeTab !== 'inbox')}
              onClick={() => setIsFormOpen(true)}
              className={`${(!isActivated || subscription.overdue) ? 'bg-[#E5E9F0] opacity-50 cursor-not-allowed text-slate-400' : 'bg-[#E5E9F0] hover:bg-slate-200 text-slate-900 shadow-sm active:scale-95'} px-6 md:px-10 py-3 md:py-4 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 md:gap-3 transition-all border border-slate-200 shrink-0`}
            >
              <PlusIcon size={18} strokeWidth={3} /> <span className="hidden sm:inline">ADD SIGNAL</span><span className="sm:hidden">ADD</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-white relative custom-scrollbar">
          <div className="p-6 md:p-12 h-full">
            {!isActivated && activeTab !== 'billing' && activeTab !== 'ledger' && activeTab !== 'subscription-ledger' ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 text-center bg-white rounded-[3rem] md:rounded-[4rem] border border-red-100 shadow-xl space-y-10 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 md:w-36 md:h-36 bg-red-50 rounded-[3rem] md:rounded-[4rem] flex items-center justify-center text-red-600 shadow-inner">
                      <Lock size={48} className="md:size-20" />
                  </div>
                  <div className="space-y-4 max-w-2xl">
                      <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Workforce Idle</h2>
                      <p className="text-slate-500 text-base md:text-xl font-medium leading-relaxed italic px-4">
                        "Initial handshake incomplete. Your Digital Employee requires a fuel deposit to begin its shift. Access the Billing Hub to activate your chosen tier."
                      </p>
                  </div>
                  <button onClick={() => setActiveTab('billing')} className="px-10 md:px-14 py-4 md:py-6 bg-red-600 text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] rounded-[2rem] md:rounded-[2.5rem] hover:bg-red-700 transition-all shadow-2xl shadow-red-200 active:scale-95 flex items-center gap-4 md:gap-5">
                    Activate workforce Protocol <ArrowRight size={20} className="md:size-6" />
                  </button>
              </div>
            ) : subscription.overdue && activeTab !== 'billing' && activeTab !== 'ledger' && activeTab !== 'subscription-ledger' ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 text-center bg-white rounded-[3rem] md:rounded-[4rem] border border-red-100 shadow-xl space-y-10 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 md:w-36 md:h-36 bg-red-50 rounded-[3rem] md:rounded-[4rem] flex items-center justify-center text-red-600 shadow-inner relative">
                    <ShieldAlert size={48} className="md:size-20" />
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                      <Zap size={18} className="md:size-6" fill="currentColor" />
                    </div>
                </div>
                <div className="space-y-4 max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Salary Handshake Failed</h2>
                    <p className="text-slate-500 text-base md:text-xl font-medium leading-relaxed italic px-4">
                      "Boss, our operational pulse is flat. The digital employee workforce has halted all campaigns, AI replies, and signal ingestion due to an overdue ledger. Settle the subscription to resume your growth."
                    </p>
                </div>
                <button onClick={() => setActiveTab('billing')} className="px-10 md:px-14 py-4 md:py-6 bg-red-600 text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] rounded-[2rem] md:rounded-[2.5rem] hover:bg-red-700 transition-all shadow-2xl shadow-red-200 active:scale-95 flex items-center gap-4 md:gap-5">
                  Authorize Settlement & Resume Protocol <ArrowRight size={20} className="md:size-6" />
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 h-full">
                {activeTab === 'ceo-cockpit' && <AdminDashboard />}
                {activeTab === 'dashboard' && <DashboardOverview userPlan={subscription.tier} />}
                {activeTab === 'inbox' && <UnifiedInbox />}
                {activeTab === 'objections' && <ObjectionLibrary />}
                {activeTab === 'leads' && <LeadKanban />}
                {activeTab === 'social' && (subscription.tier === PlanTier.FREE ? <FeatureLock description="Automated Social Strategy is restricted in Free tier." /> : <SocialCalendar onCompose={() => setIsPostComposerOpen(true)} />)}
                {activeTab === 'creative' && (subscription.tier === PlanTier.FREE ? <FeatureLock description="HD Content Generation requires a Paid Fuel injection." /> : <ContentEngine />)}
                {activeTab === 'assets' && <AssetLibrary />}
                {activeTab === 'segments' && <Segments />}
                {activeTab === 'triggers-in' && (subscription.tier === PlanTier.FREE ? <FeatureLock description="Autonomous Pulse Triggers are locked." /> : <TriggerManager userPlan={subscription.tier} />)}
                {activeTab === 'triggers-out' && <OutgoingTriggerManager userPlan={subscription.tier} />}
                {activeTab === 'executions' && (subscription.tier === PlanTier.FREE ? <FeatureLock description="The execution heartbeat is currently frozen." /> : <MessageQueue />)}
                {activeTab === 'voice' && (subscription.tier === PlanTier.FREE ? <FeatureLock description="AI Voice Receptionist is on standby." /> : <VoiceManager />)}
                {activeTab === 'workflows' && (subscription.tier === PlanTier.FREE ? <FeatureLock description="Scenario Engine requires active Deployment." /> : <WorkflowEngine />)}
                {activeTab === 'reviews' && (subscription.tier === PlanTier.FREE ? <FeatureLock description="Social Proof automation is disabled." /> : <ReviewManager />)}
                {activeTab === 'automation-hub' && (subscription.tier === PlanTier.FREE ? <FeatureLock description="n8n Orchestration requires Growth fuel." /> : <AutomationHub />)}
                {activeTab === 'engine' && <EdgeFunctionsCode />}
                {activeTab === 'billing' && <BillingManager onActivate={handleActivation} />}
                {activeTab === 'ledger' && <WalletLedger balance={subscription.credits} />}
                {activeTab === 'subscription-ledger' && <SubscriptionLedger />}
                {activeTab === 'reporting' && <ReportingManager />}
                {activeTab === 'partner' && <PartnerHub />}
                {activeTab === 'profile' && <UserProfile user={{ id: 'u_1', full_name: 'John Doe', email: 'john@digitalemployee.me', role: userRole, workspace: 'Workforce HQ' }} wallet_balance={subscription.credits} subscription={{ plan: subscription.tier.toUpperCase(), status: subscription.status, expiry: subscription.expiresAt }} />}
                {activeTab === 'campaigns' && (subscription.tier === PlanTier.FREE ? <FeatureLock description="Omnichannel Campaigns are locked." /> : <CampaignList onCreate={() => setIsCampaignBuilderOpen(true)} />)}
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

const FeatureLock: React.FC<{ description: string }> = ({ description }) => (
  <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white rounded-[3rem] md:rounded-[5rem] border border-slate-100 shadow-sm space-y-8 md:space-y-12 animate-in zoom-in-95 duration-500">
    <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-50 rounded-[3rem] md:rounded-[4rem] flex items-center justify-center text-indigo-600 shadow-inner group transition-transform hover:scale-110">
       <ShieldAlert size={48} className="md:size-16" />
    </div>
    <div className="space-y-4 max-w-xl mx-auto px-4">
       <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Intelligence Restricted</h3>
       <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed italic">"{description} Upgrade your workforce protocol to authorize these autonomous actions."</p>
    </div>
    <button 
      onClick={() => {
        // Find the billing button in App state if possible or manually trigger
        window.dispatchEvent(new CustomEvent('changeTab', { detail: 'billing' }));
      }}
      className="px-10 md:px-14 py-4 md:py-6 bg-indigo-600 text-white rounded-2xl md:rounded-[2rem] font-black text-[10px] md:text-[11px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-4">
       Access Billing Hub <ArrowRight size={16} className="md:size-5" />
    </button>
  </div>
);

export default App;
