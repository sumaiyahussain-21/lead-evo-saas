import { useState } from "react";
import { Search, Sparkles, Zap, ArrowRight, Send } from "lucide-react";
import { ProspectFinderModal } from "./ProspectFinderModal";
export const CollectLeadsView = ({
  leads,
  onCollectNewLeads,
  onNavigateTab,
  onLaunchOutreach,
}) => {
  const [isProspectFinderOpen, setIsProspectFinderOpen] = useState(false);
  const [selectedPresetIndustry, setSelectedPresetIndustry] =
    useState("E-commerce");
  const presetIndustries = [
    {
      title: "E-commerce DTC & Luxury",
      industry: "E-commerce",
      badge: "Shopify Plus / DTC",
      availableCount: "1,420 Verified",
      whatsappRate: "96.2%",
      avgARR: "$18,400",
      description:
        "Founders, CMOs, and heads of growth with active high-intent retail catalogs.",
      accent: "from-amber-400/20 to-orange-400/10",
    },
    {
      title: "B2B SaaS & Automation",
      industry: "B2B SaaS",
      badge: "Cloud / Series A-B",
      availableCount: "890 Verified",
      whatsappRate: "98.0%",
      avgARR: "$26,500",
      description:
        "VPs of Sales Ops, CROs, and technical founders scaling revenue engines.",
      accent: "from-blue-400/20 to-indigo-400/10",
    },
    {
      title: "FinTech & Payments Scale",
      industry: "FinTech",
      badge: "Enterprise FinTech",
      availableCount: "620 Verified",
      whatsappRate: "94.5%",
      avgARR: "$34,000",
      description:
        "Managing directors and payment infrastructure leaders in North America and Gulf.",
      accent: "from-emerald-400/20 to-teal-400/10",
    },
    {
      title: "Real Estate & Brokerages",
      industry: "Real Estate",
      badge: "High-Ticket Broker",
      availableCount: "510 Verified",
      whatsappRate: "91.8%",
      avgARR: "$14,200",
      description:
        "Commercial brokers and agency partners with active transaction volume.",
      accent: "from-stone-400/20 to-amber-400/10",
    },
  ];
  const handleOpenFinderWithPreset = (ind) => {
    setSelectedPresetIndustry(ind);
    setIsProspectFinderOpen(true);
  };
  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Prospect Finder Primary Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-[#8A8376] mb-1">
            <span>PROSPECT ENGINE</span>
            <span>/</span>
            <span className="text-amber-600 font-bold">LEAD DISCOVERY</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#18191E] tracking-tight">
            Collect Leads & Prospect Intelligence
          </h1>
          <p className="text-xs text-[#7A746B] mt-1 max-w-2xl">
            Automatically discover, scrape, verify direct WhatsApp mobile
            numbers, and enrich high-intent decision-makers into your active
            sales pipeline.
          </p>
        </div>

        {/* Top Button strictly labeled "Prospect Finder" as requested by user */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedPresetIndustry("E-commerce");
              setIsProspectFinderOpen(true);
            }}
            aria-label="Prospect Finder"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#18191E] hover:bg-black text-white text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95 group"
          >
            <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="text-sm">Prospect Finder</span>
          </button>
        </div>
      </div>

      {/* Hero Interactive Discovery Banner */}
      <div className="bg-gradient-to-br from-[#18191E] via-[#202228] to-[#121316] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[11px] font-bold text-amber-300 border border-white/10">
            <Zap className="w-3.5 h-3.5 fill-amber-300" />
            <span>AI Real-Time Prospect Discovery Active</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
            Target 4,800+ Decision-Makers with 100% WhatsApp Deliverability
          </h2>

          <p className="text-xs text-white/70 leading-relaxed max-w-xl">
            Filter by technology stack (Shopify, Webflow, HubSpot), headcount,
            country code, and ARR potential. All phone numbers are pre-verified
            via Meta WhatsApp Cloud API before adding to your pipeline.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* Main Action Button strictly labeled "Prospect Finder" */}
            <button
              onClick={() => {
                setSelectedPresetIndustry("E-commerce");
                setIsProspectFinderOpen(true);
              }}
              aria-label="Prospect Finder"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] text-xs font-extrabold shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Prospect Finder</span>
            </button>

            <button
              onClick={() => onNavigateTab("all-leads")}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
            >
              View Existing Pipeline ({leads.length} Leads)
            </button>
          </div>
        </div>
      </div>

      {/* 4 Instant Industry Presets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-[#18191E]">
              Popular Discovery Niches
            </h3>
            <p className="text-xs text-[#7A746B]">
              Pre-filtered high-converting prospect lists ready for 1-click
              collection.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
            Live Webhook Sync
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {presetIndustries.map((preset, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FAF7F2] text-[#6B655B] border border-[#EDE8DF]">
                    {preset.badge}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-700">
                    {preset.whatsappRate} WA
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-[#18191E]">
                  {preset.title}
                </h4>
                <p className="text-xs text-[#7A746B] line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8A8376]">
                    Available
                  </span>
                  <p className="font-extrabold text-xs text-[#18191E]">
                    {preset.availableCount}
                  </p>
                </div>

                {/* Card Button strictly labeled "Prospect Finder" */}
                <button
                  onClick={() => handleOpenFinderWithPreset(preset.industry)}
                  aria-label={`Prospect Finder for ${preset.industry}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#18191E] text-[#18191E] hover:text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
                >
                  <span>Prospect Finder</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Pipeline Preview / Recent Discovery Table */}
      <div className="bg-white rounded-3xl border border-[#EDE8DF] shadow-xs overflow-hidden">
        <div className="p-5 px-6 border-b border-[#F0EBE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF7F2]">
          <div>
            <h3 className="font-extrabold text-base text-[#18191E]">
              Recent Decision-Maker Prospects
            </h3>
            <p className="text-xs text-[#7A746B]">
              Ready for direct multi-channel pitch dispatch and personalized
              outreach.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab("outreach")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F5A623] hover:bg-[#E09816] text-[#121316] text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch Outreach</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#F0EBE1] text-[10px] font-bold uppercase tracking-wider text-[#8A8376] bg-white">
                <th className="py-3 px-6">Prospect Name</th>
                <th className="py-3 px-4">Company & Headcount</th>
                <th className="py-3 px-4">Direct WhatsApp</th>
                <th className="py-3 px-4">Intent Score</th>
                <th className="py-3 px-4">Pipeline Value</th>
                <th className="py-3 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EB]">
              {leads.slice(0, 6).map((lead, idx) => (
                <tr
                  key={`${lead.id}-${idx}`}
                  className="hover:bg-[#FAF7F2] transition-colors"
                >
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={lead.avatarUrl}
                        alt={lead.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#DDD6C8]"
                      />
                      <div>
                        <p className="font-bold text-[#18191E]">{lead.name}</p>
                        <p className="text-[11px] text-[#7A746B]">
                          {lead.role}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-[#18191E]">
                      {lead.company}
                    </p>
                    <p className="text-[11px] text-[#7A746B] font-mono">
                      {lead.industry} • {lead.employees} EMP
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#2A2722]">
                        {lead.phone}
                      </span>
                      {lead.whatsappVerified && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          WA
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#18191E]">
                        {lead.intentScore}%
                      </span>
                      <div className="w-14 h-1.5 rounded-full bg-[#EFEBE1] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                          style={{ width: `${lead.intentScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                    ${lead.arrPotential.toLocaleString()}
                  </td>

                  <td className="py-3.5 pr-6 text-right">
                    <button
                      onClick={() => onLaunchOutreach([lead.id])}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-[#DDD6C8] text-[#18191E] font-semibold text-xs cursor-pointer shadow-2xs"
                    >
                      Pitch Lead
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prospect Finder Modal Component */}
      <ProspectFinderModal
        isOpen={isProspectFinderOpen}
        onClose={() => setIsProspectFinderOpen(false)}
        onCollectLeads={(newLeads) => {
          onCollectNewLeads(newLeads);
        }}
        initialIndustry={selectedPresetIndustry}
      />
    </div>
  );
};
