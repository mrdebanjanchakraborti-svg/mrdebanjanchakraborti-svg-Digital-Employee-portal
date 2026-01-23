import React, { useState } from 'react';
import { 
  BarChart3, PieChart, TrendingUp, Users, 
  CreditCard, Wallet, Layers, ShieldCheck, 
  Search, Filter, Download, ArrowRight, Clock,
  DollarSign, Briefcase, Award, Zap, ChevronRight,
  UserCheck, Shield, Target, Smartphone,
  CheckCircle2, AlertCircle, RefreshCw, Loader2, FileText, Globe
} from 'lucide-react';
import { UserRole, PayoutStatus } from '../types';

interface ReportingManagerProps {
  initialRole?: UserRole;
}

const ReportingManager: React.FC<ReportingManagerProps> = ({ initialRole = UserRole.ADMIN }) => {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExportReport = (name: string) => {
    setIsExporting(name);
    // Simulation: Logic -> Binary Buffer -> GCS (/admin/reports/{id}.csv) -> DB Entry -> Signed URL
    setTimeout(() => {
      setIsExporting(null);
      alert(`${name} Pulse complete. Securely mirrored to GCS vault: /admin/reports/rec_${Date.now()}.csv`);
    }, 2500);
  };

  const AdminView = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Partner Apps", value: "14", icon: Award, color: "bg-indigo-600" },
          { label: "Customer Signups", value: "1,284", icon: Users, color: "bg-blue-600" },
          { label: "Global Revenue", value: "₹24.8L", icon: DollarSign, color: "bg-emerald-600" },
          { label: "Total Commission", value: "₹4.2L", icon: TrendingUp, color: "bg-orange-600" }
        ].map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-indigo-600 transition-all">
            <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center text-white shadow-lg shadow-current/10 mb-6 group-hover:scale-110 transition-transform`}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 p-1.5 bg-white border border-slate-200 rounded-[2rem] w-fit shadow-sm">
        {['overview', 'payouts', 'archive'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="bg-white border border-slate-200 rounded-[3.5rem] overflow-hidden shadow-sm">
          <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Revenue Integrity Audit</h3>
            <div className="flex gap-4">
               <button 
                onClick={() => handleExportReport('Pulse Audit')}
                disabled={!!isExporting}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
               >
                 {isExporting === 'Pulse Audit' ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                 {isExporting === 'Pulse Audit' ? 'Generating Binary...' : 'Export Audit CSV'}
               </button>
            </div>
          </header>
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner Identity</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer / Deal</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Commission (Earnings)</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">GCS Vault Handshake</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {[
                { id: '1', partner: 'Rohan Sharma', customer: 'Nexus IT', commission: '₹3,000', url: '/admin/reports/rec_01.csv' },
                { id: '2', partner: 'Priya Verma', customer: 'Verma Tech', commission: '₹975', url: '/admin/reports/rec_02.csv' }
              ].map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-10 py-6">
                    <p className="text-sm font-black text-slate-900">{row.partner}</p>
                  </td>
                  <td className="px-10 py-6 text-sm text-slate-600">{row.customer}</td>
                  <td className="px-10 py-6 text-sm font-black text-indigo-600">{row.commission}</td>
                  <td className="px-10 py-6 text-right">
                     <button 
                      onClick={() => handleExportReport(`ID ${row.id} Record`)}
                      disabled={!!isExporting}
                      className="inline-flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase hover:text-indigo-600 transition-all disabled:opacity-30"
                     >
                       <Download size={12}/> Fetch GCS CSV
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <footer className="p-8 border-t border-slate-50 bg-slate-50/50 flex justify-center items-center gap-3">
             <Shield size={16} className="text-slate-400" />
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">All reports are encrypted and require Supabase Signed URL Handshake.</p>
          </footer>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="text-left space-y-2">
           <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Integrity Reporting Engine</h2>
           <p className="text-slate-500 text-lg font-medium italic">Autonomous financial auditing and **Secure GCS Distribution**.</p>
        </div>
        
        <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm shrink-0">
           {[UserRole.ADMIN, UserRole.PARTNER, UserRole.CUSTOMER].map((r) => (
             <button 
               key={r}
               onClick={() => setRole(r)}
               className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${role === r ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}
             >
               {role === r ? <ShieldCheck size={14} /> : <Shield size={14} />} {r} Pulse
             </button>
           ))}
        </div>
      </header>

      {role === UserRole.ADMIN && <AdminView />}
      
      {role === UserRole.PARTNER && (
        <div className="bg-white border border-slate-200 rounded-[3rem] p-20 text-center space-y-6 shadow-sm">
           <div className="w-24 h-24 bg-indigo-50 rounded-[3rem] mx-auto flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-105 transition-transform">
              <Award size={48} />
           </div>
           <div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Partner Integrity Handshake</h3>
              <p className="text-slate-500 max-w-sm mx-auto mt-2 font-medium italic">Generating secure commission reports from the private vault...</p>
           </div>
           <button 
            onClick={() => handleExportReport('Partner Earnings')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95"
           >
             Request Signed Report
           </button>
        </div>
      )}

      {role === UserRole.CUSTOMER && (
        <div className="bg-slate-900 rounded-[3rem] p-16 text-white shadow-2xl relative overflow-hidden text-center space-y-8">
           <div className="relative z-10 space-y-4">
              <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl mb-8 group-hover:rotate-12 transition-transform">
                 <Globe size={40} />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight">Workflow Integrity Pulse</h3>
              <p className="text-slate-400 max-w-md mx-auto font-medium italic">Your personalized AI performance and credit burn reports are mirrored here.</p>
           </div>
           <div className="relative z-10 flex justify-center gap-4">
              <button 
                onClick={() => handleExportReport('Monthly Usage')}
                className="px-10 py-5 bg-white text-slate-900 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              >
                Fetch Private GCS PDF
              </button>
           </div>
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        </div>
      )}
    </div>
  );
};

export default ReportingManager;