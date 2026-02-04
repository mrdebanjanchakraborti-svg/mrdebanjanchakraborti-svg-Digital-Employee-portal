
export enum LeadStatus {
  URGENT = 'urgent',
  ATTENTION = 'attention',
  FOLLOW_UP = 'follow_up',
  ACTION_REQUIRED = 'action_required',
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  NEGOTIATION = 'negotiation',
  WON = 'won',
  LOST = 'lost',
  CLOSED = 'closed'
}

export enum LeadStage {
  CAPTURE = 'capture',
  VALIDATE = 'validate',
  NURTURE = 'nurture',
  CLOSE = 'close',
  POST_SALE = 'post-sale'
}

export enum LeadTemperature {
  COLD = 'cold',
  WARM = 'warm',
  HOT = 'hot'
}

export enum LeadGrade {
  HOT = 'hot',
  WARM = 'warm',
  COLD = 'cold'
}

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  PARTNER = 'partner',
  CUSTOMER = 'customer',
  MARKETING_MANAGER = 'marketing_manager',
  CONTENT_CREATOR = 'content_creator',
  SALES_AGENT = 'sales_agent',
  MEMBER = 'member'
}

export enum PlanTier {
  FREE = 'free',
  STARTER = 'starter',
  GROWTH = 'growth',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  TRIALING = 'trialing',
  MANUAL_REVIEW = 'manual_review',
  PENDING_APPROVAL = 'pending_approval'
}

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit'
}

export enum ExecutionStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  BLOCKED = 'blocked',
  RETRYING = 'retrying'
}

export interface WalletTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  purpose: string;
  payment_method?: string;
  status: 'success' | 'failed' | 'pending';
  created_at: string;
  reference_id?: string;
  gst_data?: GSTBreakdown;
}

export interface SubscriptionOrder {
  id: string;
  order_date: string;
  company_name: string;
  industry_focus: string;
  order_id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  active_plan: PlanTier;
  purchase_amount: number;
  renewal_date: string;
  renewal_amount: number;
  status: 'active' | 'expired' | 'processing';
}

export enum CartStatus {
  DRAFT = 'draft',
  CHECKOUT = 'checkout',
  PAYMENT_PENDING = 'payment_pending',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  MANUAL_REVIEW = 'manual_review'
}

export enum CampaignType {
  EMAIL = 'email',
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  VOICE = 'voice',
  LEAD_GEN = 'lead_gen',
  NURTURE = 'nurture',
  REENGAGE = 'reengage',
  OFFER = 'offer',
  UPSELL = 'upsell',
  REVIEW = 'review'
}

export enum PostStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  FAILED = 'failed'
}

export enum CampaignGoal {
  BOOK_CALLS = 'book_calls',
  GET_REPLIES = 'get_replies',
  CLOSE_DEALS = 'close_deals',
  DRIVE_TRAFFIC = 'drive_traffic',
  COLLECT_REVIEWS = 'collect_reviews'
}

export enum CampaignStatus {
  ACTIVE = 'active',
  SCHEDULED = 'scheduled',
  PAUSED = 'paused',
  COMPLETED = 'completed'
}

export enum SocialPlatform {
  LINKEDIN = 'linkedin',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  GMB = 'gmb',
  YOUTUBE = 'youtube'
}

export enum SenderType {
  USER = 'user',
  LEAD = 'lead',
  AI = 'ai',
  SYSTEM = 'system'
}

export enum WorkflowScenario {
  SILENT_LEAD_RECOVERY = 'silent_lead_recovery',
  MISSED_CALL_RECOVERY = 'missed_call_recovery',
  PRICING_OBJECTION = 'pricing_objection'
}

export enum PayoutStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed'
}

export enum TriggerType {
  LEAD_INGESTION = 'lead_ingestion',
  CAMPAIGN_EVENT = 'campaign_event',
  EXTERNAL_CRM_PUSH = 'external_crm_push',
  CUSTOM_WEBHOOK = 'custom_webhook'
}

export enum OutgoingTriggerEvent {
  LEAD_CREATED = 'lead.created',
  LEAD_SCORED_HOT = 'lead.scored_hot',
  CAMPAIGN_STARTED = 'campaign.started',
  MESSAGE_SENT = 'message.sent',
  DEAL_WON = 'deal.won',
  SUBSCRIPTION_ACTIVATED = 'subscription.activated',
  WALLET_LOW_BALANCE = 'wallet.low_balance'
}

export enum OutgoingDestinationType {
  N8N = 'n8n',
  CUSTOM_WEBHOOK = 'custom_webhook',
  SLACK = 'slack',
  GOOGLE_APPS_SCRIPT = 'google_apps_script'
}

export enum TriggerStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  ERROR = 'error'
}

export enum RetryPolicy {
  NONE = 'none',
  INSTANT = 'instant',
  EXPONENTIAL = 'exponential'
}

export interface Agent {
  id: string;
  name: string;
  workload: number; // current active leads
  base_city: string;
  avatar_color: string;
}

export interface KanbanLead {
  id: string;
  name: string;
  company: string;
  score: number;
  grade: LeadGrade;
  priority: 'High' | 'Medium' | 'Low';
  temperature: LeadTemperature;
  scenario?: string;
  lastSignal?: string;
  lastActive?: string;
  interactionCount: number;
  requiresImmediateFollowup?: boolean;
  needsRescore?: boolean;
  assigned_to?: string; // agent_id
  assigned_agent_name?: string;
  metadata?: {
    city?: string;
  };
  bant: {
    need: boolean;
    authority: boolean;
    budget: boolean;
    timeline: string;
  };
}

export interface Trigger {
  id: string;
  workspace_id: string;
  name: string;
  type: TriggerType;
  status: TriggerStatus;
  webhook_url: string;
  secret: string;
  event_type: string;
  usage_count: number;
  created_at: string;
}

export interface OutgoingTrigger {
  id: string;
  workspace_id: string;
  name: string;
  event_type: OutgoingTriggerEvent;
  destination_type: OutgoingDestinationType;
  destination_url: string;
  secret: string;
  status: TriggerStatus;
  retry_policy: RetryPolicy;
  usage_count: number;
  last_dispatch_at?: string;
  created_at: string;
}

export interface WorkflowExecution {
  id: string;
  trigger_id: string;
  workflow_id: string;
  credits_used: number;
  status: ExecutionStatus;
  payload_preview: string;
  error_log?: string;
  created_at: string;
}

export interface GSTBreakdown {
  base_amount: number;
  cgst: number;
  sgst: number;
  igst: number;
  total_payable: number;
  gst_rate: number;
}

export interface CartItem {
  id: string;
  name: string;
  type: 'subscription' | 'wallet_addon';
  amount: number;
  plan_tier?: PlanTier;
}

export interface Cart {
  id: string;
  user_id: string;
  items: CartItem[];
  status: CartStatus;
  coupon?: string;
  gst_details?: {
    gstin?: string;
    billing_address: string;
    state: string;
  };
  breakdown: GSTBreakdown;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  logo_url?: string;
  plan_tier: PlanTier;
  subscription_status: SubscriptionStatus;
  created_at: string;
}

export interface Workspace {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
}

export interface Partner {
  id: string;
  user_id: string;
  company_name: string;
  referral_code: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface NormalizedMessage {
  id: string;
  conversation_id: string;
  media_url?: string;
  content: string;
  direction: 'inbound' | 'outbound';
  created_at: string;
}

export interface CallLog {
  id: string;
  customer_id: string;
  recording_url?: string;
  transcript_url?: string;
  duration: number;
  created_at: string;
}

export interface Payment {
  id: string;
  customer_id: string;
  amount: number;
  type: 'subscription' | 'renewal' | 'wallet_recharge';
  payment_method: 'razorpay' | 'manual';
  invoice_url?: string;
  gst_data?: GSTBreakdown;
  status: 'pending' | 'success' | 'failed' | 'manual_review';
  created_at: string;
}

export interface Conversation {
  id: string;
  workspace_id: string;
  lead_id: string;
  channel: ConversationChannel;
  status: ConversationStatus;
  priority: 'low' | 'medium' | 'high';
  assigned_to?: string;
  last_message_at: string;
  unread_count?: number;
  lead?: any;
}

export enum ConversationChannel {
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  WEB = 'web',
  VOICE = 'voice'
}

export enum ConversationStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  PENDING = 'pending'
}

export enum StorageType {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export interface AIAsset {
  id: string;
  type: 'image' | 'video';
  url: string;
  prompt: string;
  created_at: string;
}
