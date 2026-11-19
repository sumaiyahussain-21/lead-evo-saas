import { useState } from "react";
import {
  Send,
  CheckCircle2,
  Search,
  ArrowUpDown,
  Edit3,
  Check,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import confetti from "canvas-confetti";
import { renderOutreachTemplate } from "../utils/leadAnalytics";

const CLARA_HIGH_RES =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90";
const ALEX_HIGH_RES =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&crop=faces,top&q=90";

const normalizeLead = (lead) => {
  if (!lead) return lead;
  const isDuplicateElena =
    lead.name === "Elena Rostova" || lead.email === "elena@solaracloud.de";
  const name = isDuplicateElena ? "Clara Weber" : lead.name;
  const email = isDuplicateElena ? "clara@solaracloud.de" : lead.email;

  let avatarUrl = lead.avatarUrl || CLARA_HIGH_RES;
  if (isDuplicateElena || avatarUrl.includes("elena_rostova_crop")) {
    avatarUrl = CLARA_HIGH_RES;
  } else if (avatarUrl.includes("alex_carter_crop")) {
    avatarUrl = ALEX_HIGH_RES;
  } else if (avatarUrl.includes("images.unsplash.com")) {
    avatarUrl = avatarUrl.replace(/w=\d+/, "w=400").replace(/q=\d+/, "q=90");
  }

  return { ...lead, name, email, avatarUrl };
};

export const OutreachView = ({
  leads,
  onDispatchBlast,
  preselectedLeadIds = [],
}) => {
  const cleanLeads = leads.map(normalizeLead);

  const [activeTab, setActiveTab] = useState("whatsapp");
  const [selectedLeadIndex, setSelectedLeadIndex] = useState(0);
  const [checkedLeadIds, setCheckedLeadIds] = useState(
    preselectedLeadIds.length > 0
      ? preselectedLeadIds
      : ["lead_001", "lead_007", "lead_008", "lead_003"]
  );
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const [templateText, setTemplateText] = useState(
    "Hi {{first_name}}, saw {{company}}'s recent showcase.\n\nRan a quick performance check and noticed a few mobile drop-offs in high-intent regions. Put together a 2-minute overview detailing quick adjustments.\n\nWorth a look?"
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [sendTime, setSendTime] = useState("Send now");
  const [intervalSetting, setIntervalSetting] = useState("30\u201360 seconds");
  const [agreementChecked, setAgreementChecked] = useState(true);
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchSuccessToast, setDispatchSuccessToast] = useState(null);

  const activeLead = cleanLeads[selectedLeadIndex] || cleanLeads[0];

  const handleToggleLeadCheck = (id) => {
    if (checkedLeadIds.includes(id)) {
      setCheckedLeadIds(checkedLeadIds.filter((item) => item !== id));
    } else {
      setCheckedLeadIds([...checkedLeadIds, id]);
    }
  };

  const handleConfirmAndBlast = async () => {
    if (!agreementChecked) return;
    setIsDispatching(true);
    try {
      await onDispatchBlast({
        leadIds: checkedLeadIds,
        messageTemplate: templateText,
      });
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
      setDispatchSuccessToast(
        `Dispatched ${checkedLeadIds.length} WhatsApp pitches in real-time!`
      );
      setTimeout(() => setDispatchSuccessToast(null), 4e3);
      setIsReviewModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Toast alert */}
      {dispatchSuccessToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 p-4 rounded-2xl bg-[#141518] text-white shadow-2xl border border-amber-400 flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-bold">{dispatchSuccessToast}</span>
        </div>
      )}

      {/* Header & Breadcrumbs */}
      <div>
        <p className="text-[11px] font-bold tracking-wider uppercase text-[#8C8477]">
          Outreach Engine &gt; Direct Dispatch
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141518]">
            Multi-Channel Outreach & WhatsApp Pitch
          </h1>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Live Pipeline
            </span>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#18191E] text-white hover:bg-black font-semibold text-xs transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Batch Blast</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "whatsapp", label: "Pitch on WhatsApp", count: "1,240" },
          { id: "status-board", label: "Status Board", count: "48" },
          { id: "email-queue", label: "Email Queue", count: "310" },
          { id: "sequences", label: "Automated Sequences", count: "12" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#18191E] text-white shadow-xs"
                : "bg-white hover:bg-[#F7F4EE] text-[#5C564A] border border-[#EDE8DF]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-[#EAE4D7] text-[#5C564A]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Metrics Strip */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE8DF] shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
            Delivered
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#18191E]">
            856
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
            Replied
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#18191E]">
            32
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
            Open Rate
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#18191E]">
            94%
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
            Queue
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#18191E]">
            384
          </p>
        </div>
      </div>

      {/* Main 2-Column Split: Target Lead Queue & Message Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Target Lead Queue (Span 6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EDE8DF] shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#18191E]">
                  Target Lead Queue
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#6E6759] border border-[#EDE8DF]">
                  {checkedLeadIds.length} Selected
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#18191E] border border-[#E4DDD1]">
                  WhatsApp Only
                </span>
                <span className="px-2 py-1 text-[#8C8477]">All (4,820)</span>
                <span className="px-2 py-1 text-[#8C8477]">Pitched</span>
              </div>
            </div>

            {/* Filter & Sort Controls */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-4">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9387]" />
                <input
                  type="text"
                  placeholder="Filter by company, tag or phone..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#FAF7F2] text-xs text-[#18191E] placeholder-[#9A9387] border border-transparent focus:outline-none focus:border-amber-400"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] text-xs font-semibold text-[#524C41] border border-[#EDE8DF] hover:bg-stone-100 transition-colors shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort: Priority</span>
              </button>
            </div>

            {/* Lead Queue Cards */}
            <div className="space-y-2.5">
              {cleanLeads.slice(0, 5).map((lead, index) => {
                const isChecked = checkedLeadIds.includes(lead.id);
                const isCurrent = selectedLeadIndex === index;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadIndex(index)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isCurrent
                        ? "bg-[#FAF7F2] border-[#D8CEBD] shadow-xs"
                        : "bg-white border-[#EDE8DF] hover:bg-[#FDFBF7]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleLeadCheck(lead.id);
                        }}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer shrink-0"
                      />
                      {/* Clean Single Circular Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E0D8CB] shrink-0 bg-stone-200">
                        <img
                          src={lead.avatarUrl}
                          alt={lead.name}
                          className="w-full h-full object-cover object-top block"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-[#18191E] truncate">
                          {lead.name}
                        </p>
                        <p className="text-[11px] text-[#7A746B] truncate">
                          {lead.company}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {lead.pipelineStage === "Ready to Pitch" ? (
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#423C32] border border-[#DDD6C8]">
                          Ready
                        </span>
                      ) : lead.pipelineStage === "In Sequence" ? (
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                          In Queue
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Delivered
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Batch Pitch Bar */}
          <div className="p-4 rounded-2xl bg-[#141518] text-white flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="text-xs font-semibold">
                {checkedLeadIds.length} Leads Checked for Batch Pitch
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCheckedLeadIds([])}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Skip Selected
              </button>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F5A623] hover:bg-[#E09816] text-[#121316] text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Blast {checkedLeadIds.length} via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Message Preview (Span 6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EDE8DF] shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0EBE1] mb-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#18191E]">
                  Message Preview
                </span>
                <span className="text-[10px] text-[#8C8477] bg-[#FAF7F2] px-2 py-0.5 rounded-md font-mono">
                  v1
                </span>
              </div>
              <p className="text-xs text-[#7A746B]">
                To:{" "}
                <span className="font-bold text-[#18191E]">
                  {activeLead?.name} ({activeLead?.company})
                </span>
              </p>
            </div>

            {/* Simulated WhatsApp Message Bubble */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB] mb-4 relative">
              {isEditingTemplate ? (
                <textarea
                  value={templateText}
                  onChange={(e) => setTemplateText(e.target.value)}
                  rows={6}
                  className="w-full p-3 bg-white rounded-xl border border-amber-300 text-xs text-[#18191E] focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              ) : (
                <p className="text-xs text-[#2A261F] whitespace-pre-line leading-relaxed font-normal">
                  {renderOutreachTemplate(templateText, {
                    name: activeLead?.name,
                    company: activeLead?.company,
                    industry: activeLead?.industry,
                    role: activeLead?.role,
                  })}
                </p>
              )}
            </div>

            {/* Variable Tags & Edit toggle */}
            <div className="flex items-center justify-between text-xs py-2 mb-4">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] uppercase font-bold text-[#8C8477]">
                  Variables:
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#5C5549] border border-[#E6E0D4] font-mono text-[11px]">
                  {`{{first_name}}`}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#5C5549] border border-[#E6E0D4] font-mono text-[11px]">
                  {`{{company}}`}
                </span>
              </div>

              <button
                onClick={() => setIsEditingTemplate(!isEditingTemplate)}
                className="flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-900 cursor-pointer shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingTemplate ? "Save Template" : "Edit"}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F0EBE1]">
              <button
                onClick={() => {
                  if (selectedLeadIndex < cleanLeads.length - 1) {
                    setSelectedLeadIndex(selectedLeadIndex + 1);
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#666055] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                Skip
              </button>
              <button
                onClick={handleConfirmAndBlast}
                disabled={isDispatching}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Outreach</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 of 3 Batch Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F0EBE1]">
              <div>
                <p className="text-[10px] font-bold tracking-wider uppercase text-[#8C8477]">
                  Outreach Engine &gt; Direct Dispatch &gt; Batch Review
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#141518]">
                    Review & confirm
                  </h2>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#696152] border border-[#E6E0D4]">
                    Step 2 of 3
                  </span>
                </div>
                <p className="text-xs text-[#7A746B] mt-0.5">
                  Review your recipients, personalized pitch and send settings
                  before you blast.
                </p>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] text-xs font-semibold text-[#524D44] hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back to lead queue</span>
              </button>
            </div>

            {/* 4 Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB] text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                  Recipients
                </span>
                <p className="font-extrabold text-sm text-[#18191E]">
                  {checkedLeadIds.length} selected leads
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                  Channel
                </span>
                <p className="font-extrabold text-sm text-emerald-700">
                  WhatsApp
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                  Personalization
                </span>
                <p className="font-extrabold text-sm text-[#18191E]">
                  First name + company
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                  Dispatch
                </span>
                <p className="font-extrabold text-sm text-[#18191E]">
                  After confirmation
                </p>
              </div>
            </div>

            {/* Split: Recipients List + Preview & Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recipients list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#18191E]">
                    Review recipients
                  </h4>
                  <span className="text-xs text-[#8C8477]">
                    {checkedLeadIds.length} Selected
                  </span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {cleanLeads
                    .filter((l) => checkedLeadIds.includes(l.id))
                    .map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB] flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-stone-200">
                            <img
                              src={lead.avatarUrl}
                              alt={lead.name}
                              className="w-full h-full object-cover object-top block"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#18191E] truncate">
                              {lead.name}
                            </p>
                            <p className="text-[11px] text-[#7A746B] truncate">
                              {lead.company}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full shrink-0">
                          Personalized
                        </span>
                      </div>
                    ))}
                </div>

                {/* Send Settings */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB] space-y-3">
                  <h4 className="text-xs font-bold text-[#18191E]">
                    Send settings
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C8477]">
                        Send Time
                      </label>
                      <select
                        value={sendTime}
                        onChange={(e) => setSendTime(e.target.value)}
                        className="w-full mt-1 p-2 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#18191E]"
                      >
                        <option value="Send now">Send now</option>
                        <option value="Schedule for 9 AM">
                          Schedule for 9 AM
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C8477]">
                        Message Interval
                      </label>
                      <select
                        value={intervalSetting}
                        onChange={(e) => setIntervalSetting(e.target.value)}
                        className="w-full mt-1 p-2 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#18191E]"
                      >
                        <option value="30–60 seconds">
                          30–60 seconds (Safe)
                        </option>
                        <option value="Instant">Instant blast</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#7A746B] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Skip previously pitched leads • Duplicate anti-spam
                    protection on
                  </p>
                </div>
              </div>

              {/* Message Preview */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#18191E]">
                  Message Preview
                </h4>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB] text-xs whitespace-pre-line text-[#2C2822] leading-relaxed">
                  {renderOutreachTemplate(templateText, {
                    name: activeLead?.name || "Marcus Thorne",
                    company: activeLead?.company || "Aura Architect Studio",
                  })}
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#EDE8DF] text-[11px] space-y-1 text-[#666055]">
                  <div className="flex justify-between">
                    <span>{`{{first_name}}`}</span>
                    <span className="font-bold text-[#18191E]">
                      {activeLead?.name.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{`{{company}}`}</span>
                    <span className="font-bold text-[#18191E]">
                      {activeLead?.company}
                    </span>
                  </div>
                  <div className="text-emerald-700 font-semibold pt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Personalization filled for all {checkedLeadIds.length}{" "}
                    recipients
                  </div>
                </div>

                {/* Agreement checkbox */}
                <label className="flex items-start gap-2.5 text-xs text-[#524D44] cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={agreementChecked}
                    onChange={(e) => setAgreementChecked(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 mt-0.5 cursor-pointer"
                  />
                  <span>
                    I've reviewed this batch and confirm these recipients have
                    agreed to receive WhatsApp outreach.
                  </span>
                </label>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 rounded-2xl bg-[#141518] text-white flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold">
                  {checkedLeadIds.length} personal messages. One batch.
                </p>
                <p className="text-[10px] text-white/60">
                  Nothing has been sent. Confirm to start dispatching
                  individually.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAndBlast}
                  disabled={!agreementChecked || isDispatching}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-extrabold text-xs transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isDispatching
                      ? "Dispatching..."
                      : `Confirm & blast ${checkedLeadIds.length} via WhatsApp`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
