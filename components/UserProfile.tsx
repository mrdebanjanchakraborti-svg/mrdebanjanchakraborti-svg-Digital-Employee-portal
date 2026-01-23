import React, { useState } from 'react';
import { 
  User, Mail, Shield, Wallet, Layers, 
  Clock, CheckCircle2, ChevronRight, Zap, 
  Activity, ArrowRight, Building2, Smartphone, 
  Calendar, BadgeCheck, ExternalLink, RefreshCw,
  Camera, Upload, Loader2, Image as ImageIcon
} from 'lucide-react';
import { UserRole } from '../types';

interface UserProfileProps {
  user: {
    id: string;
    full_name: string;
    email: string;
    role: UserRole;
    workspace: string;
    avatar_url?: string;
    logo_url?: string;
  };
  wallet_balance: number;
  subscription: {
    plan: string;
    status: string;
    expiry: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user, wallet_balance, subscription }) => {
  const [isUploading, setIsUploading] = useState<'avatar' | 'logo' | null>(null);

  const handleUpload = (type: 'avatar' | 'logo') => {
    setIsUploading(type);
    // Simulation: Frontend selects file -> calls upload-to-gcs Supabase Edge Function
    // The function saves to: /users/{user.id}/profile/{type}.png
    setTimeout(() => {
      setIsUploading(null);
      alert(`${type.toUpperCase()} securely sync'd to GCS bucket and recorded in profiles table.`);
    }, 2000);
  };

  const workflowLogs = [
    { id: 'l1', name: 'Lead Recovery Action', status: 'Success', date: '2h ago' },
    { id: 'l2', name: 'WhatsApp Auto-Reply', status: 'Success', date: '4h ago' },
    { id: 'l3', name: 'AI Voice Outreach', status: 'Success', date: '1d ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Identity & Wallet */}
        <div className="w-full md:w-1/3 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm text-center space-y-6">
            <div className="relative w-32 h-32 mx-auto">
               <div className="w-32 h-32 bg-indigo-600 rounded-[3.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-100 border-8 border-slate-50 relative group overflow-hidden">
                  {user.avatar_url ? (
                    <img src={user.avatar_url} className="w-full h-full object-cover" alt="Avatar" />
                  ) : (
                    <User size={64} />
                  )}
                  {isUploading === 'avatar' && (
                    <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm flex items-center justify-center z-10">
                       <Loader2 size={24} className="text-white animate-spin" />
                    </div>
                  )}
                  <button 
                    onClick={() => handleUpload('avatar')}
                    className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                     <Camera size={24} className="text-white" />
                  </button>
               </div>
               <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-xl">
                  <Shield size={16} />
               </div>
            </div>

            <div>
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{user.full_name}</h3>
               <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1 flex items-center justify-center gap-2">
                 <Shield size={10} /> {user.role} Identity
               </p>
            </div>

            <div className="pt-6 border-t border-slate-50 space-y-4">
               <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-left">
                  <Mail size={16} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-600 truncate">{user.email}</span>
               </div>
               
               <div className="space-y-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-left ml-2">Business Logo (GCS)</p>
                  <button 
                    onClick={() => handleUpload('logo')}
                    className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-600 transition-all group"
                  >
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all overflow-hidden">
                           {isUploading === 'logo' ? <Loader2 size={14} className="animate-spin" /> : user.logo_url ? <img src={user.logo_url} /> : <ImageIcon size={14} />}
                        </div>
                        <span className="text-[10px] font-black uppercase text-slate-700">Sync Master Logo</span>
                     </div>
                     <Upload size={14} className="text-slate-300" />
                  </button>
               </div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black text-indigo-200 uppercase tracking-widest flex items-center gap-2">
                  <Wallet size={16} /> Ledger Solvency
                </h3>
                <BadgeCheck size={20} className="text-emerald-400" />
              </div>
              <p className="text-5xl font-black tracking-tighter">₹{wallet_balance.toLocaleString()}</p>
              <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-900/20 active:scale-95 transition-all">
                Instant Pulse Recharge
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
          </div>
        </div>

        {/* Subscription & Activity */}
        <div className="flex-1 space-y-8">
           <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
              <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-6">
                 <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Layers size={16} className="text-indigo-600" /> Subscription Protocol
                 </h3>
                 <span className="px-4 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest">Live Pulse</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Plan</p>
                    <p className="text-xl font-black text-slate-900 uppercase tracking-tighter">{subscription.plan}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pulse Status</p>
                    <p className="text-xl font-black text-emerald-600 uppercase tracking-tighter">{subscription.status}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiry Window</p>
                    <p className="text-xl font-black text-slate-900 uppercase tracking-tighter">{subscription.expiry}</p>
                 </div>
              </div>
              <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                 <p className="text-[11px] font-bold text-slate-400 italic">Auto-renewal enabled via Razorpay Handshake.</p>
                 <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                    Manage Billing <ExternalLink size={12} />
                 </button>
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
              <header className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                 <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Activity size={16} className="text-indigo-600" /> Recent Execution Pulse
                 </h3>
                 <button className="text-[10px] font-black text-indigo-600 uppercase hover:underline">Full Log Audit</button>
              </header>
              <div className="divide-y divide-slate-50">
                 {workflowLogs.map((log) => (
                    <div key={log.id} className="px-10 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                             <Zap size={18} />
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{log.name}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{log.date}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                             <CheckCircle2 size={12} />
                             <span className="text-[9px] font-black uppercase tracking-widest">{log.status}</span>
                          </div>
                          <ChevronRight size={18} className="text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;