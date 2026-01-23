
import React from 'react';
import { Plus, MessageSquare, Mail, Phone, Search, Copy, CheckCircle, Sparkles, Filter, MoreHorizontal } from 'lucide-react';

const TemplateManager: React.FC = () => {
  const templates = [
    { id: '1', name: 'Initial Handshake', channel: 'whatsapp', content: 'Hi {{name}}, thanks for showing interest in {{service}}! Our AI Agent Sarah is checking availability...', usage: 1240 },
    { id: '2', name: 'ROI Sheet Delivery', channel: 'email', content: 'Attached is the customized ROI analysis for {{company}}. This projection is based on your current scale.', usage: 852 },
    { id: '3', name: 'Demo Reminder', channel: 'sms', content: 'Quick reminder: Your demo with {{agent}} starts in 10 mins. Link: {{link}}', usage: 412 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Omnichannel Templates</h2>
          <p className="text-slate-500 text-sm font-medium">Standardize your AI Employee's vocabulary across all touchpoints.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
          <Plus size={18} /> New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map(t => (
          <div key={t.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white transition-all text-slate-400`}>
                   {t.channel === 'whatsapp' ? <MessageSquare size={20} /> : t.channel === 'email' ? <Mail size={20} /> : <Phone size={20} />}
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Executions</p>
                   <p className="text-xl font-black text-slate-900">{t.usage}</p>
                </div>
              </div>
              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4 group-hover:text-indigo-600 transition-colors">{t.name}</h4>
              <p className="text-xs font-medium text-slate-500 leading-relaxed italic line-clamp-4">"{t.content}"</p>
            </div>
            
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
               <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{t.channel}</span>
               <div className="flex gap-2">
                  <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"><Copy size={14}/></button>
                  <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"><MoreHorizontal size={14}/></button>
               </div>
            </div>
          </div>
        ))}
        
        <button className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all bg-white/50 group">
          <Sparkles size={40} className="mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-black uppercase tracking-widest">AI Content Generation</p>
        </button>
      </div>
    </div>
  );
};

export default TemplateManager;
