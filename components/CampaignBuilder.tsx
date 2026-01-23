
import React, { useState } from 'react';
import { 
  Megaphone, Target, MessageCircle, Mail, Phone, 
  Send, Sparkles, Loader2, ArrowRight, ArrowLeft,
  Calendar, CheckCircle2, UserPlus, Filter, Users, Globe, Zap,
  Clock, BarChart3, TrendingUp, Upload, FileText, Video as VideoIcon,
  Image as ImageIcon, Archive
} from 'lucide-react';
import { generateCampaignContent } from '../services/geminiService';
import { CampaignType, CampaignGoal } from '../types';

interface CampaignBuilderProps {
  onClose: () => void;
  onSave: (campaign: any) => void;
}

const steps = [
  { id: 'type', name: 'Campaign Type', icon: Megaphone },
  { id: 'goal', name: 'Strategic Goal', icon: Target },
  { id: 'audience', name: 'Audience Segment', icon: Users },
  { id: 'channel', name: 'Omnichannel Selection', icon: Globe },
  { id: 'assets', name: 'Binary Assets (GCS)', icon: Archive },
  { id: 'content', name: 'AI Content Logic', icon: Sparkles },
  { id: 'schedule', name: 'Temporal Pulse', icon: Clock },
  { id: 'review', name: 'Deploy Employee', icon: Send }
];

const CampaignBuilder: React.FC<CampaignBuilderProps> = ({ onClose, onSave }) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [campaignData, setCampaignData] = useState({
    id: 'camp_' + Math.random().toString(36).substr(2, 9),
    name: '',
    type: CampaignType.LEAD_GEN,
    goal: CampaignGoal.BOOK_CALLS,
    audience: 'Cold Leads',
    channels: ['whatsapp'] as string[],
    assets: [] as { id: string; url: string; type: string }[],
    tone: 'Professional',
    language: 'Hinglish',
    offer: 'Free AI Strategy Audit (Valued at $500)',
    contentVariations: [] as any[],
    scheduledAt: 'now' as 'now' | 'later' | 'ai_best'
  });

  const handleUploadAsset = () => {
    setIsUploading(true);
    // Simulation: Frontend upload -> Supabase Edge Function -> GCS bucket
    // GCS Path: /campaigns/{campaignData.id}/images/
    setTimeout(() => {
      const newAsset = { id: Date.now().toString(), url: '#', type: 'image' };
      setCampaignData({ ...campaignData, assets: [...campaignData.assets, newAsset] });
      setIsUploading(false);
      alert("Binary asset securely sync'd to campaign folder in GCS.");
    }, 1500);
  };

  const handleGenerateContent = async () => {
    setIsLoading(true);
    try {
      const variations = await generateCampaignContent({
        business_type: 'Real Estate Developer',
        campaign_goal: campaignData.goal,
        audience_segment: campaignData.audience,
        offer_details: campaignData.offer,
        tone: campaignData.tone,
        channel: campaignData.channels[0]
      });
      setCampaignData({ ...campaignData, contentVariations: variations });
      setStep(step + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChannel = (cId: string) => {
    if (campaignData.channels.includes(cId)) {
      setCampaignData({ ...campaignData, channels: campaignData.channels.filter(c => c !== cId) });
    } else {
      setCampaignData({ ...campaignData, channels: [...campaignData.channels, cId] });
    }
  };

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <header className="px-10 py-8 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Zap size={24} fill="currentColor" />
             </div>
             <div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Deploy AI Workforce</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Protocol {step + 1} of {steps.length}: {currentStep.name}</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            {steps.map((s, idx) => (
              <div 
                key={s.id} 
                className={`w-3 h-3 rounded-full transition-all duration-500 border ${
                  idx === step ? 'bg-indigo-600 border-indigo-600 w-10' : idx < step ? 'bg-emerald-50 border-emerald-500' : 'bg-slate-50 border-slate-200'
                }`} 
              />
            ))}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-12 bg-slate-50/20">
          {step === 0 && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: CampaignType.LEAD_GEN, name: 'Lead Generation', desc: 'Acquire new identities' },
                    { id: CampaignType.NURTURE, name: 'Lead Nurture', desc: 'Build relationship trust' },
                    { id: CampaignType.REENGAGE, name: 'Re-engagement', desc: 'Recover cold pipeline' },
                    { id: CampaignType.OFFER, name: 'Offer / Promotion', desc: 'Drive instant conversion' },
                    { id: CampaignType.UPSELL, name: 'Upsell / Cross-sell', desc: 'Maximize LTV' },
                    { id: CampaignType.REVIEW, name: 'Review / Referral', desc: 'Scale social proof' }
                  ].map(type => (
                    <button 
                      key={type.id}
                      onClick={() => setCampaignData({...campaignData, type: type.id as any})}
                      className={`p-6 border rounded-[2rem] text-left transition-all group ${
                        campaignData.type === type.id ? 'bg-white border-indigo-600 shadow-xl ring-4 ring-indigo-500/5' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <h4 className={`font-black uppercase text-xs tracking-widest mb-1 ${campaignData.type === type.id ? 'text-indigo-600' : 'text-slate-900'}`}>{type.name}</h4>
                      <p className="text-[11px] font-medium text-slate-500">{type.desc}</p>
                    </button>
                  ))}
               </div>
               <div className="space-y-1.5 pt-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Campaign Identifier</label>
                  <input 
                    type="text" 
                    value={campaignData.name}
                    onChange={e => setCampaignData({...campaignData, name: e.target.value})}
                    placeholder="e.g. Q4 Real Estate Recovery"
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 outline-none font-bold text-sm" 
                  />
                </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="p-8 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 space-y-6 text-center">
                     <Archive size={48} className="text-indigo-400 mx-auto" />
                     <h3 className="text-2xl font-black uppercase tracking-tight">Campaign Binary Handshake</h3>
                     <p className="text-slate-400 text-sm max-w-md mx-auto">Upload images, PDFs, or videos to GCS for use in your omnichannel outreach.</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <button 
                          onClick={handleUploadAsset}
                          disabled={isUploading}
                          className="p-8 border-2 border-dashed border-white/20 rounded-[2rem] flex flex-col items-center gap-3 hover:bg-white/5 transition-all group"
                        >
                           {isUploading ? <Loader2 size={32} className="animate-spin text-indigo-400" /> : <ImageIcon size={32} className="text-slate-500 group-hover:text-indigo-400 transition-all" />}
                           <span className="text-[10px] font-black uppercase tracking-widest">Add Media / PDF</span>
                        </button>
                        <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] space-y-4 text-left overflow-y-auto max-h-40 no-scrollbar">
                           <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Synced Objects ({campaignData.assets.length})</h4>
                           {campaignData.assets.map(a => (
                             <div key={a.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                                <div className="flex items-center gap-2">
                                   <FileText size={14} className="text-indigo-400" />
                                   <span className="text-[10px] font-bold text-indigo-100 uppercase">campaign_pulse_{a.id.slice(-4)}.obj</span>
                                </div>
                                <CheckCircle2 size={14} className="text-emerald-400" />
                             </div>
                           ))}
                           {campaignData.assets.length === 0 && <p className="text-[10px] text-slate-600 italic">No assets linked to protocol.</p>}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: CampaignGoal.GET_REPLIES, name: 'Get More Replies', desc: 'AI optimizes for high conversational engagement' },
                    { id: CampaignGoal.BOOK_CALLS, name: 'Book Demo Calls', desc: 'AI pushes for calendar appointments' },
                    { id: CampaignGoal.CLOSE_DEALS, name: 'Close Revenue', desc: 'AI focusing on direct checkout/payment signals' },
                    { id: CampaignGoal.DRIVE_TRAFFIC, name: 'Drive Web Traffic', desc: 'AI optimizes for link click-through-rates' },
                    { id: CampaignGoal.COLLECT_REVIEWS, name: 'Collect Social Proof', desc: 'AI optimizes for review link submissions' }
                  ].map(goal => (
                    <button 
                      key={goal.id}
                      onClick={() => setCampaignData({...campaignData, goal: goal.id})}
                      className={`p-6 border rounded-3xl text-left transition-all flex items-center justify-between group ${
                        campaignData.goal === goal.id ? 'bg-white border-indigo-600 shadow-xl ring-4 ring-indigo-500/5' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <h4 className={`font-black uppercase text-xs tracking-widest mb-1 ${campaignData.goal === goal.id ? 'text-indigo-600' : 'text-slate-900'}`}>{goal.name}</h4>
                        <p className="text-[11px] font-medium text-slate-500">{goal.desc}</p>
                      </div>
                      {campaignData.goal === goal.id && <CheckCircle2 size={24} className="text-indigo-600" />}
                    </button>
                  ))}
               </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: 'all', name: 'Complete Ledger', desc: 'All leads in workspace (1,284 total)', count: 1284 },
                    { id: 'hot', name: 'High Intent (Hot)', desc: 'Score > 80, active within 48h', count: 42 },
                    { id: 'warm', name: 'Interested (Warm)', desc: 'Score 30-79, seen pricing', count: 156 },
                    { id: 'cold', name: 'Inactive (Cold)', desc: 'No signal for > 30 days', count: 482 },
                    { id: 'custom', name: 'Custom Segment...', desc: 'Industry: Real Estate, City: Mumbai', count: 18 }
                  ].map(seg => (
                    <button 
                      key={seg.id}
                      onClick={() => setCampaignData({...campaignData, audience: seg.name})}
                      className={`p-6 border rounded-[2.5rem] text-left transition-all flex items-center justify-between group ${
                        campaignData.audience === seg.name ? 'bg-white border-indigo-600 shadow-xl ring-4 ring-indigo-500/5' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-6">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${campaignData.audience === seg.name ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                            <Users size={28} />
                         </div>
                         <div>
                            <h4 className={`font-black uppercase text-sm tracking-tighter mb-1 ${campaignData.audience === seg.name ? 'text-indigo-600' : 'text-slate-900'}`}>{seg.name}</h4>
                            <p className="text-[11px] font-medium text-slate-500 italic">{seg.desc}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identities</p>
                         <p className="text-2xl font-black text-slate-900">{seg.count}</p>
                      </div>
                    </button>
                  ))}
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in duration-500 text-center">
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Select Dispatch Interfaces</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', color: 'text-emerald-600' },
                    { id: 'email', icon: Mail, label: 'Email Hub', color: 'text-indigo-600' },
                    { id: 'sms', icon: MessageCircle, label: 'Carrier SMS', color: 'text-blue-600' },
                    { id: 'voice', icon: Phone, label: 'Voice AI', color: 'text-orange-600' },
                    { id: 'fb', icon: Globe, label: 'Facebook', color: 'text-blue-500' },
                    { id: 'ig', icon: Globe, label: 'Instagram', color: 'text-pink-500' },
                    { id: 'li', icon: Globe, label: 'LinkedIn', color: 'text-blue-700' },
                    { id: 'gmb', icon: Globe, label: 'GMB Post', color: 'text-blue-400' }
                  ].map(c => (
                    <button 
                      key={c.id}
                      onClick={() => toggleChannel(c.id)}
                      className={`flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border transition-all ${
                        campaignData.channels.includes(c.id) 
                          ? 'bg-white border-indigo-600 shadow-2xl ring-4 ring-indigo-500/5' 
                          : 'bg-white border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300'
                      }`}
                    >
                      <div className={`p-4 rounded-2xl bg-slate-50 transition-all ${campaignData.channels.includes(c.id) ? c.color.replace('text-', 'bg-').replace('-600', '-50') + ' ' + c.color : 'text-slate-400'}`}>
                        <c.icon size={32} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${campaignData.channels.includes(c.id) ? 'text-indigo-600' : 'text-slate-500'}`}>{c.label}</span>
                    </button>
                  ))}
               </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="p-8 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                     <div className="flex items-center gap-3">
                        <Sparkles size={24} className="text-indigo-400" />
                        <h3 className="text-xl font-black uppercase tracking-tight">AI Content Configuration</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tone of Voice</label>
                           <select 
                            value={campaignData.tone}
                            onChange={e => setCampaignData({...campaignData, tone: e.target.value})}
                            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/20 text-sm font-bold appearance-none"
                           >
                              <option className="bg-slate-900">Professional</option>
                              <option className="bg-slate-900">Witty / Creative</option>
                              <option className="bg-slate-900">Urgent / Scarcity</option>
                              <option className="bg-slate-900">Helpful / Soft</option>
                           </select>
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Language Logic</label>
                           <select 
                            value={campaignData.language}
                            onChange={e => setCampaignData({...campaignData, language: e.target.value})}
                            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/20 text-sm font-bold appearance-none"
                           >
                              <option className="bg-slate-900">English (Global)</option>
                              <option className="bg-slate-900">Hindi (Pure)</option>
                              <option className="bg-slate-900">Hinglish (Mix)</option>
                           </select>
                        </div>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">The Core Offer / CTA</label>
                        <textarea 
                          value={campaignData.offer}
                          onChange={e => setCampaignData({...campaignData, offer: e.target.value})}
                          rows={3}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-500/20 text-sm font-bold resize-none shadow-inner"
                        />
                     </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl" />
               </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: 'now', name: 'Immediate Dispatch', desc: 'Send to all targets right now', icon: Send },
                    { id: 'ai_best', name: 'AI Optimization Pulse', desc: 'Predict best engagement hour per lead', icon: Sparkles },
                    { id: 'later', name: 'Fixed Schedule', desc: 'Select a specific temporal window', icon: Calendar }
                  ].map(mode => (
                    <button 
                      key={mode.id}
                      onClick={() => setCampaignData({...campaignData, scheduledAt: mode.id as any})}
                      className={`p-8 border rounded-[3rem] text-left transition-all flex items-center justify-between group ${
                        campaignData.scheduledAt === mode.id ? 'bg-white border-indigo-600 shadow-xl ring-4 ring-indigo-500/5' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-8">
                         <div className={`p-4 rounded-3xl transition-all ${campaignData.scheduledAt === mode.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            <mode.icon size={32} />
                         </div>
                         <div>
                            <h4 className={`font-black uppercase text-sm tracking-widest mb-1 ${campaignData.scheduledAt === mode.id ? 'text-indigo-600' : 'text-slate-900'}`}>{mode.name}</h4>
                            <p className="text-[11px] font-medium text-slate-500 italic">{mode.desc}</p>
                         </div>
                      </div>
                    </button>
                  ))}
               </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-10 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp size={14} className="text-emerald-500" /> Dispatch Blueprint
                     </h4>
                     <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                           <span className="text-[10px] font-black text-slate-400 uppercase">Targets</span>
                           <span className="text-xl font-black text-slate-900">{campaignData.audience} (1,284)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                           <span className="text-[10px] font-black text-slate-400 uppercase">Assets (GCS)</span>
                           <span className="text-sm font-black text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-lg">{campaignData.assets.length} Sync'd Objects</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-slate-400 uppercase">AI Strategy</span>
                           <span className="text-[11px] font-black text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-lg">Enabled: {campaignData.goal.replace(/_/g, ' ')}</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles size={14} className="text-indigo-600" /> AI Content Selection
                     </h4>
                     <div className="space-y-4">
                        {campaignData.contentVariations.slice(0, 2).map((v, i) => (
                           <div key={i} className="p-6 bg-slate-900 text-indigo-100 rounded-[2rem] text-xs font-medium italic leading-relaxed border border-slate-800 shadow-2xl relative overflow-hidden">
                              <div className="absolute top-2 right-4 text-[8px] font-black uppercase text-indigo-400">Variant {v.variation}</div>
                              "{v.content.substring(0, 150)}..."
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}
        </main>

        <footer className="p-10 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <button 
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-700 disabled:opacity-0 transition-all"
          >
            <ArrowLeft size={18} />
            Reverse Protocol
          </button>
          
          <div className="flex gap-4">
            {step === 5 ? (
              <button 
                onClick={handleGenerateContent}
                disabled={isLoading}
                className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/30 disabled:opacity-50 active:scale-95"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                {isLoading ? 'Consulting Brain...' : 'Commit content Logic'}
              </button>
            ) : (
              <button 
                onClick={() => step < 7 ? setStep(step + 1) : onSave(campaignData)}
                className="flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-95"
              >
                {step === 7 ? 'Authorize Global Launch' : 'Advance Sequence'}
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default CampaignBuilder;
