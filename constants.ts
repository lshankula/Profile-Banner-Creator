import { PlatformConfig, PlatformId } from './types';

export const PLATFORMS: Record<PlatformId, PlatformConfig> = {
  [PlatformId.FACEBOOK_COVER]: {
    id: PlatformId.FACEBOOK_COVER,
    label: "Facebook Cover",
    category: "Social",
    aspectRatio: "16:9",
    description: "Standard Facebook profile cover header.",
    targetUsage: "820x312 pixels (Approx 2.6:1)",
    safeZoneInstruction: "16:9 Canvas. NEGATIVE SPACE RULE: The bottom-left area (approx 20% width) is STRICTLY FORBIDDEN. It must be empty background texture. DO NOT draw a circle, square, or fake profile picture."
  },
  [PlatformId.LINKEDIN_PERSONAL]: {
    id: PlatformId.LINKEDIN_PERSONAL,
    label: "LinkedIn Personal",
    category: "Business",
    aspectRatio: "16:9", // API doesn't support 4:1, so we generate 16:9 and instruct to center
    description: "Personal profile background banner.",
    targetUsage: "1584x396 pixels (Exact 4:1 Strip)",
    safeZoneInstruction: "STRIP FORMAT: Design a thin horizontal strip in the vertical center. The top and bottom 25% of the image are 'bleed' area (plain background). DO NOT put a profile picture placeholder in the bottom left."
  },
  [PlatformId.LINKEDIN_COMPANY]: {
    id: PlatformId.LINKEDIN_COMPANY,
    label: "LinkedIn Company",
    category: "Business",
    aspectRatio: "16:9",
    description: "Company page header.",
    targetUsage: "1128x191 pixels (Approx 6:1 Strip)",
    safeZoneInstruction: "EXTREME STRIP: Focus all content in the absolute vertical center. The top 35% and bottom 35% will be cropped out. NO UI ELEMENTS."
  },
  [PlatformId.GOOGLE_BUSINESS]: {
    id: PlatformId.GOOGLE_BUSINESS,
    label: "Google Business",
    category: "Business",
    aspectRatio: "16:9",
    description: "Google Maps/Search business profile cover.",
    targetUsage: "Standard 16:9 with center focus",
    safeZoneInstruction: "Center all critical information. Keep text away from edges. Clean, photo-centric design."
  },
  [PlatformId.TWITTER_HEADER]: {
    id: PlatformId.TWITTER_HEADER,
    label: "X / Twitter",
    category: "Social",
    aspectRatio: "16:9", 
    description: "Twitter profile header.",
    targetUsage: "1500x500 pixels (3:1 Strip)",
    safeZoneInstruction: "OBSTRUCTION WARNING: The bottom-left is covered by the user's avatar. LEAVE THIS AREA EMPTY. Align all text to the RIGHT side. Do not draw a fake circle."
  },
  [PlatformId.YOUTUBE_CHANNEL]: {
    id: PlatformId.YOUTUBE_CHANNEL,
    label: "YouTube Channel",
    category: "Social",
    aspectRatio: "16:9",
    description: "YouTube Channel Art (TV size).",
    targetUsage: "2560x1440 (TV) -> 1546x423 (Mobile/Desktop Safe Area)",
    safeZoneInstruction: "YOUTUBE SPECIFIC: The 'Mobile Safe Area' is a thin strip in the DEAD CENTER (1546x423). Visualize a 'Banner within a Banner'. All Text, Logo, and Faces MUST be inside this center strip. The top and bottom huge areas are just decorative background wallpaper for TV apps. Make the center strip pop."
  },
  [PlatformId.LINKEDIN_EVENT]: {
    id: PlatformId.LINKEDIN_EVENT,
    label: "LinkedIn Event",
    category: "Events",
    aspectRatio: "16:9",
    description: "Header for a LinkedIn Event page.",
    targetUsage: "16:9 Standard",
    safeZoneInstruction: "Standard 16:9 layout. Keep margins of 10% on all sides."
  },
  [PlatformId.EMAIL_SIGNATURE]: {
    id: PlatformId.EMAIL_SIGNATURE,
    label: "Email Signature",
    category: "Misc",
    aspectRatio: "16:9",
    description: "Wide email footer graphic.",
    targetUsage: "600x150 pixels (4:1 Strip)",
    safeZoneInstruction: "LETTERBOX DESIGN: Design a wide, short strip in the exact vertical center of the 16:9 canvas. The top and bottom thirds must be solid/clean background for easy cropping."
  },
  [PlatformId.ZOOM_BG]: {
    id: PlatformId.ZOOM_BG,
    label: "Zoom/Teams BG",
    category: "Misc",
    aspectRatio: "16:9",
    description: "Virtual meeting background.",
    targetUsage: "1920x1080 (16:9)",
    safeZoneInstruction: "The user sits in the center. Place Logos in top-left/top-right corners. Place Headlines in the top center or sides. The middle-bottom is obstructed by the person."
  }
};