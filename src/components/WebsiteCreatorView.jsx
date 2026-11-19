import { useState } from "react";
import {
  Globe,
  Sparkles,
  Laptop,
  TrendingUp,
  Zap,
  Plus,
  Loader2,
  Smartphone,
  Monitor,
  ShieldCheck,
  Download,
  Share2,
} from "lucide-react";
export const WebsiteCreatorView = () => {
  const [targetUrl, setTargetUrl] = useState("https://apexclothing.co");
  const [isScanning, setIsScanning] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [redesignModalData, setRedesignModalData] = useState(null);
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [comparisonMode, setComparisonMode] = useState("after");
  const portfolioItems = [
    {
      id: "port_1",
      title: "Apex Luxury Minimalist Storefront",
      domain: "apexclothing.co",
      tag: "Live Demo",
      lift: "+184% Lift",
      metric: "4.2x ROAS",
      tags: ["Shopify Plus", "0.4s Latency", "E-commerce"],
      category: "E-commerce",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "port_2",
      title: "Kinetix Athletic Wear 2.0",
      domain: "kinetixwear.io",
      tag: "Case Study",
      lift: "+92% Checkout",
      metric: "0.5s Latency",
      tags: ["Headless Commerce", "Instant PWA", "Redesign Demo"],
      category: "E-commerce",
      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "port_3",
      title: "Solstice Botanicals Webflow Overhaul",
      domain: "solsticebotanicals.com",
      tag: "Webflow",
      lift: "3.1x Leads",
      metric: "+210% AOV",
      tags: ["Webflow CMS", "Diagnostic Quiz", "Health & Wellness"],
      category: "SaaS",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "port_4",
      title: "DentalSmile Pro Booking Engine",
      domain: "dentalsmile.com",
      tag: "Local Service",
      lift: "52 Consults/mo",
      metric: "98% Show-up",
      tags: ["Online Booking", "HIPAA Compliant", "Healthcare"],
      category: "Healthcare",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80",
    },
  ];
  const handleStartRedesign = (customUrl) => {
    const url = customUrl || targetUrl;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const cleanDomain = url.replace(/https?:\/\//, "").replace(/\/.*$/, "");
      const brandName = cleanDomain.split(".")[0].toUpperCase();
      setRedesignModalData({
        domain: cleanDomain,
        brandName,
        tagline:
          cleanDomain.includes("cloth") ||
          cleanDomain.includes("wear") ||
          cleanDomain.includes("apex")
            ? "Modern Minimalist Apparel & Luxury Essentials"
            : cleanDomain.includes("dental") || cleanDomain.includes("smile")
              ? "Frictionless VIP Dental & Medical Booking Engine"
              : "Next-Generation High-Converting Digital Experience",
        conversionLift: "+184% Projected Lift",
        pageSpeed: "99/100",
        latency: "0.38s",
      });
    }, 900);
  };
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Title & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#141518]">
            Websites
          </h1>
          <p className="text-xs text-[#7A746B] mt-1 max-w-2xl leading-relaxed">
            Pitch sites built from your leads. Open any lead and press{" "}
            <span className="font-semibold text-black">Make website</span>, then
            edit here by chatting. You can build up to{" "}
            <span className="font-semibold text-black">10 a day</span> —{" "}
            <span className="font-semibold text-amber-700">10 left today</span>.
            You only see websites you built.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() =>
              handleStartRedesign("https://solsticebotanicals.com")
            }
            className="px-4 py-2 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#DDD6C8] text-xs font-semibold text-[#18191E] shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Portfolio</span>
          </button>
          <button
            onClick={() => handleStartRedesign(targetUrl)}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Build from my details</span>
          </button>
        </div>
      </div>

      {/* Redesign Prospect's Existing Website Banner Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#EDE8DF] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-[#18191E]">
              Redesign Prospect's Existing Website
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
              Instant Makeover
            </span>
          </div>
          <span className="text-xs text-[#7A746B] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            1-click scraper & live audit
          </span>
        </div>

        <p className="text-xs text-[#7A746B]">
          Scrape any existing client website, clone their core identity, and
          generate an AI high-converting pitch redesign in seconds.
        </p>

        {/* Input & Action Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C8477]">
              🔗
            </span>
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://clientwebsite.com"
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] text-xs font-mono text-[#18191E] focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <button
            onClick={() => handleStartRedesign(targetUrl)}
            disabled={isScanning}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#141518] hover:bg-black text-white text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isScanning ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-400" />
            )}
            <span>
              {isScanning
                ? "Scraping & Redesigning..."
                : "Redesign from URL \u2192"}
            </span>
          </button>
        </div>

        {/* Sample URLs pills */}
        <div className="flex items-center gap-2 text-xs text-[#8C8477]">
          <span className="text-[10px] uppercase font-bold">
            Try Sample URLs:
          </span>
          {["apexclothing.co", "dentalsmile.com", "hvacpro.io"].map((url) => (
            <button
              key={url}
              onClick={() => {
                setTargetUrl(`https://${url}`);
                handleStartRedesign(`https://${url}`);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#484236] text-[11px] font-mono cursor-pointer transition-colors"
            >
              {url}
            </button>
          ))}
        </div>
      </div>

      {/* Agency Portfolio Section matching WEBSITE_CREATOR_1_882bfe54.png */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h3 className="text-base font-bold text-[#18191E]">
                My Agency Portfolio & Custom Uploads
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                12 Case Studies
              </span>
            </div>
            <p className="text-xs text-[#7A746B] mt-0.5">
              Showcase your best redesigns, live case studies, and uploaded
              agency work to prospects directly in your sales pitches.
            </p>
          </div>

          <button
            onClick={() => handleStartRedesign("https://apexclothing.co")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#18191E] text-white text-xs font-bold hover:bg-black shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Laptop className="w-3.5 h-3.5 text-amber-400" />
            <span>Upload New Mockup</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {[
              { id: "All", label: "All Work (12)" },
              { id: "E-commerce", label: "E-commerce Redesigns (6)" },
              { id: "SaaS", label: "SaaS Funnels (4)" },
              { id: "Healthcare", label: "Healthcare & Services (2)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${activeCategory === tab.id ? "bg-[#18191E] text-white shadow-xs" : "bg-[#FAF7F2] text-[#696254] hover:bg-stone-200/60"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-[#8C8477] text-[11px] hidden md:flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Auto-embeds client proof in pitch emails
          </span>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => handleStartRedesign("https://apexclothing.co")}
            className="p-8 rounded-3xl bg-[#FAF7F2] border-2 border-dashed border-[#D9D0C1] flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-400 transition-colors min-h-[300px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-white text-amber-600 border border-[#DDD6C8] flex items-center justify-center mb-3 shadow-xs">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#18191E]">
              + Upload New Portfolio Project
            </h4>
            <p className="text-xs text-[#7A746B] mt-1 max-w-[220px]">
              Drag & drop design mockups, Figma exports, or paste client live
              URL.
            </p>
            <span className="mt-4 px-3 py-1 rounded-full bg-white text-[10px] font-mono text-[#8C8477] border border-[#DDD6C8]">
              PNG, JPG, WebP up to 25MB
            </span>
          </div>

          {portfolioItems
            .filter(
              (p) => activeCategory === "All" || p.category === activeCategory,
            )
            .map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs flex flex-col justify-between group hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-4 bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-bold backdrop-blur-xs">
                        {item.tag}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black text-[10px] font-extrabold shadow-xs">
                        {item.lift}
                      </span>
                    </div>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono">
                      {item.domain}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-[#18191E] leading-snug">
                    {item.title}
                  </h4>

                  <div className="flex flex-wrap gap-1.5 mt-2.5 mb-3">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#5C5549] text-[10px] font-medium border border-[#E8E2D6]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{item.metric}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleStartRedesign(`https://${item.domain}`)
                      }
                      className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-xs font-semibold text-[#18191E] cursor-pointer"
                    >
                      View Redesign
                    </button>
                    <button
                      onClick={() =>
                        handleStartRedesign(`https://${item.domain}`)
                      }
                      className="px-3 py-1.5 rounded-xl bg-[#141518] hover:bg-black text-white text-xs font-bold cursor-pointer"
                    >
                      Embed in Pitch
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* FULLSCREEN BEHANCE-GRADE REDESIGNED PROTOTYPE MODAL */}
      {redesignModalData && (
        <div className="fixed inset-0 z-50 bg-[#0B0C0E]/95 backdrop-blur-md flex flex-col p-4 md:p-6 overflow-hidden animate-in fade-in duration-200">
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-black font-extrabold flex items-center justify-center text-sm shadow-md">
                Bē
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-white">
                    {redesignModalData.brandName} — Behance Redesign Studio
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {redesignModalData.conversionLift}
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-mono">
                  {redesignModalData.domain} • PageSpeed:{" "}
                  {redesignModalData.pageSpeed} • Latency:{" "}
                  {redesignModalData.latency}
                </p>
              </div>
            </div>

            {/* Toggle Controls: Device (Desktop / Mobile) & Mode (After / Before) */}
            <div className="flex items-center gap-3">
              {/* Before vs After Switch */}
              <div className="flex p-1 rounded-xl bg-white/10 border border-white/10 text-xs">
                <button
                  onClick={() => setComparisonMode("after")}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${comparisonMode === "after" ? "bg-amber-400 text-black shadow-sm" : "text-stone-300 hover:text-white"}`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>✨ Redesign (After)</span>
                </button>
                <button
                  onClick={() => setComparisonMode("before")}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${comparisonMode === "before" ? "bg-rose-500 text-white shadow-sm" : "text-stone-300 hover:text-white"}`}
                >
                  <span>Old Site (Before)</span>
                </button>
              </div>

              {/* Desktop vs Mobile Switch */}
              <div className="flex p-1 rounded-xl bg-white/10 border border-white/10 text-xs">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-1.5 px-2.5 rounded-lg transition-all cursor-pointer ${previewDevice === "desktop" ? "bg-white text-black font-bold" : "text-stone-300 hover:text-white"}`}
                  title="Desktop View (1440px)"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-1.5 px-2.5 rounded-lg transition-all cursor-pointer ${previewDevice === "mobile" ? "bg-white text-black font-bold" : "text-stone-300 hover:text-white"}`}
                  title="Mobile View (iPhone 16 Pro)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setRedesignModalData(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Interactive Redesigned Canvas Area */}
          <div className="flex-1 overflow-y-auto py-6 flex items-start justify-center">
            {comparisonMode === "after" ? (
              /* BEHANCE LUXURY HIGH-CONVERTING REDESIGN */
              <div
                className={`w-full transition-all duration-300 shadow-2xl rounded-3xl overflow-hidden border border-white/15 bg-[#0F1015] text-white ${previewDevice === "mobile" ? "max-w-md ring-8 ring-stone-800" : "max-w-5xl"}`}
              >
                {/* Browser Bezel Header */}
                <div className="bg-[#1A1C24] px-4 py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="px-4 py-1 rounded-full bg-black/40 text-[11px] font-mono text-stone-300 border border-white/5 flex items-center gap-1.5">
                    <span>🔒</span> https://{redesignModalData.domain}
                  </div>
                  <div className="text-[11px] text-amber-400 font-bold">
                    PROTOTYPE v2.4
                  </div>
                </div>

                {/* Redesigned Website Navigation */}
                <nav className="px-8 py-5 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 text-black flex items-center justify-center font-black text-sm">
                      {redesignModalData.brandName.substring(0, 2)}
                    </span>
                    <span>{redesignModalData.brandName}</span>
                  </div>

                  {previewDevice === "desktop" && (
                    <div className="flex items-center gap-8 text-xs font-medium text-stone-300">
                      <span className="text-white font-bold cursor-pointer hover:text-amber-400">
                        Featured
                      </span>
                      <span className="cursor-pointer hover:text-white">
                        Collections
                      </span>
                      <span className="cursor-pointer hover:text-white">
                        Case Studies
                      </span>
                      <span className="cursor-pointer hover:text-white">
                        VIP Reviews
                      </span>
                    </div>
                  )}

                  <button className="px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold shadow-lg shadow-amber-400/20 cursor-pointer">
                    Instant Checkout →
                  </button>
                </nav>

                {/* Hero Section */}
                <div className="px-8 py-14 max-w-4xl mx-auto text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Redesigned for Maximum Conversion Velocity</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] bg-gradient-to-b from-white via-stone-200 to-stone-400 bg-clip-text text-transparent">
                    {redesignModalData.tagline}
                  </h1>

                  <p className="text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
                    Zero latency, frictionless 1-tap mobile ordering, and
                    tailored aesthetic crafted to 3x buyer retention.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <button className="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm shadow-xl shadow-amber-400/20 transition-transform active:scale-95 cursor-pointer">
                      Explore Redesigned Experience
                    </button>
                    <button className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 cursor-pointer">
                      View Performance Metrics
                    </button>
                  </div>

                  {/* 3 Live Metric Badges */}
                  <div className="grid grid-cols-3 gap-4 pt-10 text-left">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                      <span className="text-[10px] uppercase font-bold text-amber-400">
                        Page Speed
                      </span>
                      <p className="text-2xl font-black text-white mt-1">
                        99/100
                      </p>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        +68pts boost
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                      <span className="text-[10px] uppercase font-bold text-amber-400">
                        Checkout Friction
                      </span>
                      <p className="text-2xl font-black text-white mt-1">
                        0.38s
                      </p>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        1-Tap WhatsApp Pay
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                      <span className="text-[10px] uppercase font-bold text-amber-400">
                        Target Lift
                      </span>
                      <p className="text-2xl font-black text-white mt-1">
                        +184%
                      </p>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        Verified by A/B test
                      </span>
                    </div>
                  </div>

                  {/* Redesigned Showcase Grid */}
                  <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="relative rounded-3xl overflow-hidden aspect-4/3 bg-stone-900 border border-white/10 group">
                      <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80"
                        alt="Product Showcase"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                        <span className="text-xs font-bold text-amber-300">
                          Modernized Catalog Experience
                        </span>
                        <h4 className="text-lg font-bold text-white">
                          Dynamic 3D Product Interactive Visuals
                        </h4>
                      </div>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden aspect-4/3 bg-stone-900 border border-white/10 group">
                      <img
                        src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
                        alt="Mobile Conversion Funnel"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                        <span className="text-xs font-bold text-amber-300">
                          Instant VIP Onboarding
                        </span>
                        <h4 className="text-lg font-bold text-white">
                          Zero Form-Dropoff Medical & Commerce Funnel
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* OLD SITE (BEFORE) COMPARISON VIEW */
              <div
                className={`w-full transition-all duration-300 shadow-2xl rounded-3xl overflow-hidden border border-rose-500/30 bg-[#F5F2ED] text-[#2C2822] ${previewDevice === "mobile" ? "max-w-md ring-8 ring-stone-800" : "max-w-5xl"}`}
              >
                <div className="bg-[#DDD6C8] px-4 py-3 flex items-center justify-between border-b border-[#CCC4B5]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-stone-400" />
                    <span className="w-3 h-3 rounded-full bg-stone-400" />
                    <span className="w-3 h-3 rounded-full bg-stone-400" />
                  </div>
                  <div className="px-4 py-1 rounded-full bg-white text-[11px] font-mono text-stone-600 border border-stone-300 flex items-center gap-1.5">
                    <span>⚠️ Unoptimized:</span> {redesignModalData.domain}
                  </div>
                  <div className="text-[11px] text-rose-600 font-bold">
                    OLD CLUTTERED VERSION
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="p-4 rounded-2xl bg-rose-100 border border-rose-300 text-xs text-rose-900 flex items-center justify-between">
                    <span>
                      ⚠️ Critical Flaws: 4.8s mobile load time, 72% bounce rate,
                      cluttered navigation.
                    </span>
                    <span className="font-bold">PageSpeed: 38/100</span>
                  </div>

                  <div className="border-4 border-dashed border-stone-300 rounded-3xl p-12 text-center space-y-4 bg-white">
                    <p className="text-2xl font-serif text-stone-500">
                      Welcome to {redesignModalData.domain}
                    </p>
                    <p className="text-xs text-stone-400 max-w-md mx-auto">
                      (Outdated 2014 layout, non-responsive tables, small fonts,
                      missing SSL trust badges, high drop-off cart).
                    </p>
                    <div className="py-6 flex justify-center gap-2">
                      <div className="w-32 h-20 bg-stone-200 rounded" />
                      <div className="w-32 h-20 bg-stone-200 rounded" />
                      <div className="w-32 h-20 bg-stone-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-white shrink-0">
            <div className="flex items-center gap-2 text-xs text-stone-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                Full Behance Prototype Generated • Ready for Client Walkthrough
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://leadevo.io/redesign/${redesignModalData.domain}`,
                  );
                  alert(
                    "Interactive Behance redesign pitch link copied to clipboard!",
                  );
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Prototype Link</span>
              </button>
              <button
                onClick={() => {
                  alert("Exporting Figma Redesign Specs & High-Res Assets...");
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Behance Pitch Deck</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
