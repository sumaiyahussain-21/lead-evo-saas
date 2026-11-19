import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  RotateCw,
  Download,
  Zap,
  Phone,
  Sparkles,
} from "lucide-react";
export const WhatsAppCheckView = ({ leads }) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState(
    "+1 (415) 892-0419\n+49 (30) 9123-5810\n+1 (512) 749-3012\n+1 (206) 555-0182\n+1 (312) 402-9981",
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedResults, setVerifiedResults] = useState([
    {
      phone: "+1 (415) 892-0419",
      lead: "Marcus Thorne",
      company: "Apex Commerce",
      status: "Active (WhatsApp)",
      type: "Business Account",
      deliverability: "100%",
    },
    {
      phone: "+49 (30) 9123-5810",
      lead: "Elena Rostova",
      company: "Solara Cloud",
      status: "Active (WhatsApp)",
      type: "Standard Account",
      deliverability: "98%",
    },
    {
      phone: "+1 (512) 749-3012",
      lead: "David Vance",
      company: "HyperFlow AI",
      status: "Active (WhatsApp)",
      type: "Business Account",
      deliverability: "100%",
    },
    {
      phone: "+1 (206) 555-0182",
      lead: "Sarah Lin",
      company: "CraftLab Studio",
      status: "Unregistered / Landline",
      type: "Invalid WA",
      deliverability: "0%",
    },
    {
      phone: "+1 (312) 402-9981",
      lead: "Julian Croft",
      company: "Vanguard Realty",
      status: "Active (WhatsApp)",
      type: "Standard Account",
      deliverability: "96%",
    },
  ]);
  const handleRunVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const lines = phoneNumberInput
        .split("\n")
        .filter((l) => l.trim().length > 0);
      const newItems = lines.map((num, i) => {
        const isOdd = i % 4 === 3;
        return {
          phone: num.trim(),
          lead: `Prospect #${i + 1}`,
          company: "Verified Entity",
          status: isOdd ? "Unregistered / Landline" : "Active (WhatsApp)",
          type: isOdd ? "Invalid WA" : "Business Account",
          deliverability: isOdd ? "0%" : "99%",
        };
      });
      setVerifiedResults(newItems);
    }, 1e3);
  };
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Title & Top Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-wider uppercase text-[#8C8477]">
            DELIVERABILITY ENGINE &gt; NUMBER VALIDATION
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#141518] mt-1">
            WhatsApp Number Verification & Health Check
          </h1>
          <p className="text-xs text-[#7A746B] mt-0.5">
            Real-time ping verification to ensure 0% bounce rate before
            dispatching cold pitches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>WhatsApp Cloud API: Tier 10k/day</span>
          </div>
        </div>
      </div>

      {/* 4 Health Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
            Verified Numbers
          </span>
          <p className="text-2xl font-extrabold text-[#18191E] mt-1">
            3,740 / 4,820
          </p>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md mt-1 inline-block">
            77.5% Active Rate
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
            Quality Rating
          </span>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">
            HIGH (Green)
          </p>
          <span className="text-[11px] text-[#7A746B]">
            Zero spam complaints
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
            Server Latency
          </span>
          <p className="text-2xl font-extrabold text-[#18191E] mt-1 font-mono">
            0.38s
          </p>
          <span className="text-[11px] text-[#7A746B]">
            Cloud Bus Webhook Ready
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
            Deliverability Index
          </span>
          <p className="text-2xl font-extrabold text-amber-600 mt-1 font-mono">
            99.4%
          </p>
          <span className="text-[11px] text-[#7A746B]">Optimized route</span>
        </div>
      </div>

      {/* Verification Scanner Form */}
      <div className="bg-white rounded-3xl p-6 border border-[#EDE8DF] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-[#18191E]">
              Bulk WhatsApp Verification Scanner
            </h2>
          </div>
          <span className="text-xs text-[#7A746B]">
            Paste up to 500 phone numbers (one per line)
          </span>
        </div>

        <textarea
          rows={5}
          value={phoneNumberInput}
          onChange={(e) => setPhoneNumberInput(e.target.value)}
          placeholder="+1 (415) 892-0419&#10;+49 (30) 9123-5810..."
          className="w-full p-4 rounded-2xl bg-[#FAF7F2] border border-[#DDD6C8] text-xs font-mono text-[#18191E] focus:outline-none focus:ring-2 focus:ring-emerald-400 leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#7A746B] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Auto-cleans formatting, country codes, and mobile prefixes.
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                const cleanCsv = verifiedResults
                  .filter((r) => r.status.includes("Active"))
                  .map(
                    (r) =>
                      `${r.phone},${r.lead},${r.company},${r.deliverability}`,
                  )
                  .join("\n");
                const encoded = encodeURI(
                  "data:text/csv;charset=utf-8,Phone,Name,Company,Deliverability\n" +
                    cleanCsv,
                );
                const a = document.createElement("a");
                a.href = encoded;
                a.download = "verified_whatsapp_contacts.csv";
                a.click();
              }}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#DDD6C8] text-xs font-semibold text-[#18191E] flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Clean CSV</span>
            </button>

            <button
              onClick={handleRunVerification}
              disabled={isVerifying}
              className="px-6 py-2.5 rounded-full bg-[#18191E] hover:bg-black text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? (
                <RotateCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>
                {isVerifying
                  ? "Verifying Numbers..."
                  : "Verify Numbers on WhatsApp"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Verification Results Table */}
      <div className="bg-white rounded-3xl border border-[#EDE8DF] shadow-xs overflow-hidden">
        <div className="p-4 px-6 border-b border-[#F0EBE1] flex items-center justify-between bg-[#FAF7F2]">
          <h3 className="font-bold text-xs text-[#18191E]">
            Scan Results & Deliverability Verdict
          </h3>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            {verifiedResults.filter((r) => r.status.includes("Active")).length}{" "}
            Ready for Outreach
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F0EBE1] text-[10px] font-bold uppercase tracking-wider text-[#8A8376] bg-[#FAF7F2]">
                <th className="py-3 px-6">Phone Number</th>
                <th className="py-3 px-4">Contact / Lead</th>
                <th className="py-3 px-4">WhatsApp Status</th>
                <th className="py-3 px-4">Account Type</th>
                <th className="py-3 pr-6 text-right">Deliverability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EB]">
              {verifiedResults.map((item, idx) => {
                const isActive = item.status.includes("Active");
                return (
                  <tr
                    key={idx}
                    className="hover:bg-[#FAF7F2] transition-colors"
                  >
                    <td className="py-3.5 px-6 font-mono font-bold text-[#18191E] flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#8A8376]" />
                      <span>{item.phone}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#18191E]">
                      {item.lead}{" "}
                      <span className="text-[#8A8376] font-normal">
                        ({item.company})
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {item.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                          <XCircle className="w-3 h-3 text-rose-500" />
                          {item.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#524D43]">{item.type}</td>
                    <td className="py-3.5 pr-6 text-right font-mono font-bold">
                      <span
                        className={
                          isActive ? "text-emerald-700" : "text-rose-600"
                        }
                      >
                        {item.deliverability}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
