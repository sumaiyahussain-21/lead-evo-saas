import { useState } from "react";
import {
  Users,
  Zap,
  Calendar,
  Sparkles,
  MessageSquare,
  Play,
  Pause,
  Clock,
  ArrowUpRight,
  SlidersHorizontal,
  ChevronRight,
  Video,
  Bot,
  Mail,
  CheckCircle2,
  TrendingUp,
  Send,
} from "lucide-react";

const ALEX_HIGH_RES_AVATAR =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop&crop=faces,top&q=90";

export const DashboardView = ({
  stats,
  leads,
  onOpenBookMeeting,
  onNavigateTab,
  user,
}) => {
  const [selectedDay, setSelectedDay] = useState("24");
  const [isDialPlaying, setIsDialPlaying] = useState(true);
  const featuredLead = leads.find((l) => l.name === "Alex Carter") || leads[0];

  const featuredImg = ALEX_HIGH_RES_AVATAR;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner Row: Greeting + KPI Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300/70">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Live Pipeline Active
            </span>
            <span className="text-xs text-[#827C72]">Sync updated 4m ago</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#141518]">
            Welcome back, <br />
            <span className="italic font-light text-[#3C3831]">
              {user?.name || "Elena Rostova"}
            </span>
          </h1>
        </div>

        {/* Golden KPI Metric Card - Fully Responsive */}
        <div className="bg-[#FBEEC8] border border-[#ECD9A0] rounded-3xl p-4 sm:p-6 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full lg:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F4DF9F] flex items-center justify-center text-[#1C1810] shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A794E]">
                Total Leads
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#1F1B12] flex items-baseline gap-1.5">
                {stats.totalLeads.toLocaleString()}
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded-md">
                  +12%
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:border-l sm:border-[#ECD9A0] sm:pl-6">
            <div className="w-10 h-10 rounded-2xl bg-[#F4DF9F] flex items-center justify-center text-[#1C1810] shrink-0">
              <Zap className="w-5 h-5 text-amber-600 fill-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A794E]">
                High Intent
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#1F1B12]">
                {stats.highIntent.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:border-l sm:border-[#ECD9A0] sm:pl-6">
            <div className="w-10 h-10 rounded-2xl bg-[#F4DF9F] flex items-center justify-center text-[#1C1810] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A794E]">
                Meetings Booked
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#1F1B12]">
                {stats.meetingsBooked}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Generation Velocity Funnel */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EDE8DF] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <h2 className="text-sm font-bold text-[#18191E]">
              Lead Generation Velocity Funnel
            </h2>
          </div>
          <p className="text-xs text-[#7A746B]">
            Daily Target:{" "}
            <span className="font-semibold text-[#18191E]">350 Leads</span> •{" "}
            <span className="text-emerald-600 font-semibold">92% Achieved</span>
          </p>
        </div>

        {/* Funnel Visual Bar - Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-1.5 md:h-12 p-2 md:p-1.5 rounded-2xl bg-[#F7F4EE] border border-[#EBE4D8]">
          <div className="col-span-1 md:col-span-2 rounded-xl bg-[#1A1B20] text-white flex items-center justify-between px-3 py-2.5 md:py-0 text-xs font-semibold shadow-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-white/40 shrink-0" />
              <span className="truncate">Discovered</span>
            </div>
            <span className="font-mono text-amber-300 ml-1">15%</span>
          </div>

          <div className="col-span-1 md:col-span-3 rounded-xl bg-[#F4CA64] text-[#1A1813] flex items-center justify-between px-3 py-2.5 md:py-0 text-xs font-bold shadow-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1A1813] shrink-0" />
              <span className="truncate">Verified & Scored</span>
            </div>
            <span className="font-mono ml-1">24%</span>
          </div>

          <div
            className="col-span-1 md:col-span-5 rounded-xl bg-gradient-to-r from-[#E6E1D6] to-[#DAD3C4] text-[#423D33] flex items-center justify-between px-3 py-2.5 md:py-0 text-xs font-semibold"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(0,0,0,0.03), rgba(0,0,0,0.03) 10px, transparent 10px, transparent 20px)",
            }}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <Send className="w-3.5 h-3.5 text-[#6E6759] shrink-0" />
              <span className="truncate">In Outreach Pipeline</span>
            </div>
            <span className="font-mono text-[#18191E] font-bold ml-1">48%</span>
          </div>

          <div className="col-span-1 md:col-span-2 rounded-xl bg-white border border-[#DDD6C8] text-[#1A1B20] flex items-center justify-between px-3 py-2.5 md:py-0 text-xs font-bold shadow-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">Won</span>
            </div>
            <span className="font-mono text-emerald-700 ml-1">13%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column & Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column (Span 6) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Featured Lead Card (Alex Carter) */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EDE8DF] shadow-xs relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF6E6] text-[#A66F00] border border-[#FDE1A6]">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                98.4 Match
              </span>
              <span className="text-xs font-semibold text-[#80796E] bg-[#F7F4EE] px-2.5 py-1 rounded-full">
                Claude 3.5 Enriched
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden mb-5 bg-[#E8E2D6] h-64 sm:h-72">
              <img
                src={featuredImg}
                alt={featuredLead?.name || "Alex Carter"}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold truncate">
                      {featuredLead?.name || "Alex Carter"}
                    </h3>
                    <p className="text-xs text-white/80 truncate">
                      {featuredLead?.role || "VP Sales"} •{" "}
                      {featuredLead?.company || "Stripe Partner"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                      Potential ARR
                    </span>
                    <p className="text-lg sm:text-xl font-extrabold text-white">
                      ${(featuredLead?.arrPotential || 12450).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs py-2 border-t border-[#F2ECE1] mb-4">
              <div className="flex items-center gap-1.5 text-[#5A554D]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Enriched via Claude 3.5</span>
              </div>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Ready to Close
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenBookMeeting(featuredLead)}
                aria-label="Book Call with Lead"
                className="flex-1 py-3 px-4 rounded-2xl bg-[#141518] hover:bg-[#2A2B30] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Book Call</span>
              </button>
              <button
                onClick={() => onNavigateTab("outreach")}
                aria-label="Message Lead"
                className="p-3 rounded-2xl border border-[#DDD6C8] hover:bg-[#FAF7F2] text-[#24211A] transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Engine Integrations */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EDE8DF] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#18191E]">
                Engine Integrations
              </h3>
              <button
                onClick={() => onNavigateTab("whatsapp-check")}
                aria-label="Engine settings"
                className="text-[#8A8376] hover:text-[#18191E] cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE9DF] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#18191E]">
                      WhatsApp API
                    </p>
                    <p className="text-[11px] text-[#7A746B]">
                      Connected • Cloud Bus
                    </p>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shrink-0" />
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE9DF] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#18191E]">
                      Domain Health
                    </p>
                    <p className="text-[11px] text-[#7A746B]">
                      98.2% Deliverability
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#18191E] font-mono">
                  98%
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE9DF] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#18191E]">
                      AI Receptionist
                    </p>
                    <p className="text-[11px] text-[#7A746B]">
                      Standby • 0.4s Latency
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A8A194]" />
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE9DF] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#18191E]">
                      HubSpot Sync
                    </p>
                    <p className="text-[11px] text-[#7A746B]">
                      2-way streaming live
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A8A194]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Span 6) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Progress & Outreach Dial Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Progress Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE8DF] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A8376]">
                  Progress
                </span>
                <button
                  onClick={() => onNavigateTab("all-leads")}
                  aria-label="View all leads"
                  className="w-6 h-6 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#686257] hover:text-[#18191E] cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-2 mb-4">
                  <span className="text-3xl font-extrabold text-[#18191E]">
                    2,480
                  </span>
                  <span className="text-xs text-[#7A746B]">leads</span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full ml-auto">
                    428 today
                  </span>
                </div>

                {/* Day Bar Chart */}
                <div className="flex items-end justify-between gap-2 h-20 pt-2">
                  {[
                    { day: "S", h: "40%" },
                    { day: "M", h: "85%" },
                    { day: "T", h: "60%" },
                    { day: "W", h: "95%" },
                    { day: "T", h: "75%" },
                    { day: "F", h: "30%" },
                    { day: "S", h: "50%" },
                  ].map((bar, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                    >
                      <div
                        className={`w-full rounded-md transition-all duration-500 ${
                          bar.day === "W"
                            ? "bg-[#18191E]"
                            : bar.day === "M" || bar.day === "T"
                            ? "bg-[#E5DFD3]"
                            : "bg-[#F2EDE4]"
                        }`}
                        style={{ height: bar.h }}
                      />
                      <span className="text-[10px] font-semibold text-[#8C8477]">
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Outreach Dial Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE8DF] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A8376]">
                  Outreach Dial
                </span>
                <button
                  onClick={() => onNavigateTab("outreach")}
                  aria-label="View outreach"
                  className="w-6 h-6 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#686257] hover:text-[#18191E] cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Radial Dial Indicator */}
              <div className="flex flex-col items-center justify-center my-1 relative">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#F4EFE6"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#F5A623"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset="110"
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-[#18191E]">
                      68.4%
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C8477]">
                      Read Rate
                    </span>
                  </div>
                </div>

                {/* Dial Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setIsDialPlaying(true)}
                    aria-label="Start dialer"
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isDialPlaying
                        ? "bg-[#18191E] text-white"
                        : "bg-[#FAF7F2] text-[#8C8477]"
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                  <button
                    onClick={() => setIsDialPlaying(false)}
                    aria-label="Pause dialer"
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      !isDialPlaying
                        ? "bg-[#18191E] text-white"
                        : "bg-[#FAF7F2] text-[#8C8477]"
                    }`}
                  >
                    <Pause className="w-3 h-3" />
                  </button>
                  <button
                    aria-label="Dial schedule"
                    className="p-1.5 rounded-full bg-[#FAF7F2] text-[#8C8477] hover:text-[#18191E] cursor-pointer"
                  >
                    <Clock className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scheduled Calls Calendar Widget */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EDE8DF] shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8477]">
                  Scheduled Calls
                </span>
                <h4 className="text-sm font-extrabold text-[#18191E]">
                  September 2024
                </h4>
              </div>
              <button
                onClick={() => onNavigateTab("meeting")}
                className="px-2.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#F2ECE2] text-[#18191E] text-xs font-medium cursor-pointer"
              >
                Open Meeting Room
              </button>
            </div>

            {/* Date Strip */}
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-4">
              {[
                { day: "Mon", num: "22" },
                { day: "Tue", num: "23" },
                { day: "Wed", num: "24" },
                { day: "Thu", num: "25" },
                { day: "Fri", num: "26" },
                { day: "Sat", num: "27" },
              ].map((d) => (
                <button
                  key={d.num}
                  onClick={() => setSelectedDay(d.num)}
                  className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    selectedDay === d.num
                      ? "bg-[#FEEFC3] text-[#7A5200] font-bold border border-[#F5D88E]"
                      : "hover:bg-[#FAF7F2] text-[#787165]"
                  }`}
                >
                  <span className="text-[10px] font-semibold">{d.day}</span>
                  <span className="text-sm font-extrabold">{d.num}</span>
                </button>
              ))}
            </div>

            {/* Calls for Selected Day */}
            <div className="space-y-3">
              {/* Call 1 */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
                <span className="text-xs font-mono text-[#8C8477] sm:w-16 sm:pt-3 shrink-0">
                  09:00 am
                </span>
                <div
                  onClick={() => onNavigateTab("meeting")}
                  className="flex-1 p-3.5 rounded-2xl bg-[#141518] text-white cursor-pointer hover:scale-[1.01] transition-transform"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white">
                      Discovery Sync: Enterprise FinTech Lead
                    </span>
                    <span className="text-[10px] font-bold bg-[#2A2B33] text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <Video className="w-2.5 h-2.5" />
                      Zoom
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70">
                    Discuss automated SEO inbound & AI receptionist demo with
                    Elena Rostova
                  </p>
                </div>
              </div>

              {/* Call 2 */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
                <span className="text-xs font-mono text-[#8C8477] sm:w-16 sm:pt-3 shrink-0">
                  11:00 am
                </span>
                <div
                  onClick={() => onNavigateTab("meeting")}
                  className="flex-1 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EBE4D8] cursor-pointer hover:bg-white transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-[#18191E]">
                      AI Receptionist Live Qualification
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <Bot className="w-2.5 h-2.5" />
                      AI Automated
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A746B]">
                    Incoming prospect demo from LinkedIn funnel (Marcus Thorne)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Outreach Health Breakdown */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EDE8DF] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A8376]">
                Outreach Health
              </span>
              <span className="text-2xl font-extrabold text-[#18191E]">
                78%
              </span>
            </div>

            <div className="flex h-3 rounded-full overflow-hidden mb-3 bg-[#FAF7F2]">
              <div
                className="bg-[#F5A623] h-full"
                style={{ width: "35%" }}
                title="Warm Pipeline 35%"
              />
              <div
                className="bg-[#18191E] h-full"
                style={{ width: "43%" }}
                title="Engaged 43%"
              />
              <div
                className="bg-[#DDD6C8] h-full"
                style={{ width: "22%" }}
                title="Idle 22%"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#7A746B]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
                <span>Warm Pipeline 35%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#18191E]" />
                <span>Engaged 43%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DDD6C8]" />
                <span>Idle 22%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};