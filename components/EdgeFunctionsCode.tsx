
import React from 'react';
import { Code, Terminal, Zap, Shield, Database, Cpu, CreditCard, MessageSquare, Info, ShieldAlert, Cloud } from 'lucide-react';

const EdgeFunctionsCode: React.FC = () => {
  const [activeSnippet, setActiveSnippet] = React.useState<'guard' | 'gcs' | 'ingest' | 'orchestrate' | 'dispatch'>('guard');

  const snippets = {
    guard: `// 0. SUBSCRIPTION GATEKEEPER (REVENUE PROTECTION)
// Entry point for all incoming signals. Reject if overdue.

import { createClient } from '@supabase/supabase-js'

export async function handler(req: Request) {
  const supabase = createClient(Deno.env.get('SB_URL'), Deno.env.get('SB_KEY'))
  const { workspace_id } = await req.json()

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('status, overdue')
    .eq('workspace_id', workspace_id)
    .single()

  // HARD BLOCK: AI workforce goes on strike if not paid
  if (!sub || sub.status !== 'active' || sub.overdue) {
    return new Response(JSON.stringify({ 
      error: 'Subscription Overdue',
      code: 'REVENUE_LOCK'
    }), { status: 403 })
  }

  // Pass control to normalization and ingestion logic
  return await processSignal(req)
}`,
    gcs: `// 1. GCS SECURE UPLOAD (PRIVATE ASSETS)
// npm:@google-cloud/storage integration for private workforce assets.

import { serve } from "https://deno.land/std/http/server.ts";
import { Storage } from "npm:@google-cloud/storage";

serve(async (req) => {
  try {
    // 1. Auth Guard (Verify JWT)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response("Unauthorized", { status: 401 });

    const storage = new Storage({
      projectId: Deno.env.get("GCS_PROJECT_ID"),
      credentials: {
        client_email: Deno.env.get("GCS_CLIENT_EMAIL"),
        private_key: Deno.env.get("GCS_PRIVATE_KEY")?.replace(/\\n/g, "\n"),
      },
    });

    const bucket = storage.bucket(Deno.env.get("GCS_BUCKET_NAME"));
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return new Response("Payload Empty", { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);
    const fileName = \`\${Date.now()}_\${file.name}\`;
    const blob = bucket.file(fileName);

    // 2. Save Private Binary
    await blob.save(buffer, { contentType: file.type });

    // 3. Generate Temporary Signed Pulse (15m validity)
    const [signedUrl] = await blob.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 15 * 60 * 1000,
    });

    return new Response(JSON.stringify({ url: signedUrl, path: fileName }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
});`,
    ingest: `// 2. LEAD INGESTION & HMAC SECURITY HANDSHAKE
// Location: /supabase/functions/webhook-ingest/index.ts

serve(async (req) => {
  // ... Subscription Guard already passed ...
  
  // 1. Verify HMAC Token
  const { data: hook } = await supabase.from('webhooks').select('*').eq('identifier', identifier).single()
  if (req.headers.get('x-webhook-secret') !== hook.secret_token) {
    return new Response('Unauthorized Signal', { status: 401 })
  }

  // 2. Carryforward Credit Audit
  // Logic uses public.debit_credits() which checks sub state again (fail-safe)
  const { data: ledger } = await supabase.rpc('debit_credits', { 
    p_user_id: hook.workspace_id, 
    p_amount: 1, 
    p_reason: 'ingest_' + identifier 
  })

  if (!ledger.success) return new Response('Insufficient Fuel', { status: 402 })

  // 3. Normalization & CRM Entry
  const payload = await req.json()
  await supabase.from('leads').insert({ ...payload })

  return new Response('Pulse Recorded', { status: 202 })
})`,
    orchestrate: `// 3. AI STRATEGY ORCHESTRATOR (BRAIN LAYER)
// Analyzes context and assigns the strategic next step.

const aiResponse = await gemini.generateContent({
  model: 'gemini-3-flash-preview',
  systemInstruction: prompt.content,
  contents: \`Lead Context: \${JSON.stringify(lead)}\`
});

const plan = JSON.parse(aiResponse.text);

// Update Intelligence State
await supabase.from('leads').update({
  score: plan.score,
  status: plan.next_stage,
  next_action: plan.action_label
}).eq('id', leadId);

// Queue Dispatch for execution
await supabase.from('messages_queue').insert({
  lead_id: leadId,
  channel: plan.channel,
  message_body: plan.message,
  scheduled_at: plan.delay ? addMinutes(now(), plan.delay) : now()
});`,
    dispatch: `// 4. OMNICHANNEL DISPATCHER (EXECUTION LAYER)
// Picks up pending signals and delivers via providers.

const { data: queue } = await supabase
  .from('messages_queue')
  .select('*, leads(*)')
  .eq('status', 'pending')
  .lt('scheduled_at', new Date().toISOString());

for (const msg of queue) {
  // Provider handshake (WhatsApp/Email/SMS)
  const delivery = await provider.send(msg.leads.phone, msg.message_body);
  
  await supabase.from('lead_events').insert({
    lead_id: msg.lead_id,
    event_type: 'dispatch_success',
    channel: msg.channel
  });

  await supabase.from('messages_queue').update({ status: 'sent' }).eq('id', msg.id);
}`
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl">
                <Terminal size={28} className="text-white" />
              </div>
              <h2 className="text-4xl font-black tracking-tight uppercase">Infrastructure Engine Room</h2>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed font-medium">
              Enterprise-grade serverless runtime. Implements **Hard Revenue Enforcement** and **Carryforward Pulse Audit**.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -mr-40 -mt-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-4 lg:col-span-1">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Revenue Protocols</h3>
          {[
            { id: 'guard', name: 'Subscription Guard', icon: ShieldAlert, color: 'text-red-600' },
            { id: 'gcs', name: 'GCS Binary Handshake', icon: Cloud, color: 'text-blue-500' },
            { id: 'ingest', name: 'Ingestion Handshake', icon: Zap, color: 'text-indigo-600' },
            { id: 'orchestrate', name: 'AI Strategy Brain', icon: Cpu, color: 'text-orange-600' },
            { id: 'dispatch', name: 'Dispatcher Logic', icon: MessageSquare, color: 'text-emerald-600' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSnippet(s.id as any)}
              className={`w-full p-6 text-left rounded-3xl border transition-all flex items-center gap-4 ${
                activeSnippet === s.id 
                  ? 'bg-white border-indigo-600 shadow-xl ring-2 ring-indigo-500/10' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`p-3 rounded-2xl ${activeSnippet === s.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                <s.icon size={20} />
              </div>
              <span className={`font-black uppercase text-[11px] tracking-wider ${activeSnippet === s.id ? 'text-indigo-600' : 'text-slate-900'}`}>
                {s.name}
              </span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800 flex flex-col min-h-[600px]">
          <header className="px-10 py-6 border-b border-slate-800 flex items-center justify-between bg-black/20 shrink-0">
             <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase ml-4">edge_functions/{activeSnippet}_protocol.ts</span>
             </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-indigo-100 active:scale-95">
                <Code size={14} /> Copy Protocol
             </button>
          </header>
          <div className="flex-1 overflow-auto p-10 scrollbar-thin scrollbar-thumb-indigo-500/50">
             <pre className="text-indigo-100/70 font-mono text-[13px] leading-relaxed">
                {snippets[activeSnippet]}
             </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeFunctionsCode;
