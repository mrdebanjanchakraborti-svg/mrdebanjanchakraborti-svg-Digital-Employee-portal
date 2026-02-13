
import React, { useState, useRef } from 'react';
import { 
  MessageCircle, Mail, Instagram, Facebook, Globe, Phone, 
  Search, Filter, Send, Sparkles, User, Info, MoreVertical,
  Flame, Calendar, MapPin, ExternalLink, Zap, Target,
  TrendingUp, Ghost, ShieldAlert, BadgeCheck, LifeBuoy,
  Loader2, Inbox, Plus, Maximize2, CheckCircle, Smile, AlertCircle, Clock,
  HeartPulse, UserPlus, Paperclip, SmilePlus, CheckCircle2, UserCheck, Smartphone, Settings2, Hash,
  Edit3, ArrowRight, MessageSquare, Brain, FileText, Upload
} from 'lucide-react';
// Fix: Removed non-existent SenderType member from types import
import { ConversationChannel, ConversationStatus, NormalizedMessage, Conversation, LeadStatus } from '../types';
import { generateReplySuggestions } from '../services/geminiService';

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    workspace_id: 'ws_123',
    lead_id: 'lead_1',
    channel: ConversationChannel.WHATSAPP,
    status: ConversationStatus.OPEN,
    priority: 'high',
    last_message_at: '2024-11-20T10:00:00Z',
    unread_count: 1,
    lead: {
      id: 'lead_1',
      workspace_id: 'ws_123',
      first_name: 'Elena',
      last_name: 'Gilbert',
      email: 'elena@mystic.com',
      company: 'Mystic Falls RE',
      industry: 'Real Estate',
      source: 'WhatsApp',
      status: LeadStatus.QUALIFIED,
      score: 94,
      priority: 'High',
      metadata: { city: 'Mumbai', source: 'IndiaMART' },
      created_at: '2024-10-01'
    }
  }
];

const MOCK_MESSAGES: NormalizedMessage[] = [
  {
    id: 'msg_1',
    conversation_id: 'conv_1',
    // Removed lead_id, channel, sender, and status to match NormalizedMessage interface in types.ts
    content: 'Hi, I am interested in the AI audit for my real estate portfolio. Can we talk about the pricing?',
    direction: 'inbound',
    created_at: '2024-11-20T09:55:00Z'
  }
];

const UnifiedInbox: React.FC = () => {
  const [selectedConvId, setSelectedConvId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedConv = MOCK_CONVERSATIONS.find(c => c.id === selectedConvId);
  const messages = MOCK_MESSAGES.filter(m => m.conversation_id === selectedConvId);

  const handleFileUpload = () => {
    if (!selectedConvId) return;
    setIsUploading(true);
    // Simulation: Frontend -> Supabase Edge Function -> GCS Bucket -> URL -> DB
    // Path: /inbox/{conversationId}/attachments/
    setTimeout(() => {
      setIsUploading(false);
      alert(`Asset mirrored to GCS vault: /inbox/${selectedConvId}/attachments/file.pdf`);
    }, 2000);
  };

  const handleSuggest = async () => {
    setIsGenerating(true);
    setSuggestions([]);
    try {
      if (selectedConv) {
        const result = await generateReplySuggestions(messages, {
          name: `${selectedConv.lead?.first_name} ${selectedConv.lead?.last_name}`,
          score: selectedConv.lead?.score,
        });
        setSuggestions(result);
      }
    } catch (e) { console.error(e); }
    finally { setIsGenerating(false); }
  };

  return (
    <div className="h-full flex overflow-hidden bg-white border border-slate-200 rounded-[3rem] shadow-sm animate-in fade-in duration-500">
      {/* LEFT PANEL */}
      <div className="w-80 flex flex-col bg-slate-50/50 border-r border-slate-100">
        <header className="p-6 border-b border-slate-100 bg-white space-y-4 shrink-0">
          <h2 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Business Nerve Center</h2>
          <div className="relative">
             <Search className="absolute left-4 top-3 text-slate-400" size={16} />
             <input type="text" placeholder="Search interactions..." className="w-full pl-11 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-[11px] font-black outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {MOCK_CONVERSATIONS.map(conv => (
            <button key={conv.id} onClick={() => setSelectedConvId(conv.id)} className={`w-full p-6 flex gap-4 text-left border-b border-slate-100 transition-all ${selectedConvId === conv.id ? 'bg-white shadow-xl z-10' : 'hover:bg-slate-50'}`}>
              <div className="w-12 h-12 rounded-[1.25rem] bg-slate-200 flex items-center justify-center font-black text-slate-500 text-sm shadow-inner group-hover:scale-105 transition-transform">
                {conv.lead?.first_name?.[0]}{conv.lead?.last_name?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 text-xs truncate tracking-tight">{conv.lead?.first_name} {conv.lead?.last_name}</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase">10:00 AM</span>
                </div>
                <p className="text-[10px] text-slate-500 truncate font-medium italic mt-0.5">Latest pulse recorded...</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MIDDLE PANEL */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {selectedConv ? (
          <>
            <header className="px-10 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100 group-hover:rotate-12 transition-transform"><MessageSquare size={20} /></div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Conversation: {selectedConv.lead?.first_name}</h3>
                    <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Live Logic Active
                    </p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"><Smartphone size={18} /></button>
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"><Settings2 size={18} /></button>
               </div>
            </header>

            <div className="flex-1 overflow-y-auto p-10 space-y-10 bg-slate-50/20 custom-scrollbar">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.direction === 'inbound' ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-4 duration-500`}>
                  <div className={`max-w-[75%] p-6 rounded-[2.5rem] text-sm shadow-sm relative ${msg.direction === 'inbound' ? 'bg-white border border-slate-100 text-slate-700 rounded-tl-none' : 'bg-indigo-600 text-white shadow-2xl rounded-tr-none'}`}>
                    <p className="leading-relaxed font-medium">{msg.content}</p>
                    <div className={`mt-3 text-[9px] flex items-center gap-2 font-black uppercase tracking-widest ${msg.direction === 'inbound' ? 'text-slate-400' : 'text-indigo-200'}`}>
                       {msg.created_at.split('T')[1].substring(0, 5)} • Delivered
                    </div>
                  </div>
                </div>
              ))}
              {isUploading && (
                <div className="flex justify-end animate-pulse">
                   <div className="bg-indigo-100 p-4 rounded-3xl flex items-center gap-3">
                      <Loader2 size={16} className="animate-spin text-indigo-600" />
                      <span className="text-[10px] font-black text-indigo-600 uppercase">Encrypting to GCS Vault...</span>
                   </div>
                </div>
              )}
            </div>

            <footer className="p-10 bg-white border-t border-slate-100 shrink-0">
               <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-[2.5rem] p-4 group-focus-within:ring-4 group-focus-within:ring-indigo-500/5 transition-all">
                  <div className="flex gap-1 shrink-0 px-2 border-r border-slate-200">
                     <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                     <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm group/btn"><Paperclip size={20} className="group-hover/btn:rotate-12 transition-transform" /></button>
                     <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm"><SmilePlus size={20} /></button>
                  </div>
                  <textarea 
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder="Mirror manual input or consult Strategic Brain..."
                    rows={1}
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium resize-none py-2 px-4 no-scrollbar"
                  />
                  <div className="flex gap-2 shrink-0 px-2">
                     <button onClick={handleSuggest} className="p-3 bg-white border border-slate-200 text-indigo-600 rounded-2xl shadow-sm hover:border-indigo-600 transition-all active:scale-95 group/ai">
                       {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} className="group-hover/ai:scale-110 transition-transform" />}
                     </button>
                     <button className="p-3 bg-slate-900 text-white rounded-2xl shadow-2xl active:scale-95 hover:bg-indigo-600 transition-all"><Send size={20} /></button>
                  </div>
               </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300 opacity-20"><Inbox size={48} /></div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="w-80 overflow-y-auto p-10 bg-white space-y-12 shrink-0 border-l border-slate-100 custom-scrollbar">
         <div className="text-center space-y-6">
            <div className="w-24 h-24 rounded-[3rem] bg-indigo-600 mx-auto flex items-center justify-center shadow-2xl border-8 border-slate-50 relative overflow-hidden group">
               <User size={48} className="text-white group-hover:scale-110 transition-transform" />
            </div>
            <div>
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{selectedConv?.lead?.first_name} {selectedConv?.lead?.last_name}</h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{selectedConv?.lead?.company}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
               <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg uppercase tracking-widest border border-indigo-100">Score: {selectedConv?.lead?.score}</span>
               <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[9px] font-black rounded-lg uppercase tracking-widest border border-orange-100">High Intent</span>
            </div>
         </div>

         <div className="space-y-6 pt-10 border-t border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
               <Brain size={14} className="text-indigo-600" /> Brain Analysis
            </h4>
            <div className="space-y-4">
               <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Detection Pulse</p>
                  <p className="text-[11px] font-bold text-slate-700 leading-relaxed italic">"Lead is querying specific ROI metrics and implementation speed."</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default UnifiedInbox;
