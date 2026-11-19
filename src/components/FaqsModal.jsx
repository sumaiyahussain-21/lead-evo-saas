import { useState } from "react";
import { X, ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
export const FaqsModal = ({ isOpen, onClose, onStartFree }) => {
  if (!isOpen) return null;
  const [activeIdx, setActiveIdx] = useState(0);
  const faqs = [
    {
      q: "How does the Start Free trial work and what is included?",
      a: "When you click Start Free, you receive immediate access to the Lead Evo workspace with 100 verified leads, direct WhatsApp verification checks, and 1 AI voice receptionist. No credit card is required to begin.",
    },
    {
      q: "How do you verify mobile numbers for direct WhatsApp outreach?",
      a: "We ping carrier networks and Meta WhatsApp Cloud API endpoints in real time. We instantly verify whether a phone number is an active WhatsApp device, eliminating disconnected landlines and preventing spam flags.",
    },
    {
      q: "Can I access the platform via Google Workspace SSO or standard email?",
      a: "Yes, both login and sign-up support Google Workspace SSO with a single click, or you can register using your business email and secure password.",
    },
    {
      q: "What is the 0.4s Latency AI Receptionist?",
      a: "Our AI Receptionist is an automated voice agent that answers inbound calls or web inquiries, qualifies budget and intent, and directly books qualified VIP demos into your Google Meet or Zoom calendar.",
    },
    {
      q: "How does the interactive Meeting Zoom & Screen Focus room work?",
      a: "The meeting room features individual participant video zoom, live screen spotlighting, in-call messaging, and meeting recording tools directly inside the Lead Evo portal without leaving the app.",
    },
    {
      q: "Where do I log out from my workspace?",
      a: 'At the bottom of the left sidebar, there is a dedicated "Log Out" button. Clicking it instantly clears your session and returns you to the home page.',
    },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-[32px] bg-white border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 text-[#141518] overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close FAQs"
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-[#141518] transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-[#141518] border border-stone-300 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Help Center & Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141518] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#7A746B]">
            Everything you need to know about plans, verification, and automated
            outreach.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen2 = activeIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E8E1D5] bg-[#FAF7F2] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setActiveIdx(isOpen2 ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#141518] hover:bg-stone-100/60 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A8478] transition-transform shrink-0 ml-2 ${isOpen2 ? "rotate-180 text-amber-600" : ""}`}
                  />
                </button>
                {isOpen2 && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#666056] leading-relaxed border-t border-[#EDE6DA] bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#EDE7DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#7A746B]">
            Have more questions? Contact our 24/7 priority support.
          </span>
          <button
            onClick={() => {
              onClose();
              onStartFree();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
