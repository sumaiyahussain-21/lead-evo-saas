import {
  X,
  FileText,
  Wrench,
  BarChart3,
  Globe,
  Mail,
  MessageCircle,
  Rocket,
  Sparkles,
  Zap,
  Bot,
  Key,
  Search,
  Send,
  RefreshCw,
  Tag,
  Headphones,
  ShieldCheck,
} from "lucide-react";
export const PricingOverlayModal = ({
  isOpen,
  onClose,
  onSelectPlan,
  onGuestModeLogin,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl rounded-[32px] bg-[#1E2026]/95 border border-white/15 shadow-2xl p-6 sm:p-8 text-white overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close pricing overlay"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title & Subtitle */}
        <div className="text-center relative z-10 mb-8 space-y-1.5">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
            Choose Your Evolution Plan
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-medium">
            Premium pricing subscription modal card overlays
          </p>
        </div>

        {/* 3 Pricing Cards Grid (Matching screenshot image_db4a95fc.png) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch relative z-10">
          {/* ---------------- CARD 1: FREE (0$/month) ---------------- */}
          <div className="bg-white text-[#141518] rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-stone-200 hover:shadow-2xl transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase text-stone-700">
                  FREE
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[#141518]">
                  0$
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  /month
                </span>
              </div>

              {/* Includes header */}
              <p className="text-xs font-bold text-stone-800 mt-5 mb-3">
                Includes
              </p>

              {/* Features List */}
              <ul className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <span>2 Custom Portfolio Uploads (Max Limit)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wrench className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <span>Basic DIY Portfolio Creator templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <BarChart3 className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <span>10 daily leads preview & basic scan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <span>1-click simple website makeover demo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <span>Standard Email Alert notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <span>Standard community support</span>
                </li>
              </ul>
            </div>

            {/* Button */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={() => onSelectPlan("free")}
                className="w-full py-3 rounded-2xl bg-[#EFECE6] hover:bg-[#E4DFD6] text-stone-900 font-extrabold text-xs shadow-xs transition-all cursor-pointer text-center"
              >
                Active Plan
              </button>
            </div>
          </div>

          {/* ---------------- CARD 2: PRO FEATURES (29$/month - Most Popular) ---------------- */}
          <div className="bg-gradient-to-b from-[#FDE8AA] via-[#FDCF65] to-[#F5A623] text-[#141518] rounded-3xl p-6 flex flex-col justify-between shadow-2xl border-2 border-amber-300 relative scale-[1.02] transition-all">
            {/* Most Popular Top Pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#141518] text-amber-300 border border-amber-400/40 text-[11px] font-black uppercase tracking-wider shadow-md">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black tracking-wider uppercase text-amber-950">
                  PRO FEATURES
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[#141518]">
                  29$
                </span>
                <span className="text-xs font-bold text-amber-950">/month</span>
              </div>

              {/* Includes header */}
              <p className="text-xs font-bold text-amber-950 mt-5 mb-3">
                Includes
              </p>

              {/* Features List */}
              <ul className="space-y-3 text-xs text-amber-950 font-medium">
                <li className="flex items-start gap-2">
                  <Rocket className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                  <span className="font-bold">
                    UNLIMITED Custom Portfolio Uploads
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                  <span>Host own custom projects & mockups</span>
                </li>
                <li className="flex items-start gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                  <span>Unlimited daily lead enrichments & scans</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                  <span>Redesign & 1-click live website scraper</span>
                </li>
                <li className="flex items-start gap-2">
                  <Bot className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                  <span>Custom voice for AI receptionist automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Key className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                  <span>Standard API integration access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                  <span>Priority Email/Chat business support</span>
                </li>
              </ul>
            </div>

            {/* Button */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={() => onSelectPlan("pro")}
                className="w-full py-3.5 rounded-2xl bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer text-center active:scale-95"
              >
                Start Pro Trial
              </button>
            </div>
          </div>

          {/* ---------------- CARD 3: PREMIUM (149$/month) ---------------- */}
          <div className="bg-white text-[#141518] rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-stone-200 hover:shadow-2xl transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase text-stone-700">
                  PREMIUM
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[#141518]">
                  149$
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  /month
                </span>
              </div>

              {/* Includes header */}
              <p className="text-xs font-bold text-stone-800 mt-5 mb-3">
                Includes
              </p>

              {/* Features List */}
              <ul className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="font-medium">
                    All UNLIMITED Custom uploads from PRO
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Bot className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>AI-Assisted Automated Portfolio creations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Search className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Real-time Website SEO Audit & Insights API</span>
                </li>
                <li className="flex items-start gap-2">
                  <Send className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Enterprise batch outreaches & WhatsApp blasts</span>
                </li>
                <li className="flex items-start gap-2">
                  <RefreshCw className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Real-time Webhook & Multi-CRM dynamic sync</span>
                </li>
                <li className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>White-Label dashboard branding options</span>
                </li>
                <li className="flex items-start gap-2">
                  <Headphones className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>24/7/365 Dedicated Live Engineer Support (SLA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Enterprise SLA security & unlimited team seats</span>
                </li>
              </ul>
            </div>

            {/* Button */}
            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={() => onSelectPlan("premium")}
                className="w-full py-3 rounded-2xl bg-[#141518] hover:bg-black text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer text-center"
              >
                Go Premium
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Guest Mode Action (as seen in image) */}
        {onGuestModeLogin && (
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
            <span>Need immediate access to preview your workspace?</span>
            <button
              type="button"
              onClick={onGuestModeLogin}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Try FREE Guest Mode / Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
