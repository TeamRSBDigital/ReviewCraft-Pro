export type PlatformType =
  | 'upwork'
  | 'fiverr'
  | 'linkedin'
  | 'google'
  | 'facebook'
  | 'trustpilot'
  | 'peopleperhour'
  | 'freelancer'
  | 'custom';

export type AvatarShapeType = 'rounded' | 'square' | 'circle';

export type ThemeType =
  | 'upwork'
  | 'glass'
  | 'dark'
  | 'light'
  | 'gradient'
  | 'minimal'
  | 'luxury'
  | 'corporate'
  | 'modern';

export type QuoteStyleType =
  | 'classic'
  | 'modern'
  | 'minimal'
  | 'luxury'
  | 'speech-bubble'
  | 'gradient';

export type CardStyleType =
  | 'flat'
  | 'glass'
  | 'shadow'
  | 'soft-shadow'
  | 'floating'
  | 'rounded'
  | 'sharp';

export type BackgroundStyleType =
  | 'white'
  | 'gradient'
  | 'mesh-1'
  | 'mesh-2'
  | 'mesh-lux'
  | 'pattern'
  | 'noise'
  | 'abstract-shapes';

export type ResolutionType =
  | '1080x1080' // Square (1:1)
  | '1200x630'  // Landscape (1.91:1)
  | '1600x900'  // Web Landscape (16:9)
  | '1920x1080' // Full HD (16:9)
  | '2560x1440' // 2K QHD (16:9)
  | '3840x2160'; // 4K UHD (16:9)

export interface ReviewData {
  clientName: string;
  username: string;
  designation: string;
  company: string;
  country: string;
  reviewDate: string;
  reviewTitle: string;
  reviewText: string;
  rating: number; // e.g. 4.5, 5
  platform: PlatformType;
  customPlatformName: string;
  customPlatformLogoUrl?: string;
  verifiedBadge: boolean;
  showAvatar: boolean;
  avatarUrl: string; // Base64 or object URL
  avatarShape: AvatarShapeType;
  companyLogoUrl?: string;
  useQrCode: boolean;
  qrCodeUrl: string; // URL for QR code generator
}

export interface DesignConfig {
  theme: ThemeType;
  font: 'inter' | 'poppins' | 'manrope' | 'space' | 'playfair' | 'mono';
  quoteStyle: QuoteStyleType;
  cardStyle: CardStyleType;
  backgroundStyle: BackgroundStyleType;
  resolution: ResolutionType;
  scale: 1 | 2 | 4 | 8;
  transparentBg: boolean;
  watermark: boolean;
  watermarkText: string;
  customCss: string;
  primaryColor: string; // Dynamic coloring
  accentColor: string;
  cardBgColor: string;
  textColor: string;
  language?: 'en' | 'es' | 'ar' | 'bn' | 'fr';
  textDirection?: 'auto' | 'ltr' | 'rtl';
  filterGrayscale?: number; // 0 to 100
  filterSepia?: number; // 0 to 100
  filterBrightness?: number; // 50 to 150 (percentage)
  filterContrast?: number; // 50 to 150 (percentage)
  filterBlur?: number; // 0 to 20 (px)
  qrColorMode?: 'default' | 'primary' | 'accent' | 'custom';
  qrCustomColor?: string;
  qrErrorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  qrShowBorderRadius?: boolean;
  qrBorderRadius?: number; // border radius in px
  qrShowPadding?: boolean;
  qrPadding?: number; // padding in px
}

export interface SavedTemplate {
  id: string;
  name: string;
  reviewData: ReviewData;
  designConfig: DesignConfig;
  createdAt: string;
}

export interface AppThemePreset {
  id: string;
  name: string;
  primary: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}
