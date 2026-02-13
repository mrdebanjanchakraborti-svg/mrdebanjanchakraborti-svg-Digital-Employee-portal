
import React from 'react';
import { Copy, CheckCircle, Shield, Code, Zap, Terminal, ShieldCheck, AlertTriangle } from 'lucide-react';

const DatabaseSchema: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const sqlCode = `-- DIGITAL EMPLOYEE INFRASTRUCTURE (v9.0)
-- 🛠 SECURE WORKSPACE & IDENTITY PROTOCOL

-- 1️⃣ IDENTITY LAYER (Profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'member',
  avatar_url TEXT,
  logo_url TEXT,
  preferred_voice TEXT DEFAULT 'Zephyr',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2️⃣ WORKSPACE REGISTRY (The Business Entity)
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  industry_sector TEXT,
  whatsapp_number TEXT,
  preferred_voice TEXT DEFAULT 'Zephyr',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3️⃣ SUBSCRIPTION & LEDGER (The Pulse)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE PRIMARY KEY,
  plan_tier TEXT DEFAULT 'free',
  status TEXT DEFAULT 'active',
  credits_balance INT DEFAULT 200,
  overdue BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '10 days'),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4️⃣ RLS GOVERNANCE (Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Governance: Users manage their own records
DROP POLICY IF EXISTS "Owners manage workspaces" ON public.workspaces;
CREATE POLICY "Owners manage workspaces" ON public.workspaces 
FOR ALL USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "Users manage own profile" ON public.profiles;
CREATE POLICY "Users manage own profile" ON public.profiles 
FOR ALL USING (auth.uid() = id);

-- CRITICAL FIX: Allow users to UPSERT subscriptions during activation
DROP POLICY IF EXISTS "Owners manage subscriptions" ON public.subscriptions;
CREATE POLICY "Owners manage subscriptions" ON public.subscriptions 
FOR ALL USING (workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid()));

-- 5️⃣ AUTOMATION: AUTO-INIT SUBSCRIPTION
CREATE OR REPLACE FUNCTION public.init_workspace_essentials()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (workspace_id, plan_tier, credits_balance)
  VALUES (NEW.id, 'free', 200)
  ON CONFLICT (workspace_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_workspace_created ON public.workspaces;
CREATE TRIGGER on_workspace_created
  AFTER INSERT ON public.workspaces
  FOR EACH ROW EXECUTE FUNCTION public.init_workspace_essentials();
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl">
                <ShieldCheck size={28} className="text-white" />
              </div>
              <h2 className="text-4xl font-black tracking-tight uppercase">Master Ledger v9.0</h2>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed font-medium italic">
              Strict Infrastructure: Includes **Subscription Management RLS** for plan activation.
            </p>
          </div>
          <button 
            onClick={handleCopy}
            className="shrink-0 flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/20 active:scale-95 group"
          >
            {copied ? <CheckCircle size={24} /> : <Code size={24} className="group-hover:rotate-12 transition-transform" />}
            {copied ? 'Copied Blueprint' : 'Fetch Final SQL'}
          </button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -mr-40 -mt-40" />
      </div>

      <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex flex-col">
        <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-4">
            <Terminal size={18} className="text-slate-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Protocol v9.0</span>
          </div>
        </div>
        <div className="p-0 bg-slate-950 overflow-hidden relative">
          <pre className="p-10 text-[13px] font-mono leading-relaxed text-indigo-100/80 overflow-x-auto max-h-[800px] scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-slate-800">
            {sqlCode}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSchema;
