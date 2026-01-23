
import React, { useState } from 'react';
import { 
  ShieldAlert, Search, Filter, MessageSquare, Phone, 
  Copy, CheckCircle, ChevronRight, Zap, Target,
  Sparkles, Plus, Edit3, Trash2, Globe, Database, History
} from 'lucide-react';

const OBJECTION_DATA = [
  {
    id: 'obj_1',
    objection_key: 'price',
    category: 'Pricing',
    objection: '“Too expensive” / “Budget nahi hai”',
    whatsapp: 'Totally understand, {{name}}. Actually, most of our clients initially felt the same – until they saw how much revenue leakage was happening due to missed follow-ups, delayed replies, and manual work.\n\nInstead of cost, we usually look at:\n👉 How many leads are you losing today?\n👉 What is the value of just 1 extra conversion per month?\n\nIn most cases, the system recovers its cost in the first 7–10 days itself.\n\nWould you like me to show you a quick example based on your business?',
    call: 'I completely understand, price is important. Just one quick question – how many leads do you roughly get in a month? (Wait for answer) Now imagine even 2–3 extra conversions from those leads because follow-up becomes instant and consistent. That additional revenue usually becomes much higher than the tool cost.',
    tone: 'Consultative',
    language: 'Hinglish'
  },
  {
    id: 'obj_2',
    objection_key: 'already_using',
    category: 'Competitor',
    objection: '“Already using a CRM / Tool”',
    whatsapp: 'That’s actually great, {{name}} – it means you already believe in systems 👍\n\nMay I ask, does your current tool:\n• Auto-follow-up on WhatsApp?\n• Reply to leads 24x7?\n• Recover missed calls?\n• Re-engage cold leads automatically?\n\nMost CRMs only store data – we actually **work on the data**.\n\nThat’s the difference. Would you like to see how it works alongside your existing system?',
    call: 'Perfect, that’s good to hear. Most of our customers also had CRMs before coming to us. The problem was not data. The problem was: No instant replies, no consistent follow-up, no automation in conversations. We don’t replace your CRM. We sit on top of it and make it perform.',
    tone: 'Confident',
    language: 'Hinglish'
  },
  {
    id: 'obj_3',
    objection_key: 'not_priority',
    category: 'Priority',
    objection: '“Not a priority right now”',
    whatsapp: 'Understood {{name}}, and I respect that.\n\nJust one small thought: Your leads are coming daily, whether it is priority or not. If follow-up is delayed, those leads are already talking to competitors.\n\nEven if you start small, at least your enquiries won’t go cold.\n\nWould you be open to a 10-min overview, no commitment?',
    call: 'Totally understand, and I’m not asking you to change everything today. But leads don’t wait. Competitors reply in minutes, not days. Even if you just automate first response + follow-up, you protect your pipeline.',
    tone: 'Respectful',
    language: 'Hinglish'
  },
  {
    id: 'obj_4',
    objection_key: 'delay',
    category: 'Brush-off',
    objection: '“Send details” / “Email kar do”',
    whatsapp: 'Sure {{name}}, I’ll send the details.\n\nJust so I send the most relevant info – are you mainly looking for:\n1️⃣ Lead generation\n2️⃣ Follow-up automation\n3️⃣ WhatsApp & call handling\nor\n4️⃣ Complete sales automation?\n\nThis will help me customise it for you.',
    call: 'Of course, I’ll send it over. To make it useful, are you focused on scaling generation or just managing existing enquiries better? I’ll send the specific module details.',
    tone: 'Helpful',
    language: 'English'
  },
  {
    id: 'obj_5',
    objection_key: 'trust',
    category: 'AI Reliability',
    objection: '“We don’t trust AI”',
    whatsapp: 'Valid concern, {{name}}. That’s why our AI is not random. It follows your business rules, your scripts, and your approval workflows. Think of it as a trained junior executive, not a robot.',
    call: 'I agree with you, blindly trusting AI is risky. That’s why our system is AI-assisted, not AI-controlled. You remain the decision maker.',
    tone: 'Soft',
    language: 'Hinglish'
  }
];

const ObjectionLibrary: React.FC = () => {
  const [selectedId, setSelectedId] = useState(OBJECTION_DATA[0].id);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'call'>('whatsapp');
  const [copied, setCopied] = useState(false);

  const activeObj = OBJECTION_DATA.find(o => o.id === selectedId);

  const handleCopy = () => {
    const text = activeTab === 'whatsapp' ? activeObj?.whatsapp : activeObj?.call;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-600 rounded-2xl shadow-xl">
                <ShieldAlert size={28} className="text-white" />
              </div>
              <h2 className="text-4xl font-black tracking-tight uppercase">Objection Script Library</h2>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed font-medium italic">
              Standardize your Digital Employee's responses to price, trust, and competitor hurdles.
            </p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                <Globe size={16} className="text-indigo-400" /> Export CSV
             </button>
             <button className="flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-2xl shadow-orange-500/20 active:scale-95">
                <Plus size={18} /> New Objection Type
             </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: Categories */}
        <div className="space-y-4">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={16} />
            <input type="text" placeholder="Search keys..." className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm" />
          </div>
          
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Objection Protocol</h3>
          <div className="space-y-2">
            {OBJECTION_DATA.map(obj => (
              <button 
                key={obj.id}
                onClick={() => setSelectedId(obj.id)}
                className={`w-full p-5 text-left rounded-2xl border transition-all group flex items-center justify-between ${
                  selectedId === obj.id 
                    ? 'bg-white border-orange-500 shadow-xl ring-4 ring-orange-500/5' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="min-w-0">
                  <h4 className={`font-black uppercase text-[10px] tracking-widest mb-1 ${selectedId === obj.id ? 'text-orange-600' : 'text-slate-400'}`}>
                    {obj.objection_key}
                  </h4>
                  <p className={`text-xs font-bold truncate ${selectedId === obj.id ? 'text-slate-900' : 'text-slate-500'}`}>
                    {obj.objection}
                  </p>
                </div>
                <ChevronRight size={16} className={selectedId === obj.id ? 'text-orange-600' : 'text-slate-300'} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Area: Script Viewer */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex flex-col min-h-[500px]">
            <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/30">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[2rem] bg-white border border-slate-200 text-orange-600 flex items-center justify-center shadow-sm">
                  <Target size={32} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 uppercase tracking-tight text-xl">{activeObj?.objection}</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[8px] font-black uppercase rounded-lg border border-orange-100">
                      {activeObj?.tone} Tone
                    </span>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase rounded-lg border border-indigo-100">
                      {activeObj?.language}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all"><Edit3 size={18} /></button>
              </div>
            </header>

            <div className="flex-1 flex flex-col">
              <div className="px-10 py-6 border-b border-slate-100 flex gap-4">
                <button 
                  onClick={() => setActiveTab('whatsapp')}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'whatsapp' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                >
                  <MessageSquare size={14} /> WhatsApp
                </button>
                <button 
                  onClick={() => setActiveTab('call')}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'call' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                >
                  <Phone size={14} /> Call Script
                </button>
              </div>

              <div className="flex-1 p-10 space-y-10 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={14} className="text-orange-500" /> Personalization Logic
                    </h4>
                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] relative overflow-hidden">
                      <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                        "{activeTab === 'whatsapp' ? activeObj?.whatsapp : activeObj?.call}"
                      </p>
                      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-2">
                         <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-bold text-slate-400">#name</span>
                         <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-bold text-slate-400">#business</span>
                         <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-bold text-slate-400">#city</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles size={14} className="text-indigo-500" /> AI Memory Update
                    </h4>
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                       <div className="space-y-6 relative z-10">
                          <div className="flex items-center gap-3">
                             <div className="p-2 bg-indigo-600 rounded-xl">
                                <Database size={16} className="text-white" />
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">ledger_sync: active</p>
                                <p className="text-xs text-slate-400 font-bold">Writing persistent memory...</p>
                             </div>
                          </div>
                          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl font-mono text-[10px] text-indigo-300">
                             INSERT INTO ai_memory (lead_id, key, val) <br/>
                             VALUES (lead_uuid, 'objection', '{activeObj?.objection_key}')
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed italic">
                            This ensures the AI never forgets this lead's concern, allowing for intelligent follow-ups later.
                          </p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 bg-indigo-50/50 border border-indigo-100 rounded-[3rem] flex gap-8 items-start">
             <div className="p-4 bg-white rounded-3xl shadow-sm">
                <History size={32} className="text-indigo-600" />
             </div>
             <div>
                <h4 className="text-lg font-black text-indigo-950 uppercase tracking-tight mb-2">Automated Next Action</h4>
                <p className="text-sm text-indigo-700/80 font-medium leading-relaxed">
                  After dispatching an objection response, the system automatically schedules a <strong className="text-indigo-900 uppercase">Follow-up Pulse</strong> (+2 hours) to ensure the lead is still engaged.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectionLibrary;
