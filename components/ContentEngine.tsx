
import React, { useState } from 'react';
import { 
  Sparkles, Image as ImageIcon, Video, Send, Loader2, Download, 
  Share2, Maximize2, Trash2, History, Zap, CheckCircle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { AIAsset } from '../types';

const ContentEngine: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [assetType, setAssetType] = useState<'image' | 'video'>('image');
  const [assets, setAssets] = useState<AIAsset[]>([
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
      prompt: 'Modern luxury apartment interior with floor to ceiling windows, sunrise view, cinematic lighting',
      created_at: '2024-11-19T10:00:00Z'
    },
    {
      id: '2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
      prompt: 'Corporate skyscraper with glass facade, reflection of blue sky, architectural photography style',
      created_at: '2024-11-18T15:30:00Z'
    }
  ]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // Simulate generation for demo purposes
    // In real app, call gemini-2.5-flash-image or veo-3.1-fast-generate-preview
    setTimeout(() => {
      const newAsset: AIAsset = {
        id: Math.random().toString(36).substr(2, 9),
        type: assetType,
        url: assetType === 'image' 
          ? 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop'
          : 'https://cdn.pixabay.com/video/2021/08/05/83949-583856306_tiny.mp4',
        prompt: prompt,
        created_at: new Date().toISOString()
      };
      setAssets([newAsset, ...assets]);
      setPrompt('');
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Creative Director Agent</h2>
              <p className="text-sm text-slate-500">Generate high-conversion visual assets for your multi-channel strategy.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setAssetType('image')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  assetType === 'image' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ImageIcon size={18} />
                Generate Image
              </button>
              <button 
                onClick={() => setAssetType('video')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  assetType === 'video' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Video size={18} />
                Generate Video (VEO)
              </button>
            </div>
            
            <div className="relative group">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={assetType === 'image' ? "Describe the image you need... (e.g. 'Luxury villa with pool at dusk, cinematic')" : "Describe the video scene... (e.g. 'A family entering their new modern home, emotional lighting')"}
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm resize-none h-32 pr-24"
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="absolute right-4 bottom-4 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 active:scale-95"
              >
                {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
            <div className="flex items-center gap-1.5"><CheckCircle size={12} /> HD Assets</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={12} /> Commercial Use</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={12} /> Auto-scheduled</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <History size={18} className="text-slate-400" />
            Asset Vault
          </h3>
          <div className="flex gap-2">
            <button className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">Filter: Images</button>
            <button className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">Filter: Videos</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
              <div className="relative aspect-video bg-slate-100">
                {asset.type === 'video' ? (
                  <video src={asset.url} className="w-full h-full object-cover" muted loop onMouseOver={(e) => e.currentTarget.play()} onMouseOut={(e) => e.currentTarget.pause()} />
                ) : (
                  <img src={asset.url} alt={asset.prompt} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white rounded-lg text-slate-900 hover:bg-indigo-600 hover:text-white transition-all"><Maximize2 size={18} /></button>
                  <button className="p-2 bg-white rounded-lg text-slate-900 hover:bg-indigo-600 hover:text-white transition-all"><Download size={18} /></button>
                  <button className="p-2 bg-white rounded-lg text-slate-900 hover:bg-indigo-600 hover:text-white transition-all"><Share2 size={18} /></button>
                </div>
                {asset.type === 'video' && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[10px] font-bold text-white flex items-center gap-1">
                    <Video size={10} /> VEO 3.1
                  </div>
                )}
              </div>
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium italic">
                  "{asset.prompt}"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(asset.created_at).toLocaleDateString()}
                  </span>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentEngine;
