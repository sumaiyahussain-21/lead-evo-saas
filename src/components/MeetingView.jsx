import { useState, useEffect, useMemo } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Smile,
  ScreenShare,
  Hand,
  MoreVertical,
  PhoneOff,
  Calendar,
  Clock,
  Send,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Settings,
  Plus,
  PlusCircle,
  ExternalLink,
  Copy,
  Layers,
  LayoutGrid,
  Users,
  Bookmark,
  Radar,
  MessageSquare,
  Palette,
  Globe,
  TrendingUp,
  Bot,
  Bell,
  Grid,
  Maximize2,
  Sparkles,
  Link,
  ShieldCheck,
} from "lucide-react";

const ELENA_HIGH_RES_AVATAR =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90";

const ALEX_HIGH_RES_SPOTLIGHT =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=800&fit=crop&crop=faces,top&q=90";

const getHighResLeadImage = (lead) => {
  if (!lead) return "/assets/rebecca_zoom_exact.png";
  if (
    lead.name === "Alex Carter" ||
    lead.avatarUrl?.includes("alex_carter_crop")
  ) {
    return ALEX_HIGH_RES_SPOTLIGHT;
  }
  if (lead.avatarUrl?.includes("elena_rostova_crop")) {
    return "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop&crop=faces,top&q=90";
  }
  if (lead.avatarUrl?.includes("images.unsplash.com")) {
    return lead.avatarUrl
      .replace(/w=\d+/, "w=1200")
      .replace(/q=\d+/, "q=90")
      .concat("&h=800&crop=faces,top");
  }
  return lead.avatarUrl || ALEX_HIGH_RES_SPOTLIGHT;
};

const BASE_PARTICIPANTS = [
  {
    id: "p_rebecca",
    name: "Rebecca",
    role: "Head of Product Design",
    image: "/assets/rebecca_zoom_exact.png",
    gridImage: "/assets/participant_rebecca.png",
    isSpeaking: true,
  },
  {
    id: "p_joanna",
    name: "Joanna phillips",
    role: "VP Marketing",
    image: "/assets/participant_joanna.png",
    gridImage: "/assets/participant_joanna.png",
  },
  {
    id: "p_steve",
    name: "Steve wesley",
    role: "Managing Director",
    image: "/assets/participant_steve.png",
    gridImage: "/assets/participant_steve.png",
  },
  {
    id: "p_amanda",
    name: "Amanda Jones",
    role: "Lead UX Architect",
    image: "/assets/participant_amanda.png",
    gridImage: "/assets/participant_amanda.png",
  },
  {
    id: "p_austin",
    name: "Austin Black",
    role: "Revenue Operations",
    image: "/assets/participant_austin.png",
    gridImage: "/assets/participant_austin.png",
  },
  {
    id: "p_george",
    name: "George Geller",
    role: "Enterprise Partner",
    image: "/assets/participant_george.png",
    gridImage: "/assets/participant_george.png",
  },
];

const EMOJI_REACTIONS = [
  "\u{1F44F}",
  "\u2764\uFE0F",
  "\u{1F44D}",
  "\u{1F525}",
  "\u{1F389}",
  "\u{1F602}",
  "\u{1F680}",
  "\u{1F4A1}",
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "all-leads", label: "All Leads", icon: Users },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "collect-leads", label: "Collect Leads", icon: Radar },
  { id: "outreach", label: "Outreach", icon: Send },
  { id: "whatsapp-check", label: "WhatsApp Check", icon: MessageSquare },
  { id: "brand-creator", label: "Branding Creator", icon: Palette },
  { id: "website-creator", label: "Website Creator", icon: Globe },
  { id: "seo-audit", label: "SEO Audit", icon: TrendingUp },
  { id: "ai-receptionist", label: "AI Receptionist", icon: Bot },
  { id: "meeting", label: "Meeting", icon: Calendar },
];

export const MeetingView = ({
  leads,
  user,
  onBookMeeting,
  onSelectTab,
  preselectedLead,
  onOpenProfileSettings,
}) => {
  const participantsList = useMemo(() => {
    if (!preselectedLead) return BASE_PARTICIPANTS;
    const highResImg = getHighResLeadImage(preselectedLead);
    const leadParticipant = {
      id: preselectedLead.id || "p_selected_lead",
      name: preselectedLead.name,
      role: preselectedLead.role || preselectedLead.company || "VIP Prospect",
      image: highResImg,
      gridImage: highResImg,
      isSpeaking: true,
    };
    return [leadParticipant, ...BASE_PARTICIPANTS.slice(1)];
  }, [preselectedLead]);

  const [zoomedParticipant, setZoomedParticipant] = useState(
    participantsList[0]
  );
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCaptionsOn, setIsCaptionsOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "You",
      time: "12:32 PM",
      text: "Please share your screen john",
      isMe: true,
    },
    {
      sender: "Amanda",
      time: "12:42 PM",
      text: "We'll be resolving all the comments for today",
      isMe: false,
      initial: "A",
      color: "bg-[#D97706]",
    },
    {
      sender: "Rebecca",
      time: "12:42 PM",
      link: "www.iconscout.com/icons/mic?styles//=line",
      text: "Let's try this icon",
      isMe: false,
      initial: "R",
      color: "bg-[#2563EB]",
    },
    {
      sender: "You",
      time: "2:32 PM",
      text: "Designed by @ux_Bhavya",
      isMe: true,
    },
  ]);
  const [newChatText, setNewChatText] = useState("");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(
    preselectedLead?.id || leads[0]?.id || "lead_001"
  );
  const [selectedPresetTime, setSelectedPresetTime] = useState("custom");
  const [customHour, setCustomHour] = useState("10");
  const [customMinute, setCustomMinute] = useState(":15");
  const [customPeriod, setCustomPeriod] = useState("AM");
  const [customDuration, setCustomDuration] = useState("45m");

  useEffect(() => {
    setZoomedParticipant(participantsList[0]);
    if (preselectedLead?.id) {
      setSelectedLeadId(preselectedLead.id);
    }
  }, [participantsList, preselectedLead]);

  const showToast = (message) => {
    setToastNotification(message);
    setTimeout(() => setToastNotification(null), 2500);
  };

  const handleSendReaction = (emoji) => {
    const newReaction = {
      id: Date.now() + Math.random(),
      emoji,
      left: Math.floor(Math.random() * 60) + 20,
    };
    setFloatingReactions((prev) => [...prev, newReaction]);
    setShowEmojiPicker(false);
    showToast(`Sent ${emoji} reaction`);
    setTimeout(() => {
      setFloatingReactions((prev) =>
        prev.filter((r) => r.id !== newReaction.id)
      );
    }, 2200);
  };

  const handleSendChatMessage = () => {
    if (!newChatText.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "You",
        time: /* @__PURE__ */ new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: newChatText,
        isMe: true,
      },
    ]);
    setNewChatText("");
  };

  const handleConfirmBooking = async () => {
    const lead = leads.find((l) => l.id === selectedLeadId) || leads[0];
    const timeFormatted =
      selectedPresetTime === "custom"
        ? `${customHour}${customMinute} ${customPeriod}`
        : selectedPresetTime;
    await onBookMeeting({
      leadId: lead.id,
      leadName: lead.name,
      leadCompany: lead.company,
      leadAvatar: getHighResLeadImage(lead),
      time: timeFormatted,
      duration: customDuration,
      date: "2024-09-24",
      timezone: "EST Timezone",
      meetingType: "Discovery Sync",
    });
    setIsBookModalOpen(false);
    showToast(`Meeting scheduled with ${lead.name} (${timeFormatted})!`);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText("https://meet.google.com/evo-lead-sync");
    showToast("Meeting invite link copied to clipboard!");
  };

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-[#FAF7F2] text-[#141518] antialiased p-3 sm:p-4 lg:p-5 flex flex-col justify-between">
      {/* ========================================================================= */}
      {/* 1. TOP FLOATING NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="w-full max-w-[1480px] mx-auto flex items-center justify-between gap-2 sm:gap-4 mb-2 shrink-0">
        {/* Left: Lead Evo Logo */}
        <div
          onClick={() => onSelectTab("dashboard")}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-full bg-[#141518] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-lg sm:text-xl text-[#141518] tracking-tight whitespace-nowrap">
            Lead Evo
          </span>
        </div>

        {/* Center: Floating Dark Browser Capsule */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18191E] text-white shadow-xl border border-white/5">
          <button
            onClick={() => showToast("Tabs Overview")}
            title="Tab View"
            className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => showToast("Previous Page")}
            title="Back"
            className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => showToast("Forward")}
            title="Forward"
            className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Active URL Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2B33] text-xs font-mono text-gray-200 shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="select-all">meet.google.com</span>
            <RotateCw
              onClick={() => showToast("Reconnected to Google Meet HD Bus")}
              className="w-3 h-3 text-white/40 ml-1.5 cursor-pointer hover:text-white transition-colors"
            />
          </div>

          <button
            onClick={() => showToast("Meeting Security: End-to-End Encrypted")}
            title="Settings"
            className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsBookModalOpen(true)}
            title="New Meeting"
            className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleShareLink}
            title="Open in new window"
            className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Book Manual Meeting Button + Bell + Profile */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          <button
            onClick={() => setIsBookModalOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F8CE64] hover:bg-[#F2C550] text-[#141518] font-extrabold text-xs shadow-md transition-all cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.4] shrink-0" />
            <span className="hidden sm:inline">Book Manual Meeting</span>
            <span className="sm:hidden">Book</span>
          </button>

          <button
            onClick={() => showToast("No pending meeting notifications")}
            aria-label="Notifications"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-xs border border-stone-200/80 flex items-center justify-center text-stone-700 hover:text-black transition-colors cursor-pointer shrink-0"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#F5A623]" />
          </button>

          <button
            onClick={onOpenProfileSettings}
            aria-label="User Profile & Settings"
            className="flex items-center gap-2.5 hover:opacity-85 transition-opacity cursor-pointer text-left shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-amber-400 ring-offset-1 ring-offset-[#FAF7F2] bg-stone-200">
                <img
                  src={ELENA_HIGH_RES_AVATAR}
                  alt={user?.name || "Elena Rostova"}
                  className="w-full h-full object-cover object-top block"
                />
              </div>
              <span
                title="Active"
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#FAF7F2]"
              />
            </div>
            <div className="text-left leading-tight hidden lg:block">
              <p className="font-bold text-xs text-[#141518]">
                {user?.name || "Elena Rostova"}
              </p>
              <p className="text-[10px] text-[#7A746B] font-medium">
                {user?.role || "Revenue Director"}
              </p>
            </div>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN ROW: FLOATING DOCK + YELLOW VIDEO CARD + IN-CALL MESSAGES PANEL */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1480px] mx-auto flex flex-col lg:flex-row items-stretch gap-4 sm:gap-6 flex-1 min-h-0">
        {/* Left: Sleek Floating Vertical Dock */}
        <aside
          aria-label="Pipeline Quick Dock"
          className="hidden sm:flex bg-[#141518] rounded-[26px] p-2 py-3 flex-col items-center justify-between shadow-2xl shrink-0 border border-white/5 h-full"
        >
          <div className="flex flex-col items-center gap-2">
            {NAV_ITEMS.slice(0, 10).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={item.label}
                  aria-label={item.label}
                  className="relative w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer text-stone-400 hover:text-white hover:bg-white/10"
                >
                  <Icon className="w-3.5 h-3.5 stroke-[1.8]" />
                </button>
              );
            })}
          </div>

          {/* 11th Active Meeting Icon with glowing yellow container */}
          <button
            onClick={() => onSelectTab("meeting")}
            title="Meeting"
            aria-label="Meeting"
            className="relative w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer bg-gradient-to-b from-[#FAD97A] to-[#F5A623] text-[#141518] shadow-lg shadow-amber-500/30 font-bold scale-105"
          >
            <Calendar className="w-4 h-4 stroke-[2.5]" />
          </button>
        </aside>

        {/* Center: Large Yellow Card Frame */}
        <div className="flex-1 min-h-[420px] lg:min-h-0 relative rounded-[28px] sm:rounded-[32px] bg-[#F8CE64] p-3 sm:p-4 lg:p-5 shadow-xl border border-[#ECD9A0] flex flex-col justify-between h-full overflow-hidden">
          {/* Header row when in Grid View */}
          {!zoomedParticipant && !isCallEnded && !isScreenSharing && (
            <div className="flex items-center justify-between pb-2 px-2 shrink-0">
              <h2 className="font-extrabold text-xs sm:text-sm text-[#141518] tracking-tight">
                12:00 PM <span className="font-normal mx-1">|</span>{" "}
                {preselectedLead
                  ? `${preselectedLead.name} — Discovery Sync`
                  : "Prod Design-Weekly sync"}
              </h2>
              <button
                onClick={handleShareLink}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FDEBB5] hover:bg-[#FCE39E] text-xs font-bold text-[#141518] shadow-xs transition-all cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <Link className="w-3.5 h-3.5 stroke-[2.3]" />
                <span>Share link</span>
              </button>
            </div>
          )}

          {/* Main Video View Container */}
          <div className="relative w-full flex-1 min-h-[300px] lg:min-h-0 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-2xl bg-stone-900 border-2 border-white/20 flex items-center justify-center">
            {isCallEnded ? (
              <div className="text-center p-6 text-white space-y-3">
                <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-2xl">
                  <PhoneOff className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold">You Left the Meeting</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  Call duration (42m) and AI lead sentiment summary recorded to
                  Lead Evo pipeline.
                </p>
                <button
                  onClick={() => {
                    setIsCallEnded(false);
                    showToast("Rejoined Google Meet session");
                  }}
                  className="px-5 py-2 rounded-full bg-[#F8CE64] hover:bg-[#F2C550] text-[#141518] font-bold text-xs shadow-md cursor-pointer transition-all active:scale-95"
                >
                  Rejoin Call
                </button>
              </div>
            ) : isScreenSharing ? (
              <div className="w-full h-full bg-[#18191E] text-white p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      Elena Rostova is sharing screen: Lead Evo High-Conversion
                      Architecture.pdf
                    </span>
                  </div>
                  <button
                    onClick={() => setIsScreenSharing(false)}
                    className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
                  >
                    Stop Sharing
                  </button>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-4">
                  <div className="w-full max-w-md p-5 rounded-2xl bg-black/60 border border-white/10 shadow-2xl text-center space-y-2">
                    <Sparkles className="w-6 h-6 text-amber-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">
                      Live Screen Broadcast Active
                    </h4>
                    <p className="text-xs text-gray-300">
                      Presenting multi-channel WhatsApp conversion metrics and
                      automated booking funnels to all 6 participants.
                    </p>
                  </div>
                </div>
              </div>
            ) : zoomedParticipant ? (
              /* SPOTLIGHT VIEW: Shows clicked/preselected lead dynamically */
              <div className="relative w-full h-full group select-none">
                {isVideoOn ? (
                  <img
                    src={zoomedParticipant.image}
                    alt={zoomedParticipant.name}
                    className="absolute inset-0 w-full h-full object-cover object-top rounded-[24px]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-white rounded-[24px]">
                    <div className="w-20 h-20 rounded-full bg-amber-400 text-black font-extrabold text-2xl flex items-center justify-center shadow-xl mb-2">
                      {zoomedParticipant.name.substring(0, 2).toUpperCase()}
                    </div>
                    <p className="font-bold text-sm">
                      {zoomedParticipant.name}
                    </p>
                    <span className="text-xs text-gray-400">
                      Camera turned off
                    </span>
                  </div>
                )}

                {/* Subtle bottom gradient for readable name */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

                {/* Top-Right Toggle to return to 6-Person Grid */}
                <button
                  onClick={() => {
                    setZoomedParticipant(null);
                    showToast("Switched to 6-Person Grid View");
                  }}
                  title="Switch to 6-Person Grid View"
                  className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
                >
                  <Grid className="w-3.5 h-3.5 text-amber-400" />
                  <span>Grid View (6)</span>
                </button>

                {/* Hand Raised Banner */}
                {isHandRaised && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-amber-400 text-[#141518] font-bold text-xs flex items-center gap-1.5 shadow-lg animate-bounce">
                    <span>✋</span>
                    <span>Hand Raised</span>
                  </div>
                )}

                {/* Bottom Overlay inside Photo: Sync Label & Participant Name */}
                {zoomedParticipant.id !== "p_rebecca" && (
                  <div className="absolute bottom-5 sm:bottom-6 left-5 right-5 pointer-events-none flex items-end justify-between gap-3 z-10 text-white">
                    <span className="font-medium text-xs sm:text-sm drop-shadow-md text-white/90">
                      12:00 PM <span className="mx-1 text-white/60">|</span>{" "}
                      {zoomedParticipant.role || "Discovery Sync"}
                    </span>
                    <span className="font-semibold text-xl sm:text-2xl lg:text-3xl tracking-wide drop-shadow-md text-white">
                      {zoomedParticipant.name}
                    </span>
                  </div>
                )}

                {/* Live CC Subtitles Banner */}
                {isCaptionsOn && (
                  <div className="absolute bottom-20 left-6 right-6 z-10 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs shadow-2xl animate-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black font-extrabold text-[10px]">
                        CC Live
                      </span>
                      <span className="font-bold text-amber-300">
                        {zoomedParticipant.name}:
                      </span>
                      <span className="text-gray-200">
                        "We're resolving all comments for today. Let's make sure
                        the WhatsApp interactive buttons are active."
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* 6-PERSON GRID VIEW */
              <div className="w-full h-full p-2 sm:p-2.5 grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 gap-2 sm:gap-2.5 bg-transparent">
                {participantsList.map((person) => (
                  <div
                    key={person.id}
                    onClick={() => {
                      setZoomedParticipant(person);
                      showToast(`Zoomed into ${person.name}`);
                    }}
                    title={`Click to zoom into ${person.name}`}
                    className="relative rounded-[16px] sm:rounded-2xl overflow-hidden bg-stone-900 border-2 border-white/50 shadow-md group cursor-pointer hover:border-amber-400 hover:ring-2 hover:ring-amber-400/50 hover:scale-[1.02] transition-all flex flex-col justify-end"
                  >
                    <img
                      src={person.gridImage}
                      alt={person.name}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="relative z-10 px-2.5 py-1.5 bg-gradient-to-t from-black/75 to-transparent text-white text-[11px] font-semibold truncate">
                      {person.name}
                    </div>
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-amber-400 text-black font-extrabold text-xs shadow-lg flex items-center gap-1.5 scale-95 group-hover:scale-100 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5" />
                        Click to Zoom
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Floating Animated Emojis */}
            {floatingReactions.map((r) => (
              <div
                key={r.id}
                style={{ left: `${r.left}%` }}
                className="absolute bottom-16 text-3xl pointer-events-none animate-in fade-in slide-in-from-bottom duration-1000 z-30"
              >
                {r.emoji}
              </div>
            ))}
          </div>

          {/* BOTTOM ROW: FLOATING DOCK + SHARE LINK */}
          <div className="relative pt-2 flex flex-wrap items-center justify-between gap-2 z-20 shrink-0">
            {/* Left: View Mode Toggle Button */}
            <div className="sm:w-32">
              <button
                onClick={() => {
                  setZoomedParticipant(
                    zoomedParticipant ? null : participantsList[0]
                  );
                  showToast(
                    zoomedParticipant
                      ? "Switched to 6-Person Grid"
                      : `Zoomed in on ${participantsList[0].name}`
                  );
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-900 text-xs font-bold shadow-xs cursor-pointer transition-all active:scale-95"
              >
                <Grid className="w-3.5 h-3.5 text-stone-700" />
                <span>{zoomedParticipant ? "Grid View" : "Spotlight"}</span>
              </button>
            </div>

            {/* Center: Floating Control Dock */}
            <div className="bg-[#141518]/85 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2.5 border border-white/10 shadow-2xl">
              {/* 1. Mic */}
              <button
                onClick={() => {
                  setIsMicOn(!isMicOn);
                  showToast(
                    isMicOn ? "Microphone Muted" : "Microphone Unmuted"
                  );
                }}
                title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
                aria-label="Toggle Microphone"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isMicOn
                    ? "bg-white/20 hover:bg-white/30 text-white"
                    : "bg-rose-600 text-white shadow-md"
                }`}
              >
                {isMicOn ? (
                  <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <MicOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>

              {/* 2. Video Camera */}
              <button
                onClick={() => {
                  setIsVideoOn(!isVideoOn);
                  showToast(
                    isVideoOn ? "Camera Turned Off" : "Camera Turned On"
                  );
                }}
                title={isVideoOn ? "Turn Off Camera" : "Turn On Camera"}
                aria-label="Toggle Camera"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isVideoOn
                    ? "bg-white/20 hover:bg-white/30 text-white"
                    : "bg-rose-600 text-white shadow-md"
                }`}
              >
                {isVideoOn ? (
                  <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <VideoOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>

              {/* 3. CC */}
              <button
                onClick={() => {
                  setIsCaptionsOn(!isCaptionsOn);
                  showToast(
                    isCaptionsOn ? "Captions Turned Off" : "Captions Turned On"
                  );
                }}
                title="Closed Captions (CC)"
                aria-label="Toggle Captions"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold font-mono text-[11px] sm:text-xs transition-all cursor-pointer ${
                  isCaptionsOn
                    ? "bg-amber-400 text-black shadow-md font-extrabold"
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                CC
              </button>

              {/* 4. Emoji Reactions */}
              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  title="Send Reaction"
                  aria-label="Send Reaction"
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    showEmojiPicker
                      ? "bg-amber-400 text-black"
                      : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                >
                  <Smile className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#1A1B20] border border-white/10 rounded-2xl p-2 shadow-2xl flex items-center gap-1.5 z-50 animate-in fade-in slide-in-from-bottom-2">
                    {EMOJI_REACTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleSendReaction(emoji)}
                        className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center text-lg transition-transform hover:scale-125 cursor-pointer"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Screen Share */}
              <button
                onClick={() => {
                  setIsScreenSharing(!isScreenSharing);
                  showToast(
                    isScreenSharing
                      ? "Stopped Screen Share"
                      : "Starting Screen Share..."
                  );
                }}
                title={isScreenSharing ? "Stop Screen Share" : "Share Screen"}
                aria-label="Share Screen"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isScreenSharing
                    ? "bg-emerald-500 text-white shadow-md"
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                <ScreenShare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* 6. Hand Raise */}
              <button
                onClick={() => {
                  setIsHandRaised(!isHandRaised);
                  showToast(
                    !isHandRaised ? "Hand Raised \u270B" : "Hand Lowered"
                  );
                }}
                title={isHandRaised ? "Lower Hand" : "Raise Hand"}
                aria-label="Raise Hand"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isHandRaised
                    ? "bg-amber-400 text-black shadow-md"
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                <Hand className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* 7. More Options */}
              <div className="relative">
                <button
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  title="More Options"
                  aria-label="More Options"
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    moreMenuOpen
                      ? "bg-white text-black"
                      : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                >
                  <MoreVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {moreMenuOpen && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56 bg-[#1A1B20] border border-white/10 rounded-2xl p-2 shadow-2xl text-xs text-white z-50 space-y-1">
                    <button
                      onClick={() => {
                        setZoomedParticipant(
                          zoomedParticipant ? null : participantsList[0]
                        );
                        setMoreMenuOpen(false);
                        showToast(
                          zoomedParticipant
                            ? "Switched to 6-Person Grid View"
                            : `Zoomed in on ${participantsList[0].name}`
                        );
                      }}
                      className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-left flex items-center gap-2 cursor-pointer"
                    >
                      <Grid className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {zoomedParticipant
                          ? "Switch to Grid View (6)"
                          : "Zoom Active Speaker"}
                      </span>
                    </button>

                    <div className="border-t border-white/10 my-1" />

                    <div className="px-3 py-1 text-[10px] uppercase font-bold text-gray-400">
                      Switch Spotlight Person:
                    </div>
                    {participantsList.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setZoomedParticipant(p);
                          setMoreMenuOpen(false);
                          showToast(`Zoomed in on ${p.name}`);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg hover:bg-white/10 text-left flex items-center gap-2 cursor-pointer"
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="truncate">
                          {p.name} ({p.role})
                        </span>
                      </button>
                    ))}

                    <div className="border-t border-white/10 my-1" />

                    <button
                      onClick={() => {
                        handleShareLink();
                        setMoreMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl hover:bg-white/10 text-left flex items-center gap-2 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copy Meeting Link</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 8. End Call Red Pill Button */}
              <button
                onClick={() => {
                  setIsCallEnded(true);
                  showToast("Call ended");
                }}
                title="Leave Call"
                aria-label="Leave Call"
                className="w-10 sm:w-11 h-8 sm:h-9 rounded-full bg-[#EB5757] hover:bg-rose-700 text-white font-bold flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <PhoneOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Right: "Share link" pill button */}
            <div className="sm:w-32 flex justify-end">
              <button
                onClick={handleShareLink}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FDEBB5] hover:bg-[#FCE39E] text-xs font-bold text-[#141518] shadow-sm transition-all cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <Link className="w-3.5 h-3.5 stroke-[2.3]" />
                <span>Share link</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {toastNotification && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/90 text-white text-xs font-semibold shadow-xl border border-white/20 animate-in fade-in slide-in-from-top-1">
              {toastNotification}
            </div>
          )}
        </div>

        {/* Right: "In call messages" Dark Panel */}
        {chatOpen && (
          <div className="w-full lg:w-[360px] shrink-0 bg-[#141518] text-white rounded-[28px] p-5 shadow-2xl border border-white/10 flex flex-col lg:h-full max-h-[420px] lg:max-h-none animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <h3 className="font-semibold text-sm text-white">
                In call messages
              </h3>
              <button
                onClick={() => setChatOpen(false)}
                title="Close chat"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            {/* Messages list */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
              <div className="flex flex-col items-end">
                <span className="text-[11px] text-white/50 mb-1">You</span>
                <div className="p-3.5 rounded-2xl rounded-tr-xs bg-[#24262E] text-white max-w-[85%] leading-relaxed shadow-xs">
                  Please share your screen john
                </div>
                <span className="text-[10px] text-white/40 mt-1">12:32 PM</span>
              </div>

              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#D97706] text-white font-bold text-[10px] flex items-center justify-center">
                    A
                  </span>
                  <span className="text-[11px] font-semibold text-white/80">
                    Amanda
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-xs bg-[#202127] text-white/90 max-w-[85%] leading-relaxed border border-white/5 shadow-xs">
                  We'll be resolving all the comments for today
                </div>
                <span className="text-[10px] text-white/40 mt-1 pl-7">
                  12:42 PM
                </span>
              </div>

              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white font-bold text-[10px] flex items-center justify-center">
                    R
                  </span>
                  <span className="text-[11px] font-semibold text-white/80">
                    Rebecca
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-xs bg-[#202127] text-white/90 max-w-[85%] leading-relaxed border border-white/5 shadow-xs space-y-1">
                  <p className="text-blue-400 underline break-all font-mono text-[11px]">
                    www.iconscout.com/icons/mic?styles//=line
                  </p>
                  <p>Let's try this icon</p>
                </div>
                <span className="text-[10px] text-white/40 mt-1 pl-7">
                  12:42 PM
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[11px] text-white/50 mb-1">You</span>
                <div className="p-3.5 rounded-2xl rounded-tr-xs bg-[#24262E] text-white max-w-[85%] leading-relaxed shadow-xs">
                  Designed by @ux_Bhavya
                </div>
                <span className="text-[10px] text-white/40 mt-1">2:32 PM</span>
              </div>

              {chatMessages.slice(4).map((msg, i) => (
                <div key={i} className="flex flex-col items-end">
                  <span className="text-[11px] text-white/50 mb-1">
                    {msg.sender}
                  </span>
                  <div className="p-3.5 rounded-2xl rounded-tr-xs bg-[#24262E] text-white max-w-[85%] leading-relaxed shadow-xs">
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-white/40 mt-1">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Input */}
            <div className="pt-3 border-t border-white/10">
              <div className="bg-[#202127] rounded-full p-1 pl-4 flex items-center justify-between border border-white/5 focus-within:border-amber-400/50 transition-colors">
                <input
                  type="text"
                  value={newChatText}
                  onChange={(e) => setNewChatText(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSendChatMessage()
                  }
                  placeholder="Someone's at the door,brb"
                  className="flex-1 bg-transparent text-xs text-white placeholder-white/40 focus:outline-none"
                />
                <button
                  onClick={handleSendChatMessage}
                  aria-label="Send message"
                  className="w-8 h-8 rounded-full bg-[#2F80ED] hover:bg-blue-600 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. BOOK MANUAL MEETING MODAL */}
      {/* ========================================================================= */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#18191E]">
                    Book Manual Meeting
                  </h3>
                  <p className="text-xs text-[#7A746B]">
                    Schedule a custom demo or VIP client walkthrough
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBookModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Select Lead / Account */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                SELECT LEAD / ACCOUNT
              </label>
              <select
                value={selectedLeadId}
                onChange={(e) => setSelectedLeadId(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[#FAF7F2] border border-[#DDD6C8] text-xs font-semibold text-[#18191E] cursor-pointer"
              >
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    🏢 {l.company} — {l.name} ({l.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Select Meeting Time */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                  SELECT MEETING TIME
                </label>
                <span className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  EST Timezone
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {["09:30 AM", "11:00 AM", "02:00 PM", "04:30 PM"].map(
                  (slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedPresetTime(slot)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedPresetTime === slot
                          ? "bg-[#18191E] text-white shadow-xs"
                          : "bg-[#FAF7F2] text-[#423C32] hover:bg-[#F2ECE1] border border-[#E6E0D4]"
                      }`}
                    >
                      {slot}
                    </button>
                  )
                )}
                <button
                  onClick={() => setSelectedPresetTime("custom")}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPresetTime === "custom"
                      ? "bg-[#F5A623] text-[#121316] shadow-xs"
                      : "bg-[#FAF7F2] text-[#423C32] hover:bg-[#F2ECE1] border border-[#E6E0D4]"
                  }`}
                >
                  ⚡ Custom Time
                </button>
              </div>

              {/* Custom Time Picker */}
              {selectedPresetTime === "custom" && (
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#ECD9A0] space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#18191E]">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Custom Time Picker</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      15–min Intervals
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#8C8477] block mb-1">
                        Hour
                      </label>
                      <select
                        value={customHour}
                        onChange={(e) => setCustomHour(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C8] font-bold cursor-pointer"
                      >
                        {Array.from({ length: 12 }, (_, i) =>
                          String(i + 1).padStart(2, "0")
                        ).map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#8C8477] block mb-1">
                        Minute
                      </label>
                      <select
                        value={customMinute}
                        onChange={(e) => setCustomMinute(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C8] font-bold cursor-pointer"
                      >
                        {[":00", ":15", ":30", ":45"].map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#8C8477] block mb-1">
                        Period
                      </label>
                      <div className="flex rounded-xl bg-white border border-[#DDD6C8] p-1">
                        <button
                          type="button"
                          onClick={() => setCustomPeriod("AM")}
                          className={`flex-1 py-1 rounded-lg font-bold text-xs ${
                            customPeriod === "AM"
                              ? "bg-[#18191E] text-white"
                              : "text-stone-600"
                          }`}
                        >
                          AM
                        </button>
                        <button
                          type="button"
                          onClick={() => setCustomPeriod("PM")}
                          className={`flex-1 py-1 rounded-lg font-bold text-xs ${
                            customPeriod === "PM"
                              ? "bg-[#18191E] text-white"
                              : "text-stone-600"
                          }`}
                        >
                          PM
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#8C8477] block mb-1">
                        Duration
                      </label>
                      <select
                        value={customDuration}
                        onChange={(e) => setCustomDuration(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C8] font-bold cursor-pointer"
                      >
                        <option value="15m">15m</option>
                        <option value="30m">30m</option>
                        <option value="45m">45m</option>
                        <option value="60m">60m</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#7A746B] border-t border-[#EAE3D5]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold">Duration presets:</span>
                      {["15m", "30m", "45m", "60m"].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setCustomDuration(d)}
                          className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                            customDuration === d
                              ? "bg-[#18191E] text-white"
                              : "hover:bg-[#EAE4D7]"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                    <span className="font-bold text-[#18191E]">
                      ✓ {customHour}
                      {customMinute} {customPeriod} ({customDuration})
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="px-6 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-extrabold text-xs shadow-md cursor-pointer transition-all active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 stroke-[2.5]" />
                <span>Confirm & Dispatch Invites</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};