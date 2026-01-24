
import React, { useState } from 'react';
import { 
  Layout, Users, Settings, Shield, Plus, MessageSquare, 
  Zap, Megaphone, Share2, Inbox, Sparkles, PhoneCall, 
  Activity, Star, Layers, Code, ShieldAlert, AlertTriangle, 
  ArrowRight, PieChart, Award, DollarSign, Crown, UserCircle,
  Archive, Rocket, ChevronUp, Lock, Radio, PlayCircle, History, Share
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
  const [isActivated, setIsActivated] = useState(false); // New: Tracks if first plan purchase is done
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
    if (!isActivated && id !== 'billing') {
      alert("Authorization Required: Please activate your workforce plan in the Billing Hub before accessing other protocols.");
      return;
    }
    setActiveTab(id);
  };

  const handleActivation = (tier: PlanTier) => {
    setIsActivated(true);
    setSubscription({
      ...subscription,
      tier,
      status: SubscriptionStatus.ACTIVE,
      credits: tier === PlanTier.STARTER ? 1500 : tier === PlanTier.GROWTH ? 5000 : 15000
    });
    setActiveTab('dashboard'); // Redirect to dashboard once activated
  };

  const filteredNavigation = navigation.map(group => ({
    ...group,
    items: group.items.filter(item => !item.role || item.role === userRole)
  })).filter(group => group.items.length > 0);

  return (
    <div className="flex h-screen bg-white text-slate-900 font-sans relative">
      {/* GLOBAL BANNER MATCHING SCREENSHOT PURPLE STYLE */}
      {!isActivated || subscription.tier === PlanTier.FREE ? (
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
      ) : null}

      <aside className={`w-80 bg-white border-r border-slate-100 flex flex-col z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] ${(!isActivated || subscription.overdue || subscription.tier === PlanTier.FREE) ? 'mt-[60px]' : ''}`}>
        <div className="p-8">
          <div className="p-4 flex justify-center group">
            <img 
              src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" 
              alt="Logo" 
              className="h-24 w-auto object-contain hover:scale-110 transition-transform duration-300 drop-shadow-xl"
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
                  disabled={!isActivated && item.id !== 'billing'}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all relative ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-[#5143E1] to-[#7164f0] text-white shadow-xl shadow-indigo-100'
                      : !isActivated && item.id !== 'billing' ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-300'} />
                  {item.name}
                  {((!isActivated && item.id !== 'billing') || (item.restrictedForFree && subscription.tier === PlanTier.FREE)) && (
                    <Lock size={12} className="ml-auto text-slate-300" />
                  )}
                  {item.badge && isActivated && (
                    <span className={`ml-auto w-5 h-5 ${activeTab === item.id ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600'} text-[9px] font-black flex items-center justify-center rounded-full`}>
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
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-black border border-indigo-100 text-sm shadow-inner">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-slate-900 truncate uppercase tracking-tight">Founders Hub</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{isActivated ? subscription.credits.toLocaleString() : 0} AI Credits</p>
            </div>
          </div>
          {(subscription.tier === PlanTier.FREE || !isActivated) && (
             <button onClick={() => setActiveTab('billing')} className="w-full py-4 bg-[#5143E1] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2">
                <ChevronUp size={14} /> {isActivated ? 'Go Unlimited' : 'Activate Pulse'}
             </button>
          )}
        </div>
      </aside>

      <main className={`flex-1 flex flex-col min-w-0 overflow-hidden bg-white ${(!isActivated || subscription.overdue || subscription.tier === PlanTier.FREE) ? 'mt-[60px]' : ''}`}>
        <header className="h-24 border-b border-slate-100 flex items-center justify-between px-12 shrink-0 z-20 bg-white">
          <h1 className="text-lg font-black text-slate-900 uppercase tracking-[0.4em]">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-6">
            <div className={`hidden sm:flex items-center gap-3 px-6 py-3 ${(!isActivated || subscription.overdue) ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'} rounded-2xl text-[11px] font-black uppercase tracking-widest border shadow-sm`}>
              <Activity size={18} className={(!isActivated || subscription.overdue) ? '' : 'animate-pulse text-emerald-500'} /> PROTOCOL: {(!isActivated || subscription.overdue) ? 'PAUSED' : 'RUNNING'}
            </div>
            <button 
              disabled={!isActivated || subscription.overdue || subscription.tier === PlanTier.FREE}
              onClick={() => setIsFormOpen(true)}
              className={`${(!isActivated || subscription.overdue || subscription.tier === PlanTier.FREE) ? 'bg-slate-200 cursor-not-allowed text-slate-400' : 'bg-[#E5E9F0] hover:bg-slate-200 text-slate-900 shadow-sm active:scale-95'} px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all border border-slate-200`}
            >
              <Plus size={20} /> Add Signal
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 bg-white relative">
          {!isActivated && activeTab !== 'billing' ? (
             <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white rounded-[4rem] border border-red-100 shadow-xl space-y-10 animate-in zoom-in-95 duration-500">
                <div className="w-36 h-36 bg-red-50 rounded-[4rem] flex items-center justify-center text-red-600 shadow-inner">
                    <Lock size={72} />
                </div>
                <div className="space-y-4 max-w-2xl">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight uppercase">Workforce Idle</h2>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed italic">
                      "Initial handshake incomplete. Your Digital Employee requires a fuel deposit to begin its shift. Access the Billing Hub to activate your chosen tier."
                    </p>
                </div>
                <button onClick={() => setActiveTab('billing')} className="px-14 py-6 bg-red-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-[2.5rem] hover:bg-red-700 transition-all shadow-2xl shadow-red-200 active:scale-95 flex items-center gap-5">
                  Activate workforce Protocol <ArrowRight size={24} />
                </button>
             </div>
          ) : subscription.overdue && activeTab !== 'billing' ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white rounded-[4rem] border border-red-100 shadow-xl space-y-10 animate-in zoom-in-95 duration-500">
               <div className="w-36 h-36 bg-red-50 rounded-[4rem] flex items-center justify-center text-red-600 shadow-inner relative">
                  <ShieldAlert size={72} />
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                    <Zap size={24} fill="currentColor" />
                  </div>
               </div>
               <div className="space-y-4 max-w-2xl">
                  <h2 className="text-5xl font-black text-slate-900 tracking-tight uppercase">Salary Handshake Failed</h2>
                  <p className="text-slate-500 text-xl font-medium leading-relaxed italic">
                    "Boss, our operational pulse is flat. The digital employee workforce has halted all campaigns, AI replies, and signal ingestion due to an overdue ledger. Settle the subscription to resume your growth."
                  </p>
               </div>
               <button onClick={() => setActiveTab('billing')} className="px-14 py-6 bg-red-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-[2.5rem] hover:bg-red-700 transition-all shadow-2xl shadow-red-200 active:scale-95 flex items-center gap-5">
                 Authorize Settlement & Resume Protocol <ArrowRight size={24} />
               </button>
            </div>
          ) : (
            <>
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
              {activeTab === 'reporting' && <ReportingManager />}
              {activeTab === 'partner' && <PartnerHub />}
              {activeTab === 'profile' && <UserProfile user={{ id: 'u_1', full_name: 'John Doe', email: 'john@digitalemployee.me', role: userRole, workspace: 'Workforce HQ' }} wallet_balance={subscription.credits} subscription={{ plan: subscription.tier.toUpperCase(), status: subscription.status, expiry: subscription.expiresAt }} />}
              {activeTab === 'campaigns' && (subscription.tier === PlanTier.FREE ? <FeatureLock description="Omnichannel Campaigns are locked." /> : <CampaignList onCreate={() => setIsCampaignBuilderOpen(true)} />)}
              {activeTab === 'analytics' && <LeadAnalytics />}
              {activeTab === 'schema' && <DatabaseSchema />}
              {activeTab === 'settings' && <div className="p-10 bg-white rounded-3xl border border-slate-200">Settings Protocol...</div>}
            </>
          )}
        </div>
      </main>

      {isFormOpen && <LeadForm onClose={() => setIsFormOpen(false)} />}
      {isCampaignBuilderOpen && <CampaignBuilder onClose={() => setIsCampaignBuilderOpen(false)} onSave={() => setIsCampaignBuilderOpen(false)} />}
      {isPostComposerOpen && <PostComposer onClose={() => setIsPostComposerOpen(false)} onSave={() => setIsPostComposerOpen(false)} />}
    </div>
  );
};

const FeatureLock: React.FC<{ description: string }> = ({ description }) => (
  <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white rounded-[5rem] border border-slate-100 shadow-sm space-y-12 animate-in zoom-in-95 duration-500">
    <div className="w-32 h-32 bg-indigo-50 rounded-[4rem] flex items-center justify-center text-indigo-600 shadow-inner group transition-transform hover:scale-110">
       <ShieldAlert size={64} />
    </div>
    <div className="space-y-4 max-w-xl mx-auto">
       <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Intelligence Restricted</h3>
       <p className="text-slate-500 text-lg font-medium leading-relaxed italic">"{description} Upgrade your workforce protocol to authorize these autonomous actions."</p>
    </div>
    <button className="px-14 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-4">
       Access Billing Hub <ArrowRight size={20} />
    </button>
  </div>
);

export default App;
