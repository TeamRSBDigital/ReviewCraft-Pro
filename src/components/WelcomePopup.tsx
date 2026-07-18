import { motion, AnimatePresence } from 'motion/react';
import { X, Facebook, Sparkles, Heart, CheckCircle, ThumbsUp } from 'lucide-react';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
  facebookUrl?: string;
}

export function WelcomePopup({ isOpen, onClose, facebookUrl = 'https://www.facebook.com/rbinkart' }: WelcomePopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-10"
          >
            {/* Glowing Accent Spotlights */}
            <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close Dialog"
            >
              <X size={16} />
            </button>

            {/* Visual Celebration Header */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                {/* Outer ring */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md"
                />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <Sparkles size={28} className="animate-pulse" />
                </div>
                {/* Floating Hearts/Sparkles */}
                <span className="absolute -top-1 -right-1 text-base">🎉</span>
                <span className="absolute -bottom-1 -left-1 text-base">💖</span>
              </div>

              {/* Core Header Titles */}
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight font-sans">
                  Download Successful! 🚀
                </h3>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono tracking-wider uppercase">
                  Your premium review card is ready
                </p>
              </div>

              {/* Heartfelt Bengali Message */}
              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 p-4 rounded-2xl text-left space-y-2.5">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                  <Heart size={14} className="fill-emerald-500 text-emerald-500" />
                  <span>প্রিয় ডিজাইনার / উদ্যোক্তা,</span>
                </div>
                <p className="text-slate-650 dark:text-slate-300 text-xs leading-relaxed font-sans font-medium">
                  আপনার প্রিমিয়াম রিভিউ কার্ডটি সফলভাবে হাই-ডেফিনিশনে ডাউনলোড হয়েছে! আমাদের এই সম্পূর্ণ ফ্রি টুলটি যদি আপনার মূল্যবান সময় বাঁচিয়ে থাকে, তবে আমাদের ফেসবুক পেজটি ফলো করে আমাদের পাশে থাকার জন্য বিনীত অনুরোধ জানাচ্ছি।
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed font-sans">
                  Your support fuels our creative journey! It takes only 5 seconds to follow and helps us build even more amazing tools for our community.
                </p>
              </div>

              {/* Action Grid */}
              <div className="w-full pt-2 space-y-2.5">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-[#1877f2] to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] transition-all cursor-pointer font-sans"
                >
                  <Facebook size={16} fill="currentColor" />
                  <span>Follow RB INK on Facebook</span>
                </a>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={onClose}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors uppercase tracking-wider font-sans cursor-pointer"
                  >
                    Maybe Later
                  </button>
                  <span className="text-slate-300 dark:text-slate-700 text-[10px]">•</span>
                  <button
                    onClick={onClose}
                    className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline tracking-wider font-sans cursor-pointer"
                  >
                    Already Following ❤️
                  </button>
                </div>
              </div>

              {/* Minimalist Trust Badge */}
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                <CheckCircle size={10} className="text-emerald-500" />
                <span>Crafted beautifully for professional creators</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
