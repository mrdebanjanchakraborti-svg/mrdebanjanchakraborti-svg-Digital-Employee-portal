import React from 'react';
import { Shield, Sparkles, Zap, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Left Side: Branding & Features - High-Contrast Protocol Design */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#05070A] text-white p-10 flex-col relative overflow-hidden">
        {/* Atmosphere */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[140px] rounded-full -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[140px] rounded-full -ml-64 -mb-64" />

        {/* Master Protocol Box with Blue Border */}
        <div className="relative z-10 flex-1 border-2 border-[#5143E1] rounded-[3.5rem] p-14 flex flex-col justify-between overflow-hidden shadow-[0_0_120px_rgba(81,67,225,0.15)]">
          
          {/* Logo Zone: Centered and Maximized - Removed background container */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-center mb-10 group transition-all duration-1000">
              <img 
                src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" 
                alt="Workforce Logo" 
                className="w-full h-auto max-h-[720px] object-contain animate-in zoom-in-90 duration-1000 group-hover:scale-[1.05] drop-shadow-[0_0_50px_rgba(81,67,225,0.3)]" 
              />
            </div>

            <div className="w-full space-y-6 text-center">
              <h1 className="text-7xl font-black leading-[0.85] uppercase tracking-tighter">
                AUTHORIZE YOUR <br />
                <span className="text-[#5143E1]">AI WORKFORCE</span>
              </h1>
              
              <p className="text-slate-400 text-xl max-w-xl mx-auto font-medium italic leading-relaxed opacity-80">
                "Scale your sales operations with autonomous lead scoring, smart outbound broadcasts, and multi-tenant CRM orchestration."
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5">
            {[
              { icon: Sparkles, title: "GEMINI AI SCORING", desc: "Automated intent analysis." },
              { icon: Shield, title: "TENANT ISOLATION", desc: "Secure multi-company pulses." },
              { icon: Zap, title: "N8N ORCHESTRATION", desc: "Connect broadcasts to 400+ apps." }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#5143E1] shadow-lg">
                  <feature.icon size={20} />
                </div>
                <div>
                  <h3 className="font-black text-white uppercase tracking-widest text-[9px] mb-0.5">{feature.title}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight leading-tight">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Pulse */}
        <div className="relative z-10 pt-8 flex justify-center">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
            &copy; 2024 AI WORKFORCE INFRASTRUCTURE. ENTERPRISE SOLVENCY VERIFIED.
          </p>
        </div>
      </div>

      {/* Right Side: Auth Component */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">HANDSHAKE INITIATED</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic">Authenticate your identity to access the pulse.</p>
          </div>

          <div className="space-y-4 mb-12">
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-4 px-6 py-5 border border-slate-100 bg-slate-50/50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm active:scale-[0.98]"
            >
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale opacity-70" alt="Google" />
              SIGN IN WITH GOOGLE CLOUD
            </button>
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-4 px-6 py-5 border border-slate-100 bg-slate-50/50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm active:scale-[0.98]"
            >
              <img src="https://www.microsoft.com/favicon.ico" className="w-4 h-4 grayscale opacity-70" alt="Microsoft" />
              AZURE AD INTEGRATION
            </button>
          </div>

          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.3em]">
              <span className="px-6 bg-white text-slate-300">TEMPORAL MAGIC LINK</span>
            </div>
          </div>

          <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">IDENTITY ENDPOINT (EMAIL)</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-200 outline-none transition-all shadow-inner font-bold text-sm" 
                  placeholder="identity@workspace.me" 
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#5244E1] text-white py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-4 hover:bg-[#4338CA] hover:shadow-[0_20px_50px_rgba(82,68,225,0.3)] transition-all active:scale-[0.98] group"
            >
              AUTHORIZE PROTOCOL
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-20 text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-3">BY SIGNING IN, YOU AGREE TO THE</p>
            <div className="flex items-center justify-center gap-3 text-[9px] font-black text-indigo-500 uppercase tracking-widest">
              <a href="#" className="underline decoration-2 underline-offset-4 hover:text-indigo-700 transition-colors">DISTRIBUTION PROTOCOLS</a>
              <span className="text-slate-200 no-underline">AND</span>
              <a href="#" className="underline decoration-2 underline-offset-4 hover:text-indigo-700 transition-colors">PRIVACY VAULTING</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;