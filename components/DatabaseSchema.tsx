import React from 'react';
import { Copy, CheckCircle, Shield, Code, Zap, Lock, Terminal, Database, Server, Key, Eye, ShieldCheck, Globe } from 'lucide-react';

const DatabaseSchema: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const sqlCode = `-- DIGITAL EMPLOYEE MASTER SCHEMA (FULL-LOOP TRIGGER EXTENSION)
-- 🛠 UPDATED INFRASTRUCTURE FOR OUTBOUND BROADCASTS & RETRY PULSE

-- 1️⃣ PULSE TRIGGERS (INCOMING SIGNAL LINKS)
CREATE TABLE IF NOT EXISTS public.triggers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('lead_ingestion','campaign_event','external_crm_push','custom_webhook')),
  status TEXT CHECK (status IN ('active','paused','error')) DEFAULT 'active',
  webhook_url TEXT UNIQUE NOT NULL,
  secret TEXT NOT NULL,
  event_type TEXT DEFAULT 'pulse_hit',
  usage_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2️⃣ OUTBOUND BROADCASTS (OUTGOING TRIGGERS)
CREATE TABLE IF NOT EXISTS public.outgoing_triggers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) NOT NULL,
  name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  destination_type TEXT CHECK (destination_type IN ('n8n', 'custom_webhook', 'slack', 'google_apps_script')),
  destination_url TEXT NOT NULL,
  secret TEXT NOT NULL,
  status TEXT CHECK (status IN ('active','paused','error')) DEFAULT 'active',
  retry_policy TEXT DEFAULT 'instant',
  usage_count INT DEFAULT 0,
  last_dispatch_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3️⃣ FINANCIAL RPC: can_create_outgoing_trigger()
-- Logic: Plan limits enforcement (Free = 0, Starter = 2, Growth = 10, Pro = 25)
CREATE OR REPLACE FUNCTION public.can_create_outgoing_trigger(p_workspace_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_plan TEXT;
  v_count INT;
  v_limit INT;
BEGIN
  SELECT plan_tier INTO v_plan FROM public.subscriptions WHERE user_id = p_workspace_id;
  SELECT count(*) INTO v_count FROM public.outgoing_triggers WHERE workspace_id = p_workspace_id;
  
  v_limit := CASE 
    WHEN v_plan = 'free' THEN 0
    WHEN v_plan = 'starter' THEN 2
    WHEN v_plan = 'growth' THEN 10
    WHEN v_plan = 'pro' THEN 25
    ELSE 999 -- Enterprise
  END;

  RETURN v_count < v_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4️⃣ EXECUTION RPC: authorize_pulse()
-- Logic: Hard check for active sub, overdue state, and AI credit wallet.
-- Supports 'trigger_hit' and 'outgoing_dispatch' actions.
CREATE OR REPLACE FUNCTION public.authorize_pulse(p_trigger_id UUID, p_action_type TEXT)
RETURNS JSONB AS $$
DECLARE
  v_workspace_id UUID;
  v_active BOOLEAN;
  v_overdue BOOLEAN;
  v_credits INT;
  v_daily_limit INT;
  v_daily_used INT;
  v_last_reset TIMESTAMPTZ;
  v_cost INT;
BEGIN
  -- Search incoming or outgoing registry
  SELECT workspace_id INTO v_workspace_id FROM public.triggers WHERE id = p_trigger_id;
  IF v_workspace_id IS NULL THEN
     SELECT workspace_id INTO v_workspace_id FROM public.outgoing_triggers WHERE id = p_trigger_id;
  END IF;
  
  SELECT (status = 'active'), overdue, credits_balance, daily_credits_limit, credits_used_today, last_reset_at
  INTO v_active, v_overdue, v_credits, v_daily_limit, v_daily_used, v_last_reset
  FROM public.subscriptions WHERE user_id = v_workspace_id;

  -- AI Credit Pricing Matrix
  v_cost := CASE
    WHEN p_action_type IN ('trigger_hit', 'outgoing_dispatch') THEN 1
    WHEN p_action_type = 'lead_score' THEN 2
    WHEN p_action_type = 'ai_message' THEN 3
    WHEN p_action_type = 'image_gen' THEN 5
    WHEN p_action_type = 'video_gen' THEN 10
    WHEN p_action_type = 'voice_call' THEN 15
    ELSE 1
  END;

  -- Temporal Daily Reset
  IF v_last_reset < date_trunc('day', now()) THEN
    UPDATE public.subscriptions SET credits_used_today = 0, last_reset_at = now() WHERE user_id = v_workspace_id;
    v_daily_used := 0;
  END IF;

  -- 🛑 GUARD: Basic Solvency
  IF NOT v_active OR v_overdue OR v_credits < v_cost THEN
    RETURN jsonb_build_object('success', false, 'reason', 'Solvency Failure (Overdue or No Fuel)');
  END IF;

  -- Commitment: Ledger Burn
  UPDATE public.subscriptions 
  SET credits_balance = credits_balance - v_cost,
      credits_used_today = credits_used_today + v_cost
  WHERE user_id = v_workspace_id;
  
  -- Identity Mapping: Update trigger usage
  IF p_action_type = 'outgoing_dispatch' THEN
     UPDATE public.outgoing_triggers SET usage_count = usage_count + 1, last_dispatch_at = now() WHERE id = p_trigger_id;
  END IF;

  RETURN jsonb_build_object('success', true, 'remaining_fuel', v_credits - v_cost);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5️⃣ RLS POLICIES (ISOLATION)
ALTER TABLE public.outgoing_triggers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Outgoing Triggers: Owner isolation" ON public.outgoing_triggers FOR ALL USING (
  workspace_id IN (SELECT id FROM public.workspaces WHERE owner_id = auth.uid())
);
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
              <h2 className="text-4xl font-black tracking-tight uppercase">Infrastructure Ledger</h2>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed font-medium">
              Enterprise-grade PostgreSQL schema with **Full-Loop Trigger** and **Sign-Validation** extensions.
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
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Binary commerce protocol v2.6</span>
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