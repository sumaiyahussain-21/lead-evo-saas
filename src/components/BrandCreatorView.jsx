import { useState } from "react";
import {
  Palette,
  Upload,
  Download,
  Eye,
  RefreshCw,
  Sparkles,
  Search,
  Check,
  Laptop,
  ArrowRight,
  Sliders,
  Share2,
  X,
  Grid,
} from "lucide-react";
const TEMPLATE_LIBRARY = [
  {
    id: "tpl_macbook",
    name: 'MacBook Pro 16" Studio',
    category: "Laptop",
    deviceLabel: 'MacBook Pro 16"',
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    description:
      "Dark obsidian studio render with high-contrast screen reflection.",
  },
  {
    id: "tpl_combo",
    name: "MacBook + iPhone Ecosystem Combo",
    category: "Combo",
    deviceLabel: "MacBook + iPhone Combo",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    description:
      "Dual-device layout showcasing responsive cross-platform experience.",
  },
  {
    id: "tpl_iphone",
    name: "iPhone 16 Pro Showcase",
    category: "Phone",
    deviceLabel: "iPhone 16 Pro Showcase",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&auto=format&fit=crop&q=80",
    description: "Floating titanium bevel with realistic curved glass glare.",
  },
  {
    id: "tpl_notebook",
    name: "Spiral Notebook & Desk Collateral",
    category: "Notebooks",
    deviceLabel: "Spiral Notebook & Stationery",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    description: "Physical executive stationery for VIP client onboarding.",
  },
  {
    id: "tpl_signage",
    name: "Storefront Round Wall Signboard",
    category: "Signage",
    deviceLabel: "Architectural Wall Sign",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
    description: "Outdoor retail and commercial brick facade logo branding.",
  },
  {
    id: "tpl_cards",
    name: "Luxury Embossed Business Cards",
    category: "Business Cards",
    deviceLabel: "Foil Stamped Cards",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
    description: "Heavyweight matte textured stock with metallic foil accent.",
  },
  {
    id: "tpl_mug",
    name: "Ceramic Coffee Mug & Desk Merch",
    category: "Merchandise",
    deviceLabel: "Branded Ceramic Mug",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    description: "Everyday office drinkware with crisp laser engraved logo.",
  },
  {
    id: "tpl_folder",
    name: "Executive VIP Presentation Folder",
    category: "Folder",
    deviceLabel: "Pitch Deck Portfolio",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80",
    description:
      "Embossed leatherette presentation portfolio for sales pitches.",
  },
];
const COLOR_PALETTES = [
  {
    name: "Amber Gold & Obsidian",
    hex: "#F5A623",
    bgClass: "bg-amber-400",
    borderClass: "border-amber-400",
  },
  {
    name: "Electric Indigo & Slate",
    hex: "#4F46E5",
    bgClass: "bg-indigo-500",
    borderClass: "border-indigo-500",
  },
  {
    name: "Emerald Pro & Forest",
    hex: "#10B981",
    bgClass: "bg-emerald-500",
    borderClass: "border-emerald-500",
  },
  {
    name: "Royal Purple & Night",
    hex: "#9333EA",
    bgClass: "bg-purple-600",
    borderClass: "border-purple-600",
  },
  {
    name: "Crimson Velvet",
    hex: "#E11D48",
    bgClass: "bg-rose-500",
    borderClass: "border-rose-500",
  },
  {
    name: "Minimalist Titanium Dark",
    hex: "#18191E",
    bgClass: "bg-[#18191E]",
    borderClass: "border-stone-800",
  },
];
export const BrandCreatorView = () => {
  const [businessName, setBusinessName] = useState("Apex Commerce");
  const [domain, setDomain] = useState("apexcommerce.cc");
  const [industry, setIndustry] = useState("E-commerce / Retail");
  const [brandTagline, setBrandTagline] = useState(
    "Next-gen AI Revenue Infrastructure",
  );
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTES[0]);
  const [logoInitials, setLogoInitials] = useState("AC");
  const [selectedTemplateIds, setSelectedTemplateIds] = useState([
    "tpl_macbook",
    "tpl_combo",
    "tpl_iphone",
    "tpl_notebook",
    "tpl_signage",
    "tpl_cards",
  ]);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [isShowAllModalOpen, setIsShowAllModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [activePreviewData, setActivePreviewData] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const handleNameChange = (name) => {
    setBusinessName(name);
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      setLogoInitials((words[0][0] + words[1][0]).toUpperCase());
    } else if (name.length >= 2) {
      setLogoInitials(name.slice(0, 2).toUpperCase());
    }
  };
  const toggleTemplateSelection = (id) => {
    if (selectedTemplateIds.includes(id)) {
      if (selectedTemplateIds.length > 1) {
        setSelectedTemplateIds(selectedTemplateIds.filter((t) => t !== id));
      }
    } else {
      setSelectedTemplateIds([...selectedTemplateIds, id]);
    }
  };
  const handleSelectAllTemplates = () => {
    if (selectedTemplateIds.length === TEMPLATE_LIBRARY.length) {
      setSelectedTemplateIds([
        "tpl_macbook",
        "tpl_combo",
        "tpl_iphone",
        "tpl_notebook",
      ]);
    } else {
      setSelectedTemplateIds(TEMPLATE_LIBRARY.map((t) => t.id));
    }
  };
  const handleShowAllBranding = () => {
    setIsCustomizeModalOpen(false);
    setIsShowAllModalOpen(true);
  };
  const handleOpenSinglePreview = (item) => {
    setActivePreviewData(item);
    setPreviewModalOpen(true);
  };
  const activeMockups = TEMPLATE_LIBRARY.filter((tpl) =>
    selectedTemplateIds.includes(tpl.id),
  );
  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Title & Top Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-wider uppercase text-[#8C8477]">
            Prospect Engine / Brand Intelligence
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#141518] mt-1">
            Branding Creator
          </h1>
          <p className="text-xs text-[#7A746B] mt-0.5">
            Generate bespoke branded mockups and presentation-ready pitch
            collateral for any prospect in seconds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCustomizeModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] text-xs font-extrabold shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Sliders className="w-4 h-4 stroke-[2.5]" />
            <span>Customize Branding</span>
          </button>

          <button
            onClick={() => setIsShowAllModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18191E] hover:bg-black text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <Grid className="w-4 h-4 text-amber-400" />
            <span>Show All ({selectedTemplateIds.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar with Customize Button */}
      <div className="bg-white rounded-3xl p-3 border border-[#EDE8DF] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9387]" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search mockups, client names, devices..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] rounded-full text-xs text-[#18191E] placeholder-[#9A9387] focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShowAllModalOpen(true)}
            className="px-4 py-2 rounded-full bg-[#18191E] text-white text-xs font-bold cursor-pointer hover:bg-black transition-colors"
          >
            All Mockups ({activeMockups.length})
          </button>

          {/* Critical button: Customize triggers popup modal */}
          <button
            onClick={() => setIsCustomizeModalOpen(true)}
            aria-label="Customize Branding Details"
            className="px-4 py-2 rounded-full bg-[#FAF7F2] text-[#18191E] text-xs font-bold hover:bg-amber-100 hover:text-amber-900 border border-[#DDD6C8] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            <span>Customize</span>
          </button>

          <button
            onClick={() => setIsCustomizeModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF7F2] text-[#4E483E] text-xs font-semibold hover:bg-stone-100 border border-[#EDE8DF] cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Custom Screens</span>
          </button>
        </div>
      </div>

      {/* Section Header: Active Brand Showcase */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-[#18191E]">
            Your brand mockups for {businessName}
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#696152] border border-[#E6E0D4]">
            {activeMockups.length} Ready
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#8C8477]">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Real-time asset sync</span>
        </div>
      </div>

      {/* Showcase Cards Grid matching uploaded design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeMockups.slice(0, 3).map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs flex flex-col justify-between group hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg text-black font-extrabold text-xs flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: selectedColor.hex }}
                  >
                    {logoInitials}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#18191E]">
                      {businessName}
                    </h3>
                    <p className="text-[10px] text-[#7A746B]">{domain}</p>
                  </div>
                </div>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: selectedColor.hex }}
                />
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4 bg-stone-100 border border-stone-200">
                <img
                  src={tpl.image}
                  alt={tpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono backdrop-blur-xs flex items-center gap-1">
                  <Laptop className="w-2.5 h-2.5" />
                  {tpl.deviceLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE1] text-xs">
              <button
                onClick={() => handleOpenSinglePreview(tpl)}
                className="flex items-center gap-1 text-[#423D33] hover:text-black font-semibold cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setIsCustomizeModalOpen(true)}
                className="flex items-center gap-1 text-[#423D33] hover:text-black font-semibold cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Swap</span>
              </button>
              <button
                onClick={() =>
                  alert(`Downloaded 4K presentation asset for ${businessName}!`)
                }
                className="p-1 rounded-lg text-[#8C8477] hover:text-black cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* 4th Card: Custom Studio Canvas / Upload trigger */}
        <div className="bg-[#FAF7F2] rounded-3xl p-5 border-2 border-dashed border-[#D9D0C1] flex flex-col justify-between hover:border-amber-400 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#18191E]">
                Custom Studio Canvas
              </span>
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: selectedColor.hex }}
              />
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EDE8DF] text-center flex flex-col items-center justify-center my-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="font-bold text-xs text-[#18191E]">
                Drop Custom Screen Here
              </p>
              <p className="text-[10px] text-[#8C8477] mt-1 mb-3">
                Render with real glass reflection & device bezel
              </p>
              <button
                onClick={() => setIsCustomizeModalOpen(true)}
                className="px-4 py-1.5 rounded-xl bg-[#141518] hover:bg-black text-white text-xs font-semibold cursor-pointer shadow-xs"
              >
                Customize & Add Templates
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#EAE4D7] text-xs">
            <span className="text-[#6E6759] font-semibold">
              + {TEMPLATE_LIBRARY.length} Templates Total
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Ready
            </span>
          </div>
        </div>
      </div>

      {/* Popular Mockup Formats Supported Banner */}
      <div className="bg-white rounded-3xl p-6 border border-[#EDE8DF] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#18191E]">
              Popular Mockup Formats Supported
            </h3>
            <p className="text-xs text-[#7A746B]">
              iPhone & Laptop presentation, 3D Merchandise renders, Pitch Deck
              Cover, and WhatsApp interactive cards.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCustomizeModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#DDD6C8] text-xs font-bold text-[#18191E] cursor-pointer"
        >
          Configure New Preset
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. CUSTOMIZE BRANDING POPUP MODAL (As requested by User) */}
      {/* ========================================================================= */}
      {isCustomizeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-5 px-6 border-b border-[#F0EBE1] bg-[#FAF7F2] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F5A623] text-[#121316] flex items-center justify-center font-bold shadow-xs">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#18191E]">
                    Customize Company Branding
                  </h3>
                  <p className="text-xs text-[#7A746B] mt-0.5">
                    Enter company details and choose mockup templates to
                    generate bespoke pitch collateral.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCustomizeModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white hover:bg-stone-100 text-stone-500 border border-[#DDD6C8] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Section 1: Company Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#18191E] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="font-extrabold text-sm text-[#18191E]">
                    Company Details
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-[#18191E] block mb-1">
                      Company / Business Name *
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Apex Commerce, Solara Cloud..."
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] text-[#18191E] font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#18191E] block mb-1">
                      Website / Domain URL
                    </label>
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="e.g. apexcommerce.cc"
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] text-[#18191E] font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#18191E] block mb-1">
                      Industry / Niche
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] text-[#18191E] font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="E-commerce / Retail">
                        E-commerce / DTC Brands
                      </option>
                      <option value="B2B SaaS / Cloud">
                        B2B SaaS & Cloud Automation
                      </option>
                      <option value="FinTech / Payments">
                        FinTech & Payments
                      </option>
                      <option value="Healthcare & Medical">
                        Healthcare & Dental Clinics
                      </option>
                      <option value="Real Estate & Property">
                        Real Estate & Commercial Brokerages
                      </option>
                      <option value="Design & Creative Agency">
                        Creative & Growth Agency
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#18191E] block mb-1">
                      Pitch Tagline / Hook
                    </label>
                    <input
                      type="text"
                      value={brandTagline}
                      onChange={(e) => setBrandTagline(e.target.value)}
                      placeholder="e.g. Next-gen AI Revenue Infrastructure"
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] text-[#18191E] font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Brand Color Theme Selection */}
                <div>
                  <label className="font-bold text-[#18191E] block mb-2 text-xs">
                    Brand Accent Color Palette
                  </label>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {COLOR_PALETTES.map((palette) => {
                      const isSelected = selectedColor.name === palette.name;
                      return (
                        <button
                          key={palette.name}
                          type="button"
                          onClick={() => setSelectedColor(palette)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${isSelected ? "bg-white border-[#18191E] shadow-xs ring-2 ring-amber-400/50 text-[#18191E]" : "bg-[#FAF7F2] border-[#DDD6C8] text-[#554F44] hover:bg-white"}`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full shadow-2xs"
                            style={{ backgroundColor: palette.hex }}
                          />
                          <span>{palette.name}</span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#18191E]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Section 2: Mockup Templates Selection */}
              <div className="space-y-4 pt-4 border-t border-[#F0EBE1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#18191E] text-white text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h4 className="font-extrabold text-sm text-[#18191E]">
                      Choose Mockup Templates
                    </h4>
                  </div>

                  <button
                    onClick={handleSelectAllTemplates}
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg cursor-pointer"
                  >
                    {selectedTemplateIds.length === TEMPLATE_LIBRARY.length
                      ? "Deselect Extra"
                      : `Select All (${TEMPLATE_LIBRARY.length})`}
                  </button>
                </div>
                <p className="text-xs text-[#7A746B]">
                  Select the device frames and physical mockups you want
                  generated for {businessName}.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  {TEMPLATE_LIBRARY.map((tpl) => {
                    const isSelected = selectedTemplateIds.includes(tpl.id);
                    return (
                      <div
                        key={tpl.id}
                        onClick={() => toggleTemplateSelection(tpl.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${isSelected ? "bg-amber-50/60 border-amber-400 shadow-xs ring-1 ring-amber-300" : "bg-white border-[#EDE8DF] hover:bg-[#FAF7F2]"}`}
                      >
                        <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-stone-100">
                          <img
                            src={tpl.image}
                            alt={tpl.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-white transition-all ${isSelected ? "bg-amber-500 shadow-xs" : "bg-black/40"}`}
                            >
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="font-bold text-xs text-[#18191E] line-clamp-1">
                            {tpl.name}
                          </p>
                          <span className="text-[10px] font-mono text-[#8C8477]">
                            {tpl.deviceLabel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer: Prominent Action Button */}
            <div className="p-4 px-6 border-t border-[#F0EBE1] bg-[#FAF7F2] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#7A746B]">
                <span className="font-bold text-[#18191E]">
                  {selectedTemplateIds.length}
                </span>{" "}
                templates selected for{" "}
                <span className="font-semibold text-[#18191E]">
                  {businessName}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsCustomizeModalOpen(false)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-[#DDD6C8] text-xs font-semibold text-[#18191E] transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                {/* Crucial button specifically requested: "Branding Dekhaiye All" */}
                <button
                  onClick={handleShowAllBranding}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09816] text-[#121316] text-xs font-extrabold shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 fill-[#121316]" />
                  <span>
                    Branding Dekhaiye All ({selectedTemplateIds.length} Mockups)
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SHOW ALL BRANDING FULL GALLERY MODAL */}
      {/* ========================================================================= */}
      {isShowAllModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-6xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#EDE8DF] overflow-hidden flex flex-col max-h-[94vh]">
            {/* Gallery Top Navigation Header */}
            <div className="p-5 px-6 border-b border-[#EDE8DF] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl text-black font-extrabold text-sm flex items-center justify-center shadow-md"
                  style={{ backgroundColor: selectedColor.hex }}
                >
                  {logoInitials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-[#18191E]">
                      {businessName} — Complete Brand Mockups Suite
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      {selectedTemplateIds.length} Rendered Assets
                    </span>
                  </div>
                  <p className="text-xs text-[#7A746B] mt-0.5 font-mono">
                    {domain} • {industry} • {brandTagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    setIsShowAllModalOpen(false);
                    setIsCustomizeModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-[#DDD6C8] text-xs font-bold text-[#18191E] cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  <span>Edit Details</span>
                </button>

                <button
                  onClick={() =>
                    alert(
                      `Downloaded all ${selectedTemplateIds.length} 4K branding assets (.ZIP) for ${businessName}!`,
                    )
                  }
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F5A623] hover:bg-[#E09816] text-[#121316] text-xs font-extrabold shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download All 4K Assets</span>
                </button>

                <button
                  onClick={() => setIsShowAllModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white hover:bg-stone-100 text-stone-500 border border-[#DDD6C8] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Gallery Renders Grid */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeMockups.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="bg-white rounded-3xl p-5 border border-[#EDE8DF] shadow-xs flex flex-col justify-between hover:shadow-lg transition-all group"
                  >
                    <div>
                      {/* Card Brand Header */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#F5F2EB]">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-md text-black font-extrabold text-[10px] flex items-center justify-center"
                            style={{ backgroundColor: selectedColor.hex }}
                          >
                            {logoInitials}
                          </div>
                          <div>
                            <p className="font-bold text-xs text-[#18191E]">
                              {businessName}
                            </p>
                            <p className="text-[10px] text-[#7A746B]">
                              {domain}
                            </p>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF7F2] text-[#696152] border border-[#EDE8DF]">
                          {tpl.category}
                        </span>
                      </div>

                      {/* Mockup Canvas */}
                      <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-3 bg-stone-900 border border-stone-200">
                        <img
                          src={tpl.image}
                          alt={tpl.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Branded Overlay Badge */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-mono flex items-center gap-1.5 border border-white/10">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: selectedColor.hex }}
                          />
                          <span>{tpl.deviceLabel}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#7A746B] leading-relaxed mb-3">
                        {tpl.description}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#F5F2EB] text-xs">
                      <button
                        onClick={() => handleOpenSinglePreview(tpl)}
                        className="flex items-center gap-1.5 text-[#18191E] font-bold hover:text-amber-600 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Interactive 3D View</span>
                      </button>

                      <button
                        onClick={() =>
                          alert(
                            `Downloaded high-res ${tpl.name} for ${businessName}!`,
                          )
                        }
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#DDD6C8] font-bold text-[#18191E] cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Bottom Bar */}
            <div className="p-4 px-6 border-t border-[#EDE8DF] bg-white flex items-center justify-between text-xs text-[#7A746B]">
              <span>
                Generated with Lead Evo Pro Branding Engine • 300 DPI Print &
                Pitch Ready
              </span>
              <button
                onClick={() => setIsShowAllModalOpen(false)}
                className="font-bold text-[#18191E] hover:underline cursor-pointer"
              >
                Close Gallery View ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SINGLE MOCKUP PREVIEW MODAL */}
      {/* ========================================================================= */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1]">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl text-black font-extrabold text-xs flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: selectedColor.hex }}
                >
                  {logoInitials}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#18191E]">
                    {activePreviewData?.name ||
                      activePreviewData?.title ||
                      businessName}
                  </h3>
                  <p className="text-xs text-[#7A746B]">
                    Format:{" "}
                    {activePreviewData?.deviceLabel ||
                      activePreviewData?.type ||
                      "Studio Mockup"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left: Interactive 3D Render Screen */}
              <div className="md:col-span-7 bg-[#141518] rounded-2xl p-6 text-white flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 w-full max-w-sm rounded-2xl bg-gradient-to-tr from-[#1E2026] to-[#2B2D35] p-6 border border-white/10 shadow-2xl text-center">
                  <div
                    className="w-12 h-12 rounded-2xl text-black font-extrabold flex items-center justify-center mx-auto mb-3 text-lg shadow-lg"
                    style={{ backgroundColor: selectedColor.hex }}
                  >
                    {logoInitials}
                  </div>
                  <h4 className="text-xl font-extrabold text-white">
                    {businessName}
                  </h4>
                  <p className="text-xs text-amber-300 font-mono mt-1">
                    {brandTagline}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{domain}</p>
                  <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] text-gray-300">
                    High-Converting Pitch Collateral • Generated via Lead Evo
                    Pro
                  </div>
                </div>
              </div>

              {/* Right: Customization Controls */}
              <div className="md:col-span-5 space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#18191E] block mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] text-[#18191E] font-medium focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#18191E] block mb-1">
                    Pitch Tagline / Hook
                  </label>
                  <input
                    type="text"
                    value={brandTagline}
                    onChange={(e) => setBrandTagline(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] text-[#18191E] font-medium focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#18191E] block mb-1">
                    Website Domain
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD6C8] text-[#18191E] font-medium focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="pt-4 border-t border-[#F0EBE1] flex items-center gap-3">
                  <button
                    onClick={() => {
                      alert(`Exported 4K mockup for ${businessName}!`);
                      setPreviewModalOpen(false);
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#F5A623] hover:bg-[#E09816] text-[#121316] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Mockup</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://leadevo.io/mockup/${businessName.toLowerCase()}`,
                      );
                      alert("Pitch mockup link copied to clipboard!");
                    }}
                    className="p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#DDD6C8] text-[#18191E] cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
