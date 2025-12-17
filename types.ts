export enum PlatformId {
  FACEBOOK_COVER = 'facebook_cover',
  LINKEDIN_PERSONAL = 'linkedin_personal',
  LINKEDIN_COMPANY = 'linkedin_company',
  GOOGLE_BUSINESS = 'google_business',
  TWITTER_HEADER = 'twitter_header',
  YOUTUBE_CHANNEL = 'youtube_channel',
  LINKEDIN_EVENT = 'linkedin_event',
  EMAIL_SIGNATURE = 'email_signature',
  ZOOM_BG = 'zoom_bg'
}

export interface PlatformConfig {
  id: PlatformId;
  label: string;
  category: 'Social' | 'Business' | 'Events' | 'Misc';
  aspectRatio: "16:9" | "4:3" | "1:1"; // Gemini API supported ratios
  description: string;
  targetUsage: string; // e.g., "4:1 strip", "Safe area in center"
  safeZoneInstruction: string;
}

export interface BannerFormState {
  selectedPlatforms: PlatformId[];
  headline: string;
  tagline: string;
  cta: string;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  optimizeSafeZones: boolean;
  headshot: File | null;
  logo: File | null;
}

export interface GeneratedAsset {
  platformId: PlatformId;
  imageUrl: string;
  loading: boolean;
  error?: string;
}