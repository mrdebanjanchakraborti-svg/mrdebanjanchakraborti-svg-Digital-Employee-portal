
import React, { useState } from 'react';
import { Shield, Sparkles, Zap, ArrowRight, Loader2, Mail, Lock, UserPlus, LogIn, AlertCircle, RefreshCw, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabase';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setSuccessMsg('Recovery link dispatched. Check your identity endpoint (email).');
      } else if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMsg('Registration initiated. Please authorize your identity via the link sent to your email.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message.includes('Email not confirmed')) {
            throw new Error('Identity not verified. Please check your email and authorize the handshake.');
          }
          throw error;
        }
        
        if (data.session) onLogin();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication handshake failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden text-slate-900">
      {/* Left Side: Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#05070A] text-white p-10 flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[140px] rounded-full -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[140px] rounded-full -ml-64 -mb-64" />

        <div className="relative z-10 flex-1 border-2 border-[#5143E1] rounded-[3.5rem] p-14 flex flex-col justify-between overflow-hidden shadow-[0_0_120px_rgba(81,67,225,0.15)]">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-center mb-10 group transition-all duration-1000">
              <img 
                src="https://storage.googleapis.com/inflow_website_image/new_logo-removebg-preview.png" 
                alt="Workforce Logo" 
                className="w-full h-auto max-h-[480px] object-contain animate-in zoom-in-90 duration-1000 group-hover:scale-[1.05] drop-shadow-[0_0_50px_rgba(81,67,225,0.3)]" 
              />
            </div>

            <div className="w-full space-y-6 text-center">
              <h1 className="text-6xl font-black leading-[0.85] uppercase tracking-tighter">
                AUTHORIZE YOUR <br />
                <span className="text-[#5143E1]">AI WORKFORCE</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium italic leading-relaxed opacity-80">
                "Secure multi-tenant orchestration for autonomous sales operations and lead intelligence."
              </p>
            </div>
          </div>

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
      </div>

      {/* Right Side: Auth Component */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              {isForgotPassword ? 'RECOVER CIPHER' : isSignUp ? 'REGISTER IDENTITY' : 'HANDSHAKE INITIATED'}
            </h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic">
              {isForgotPassword 
                ? 'Request a recovery link for your pulse access.' 
                : isSignUp 
                ? 'Create your master identity on the pulse.' 
                : 'Authenticate your identity to access the pulse.'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleAuth}>
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <p className="text-[10px] font-black text-rose-700 uppercase leading-relaxed">{error}</p>
              </div>
            )}

            {successMsg && (
              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex flex-col items-center text-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-sm">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-[11px] font-black text-emerald-700 uppercase leading-relaxed tracking-wider">{successMsg}</p>
              </div>
            )}

            {!successMsg && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">IDENTITY ENDPOINT (EMAIL)</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-8 py-5 bg-slate-50/50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-200 outline-none transition-all shadow-inner font-bold text-sm" 
                      placeholder="identity@workspace.me" 
                    />
                  </div>
                </div>

                {!isForgotPassword && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">MASTER CIPHER (PASSWORD)</label>
                      {!isSignUp && (
                        <button 
                          type="button"
                          onClick={() => { setIsForgotPassword(true); setError(null); setSuccessMsg(null); }}
                          className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors"
                        >
                          Forgot Cipher?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-14 pr-8 py-5 bg-slate-50/50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-200 outline-none transition-all shadow-inner font-bold text-sm" 
                        placeholder="••••••••••••" 
                      />
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#5244E1] text-white py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-4 hover:bg-[#4338CA] hover:shadow-[0_20px_50px_rgba(82,68,225,0.3)] transition-all active:scale-[0.98] group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      {isForgotPassword ? 'DISPATCH RECOVERY' : isSignUp ? 'AUTHORIZE REGISTRATION' : 'AUTHORIZE PROTOCOL'}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          <div className="mt-8 flex flex-col gap-4">
            {isForgotPassword || successMsg ? (
              <button 
                onClick={() => { setIsForgotPassword(false); setError(null); setSuccessMsg(null); }}
                className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft size={14} /> Back to Authorization
              </button>
            ) : (
              <button 
                onClick={() => { setIsSignUp(!isSignUp); setError(null); setSuccessMsg(null); }}
                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors flex items-center justify-center gap-2"
              >
                {isSignUp ? (
                  <><LogIn size={14} /> Already have an identity? Sign In</>
                ) : (
                  <><UserPlus size={14} /> Need a master identity? Create Account</>
                )}
              </button>
            )}

            {!successMsg && (
              <>
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                  </div>
                  <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.3em]">
                    <span className="px-6 bg-white text-slate-300">CLOUD SYNC</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 px-4 py-4 border border-slate-100 bg-slate-50/50 rounded-2xl font-black text-[9px] uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all active:scale-98">
                    <img src="https://www.google.com/favicon.ico" className="w-3 h-3 grayscale opacity-70" alt="Google" />
                    GOOGLE CLOUD
                  </button>
                  <button className="flex items-center justify-center gap-3 px-4 py-4 border border-slate-100 bg-slate-50/50 rounded-2xl font-black text-[9px] uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all active:scale-98">
                    <img src="https://www.microsoft.com/favicon.ico" className="w-3 h-3 grayscale opacity-70" alt="Microsoft" />
                    AZURE AD
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
