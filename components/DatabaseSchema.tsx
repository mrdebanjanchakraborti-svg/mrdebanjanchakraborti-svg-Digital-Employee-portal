
import React from 'react';
import { Copy, CheckCircle, Shield, Code, Zap, Terminal, ShieldCheck } from 'lucide-react';

const DatabaseSchema: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const sqlCode = `-- DIGITAL EMPLOYEE ONBOARDING LEDGER (v3.6)
-- 🛠 PERSISTENCE INFRASTRUCTURE FOR STEPS 1-7 (COMPANY -> ACTIVATE)

-- 1️⃣ STEP 01 & 07: WORKSPACE REGISTRY
-- Manages Company Identity (Step 1) and Final Activation (Step 7)
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  industry TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'onboarding', 'active', 'suspended')),
  onboarding_step INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2️⃣ STEP 02: AI BRAIN CONFIGURATION
-- Stores the intelligence parameters for the Digital Employee
CREATE TABLE IF NOT EXISTS public.ai_brain_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE UNIQUE,
  focus_area TEXT, -- e.g., 'Sales', 'Customer Support'
  system_instruction TEXT, -- The Gemini System Prompt
  knowledge_base_urls TEXT[], -- Linked URLs for training
  temperature FLOAT DEFAULT 0.7,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3️⃣ STEP 03 & 04: OMNICHANNEL INTEGRATIONS
-- Manages WhatsApp (Step 3) and Voice (Step 4) Pulse connections
CREATE TABLE IF NOT EXISTS public.integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'voice', 'email', 'sms')),
  provider TEXT, -- e.g., 'Twilio', 'Vapi', 'Meta'
  identifier TEXT, -- Phone Number or API Key ID
  config JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'error')),
  UNIQUE(workspace_id, channel)
);

-- 4️⃣ STEP 05: TEAM COLLABORATION
-- Manages Workspace Access and Identity Handshaking
CREATE TABLE IF NOT EXISTS public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
  invited_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(workspace_id, user_email)
);

-- 5️⃣ STEP 06: FINANCIAL SUBSCRIPTION
-- Authorizes Workforce scale and AI Credit fuel
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE UNIQUE,
  plan_tier TEXT DEFAULT 'free' CHECK (plan_tier IN ('free', 'starter', 'growth', 'pro', 'enterprise')),
  credits_balance INT DEFAULT 200,
  overdue BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '30 days'),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6️⃣ ROW LEVEL SECURITY (RLS) GOVERNANCE
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_brain_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Governance Policy: Owners manage their own ecosystem
CREATE POLICY "Owners manage workspace" ON public.workspaces
FOR ALL TO authenticated USING (auth.uid() = owner_id);

CREATE POLICY "Owners manage brain" ON public.ai_brain_configs
FOR ALL TO authenticated USING (workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid()));

CREATE POLICY "Owners manage integrations" ON public.integrations
FOR ALL TO authenticated USING (workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid()));

CREATE POLICY "Owners manage subscriptions" ON public.subscriptions
FOR SELECT TO authenticated USING (workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid()));

-- 7️⃣ AUTOMATION: IDENTITY SYNC ON WORKSPACE CREATE
-- Automatically initializes a free subscription pulse for new entities
CREATE OR REPLACE FUNCTION public.init_workspace_pulse()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (workspace_id, plan_tier, credits_balance)
  VALUES (NEW.id, 'free', 200);
  
  INSERT INTO public.ai_brain_configs (workspace_id, focus_area)
  VALUES (NEW.id, 'General Sales');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_workspace_created
  AFTER INSERT ON public.workspaces
  FOR EACH ROW EXECUTE FUNCTION public.init_workspace_pulse();
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
              <h2 className="text-4xl font-black tracking-tight uppercase">Onboarding Pulse v3.6</h2>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed font-medium italic">
              Persist the complete **7-Step Lifecycle**. From Step 01 (Company) to Step 07 (Global Activation).
            </p>
          </div>
          <button 
            onClick={handleCopy}
            className="shrink-0 flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/20 active:scale-95 group"
          >
            {copied ? <CheckCircle size={24} /> : <Code size={24} className="group-hover:rotate-12 transition-transform" />}
            {copied ? 'Copied Ledger' : 'Fetch SQL Blueprint'}
          </button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -mr-40 -mt-40" />
      </div>

      <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex flex-col">
        <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-4">
            <Terminal size={18} className="text-slate-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Orchestration Protocol v3.6</span>
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
