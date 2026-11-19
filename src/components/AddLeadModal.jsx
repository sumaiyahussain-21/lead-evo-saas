import { useState } from "react";
import { UserPlus } from "lucide-react";
export const AddLeadModal = ({ onClose, onAddLead }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("VP Growth");
  const [phone, setPhone] = useState("+1 (415) ");
  const [industry, setIndustry] = useState("E-commerce");
  const [employees, setEmployees] = useState(120);
  const [arrPotential, setArrPotential] = useState(14e3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !company) return;
    setIsSubmitting(true);
    try {
      await onAddLead({
        name,
        email,
        company,
        role,
        phone,
        industry,
        employees,
        arrPotential,
        whatsappVerified: true,
        pipelineStage: "Ready to Pitch",
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#18191E]">
                Add New Prospect
              </h3>
              <p className="text-xs text-[#7A746B]">
                Score, enrich and queue into outreach
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#18191E] block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Marcus Thorne"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-semibold text-[#18191E]"
              />
            </div>
            <div>
              <label className="font-bold text-[#18191E] block mb-1">
                Business Email
              </label>
              <input
                type="email"
                required
                placeholder="marcus@apexcommerce.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-semibold text-[#18191E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#18191E] block mb-1">
                Company Name
              </label>
              <input
                type="text"
                required
                placeholder="Apex Commerce"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-semibold text-[#18191E]"
              />
            </div>
            <div>
              <label className="font-bold text-[#18191E] block mb-1">
                Role / Title
              </label>
              <input
                type="text"
                required
                placeholder="VP Growth"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-semibold text-[#18191E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#18191E] block mb-1">
                Direct Phone (WhatsApp)
              </label>
              <input
                type="text"
                required
                placeholder="+1 (415) 892-0419"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-mono font-semibold text-[#18191E]"
              />
            </div>
            <div>
              <label className="font-bold text-[#18191E] block mb-1">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-semibold text-[#18191E]"
              >
                <option value="E-commerce">E-commerce</option>
                <option value="SaaS / Cloud">SaaS / Cloud</option>
                <option value="AI & Tech">AI & Tech</option>
                <option value="Real Estate">Real Estate</option>
                <option value="FinTech">FinTech</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#18191E] block mb-1">
                Employee Count
              </label>
              <input
                type="number"
                value={employees}
                onChange={(e) => setEmployees(parseInt(e.target.value) || 10)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-mono font-bold text-[#18191E]"
              />
            </div>
            <div>
              <label className="font-bold text-[#18191E] block mb-1">
                Target ARR Potential ($)
              </label>
              <input
                type="number"
                value={arrPotential}
                onChange={(e) =>
                  setArrPotential(parseInt(e.target.value) || 5e3)
                }
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] font-mono font-bold text-[#18191E]"
              />
            </div>
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
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-extrabold shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Enriching..." : "Save & Score Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
