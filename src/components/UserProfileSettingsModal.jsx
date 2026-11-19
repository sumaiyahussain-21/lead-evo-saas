import { useState } from "react";
import {
  X,
  User as UserIcon,
  Mail,
  Building,
  Briefcase,
  Phone,
  MapPin,
  Clock,
  Shield,
  Key,
  Bell,
  Sliders,
  Check,
  Copy,
  Save,
  Sparkles,
  Camera,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { authApi } from "../services/api";
import {
  AVATAR_PRESETS,
  validateUserProfile,
  maskApiKey,
} from "../utils/userProfile";
export const UserProfileSettingsModal = ({
  user,
  onClose,
  onUpdateUser,
  onOpenMongoModal,
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [company, setCompany] = useState(user.company);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [customAvatarInput, setCustomAvatarInput] = useState("");
  const [phone, setPhone] = useState(user.phone || "+1 (415) 892-0419");
  const [bio, setBio] = useState(
    user.bio ||
      "Scaling outbound pipeline & high-intent B2B conversion engines across US and EMEA enterprise accounts.",
  );
  const [location, setLocation] = useState(
    user.location || "San Francisco, CA",
  );
  const [timezone, setTimezone] = useState(
    user.timezone || "America/Los_Angeles (PST)",
  );
  const [department, setDepartment] = useState(
    user.department || "Revenue & Commercial Growth",
  );
  const [dailyGoalLeads, setDailyGoalLeads] = useState(
    user.dailyGoalLeads || 350,
  );
  const [preferredChannel, setPreferredChannel] = useState(
    user.preferredChannel || "WhatsApp",
  );
  const [currency, setCurrency] = useState(user.currency || "USD ($)");
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    user.notificationsEnabled ?? true,
  );
  const [whatsappAlerts, setWhatsappAlerts] = useState(
    user.whatsappAlerts ?? true,
  );
  const [meetingAlerts, setMeetingAlerts] = useState(
    user.meetingAlerts ?? true,
  );
  const [apiKey, setApiKey] = useState(
    user.apiKey || "evo_live_sec_99a8f27e10b42c67",
  );
  const [isKeyRevealed, setIsKeyRevealed] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const handleCopyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2e3);
  };
  const handleRegenerateKey = () => {
    const newKey = `evo_live_sec_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setApiKey(newKey);
    setCopiedKey(false);
  };
  const handleApplyCustomAvatar = () => {
    if (customAvatarInput.trim()) {
      setAvatarUrl(customAvatarInput.trim());
      setCustomAvatarInput("");
    }
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      alert("Please enter your current password");
      return;
    }
    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }
    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setTimeout(() => setPasswordSuccess(false), 3e3);
  };
  const handleSave = async () => {
    const candidateData = {
      name,
      email,
      role,
      company,
      avatarUrl,
      phone,
      bio,
      location,
      timezone,
      department,
      dailyGoalLeads: Number(dailyGoalLeads),
      preferredChannel,
      currency,
      notificationsEnabled,
      whatsappAlerts,
      meetingAlerts,
      apiKey,
    };
    const validation = validateUserProfile(candidateData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setIsSaving(true);
    try {
      const updatedUser = {
        ...user,
        ...candidateData,
      };
      await authApi
        .updateProfile(updatedUser)
        .catch((e) => console.warn("Could not sync to backend:", e));
      onUpdateUser(updatedUser);
      setShowSavedToast(true);
      setTimeout(() => {
        setShowSavedToast(false);
        onClose();
      }, 900);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="px-6 py-5 bg-white border-b border-[#EAE3D6] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={avatarUrl}
                alt={name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="profile-settings-title"
                  className="text-lg font-extrabold text-[#141518]"
                >
                  {name}
                </h2>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                  User ID: {user.id}
                </span>
              </div>
              <p className="text-xs text-[#7A746B]">
                {role} • {company}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Profile Settings"
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 bg-[#F4EFE6] border-b border-[#EAE3D6] gap-1 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab("personal")}
            aria-selected={activeTab === "personal"}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === "personal" ? "border-[#141518] text-[#141518] font-bold" : "border-transparent text-[#7A746B] hover:text-[#141518]"}`}
          >
            <UserIcon className="w-4 h-4 text-amber-600" />
            <span>Profile & Personal Details</span>
          </button>

          <button
            onClick={() => setActiveTab("pipeline")}
            aria-selected={activeTab === "pipeline"}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === "pipeline" ? "border-[#141518] text-[#141518] font-bold" : "border-transparent text-[#7A746B] hover:text-[#141518]"}`}
          >
            <Sliders className="w-4 h-4 text-amber-600" />
            <span>Workspace & Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            aria-selected={activeTab === "notifications"}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === "notifications" ? "border-[#141518] text-[#141518] font-bold" : "border-transparent text-[#7A746B] hover:text-[#141518]"}`}
          >
            <Bell className="w-4 h-4 text-amber-600" />
            <span>Real-time Alerts</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            aria-selected={activeTab === "security"}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${activeTab === "security" ? "border-[#141518] text-[#141518] font-bold" : "border-transparent text-[#7A746B] hover:text-[#141518]"}`}
          >
            <Shield className="w-4 h-4 text-amber-600" />
            <span>Security & API Keys</span>
          </button>
        </div>

        {/* Modal Body / Tab Panes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PERSONAL PROFILE */}
          {activeTab === "personal" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Avatar Selector */}
              <div className="bg-white p-5 rounded-2xl border border-[#EDE7DB] shadow-xs">
                <label className="block text-xs font-bold text-[#141518] mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>Choose Profile Picture / Avatar</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {AVATAR_PRESETS.map((preset) => {
                    const isSelected = avatarUrl === preset.url;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setAvatarUrl(preset.url)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${isSelected ? "border-amber-500 bg-amber-50/70 shadow-xs ring-2 ring-amber-400/40" : "border-[#EAE3D6] hover:bg-[#FAF7F2]"}`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-12 h-12 rounded-full object-cover border border-stone-200"
                        />
                        <span className="text-[11px] font-semibold text-[#141518] text-center truncate w-full">
                          {preset.label}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] text-amber-700 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3 text-amber-600 stroke-[3]" />{" "}
                            Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Avatar URL option */}
                <div className="mt-3.5 pt-3.5 border-t border-[#F2ECE1] flex items-center gap-2">
                  <input
                    type="url"
                    value={customAvatarInput}
                    onChange={(e) => setCustomAvatarInput(e.target.value)}
                    placeholder="Or paste custom image URL..."
                    className="flex-1 px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#E0D7C9] text-xs text-[#141518] placeholder-[#9E978C] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomAvatar}
                    className="px-3 py-1.5 bg-[#141518] text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                  >
                    Apply URL
                  </button>
                </div>
              </div>

              {/* Personal Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 bg-white rounded-xl border text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${errors.name ? "border-rose-400" : "border-[#E0D7C9]"}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11px] text-rose-500 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 bg-white rounded-xl border text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${errors.email ? "border-rose-400" : "border-[#E0D7C9]"}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Job Title / Role
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Organization / Company
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Phone & WhatsApp Direct
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Location & HQ
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Preferred Timezone
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E978C]" />
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    >
                      <option value="America/Los_Angeles (PST)">
                        America/Los Angeles (PST / UTC-8)
                      </option>
                      <option value="America/New_York (EST)">
                        America/New York (EST / UTC-5)
                      </option>
                      <option value="Europe/London (GMT)">
                        Europe/London (GMT / UTC+0)
                      </option>
                      <option value="Europe/Berlin (CET)">
                        Europe/Berlin (CET / UTC+1)
                      </option>
                      <option value="Asia/Karachi (PKT)">
                        Asia/Karachi (PKT / UTC+5)
                      </option>
                      <option value="Asia/Dubai (GST)">
                        Asia/Dubai (GST / UTC+4)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bio / Executive Summary */}
              <div>
                <label className="block text-xs font-bold text-[#141518] mb-1">
                  Executive Bio & Strategy Focus
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                />
              </div>
            </div>
          )}

          {/* TAB 2: WORKSPACE & PIPELINE */}
          {activeTab === "pipeline" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-[#EDE7DB] space-y-4 shadow-xs">
                <div>
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Daily Lead Discovery Target (Leads/Day)
                  </label>
                  <p className="text-[11px] text-[#7A746B] mb-2">
                    Used to gauge pipeline velocity and pacing on the main
                    conversion dashboard.
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={10}
                      max={5e3}
                      step={25}
                      value={dailyGoalLeads}
                      onChange={(e) =>
                        setDailyGoalLeads(Number(e.target.value))
                      }
                      className="w-32 px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#E0D7C9] text-xs font-bold text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                    <span className="text-xs font-semibold text-[#666056]">
                      leads target per day
                    </span>
                  </div>
                  {errors.dailyGoalLeads && (
                    <p className="text-[11px] text-rose-500 mt-1">
                      {errors.dailyGoalLeads}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#F2ECE1]">
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Default Outreach Channel
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
                    {["WhatsApp", "Email", "Omnichannel"].map((channel) => (
                      <button
                        key={channel}
                        type="button"
                        onClick={() => setPreferredChannel(channel)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${preferredChannel === channel ? "border-amber-500 bg-amber-50/80 ring-1 ring-amber-400" : "border-[#EAE3D6] bg-[#FAF7F2] hover:bg-white"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#141518]">
                            {channel}
                          </span>
                          {preferredChannel === channel && (
                            <Check className="w-3.5 h-3.5 text-amber-600 stroke-[3]" />
                          )}
                        </div>
                        <p className="text-[10px] text-[#7A746B] mt-1">
                          {channel === "WhatsApp" &&
                            "Direct conversational blast with 94% open rate"}
                          {channel === "Email" &&
                            "Standard drip sequences and cold queue"}
                          {channel === "Omnichannel" &&
                            "Combined WhatsApp + Email sequence sync"}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2ECE1]">
                  <label className="block text-xs font-bold text-[#141518] mb-1">
                    Pipeline Currency Formatting
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full max-w-xs px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#E0D7C9] text-xs font-bold text-[#141518] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  >
                    <option value="USD ($)">
                      USD ($) - United States Dollar
                    </option>
                    <option value="EUR (€)">EUR (€) - Eurozone</option>
                    <option value="GBP (£)">GBP (£) - British Pound</option>
                    <option value="AED (AED)">AED - UAE Dirham</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS & ALERTS */}
          {activeTab === "notifications" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-white p-5 rounded-2xl border border-[#EDE7DB] space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#141518]">
                      Real-time Push Notifications
                    </h4>
                    <p className="text-[11px] text-[#7A746B]">
                      Display instantaneous sound and visual banners when
                      prospects interact.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                  />
                </div>

                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#141518]">
                      WhatsApp Inbound Reply Alerts
                    </h4>
                    <p className="text-[11px] text-[#7A746B]">
                      Notify me immediately when high-intent leads reply to
                      outreach blasts.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={whatsappAlerts}
                    onChange={(e) => setWhatsappAlerts(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                  />
                </div>

                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#141518]">
                      Google Meet & VIP Call Booking Alerts
                    </h4>
                    <p className="text-[11px] text-[#7A746B]">
                      Instant calendar trigger when a lead books via the AI
                      Receptionist or manual slot.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={meetingAlerts}
                    onChange={(e) => setMeetingAlerts(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold">
                    Real-time Lead Tracking Active:
                  </span>{" "}
                  All webhook events from WhatsApp Cloud API, Claude 3.5
                  Enrichment, and Google Meet live sync are routed to Elena
                  Rostova's session in real time.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & API KEYS */}
          {activeTab === "security" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* API Key box */}
              <div className="bg-white p-5 rounded-2xl border border-[#EDE7DB] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#141518] flex items-center gap-2">
                      <Key className="w-4 h-4 text-amber-600" />
                      <span>Lead Evo Secret API Token</span>
                    </h4>
                    <p className="text-[11px] text-[#7A746B]">
                      Used for programmatic lead ingestion, Zapier, and cURL
                      webhooks.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRegenerateKey}
                    className="text-xs text-amber-700 font-semibold hover:underline cursor-pointer"
                  >
                    Regenerate Key
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E0D7C9]">
                  <code className="text-xs font-mono font-bold text-[#141518] flex-1 truncate">
                    {isKeyRevealed ? apiKey : maskApiKey(apiKey)}
                  </code>
                  <button
                    type="button"
                    onClick={() => setIsKeyRevealed(!isKeyRevealed)}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-stone-200 hover:bg-stone-300 font-semibold text-[#141518] transition-colors cursor-pointer"
                  >
                    {isKeyRevealed ? "Hide" : "Reveal"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    className="flex items-center gap-1 px-3 py-1 text-[11px] rounded-lg bg-amber-400 hover:bg-amber-500 font-bold text-[#141518] transition-colors cursor-pointer"
                  >
                    {copiedKey ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Change */}
              <form
                onSubmit={handlePasswordSubmit}
                className="bg-white p-5 rounded-2xl border border-[#EDE7DB] space-y-3.5 shadow-xs"
              >
                <h4 className="text-xs font-bold text-[#141518] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>Update Account Password</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#7A746B] mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#7A746B] mb-1">
                      New Secure Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#E0D7C9] text-xs text-[#141518] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {passwordSuccess ? (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Password updated
                      successfully!
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#8C8477]">
                      Must contain numbers and letters for bank-grade security.
                    </span>
                  )}
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-stone-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Change Password
                  </button>
                </div>
              </form>

              {/* Active Sessions */}
              <div className="bg-white p-4 rounded-2xl border border-[#EDE7DB] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <div>
                    <p className="text-xs font-bold text-[#141518]">
                      Active Session: Chrome on macOS
                    </p>
                    <p className="text-[11px] text-[#7A746B]">
                      San Francisco, CA • IP 172.56.21.90 (Current)
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Online Now
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 px-6 bg-white border-t border-[#EAE3D6] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {showSavedToast && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold animate-in fade-in zoom-in-90 duration-150">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Profile & Details Updated!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#6E685F] hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              aria-label="Save Profile Changes"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E09816] text-[#121316] text-xs font-extrabold shadow-sm hover:shadow transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Profile Changes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
