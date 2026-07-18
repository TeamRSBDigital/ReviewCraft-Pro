import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { ReviewData, DesignConfig } from '../types';
import { PlatformLogoSelector, VerifiedIcon } from './PlatformLogos';
import { getLanguageAgnosticFontFamily } from '../lib/fonts';

interface ReviewCardProps {
  reviewData: ReviewData;
  designConfig: DesignConfig;
  previewScale?: number; // Calculated scale to fit preview panel
  isBeforeAfter?: boolean; // If true, shows raw design mode
  showBefore?: boolean; // For split testing
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewData,
  designConfig,
  previewScale = 1,
  isBeforeAfter = false,
  showBefore = false,
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  // Parse width and height from resolution string (e.g. "1080x1080" -> 1080, 1080)
  const [resWidth, resHeight] = designConfig.resolution
    .split('x')
    .map((v) => parseInt(v, 10));

  // Determine fonts based on selection
  const fontClass = {
    inter: 'font-sans',
    poppins: 'font-poppins',
    manrope: 'font-manrope',
    space: 'font-space',
    playfair: 'font-playfair',
    mono: 'font-mono',
  }[designConfig.font];

  // Dynamic Offline QR Code Generation
  useEffect(() => {
    if (reviewData.useQrCode && reviewData.qrCodeUrl) {
      const isDarkTheme =
        designConfig.theme === 'dark' ||
        designConfig.theme === 'luxury' ||
        designConfig.theme === 'corporate' && designConfig.textColor !== '#0f172a';
      
      const qrColorDark = isDarkTheme ? '#ffffff' : '#0f172a';
      const qrColorLight = '#00000000'; // transparent

      QRCode.toDataURL(reviewData.qrCodeUrl, {
        margin: 1,
        width: 180,
        color: {
          dark: qrColorDark,
          light: qrColorLight,
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('Error generating QR code', err));
    } else {
      setQrCodeDataUrl('');
    }
  }, [
    reviewData.useQrCode,
    reviewData.qrCodeUrl,
    designConfig.theme,
    designConfig.textColor,
  ]);

  // Card background styling based on user selections
  const getBackgroundStyles = (): React.CSSProperties => {
    if (designConfig.transparentBg) {
      return { background: 'transparent' };
    }

    switch (designConfig.theme) {
      case 'upwork':
        return { background: '#f8fafc' };
      case 'glass':
        return {
          background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)',
        };
      case 'luxury':
        return {
          background: '#0a0a0a',
        };
      case 'dark':
        return { background: '#0f172a' };
      case 'corporate':
        return { background: '#f1f5f9' };
      case 'modern':
        return { background: '#fafafa' };
      case 'minimal':
        return { background: '#ffffff' };
      case 'light':
      default:
        return { background: '#f8fafc' };
    }
  };

  // Card Inner background styles
  const getCardInnerStyles = (): string => {
    const cardStylesMap: Record<string, string> = {
      flat: 'border border-slate-200 bg-white',
      glass: 'glass-panel',
      shadow: 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100',
      'soft-shadow': 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100/50',
      floating: 'bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.18)] border border-slate-100',
    };

    const cardStylesDarkMap: Record<string, string> = {
      flat: 'border border-slate-800 bg-slate-900',
      glass: 'glass-panel-dark',
      shadow: 'bg-slate-900/90 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-800',
      'soft-shadow': 'bg-slate-900/95 shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-slate-800/50',
      floating: 'bg-slate-900/90 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-800',
    };

    const isDark =
      designConfig.theme === 'dark' ||
      designConfig.theme === 'luxury' ||
      (designConfig.theme === 'gradient' && designConfig.textColor === '#f8fafc');

    const activeMap = isDark ? cardStylesDarkMap : cardStylesMap;
    let base = activeMap[designConfig.cardStyle] || activeMap['soft-shadow'];

    // Apply corner sharpness
    if (designConfig.cardStyle === 'sharp') {
      base += ' rounded-none';
    } else if (designConfig.cardStyle === 'rounded') {
      base += ' rounded-[32px]';
    } else {
      base += ' rounded-2xl';
    }

    return base;
  };

  // Render Star Ratings beautifully
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(reviewData.rating);
    const hasHalfStar = reviewData.rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-8 h-8 text-amber-400 fill-current rating-star transition-transform"
            viewBox="0 0 24 24"
            id={`star-${i}`}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-8 h-8" id={`star-half-${i}`}>
            <svg
              className="absolute top-0 left-0 w-8 h-8 text-slate-200 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <svg
              className="absolute top-0 left-0 w-8 h-8 text-amber-400 fill-current overflow-hidden"
              viewBox="0 0 24 24"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-8 h-8 text-slate-200 fill-current"
            viewBox="0 0 24 24"
            id={`star-empty-${i}`}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      }
    }
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex">{stars}</div>
        <span className="text-lg font-bold ml-1 text-slate-500 font-mono">
          {reviewData.rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const isRtl =
    designConfig.textDirection === 'rtl' ||
    (designConfig.textDirection === 'auto' && designConfig.language === 'ar');

  // Raw Design (Before) mode rendering for comparison
  if (isBeforeAfter && showBefore) {
    return (
      <div
        id="review-card-before"
        dir={isRtl ? 'rtl' : 'ltr'}
        lang={designConfig.language || 'en'}
        className={`flex flex-col bg-white p-8 text-slate-800 border-2 border-dashed border-slate-300 rounded-lg max-w-full ${isRtl ? 'text-right' : 'text-left'}`}
        style={{
          width: `${resWidth}px`,
          height: `${resHeight}px`,
          transform: `scale(${previewScale})`,
          transformOrigin: 'top left',
          fontFamily: getLanguageAgnosticFontFamily(designConfig.font, designConfig.language || 'en'),
        }}
      >
        <div className="text-xs text-slate-400 font-mono mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
          RAW REVIEW TEXT INBOX (BEFORE CRAFTING)
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-bold mb-2">
              {reviewData.reviewTitle || 'No Title Provided'}
            </h4>
            <p className="text-base text-slate-600 italic whitespace-pre-wrap leading-relaxed">
              "{reviewData.reviewText || 'No review content yet. Prefill a demo review to get started!'}"
            </p>
          </div>
          <div className="mt-8 border-t border-slate-100 pt-6 flex items-center justify-between">
            <div>
              <div className="font-bold text-lg">{reviewData.clientName}</div>
              <div className="text-sm text-slate-500">
                {reviewData.designation} at {reviewData.company}
              </div>
            </div>
            <div className="text-sm font-mono text-slate-400 capitalize">
              Platform: {reviewData.platform}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Choose quote elements based on selected style
  const renderQuoteDecoration = () => {
    const quoteLeftClass = isRtl ? '-right-2' : '-left-2';
    const quoteLeftClassicClass = isRtl ? '-right-4' : '-left-4';

    switch (designConfig.quoteStyle) {
      case 'luxury':
        return (
          <span
            className={`quote-symbol text-8xl leading-none absolute -top-4 ${quoteLeftClass} select-none opacity-25 font-playfair font-bold text-amber-500`}
            style={{ transform: 'translateY(-15px)' }}
          >
            {isRtl ? '”' : '“'}
          </span>
        );
      case 'classic':
        return (
          <span className={`quote-symbol text-8xl leading-none absolute -top-4 ${quoteLeftClassicClass} select-none opacity-20 font-serif text-slate-400`}>
            {isRtl ? '”' : '“'}
          </span>
        );
      case 'modern':
        return (
          <div className={`w-12 h-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full mb-6 ${isRtl ? 'ml-auto' : 'mr-auto'}`}></div>
        );
      case 'gradient':
        return (
          <span className={`quote-symbol text-8xl leading-none absolute -top-6 ${quoteLeftClass} select-none font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-40`}>
            {isRtl ? '”' : '“'}
          </span>
        );
      case 'speech-bubble':
        return null; // Implemented via card outer border bubble shape
      case 'minimal':
      default:
        return null;
    }
  };

  const getBackgroundClass = (): string => {
    if (designConfig.transparentBg) return '';

    // If using user palette generators, apply standard overrides, otherwise presets
    switch (designConfig.backgroundStyle) {
      case 'gradient':
        if (designConfig.theme === 'luxury') {
          return 'bg-gradient-to-br from-[#1c1c1e] via-[#0d0d0d] to-[#010101]';
        }
        if (designConfig.theme === 'upwork') {
          return 'bg-gradient-to-br from-[#107a00] via-[#14a800] to-[#f4fbf4]';
        }
        return 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900';
      case 'mesh-1':
        return 'mesh-gradient-1';
      case 'mesh-2':
        return 'mesh-gradient-2';
      case 'mesh-lux':
        return 'mesh-gradient-lux';
      case 'pattern':
        return 'bg-slate-50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] dark:bg-slate-950 dark:bg-[radial-gradient(#334155_1px,transparent_1px)]';
      case 'noise':
        return 'bg-slate-100 dark:bg-slate-950';
      case 'abstract-shapes':
        return 'bg-slate-900 relative overflow-hidden';
      case 'white':
      default:
        return 'bg-white dark:bg-slate-950';
    }
  };

  const avatarShapeClass = {
    rounded: 'rounded-2xl',
    square: 'rounded-none',
    circle: 'rounded-full',
  }[reviewData.avatarShape];

  const themeTextColor = (): string => {
    const isDark =
      designConfig.theme === 'dark' ||
      designConfig.theme === 'luxury' ||
      (designConfig.theme === 'gradient' && designConfig.textColor === '#f8fafc');
    return isDark ? 'text-slate-100' : 'text-slate-800';
  };

  const themeSubtextColor = (): string => {
    const isDark =
      designConfig.theme === 'dark' ||
      designConfig.theme === 'luxury' ||
      (designConfig.theme === 'gradient' && designConfig.textColor === '#f8fafc');
    return isDark ? 'text-slate-400' : 'text-slate-500';
  };

  const filterStyle = [
    designConfig.filterGrayscale !== undefined && designConfig.filterGrayscale > 0 ? `grayscale(${designConfig.filterGrayscale}%)` : '',
    designConfig.filterSepia !== undefined && designConfig.filterSepia > 0 ? `sepia(${designConfig.filterSepia}%)` : '',
    designConfig.filterBrightness !== undefined && designConfig.filterBrightness !== 100 ? `brightness(${designConfig.filterBrightness}%)` : '',
    designConfig.filterContrast !== undefined && designConfig.filterContrast !== 100 ? `contrast(${designConfig.filterContrast}%)` : '',
    designConfig.filterBlur !== undefined && designConfig.filterBlur > 0 ? `blur(${designConfig.filterBlur}px)` : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="relative select-none" style={{ width: `${resWidth}px`, height: `${resHeight}px`, transform: `scale(${previewScale})`, transformOrigin: 'top left' }}>
      {/* Absolute stage that gets screenshot at high res */}
      <div
        id="review-card-stage"
        ref={cardRef}
        dir={isRtl ? 'rtl' : 'ltr'}
        lang={designConfig.language || 'en'}
        className={`w-full h-full flex flex-col justify-between p-16 relative overflow-hidden ${fontClass} ${getBackgroundClass()}`}
        style={{
          ...getBackgroundStyles(),
          fontFamily: getLanguageAgnosticFontFamily(designConfig.font, designConfig.language || 'en'),
          filter: filterStyle || undefined,
        }}
      >
        {/* Custom Styling Injection */}
        {designConfig.customCss && (
          <style dangerouslySetInnerHTML={{ __html: designConfig.customCss }} />
        )}

        {/* Abstract shape designs inside stage */}
        {designConfig.backgroundStyle === 'abstract-shapes' && !designConfig.transparentBg && (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/15 blur-[120px] pointer-events-none" />
            <div className="absolute top-[40%] right-[10%] w-[120px] h-[120px] rounded-full border border-white/5 opacity-10 animate-pulse pointer-events-none" />
            <div className="absolute bottom-[30%] left-[15%] w-[80px] h-[80px] rounded-full border border-white/5 opacity-5 pointer-events-none" />
          </>
        )}

        {/* Noise overlay pattern */}
        {designConfig.backgroundStyle === 'noise' && !designConfig.transparentBg && (
          <div className="absolute inset-0 noise-overlay opacity-25 pointer-events-none" />
        )}

        {/* TOP BAR: Platform Brand Header */}
        <div className="flex items-center justify-between w-full z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 dark:bg-black/20 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm">
              <PlatformLogoSelector
                platform={reviewData.platform}
                customUrl={reviewData.customPlatformLogoUrl}
                size={40}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold tracking-tight capitalize ${themeTextColor()}`}>
                  {reviewData.platform === 'custom'
                    ? reviewData.customPlatformName || 'Premium Client'
                    : reviewData.platform}
                </span>
                {reviewData.verifiedBadge && (
                  <span className="text-emerald-500" title="Verified Review">
                    <VerifiedIcon size={20} />
                  </span>
                )}
              </div>
              <span className={`text-sm tracking-wider font-mono uppercase ${themeSubtextColor()}`}>
                Verified Experience Partner
              </span>
            </div>
          </div>

          {/* Rating Display */}
          <div className={`flex flex-col ${isRtl ? 'items-start' : 'items-end'} gap-1`}>
            {renderStars()}
            <span className={`text-xs font-mono tracking-widest ${themeSubtextColor()}`}>
              CLIENT RATING
            </span>
          </div>
        </div>

        {/* REVIEW TEXT / CORE SECTION */}
        <div className="flex-1 flex flex-col justify-center relative my-10 max-w-4xl mx-auto z-10 w-full">
          {renderQuoteDecoration()}

          <div
            className={`relative ${
              designConfig.quoteStyle === 'speech-bubble'
                ? `p-10 rounded-3xl ${
                    designConfig.theme === 'dark' || designConfig.theme === 'luxury'
                      ? 'bg-slate-900/80 border border-slate-800'
                      : 'bg-white/80 border border-slate-100 shadow-md'
                  } before:content-[""] before:absolute before:-bottom-4 ${isRtl ? 'before:right-14' : 'before:left-14'} before:w-8 before:h-8 before:rotate-45 ${
                    designConfig.theme === 'dark' || designConfig.theme === 'luxury'
                      ? 'before:bg-slate-900 before:border-r before:border-b before:border-slate-800'
                      : 'before:bg-white before:border-r before:border-b before:border-slate-100'
                  }`
                : 'px-2'
            }`}
          >
            {reviewData.reviewTitle && (
              <h3
                className={`text-3xl font-extrabold tracking-tight mb-4 ${isRtl ? 'text-right' : 'text-left'} ${themeTextColor()}`}
              >
                {reviewData.reviewTitle}
              </h3>
            )}
            <p
              className={`text-2xl leading-relaxed whitespace-pre-wrap font-medium ${isRtl ? 'text-right' : 'text-left'} ${
                designConfig.quoteStyle === 'luxury' ? 'italic font-serif' : ''
              } ${themeTextColor()}`}
              style={{
                textShadow:
                  designConfig.theme === 'luxury'
                    ? '0 1px 2px rgba(0,0,0,0.3)'
                    : 'none',
              }}
            >
              "{reviewData.reviewText || 'Review Text placeholder. Prefill a demo from the presets list on the left to see this card in action.'}"
            </p>
          </div>
        </div>

        {/* FOOTER: Client details + optional QR + Watermark */}
        <div className="flex items-end justify-between w-full border-t border-slate-200/20 pt-8 z-10">
          <div className="flex items-center gap-5">
            {/* Client Avatar Crop / scale */}
            {reviewData.showAvatar && reviewData.avatarUrl && (
              <div className="relative group">
                <div
                  className={`w-20 h-20 overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white/20 shadow-md ${avatarShapeClass}`}
                >
                  <img
                    src={reviewData.avatarUrl}
                    alt={reviewData.clientName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Initials avatar fallback
                      const target = e.target as HTMLImageElement;
                      target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                        reviewData.clientName
                      )}`;
                    }}
                  />
                </div>
                {reviewData.verifiedBadge && (
                  <div className={`absolute -bottom-1 ${isRtl ? '-left-1' : '-right-1'} bg-emerald-500 text-white rounded-full p-1 border-2 border-white dark:border-slate-900`}>
                    <VerifiedIcon size={12} />
                  </div>
                )}
              </div>
            )}

            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h4 className={`text-2xl font-extrabold tracking-tight ${themeTextColor()}`}>
                {reviewData.clientName || 'Anonymous Client'}
              </h4>
              <div className={`flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-base ${isRtl ? 'justify-start' : ''}`}>
                <span className={`font-semibold ${themeSubtextColor()}`}>
                  {reviewData.designation || 'Client'}
                </span>
                {reviewData.company && (
                  <>
                    <span className="text-slate-400 font-bold select-none">•</span>
                    <span className="font-semibold text-emerald-500">
                      {reviewData.company}
                    </span>
                  </>
                )}
                {reviewData.country && (
                  <>
                    <span className="text-slate-400 font-bold select-none">•</span>
                    <span className={`font-mono text-sm uppercase tracking-wide ${themeSubtextColor()}`}>
                      {reviewData.country}
                    </span>
                  </>
                )}
              </div>
              <span className={`text-xs font-mono mt-1.5 block tracking-widest ${themeSubtextColor()}`}>
                {reviewData.reviewDate || 'July 2026'}
              </span>
            </div>
          </div>

          <div className="flex items-end gap-6">
            {/* Optional Company Logo */}
            {reviewData.companyLogoUrl && (
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-2 flex items-center justify-center">
                <img
                  src={reviewData.companyLogoUrl}
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Offline-generated QR Code for validation */}
            {reviewData.useQrCode && qrCodeDataUrl && (
              <div className="flex items-center gap-3 bg-white/5 dark:bg-black/15 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                <img
                  src={qrCodeDataUrl}
                  alt="Review Verification QR"
                  className="w-16 h-16 object-contain"
                />
                <div className={`${isRtl ? 'text-left' : 'text-right'} flex flex-col justify-center`}>
                  <span className={`text-[10px] font-mono leading-tight tracking-wider uppercase block ${themeTextColor()}`}>
                    Scan to
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-widest leading-tight block">
                    Verify
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Watermark */}
        {designConfig.watermark && (
          <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40 text-slate-400">
              {designConfig.watermarkText || 'ReviewCraft Pro • High Resolution Asset'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
