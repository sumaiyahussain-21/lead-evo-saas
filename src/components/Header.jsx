import { useState } from "react";
import {
  Search,
  Plus,
  RotateCw,
  Bell,
  ChevronDown,
  ShieldCheck,
  LogOut,
  User as UserIcon,
  Settings,
} from "lucide-react";

const DEFAULT_HIGH_RES_AVATAR =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90";

export const Header = ({
  user,
  onOpenNewCampaign,
  onOpenMongoModal,
  onOpenAuthModal,
  onOpenAuthScreen,
  onLogout,
  onOpenProfileSettings,
  mongoStatus,
  searchQuery,
  onSearchChange,
  onRefreshData,
  isRefreshing = false,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const avatarSrc = DEFAULT_HIGH_RES_AVATAR;

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EBE4D8] px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
      {/* Search Input Bar */}
      <div className="flex-1 max-w-xl min-w-0">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E978C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search leads, campaigns, companies..."
            className="w-full pl-10 pr-3 sm:pr-4 py-2 bg-white rounded-full border border-[#E4DDD1] text-xs sm:text-sm text-[#1A1A1E] placeholder-[#9E978C] focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Action Controls & User Profile */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* New Lead Campaign Button */}
        <button
          onClick={onOpenNewCampaign}
          aria-label="New Lead Campaign"
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 stroke-[2.5] shrink-0" />
          <span className="hidden sm:inline">New Lead Campaign</span>
          <span className="sm:hidden">New</span>
        </button>

        {/* Sync / Refresh Button */}
        <button
          onClick={onRefreshData}
          disabled={isRefreshing}
          title="Sync Pipeline & Leads"
          aria-label="Sync Pipeline & Leads"
          className="p-2 rounded-full text-[#6E685F] hover:text-[#18191E] hover:bg-white border border-transparent hover:border-[#E4DDD1] transition-all cursor-pointer shrink-0"
        >
          <RotateCw
            className={`w-4 h-4 ${isRefreshing ? "animate-spin text-amber-500" : ""}`}
          />
        </button>

        {/* Notifications Bell */}
        <div className="relative shrink-0">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="View notifications"
            className="p-2 rounded-full text-[#6E685F] hover:text-[#18191E] hover:bg-white border border-transparent hover:border-[#E4DDD1] transition-all cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-[#EDE8DF] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-[#F0EBE1] flex items-center justify-between">
                <span className="font-semibold text-xs text-[#1E1F24]">
                  Real-time Notifications
                </span>
                <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                  3 New
                </span>
              </div>
              <div className="divide-y divide-[#F5F2EB] max-h-64 overflow-y-auto">
                <div className="px-4 py-2.5 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                  <p className="text-xs font-medium text-[#1E1F24]">
                    David Vance replied on WhatsApp
                  </p>
                  <p className="text-[11px] text-[#787268] truncate">
                    "Sounds promising, share demo link for our team"
                  </p>
                  <span className="text-[10px] text-[#A69E90]">2 mins ago</span>
                </div>
                <div className="px-4 py-2.5 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                  <p className="text-xs font-medium text-[#1E1F24]">
                    Julian Croft confirmed meeting
                  </p>
                  <p className="text-[11px] text-[#787268]">
                    Booked discovery demo on Sep 24, 10:15 AM
                  </p>
                  <span className="text-[10px] text-[#A69E90]">
                    15 mins ago
                  </span>
                </div>
                <div className="px-4 py-2.5 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                  <p className="text-xs font-medium text-[#1E1F24]">
                    SEO Audit completed
                  </p>
                  <p className="text-[11px] text-[#787268]">
                    jpvapes.jp scored 100 SEO & 95 Accessibility
                  </p>
                  <span className="text-[10px] text-[#A69E90]">1 hour ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label="User Profile"
            className="flex items-center gap-2 sm:gap-2.5 pl-1 pr-1.5 sm:pr-2 py-1 rounded-full hover:bg-white border border-transparent hover:border-[#E4DDD1] transition-all cursor-pointer"
          >
            <div className="relative w-8 h-8 shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-amber-400 ring-offset-1 ring-offset-[#FAF7F2] bg-stone-200">
                <img
                  src={avatarSrc}
                  alt={user?.name || "Elena Rostova"}
                  className="w-full h-full object-cover object-top block"
                />
              </div>
              <span
                title="Active"
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#FAF7F2]"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#18191E] leading-tight">
                {user?.name || "Elena Rostova"}
              </span>
              <span className="text-[11px] text-[#7A746B] leading-tight">
                {user?.role || "Revenue Director"}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8F887C]" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#EDE8DF] py-2 z-50">
              <div className="px-4 py-3 border-b border-[#F0EBE1]">
                <p className="text-sm font-bold text-[#18191E]">
                  {user?.name || "Elena Rostova"}
                </p>
                <p className="text-xs text-[#7A746B] truncate">
                  {user?.email || "elena.rostova@leadevo.io"}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md w-fit">
                 
                  
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onOpenProfileSettings();
                  }}
                  aria-label="Profile Details & Settings"
                  className="w-full px-4 py-2 text-left text-xs text-[#18191E] font-semibold hover:bg-amber-50/80 flex items-center justify-between cursor-pointer border-b border-[#F0EBE1]"
                >
                  <span className="flex items-center gap-2">
                    <UserIcon className="w-3.5 h-3.5 text-amber-600" />
                    Profile Details & Settings
                  </span>
                  <Settings className="w-3.5 h-3.5 text-amber-600" />
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    if (onLogout) {
                      onLogout();
                    } else if (onOpenAuthScreen) {
                      onOpenAuthScreen();
                    } else {
                      onOpenAuthModal();
                    }
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-medium"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};