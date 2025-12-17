import { GoogleGenAI } from "@google/genai";
import { BannerFormState, PlatformId } from "../types";
import { PLATFORMS } from "../constants";

// Helper to convert file to Base64
const fileToPart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      const base64String = res.split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateBannerForPlatform = async (
  platformId: PlatformId,
  formState: BannerFormState
): Promise<string> => {
  // Initialize Gemini Client inside the function to use the latest API Key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const platform = PLATFORMS[platformId];
  
  // --- PROMPT ENGINEERING START ---
  
  let prompt = `ROLE: You are a world-class Senior Art Director specializing in premium ${platform.label} design.
TASK: Design a high-impact branding asset that reflects the unique identity of the user.
FORMAT: High-resolution (8k), photorealistic or premium 3D/Vector.
TARGET ASPECT RATIO: ${platform.aspectRatio} (Usage: ${platform.targetUsage}).
\n`;

  // Safe Zone / Cropping Logic (The "Functional" requirement)
  if (formState.optimizeSafeZones) {
    prompt += `LAYOUT & COMPOSITION (CRITICAL):
    - ${platform.safeZoneInstruction}
    - IF STRIP FORMAT (e.g. LinkedIn/Twitter/Email): Vertically center all text/logos so they survive cropping.
    
    *** FORBIDDEN ELEMENTS (STRICT RULE) ***
    - ABSOLUTELY NO fake profile picture circles, squares, or avatars.
    - ABSOLUTELY NO placeholder UI buttons (e.g., "Connect", "Follow").
    - The area marked as "obstructed" or "safe zone" must be NEGATIVE SPACE (Background Only).
    \n`;
  }

  // Art Direction & Theme (The "Vibe" requirement)
  const theme = formState.theme ? formState.theme : "Modern Professional, Clean, High-Tech, Minimalist";
  
  prompt += `DYNAMIC CREATIVE DIRECTION:
  - INPUT THEME: "${theme}"
  - BRAND CONTEXT: Headline: "${formState.headline}", Tagline: "${formState.tagline}".
  
  VISUAL STRATEGY:
  1. ANALYZE the content niche based on the headline and tagline (e.g., Finance, Gaming, Wellness, Coding, Lifestyle).
  2. SYNTHESIZE a unique visual metaphor that fits *this specific* niche.
  3. COMPOSITION: Use high-end graphic design principles—layering, depth, texture, and sophisticated lighting.
  
  ANTI-CLICHE PROTOCOL (STRICT):
  - AVOID LITERALISM: Do not place literal objects representing the field (e.g. no microphones for podcasts, no controllers for gaming, no coins for finance).
  - AVOID TECH TROPES: If the topic is Tech/AI, absolutely NO glowing brains, NO circuit boards, NO robot hands, NO matrix code.
  - AVOID REPETITIVE STYLES: Do not default to "Glassmorphism", "Synthwave", or "Cyberpunk" unless the user's Theme specifically requests it.
  - GOAL: Create a texture-rich, depth-filled background. Use architectural forms, organic flows, material textures (matte, metallic, fabric, stone), or dynamic light shaping to evoke the brand's feeling without using cheap stock photo tropes.
  \n`;

  // Color Theory
  prompt += `COLOR PALETTE (Apply with sophistication):
  - PRIMARY: ${formState.primaryColor}
  - SECONDARY: ${formState.secondaryColor}
  - ACCENT: ${formState.accentColor}
  - APPLICATION: Use these colors for lighting accents, gradients, and key visual anchors. Ensure high contrast for text readability.
  \n`;

  // Text Content
  prompt += `TYPOGRAPHY (Render exactly as written):
  - HEADLINE: "${formState.headline}" (Large, Bold, Readable)
  ${formState.tagline ? `- SUBTITLE: "${formState.tagline}"` : ''}
  ${formState.cta ? `- CTA: "${formState.cta}" (Use Accent Color)` : ''}
  \n`;

  const parts: any[] = [{ text: prompt }];

  // --- IMAGE BLENDING INSTRUCTIONS ---
  
  // Handle Logo
  if (formState.logo) {
    try {
      const logoPart = await fileToPart(formState.logo);
      parts.push(logoPart);
      parts.push({ text: `
      [IMAGE 1: BRAND LOGO]
      - Place prominently (Top-Right or Top-Left).
      - Ensure high contrast against background.
      ` });
    } catch (e) {
      console.error("Failed to process logo", e);
    }
  }

  // Handle Headshot
  if (formState.headshot) {
    try {
      const headshotPart = await fileToPart(formState.headshot);
      parts.push(headshotPart);
      parts.push({ text: `
      [IMAGE 2: REFERENCE FACE - STRICT IDENTITY & POSE PRESERVATION]
      - SOURCE OF TRUTH: Use the EXACT face and head structure from this image.
      - ANGLE/POSE: PRESERVE THE ORIGINAL HEAD ANGLE. If the photo is front-facing, keep the subject front-facing. Do NOT force a side profile view if it looks unnatural.
      - EXPRESSION: Maintain the original expression.
      - COMPOSITION: Place the subject in a balanced position (Left or Right) that matches their gaze direction. If looking straight, place off-center to balance the text.
      - INTEGRATION: Match the lighting and color grading of the subject to the background, but do not alter the face itself.
      ` });
    } catch (e) {
      console.error("Failed to process headshot", e);
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview', // Nano Banana Pro
      contents: {
        parts: parts,
      },
      config: {
        imageConfig: {
          aspectRatio: platform.aspectRatio,
          imageSize: "2K" // High res for headers
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image generated.");

  } catch (error) {
    console.error(`Error generating for ${platformId}:`, error);
    throw error;
  }
};