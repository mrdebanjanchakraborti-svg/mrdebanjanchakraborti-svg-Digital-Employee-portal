import React, { useState } from 'react';
import { 
  Search, Grid, List, Plus, Download, Trash2, Share2, Maximize2, 
  Image as ImageIcon, Video as VideoIcon, ShieldCheck, Lock, 
  RefreshCw, Globe, Server, CheckCircle, Info, FileText
} from 'lucide-react';
import { StorageType } from '../types';

const AssetLibrary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeBucket, setActiveBucket] = useState('revenue-pulse-vault');

  const assets = [
    { id: '1', type: 'image', title: 'Campaign Header V1', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400&auto=format&fit=crop', date: '2d ago', storage: StorageType.PRIVATE, path: '/campaigns/ws_123/images/header.png' },
    { id: '2', type: 'video', title: 'Social Reel - Real Estate', url: 'https://cdn.pixabay.com/video/2021/08/05/83949-583856306_tiny.mp4', date: '1w ago', storage: StorageType.PUBLIC, path: '/social/post_442/media.mp4' },
    { id: '3', type: 'pdf', title: 'Q4 Performance Report', url: '#', date: 'Yesterday', storage: StorageType.PRIVATE, path: '/reports/user_99/q4_audit.pdf' },
    { id: '4', type: 'audio', title: 'Call Recording - Elena G', url: '#', date: '1h ago', storage: StorageType.PRIVATE, path: '/voice/call_210/recording.mp3' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Binary Pulse Vault</h2>
          <p className="text-slate-500 text-sm font-medium italic">Managed via **Google Cloud Storage** • Encrypted Multi-Tenant Logic.</p>
        </div>
        <div className="flex gap-3">
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-2xl border border-slate-200">
             <Server size={14} className="text-indigo-600" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{activeBucket}</span>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
            <Plus size={18} /> Sync Binary Object
          </button>
        </div>
      </header>

      <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="relative z-10 flex items-center gap-6">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl">
               <ShieldCheck size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-black uppercase tracking-tight">Access Handshake Protocol</h3>
               <p className="text-slate-400 text-sm font-medium italic opacity-80">Authenticated sessions only. 15-minute temporary Pulse URLs enforced for all private paths.</p>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      </div>

      <div className="bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-50">
          <div className="flex gap-4">
             <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400'}`}><Grid size={18} /></button>
             <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400'}`}><List size={18} /></button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input type="text" placeholder="Search objects in vault..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" />
            </div>
            <div className="flex gap-2">
               <select className="px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none">
                 <option>Root Vault</option>
                 <option>/users</option>
                 <option>/campaigns</option>
                 <option>/social</option>
                 <option>/voice</option>
                 <option>/reports</option>
                 <option>/invoices</option>
                 <option>/partners/kyc</option>
               </select>
               <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"><RefreshCw size={18}/></button>
            </div>
          </div>
        </header>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {assets.map(asset => (
              <div key={asset.id} className="group relative bg-slate-50 rounded-[2rem] overflow-hidden aspect-square border border-slate-100 hover:border-indigo-300 transition-all shadow-sm">
                {asset.type === 'video' ? (
                  <video src={asset.url} className="w-full h-full object-cover" muted />
                ) : asset.type === 'pdf' ? (
                  <div className="w-full h-full flex items-center justify-center bg-rose-50 text-rose-500">
                    <FileText size={48} />
                  </div>
                ) : asset.type === 'audio' ? (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-500">
                    <RefreshCw size={48} className="animate-spin-slow" />
                  </div>
                ) : (
                  <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
                )}
                
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md shadow-lg ${asset.storage === StorageType.PRIVATE ? 'bg-indigo-900/80 text-white' : 'bg-emerald-900/80 text-white'}`}>
                  {asset.storage === StorageType.PRIVATE ? <Lock size={10} /> : <Globe size={10} />}
                  {asset.storage}
                </div>

                <div className="absolute inset-0 bg-indigo-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                  <div className="flex gap-3">
                    <button className="p-3 bg-white rounded-xl text-indigo-600 hover:scale-110 transition-transform shadow-xl"><Maximize2 size={18} /></button>
                    <button className="p-3 bg-white rounded-xl text-indigo-600 hover:scale-110 transition-transform shadow-xl"><Download size={18} /></button>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-[11px] font-black text-white truncate uppercase tracking-tighter">{asset.title}</p>
                  <p className="text-[8px] font-bold text-slate-400 truncate opacity-80">{asset.path}</p>
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all bg-slate-50/30 group aspect-square">
              <Plus size={48} className="mb-4 group-hover:scale-110 transition-transform duration-700" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Add Binary</p>
            </button>
          </div>
        ) : (
          <div className="overflow-hidden border border-slate-100 rounded-3xl">
             <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Binary Object</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Path Mapping</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Visibility</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assets.map(asset => (
                    <tr key={asset.id} className="hover:bg-slate-50 transition-colors group">
                       <td className="px-8 py-4">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-indigo-600 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                {asset.type === 'video' ? <VideoIcon size={18} /> : asset.type === 'pdf' ? <FileText size={18} /> : <ImageIcon size={18} />}
                             </div>
                             <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{asset.title}</span>
                          </div>
                       </td>
                       <td className="px-8 py-4 font-mono text-[10px] text-slate-400">{asset.path}</td>
                       <td className="px-8 py-4">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${asset.storage === StorageType.PRIVATE ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                             {asset.storage}
                          </span>
                       </td>
                       <td className="px-8 py-4 text-right">
                          <div className="flex justify-end gap-2">
                             <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400"><Download size={14}/></button>
                             <button className="p-2 hover:bg-white text-rose-500 rounded-lg transition-all"><Trash2 size={14}/></button>
                          </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetLibrary;