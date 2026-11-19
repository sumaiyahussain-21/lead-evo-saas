import { useState, useEffect } from "react";
import { Zap, RotateCw, Sparkles } from "lucide-react";
export const SeoAuditView = ({ audits, onRunAudit }) => {
  const [auditUrl, setAuditUrl] = useState("https://jpvapes.jp/brand/vgod");
  const [targetType, setTargetType] = useState("homepage");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState("");
  const [activeAudit, setActiveAudit] = useState(audits[0] || null);
  const [animatedSeo, setAnimatedSeo] = useState(activeAudit?.seoScore || 100);
  const [animatedSpeed, setAnimatedSpeed] = useState(
    activeAudit?.speedScore || 74,
  );
  const [animatedA11y, setAnimatedA11y] = useState(
    activeAudit?.accessibilityScore || 95,
  );
  const [animatedBp, setAnimatedBp] = useState(
    activeAudit?.bestPracticesScore || 100,
  );
  useEffect(() => {
    if (activeAudit) {
      animateScoresTo(
        activeAudit.seoScore,
        activeAudit.speedScore,
        activeAudit.accessibilityScore,
        activeAudit.bestPracticesScore,
      );
    }
  }, [activeAudit]);
  const animateScoresTo = (targetSeo, targetSpeed, targetA11y, targetBp) => {
    let current = 0;
    const duration = 1200;
    const startTime = performance.now();
    const frame = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedSeo(Math.round(ease * targetSeo));
      setAnimatedSpeed(Math.round(ease * targetSpeed));
      setAnimatedA11y(Math.round(ease * targetA11y));
      setAnimatedBp(Math.round(ease * targetBp));
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };
    requestAnimationFrame(frame);
  };
  const handleStartAudit = async () => {
    if (!auditUrl.trim()) return;
    setIsAuditing(true);
    setAuditStep("Resolving host & establishing SSL handshake...");
    const timer1 = setTimeout(() => {
      setAuditStep("Running Chromium Mobile Core Web Vitals & FCP...");
    }, 400);
    const timer2 = setTimeout(() => {
      setAuditStep("Auditing Schema.org, OpenGraph & meta hierarchy...");
    }, 800);
    try {
      const res = await onRunAudit(auditUrl, targetType);
      clearTimeout(timer1);
      clearTimeout(timer2);
      setAuditStep("Compiling performance recommendations...");
      setTimeout(() => {
        setActiveAudit(res);
        setIsAuditing(false);
        setAuditStep("");
      }, 500);
    } catch (e) {
      console.error(e);
      setIsAuditing(false);
      setAuditStep("");
    }
  };
  const renderGauge = (score, label, strokeColor) => {
    const circumference = 2 * Math.PI * 36;
    const offset = circumference - (score / 100) * circumference;
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="36"
              stroke="#F2EFE8"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="36"
              stroke={strokeColor}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-extrabold text-[#18191E]">
              {score}
            </span>
          </div>
        </div>
        <span className="text-xs font-semibold text-[#524D43] mt-2">
          {label}
        </span>
      </div>
    );
  };
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Intro Description */}
      <div>
        <p className="text-sm text-[#4E473D] max-w-3xl leading-relaxed">
          Audit any website: SEO, speed, Core Web Vitals and every page of the
          site. Get a branded report you can send to the client.
        </p>
      </div>

      {/* Main Search/Audit Input Card */}
      <div className="space-y-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={auditUrl}
            onChange={(e) => setAuditUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStartAudit()}
            placeholder="Enter any domain (e.g. nike.com, shopify.com, yourlead.co)..."
            className="w-full pl-6 pr-32 py-4 rounded-full bg-white border border-[#DDD6C8] text-sm font-mono text-[#18191E] focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs"
          />
          <button
            onClick={handleStartAudit}
            disabled={isAuditing}
            aria-label="Run Audit"
            className="absolute right-2 px-8 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-bold text-sm shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            {isAuditing && (
              <RotateCw className="w-4 h-4 animate-spin text-black" />
            )}
            <span>{isAuditing ? "Auditing..." : "Audit"}</span>
          </button>
        </div>

        {/* Live Step Indicator during scan */}
        {isAuditing && (
          <div className="p-4 rounded-2xl bg-[#141518] text-white flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="font-mono text-amber-300">{auditStep}</span>
            </div>
            <span className="text-white/60">
              Simulating live headless mobile runner
            </span>
          </div>
        )}

        {/* Scan Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setTargetType("homepage")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${targetType === "homepage" ? "bg-amber-50 text-amber-900 border border-amber-300 shadow-xs" : "bg-white text-[#524D43] border border-[#DDD6C8] hover:bg-[#FAF7F2]"}`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Homepage audit</span>
            <span className="text-[#8C8477] font-normal">• ~40 s</span>
          </button>

          <button
            onClick={() => setTargetType("every-page")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${targetType === "every-page" ? "bg-amber-50 text-amber-900 border border-amber-300 shadow-xs" : "bg-white text-[#524D43] border border-[#DDD6C8] hover:bg-[#FAF7F2]"}`}
          >
            <span className="w-2 h-2 rounded-full bg-stone-300" />
            <span>Every page</span>
            <span className="text-[#8C8477] font-normal">• a few minutes</span>
          </button>

          <button
            onClick={() => setTargetType("batch")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${targetType === "batch" ? "bg-amber-50 text-amber-900 border border-amber-300 shadow-xs" : "bg-white text-[#524D43] border border-[#DDD6C8] hover:bg-[#FAF7F2]"}`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Batch audit</span>
            <span className="text-[#8C8477] font-normal">• Up to 50 URLs</span>
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-[#18191E] text-white">
              NEW
            </span>
          </button>
        </div>

        {/* Audit Quota Statistics */}
        <p className="text-[11px] text-[#7A746B]">
          Homepage audits today:{" "}
          <span className="font-bold text-[#18191E]">1 / 25</span> • Full site
          audits: <span className="font-bold text-[#18191E]">0 / 5</span> (up to
          200 pages) • Batch scans today:{" "}
          <span className="font-bold text-[#18191E]">2 / 10</span> (CSV or
          multi-URL list)
        </p>
      </div>

      {/* Live Animated Audit Result Card matching seo_audit_1_1c2a56a6.png */}
      {activeAudit && (
        <div className="bg-white rounded-3xl p-8 border border-[#EDE8DF] shadow-xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-extrabold text-[#18191E]">
                {activeAudit.url.replace(/https?:\/\//, "")}
              </h3>
              <a
                href={activeAudit.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#7A746B] hover:text-amber-700 font-mono mt-0.5 inline-block"
              >
                {activeAudit.url}
              </a>
            </div>

            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              ✓ Verified Live Audit Completed
            </span>
          </div>

          {/* 4 Circular Animated Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4">
            {renderGauge(animatedSeo, "SEO", "#10B981")}
            {renderGauge(
              animatedSpeed,
              "Speed",
              animatedSpeed >= 80 ? "#10B981" : "#F59E0B",
            )}
            {renderGauge(animatedA11y, "Accessibility", "#10B981")}
            {renderGauge(animatedBp, "Best practices", "#10B981")}
          </div>

          {/* Core Web Vitals breakdown */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB] text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                Largest Contentful Paint (LCP)
              </span>
              <p className="font-mono font-bold text-sm text-[#18191E] mt-0.5">
                {activeAudit.metrics.lcp}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                First Input Delay (FID)
              </span>
              <p className="font-mono font-bold text-sm text-[#18191E] mt-0.5">
                {activeAudit.metrics.fid}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                Cumulative Layout Shift (CLS)
              </span>
              <p className="font-mono font-bold text-sm text-[#18191E] mt-0.5">
                {activeAudit.metrics.cls}
              </p>
            </div>
          </div>

          {/* Detected Recommendations & Pitch talking points */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>High-Converting Outreach Hook Generated from Audit</span>
            </div>
            <p className="text-[#634E26] leading-relaxed">
              "We noticed mobile PageSpeed on{" "}
              <span className="font-mono font-bold">
                {activeAudit.url.replace(/https?:\/\//, "")}
              </span>{" "}
              drops to {activeAudit.speedScore}/100 with{" "}
              {activeAudit.metrics.issuesFound} high-impact script bottlenecks.
              In your target market, eliminating these yields up to +28%
              checkout conversion."
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                const reportText = `LEAD EVO SEO AUDIT REPORT
Target: ${activeAudit.url}
SEO: ${activeAudit.seoScore}/100
Speed: ${activeAudit.speedScore}/100
Accessibility: ${activeAudit.accessibilityScore}/100
Best Practices: ${activeAudit.bestPracticesScore}/100
LCP: ${activeAudit.metrics.lcp} | FID: ${activeAudit.metrics.fid} | CLS: ${activeAudit.metrics.cls}`;
                const encoded = encodeURI(
                  "data:text/plain;charset=utf-8," + reportText,
                );
                const a = document.createElement("a");
                a.href = encoded;
                a.download = `SEO_Report_${activeAudit.url.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
                a.click();
              }}
              className="px-6 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-bold text-xs shadow-sm cursor-pointer"
            >
              Homepage report
            </button>
            <button
              onClick={handleStartAudit}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#DDD6C8] text-[#18191E] font-semibold text-xs cursor-pointer"
            >
              Re-check
            </button>
          </div>
        </div>
      )}

      {/* Your Audits History Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#18191E]">Your audits</h3>

        <div className="space-y-3">
          {audits.map((a) => (
            <div
              key={a.id}
              onClick={() => setActiveAudit(a)}
              className="p-4 rounded-2xl bg-white border border-[#EDE8DF] shadow-xs flex items-center justify-between cursor-pointer hover:bg-[#FAF7F2] transition-colors"
            >
              <div>
                <h4 className="font-bold text-xs text-[#18191E]">
                  {a.url.replace(/https?:\/\//, "")}
                </h4>
                <p className="text-[11px] text-[#7A746B]">
                  {a.url} • {a.scannedAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  SEO {a.seoScore}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${a.speedScore >= 80 ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"}`}
                >
                  Speed {a.speedScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
