import { useState, useEffect, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Undo2,
  Redo2,
  Eye,
  Sliders,
  Award,
  Flame,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Facebook,
} from 'lucide-react';

import { ReviewCard } from './components/ReviewCard';
import { SettingsPanel } from './components/SettingsPanel';
import { demoReviews } from './data/demoReviews';
import { ReviewData, DesignConfig, SavedTemplate } from './types';

const INITIAL_REVIEW: ReviewData = {
  clientName: 'Alexander Mercer',
  username: 'alexmercer.studio',
  designation: 'VP of Product',
  company: 'Aether Technologies',
  country: 'United States',
  reviewDate: 'July 14, 2026',
  reviewTitle: 'Outstanding Technical Architecture & Leadership',
  reviewText: 'ReviewCraft Pro delivered a world-class React application under extremely tight deadlines. The architecture is clean, highly scalable, and the UI/UX animations are masterfully executed. An absolute standard of engineering excellence. We are already planning our next project together.',
  rating: 5,
  platform: 'upwork',
  customPlatformName: '',
  verifiedBadge: true,
  showAvatar: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  avatarShape: 'circle',
  companyLogoUrl: '',
  useQrCode: true,
  qrCodeUrl: 'https://github.com/google',
};

const INITIAL_CONFIG: DesignConfig = {
  theme: 'upwork',
  font: 'inter',
  quoteStyle: 'luxury',
  cardStyle: 'glass',
  backgroundStyle: 'mesh-1',
  resolution: '1080x1080',
  scale: 2,
  transparentBg: false,
  watermark: true,
  watermarkText: 'Verified via Upwork • ReviewCraft Pro Asset',
  customCss: `/* Custom design overrides */\n.review-card {\n  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n}`,
  primaryColor: '#14A800',
  accentColor: '#16A34A',
  cardBgColor: '#ffffff',
  textColor: '#111827',
  language: 'en',
  textDirection: 'auto',
  filterGrayscale: 0,
  filterSepia: 0,
  filterBrightness: 100,
  filterContrast: 100,
  filterBlur: 0,
  qrColorMode: 'default',
  qrCustomColor: '#14A800',
  qrErrorCorrectionLevel: 'M',
  qrShowBorderRadius: true,
  qrBorderRadius: 12,
  qrShowPadding: true,
  qrPadding: 8,
};

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function App() {
  const [reviewData, setReviewData] = useState<ReviewData>(INITIAL_REVIEW);
  const [designConfig, setDesignConfig] = useState<DesignConfig>(INITIAL_CONFIG);

  // Undo/Redo Stacks
  const [history, setHistory] = useState<{ reviewData: ReviewData; designConfig: DesignConfig }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Saved templates inside local storage
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);

  // Preview scaling state
  const previewParentRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState<number>(0.4);

  // Before After and comparison mode triggers
  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);
  const [showBefore, setShowBefore] = useState<boolean>(false);

  // Export states and Toast states
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Time stamp state for upper margins
  const [utcTime, setUtcTime] = useState<string>('');

  // Track system UTC time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Manage Local Storage templates
  useEffect(() => {
    const stored = localStorage.getItem('reviewcraft_templates');
    if (stored) {
      try {
        setSavedTemplates(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse templates', err);
      }
    }
  }, []);

  // Auto-save setup on change
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(
        'reviewcraft_autosave',
        JSON.stringify({ reviewData, designConfig })
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, [reviewData, designConfig]);

  // Load auto-saved layout on mount
  useEffect(() => {
    const autosave = localStorage.getItem('reviewcraft_autosave');
    if (autosave) {
      try {
        const { reviewData: r, designConfig: d } = JSON.parse(autosave);
        if (r && d) {
          setReviewData(r);
          setDesignConfig(d);
        }
      } catch (e) {
        // Fallback to initial
      }
    }
  }, []);

  // Register undo history snapshots
  const recordHistory = (r: ReviewData, d: DesignConfig) => {
    const newSnapshot = { reviewData: JSON.parse(JSON.stringify(r)), designConfig: JSON.parse(JSON.stringify(d)) };
    const cleanHistory = history.slice(0, historyIndex + 1);
    
    // Limit stack size to 25 items
    if (cleanHistory.length >= 25) {
      cleanHistory.shift();
    }
    
    setHistory([...cleanHistory, newSnapshot]);
    setHistoryIndex(cleanHistory.length);
  };

  // Listen to deep changes for undo/redo (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSnapshot = history[historyIndex];
      const isDifferent =
        !currentSnapshot ||
        JSON.stringify(currentSnapshot.reviewData) !== JSON.stringify(reviewData) ||
        JSON.stringify(currentSnapshot.designConfig) !== JSON.stringify(designConfig);

      if (isDifferent) {
        recordHistory(reviewData, designConfig);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [reviewData, designConfig]);

  // Keyboard Shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, historyIndex]);

  // Calculate live responsive scale
  useEffect(() => {
    const calculateScale = () => {
      if (!previewParentRef.current) return;
      const parentWidth = previewParentRef.current.clientWidth - 48; // padding
      const [resWidth] = designConfig.resolution.split('x').map(Number);
      
      const scaleFactor = parentWidth / resWidth;
      setPreviewScale(Math.min(scaleFactor, 0.95)); // don't make it overflow
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);

    // Watch resolution change too
    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, [designConfig.resolution]);

  // Undo Handler
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      const snapshot = history[prevIdx];
      setHistoryIndex(prevIdx);
      setReviewData(snapshot.reviewData);
      setDesignConfig(snapshot.designConfig);
      addToast('Design history undone (Ctrl+Z)', 'info');
    } else {
      addToast('No older history state found', 'info');
    }
  };

  // Redo Handler
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      const snapshot = history[nextIdx];
      setHistoryIndex(nextIdx);
      setReviewData(snapshot.reviewData);
      setDesignConfig(snapshot.designConfig);
      addToast('Design history redone (Ctrl+Y)', 'info');
    } else {
      addToast('No newer history state found', 'info');
    }
  };

  // Toast trigger
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // File download renderer
  const handleDownloadImage = async (format: 'png' | 'jpg' | 'webp') => {
    const stage = document.getElementById('review-card-stage');
    if (!stage) {
      addToast('Aesthetic canvas container could not be found', 'error');
      return;
    }

    setIsExporting(true);
    addToast(`Rendering high-definition ${format.toUpperCase()} asset...`, 'info');

    // Parse absolute dimensions
    const [w, h] = designConfig.resolution.split('x').map(Number);

    try {
      // Ensure all media inside is fully loaded
      const exportOptions = {
        pixelRatio: designConfig.scale,
        width: w,
        height: h,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: `${w}px`,
          height: `${h}px`,
        },
        cacheBust: true,
      };

      let dataUrl = '';
      if (format === 'png') {
        dataUrl = await htmlToImage.toPng(stage, exportOptions);
      } else if (format === 'jpg') {
        dataUrl = await htmlToImage.toJpeg(stage, { ...exportOptions, quality: 0.98 });
      } else {
        const pngUrl = await htmlToImage.toPng(stage, exportOptions);
        dataUrl = await new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = w * designConfig.scale;
            canvas.height = h * designConfig.scale;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              resolve(canvas.toDataURL('image/webp', 0.98));
            } else {
              reject(new Error('Canvas Context Creation Failed'));
            }
          };
          img.onerror = () => reject(new Error('Image Loading Failed'));
          img.src = pngUrl;
        });
      }

      if (!dataUrl) throw new Error('Image compression failure');

      const fileName = `reviewcraft_pro_${reviewData.clientName.toLowerCase().replace(/\s+/g, '_')}_${designConfig.resolution}.${format}`;
      saveAs(dataUrl, fileName);

      addToast(`Crystal-clear ${format.toUpperCase()} downloaded successfully!`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Error compressing image asset. Please try again.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Copy as Blob to system clipboard
  const handleCopyAsImage = async () => {
    const stage = document.getElementById('review-card-stage');
    if (!stage) return;

    try {
      addToast('Generating clipboard image block...', 'info');
      const blob = await htmlToImage.toBlob(stage, {
        pixelRatio: designConfig.scale,
        cacheBust: true,
      });

      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        addToast('Aesthetic card copied to clipboard as raw image!', 'success');
      } else {
        throw new Error('Blob generation failed');
      }
    } catch (err) {
      console.error(err);
      addToast('Your browser does not support copying image blobs directly.', 'error');
    }
  };

  // Custom text feedback copy
  const handleCopyReviewText = () => {
    navigator.clipboard.writeText(reviewData.reviewText);
    addToast('Original review feedback copied to clipboard', 'success');
  };

  // Action: Reset defaults
  const handleReset = () => {
    setReviewData(INITIAL_REVIEW);
    setDesignConfig(INITIAL_CONFIG);
    addToast('Restored original minimalist configuration', 'success');
  };

  // Action: Prefill randomized demo review
  const handleRandomDemo = () => {
    const randomIdx = Math.floor(Math.random() * demoReviews.length);
    const demo = demoReviews[randomIdx];
    setReviewData(demo.reviewData);
    setDesignConfig(demo.designConfig);
    addToast(`Prefilled "${demo.name}" designer demo!`, 'success');
  };

  // Save template to local storage
  const handleSaveTemplate = (name: string) => {
    const newTpl: SavedTemplate = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      reviewData,
      designConfig,
      createdAt: new Date().toISOString(),
    };
    const updated = [newTpl, ...savedTemplates];
    setSavedTemplates(updated);
    localStorage.setItem('reviewcraft_templates', JSON.stringify(updated));
    addToast(`Preset template "${name}" saved to offline storage!`, 'success');
  };

  // Load Template
  const handleLoadTemplate = (tpl: SavedTemplate) => {
    setReviewData(tpl.reviewData);
    setDesignConfig(tpl.designConfig);
    addToast(`Loaded preset "${tpl.name}" successfully!`, 'success');
  };

  // Delete Template
  const handleDeleteTemplate = (id: string) => {
    const updated = savedTemplates.filter((t) => t.id !== id);
    setSavedTemplates(updated);
    localStorage.setItem('reviewcraft_templates', JSON.stringify(updated));
    addToast('Template deleted successfully', 'info');
  };

  // Share Card via Web Share API
  const handleShareCard = async () => {
    const stage = document.getElementById('review-card-stage');
    if (!stage) return;

    if (navigator.share) {
      try {
        const blob = await htmlToImage.toBlob(stage, { pixelRatio: 1.5 });
        if (blob) {
          const file = new File([blob], 'my_crafted_review.png', { type: 'image/png' });
          await navigator.share({
            title: 'ReviewCraft Pro Asset',
            text: `Check out this premium client review card I designed with ReviewCraft Pro!`,
            files: [file],
          });
          addToast('Shared successfully!', 'success');
        }
      } catch (err) {
        console.error(err);
        addToast('Sharing canceled or unsupported file types', 'info');
      }
    } else {
      addToast('Web Share API not supported on this browser. Try copying image instead!', 'error');
    }
  };

  // Print direct
  const handlePrintCard = () => {
    window.print();
  };

  // Batch Export Loop
  const handleBatchExport = async (reviewsJson: string) => {
    if (!reviewsJson.trim()) {
      addToast('Please enter a valid JSON array of reviews first', 'error');
      return;
    }

    try {
      const parsed = JSON.parse(reviewsJson);
      if (!Array.isArray(parsed)) {
        throw new Error('Input must be a valid JSON array');
      }

      setIsExporting(true);
      addToast(`Starting batch processing for ${parsed.length} client card reviews...`, 'info');

      for (let i = 0; i < parsed.length; i++) {
        const item = parsed[i];
        
        // Merge with existing state to fill missing values safely
        const tempReview: ReviewData = {
          ...reviewData,
          clientName: item.clientName || 'Anonymous Client',
          designation: item.designation || 'Client',
          company: item.company || '',
          country: item.country || '',
          reviewTitle: item.reviewTitle || '',
          reviewText: item.reviewText || '',
          rating: item.rating || 5,
          platform: item.platform || 'upwork',
        };

        // Render card state temporarily
        setReviewData(tempReview);
        
        // Wait for state rendering and canvas re-flow
        await new Promise((resolve) => setTimeout(resolve, 800));

        const stage = document.getElementById('review-card-stage');
        if (stage) {
          const [w, h] = designConfig.resolution.split('x').map(Number);
          const dataUrl = await htmlToImage.toPng(stage, {
            pixelRatio: designConfig.scale,
            width: w,
            height: h,
            cacheBust: true,
          });

          const fileName = `reviewcraft_pro_batch_${i + 1}_${tempReview.clientName.toLowerCase().replace(/\s+/g, '_')}.png`;
          saveAs(dataUrl, fileName);
        }
      }

      addToast(`Batch export completed successfully! ${parsed.length} assets downloaded.`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Invalid JSON structure. Please check the loading sample.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col antialiased selection:bg-emerald-500/20 select-none">
      {/* Dynamic Toast Notifications */}
      <div className="fixed top-6 right-6 z-[100] space-y-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
              className={`p-4 rounded-xl shadow-2xl border flex items-center gap-3 w-80 pointer-events-auto bg-slate-950/90 backdrop-blur-md ${
                t.type === 'success'
                  ? 'border-emerald-500/30 text-emerald-400'
                  : t.type === 'error'
                  ? 'border-red-500/30 text-red-400'
                  : 'border-slate-800 text-slate-300'
              }`}
            >
              {t.type === 'success' ? (
                <CheckCircle className="text-emerald-400 shrink-0" size={18} />
              ) : t.type === 'error' ? (
                <XCircle className="text-red-400 shrink-0" size={18} />
              ) : (
                <Info className="text-blue-400 shrink-0" size={18} />
              )}
              <span className="text-xs font-bold leading-normal">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main SaaS App Bar */}
      <header className="bg-slate-950/80 border-b border-slate-900 px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md shadow-lg print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white border border-slate-800 shadow-md">
            <Award size={20} className="text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight flex items-center gap-2 text-slate-100">
              ReviewCraft Pro
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                V1.0 Stable
              </span>
            </h1>
            <span className="text-[10px] text-slate-400 block font-semibold tracking-wider uppercase font-mono mt-0.5">
              Premium Vector Review Card Engine
            </span>
          </div>
        </div>

        {/* Global Control Center */}
        <div className="flex items-center gap-4">
          {/* UTC Status indicators */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 rounded-lg text-[11px] font-mono font-bold text-slate-400 border border-slate-800">
            <Clock size={12} className="text-slate-500" />
            {utcTime || 'Saturday, 12:24 UTC'}
          </div>

          {/* Undo/Redo Action group */}
          <div className="flex items-center gap-1 border-r border-slate-800 pr-4">
            <button
              onClick={handleUndo}
              className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
              title="Undo Last Action (Ctrl+Z)"
              id="header-undo"
            >
              <Undo2 size={16} />
            </button>
            <button
              onClick={handleRedo}
              className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
              title="Redo Last Action (Ctrl+Y)"
              id="header-redo"
            >
              <Redo2 size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 transition-all rounded-lg border border-slate-800"
            >
              <Flame size={14} className="text-orange-500" />
              Upgrade to Premium
            </a>
          </div>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Left Column: Settings Panel (5 cols) */}
        <section className="lg:col-span-5 h-[calc(100vh-140px)] min-h-[500px] flex flex-col print:hidden">
          <SettingsPanel
            reviewData={reviewData}
            setReviewData={setReviewData}
            designConfig={designConfig}
            setDesignConfig={setDesignConfig}
            onRandomDemo={handleRandomDemo}
            onReset={handleReset}
            onSaveTemplate={handleSaveTemplate}
            savedTemplates={savedTemplates}
            onLoadTemplate={handleLoadTemplate}
            onDeleteTemplate={handleDeleteTemplate}
            onCopyText={handleCopyReviewText}
            onDownload={handleDownloadImage}
            onCopyImage={handleCopyAsImage}
            onShare={handleShareCard}
            onPrint={handlePrintCard}
            showBeforeAfter={showBeforeAfter}
            setShowBeforeAfter={setShowBeforeAfter}
            showBefore={showBefore}
            setShowBefore={setShowBefore}
            isExporting={isExporting}
            onBatchExport={handleBatchExport}
          />
        </section>

        {/* Right Column: Live Interactive Canvas Preview (7 cols) */}
        <section className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
          {/* Comparison sliders and visual settings bar */}
          <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex items-center justify-between shadow-lg print:hidden">
            <div className="flex items-center gap-1.5">
              <Eye size={16} className="text-emerald-400" />
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
                Aesthetic Stage Monitor
              </h3>
            </div>

            {/* Before / After toggle controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowBeforeAfter(!showBeforeAfter);
                  addToast(showBeforeAfter ? 'Standard Preview Mode' : 'Before / After Inspection Active', 'info');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  showBeforeAfter
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-950/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
                id="btn-before-after"
              >
                Before / After Split
              </button>

              {showBeforeAfter && (
                <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800/80 p-1 rounded-lg">
                  <button
                    onClick={() => setShowBefore(true)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                      showBefore ? 'bg-slate-800 text-slate-200 shadow-sm' : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    Raw Text
                  </button>
                  <button
                    onClick={() => setShowBefore(false)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                      !showBefore ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    Crafted Design
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Real Canvas Preview Container */}
          <div
            ref={previewParentRef}
            className="flex-1 bg-slate-950/40 border-2 border-dashed border-slate-900 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden shadow-inner min-h-[450px]"
            style={{
              backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.08) 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Resolution overlay tags */}
            <div className="absolute top-4 left-4 bg-slate-900/85 text-white font-mono text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {designConfig.resolution} PX
            </div>

            {/* Quality scale indicators */}
            <div className="absolute top-4 right-4 bg-slate-900/80 border border-slate-800 text-slate-400 font-mono text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1 z-20">
              EXPORT MATRIX: {designConfig.scale}X
            </div>

            {/* Card Renderer */}
            <div className="relative shadow-[0_30px_70px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden">
              <ReviewCard
                reviewData={reviewData}
                designConfig={designConfig}
                previewScale={previewScale}
                isBeforeAfter={showBeforeAfter}
                showBefore={showBefore}
              />
            </div>
          </div>

          {/* Quick Help Hints */}
          <footer className="bg-slate-950/20 rounded-2xl p-4 flex flex-col gap-3.5 border border-slate-900 print:hidden text-slate-400">
            <div className="flex items-center gap-3">
              <Info size={16} className="text-slate-400 shrink-0" />
              <p className="text-[11px] leading-relaxed">
                <strong className="text-slate-300">Pro tip:</strong> Every design change auto-saves locally instantly. Switch target dimensions from the advanced tab to create beautiful 1.91:1 ratio banner cards for LinkedIn posts, or 1:1 ratio blocks for standard Instagram feeds!
              </p>
            </div>
            
            <div className="pt-3 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span>&copy; {new Date().getFullYear()}</span>
                <span className="font-extrabold text-slate-300">RB INK</span>
                <span className="text-slate-500">| All Rights Reserved.</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/rbinkart"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-[#1877f2] transition-colors font-semibold"
                >
                  <Facebook size={14} className="text-[#1877f2]" />
                  <span>Facebook Page</span>
                  <ExternalLink size={10} className="text-slate-500" />
                </a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
