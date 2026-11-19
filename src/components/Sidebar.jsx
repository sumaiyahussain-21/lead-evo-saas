import {
  LayoutGrid,
  Users,
  Bookmark,
  Radar,
  Send,
  MessageSquare,
  Palette,
  Globe,
  TrendingUp,
  Bot,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
export const Sidebar = ({
  currentTab,
  onSelectTab,
  onLogout,
  collapsed = false,
  onToggleCollapse,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "all-leads", label: "All Leads", icon: Users, badge: "4.8k" },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "collect-leads", label: "Collect Leads", icon: Radar },
    { id: "outreach", label: "Outreach", icon: Send, badge: "14" },
    { id: "whatsapp-check", label: "WhatsApp Check", icon: MessageSquare },
    { id: "brand-creator", label: "Branding Creator", icon: Palette },
    { id: "website-creator", label: "Website Creator", icon: Globe },
    { id: "seo-audit", label: "SEO Audit", icon: TrendingUp },
    { id: "ai-receptionist", label: "AI Receptionist", icon: Bot },
    { id: "meeting", label: "Meeting", icon: Calendar },
  ];
  if (collapsed) {
    return (
      <aside className="w-16 h-screen sticky top-0 py-5 flex flex-col items-center bg-[#131418] text-gray-300 z-30 shadow-2xl transition-all duration-300">
        {/* Compact Logo */}
        <button
          onClick={() => onSelectTab("dashboard")}
          aria-label="Lead Evo Home"
          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E2026] to-[#2B2D35] border border-white/10 flex items-center justify-center text-amber-400 mb-6 shadow-md cursor-pointer hover:scale-105 transition-transform"
        >
          <Layers className="w-5 h-5 text-amber-400" />
        </button>

        {/* Compact Navigation list */}
        <nav
          aria-label="Core Pipeline Compact"
          className="flex-1 flex flex-col gap-2 w-full px-2"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                title={item.label}
                aria-label={item.label}
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer mx-auto ${isActive ? "bg-gradient-to-b from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/20 font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                <Icon className="w-5 h-5" />
                {item.badge && !isActive && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Log Out button in compact mode */}
        {onLogout && (
          <button
            onClick={onLogout}
            title="Log Out"
            aria-label="Log Out"
            className="w-10 h-10 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 flex items-center justify-center cursor-pointer transition-colors mt-auto mb-2 group"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>
        )}

        {/* Uncollapse button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors mb-2"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </aside>
    );
  }
  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col bg-[#F7F4EE] border-r border-[#E6E0D4] z-30 select-none transition-all duration-300">
      {/* Brand Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <div
          onClick={() => onSelectTab("dashboard")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#111216] flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#16171B] flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
              Lead Evo
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/60">
                PRO
              </span>
            </span>
          </div>
        </div>

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-stone-200/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Core Pipeline Label */}
      <div className="px-6 pt-3 pb-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
          Core Pipeline
        </p>
      </div>

      {/* Navigation List */}
      <nav
        aria-label="Core Pipeline Navigation"
        className="flex-1 overflow-y-auto px-3 py-1 space-y-1"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              aria-label={item.label}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${isActive ? "bg-[#18191E] text-white shadow-md shadow-black/10" : "text-[#48443E] hover:text-[#18191E] hover:bg-[#EAE4D7]/70"}`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-amber-400" : "text-[#7A756C]"}`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors ${isActive ? "bg-white/20 text-white" : "bg-stone-200/80 text-stone-600"}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info: Pro Engine Active v2.4 & Log Out */}
      <div className="p-4 border-t border-[#E6E0D4] bg-[#F2EFE8]/80 space-y-2.5">
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/70 border border-[#E0D8CA] text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-semibold text-[#2C2924]">
              Pro Engine Active
            </span>
          </div>
          <span className="text-[11px] text-[#857E73] font-mono font-medium">
            v2.4
          </span>
        </div>

        {/* Log Out button in sidebar */}
        {onLogout && (
          <button
            onClick={onLogout}
            title="Log Out"
            aria-label="Log Out from Lead Evo"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/70 transition-all cursor-pointer shadow-xs active:scale-[0.98] group"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="w-4 h-4 text-rose-600 transition-transform group-hover:-translate-x-0.5" />
              <span>Log Out</span>
            </div>
            <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">
              Exit
            </span>
          </button>
        )}
      </div>
    </aside>
  );
};
