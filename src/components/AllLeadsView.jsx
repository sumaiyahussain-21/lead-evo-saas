import React, { useState } from "react";
import {
  Users,
  MessageSquare,
  Zap,
  DollarSign,
  Search,
  Upload,
  Plus,
  Send,
  Download,
  Trash2,
  Phone,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
export const AllLeadsView = ({
  leads,
  onOpenAddLead,
  onOpenImportCsv,
  onOpenBookMeeting,
  onLaunchOutreachForLeads,
  onDeleteLead,
  title = "Leads & Contacts",
}) => {
  const [selectedIds, setSelectedIds] = useState([
    "lead_001",
    "lead_002",
    "lead_003",
    "lead_004",
  ]);
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [waFilter, setWaFilter] = useState("Verified WA Only");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [selectedLeadDrawer, setSelectedLeadDrawer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  React.useEffect(() => {
    setCurrentPage(1);
  }, [title, searchFilter, statusFilter, waFilter, industryFilter]);
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      lead.role.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "All Statuses" ||
      lead.pipelineStage.toLowerCase() === statusFilter.toLowerCase();
    const matchesWA =
      waFilter === "All" ||
      (waFilter === "Verified WA Only" && lead.whatsappVerified);
    const matchesIndustry =
      industryFilter === "All Industries" ||
      lead.industry.toLowerCase().includes(industryFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesWA && matchesIndustry;
  });
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredLeads.length);
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);
  const toggleSelectAll = () => {
    if (
      selectedIds.length === paginatedLeads.length &&
      paginatedLeads.length > 0
    ) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedLeads.map((l) => l.id));
    }
  };
  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  const handleExportCsv = () => {
    const headers = [
      "Name",
      "Email",
      "Role",
      "Company",
      "Industry",
      "Phone",
      "Intent Score",
      "Stage",
      "ARR",
    ];
    const rows = filteredLeads.map((l) => [
      l.name,
      l.email,
      l.role,
      l.company,
      l.industry,
      l.phone,
      `${l.intentScore}%`,
      l.pipelineStage,
      `$${l.arrPotential}`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `lead_evo_prospects_page_${validCurrentPage}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const getStageBadge = (stage) => {
    switch (stage) {
      case "Ready to Pitch":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#18191E] text-white shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Ready to Pitch
          </span>
        );
      case "In Sequence":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EFEAE1] text-[#5C5549]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A8172]" />
            In Sequence (Day 3)
          </span>
        );
      case "Replied (Warm)":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEEFC3] text-[#8C5D00] border border-[#FDE1A6]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Replied (Warm)
          </span>
        );
      case "Booked Call":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAE6DF] text-[#3A362E]">
            <Calendar className="w-3 h-3 text-[#595247]" />
            Booked Call
          </span>
        );
      case "Enriched":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F5F2EB] text-[#706A5E]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Lead Enriched
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700">
            {stage}
          </span>
        );
    }
  };
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Title & Top Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#141518]">
              {title}
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#EFEBE1] text-[#524B40]">
              {filteredLeads.length} Available (4,820 Total)
            </span>
          </div>
          <p className="text-xs text-[#7A746B] mt-1">
            Manage, filter, and launch multi-channel campaigns directly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenImportCsv}
            aria-label="Import leads"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#DDD6C8] text-sm font-semibold text-[#18191E] shadow-xs transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 text-[#666056]" />
            <span>Import</span>
          </button>
          <button
            onClick={onOpenAddLead}
            aria-label="Add New Lead"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] text-sm font-bold shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Lead</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB] flex items-center justify-center text-[#18191E]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                Total Leads
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#18191E]">
                  4,820
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                  +12%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB] flex items-center justify-center text-[#18191E]">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                Verified WhatsApp
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#18191E]">
                  3,740
                </span>
                <span className="text-xs text-[#7A746B]">77.5%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB] flex items-center justify-center text-[#18191E]">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                High Intent
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#18191E]">
                  1,284
                </span>
                <span className="text-xs text-[#7A746B]">&gt;85%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#ECE6DB] flex items-center justify-center text-[#18191E]">
              <DollarSign className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8376]">
                Pipeline Value
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#18191E]">
                  $482k
                </span>
                <span className="text-xs text-[#7A746B]">39 deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-3 border border-[#EDE8DF] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9387]" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search leads, company, role..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] rounded-full text-xs text-[#18191E] placeholder-[#9A9387] focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3.5 py-2 rounded-full bg-[#FAF7F2] border border-transparent text-xs font-semibold text-[#3C3831] focus:outline-none cursor-pointer"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Ready to Pitch">Ready to Pitch</option>
            <option value="In Sequence">In Sequence</option>
            <option value="Replied (Warm)">Replied (Warm)</option>
            <option value="Booked Call">Booked Call</option>
            <option value="Enriched">Enriched</option>
          </select>

          <select
            value={waFilter}
            onChange={(e) => {
              setWaFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3.5 py-2 rounded-full bg-[#FAF7F2] border border-transparent text-xs font-semibold text-[#3C3831] focus:outline-none cursor-pointer"
          >
            <option value="Verified WA Only">Verified WA Only</option>
            <option value="All">All Contacts</option>
          </select>

          <select
            value={industryFilter}
            onChange={(e) => {
              setIndustryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3.5 py-2 rounded-full bg-[#FAF7F2] border border-transparent text-xs font-semibold text-[#3C3831] focus:outline-none cursor-pointer"
          >
            <option value="All Industries">All Industries</option>
            <option value="E-commerce">E-commerce</option>
            <option value="SaaS">SaaS / Cloud</option>
            <option value="AI">AI & Tech</option>
            <option value="Design">Design Agency</option>
            <option value="Real Estate">Real Estate</option>
            <option value="FinTech">FinTech</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Yellow Banner */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 px-6 rounded-2xl bg-[#F5A623] text-[#121316] flex items-center justify-between shadow-sm animate-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">
              {selectedIds.length} selected
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onLaunchOutreachForLeads(selectedIds)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141518] hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Outreach</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 text-[#141518] text-xs font-semibold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              onClick={() => {
                selectedIds.forEach((id) => onDeleteLead(id));
                setSelectedIds([]);
              }}
              title="Delete selected"
              className="p-2 rounded-xl bg-white/30 hover:bg-white/50 text-[#141518] transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Leads Table Card */}
      <div className="bg-white rounded-3xl border border-[#EDE8DF] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F0EBE1] text-[10px] font-bold uppercase tracking-wider text-[#8A8376] bg-[#FAF7F2]">
                <th className="py-3.5 pl-6 pr-2 w-10">
                  <input
                    type="checkbox"
                    checked={
                      paginatedLeads.length > 0 &&
                      paginatedLeads.every((l) => selectedIds.includes(l.id))
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4">Lead Contact</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Direct Phone / WA</th>
                <th className="py-3.5 px-4">Intent</th>
                <th className="py-3.5 px-4">Pipeline Stage</th>
                <th className="py-3.5 pr-6 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EB] text-xs">
              {paginatedLeads.map((lead) => {
                const isSelected = selectedIds.includes(lead.id);
                return (
                  <tr
                    key={lead.id}
                    className={`hover:bg-[#FAF7F2] transition-colors cursor-pointer ${isSelected ? "bg-amber-50/40" : ""}`}
                  >
                    <td
                      className="py-4 pl-6 pr-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(lead.id)}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                      />
                    </td>

                    <td
                      className="py-4 px-4"
                      onClick={() => setSelectedLeadDrawer(lead)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={lead.avatarUrl}
                          alt={lead.name}
                          className="w-9 h-9 rounded-full object-cover border border-[#E0D8CB]"
                        />
                        <div>
                          <p className="font-bold text-sm text-[#18191E] flex items-center gap-1.5">
                            {lead.name}
                          </p>
                          <p className="text-[11px] text-[#7A746B]">
                            {lead.email}
                          </p>
                          <p className="text-[10px] text-[#A69E90]">
                            {lead.role}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td
                      className="py-4 px-4"
                      onClick={() => setSelectedLeadDrawer(lead)}
                    >
                      <p className="font-bold text-[#18191E]">{lead.company}</p>
                      <p className="text-[11px] text-[#7A746B]">
                        {lead.industry}
                      </p>
                      <span className="text-[10px] text-[#9E978C] font-mono">
                        {lead.employees} EMP
                      </span>
                    </td>

                    <td
                      className="py-4 px-4"
                      onClick={() => setSelectedLeadDrawer(lead)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#2A2722]">
                          {lead.phone}
                        </span>
                        {lead.whatsappVerified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                            WA
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded-md">
                            Queued
                          </span>
                        )}
                      </div>
                    </td>

                    <td
                      className="py-4 px-4"
                      onClick={() => setSelectedLeadDrawer(lead)}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-extrabold text-[#18191E] text-xs">
                          {lead.intentScore}%
                        </span>
                        <div className="w-16 h-2 rounded-full bg-[#EFEBE1] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                            style={{ width: `${lead.intentScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td
                      className="py-4 px-4"
                      onClick={() => setSelectedLeadDrawer(lead)}
                    >
                      {getStageBadge(lead.pipelineStage)}
                    </td>

                    <td
                      className="py-4 pr-6 pl-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onLaunchOutreachForLeads([lead.id])}
                          title="Direct WhatsApp Pitch"
                          aria-label={`WhatsApp pitch ${lead.name}`}
                          className="p-1.5 rounded-lg text-[#6E685F] hover:text-[#18191E] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button
                          onClick={() => onOpenBookMeeting(lead)}
                          title="Book Meeting"
                          aria-label={`Book meeting with ${lead.name}`}
                          className="p-1.5 rounded-lg text-[#6E685F] hover:text-[#18191E] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                        >
                          <Phone className="w-4 h-4 text-amber-600" />
                        </button>
                        <button
                          onClick={() => setSelectedLeadDrawer(lead)}
                          title="View Lead Details"
                          aria-label={`Details for ${lead.name}`}
                          className="p-1.5 rounded-lg text-[#8C8477] hover:text-[#18191E] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Real Dynamic Pagination Footer */}
        <div className="p-4 px-6 border-t border-[#F0EBE1] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A746B] bg-[#FAF7F2]">
          <div>
            Showing{" "}
            <span className="font-bold text-[#18191E]">
              {startIndex + 1}-{endIndex}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#18191E]">
              {filteredLeads.length}
            </span>{" "}
            filtered leads • 5 per page (4,820 Total in DB)
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validCurrentPage === 1}
              aria-label="Previous page"
              className="px-2.5 py-1.5 rounded-lg text-[#8C8477] hover:bg-white border border-transparent hover:border-[#DDD6C8] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1 font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer ${validCurrentPage === pageNum ? "bg-[#18191E] text-white shadow-sm" : "text-[#524D44] hover:bg-white hover:border border-[#DDD6C8]"}`}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validCurrentPage === totalPages}
              aria-label="Next page"
              className="px-2.5 py-1.5 rounded-lg text-[#8C8477] hover:bg-white border border-transparent hover:border-[#DDD6C8] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lead Detail Drawer Modal */}
      {selectedLeadDrawer && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1] mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8A8376]">
                  Lead Intelligence Profile
                </span>
                <button
                  onClick={() => setSelectedLeadDrawer(null)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedLeadDrawer.avatarUrl}
                  alt={selectedLeadDrawer.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <h3 className="text-xl font-extrabold text-[#18191E]">
                    {selectedLeadDrawer.name}
                  </h3>
                  <p className="text-xs text-[#7A746B]">
                    {selectedLeadDrawer.role} at {selectedLeadDrawer.company}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    {getStageBadge(selectedLeadDrawer.pipelineStage)}
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      {selectedLeadDrawer.intentScore}% Intent
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#8A8376]">Email</span>
                    <span className="font-semibold text-[#18191E]">
                      {selectedLeadDrawer.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A8376]">Direct Phone</span>
                    <span className="font-mono font-semibold text-[#18191E]">
                      {selectedLeadDrawer.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A8376]">Company Industry</span>
                    <span className="font-semibold text-[#18191E]">
                      {selectedLeadDrawer.industry}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A8376]">Headcount</span>
                    <span className="font-semibold text-[#18191E]">
                      {selectedLeadDrawer.employees} Employees
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A8376]">Est. Pipeline ARR</span>
                    <span className="font-bold text-emerald-700 font-mono">
                      ${selectedLeadDrawer.arrPotential.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <p className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    AI Enrichment Note
                  </p>
                  <p className="text-[#69542E] leading-relaxed">
                    {selectedLeadDrawer.lastOutreach ||
                      "High purchase intent detected. Profile enriched with LinkedIn and Claude 3.5 signals."}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#F0EBE1] flex items-center gap-3">
              <button
                onClick={() => {
                  const id = selectedLeadDrawer.id;
                  setSelectedLeadDrawer(null);
                  onLaunchOutreachForLeads([id]);
                }}
                className="flex-1 py-3 rounded-2xl bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Launch WhatsApp Pitch</span>
              </button>
              <button
                onClick={() => {
                  const lead = selectedLeadDrawer;
                  setSelectedLeadDrawer(null);
                  onOpenBookMeeting(lead);
                }}
                className="py-3 px-4 rounded-2xl bg-[#141518] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Book Call</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
