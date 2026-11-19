import { useState } from "react";
import {
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  MessageSquare,
  Users,
  Video,
  Bot,
  Star,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { PricingOverlayModal } from "./PricingOverlayModal";
import { ReviewsModal } from "./ReviewsModal";
import { FaqsModal } from "./FaqsModal";

const ELENA_HIGH_RES_AVATAR =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90";

export const LandingView = ({ onStartFree, onSignIn, onInstantDemo }) => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isFaqsModalOpen, setIsFaqsModalOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenPricing = () => {
    setMobileMenuOpen(false);
    setIsPricingModalOpen(true);
  };

  const handleSelectPlan = () => {
    setIsPricingModalOpen(false);
    onStartFree();
  };

  const faqs = [
    {
      q: "What do I receive after clicking Start Free?",
      a: "When you start free, you immediately receive 100 verified B2B leads, real-time WhatsApp carrier verification checks, and access to the complete Lead Evo dashboard. No credit card is required.",
    },
    {
      q: "Can I access the workspace using Google Workspace or email?",
      a: "Yes, you can register and sign in with Google Workspace SSO with a single click, or create your account using your corporate email address and password.",
    },
    {
      q: "Where do I find the Log Out option in the dashboard?",
      a: "At the bottom of the left sidebar inside the dashboard, there is a dedicated Log Out button. Clicking it instantly ends your session and returns you to the home page.",
    },
    {
      q: "Are mobile numbers verified in real time on WhatsApp?",
      a: "Yes, our platform verifies mobile numbers through the Meta WhatsApp Cloud API and direct network carrier checks, ensuring a verified 94% open rate on your outbound campaigns.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#141518] antialiased selection:bg-amber-200 relative overflow-x-hidden">
      {/* ----------------- 1. PUBLIC TOP NAVIGATION BAR ----------------- */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE4D8] px-3 sm:px-6 lg:px-12 py-3 transition-all">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#141518] to-[#2B2E38] flex items-center justify-center text-amber-400 shadow-md border border-stone-800 shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl font-extrabold tracking-tight text-[#141518] font-['Plus_Jakarta_Sans'] whitespace-nowrap">
                Lead Evo
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-400 text-[#141518] font-mono shrink-0">
                PRO
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Public Navbar"
            className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#666056]"
          >
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-[#141518] transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => setIsReviewsModalOpen(true)}
              className="hover:text-[#141518] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Reviews</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/60">
                4.9★
              </span>
            </button>
            <button
              onClick={() => setIsFaqsModalOpen(true)}
              className="hover:text-[#141518] transition-colors cursor-pointer"
            >
              FAQs
            </button>
          </nav>

          {/* Action Controls in Navbar + Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={onSignIn}
              aria-label="Sign In"
              className="hidden sm:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-[#443E35] hover:text-[#141518] hover:bg-white border border-transparent hover:border-[#DFD8CB] transition-all cursor-pointer whitespace-nowrap"
            >
              Sign In
            </button>

            <button
              onClick={handleOpenPricing}
              aria-label="Start Free"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 group whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#121316] transition-transform group-hover:rotate-12 shrink-0" />
              <span>Start Free</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#121316] transition-transform group-hover:translate-x-0.5 shrink-0" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-2 rounded-xl bg-white border border-[#DFD8CB] text-[#141518] hover:bg-stone-50 transition-colors cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-2 border-t border-[#EBE4D8] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => scrollToSection("features")}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-[#141518] hover:bg-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReviewsModalOpen(true);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-[#141518] hover:bg-white transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>Reviews</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/60">
                4.9★
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsFaqsModalOpen(true);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-[#141518] hover:bg-white transition-colors cursor-pointer"
            >
              FAQs
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onSignIn();
              }}
              className="sm:hidden w-full text-center px-3 py-2.5 rounded-xl text-sm font-bold text-[#141518] bg-white border border-[#DFD8CB] mt-1 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        )}
      </header>

      {/* ----------------- 2. HERO SECTION ----------------- */}
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center relative overflow-hidden">
        {/* Glow ambient background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Pill Tag */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#EDE7DB] border border-[#DFD8CC] text-[11px] sm:text-xs font-bold text-[#635C50] mb-6 shadow-xs">
          <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500 shrink-0" />
          <span>Next-Gen B2B Outbound & Automated Meeting Pipeline</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-emerald-700 font-mono text-[11px]">
            v2.4 Active
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#141518] max-w-4xl mx-auto leading-[1.15]">
          Close High-Value Accounts on{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600">
            WhatsApp & AI Video Meetings.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-[#666056] max-w-2xl mx-auto leading-relaxed">
          Discover verified mobile decision-makers, launch multi-channel
          outreach campaigns, and automatically book qualified VIP discovery
          demos in minutes.
        </p>

        {/* CTA Buttons Row */}
        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handleOpenPricing}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2.5 active:scale-95"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#121316] shrink-0" />
            <span>Start Free · Choose Your Evolution Plan</span>
            <ArrowRight className="w-4 h-4 text-[#121316] shrink-0" />
          </button>

          <button
            onClick={onInstantDemo}
            className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#141518] font-bold text-sm sm:text-base border border-[#DFD8CC] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Explore 1-Click Live Portal (Elena Rostova)</span>
            <ArrowRight className="w-4 h-4 text-[#8A8478] shrink-0" />
          </button>
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-[#E8E1D4]">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EBE4D8] shadow-xs">
            <p className="text-xl sm:text-3xl font-extrabold text-amber-600 font-mono">
              94%
            </p>
            <p className="text-[11px] sm:text-xs text-[#7A746B] mt-0.5">
              WhatsApp Read Rate
            </p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EBE4D8] shadow-xs">
            <p className="text-xl sm:text-3xl font-extrabold text-[#141518] font-mono">
              4,820+
            </p>
            <p className="text-[11px] sm:text-xs text-[#7A746B] mt-0.5">
              Verified B2B Leads
            </p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EBE4D8] shadow-xs">
            <p className="text-xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
              142
            </p>
            <p className="text-[11px] sm:text-xs text-[#7A746B] mt-0.5">
              Monthly VIP Meetings
            </p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EBE4D8] shadow-xs">
            <p className="text-xl sm:text-3xl font-extrabold text-indigo-600 font-mono">
              0.4s
            </p>
            <p className="text-[11px] sm:text-xs text-[#7A746B] mt-0.5">
              AI Receptionist Latency
            </p>
          </div>
        </div>

        {/* Dashboard Visual Preview Card */}
        <div className="mt-10 sm:mt-12 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#DFD8CC] bg-[#141518] text-white p-2.5 sm:p-5 relative group">
          {/* Mockup Browser Top Bar */}
          <div className="min-h-9 py-1.5 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400 mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono ml-1 sm:ml-2 text-stone-300 truncate">
                leadevo.io/portal/dashboard
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-amber-400 font-medium whitespace-nowrap shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Live Engine Connected</span>
            </div>
          </div>

          {/* Inner Mockup Frame */}
          <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#FAF7F2] text-[#141518] p-4 sm:p-6 text-left relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[#E8E1D5]">
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Single Clean Circular Avatar + Outer Active Status Dot */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-amber-400 ring-offset-2 ring-offset-[#FAF7F2] shadow-sm bg-stone-200">
                    <img
                      src={ELENA_HIGH_RES_AVATAR}
                      alt="Elena Rostova"
                      className="w-full h-full object-cover object-top block"
                    />
                  </div>
                  <span
                    title="Active"
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#FAF7F2] shadow-xs"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="font-extrabold text-base sm:text-lg text-[#141518] leading-tight">
                    Welcome to Lead Evo Dashboard
                  </h3>
                  <p className="text-xs text-[#7A746B] mt-0.5 break-words">
                    Elena Rostova • Revenue Director • Lead Evo Enterprise
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] sm:text-xs font-bold whitespace-nowrap">
                  92% Daily Target Achieved
                </span>
                <button
                  onClick={onInstantDemo}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F5A623] hover:bg-[#E09816] text-black text-xs font-bold shadow-xs cursor-pointer whitespace-nowrap"
                >
                  Enter Portal &rarr;
                </button>
              </div>
            </div>

            {/* Quick Preview Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-5">
              <div className="p-4 rounded-2xl bg-white border border-[#E6DFD3] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#7A746B]">
                  <span>Total Leads In Pipeline</span>
                  <Users className="w-4 h-4 text-amber-600 shrink-0" />
                </div>
                <p className="text-2xl font-extrabold text-[#141518] mt-1">
                  4,820
                </p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  +12% from automated WhatsApp check
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E6DFD3] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#7A746B]">
                  <span>VIP Meeting Zoom Room</span>
                  <Video className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
                <p className="text-2xl font-extrabold text-[#141518] mt-1">
                  Rebecca Vance
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  12:00 PM • Prod Design-Weekly sync
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E6DFD3] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#7A746B]">
                  <span>AI Receptionist Status</span>
                  <Bot className="w-4 h-4 text-indigo-600 shrink-0" />
                </div>
                <p className="text-2xl font-extrabold text-[#141518] mt-1">
                  Active
                </p>
                <p className="text-[11px] text-indigo-600 font-semibold mt-1">
                  0.4s response • Qualified 42 leads
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 3. FEATURES SECTION ----------------- */}
      <section
        id="features"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#E8E1D5]"
      >
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50">
            Pipeline Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141518]">
            Everything Required to Scale B2B Deal Volume
          </h2>
          <p className="text-sm text-[#666056]">
            From verified mobile number discovery to AI voice receptionists and
            customized video meeting demos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300/50 flex items-center justify-center text-amber-700 mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#141518]">
              Direct WhatsApp Verification
            </h3>
            <p className="text-xs text-[#7A746B] mt-2 leading-relaxed">
              Verify real mobile numbers via Meta Cloud API before sending.
              Filter out landlines, spam traps, and inactive devices.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300/50 flex items-center justify-center text-emerald-700 mb-4">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#141518]">
              AI Voice Receptionist (0.4s)
            </h3>
            <p className="text-xs text-[#7A746B] mt-2 leading-relaxed">
              Automated 24/7 AI inbound voice agents that answer inbound calls,
              qualify lead budget & timeline, and schedule discovery calls.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E1D5] shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 border border-indigo-300/50 flex items-center justify-center text-indigo-700 mb-4">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#141518]">
              VIP Meeting Zoom & Screen Room
            </h3>
            <p className="text-xs text-[#7A746B] mt-2 leading-relaxed">
              Interactive in-app video room with individual participant focus,
              screen zoom, live chat, and instant pitch notes.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------- 4. REVIEWS SECTION BANNER ----------------- */}
      <section
        id="reviews"
        className="py-14 sm:py-16 px-4 sm:px-6 lg:px-12 bg-[#F2EDE2]/60 border-t border-[#E8E1D5]"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span>4.9 / 5 Rating from 180+ Enterprise Teams</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141518]">
              Trusted by High-Velocity Revenue Directors
            </h2>
            <p className="text-xs text-[#7A746B] max-w-xl">
              Elena Rostova, Marcus Thorne, and hundreds of sales leaders triple
              their meeting conversions with Lead Evo.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsReviewsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-stone-50 border border-[#DFD8CC] text-[#141518] text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <span>Read All Verified Customer Reviews</span>
            <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
          </button>
        </div>
      </section>

      {/* ----------------- 5. FAQ SECTION ----------------- */}
      <section
        id="faq"
        className="py-14 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto border-t border-[#E8E1D5]"
      >
        <div className="text-center space-y-2 mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141518]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#7A746B]">
            Find answers regarding Start Free, account login, and sidebar
            navigation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#E8E1D5] overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#141518] hover:bg-stone-50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8A8478] transition-transform shrink-0 ${
                    activeFaq === idx ? "rotate-180 text-amber-600" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-[#666056] leading-relaxed border-t border-[#F2ECE1] bg-[#FAF7F2]/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsFaqsModalOpen(true)}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 underline cursor-pointer"
          >
            View More FAQs in Detail &rarr;
          </button>
        </div>
      </section>

      {/* ----------------- 6. BOTTOM BANNER & FOOTER ----------------- */}
      <section className="pt-14 pb-24 sm:pb-20 px-4 sm:px-6 lg:px-12 bg-[#141518] text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Supercharge Your Sales Pipeline?
          </h2>
          <p className="text-xs sm:text-sm text-stone-300">
            Join thousands of revenue leaders using Lead Evo to discover,
            verify, and close enterprise deals on WhatsApp.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleOpenPricing}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Start Free · View Evolution Plans</span>
            </button>
            <button
              onClick={onSignIn}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/10 transition-all cursor-pointer"
            >
              <span>Sign In with Existing Account</span>
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Layers className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-bold text-white">Lead Evo PRO</span>
            <span>© 2026 Lead Evo Inc. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>256-Bit SSL Encrypted</span>
            </span>
            <span>Meta Cloud API Verified</span>
          </div>
        </div>
      </section>

      {/* ----------------- FIXED BOTTOM-LEFT GUEST MODE / LOGIN BUTTON ----------------- */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <button
          type="button"
          onClick={onInstantDemo}
          className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FDE8AA] to-[#F5A623] hover:from-[#FCD67A] hover:to-[#E09816] text-[#141518] font-black text-[11px] sm:text-sm shadow-xl border border-white/50 flex items-center gap-1.5 sm:gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#141518] shrink-0" />
          <span>Try FREE Guest Mode / Login</span>
        </button>
      </div>

      {/* ----------------- PRICING CARD OVERLAY MODAL ----------------- */}
      <PricingOverlayModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onSelectPlan={handleSelectPlan}
        onGuestModeLogin={onInstantDemo}
      />

      {/* ----------------- REVIEWS MODAL ----------------- */}
      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        onStartFree={handleOpenPricing}
      />

      {/* ----------------- FAQS MODAL ----------------- */}
      <FaqsModal
        isOpen={isFaqsModalOpen}
        onClose={() => setIsFaqsModalOpen(false)}
        onStartFree={handleOpenPricing}
      />
    </div>
  );
};