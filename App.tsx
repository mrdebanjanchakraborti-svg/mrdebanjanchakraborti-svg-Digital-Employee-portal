
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layout, Users, Settings, Shield, MessageSquare, 
  Zap, Megaphone, Share2, Sparkles, PhoneCall, 
  Crown, UserCircle, Archive, Rocket, ChevronUp, Lock, Radio, PlayCircle, History, Share, HeartPulse,
  Plus as PlusIcon, Wallet, Receipt, DollarSign, LogOut, Database,
  Loader2, X, CheckCircle2, RefreshCw, AlertCircle, PieChart, Award, Timer, ArrowRight
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
import { supabase, checkSupabaseConnection } from './supabase';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isActivated, setIsActivated] = useState(false); 
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCampaignBuilderOpen, setIsCampaignBuilderOpen] = useState(false);
  const [isPostComposerOpen, setIsPostComposerOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ADMIN);
  const [isSupabaseOnline, setIsSupabaseOnline] = useState<boolean | null>(null);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);
  
  // Persistent Workspace Settings
  const [workspaceInfo, setWorkspaceInfo] = useState({
    company: '',
    sector: '',
    whatsapp: '',
    voice: 'Zephyr'
  });

  const [subscription, setSubscription] = useState({
    tier: PlanTier.FREE, 
    status: SubscriptionStatus.PENDING_APPROVAL,
    overdue: false, 
    credits: 0, 
    expiresAt: '2024-12-30'
  });

  // IDENTITY SYNCHRONIZATION PULSE
  // This is the source of truth for the entire application state.
  const syncIdentityState = async (userId: string) => {
    try {
      const { data: workspace, error: wsError } = await supabase
        .from('workspaces')
        .select('*')
        .eq('owner_id', userId)
        .maybeSingle();

      if (wsError) throw wsError;

      if (workspace) {
        setActiveWorkspaceId(workspace.id);
        
        // Critical Persistence Fix: Deriving local state strictly from DB
        if (workspace.onboarding_completed) {
          setIsOnboardingComplete(true);
        }

        setWorkspaceInfo({
          company: workspace.company_name,
          sector: workspace.industry_sector,
          whatsapp: workspace.whatsapp_number,
          voice: workspace.preferred_voice
        });
        
        const { data: sub, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('workspace_id', workspace.id)
          .maybeSingle();

        if (subError) throw subError;

        if (sub) {
          // ENSURE ACCESS IS UNLOCKED ON LOGIN
          setIsActivated(true);
          setSubscription({
            tier: sub.plan_tier as PlanTier,
            status: sub.status as SubscriptionStatus,
            overdue: sub.overdue || false,
            credits: sub.credits_balance,
            expiresAt: sub.expires_at ? sub.expires_at.split('T')[0] : '2024-12-30'
          });
        } else {
          // If workspace exists but no sub record (should be rare due to DB trigger)
          setIsActivated(false);
        }
      } else {
        // No workspace found, user must onboard
        setIsOnboardingComplete(false);
        setIsActivated(false);
      }
    } catch (err) {
      console.error("Identity Sync Protocol Failed:", err);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setIsAuthenticated(!!session);
        if (session?.user) await syncIdentityState(session.user.id);
      } catch (err) {
        console.error("Auth session fetch failure:", err);
      } finally {
        setIsAuthChecking(false);
      }
    };
    initAuth();

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (event === 'PASSWORD_RECOVERY') setShowResetPasswordModal(true);
      if (session?.user) {
        await syncIdentityState(session.user.id);
      } else {
        setIsActivated(false);
        setIsOnboardingComplete(false);
        setActiveWorkspaceId(null);
      }
    });
    return () => authListener.unsubscribe();
  }, []);

  useEffect(() => {
    const checkConn = async () => {
      const online = await checkSupabaseConnection();
      setIsSupabaseOnline(online);
    };
    checkConn();
  }, []);

  const isExpired = useMemo(() => {
    if (!isActivated || subscription.tier !== PlanTier.FREE) return false;
    return new Date() > new Date(subscription.expiresAt);
  }, [subscription.expiresAt, subscription.tier, isActivated]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleActivation = async (tier: PlanTier) => {
    if (!session?.user || !activeWorkspaceId) {
       console.warn("Handshake Blocked: Session or Workspace ID missing.");
       return;
    }
    
    try {
      const tierCredits: Record<PlanTier, number> = {
        [PlanTier.FREE]: 200, [PlanTier.STARTER]: 1500, [PlanTier.GROWTH]: 6000, [PlanTier.PRO]: 15000, [PlanTier.ENTERPRISE]: 40500
      };
      
      const { error } = await supabase.from('subscriptions').upsert({ 
        workspace_id: activeWorkspaceId, 
        plan_tier: tier, 
        credits_balance: tierCredits[tier], 
        status: 'active', 
        overdue: false, 
        updated_at: new Date().toISOString() 
      });
      
      if (error) throw error;
      
      // IMMEDIATE ACCESS PULSE
      setIsActivated(true);
      setSubscription(prev => ({
        ...prev,
        tier: tier,
        status: SubscriptionStatus.ACTIVE,
        credits: tierCredits[tier]
      }));
      
      await syncIdentityState(session.user.id);
      setActiveTab('dashboard'); 
    } catch (err) {
      console.error("Plan Deployment Failure:", err);
      alert("Failed to deploy workforce plan to cloud ledger. Please retry authorization.");
    }
  };

  const handleRecharge = async (creditsToAdd: number) => {
    if (!activeWorkspaceId) return;
    try {
      const { data: currentSub } = await supabase.from('subscriptions').select('credits_balance').eq('workspace_id', activeWorkspaceId).single();
      const newBalance = (currentSub?.credits_balance || 0) + creditsToAdd;
      const { error } = await supabase.from('subscriptions').update({ credits_balance: newBalance, updated_at: new Date().toISOString() }).eq('workspace_id', activeWorkspaceId);
      if (error) throw error;
      if (session?.user) await syncIdentityState(session.user.id);
    } catch (err) {
      console.error("Ledger Injection Failure:", err);
    }
  };

  if (isAuthChecking) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#05070A] text-white p-6">
        <div className="border-2 border-[#3B82F6] p-16 md:p-24 flex flex-col items-center justify-center gap-12 min-w-[340px] md:min-w-[600px] animate-in fade-in zoom-in duration-1000 shadow-[0_0_100px_rgba(59,130,246,0.15)]">
          <div className="relative">
             <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin shadow-[0_0_30px_rgba(79,70,229,0.4)]" />
          </div>
          <p className="text-[12px] font-black uppercase tracking-[0.6em] animate-pulse text-white whitespace-nowrap text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            INITIALIZING IDENTITY HANDSHAKE
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />;

  if (!isOnboardingComplete) {
    return <OnboardingFlow onComplete={async () => {
      // Critical Fix: Sync state after onboarding to populate activeWorkspaceId
      if (session?.user) {
        await syncIdentityState(session.user.id);
        setIsOnboardingComplete(true);
        setActiveTab('billing'); 
      }
    }} />;
  }

  const navigation = [
    { section: 'Executive', items: [
      { id: 'ceo-cockpit', name: 'CEO Cockpit', icon: Crown, role: UserRole.ADMIN },
      { id: 'dashboard', name: 'Revenue Overview', icon: Layout, isCore: true },
    ]},
    { section: 'Intelligence', items: [
      { id: 'inbox', name: 'Unified Inbox', icon: MessageSquare, badge: 3 },
      { id: 'objections', name: 'Objection Library', icon: AlertCircle },
      { id: 'voice', name: 'Voice AI', icon: PhoneCall },
    ]},
    { section: 'Growth', items: [
      { id: 'leads', name: 'Sales Kanban', icon: Users },
      { id: 'campaigns', name: 'AI Campaigns', icon: Megaphone },
      { id: 'social', name: 'Social Planner', icon: Share2 },
      { id: 'creative', name: 'Content Engine', icon: Sparkles },
      { id: 'assets', name: 'Storage Vault', icon: Archive },
      { id: 'segments', name: 'Audience segments', icon: Layout },
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
    { section: 'Infrastructure', items: [
      { id: 'schema', name: 'Master Schema', icon: Shield },
      { id: 'profile', name: 'My Pulse Profile', icon: UserCircle, isCore: true },
      { id: 'settings', name: 'Settings', icon: Settings, isCore: true },
    ]}
  ];

  const handleTabChange = (id: string) => {
    // Basic access rules: Dashboard, Billing, Profile, and Schema are always open for authenticated users
    if (!isActivated && id !== 'billing' && id !== 'dashboard' && id !== 'profile' && id !== 'schema') {
      alert("Authorization Required: Please activate your workforce plan in the Billing Hub to unlock this protocol.");
      return;
    }
    setActiveTab(id);
  };

  return (
    <div className="flex h-screen bg-white text-slate-900 font-sans relative overflow-hidden">
      {showResetPasswordModal && <ResetPasswordModal onClose={() => setShowResetPasswordModal(false)} />}

      {!isActivated ? (
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-[#5143E1] text-white z-[100] flex items-center justify-center gap-6 px-10 border-b border-white/10 shadow-2xl animate-in slide-in-from-top duration-500">
           <Rocket size={20} className="animate-bounce" />
           <p className="text-[12px] font-black uppercase tracking-[0.25em]">Deployment Pending – Subscription required to authorize Pulse</p>
           <button onClick={() => setActiveTab('billing')} className="bg-white text-[#5143E1] px-6 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg">Activate Workforce</button>
        </div>
      ) : subscription.overdue ? (
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-red-600 text-white z-[100] flex items-center justify-between px-10 border-b border-white/10 shadow-2xl animate-in slide-in-from-top duration-500">
           <div className="flex items-center gap-3">
              <AlertCircle size={20} className="animate-pulse" />
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
           <button onClick={() => setActiveTab('billing')} className="bg-indigo-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg">
             {isExpired ? 'Restore Pulse (Upgrade)' : 'Scale to Starter'}
           </button>
        </div>
      ) : null}

      <aside className={`w-80 bg-white border-r border-slate-100 flex flex-col z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-500 ${(isActivated && (subscription.tier === PlanTier.FREE || subscription.overdue)) || !isActivated ? 'mt-[60px]' : ''}`}>
        <div className="p-8 flex justify-center">
          <img src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" alt="Logo" className="h-20 w-auto object-contain drop-shadow-xl" />
        </div>

        <nav className="flex-1 px-6 space-y-6 overflow-y-auto scrollbar-hide pb-10">
          {navigation.map((group) => (
            <div key={group.section} className="space-y-1">
              <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{group.section}</h4>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all relative ${
                    activeTab === item.id ? 'bg-gradient-to-r from-[#5143E1] to-[#7164f0] text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-300'} />
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50 bg-slate-50/30 space-y-4">
          <div className="flex items-center gap-3 px-4 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-black border border-indigo-100 text-xs shadow-inner shrink-0">
               {session?.user?.email?.substring(0, 2).toUpperCase() || 'ID'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-slate-900 truncate uppercase tracking-tight">{workspaceInfo.company || 'Identity Handshake'}</p>
              <p className="text-[8px] font-black text-slate-400 truncate mt-0.5">{session?.user?.email}</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-300 hover:text-rose-500 rounded-xl transition-all">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className={`flex-1 flex flex-col min-w-0 overflow-hidden bg-white transition-all duration-500 ${(isActivated && (subscription.tier === PlanTier.FREE || subscription.overdue)) || !isActivated ? 'mt-[60px]' : ''}`}>
        <header className="h-20 md:h-24 border-b border-slate-100 flex items-center justify-between px-6 md:px-12 shrink-0 z-20 bg-white">
          <h1 className="text-[12px] md:text-[14px] font-black text-slate-900 uppercase tracking-[0.4em] md:tracking-[0.6em] truncate pr-4">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="px-6 py-2.5 bg-[#E8F5F1] text-[#059669] rounded-2xl text-[11px] font-black uppercase tracking-widest border border-[#D1FAE5] shadow-sm">
              PROTOCOL: {isExpired ? 'SUSPENDED' : 'RUNNING'}
            </div>
            <button onClick={() => setIsFormOpen(true)} className="bg-[#E5E9F0] hover:bg-slate-200 text-slate-900 px-6 py-3 md:py-4 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 md:gap-3 transition-all border border-slate-200 shrink-0">
              <PlusIcon size={18} /> <span className="hidden sm:inline">ADD SIGNAL</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          <div className="p-6 md:p-12 h-full">
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
                {activeTab === 'billing' && <BillingManager onActivate={handleActivation} onRecharge={handleRecharge} globalBalance={subscription.credits} />}
                {activeTab === 'ledger' && <WalletLedger balance={subscription.credits} />}
                {activeTab === 'subscription-ledger' && <SubscriptionLedger />}
                {activeTab === 'reporting' && <ReportingManager />}
                {activeTab === 'partner' && <PartnerHub />}
                {activeTab === 'profile' && <UserProfile user={{ id: session?.user?.id || 'u_1', full_name: session?.user?.email?.split('@')[0] || 'User', email: session?.user?.email || '', role: userRole, workspace: workspaceInfo.company }} wallet_balance={subscription.credits} subscription={{ plan: subscription.tier.toUpperCase(), status: subscription.status, expiry: subscription.expiresAt }} />}
                {activeTab === 'campaigns' && <CampaignList onCreate={() => setIsCampaignBuilderOpen(true)} />}
                {activeTab === 'analytics' && <LeadAnalytics />}
                {activeTab === 'schema' && <DatabaseSchema />}
            </div>
          </div>
        </div>
      </main>

      {isFormOpen && <LeadForm onClose={() => setIsFormOpen(false)} />}
      {isCampaignBuilderOpen && <CampaignBuilder onClose={() => setIsCampaignBuilderOpen(false)} onSave={() => setIsCampaignBuilderOpen(false)} />}
      {isPostComposerOpen && <PostComposer onClose={() => setIsPostComposerOpen(false)} onSave={() => setIsPostComposerOpen(false)} />}
    </div>
  );
};

const ResetPasswordModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-white rounded-[3.5rem] shadow-2xl p-12 space-y-8 animate-in zoom-in-95 duration-300 text-center">
        <h3 className="text-3xl font-black text-slate-900 uppercase">SET NEW CIPHER</h3>
        {!success ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl" placeholder="New Password" />
            <button disabled={loading} className="w-full bg-[#5244E1] text-white py-6 rounded-[2rem] font-black uppercase">{loading ? 'Updating...' : 'Update Password'}</button>
          </form>
        ) : (
          <p className="text-emerald-600 font-bold">Password restored.</p>
        )}
      </div>
    </div>
  );
};

export default App;
