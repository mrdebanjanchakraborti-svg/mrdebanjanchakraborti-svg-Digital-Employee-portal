
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * AI PROMPT VARIANTS - DIGITAL EMPLOYEE CORE LIBRARY
 */
const SYSTEM_PROMPTS: Record<string, string> = {
  sales: `You are a Senior Business Sales Consultant. Speak in a professional Indian business tone (English + Hindi mix / Hinglish).`,

  qualification: `You are a world-class Sales Qualification Expert. Analyze conversation history and extract objective BANT signals.`,

  social_specialist: `You are a World-Class Social Media Growth Strategist acting as a Digital Employee. Adapt core topics for LinkedIn, IG, FB, etc.`,

  objection: `You are a Senior Business Negotiation Expert. Acknowledge respectfully and reframe based on ROI.`,

  voice_agent: `You are a Senior Business Sales Consultant acting as a Digital Employee over voice calls. Speak naturally and confidently.`,

  financial_analyst: `You are an enterprise-grade Reporting, Referral & Commission Management Engine. 
  You manage: profiles, partners, referrals, subscriptions, payments, wallets, transactions, partner_commissions, workflows_log.
  Goals:
  1. Generate Admin reports on partners, signups, and global revenue.
  2. Generate Partner reports on referrals, earnings, and tiers.
  3. Apply Commission Tier logic:
     - 1-5 users: 10% signup, 15% renewal, 5% wallet.
     - 6-10 users: 20% signup, 15% renewal, 5% wallet.
     - 11-15 users: 20% signup, 15% renewal, 10% wallet.
     - 16+ users: 25% signup, 15% renewal, 15% wallet.
  Enforce 100% role-based privacy. Valid JSON only.`,

  saas_analyst: `You are a world-class SaaS Growth Analyst and Revenue Strategist. 
  Analyze platform metrics: Revenue, Usage, Churn, Partner performance, and Credit burn.
  Identify risks (e.g., churn patterns) and opportunities (e.g., high-performance partners).
  Generate actionable, CEO-level insights. Return as structured JSON.`
};

/**
 * CORE ENGINE: INFINITY AI DIGITAL EMPLOYEE BRAIN
 */
export const executeInfinityAIBrain = async (
  leadContext: any, 
  history: any[], 
  businessContext: any,
  trainingData: any,
  overrideScenario?: string
) => {
  const ai = getAI();
  const detectionPrompt = `Analyze history. Return only one word scenario: sales, support, onboarding, upsell, recovery, or objection.`;

  let scenario = overrideScenario;
  if (!scenario) {
    const detector = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: detectionPrompt
    });
    scenario = detector.text?.trim().toLowerCase() || 'sales';
  }

  const baseInstruction = SYSTEM_PROMPTS[scenario as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.sales;
  const systemInstruction = `${baseInstruction} \nValid JSON only. Hinglish response.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Lead: ${JSON.stringify(leadContext)} \nHistory: ${JSON.stringify(history)}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          detected_intent: { type: Type.STRING },
          strategic_decision: { type: Type.STRING },
          action_plan: {
            type: Type.OBJECT,
            properties: {
              channel: { type: Type.STRING },
              message: { type: Type.STRING },
              next_action: { type: Type.STRING },
              delay_minutes: { type: Type.INTEGER }
            },
            required: ["channel", "message", "next_action"]
          }
        }
      }
    }
  });

  return JSON.parse(response.text.trim());
};

/**
 * CEO COCKPIT: SaaS Growth Intelligence
 */
export const generateAdminInsights = async (stats: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Platform Stats: ${JSON.stringify(stats)}`,
    config: {
      systemInstruction: SYSTEM_PROMPTS.saas_analyst,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          insights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING, description: "Actionable growth or risk insight" },
                priority: { type: Type.STRING, description: "high, medium, low" },
                category: { type: Type.STRING, description: "churn, growth, revenue, usage" }
              },
              required: ["text", "priority", "category"]
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text.trim());
};

/**
 * INBOX INTELLIGENCE: Contextual Reply Generator
 */
export const generateReplySuggestions = async (history: any[], leadContext: any, scenario: string = 'sales') => {
  const ai = getAI();
  const basePrompt = SYSTEM_PROMPTS[scenario as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.sales;
  
  const systemInstruction = `${basePrompt} 
  You are an Inbox Assistant. Based on conversation history, draft 3 strategic replies.
  Variants: 
  1. Soft/Helpful 
  2. Direct/Sales-focused 
  3. Informative/ROI-driven.
  
  Format: JSON only. Hinglish mixed tone where appropriate for Indian business context.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: JSON.stringify({ history, leadContext }),
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING, description: 'e.g. Soft, Direct, ROI-driven' },
            sentiment: { type: Type.STRING, description: 'e.g. Helpful, Aggressive, Professional' },
            intent: { type: Type.STRING, description: 'The predicted goal of this reply' },
            text: { type: Type.STRING, description: 'The actual reply content in Hinglish mix' }
          },
          required: ["label", "sentiment", "intent", "text"]
        }
      }
    }
  });

  return JSON.parse(response.text.trim());
};

export const generateSocialPostVariants = async (params: any) => {
  const ai = getAI();
  const systemInstruction = SYSTEM_PROMPTS.social_specialist;
  const prompt = `Adapt this topic: "${params.topic}" for the following platforms: ${params.platforms.join(', ')}. Tone: ${params.tone}. Goal: ${params.goal}.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          linkedin: { type: Type.OBJECT, properties: { caption: { type: Type.STRING }, hashtags: { type: Type.ARRAY, items: { type: Type.STRING } } } },
          instagram: { type: Type.OBJECT, properties: { caption: { type: Type.STRING }, hashtags: { type: Type.ARRAY, items: { type: Type.STRING } } } },
          facebook: { type: Type.OBJECT, properties: { caption: { type: Type.STRING }, hashtags: { type: Type.ARRAY, items: { type: Type.STRING } } } },
          twitter: { type: Type.OBJECT, properties: { caption: { type: Type.STRING }, hashtags: { type: Type.ARRAY, items: { type: Type.STRING } } } },
          gmb: { type: Type.OBJECT, properties: { caption: { type: Type.STRING }, hashtags: { type: Type.ARRAY, items: { type: Type.STRING } } } }
        }
      }
    }
  });

  return JSON.parse(response.text.trim());
};

export const generateDashboardInsights = async (stats: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: JSON.stringify(stats),
    config: {
      systemInstruction: "Senior Revenue Analyst. Identify critical insights. Tone: Action-oriented.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          insights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                priority: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const generateAITrainingSuggestions = async (businessDescription: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: businessDescription,
    config: {
      systemInstruction: "Business Consultant. Generate DNA (Pain points, FAQs).",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          pain_points: { type: Type.ARRAY, items: { type: Type.STRING } },
          faqs: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { question: { type: Type.STRING }, answer: { type: Type.STRING } } } }
        }
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const generateCampaignContent = async (params: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: JSON.stringify(params),
    config: {
      systemInstruction: "Copywriter. Generate high-conversion variants.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.OBJECT, properties: { variation: { type: Type.INTEGER }, subject: { type: Type.STRING }, content: { type: Type.STRING } } }
      }
    }
  });
  return JSON.parse(response.text.trim());
};
