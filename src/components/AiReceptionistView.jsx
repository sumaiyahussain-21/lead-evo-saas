import { useState } from "react";
import { Bot, Plus, Mic, PhoneCall } from "lucide-react";
export const AiReceptionistView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receptionists, setReceptionists] = useState([
    {
      id: "rec_1",
      name: "Elena AI \u2014 Apex Inbound Agent",
      business: "Apex Commerce",
      voice: "Alloy Warm Professional",
      latency: "0.4s",
      status: "Active",
      callsHandled: 42,
      qualificationRate: "88%",
      greeting:
        "Hello, thank you for contacting Apex Commerce. Are you looking for high-volume enterprise e-commerce integration?",
    },
  ]);
  const [activeCallDemo, setActiveCallDemo] = useState(false);
  const [callTranscript, setCallTranscript] = useState([
    "AI: Hi there! You have reached Lead Evo Sales Automation. How can I assist you today?",
  ]);
  const [userInput, setUserInput] = useState("");
  const handleSimulateUserMessage = () => {
    if (!userInput.trim()) return;
    const msg = userInput;
    setUserInput("");
    setCallTranscript((prev) => [...prev, `Lead: ${msg}`]);
    setTimeout(() => {
      setCallTranscript((prev) => [
        ...prev,
        `AI: Great question! Based on your target market, our WhatsApp conversion engine typically increases lead response rate to over 68%. Would you like me to book a 15-minute VIP walkthrough with Elena?`,
      ]);
    }, 700);
  };
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 relative min-h-[80vh]">
      {/* Title & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#141518]">
            AI Receptionist
          </h1>
          <p className="text-xs text-[#7A746B] mt-1">
            One receptionist per business. Add the business details, then pitch
            the demo to the client.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18191E] hover:bg-black text-white text-xs font-bold shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>New receptionist</span>
        </button>
      </div>

      {/* Receptionists List */}
      <div className="space-y-4">
        {receptionists.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-3xl p-6 border border-[#EDE8DF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-extrabold text-base text-[#18191E]">
                    {rec.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {rec.status}
                  </span>
                </div>
                <p className="text-xs text-[#7A746B] mt-0.5">
                  Assigned to{" "}
                  <span className="font-semibold text-black">
                    {rec.business}
                  </span>{" "}
                  • Voice: <span className="font-mono">{rec.voice}</span>
                </p>
                <p className="text-xs text-[#4A443A] bg-[#FAF7F2] p-2 rounded-xl mt-3 border border-[#EAE4D7] italic">
                  "{rec.greeting}"
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                  Latency
                </span>
                <p className="font-mono font-bold text-sm text-[#18191E]">
                  {rec.latency}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                  Qualified
                </span>
                <p className="font-mono font-bold text-sm text-emerald-700">
                  {rec.qualificationRate}
                </p>
              </div>

              <button
                onClick={() => setActiveCallDemo(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-bold text-xs shadow-sm cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Test Demo Call</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Voice Demo Simulation */}
      {activeCallDemo && (
        <div className="bg-[#141518] text-white rounded-3xl p-6 shadow-2xl border border-amber-400/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="font-bold text-sm">
                Live AI Voice Qualification Demo (0.4s Latency)
              </span>
            </div>
            <button
              onClick={() => setActiveCallDemo(false)}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-rose-300"
            >
              End Demo Call
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 p-3 bg-black/40 rounded-2xl border border-white/5 text-xs">
            {callTranscript.map((line, idx) => (
              <p
                key={idx}
                className={
                  line.startsWith("AI:")
                    ? "text-amber-300 font-medium"
                    : "text-white/90 pl-3 border-l-2 border-emerald-400"
                }
              >
                {line}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSimulateUserMessage()
              }
              placeholder="Speak to AI receptionist (e.g. 'Can this integrate with our CRM?')..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              onClick={handleSimulateUserMessage}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold cursor-pointer"
            >
              Speak
            </button>
          </div>
        </div>
      )}

      {/* Floating Microphone Icon matching ai_receptionist_adb27d78.png */}
      <button
        onClick={() => setActiveCallDemo(!activeCallDemo)}
        aria-label="Toggle voice demo"
        className="fixed bottom-8 right-8 z-30 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all cursor-pointer"
      >
        <Mic className="w-6 h-6" />
      </button>

      {/* New Receptionist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 space-y-4 shadow-2xl border border-[#EDE8DF]">
            <h3 className="font-extrabold text-lg text-[#18191E]">
              Create New AI Receptionist
            </h3>
            <p className="text-xs text-[#7A746B]">
              Configure custom business hours, qualifying criteria, and voice
              personality.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#18191E] block mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Solara Cloud Services"
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8]"
                />
              </div>

              <div>
                <label className="font-bold text-[#18191E] block mb-1">
                  Inbound Greeting Script
                </label>
                <textarea
                  rows={3}
                  defaultValue="Hi, thank you for reaching out to us. How can our team help accelerate your business goals today?"
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(
                    "AI Receptionist initialized & telephone SIP line assigned!",
                  );
                  setIsModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#18191E] hover:bg-black text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
              >
                Activate Receptionist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
