
import React from 'react';
// Fix: Import the missing Calendar icon from lucide-react
import { 
  Megaphone, MessageCircle, Mail, Phone, 
  BarChart3, Play, Pause, MoreVertical, Plus, 
  Clock, CheckCircle2, AlertCircle, Calendar
} from 'lucide-react';
import { CampaignStatus, CampaignType } from '../types';

const CampaignList: React.FC<{ onCreate: () => void }> = ({ onCreate }) => {
  const campaigns = [
    {
      id: '1',
      name: 'Q4 Realtor Reactivation',
      type: CampaignType.REENGAGE,
      status: CampaignStatus.ACTIVE,
      channel: 'whatsapp',
      leads: 450,
      sent: 284,
      replies: 12,
      conversions: 3,
      created_at: '2024-10-25'
    },
    {
      id: '2',
      name: 'Webinar Follow-up Sequence',
      type: CampaignType.NURTURE,
      status: CampaignStatus.SCHEDULED,
      channel: 'email',
      leads: 1200,
      sent: 0,
      replies: 0,
      conversions: 0,
      created_at: '2024-11-01'
    }
  ];

  const getStatusBadge = (status: CampaignStatus) => {
    switch(status) {
      case CampaignStatus.ACTIVE:
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-100 animate-pulse">
          <Play size={10} fill="currentColor" /> Active
        </span>;
      case CampaignStatus.SCHEDULED:
        return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-100">
          <Clock size={10} /> Scheduled
        </span>;
      default:
        return <span className="px-2.5 py-1 bg-slate-50 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-200">
          {status}
        </span>;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case 'whatsapp': return <MessageCircle size={18} className="text-emerald-500" />;
      case 'email': return <Mail size={18} className="text-indigo-500" />;
      case 'voice': return <Phone size={18} className="text-orange-500" />;
      default: return <Megaphone size={18} className="text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Active AI Campaigns</h2>
          <p className="text-slate-500 text-sm">Monitor and manage your Digital Employee's outreach tasks.</p>
        </div>
        <button 
          onClick={onCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={18} />
          Launch New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {campaigns.map(camp => (
          <div key={camp.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  {getChannelIcon(camp.channel)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{camp.name}</h3>
                    {getStatusBadge(camp.status)}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5 capitalize"><Megaphone size={12} /> {camp.type.replace('_', ' ')}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> Created {camp.created_at}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                  <BarChart3 size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Audience</p>
                <p className="text-xl font-bold text-slate-900">{camp.leads}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sent</p>
                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold text-slate-900">{camp.sent}</p>
                  <p className="text-[10px] font-bold text-emerald-600 mb-1">{Math.round((camp.sent/camp.leads)*100)}%</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Replies</p>
                <p className="text-xl font-bold text-slate-900">{camp.replies}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conversions</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-indigo-600">{camp.conversions}</p>
                  {camp.conversions > 0 && <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded">ROI Match</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl text-center bg-slate-50/50">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300 shadow-sm">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-700">No More Pending Tasks</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2 mb-8">
          Your Digital Employee has executed all scheduled campaigns. Ready to launch something new?
        </p>
        <button 
          onClick={onCreate}
          className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm"
        >
          Explore Campaign Templates
        </button>
      </div>
    </div>
  );
};

export default CampaignList;
