import React, { useState, useEffect } from 'react';
import { 
  Webhook, RadioReceiver, Activity, Plus, Copy, Trash2, 
  Lock, Globe, CheckSquare, Search, Terminal, ExternalLink,
  Shield, CheckCircle, RefreshCw, AlertCircle, Info
} from 'lucide-react';

const AVAILABLE_EVENTS = [
  { id: 'contact.created', label: 'New Contact Created' },
  { id: 'deal.won', label: 'Deal / Lead Won' },
  { id: 'deal.lost', label: 'Deal / Lead Lost' },
  { id: 'payment.success', label: 'Payment Received' }
];

const IntegrationPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing'>('incoming');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mock State for Incoming
  const [incomingHooks, setIncomingHooks] = useState([
    { 
      id: '1', 
      name: 'Website Landing Page', 
      identifier: 'website-landing', 
      description: 'Captured from main website form',
      secret_token: 'whsk_7d9f3b1a2e4c', 
      status: 'active',
      last_pulse: '2m ago'
    },
    { 
      id: '2', 
      name: 'Facebook Lead Ads', 
      identifier: 'facebook-leads', 
      description: 'Q4 Real Estate Campaign',
      secret_token: 'whsk_a1b2c3d4e5f6', 
      status: 'active',
      last_pulse: '1h ago'
    },
    { 
      id: '3', 
      name: 'Website Lead Form', 
      identifier: 'website-lead', 
      description: 'Capture leads from website form',
      secret_token: 'whsk_b9c8d7e6f5a4', 
      status: 'active',
      last_pulse: 'Never'
    }
  ]);

  // Mock State for Outgoing
  const [outgoingHooks, setOutgoingHooks] = useState([
    { 
      id: 'out_1', 
      name: 'Accounting ERP', 
      url: 'https://api.accounting.com/hooks', 
      events: ['deal.won', 'payment.success'],
      status: 'active'
    },
    { 
      id: 'out_2', 
      name: 'n8n', 
      url: 'https://tally.example.com/webhook', 
      events: ['deal.won'],
      status: 'active'
    }
  ]);

  // Form State
  const [newWhName, setNewWhName] = useState('');
  const [newWhDesc, setNewWhDesc] = useState('');
  const [newWhUrl, setNewWhUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleEvent = (evtId: string) => {
    if (selectedEvents.includes(evtId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== evtId));
    } else {
      setSelectedEvents([...selectedEvents, evtId]);
    }
  };

  const handleCreate = () => {
    if (activeTab === 'incoming') {
      const newHook = {
        id: Date.now().toString(),
        name: newWhName,
        identifier: newWhName.toLowerCase().replace(/\s+/g, '-'),
        description: newWhDesc,
        secret_token: 'whsk_' + Math.random().toString(36).substr(2, 9),
        status: 'active',
        last_pulse: 'Never'
      };
      setIncomingHooks([newHook, ...incomingHooks]);
    } else {
      const newHook = {
        id: Date.now().toString(),
        name: newWhName,
        url: newWhUrl,
        events: selectedEvents,
        status: 'active'
      };
      setOutgoingHooks([newHook, ...outgoingHooks]);
    }
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNewWhName('');
    setNewWhDesc('');
    setNewWhUrl('');
    setSelectedEvents([]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <Webhook className="w-8 h-8 text-indigo-600" />
            Integration Hub
          </h1>
          <p className="text-sm text-slate-500 font-medium">Connect your CRM to the global network using secure Webhook protocols.</p>
        </div>
        
        <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm">
          <button 
            onClick={() => setActiveTab('incoming')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'incoming' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <RadioReceiver size={14} /> Incoming Webhooks
          </button>
          <button 
            onClick={() => setActiveTab('outgoing')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'outgoing' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Activity size={14} /> Outgoing Webhooks
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex flex-col min-h-[600px]">
        <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30 shrink-0">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl ${activeTab === 'incoming' ? 'bg-indigo-600' : 'bg-slate-900'}`}>
              {activeTab === 'incoming' ? <RadioReceiver size={24} /> : <Activity size={24} />}
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                {activeTab === 'incoming' ? 'Incoming Data Protocol' : 'Outgoing Broadcast Events'}
              </h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                {activeTab === 'incoming' ? 'RECEIVE SIGNALS FROM EXTERNAL SOURCES' : 'NOTIFY EXTERNAL SYSTEMS OF INTERNAL EVENTS'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 text-white shadow-xl active:scale-95 ${activeTab === 'incoming' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-200'}`}
          >
            <Plus size={16} /> {activeTab === 'incoming' ? 'Create Source' : 'Add Destination'}
          </button>
        </header>

        <div className="flex-1 p-10 overflow-y-auto">
          {activeTab === 'incoming' ? (
            <div className="space-y-6">
              {incomingHooks.map(hook => (
                <div key={hook.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm group hover:border-indigo-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-105 transition-transform">
                      <Globe size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{hook.name}</h4>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-lg uppercase tracking-widest border border-emerald-100">Active</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{hook.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] font-mono font-bold text-indigo-400 bg-indigo-50/50 px-3 py-1.5 rounded-xl border border-indigo-100 w-fit">
                        <Lock size={12} /> {hook.secret_token}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 max-w-md">
                    <div className="bg-slate-50 border border-slate-100 p-2 rounded-2xl flex items-center gap-3">
                      <div className="p-2 bg-white rounded-xl shadow-sm shrink-0"><Terminal size={14} className="text-slate-400" /></div>
                      {/* Updated old staging URL to the main domain https://digitalemployee.me */}
                      <code className="text-[10px] font-mono font-bold text-slate-500 truncate flex-1">https://digitalemployee.me/ingest/{hook.identifier}</code>
                      <button 
                        onClick={() => handleCopy(`https://digitalemployee.me/ingest/${hook.identifier}`, hook.id)}
                        className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg transition-all active:scale-95 hover:bg-indigo-700"
                        title="Copy Webhook URL"
                      >
                        {copiedId === hook.id ? <CheckCircle size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="p-3 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
              
              {incomingHooks.length === 0 && (
                <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                    <RadioReceiver size={40} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No Receivers Protocol</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">Generate a unique identifier and secret to start ingesting leads from Facebook, IndiaMART, or your Website.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {outgoingHooks.map(hook => (
                <div key={hook.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm group hover:border-slate-900 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <ExternalLink size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{hook.name}</h4>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-lg uppercase tracking-widest border border-emerald-100">Broadcasting</span>
                      </div>
                      <p className="text-[10px] font-mono font-bold text-slate-400 truncate max-w-xs">{hook.url}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {hook.events.map(evt => (
                          <span key={evt} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[8px] font-black rounded-lg uppercase tracking-widest border border-indigo-100">
                            {evt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="p-3 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}

              {outgoingHooks.length === 0 && (
                <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                    <Activity size={40} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No Destinations Configured</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">Subscribe external URLs to internal system events to keep your ecosystem synchronized.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal: Create Hook */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowAddModal(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl p-12 space-y-10 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {activeTab === 'incoming' ? 'Protocol Receiver' : 'Broadcast Destination'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-slate-600 transition-colors p-2"><Plus size={32} className="rotate-45" /></button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Friendly Name</label>
                <input 
                  type="text" 
                  placeholder={activeTab === 'incoming' ? "e.g. IndiaMART CRM" : "e.g. Accounting ERP"} 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold shadow-inner transition-all" 
                  value={newWhName}
                  onChange={e => setNewWhName(e.target.value)}
                />
              </div>
              
              {activeTab === 'incoming' ? (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Source Description</label>
                  <textarea 
                    placeholder="Where is this data coming from?" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold shadow-inner h-24 resize-none transition-all"
                    value={newWhDesc}
                    onChange={e => setNewWhDesc(e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination URL (POST)</label>
                    <input 
                      type="text" 
                      placeholder="https://api.external.com/webhook" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-xs font-mono font-bold shadow-inner transition-all" 
                      value={newWhUrl}
                      onChange={e => setNewWhUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Subscriptions</label>
                    <div className="grid grid-cols-2 gap-3">
                      {AVAILABLE_EVENTS.map(ev => (
                        <button 
                          key={ev.id} 
                          onClick={() => toggleEvent(ev.id)}
                          className={`flex items-center gap-3 p-4 border rounded-2xl transition-all text-left ${
                            selectedEvents.includes(ev.id) 
                              ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${selectedEvents.includes(ev.id) ? 'bg-white border-white text-slate-900' : 'border-slate-100 bg-slate-50'}`}>
                            {selectedEvents.includes(ev.id) && <CheckSquare size={14} />}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-tight">{ev.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="p-8 bg-slate-900 rounded-[2.5rem] flex gap-6 text-white shadow-2xl relative overflow-hidden">
                <Shield size={32} className="text-indigo-400 shrink-0 mt-1" />
                <div className="relative z-10">
                  <h4 className="text-xs font-black uppercase tracking-widest mb-1">Security Handshake Enabled</h4>
                  <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">
                    {activeTab === 'incoming' 
                      ? "Requests must include X-Webhook-Secret. Signals without valid tokens are automatically rejected."
                      : "We include an X-Digital-Employee-Secret header in all broadasts to verify authenticity."}
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl" />
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreate}
                disabled={!newWhName || (activeTab === 'outgoing' && (!newWhUrl || selectedEvents.length === 0))}
                className={`flex-[2] py-5 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === 'incoming' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-200'}`}
              >
                {activeTab === 'incoming' ? 'Deploy Receiver' : 'Start Broadcasting'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationPortal;