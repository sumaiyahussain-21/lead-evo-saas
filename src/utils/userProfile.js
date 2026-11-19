export const AVATAR_PRESETS = [
  {
    id: "elena_default",
    label: "Elena Rostova (Lead Evo)",
    url: "[https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90](https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90)",
  },
  {
    id: "sarah_exec",
    label: "Studio Executive",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: "marcus_tech",
    label: "Growth Director",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: "david_ops",
    label: "Operations Lead",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
  },
];
export function getDefaultUserProfile() {
  return {
    id: "usr_elena_01",
    name: "Elena Rostova",
    email: "elena.rostova@leadevo.io",
    role: "Revenue Director",
    company: "Lead Evo Enterprise",
    avatarUrl:
      "[https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90](https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90)",
    phone: "+1 (415) 892-0419",
    bio: "Scaling outbound pipeline & high-intent B2B conversion engines across US and EMEA enterprise accounts.",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles (PST)",
    department: "Revenue & Commercial Growth",
    dailyGoalLeads: 350,
    preferredChannel: "WhatsApp",
    currency: "USD ($)",
    notificationsEnabled: true,
    whatsappAlerts: true,
    meetingAlerts: true,
    apiKey: "evo_live_sec_99a8f27e10b42c67",
  };
}
export function validateUserProfile(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Full name must be at least 2 characters long";
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please provide a valid business email address";
  }
  if (
    data.dailyGoalLeads !== void 0 &&
    (data.dailyGoalLeads < 1 || data.dailyGoalLeads > 1e4)
  ) {
    errors.dailyGoalLeads = "Daily goal leads must be between 1 and 10,000";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
export function maskApiKey(key) {
  if (!key)
    return "evo_\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
  if (key.length <= 10)
    return "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
  return `${key.slice(0, 8)}\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022${key.slice(-4)}`;
}
