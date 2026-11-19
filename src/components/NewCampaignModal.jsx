import { useState } from "react";
import { Zap, MessageSquare, Mail, Sparkles } from "lucide-react";
export const NewCampaignModal = ({ onClose, onLaunch }) => {
  const [name, setName] = useState("Q4 WhatsApp High-Intent Outreach");
  const [targetIndustry, setTargetIndustry] = useState("E-commerce & SaaS");
  const [dailyQuota, setDailyQuota] = useState("350");
  const [channel, setChannel] = useState("whatsapp");
  const handleSubmit = (e) => {
    e.preventDefault();
    onLaunch({ name, targetIndustry, dailyQuota, channel });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-600 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#18191E]">
                Create New Lead Campaign
              </h3>
              <p className="text-xs text-[#7A746B]">
                Configure automated prospect scoring and dispatch pipeline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[#18191E] block mb-1">
              Campaign Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-semibold text-[#18191E]"
            />
          </div>

          <div>
            <label className="font-bold text-[#18191E] block mb-1">
              Target Prospect Industry
            </label>
            <input
              type="text"
              required
              value={targetIndustry}
              onChange={(e) => setTargetIndustry(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-semibold text-[#18191E]"
            />
          </div>

          <div>
            <label className="font-bold text-[#18191E] block mb-1">
              Primary Outreach Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setChannel("whatsapp")}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${channel === "whatsapp" ? "bg-[#18191E] text-white border-black font-bold" : "bg-[#FAF7F2] text-[#423D33] border-[#DDD6C8]"}`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px]">WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel("omnichannel")}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${channel === "omnichannel" ? "bg-[#18191E] text-white border-black font-bold" : "bg-[#FAF7F2] text-[#423D33] border-[#DDD6C8]"}`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-[11px]">Omni-Channel</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel("email")}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${channel === "email" ? "bg-[#18191E] text-white border-black font-bold" : "bg-[#FAF7F2] text-[#423D33] border-[#DDD6C8]"}`}
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-[11px]">Cold Email</span>
              </button>
            </div>
          </div>

          <div>
            <label className="font-bold text-[#18191E] block mb-1">
              Daily Lead Discovery Target
            </label>
            <input
              type="number"
              value={dailyQuota}
              onChange={(e) => setDailyQuota(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-mono font-bold text-[#18191E]"
            />
          </div>

          <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-extrabold shadow-sm cursor-pointer"
            >
              Launch Campaign Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
