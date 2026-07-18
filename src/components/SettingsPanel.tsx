import React, { useState, useRef } from 'react';
import {
  User,
  Quote,
  Palette,
  Download,
  Sparkles,
  Plus,
  Trash2,
  Copy,
  Check,
  FileText,
  Layout,
  QrCode,
  Image as ImageIcon,
  FileUp,
  Sliders,
  Database,
  RefreshCw,
  Layers,
  HelpCircle,
  Eye,
  ExternalLink,
  Globe,
} from 'lucide-react';
import {
  ReviewData,
  DesignConfig,
  PlatformType,
  AvatarShapeType,
  ThemeType,
  QuoteStyleType,
  CardStyleType,
  BackgroundStyleType,
  ResolutionType,
  SavedTemplate,
} from '../types';
import { LANGUAGES, TRANSLATIONS, DEMO_TEXTS, LanguageCode } from '../lib/translations';

interface SettingsPanelProps {
  reviewData: ReviewData;
  setReviewData: React.Dispatch<React.SetStateAction<ReviewData>>;
  designConfig: DesignConfig;
  setDesignConfig: React.Dispatch<React.SetStateAction<DesignConfig>>;
  onRandomDemo: () => void;
  onReset: () => void;
  onSaveTemplate: (name: string) => void;
  savedTemplates: SavedTemplate[];
  onLoadTemplate: (template: SavedTemplate) => void;
  onDeleteTemplate: (id: string) => void;
  onCopyText: () => void;
  onDownload: (format: 'png' | 'jpg' | 'webp') => void;
  onCopyImage: () => void;
  onShare: () => void;
  onPrint: () => void;
  showBeforeAfter: boolean;
  setShowBeforeAfter: React.Dispatch<React.SetStateAction<boolean>>;
  showBefore: boolean;
  setShowBefore: React.Dispatch<React.SetStateAction<boolean>>;
  isExporting: boolean;
  onBatchExport: (reviewsJson: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  reviewData,
  setReviewData,
  designConfig,
  setDesignConfig,
  onRandomDemo,
  onReset,
  onSaveTemplate,
  savedTemplates,
  onLoadTemplate,
  onDeleteTemplate,
  onCopyText,
  onDownload,
  onCopyImage,
  onShare,
  onPrint,
  showBeforeAfter,
  setShowBeforeAfter,
  showBefore,
  setShowBefore,
  isExporting,
  onBatchExport,
}) => {
  const currentLang: LanguageCode = designConfig.language || 'en';
  const t = (key: string): string => {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  const isRtl =
    designConfig.textDirection === 'rtl' ||
    (designConfig.textDirection === 'auto' && designConfig.language === 'ar');

  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'advanced' | 'templates' | 'batch'>('content');
  const [newTemplateName, setNewTemplateName] = useState('');
  const [batchInput, setBatchInput] = useState('');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  
  // File inputs references
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const platformLogoInputRef = useRef<HTMLInputElement>(null);

  // AI Palette Generator states
  const [paletteMood, setPaletteMood] = useState<'luxury' | 'tech' | 'neon' | 'fresh' | 'minimal'>('luxury');

  const setCopied = (key: string) => {
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  // Helper to read and convert file to Base64
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'avatar' | 'logo' | 'platformLogo'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (type === 'avatar') {
        setReviewData((prev) => ({ ...prev, avatarUrl: base64 }));
      } else if (type === 'logo') {
        setReviewData((prev) => ({ ...prev, companyLogoUrl: base64 }));
      } else if (type === 'platformLogo') {
        setReviewData((prev) => ({ ...prev, customPlatformLogoUrl: base64 }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag & Drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    type: 'avatar' | 'logo' | 'platformLogo'
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (type === 'avatar') {
        setReviewData((prev) => ({ ...prev, avatarUrl: base64 }));
      } else if (type === 'logo') {
        setReviewData((prev) => ({ ...prev, companyLogoUrl: base64 }));
      } else if (type === 'platformLogo') {
        setReviewData((prev) => ({ ...prev, customPlatformLogoUrl: base64 }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Smart Offline AI Color Palette Generator
  const generatePalette = (mood: 'luxury' | 'tech' | 'neon' | 'fresh' | 'minimal') => {
    const palettes = {
      luxury: {
        theme: 'luxury' as ThemeType,
        backgroundStyle: 'mesh-lux' as BackgroundStyleType,
        primaryColor: '#D4AF37', // Gold
        accentColor: '#F3E5AB',
        cardBgColor: '#0a0a0a',
        textColor: '#f8fafc',
        customCss: `/* Royal Gold Luxury style */\n.review-card {\n  border: 1px solid rgba(212, 175, 55, 0.25) !important;\n}\n.quote-symbol {\n  color: #D4AF37 !important;\n}`,
      },
      tech: {
        theme: 'dark' as ThemeType,
        backgroundStyle: 'mesh-2' as BackgroundStyleType,
        primaryColor: '#3b82f6', // Electric blue
        accentColor: '#60a5fa',
        cardBgColor: '#0f172a',
        textColor: '#f8fafc',
        customCss: `/* High Tech Neon Border */\n.review-card {\n  box-shadow: 0 0 25px rgba(59, 130, 246, 0.15) !important;\n}`,
      },
      neon: {
        theme: 'gradient' as ThemeType,
        backgroundStyle: 'mesh-1' as BackgroundStyleType,
        primaryColor: '#ec4899', // Pink
        accentColor: '#a855f7', // Purple
        cardBgColor: 'rgba(15, 23, 42, 0.85)',
        textColor: '#f8fafc',
        customCss: `/* Cyber Punk Glow */\n.review-card {\n  background: rgba(15, 23, 42, 0.75) !important;\n  border-color: #ec4899 !important;\n}`,
      },
      fresh: {
        theme: 'upwork' as ThemeType,
        backgroundStyle: 'pattern' as BackgroundStyleType,
        primaryColor: '#14A800', // Upwork green
        accentColor: '#15803d',
        cardBgColor: '#ffffff',
        textColor: '#111827',
        customCss: `/* Eco Fresh Emerald */\n.review-card {\n  border-top: 6px solid #14A800 !important;\n}`,
      },
      minimal: {
        theme: 'light' as ThemeType,
        backgroundStyle: 'white' as BackgroundStyleType,
        primaryColor: '#0f172a',
        accentColor: '#64748b',
        cardBgColor: '#ffffff',
        textColor: '#0f172a',
        customCss: `/* Premium minimalist slate */\n.review-card {\n  border: 1px solid #e2e8f0 !important;\n  border-radius: 8px !important;\n}`,
      },
    };

    const selected = palettes[mood];
    setDesignConfig((prev) => ({
      ...prev,
      theme: selected.theme,
      backgroundStyle: selected.backgroundStyle,
      primaryColor: selected.primaryColor,
      accentColor: selected.accentColor,
      cardBgColor: selected.cardBgColor,
      textColor: selected.textColor,
      customCss: selected.customCss,
    }));
  };

  const handleSaveTemplateClick = () => {
    if (!newTemplateName.trim()) return;
    onSaveTemplate(newTemplateName.trim());
    setNewTemplateName('');
  };

  const fillBatchDemo = () => {
    const demoBatch = [
      {
        clientName: "Jane Doe",
        designation: "CTO",
        company: "Alpha Blocks",
        country: "USA",
        reviewTitle: "Top-notch craftsmanship",
        reviewText: "Incredible speed and code quality. Will hire again!",
        rating: 5,
        platform: "upwork"
      },
      {
        clientName: "Marc Vanhoutte",
        designation: "Creative Lead",
        company: "Atelier Paris",
        country: "France",
        reviewTitle: "Bespoke user experience!",
        reviewText: "Captured our design language with meticulous attention to detail.",
        rating: 5,
        platform: "fiverr"
      }
    ];
    setBatchInput(JSON.stringify(demoBatch, null, 2));
  };

  return (
    <div id="settings-panel" className="bg-slate-950/40 backdrop-blur-md border border-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden h-full">
      {/* Settings Navigation Header */}
      <div className="p-2.5 bg-slate-950 border-b border-slate-900/80 flex items-center overflow-x-auto select-none gap-1.5 scrollbar-thin">
        {([
          { id: 'content', label: t('tab_content'), icon: User },
          { id: 'design', label: t('tab_design'), icon: Palette },
          { id: 'advanced', label: t('tab_advanced'), icon: Sliders },
          { 
            id: 'templates', 
            label: `${t('tab_templates')} (${savedTemplates.length})`, 
            icon: Layers 
          },
          { id: 'batch', label: t('tab_batch'), icon: Database }
        ] as const).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-widest rounded-xl transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
              }`}
              id={`tab-${tab.id}`}
            >
              <Icon size={14} className={isActive ? 'text-emerald-400' : 'text-slate-500'} />
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute -bottom-[11px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-emerald-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Language Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-5 py-3 bg-slate-950 border-b border-slate-900 gap-3">
        <div className="flex items-center gap-2">
          <Globe size={15} className="text-emerald-400 shrink-0" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300 font-mono">
            Locale System
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Prefill button */}
          <button
            onClick={() => {
              const currentLang = designConfig.language || 'en';
              const demo = DEMO_TEXTS[currentLang];
              if (demo) {
                setReviewData((prev) => ({
                  ...prev,
                  ...demo,
                }));
              }
            }}
            title={t('btn_prefill_lang_text')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-md transition-all cursor-pointer"
          >
            <Sparkles size={10} />
            {t('btn_prefill_lang_text')}
          </button>
          
          {/* Language selection dropdown */}
          <select
            value={designConfig.language || 'en'}
            onChange={(e) => {
              const selectedLang = e.target.value as any;
              setDesignConfig((prev) => ({
                ...prev,
                language: selectedLang,
              }));
              // Auto-prefill demo text of the selected language so they see it instantly!
              const demo = DEMO_TEXTS[selectedLang];
              if (demo) {
                setReviewData((prev) => ({
                  ...prev,
                  ...demo,
                }));
              }
            }}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-md px-2.5 py-1 font-semibold focus:outline-none focus:border-emerald-500/50 cursor-pointer"
            id="lang-select-dropdown"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>

          {/* Text Direction dropdown override */}
          <select
            value={designConfig.textDirection || 'auto'}
            onChange={(e) => {
              const dirVal = e.target.value as any;
              setDesignConfig((prev) => ({
                ...prev,
                textDirection: dirVal,
              }));
            }}
            title={t('label_text_dir')}
            className="bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded-md px-2.5 py-1 font-semibold focus:outline-none focus:border-emerald-500/50 cursor-pointer font-mono"
            id="direction-select-dropdown"
          >
            <option value="auto">{t('opt_dir_auto')}</option>
            <option value="ltr">{t('opt_dir_ltr')}</option>
            <option value="rtl">{t('opt_dir_rtl')}</option>
          </select>
        </div>
      </div>

      {/* Main Settings Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* TAB 1: CARD CONTENT */}
        {activeTab === 'content' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Action Presets */}
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <button
                onClick={onRandomDemo}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg hover:bg-emerald-100 transition-all border border-emerald-100 dark:border-emerald-900 cursor-pointer"
                id="btn-random-demo"
              >
                <Sparkles size={14} />
                {t('btn_random')}
              </button>
              <button
                onClick={onReset}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
                id="btn-reset"
              >
                <RefreshCw size={14} />
                {t('btn_reset')}
              </button>
            </div>

            {/* Client Identity Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                  {t('label_client_name')}
                </label>
                <input
                  type="text"
                  value={reviewData.clientName}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, clientName: e.target.value }))
                  }
                  dir={isRtl ? 'rtl' : 'ltr'}
                  placeholder="Alexander Mercer"
                  className={`w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                  {t('label_designation')}
                </label>
                <input
                  type="text"
                  value={reviewData.designation}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, designation: e.target.value }))
                  }
                  dir={isRtl ? 'rtl' : 'ltr'}
                  placeholder="VP of Product"
                  className={`w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                  {t('label_company')}
                </label>
                <input
                  type="text"
                  value={reviewData.company}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, company: e.target.value }))
                  }
                  dir={isRtl ? 'rtl' : 'ltr'}
                  placeholder="Aether Tech"
                  className={`w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                  {t('label_country')}
                </label>
                <input
                  type="text"
                  value={reviewData.country}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, country: e.target.value }))
                  }
                  dir={isRtl ? 'rtl' : 'ltr'}
                  placeholder="United States"
                  className={`w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>
            </div>

            {/* Platform Dropdown */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                  {t('label_platform')}
                </label>
                <select
                  value={reviewData.platform}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      platform: e.target.value as PlatformType,
                    }))
                  }
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
                >
                  <option value="upwork">Upwork</option>
                  <option value="fiverr">Fiverr</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="google">Google</option>
                  <option value="facebook">Facebook</option>
                  <option value="trustpilot">Trustpilot</option>
                  <option value="peopleperhour">PeoplePerHour</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="custom">Custom Brand</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                  {t('label_rating')}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={reviewData.rating}
                    onChange={(e) =>
                      setReviewData((prev) => ({
                        ...prev,
                        rating: parseFloat(e.target.value),
                      }))
                    }
                    className="flex-1 accent-emerald-500 cursor-pointer"
                  />
                  <span className="font-mono text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded">
                    {reviewData.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Custom platform name / logo if selected */}
              {reviewData.platform === 'custom' && (
                <div className="col-span-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                      {t('label_custom_platform')}
                    </label>
                    <input
                      type="text"
                      value={reviewData.customPlatformName}
                      onChange={(e) =>
                        setReviewData((prev) => ({
                          ...prev,
                          customPlatformName: e.target.value,
                        }))
                      }
                      dir={isRtl ? 'rtl' : 'ltr'}
                      placeholder="e.g. Behance"
                      className={`w-full px-3.5 py-1.5 text-xs border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                      Upload Custom Brand Logo
                    </label>
                    <input
                      type="file"
                      ref={platformLogoInputRef}
                      onChange={(e) => handleFileChange(e, 'platformLogo')}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => platformLogoInputRef.current?.click()}
                      className="w-full px-3 py-1.5 text-xs border border-dashed border-slate-200 dark:border-slate-800 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 flex items-center justify-center gap-1 text-slate-500 hover:text-emerald-600 bg-white dark:bg-slate-900 cursor-pointer"
                    >
                      <FileUp size={12} />
                      Choose SVG / PNG
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Toggles */}
            <div className="flex items-center justify-between p-3.5 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-xl border border-emerald-500/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <div>
                  <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {t('label_verified')}
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Affixes the professional verification tick-mark
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reviewData.verifiedBadge}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, verifiedBadge: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Review Text details */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                  {t('label_review_title')}
                </label>
                <input
                  type="text"
                  value={reviewData.reviewTitle}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, reviewTitle: e.target.value }))
                  }
                  dir={isRtl ? 'rtl' : 'ltr'}
                  placeholder="Outstanding engineering and architecture"
                  className={`w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 font-medium ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                  {t('label_review_text')}
                  <button
                    onClick={onCopyText}
                    className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline capitalize cursor-pointer font-sans"
                  >
                    <Copy size={10} />
                    {t('btn_copy_text')}
                  </button>
                </label>
                <textarea
                  rows={4}
                  value={reviewData.reviewText}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, reviewText: e.target.value }))
                  }
                  dir={isRtl ? 'rtl' : 'ltr'}
                  placeholder={t('placeholder_review_text')}
                  className={`w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                    {t('label_date')}
                  </label>
                  <input
                    type="text"
                    value={reviewData.reviewDate}
                    onChange={(e) =>
                      setReviewData((prev) => ({ ...prev, reviewDate: e.target.value }))
                    }
                    dir={isRtl ? 'rtl' : 'ltr'}
                    placeholder="July 2026"
                    className={`w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 ${isRtl ? 'text-right' : 'text-left'}`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                    {t('label_username')}
                  </label>
                  <input
                    type="text"
                    value={reviewData.username}
                    onChange={(e) =>
                      setReviewData((prev) => ({ ...prev, username: e.target.value }))
                    }
                    dir="ltr"
                    placeholder="alexmercer"
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 text-left"
                  />
                </div>
              </div>
            </div>

            {/* AVATAR AND BRAND IMAGES BOXES */}
            <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5 space-y-4 font-sans">
              <h4 className="text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                Media & Verification Assets
              </h4>

              {/* Avatar settings block */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-4">
                <div className="col-span-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-sans">
                    Display Client Photo
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reviewData.showAvatar}
                      onChange={(e) =>
                        setReviewData((prev) => ({ ...prev, showAvatar: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                {reviewData.showAvatar && (
                  <>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 mb-1.5 font-sans">
                        Avatar Frame Shape
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['circle', 'rounded', 'square'] as AvatarShapeType[]).map((shape) => (
                          <button
                            key={shape}
                            onClick={() =>
                              setReviewData((prev) => ({ ...prev, avatarShape: shape }))
                            }
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border capitalize transition-all ${
                              reviewData.avatarShape === shape
                                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900'
                            }`}
                          >
                            {shape}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 mb-1.5 font-sans">
                        Client Portrait Photo
                      </label>
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'avatar')}
                        onClick={() => avatarInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500 transition-all bg-white dark:bg-slate-900 group"
                      >
                        <input
                          type="file"
                          ref={avatarInputRef}
                          onChange={(e) => handleFileChange(e, 'avatar')}
                          accept="image/*"
                          className="hidden"
                        />
                        {reviewData.avatarUrl ? (
                          <div className="flex items-center gap-3 justify-center">
                            <img
                              src={reviewData.avatarUrl}
                              alt="Avatar Preview"
                              className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                            />
                            <div className="text-left">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                Image uploaded successfully
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                Click or drag over to replace
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <ImageIcon className="mx-auto text-slate-400 dark:text-slate-600 group-hover:text-emerald-500" size={24} />
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                              Drag & Drop Client Portrait
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              Supports JPG, PNG, WEBP
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Company Logo and QR verification */}
              <div className="grid grid-cols-1 gap-4 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 mb-1.5 font-sans">
                    Client's Company Logo (Optional)
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'logo')}
                    onClick={() => logoInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500 transition-all bg-white dark:bg-slate-900 group"
                  >
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={(e) => handleFileChange(e, 'logo')}
                      accept="image/*"
                      className="hidden"
                    />
                    {reviewData.companyLogoUrl ? (
                      <div className="flex items-center gap-3 justify-center">
                        <img
                          src={reviewData.companyLogoUrl}
                          alt="Company Logo Preview"
                          className="w-12 h-12 object-contain"
                        />
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600">
                            Logo added
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Click or drag to replace
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setReviewData((p) => ({ ...p, companyLogoUrl: '' }));
                          }}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded"
                          title="Remove logo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <ImageIcon className="mx-auto text-slate-400 dark:text-slate-600" size={20} />
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                          Drag & Drop Company Logo
                        </span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DESIGN & THEMES */}
        {activeTab === 'design' && (
          <div className="space-y-5 animate-fadeIn">
            {/* AI Preset Palette Generator block */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center gap-1.5">
                <Sparkles className="text-emerald-500" size={16} />
                <h4 className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent font-sans">
                  AI Color Palette Generator
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal font-sans">
                Instantly apply gorgeous, mathematically matched luxury, corporate, minimal, or cyber neon background/text gradients.
              </p>
              <div className="grid grid-cols-5 gap-1.5 font-sans">
                {(['luxury', 'tech', 'neon', 'fresh', 'minimal'] as const).map((mood) => (
                  <button
                    key={mood}
                    onClick={() => generatePalette(mood)}
                    className="px-2 py-2 text-[10px] font-bold capitalize rounded-lg border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:text-emerald-600 bg-white dark:bg-slate-900 transition-all text-slate-600 dark:text-slate-400 shadow-sm font-sans"
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography selection */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-2">
                Font Family
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'inter', label: 'Inter UI' },
                  { id: 'poppins', label: 'Poppins' },
                  { id: 'manrope', label: 'Manrope' },
                  { id: 'space', label: 'Grotesk' },
                  { id: 'playfair', label: 'Playfair' },
                  { id: 'mono', label: 'Mono' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() =>
                      setDesignConfig((prev) => ({
                        ...prev,
                        font: f.id as any,
                      }))
                    }
                    className={`px-3 py-2 text-xs font-bold rounded-lg border text-center transition-all ${
                      designConfig.font === f.id
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:text-slate-400 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Design theme selector */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-2">
                Visual Theme Presets
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  'light',
                  'dark',
                  'upwork',
                  'glass',
                  'luxury',
                  'gradient',
                  'corporate',
                  'modern',
                  'minimal',
                ].map((theme) => (
                  <button
                    key={theme}
                    onClick={() =>
                      setDesignConfig((prev) => ({
                        ...prev,
                        theme: theme as ThemeType,
                      }))
                    }
                    className={`px-3 py-2 text-xs font-bold rounded-lg border capitalize text-center transition-all ${
                      designConfig.theme === theme
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:text-slate-400 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Quote Styles */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-2">
                Quote Styling
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['classic', 'modern', 'minimal', 'luxury', 'speech-bubble', 'gradient'] as QuoteStyleType[]).map((style) => (
                  <button
                    key={style}
                    onClick={() =>
                      setDesignConfig((prev) => ({
                        ...prev,
                        quoteStyle: style,
                      }))
                    }
                    className={`px-3 py-2 text-xs font-bold rounded-lg border capitalize text-center transition-all ${
                      designConfig.quoteStyle === style
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:text-slate-400 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {style.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Frame Styles */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-2">
                Card Frame Styles
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['flat', 'glass', 'shadow', 'soft-shadow', 'floating', 'rounded', 'sharp'] as CardStyleType[]).map((style) => (
                  <button
                    key={style}
                    onClick={() =>
                      setDesignConfig((prev) => ({
                        ...prev,
                        cardStyle: style,
                      }))
                    }
                    className={`px-3 py-2 text-xs font-bold rounded-lg border capitalize text-center transition-all ${
                      designConfig.cardStyle === style
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:text-slate-400 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {style.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Background options */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-2">
                Stage Background Styles
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'white', label: 'Plain Solid' },
                  { id: 'gradient', label: 'Dynamic Gradient' },
                  { id: 'mesh-1', label: 'Oceanic Mesh' },
                  { id: 'mesh-2', label: 'Abyssal Deep Mesh' },
                  { id: 'mesh-lux', label: 'Royal Obsidian Mesh' },
                  { id: 'pattern', label: 'Geometric Dot Grid' },
                  { id: 'noise', label: 'Classic Film Noise' },
                  { id: 'abstract-shapes', label: 'Abstract Blobs & Glass' },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() =>
                      setDesignConfig((prev) => ({
                        ...prev,
                        backgroundStyle: style.id as BackgroundStyleType,
                      }))
                    }
                    className={`px-3 py-2 text-xs font-bold rounded-lg border text-center transition-all ${
                      designConfig.backgroundStyle === style.id
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:text-slate-400 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Palette Overrides */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 mb-1 font-sans">
                  Accent Color
                </label>
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  <input
                    type="color"
                    value={designConfig.accentColor}
                    onChange={(e) =>
                      setDesignConfig((p) => ({ ...p, accentColor: e.target.value }))
                    }
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={designConfig.accentColor}
                    onChange={(e) =>
                      setDesignConfig((p) => ({ ...p, accentColor: e.target.value }))
                    }
                    className="w-full font-mono text-xs uppercase bg-transparent border-0 text-slate-700 dark:text-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 mb-1 font-sans">
                  Card Primary Accent
                </label>
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  <input
                    type="color"
                    value={designConfig.primaryColor}
                    onChange={(e) =>
                      setDesignConfig((p) => ({ ...p, primaryColor: e.target.value }))
                    }
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={designConfig.primaryColor}
                    onChange={(e) =>
                      setDesignConfig((p) => ({ ...p, primaryColor: e.target.value }))
                    }
                    className="w-full font-mono text-xs uppercase bg-transparent border-0 text-slate-700 dark:text-slate-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* CSS Filters Section */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4 font-sans">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-widest bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                  {t('header_filters')}
                </h4>
                <button
                  onClick={() => {
                    setDesignConfig((p) => ({
                      ...p,
                      filterGrayscale: 0,
                      filterSepia: 0,
                      filterBrightness: 100,
                      filterContrast: 100,
                      filterBlur: 0,
                    }));
                  }}
                  className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                >
                  {t('btn_reset_filters')}
                </button>
              </div>

              <div className="space-y-3.5 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                {/* Grayscale */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    <span>{t('label_filter_grayscale')}</span>
                    <span className="font-mono text-[11px] text-slate-400">{designConfig.filterGrayscale ?? 0}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={designConfig.filterGrayscale ?? 0}
                    onChange={(e) =>
                      setDesignConfig((p) => ({ ...p, filterGrayscale: parseInt(e.target.value) }))
                    }
                    className="w-full accent-emerald-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Sepia */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    <span>{t('label_filter_sepia')}</span>
                    <span className="font-mono text-[11px] text-slate-400">{designConfig.filterSepia ?? 0}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={designConfig.filterSepia ?? 0}
                    onChange={(e) =>
                      setDesignConfig((p) => ({ ...p, filterSepia: parseInt(e.target.value) }))
                    }
                    className="w-full accent-emerald-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Brightness */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    <span>{t('label_filter_brightness')}</span>
                    <span className="font-mono text-[11px] text-slate-400">{designConfig.filterBrightness ?? 100}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={designConfig.filterBrightness ?? 100}
                    onChange={(e) =>
                      setDesignConfig((p) => ({ ...p, filterBrightness: parseInt(e.target.value) }))
                    }
                    className="w-full accent-emerald-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Contrast */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    <span>{t('label_filter_contrast')}</span>
                    <span className="font-mono text-[11px] text-slate-400">{designConfig.filterContrast ?? 100}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={designConfig.filterContrast ?? 100}
                    onChange={(e) =>
                      setDesignConfig((p) => ({ ...p, filterContrast: parseInt(e.target.value) }))
                    }
                    className="w-full accent-emerald-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Blur */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    <span>{t('label_filter_blur')}</span>
                    <span className="font-mono text-[11px] text-slate-400">{designConfig.filterBlur ?? 0}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={designConfig.filterBlur ?? 0}
                    onChange={(e) =>
                      setDesignConfig((p) => ({ ...p, filterBlur: parseInt(e.target.value) }))
                    }
                    className="w-full accent-emerald-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADVANCED SETTINGS */}
        {activeTab === 'advanced' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Resolution Selector */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                Target Export Aspect Ratio / Size
              </label>
              <select
                value={designConfig.resolution}
                onChange={(e) =>
                  setDesignConfig((prev) => ({
                    ...prev,
                    resolution: e.target.value as ResolutionType,
                  }))
                }
                className="w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 font-medium"
              >
                <option value="1080x1080">Square 1:1 (Instagram / Portfolio - 1080x1080)</option>
                <option value="1200x630">Landscape 1.91:1 (LinkedIn / FB - 1200x630)</option>
                <option value="1600x900">Landscape 16:9 (Behance / Dribbble - 1600x900)</option>
                <option value="1920x1080">Full HD 16:9 (Presentation Slide - 1920x1080)</option>
                <option value="2560x1440">Quad HD 2K (High Fidelity Asset - 2560x1440)</option>
                <option value="3840x2160">Ultra HD 4K (Professional Print - 3840x2160)</option>
              </select>
            </div>

            {/* Scale Multiplier */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                Export Quality Multiplier (Antialiasing)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {([1, 2, 4, 8] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      setDesignConfig((prev) => ({
                        ...prev,
                        scale: s,
                      }))
                    }
                    className={`px-3 py-2 text-xs font-bold rounded-lg border text-center transition-all ${
                      designConfig.scale === s
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:text-slate-400 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {s}x {s === 2 ? '(Best)' : s === 8 ? '(Ultra)' : ''}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Higher values render cards with massive resolutions and no compression artifacts.
              </span>
            </div>

            {/* Transparent Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-xl">
              <div>
                <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Transparent Stage Canvas
                </h5>
                <span className="text-[10px] text-slate-400 block">
                  Disables background color/gradient during screenshot export
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={designConfig.transparentBg}
                  onChange={(e) =>
                    setDesignConfig((p) => ({ ...p, transparentBg: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Watermark Toggle */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    SaaS Studio Watermark
                  </h5>
                  <span className="text-[10px] text-slate-400 block">
                    Displays subtle branding at the bottom margin
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={designConfig.watermark}
                    onChange={(e) =>
                      setDesignConfig((p) => ({ ...p, watermark: e.target.checked }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:width-4 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {designConfig.watermark && (
                <input
                  type="text"
                  value={designConfig.watermarkText}
                  onChange={(e) =>
                    setDesignConfig((p) => ({ ...p, watermarkText: e.target.value }))
                  }
                  placeholder="ReviewCraft Pro • Design Studio Asset"
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200"
                />
              )}
            </div>

            {/* QR Code Configuration Sub-Section */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-xl space-y-3.5 font-sans">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Interactive QR Code Verification
                  </h5>
                  <span className="text-[10px] text-slate-400 block">
                    Embeds a verifiable offline validation link
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reviewData.useQrCode}
                    onChange={(e) =>
                      setReviewData((prev) => ({ ...prev, useQrCode: e.target.checked }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {reviewData.useQrCode && (
                <div className="space-y-3.5 pt-3.5 border-t border-slate-100 dark:border-slate-800/60 animate-fadeIn">
                  {/* Verification URL Input */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 mb-1.5">
                      Verification Website / URL
                    </label>
                    <input
                      type="url"
                      value={reviewData.qrCodeUrl}
                      onChange={(e) =>
                        setReviewData((prev) => ({ ...prev, qrCodeUrl: e.target.value }))
                      }
                      placeholder="https://upwork.com/contracts/12345678"
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-200 font-medium"
                    />
                  </div>

                  {/* QR Color Picker / Mode Selector */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 mb-1.5">
                      QR Code Color Mode
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 mb-2">
                      {([
                        { id: 'default', label: 'Default' },
                        { id: 'primary', label: 'Primary' },
                        { id: 'accent', label: 'Accent' },
                        { id: 'custom', label: 'Custom' }
                      ] as const).map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() =>
                            setDesignConfig((prev) => ({
                              ...prev,
                              qrColorMode: mode.id,
                            }))
                          }
                          className={`px-1 py-1.5 text-[10px] font-extrabold uppercase rounded-md border text-center transition-all cursor-pointer ${
                            (designConfig.qrColorMode || 'default') === mode.id
                              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20'
                              : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:text-slate-400 bg-white dark:bg-slate-900'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>

                    {(designConfig.qrColorMode === 'custom') && (
                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 animate-fadeIn">
                        <input
                          type="color"
                          value={designConfig.qrCustomColor || '#14A800'}
                          onChange={(e) =>
                            setDesignConfig((p) => ({ ...p, qrCustomColor: e.target.value }))
                          }
                          className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={designConfig.qrCustomColor || '#14A800'}
                          onChange={(e) =>
                            setDesignConfig((p) => ({ ...p, qrCustomColor: e.target.value }))
                          }
                          className="w-full font-mono text-xs uppercase bg-transparent border-0 text-slate-700 dark:text-slate-300 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Error Correction Level */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 mb-1.5">
                      Error Correction Level
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {([
                        { id: 'L', label: 'Low (7%)', desc: 'Saves space' },
                        { id: 'M', label: 'Med (15%)', desc: 'Standard' },
                        { id: 'Q', label: 'Quart (25%)', desc: 'Resilient' },
                        { id: 'H', label: 'High (30%)', desc: 'Maximum' }
                      ] as const).map((level) => (
                        <button
                          key={level.id}
                          type="button"
                          title={level.desc}
                          onClick={() =>
                            setDesignConfig((prev) => ({
                              ...prev,
                              qrErrorCorrectionLevel: level.id,
                            }))
                          }
                          className={`px-1 py-1.5 text-[10px] font-extrabold uppercase rounded-md border text-center transition-all cursor-pointer ${
                            (designConfig.qrErrorCorrectionLevel || 'M') === level.id
                              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20'
                              : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:text-slate-400 bg-white dark:bg-slate-900'
                          }`}
                        >
                          {level.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Corner Radius & Padding controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {/* Border Radius Toggle & Slider */}
                    <div className="space-y-2 bg-slate-50 dark:bg-slate-950/20 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/40">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 font-sans">
                            Rounded Corners
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={designConfig.qrShowBorderRadius !== false}
                            onChange={(e) =>
                              setDesignConfig((prev) => ({
                                ...prev,
                                qrShowBorderRadius: e.target.checked,
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:width-3 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>

                      {(designConfig.qrShowBorderRadius !== false) && (
                        <div className="pt-1 animate-fadeIn">
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 mb-1">
                            <span>Radius</span>
                            <span className="font-mono text-[9px]">{designConfig.qrBorderRadius ?? 12}px</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="24"
                            value={designConfig.qrBorderRadius ?? 12}
                            onChange={(e) =>
                              setDesignConfig((prev) => ({
                                ...prev,
                                qrBorderRadius: parseInt(e.target.value),
                              }))
                            }
                            className="w-full accent-emerald-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      )}
                    </div>

                    {/* Padding Toggle & Slider */}
                    <div className="space-y-2 bg-slate-50 dark:bg-slate-950/20 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/40">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 font-sans">
                            Inner Padding
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={designConfig.qrShowPadding !== false}
                            onChange={(e) =>
                              setDesignConfig((prev) => ({
                                ...prev,
                                qrShowPadding: e.target.checked,
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:width-3 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>

                      {(designConfig.qrShowPadding !== false) && (
                        <div className="pt-1 animate-fadeIn">
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 mb-1">
                            <span>Padding</span>
                            <span className="font-mono text-[9px]">{designConfig.qrPadding ?? 8}px</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="24"
                            value={designConfig.qrPadding ?? 8}
                            onChange={(e) =>
                              setDesignConfig((prev) => ({
                                ...prev,
                                qrPadding: parseInt(e.target.value),
                              }))
                            }
                            className="w-full accent-emerald-500 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Custom CSS Panel */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans">
                  Custom Developer CSS Override
                </label>
                <HelpCircle size={12} className="text-slate-400 cursor-help" title="Enter custom CSS classes to override card typography or background. Use class selectors like .review-card or .quote-symbol" />
              </div>
              <textarea
                rows={5}
                value={designConfig.customCss}
                onChange={(e) =>
                  setDesignConfig((p) => ({ ...p, customCss: e.target.value }))
                }
                placeholder="/* CSS syntax supported */\n.review-card {\n  border-left: 4px solid #14a800 !important;\n}"
                className="w-full px-3.5 py-2 font-mono text-xs border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-950 text-emerald-400 focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* TAB 4: TEMPLATES MANAGER */}
        {activeTab === 'templates' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-3">
              <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Save Current Look as Template
              </h5>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  placeholder="e.g. My Upwork Corporate Theme"
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 focus:outline-none text-slate-800 dark:text-slate-200"
                />
                <button
                  onClick={handleSaveTemplateClick}
                  disabled={!newTemplateName.trim()}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed rounded-lg shadow-sm flex items-center gap-1 shrink-0"
                >
                  <Plus size={14} />
                  Save
                </button>
              </div>
            </div>

            <div className="space-y-3 font-sans">
              <h4 className="text-xs font-black uppercase tracking-widest bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                My Saved Presets ({savedTemplates.length})
              </h4>

              {savedTemplates.length === 0 ? (
                <div className="p-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center text-slate-400 text-xs">
                  No templates saved yet. Design a look and hit save above to store it in local storage!
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {savedTemplates.map((tpl) => (
                    <div
                      key={tpl.id}
                      className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl hover:border-emerald-500 hover:shadow-sm transition-all"
                    >
                      <button
                        onClick={() => onLoadTemplate(tpl)}
                        className="text-left flex-1"
                      >
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600">
                          {tpl.name}
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Saved: {new Date(tpl.createdAt).toLocaleDateString()} • {tpl.reviewData.clientName}
                        </span>
                      </button>
                      <button
                        onClick={() => onDeleteTemplate(tpl.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                        title="Delete Template"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: BATCH EXPORT */}
        {activeTab === 'batch' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-2">
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Mass Review Generator (Batch Render)
              </h5>
              <p className="text-[11px] text-slate-500 leading-normal">
                Input an array of review data as JSON and generate high-fidelity review graphics for all of them at once! Great for agencies or top freelancers wanting to create a bulk grid.
              </p>
              <button
                onClick={fillBatchDemo}
                className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <Sparkles size={11} />
                Load Sample JSON Array
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-200 font-sans mb-1.5">
                Pasted JSON Array Structure
              </label>
              <textarea
                rows={10}
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                placeholder='[\n  {\n    "clientName": "John Doe",\n    "designation": "Manager",\n    "company": "Google",\n    "reviewTitle": "Great",\n    "reviewText": "Awesome product!",\n    "rating": 5,\n    "platform": "upwork"\n  }\n]'
                className="w-full px-3 py-2 font-mono text-xs border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-950 text-emerald-400 focus:outline-none leading-relaxed"
              />
            </div>

            <button
              onClick={() => onBatchExport(batchInput)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Download size={14} />
              Render & Export All Reviews ({batchInput ? 'Batch Processing Active' : 'Empty Input'})
            </button>
          </div>
        )}
      </div>

      {/* Settings Footer Action Area */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/20 grid grid-cols-2 gap-3">
        {/* Main Export triggers */}
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Quick Asset Downloads
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onDownload('png')}
              disabled={isExporting}
              className="flex items-center justify-center gap-1 px-2.5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 rounded-lg hover:shadow transition-all disabled:opacity-50"
            >
              <Download size={13} />
              PNG
            </button>
            <button
              onClick={() => onDownload('jpg')}
              disabled={isExporting}
              className="flex items-center justify-center gap-1 px-2.5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 rounded-lg hover:shadow transition-all disabled:opacity-50"
            >
              <Download size={13} />
              JPG
            </button>
            <button
              onClick={() => onDownload('webp')}
              disabled={isExporting}
              className="flex items-center justify-center gap-1 px-2.5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 rounded-lg hover:shadow transition-all disabled:opacity-50"
            >
              <Download size={13} />
              WEBP
            </button>
          </div>
        </div>

        {/* Copy as Image & Share */}
        <button
          onClick={onCopyImage}
          className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-white dark:bg-slate-900 rounded-lg hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
        >
          {copiedStates['image'] ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          {copiedStates['image'] ? 'Copied!' : 'Copy to Clipboard'}
        </button>

        <button
          onClick={onShare}
          className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-white dark:bg-slate-900 rounded-lg hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
        >
          <ExternalLink size={13} />
          Share Graphic
        </button>

        <button
          onClick={onPrint}
          className="col-span-2 flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-white dark:bg-slate-900 rounded-lg hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm"
        >
          <Sliders size={13} />
          Print Direct / PDF Export
        </button>
      </div>
    </div>
  );
};
