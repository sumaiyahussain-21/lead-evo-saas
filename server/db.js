import mongoose from "mongoose";

const INITIAL_USER = {
  id: "usr_elena_01",
  name: "Elena Rostova",
  email: "elena.rostova@leadevo.io",
  role: "Revenue Director",
  company: "Lead Evo Enterprise",
  avatarUrl:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90",
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

function generateInitialLeads() {
  const baseLeads = [
    {
      id: "lead_001",
      name: "Marcus Thorne",
      email: "marcus.t@apexcommerce.io",
      role: "VP Growth",
      company: "Apex Commerce",
      industry: "E-commerce",
      employees: 140,
      phone: "+1 (415) 892-0419",
      whatsappVerified: true,
      intentScore: 94,
      matchScore: 97.2,
      pipelineStage: "Ready to Pitch",
      arrPotential: 14500,
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://apexcommerce.io",
      tags: ["High Intent", "E-commerce", "Tier 1"],
      lastOutreach: "Ready for batch WhatsApp pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_002",
      name: "Clara Weber",
      email: "clara@solaracloud.de",
      role: "CMO",
      company: "Solara Cloud",
      industry: "SaaS / Cloud",
      employees: 310,
      phone: "+49 (30) 9123-5810",
      whatsappVerified: true,
      intentScore: 88,
      matchScore: 92.5,
      pipelineStage: "In Sequence",
      arrPotential: 18e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://solaracloud.de",
      tags: ["SaaS", "Cloud", "Mid-Market"],
      lastOutreach: "In Sequence (Day 3)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_003",
      name: "David Vance",
      email: "dvance@hyperflow.ai",
      role: "Head of Sales Ops",
      company: "HyperFlow AI",
      industry: "AI & Automation",
      employees: 85,
      phone: "+1 (512) 749-3012",
      whatsappVerified: true,
      intentScore: 91,
      matchScore: 95.8,
      pipelineStage: "Replied (Warm)",
      arrPotential: 9200,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://hyperflow.ai",
      tags: ["AI Tech", "Warm Lead", "WhatsApp Active"],
      lastOutreach: 'Replied 12m ago: "Sounds promising, share demo"',
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_004",
      name: "Sarah Lin",
      email: "sarah@craftlab.design",
      role: "Founder",
      company: "CraftLab Studio",
      industry: "Product Design",
      employees: 24,
      phone: "+1 (206) 555-0182",
      whatsappVerified: false,
      intentScore: 76,
      matchScore: 81,
      pipelineStage: "Enriched",
      arrPotential: 5600,
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://craftlab.design",
      tags: ["Design Agency", "Enriched"],
      lastOutreach: "Lead Enriched via Claude 3.5",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_005",
      name: "Julian Croft",
      email: "j.croft@vanguardrealty.co",
      role: "Partner",
      company: "Vanguard Realty",
      industry: "Real Estate",
      employees: 210,
      phone: "+1 (312) 402-9981",
      whatsappVerified: true,
      intentScore: 82,
      matchScore: 88,
      pipelineStage: "Booked Call",
      arrPotential: 7500,
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://vanguardrealty.co",
      tags: ["Real Estate", "Booked Call"],
      lastOutreach: "Booked demo sync on Sep 24",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_006",
      name: "Alex Carter",
      email: "alex.c@stripepartners.io",
      role: "VP Sales",
      company: "Stripe Partner Network",
      industry: "FinTech / Payments",
      employees: 480,
      phone: "+1 (415) 309-8812",
      whatsappVerified: true,
      intentScore: 98,
      matchScore: 98.4,
      pipelineStage: "Ready to Pitch",
      arrPotential: 12450,
      avatarUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop&crop=faces,top&q=90",
      websiteUrl: "https://stripepartners.io",
      tags: ["Featured", "FinTech", "Ready to Close"],
      lastOutreach: "Enriched via Claude 3.5 \u2022 Ready to Close",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_007",
      name: "Devon Miller",
      email: "devon@apexmetric.com",
      role: "Head of Growth",
      company: "Apex Metric Labs",
      industry: "Analytics & BioTech",
      employees: 65,
      phone: "+1 (650) 843-2009",
      whatsappVerified: true,
      intentScore: 89,
      matchScore: 91.2,
      pipelineStage: "In Sequence",
      arrPotential: 8900,
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://apexmetric.com",
      tags: ["BioTech", "Queued"],
      lastOutreach: "In Queue for Batch WhatsApp Dispatch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_008",
      name: "Sofia Chen",
      email: "sofia@kinetixlogistics.com",
      role: "Director of Technology",
      company: "Kinetix Logistics",
      industry: "Supply Chain / Tech",
      employees: 180,
      phone: "+1 (212) 555-8910",
      whatsappVerified: true,
      intentScore: 93,
      matchScore: 94,
      pipelineStage: "In Sequence",
      arrPotential: 15200,
      avatarUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://kinetixlogistics.com",
      tags: ["Supply Chain", "Delivered"],
      lastOutreach: "Delivered WhatsApp overview",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 2 Leads
    {
      id: "lead_009",
      name: "Liam Gallagher",
      email: "liam@auracloud.co",
      role: "VP Infrastructure",
      company: "Aura Cloud Services",
      industry: "SaaS / Cloud",
      employees: 290,
      phone: "+1 (415) 672-1082",
      whatsappVerified: true,
      intentScore: 92,
      matchScore: 93.8,
      pipelineStage: "Ready to Pitch",
      arrPotential: 16800,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://auracloud.co",
      tags: ["SaaS", "Cloud", "High Intent"],
      lastOutreach: "Verified via LinkedIn sales navigator",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_010",
      name: "Natasha Roman",
      email: "natasha@veloxfashion.fr",
      role: "Head of Omnichannel",
      company: "Velox Apparel Group",
      industry: "E-commerce",
      employees: 410,
      phone: "+33 1 42 68 55 00",
      whatsappVerified: true,
      intentScore: 89,
      matchScore: 90.1,
      pipelineStage: "In Sequence",
      arrPotential: 22e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://veloxfashion.fr",
      tags: ["Fashion", "Shopify Plus"],
      lastOutreach: "In Sequence (Day 2)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_011",
      name: "Carlos Mendoza",
      email: "carlos@fintechscale.mx",
      role: "Managing Director",
      company: "FinTech Scale LatAm",
      industry: "FinTech",
      employees: 160,
      phone: "+52 55 4160 8821",
      whatsappVerified: true,
      intentScore: 95,
      matchScore: 96,
      pipelineStage: "Replied (Warm)",
      arrPotential: 19500,
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://fintechscale.mx",
      tags: ["FinTech", "Warm Reply", "High Value"],
      lastOutreach: 'Replied: "Send us the pricing deck for 10 seats"',
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_012",
      name: "Chloe Bennett",
      email: "chloe@solsticebotanicals.com",
      role: "Founder & CEO",
      company: "Solstice Botanicals",
      industry: "Health & Wellness",
      employees: 38,
      phone: "+1 (310) 902-4419",
      whatsappVerified: true,
      intentScore: 87,
      matchScore: 89.4,
      pipelineStage: "Booked Call",
      arrPotential: 8200,
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://solsticebotanicals.com",
      tags: ["Wellness", "DTC", "Booked"],
      lastOutreach: "Call confirmed for Thursday 2 PM",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_013",
      name: "Ethan Hunt",
      email: "ethan@synergycyber.io",
      role: "CISO",
      company: "Synergy Cyber Defense",
      industry: "Cybersecurity",
      employees: 520,
      phone: "+1 (202) 555-0199",
      whatsappVerified: true,
      intentScore: 96,
      matchScore: 97.5,
      pipelineStage: "Ready to Pitch",
      arrPotential: 34e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://synergycyber.io",
      tags: ["Enterprise", "Security", "Tier 1"],
      lastOutreach: "Lead scored and enriched",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 3 Leads
    {
      id: "lead_014",
      name: "Hannah Abbott",
      email: "hannah@dentalsmile.com",
      role: "Operations Director",
      company: "DentalSmile Pro Clinics",
      industry: "Healthcare",
      employees: 92,
      phone: "+1 (617) 555-0143",
      whatsappVerified: true,
      intentScore: 91,
      matchScore: 92,
      pipelineStage: "Ready to Pitch",
      arrPotential: 11e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://dentalsmile.com",
      tags: ["Healthcare", "Local Service"],
      lastOutreach: "Instant booking audit completed",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_015",
      name: "Oliver Queen",
      email: "oliver@arrowlogistics.com",
      role: "Chief Revenue Officer",
      company: "Arrow Global Logistics",
      industry: "Supply Chain",
      employees: 640,
      phone: "+1 (312) 555-0128",
      whatsappVerified: true,
      intentScore: 90,
      matchScore: 91.5,
      pipelineStage: "In Sequence",
      arrPotential: 26e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://arrowlogistics.com",
      tags: ["Enterprise", "Logistics"],
      lastOutreach: "In Sequence (Day 1)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_016",
      name: "Zoe Saldana",
      email: "zoe@nexushospitality.com",
      role: "VP Partnerships",
      company: "Nexus Hospitality Hub",
      industry: "Real Estate",
      employees: 180,
      phone: "+1 (702) 555-0192",
      whatsappVerified: true,
      intentScore: 84,
      matchScore: 86.2,
      pipelineStage: "Replied (Warm)",
      arrPotential: 14e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://nexushospitality.com",
      tags: ["Hospitality", "Real Estate"],
      lastOutreach: "Warm response on WhatsApp",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_017",
      name: "Kenji Sato",
      email: "kenji@tokyospeed.jp",
      role: "Head of E-Commerce",
      company: "Tokyo Speedwear",
      industry: "Retail & Fashion",
      employees: 230,
      phone: "+81 90 4123 9901",
      whatsappVerified: true,
      intentScore: 93,
      matchScore: 94.7,
      pipelineStage: "Ready to Pitch",
      arrPotential: 21e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://tokyospeed.jp",
      tags: ["E-commerce", "APAC", "Tier 1"],
      lastOutreach: "Speed audit completed (SEO: 98)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_018",
      name: "Amara Walker",
      email: "amara@bloomagency.io",
      role: "Agency Principal",
      company: "Bloom Growth Agency",
      industry: "Product Design",
      employees: 45,
      phone: "+1 (415) 555-0177",
      whatsappVerified: true,
      intentScore: 86,
      matchScore: 88,
      pipelineStage: "Booked Call",
      arrPotential: 9800,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://bloomagency.io",
      tags: ["Agency", "Booked Call"],
      lastOutreach: "Demo sync scheduled",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 4 Leads
    {
      id: "lead_019",
      name: "Gabriel Morales",
      email: "gabriel@hvacpro.io",
      role: "CEO",
      company: "HVAC Pro Solutions",
      industry: "Home Services",
      employees: 110,
      phone: "+1 (832) 555-0164",
      whatsappVerified: true,
      intentScore: 88,
      matchScore: 90.5,
      pipelineStage: "Ready to Pitch",
      arrPotential: 13500,
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://hvacpro.io",
      tags: ["Services", "Local", "High Demand"],
      lastOutreach: "Instant makeover pitch generated",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_020",
      name: "Rachel Green",
      email: "rachel@kinetixwear.io",
      role: "VP Brand Marketing",
      company: "Kinetix Athletic Wear",
      industry: "E-commerce",
      employees: 320,
      phone: "+1 (212) 555-0133",
      whatsappVerified: true,
      intentScore: 95,
      matchScore: 96.8,
      pipelineStage: "Ready to Pitch",
      arrPotential: 28e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://kinetixwear.io",
      tags: ["E-commerce", "Apparel", "High AOV"],
      lastOutreach: "Behance-level pitch ready",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 5 Leads
    {
      id: "lead_021",
      name: "Oliver Sterling",
      email: "oliver@sterlingwealth.co.uk",
      role: "Managing Partner",
      company: "Sterling Private Wealth",
      industry: "FinTech",
      employees: 95,
      phone: "+44 20 7946 0912",
      whatsappVerified: true,
      intentScore: 92,
      matchScore: 95.1,
      pipelineStage: "Ready to Pitch",
      arrPotential: 26e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://sterlingwealth.co.uk",
      tags: ["FinTech", "UK", "High ARR"],
      lastOutreach: "Ready for batch WhatsApp pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_022",
      name: "Freja Lindqvist",
      email: "freja@nordicdesignhub.se",
      role: "Design Director",
      company: "Nordic Design Collective",
      industry: "Product Design",
      employees: 60,
      phone: "+46 8 123 4567",
      whatsappVerified: true,
      intentScore: 89,
      matchScore: 91,
      pipelineStage: "In Sequence",
      arrPotential: 15500,
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://nordicdesignhub.se",
      tags: ["Design", "Nordics", "High Intent"],
      lastOutreach: "In Sequence (Day 2)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_023",
      name: "Mateo Rossi",
      email: "mateo@milanoluxury.it",
      role: "Chief Commercial Officer",
      company: "Milano Leatherworks",
      industry: "Retail & Fashion",
      employees: 180,
      phone: "+39 02 8901 2345",
      whatsappVerified: true,
      intentScore: 94,
      matchScore: 96.5,
      pipelineStage: "Ready to Pitch",
      arrPotential: 24e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://milanoluxury.it",
      tags: ["Luxury", "Fashion", "Verified WA"],
      lastOutreach: "Brand creator mockups dispatched",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_024",
      name: "Zoe Kravitz",
      email: "zoe@zenithsaas.io",
      role: "VP Marketing",
      company: "Zenith Cloud Ops",
      industry: "SaaS / Cloud",
      employees: 210,
      phone: "+1 (415) 555-0199",
      whatsappVerified: true,
      intentScore: 91,
      matchScore: 93.4,
      pipelineStage: "Replied (Warm)",
      arrPotential: 19e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://zenithsaas.io",
      tags: ["SaaS", "Warm Lead", "Enterprise"],
      lastOutreach: 'Replied: "Send us the deck"',
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_025",
      name: "Tariq Al-Mansoor",
      email: "tariq@gulfrealty.ae",
      role: "Executive Director",
      company: "Gulf Horizon Properties",
      industry: "Real Estate",
      employees: 280,
      phone: "+971 4 368 9900",
      whatsappVerified: true,
      intentScore: 96,
      matchScore: 98,
      pipelineStage: "Booked Call",
      arrPotential: 35e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://gulfrealty.ae",
      tags: ["Real Estate", "Dubai", "VIP Client"],
      lastOutreach: "Google Meet sync confirmed for Thursday",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 6 Leads
    {
      id: "lead_026",
      name: "Chloe Dupont",
      email: "chloe@atelierlumiere.fr",
      role: "Founder",
      company: "Atelier Lumi\xE8re",
      industry: "Product Design",
      employees: 35,
      phone: "+33 1 42 68 99 22",
      whatsappVerified: true,
      intentScore: 88,
      matchScore: 90.2,
      pipelineStage: "Ready to Pitch",
      arrPotential: 12500,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://atelierlumiere.fr",
      tags: ["Design", "France", "High Intent"],
      lastOutreach: "Ready for pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_027",
      name: "Vikram Sethi",
      email: "vikram@cloudscale.in",
      role: "CTO",
      company: "CloudScale Infrastructure",
      industry: "SaaS / Cloud",
      employees: 450,
      phone: "+91 98200 12345",
      whatsappVerified: true,
      intentScore: 93,
      matchScore: 95.8,
      pipelineStage: "In Sequence",
      arrPotential: 22e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://cloudscale.in",
      tags: ["Cloud", "DevOps", "High Intent"],
      lastOutreach: "In Sequence (Day 4)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_028",
      name: "Evelyn Brooks",
      email: "evelyn@solarcare.org",
      role: "VP Operations",
      company: "SolarCare Energy Solutions",
      industry: "CleanTech",
      employees: 140,
      phone: "+1 (303) 555-0188",
      whatsappVerified: true,
      intentScore: 87,
      matchScore: 89.6,
      pipelineStage: "Ready to Pitch",
      arrPotential: 16e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://solarcare.org",
      tags: ["Energy", "High Intent"],
      lastOutreach: "Ready for batch pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_029",
      name: "Liam O\u2019Connor",
      email: "liam@dublinlogistics.ie",
      role: "Managing Director",
      company: "Dublin Freight & Logistics",
      industry: "Logistics",
      employees: 320,
      phone: "+353 1 496 0123",
      whatsappVerified: true,
      intentScore: 90,
      matchScore: 92.5,
      pipelineStage: "Replied (Warm)",
      arrPotential: 21500,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://dublinlogistics.ie",
      tags: ["Logistics", "Ireland", "Warm Reply"],
      lastOutreach: "Replied 1 hour ago",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_030",
      name: "Samantha Wu",
      email: "sam@omnicommerce.sg",
      role: "Head of Growth",
      company: "Omni Commerce APAC",
      industry: "E-commerce",
      employees: 190,
      phone: "+65 6789 0123",
      whatsappVerified: true,
      intentScore: 95,
      matchScore: 97.2,
      pipelineStage: "Booked Call",
      arrPotential: 27e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://omnicommerce.sg",
      tags: ["E-commerce", "Singapore", "Tier 1"],
      lastOutreach: "Demo confirmed for Friday",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 7 Leads
    {
      id: "lead_031",
      name: "Noah Van Der Bilt",
      email: "noah@amsterdamfin.nl",
      role: "Partner",
      company: "Amsterdam Capital Partners",
      industry: "FinTech",
      employees: 80,
      phone: "+31 20 555 1234",
      whatsappVerified: true,
      intentScore: 92,
      matchScore: 94,
      pipelineStage: "Ready to Pitch",
      arrPotential: 23e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://amsterdamfin.nl",
      tags: ["FinTech", "Benelux", "High ARR"],
      lastOutreach: "Ready for batch WhatsApp pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_032",
      name: "Maya Angelis",
      email: "maya@athensaesthetic.gr",
      role: "Founder & CEO",
      company: "Athens Luxury Aesthetic",
      industry: "Health & Wellness",
      employees: 42,
      phone: "+30 210 361 9900",
      whatsappVerified: true,
      intentScore: 86,
      matchScore: 88.5,
      pipelineStage: "Ready to Pitch",
      arrPotential: 14e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://athensaesthetic.gr",
      tags: ["Healthcare", "High Intent"],
      lastOutreach: "Enriched via AI Receptionist",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_033",
      name: "Alexander Schmidt",
      email: "alex@berlindata.de",
      role: "VP AI Solutions",
      company: "Berlin Data Works",
      industry: "AI & Automation",
      employees: 125,
      phone: "+49 30 8899 0011",
      whatsappVerified: true,
      intentScore: 94,
      matchScore: 96,
      pipelineStage: "Ready to Pitch",
      arrPotential: 25e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://berlindata.de",
      tags: ["AI Tech", "Germany", "High Intent"],
      lastOutreach: "Ready for outreach blast",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_034",
      name: "Isabella Rocha",
      email: "isabella@saopauloretail.br",
      role: "Chief Merchandising Officer",
      company: "S\xE3o Paulo Apparel Labs",
      industry: "Retail & Fashion",
      employees: 290,
      phone: "+55 11 98765 4321",
      whatsappVerified: true,
      intentScore: 90,
      matchScore: 92.8,
      pipelineStage: "In Sequence",
      arrPotential: 18500,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://saopauloretail.br",
      tags: ["Fashion", "LatAm", "Active Sequence"],
      lastOutreach: "In Sequence (Day 3)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_035",
      name: "Lucas King",
      email: "lucas@sydneymedtech.com.au",
      role: "Managing Director",
      company: "Sydney MedTech Innovations",
      industry: "Healthcare",
      employees: 175,
      phone: "+61 2 9876 5432",
      whatsappVerified: true,
      intentScore: 93,
      matchScore: 95,
      pipelineStage: "Ready to Pitch",
      arrPotential: 26500,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://sydneymedtech.com.au",
      tags: ["Healthcare", "Australia", "High Intent"],
      lastOutreach: "Ready for batch pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
  ];
  return baseLeads;
}

const INITIAL_AUDITS = [
  {
    id: "audit_001",
    url: "https://jpvapes.jp/brand/vgod",
    targetType: "homepage",
    seoScore: 100,
    speedScore: 74,
    accessibilityScore: 95,
    bestPracticesScore: 100,
    status: "Completed",
    metrics: {
      lcp: "1.4s",
      fid: "18ms",
      cls: "0.02",
      mobileScore: 82,
      issuesFound: 3,
    },
    scannedAt: "1 min ago",
  },
  {
    id: "audit_002",
    url: "https://apexcommerce.io",
    targetType: "batch",
    seoScore: 94,
    speedScore: 81,
    accessibilityScore: 92,
    bestPracticesScore: 96,
    status: "Completed",
    metrics: {
      lcp: "1.1s",
      fid: "12ms",
      cls: "0.01",
      mobileScore: 89,
      issuesFound: 2,
    },
    scannedAt: "5 min ago",
  },
];

const INITIAL_MEETINGS = [
  {
    id: "mtg_001",
    leadId: "lead_006",
    leadName: "Alex Carter",
    leadCompany: "Enterprise FinTech Lead",
    leadAvatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop&crop=faces,top&q=90",
    hostName: "Elena Rostova",
    hostRole: "Revenue Director",
    date: "2024-09-24",
    time: "09:00 am",
    duration: "45m",
    timezone: "EST Timezone",
    meetingType: "Discovery Sync",
    meetUrl: "https://meet.google.com/evo-lead-sync",
    status: "Scheduled",
  },
  {
    id: "mtg_002",
    leadId: "lead_001",
    leadName: "Marcus Thorne",
    leadCompany: "Apex Commerce",
    leadAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
    hostName: "Elena Rostova",
    hostRole: "Revenue Director",
    date: "2024-09-24",
    time: "11:00 am",
    duration: "30m",
    timezone: "EST Timezone",
    meetingType: "AI Receptionist Qualification",
    meetUrl: "https://meet.google.com/evo-qualification",
    status: "Scheduled",
  },
];

const INITIAL_ACTIVITIES = [
  {
    id: "act_001",
    type: "outreach_sent",
    title: "Batch WhatsApp Campaign Dispatched",
    description:
      "14 high-intent prospects reached with custom video pitch and audit link",
    timestamp: "Just now",
  },
  {
    id: "act_002",
    type: "reply_received",
    title: "Warm Reply from David Vance (HyperFlow AI)",
    description: '"Sounds promising, share demo link for our sales ops team"',
    timestamp: "12m ago",
    leadId: "lead_003",
  },
  {
    id: "act_003",
    type: "meeting_booked",
    title: "Discovery Meeting Scheduled",
    description: "Julian Croft confirmed Sep 24 10:15 AM EST walkthrough",
    timestamp: "42m ago",
    leadId: "lead_005",
  },
  {
    id: "act_004",
    type: "audit_run",
    title: "Instant SEO Audit Completed",
    description: "Scored 100 SEO & 95 Accessibility for jpvapes.jp/brand/vgod",
    timestamp: "1h ago",
  },
];

const LeadSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "Decision Maker" },
  company: { type: String, required: true },
  industry: { type: String, default: "General" },
  employees: { type: Number, default: 50 },
  phone: { type: String, required: true },
  whatsappVerified: { type: Boolean, default: true },
  intentScore: { type: Number, default: 85 },
  matchScore: { type: Number, default: 90 },
  pipelineStage: { type: String, default: "Ready to Pitch" },
  arrPotential: { type: Number, default: 1e4 },
  avatarUrl: String,
  websiteUrl: String,
  tags: [String],
  lastOutreach: String,
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: String,
  company: String,
  avatarUrl: String,
});

export class DatabaseManager {
  static instance;
  isAtlasConnected = false;
  currentUri = process.env.MONGODB_URI || "";
  clusterName = "cluster0.mongodb.net";
  dbName = "lead_evo";

  // In-Memory store keeping state completely in sync
  leads = generateInitialLeads();
  users = [INITIAL_USER];
  audits = [...INITIAL_AUDITS];
  meetings = [...INITIAL_MEETINGS];
  activities = [...INITIAL_ACTIVITIES];
  outreachMessages = [];
  LeadModel = null;
  UserModel = null;

  constructor() {
    this.attemptAtlasConnection();
  }

  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async attemptAtlasConnection(customUri) {
    const uri = customUri || this.currentUri;
    if (!uri || !uri.trim()) {
      this.isAtlasConnected = false;
      return {
        success: false,
        message:
          "No MongoDB Atlas URI configured yet. Operating on high-speed In-Memory Resilient Store.",
      };
    }
    try {
      this.currentUri = uri;
      const clusterMatch = uri.match(/@([^/?]+)/);
      if (clusterMatch && clusterMatch[1]) {
        this.clusterName = clusterMatch[1];
      }
      await mongoose.disconnect();
      await mongoose.connect(uri, {
        dbName: this.dbName,
        serverSelectionTimeoutMS: 4e3,
      });
      this.isAtlasConnected = true;
      if (!this.LeadModel) {
        this.LeadModel =
          mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
        this.UserModel =
          mongoose.models.User || mongoose.model("User", UserSchema);
      }
      const count = await this.LeadModel.countDocuments();
      if (count === 0) {
        await this.LeadModel.insertMany(this.leads);
      }
      return {
        success: true,
        message: `Connected securely to MongoDB Atlas cluster: ${this.clusterName}`,
      };
    } catch (err) {
      this.isAtlasConnected = false;
      console.warn(
        "MongoDB Atlas connection attempt finished with fallback:",
        err.message || err,
      );
      return {
        success: false,
        message: `Atlas connection check: ${err.message || "Timeout / network"}. Active fallback store running seamlessly.`,
      };
    }
  }

  getStatus() {
    return {
      connected: this.isAtlasConnected,
      cluster: this.isAtlasConnected
        ? this.clusterName
        : "local.memory-cluster (Atlas Ready)",
      database: this.dbName,
      mode: this.isAtlasConnected
        ? "Atlas Cloud"
        : "Embedded In-Memory Resilient Store",
      latencyMs: this.isAtlasConnected ? 42 : 1.2,
      collections: {
        leads: this.leads.length,
        users: this.users.length,
        audits: this.audits.length,
        meetings: this.meetings.length,
        outreach: this.outreachMessages.length,
      },
      lastChecked: /* @__PURE__ */ new Date().toLocaleTimeString(),
      uriConfigured: Boolean(
        this.currentUri && this.currentUri.trim().length > 0,
      ),
    };
  }

  // Leads CRUD
  async getLeads(query) {
    let result = [...this.leads];
    if (query?.search) {
      const q = query.search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.role.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q),
      );
    }
    if (
      query?.status &&
      query.status !== "All" &&
      query.status !== "All Statuses"
    ) {
      result = result.filter(
        (l) => l.pipelineStage.toLowerCase() === query.status?.toLowerCase(),
      );
    }
    if (
      query?.verifiedWA === "true" ||
      query?.verifiedWA === "Verified WA Only"
    ) {
      result = result.filter((l) => l.whatsappVerified);
    }
    if (
      query?.industry &&
      query.industry !== "All" &&
      query.industry !== "All Industries"
    ) {
      result = result.filter((l) =>
        l.industry.toLowerCase().includes(query.industry.toLowerCase()),
      );
    }
    return result;
  }

  async getLeadById(id) {
    return this.leads.find((l) => l.id === id);
  }

  async createLead(leadData) {
    const newLead = {
      id:
        leadData.id ||
        `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: leadData.name || "New Prospect",
      email: leadData.email || "lead@example.com",
      role: leadData.role || "Decision Maker",
      company: leadData.company || "Enterprise Co.",
      industry: leadData.industry || "Tech",
      employees: leadData.employees || 50,
      phone: leadData.phone || "+1 (555) 000-0000",
      whatsappVerified: leadData.whatsappVerified ?? true,
      intentScore: leadData.intentScore || Math.floor(Math.random() * 20 + 80),
      matchScore: leadData.matchScore || Math.floor(Math.random() * 15 + 85),
      pipelineStage: leadData.pipelineStage || "Ready to Pitch",
      arrPotential: leadData.arrPotential || 12e3,
      avatarUrl:
        leadData.avatarUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      websiteUrl:
        leadData.websiteUrl ||
        `https://${(leadData.company || "company").toLowerCase().replace(/\s+/g, "")}.com`,
      tags: leadData.tags || ["Inbound", "Verified"],
      lastOutreach: "Created in Lead Evo",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    this.addActivity({
      type: "lead_enriched",
      title: `New Lead Added: ${newLead.name}`,
      description: `${newLead.company} (${newLead.role}) added with ${newLead.intentScore}% Intent score`,
      leadId: newLead.id,
    });
    if (this.isAtlasConnected && this.LeadModel) {
      try {
        await this.LeadModel.create(newLead);
      } catch (err) {
        console.warn("Atlas lead sync failed:", err);
      }
    }
    return newLead;
  }

  async updateLead(id, updates) {
    const index = this.leads.findIndex((l) => l.id === id);
    if (index === -1) return void 0;
    this.leads[index] = { ...this.leads[index], ...updates };
    if (this.isAtlasConnected && this.LeadModel) {
      try {
        await this.LeadModel.findOneAndUpdate({ id }, updates);
      } catch (err) {
        console.warn("Atlas lead update sync failed:", err);
      }
    }
    return this.leads[index];
  }

  async deleteLead(id) {
    const index = this.leads.findIndex((l) => l.id === id);
    if (index === -1) return false;
    this.leads.splice(index, 1);
    if (this.isAtlasConnected && this.LeadModel) {
      try {
        await this.LeadModel.deleteOne({ id });
      } catch (err) {
        console.warn("Atlas lead delete sync failed:", err);
      }
    }
    return true;
  }

  // Batch WhatsApp Dispatch
  async dispatchWhatsAppBlast(params) {
    const targets = this.leads.filter((l) => params.leadIds.includes(l.id));
    for (const lead of targets) {
      lead.pipelineStage = "In Sequence";
      lead.lastOutreach = `Dispatched WhatsApp pitch at ${/* @__PURE__ */ new Date().toLocaleTimeString()}`;
      this.outreachMessages.push({
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        leadId: lead.id,
        leadName: lead.name,
        company: lead.company,
        phone: lead.phone,
        channel: "WhatsApp",
        message: params.messageTemplate.replace(
          /\{\{first_name\}\}/g,
          lead.name.split(" ")[0],
        ),
        status: "Delivered",
        sentAt: /* @__PURE__ */ new Date().toISOString(),
      });
    }
    this.addActivity({
      type: "outreach_sent",
      title: `Batch WhatsApp Blast Dispatched (${targets.length} leads)`,
      description: `Sent personalized pitches to ${targets
        .map((t) => t.name)
        .slice(0, 3)
        .join(
          ", ",
        )}${targets.length > 3 ? ` and ${targets.length - 3} others` : ""}`,
    });
    return {
      dispatched: targets.length,
      queueTotal: this.outreachMessages.length,
    };
  }

  // SEO Audits: dynamic scores based on domain
  async getAudits() {
    return this.audits;
  }

  async runAudit(url, targetType = "homepage") {
    const cleanUrl = url.startsWith("http") ? url : `https://${url}`;
    let hash = 0;
    for (let i = 0; i < cleanUrl.length; i++) {
      hash = (hash << 5) - hash + cleanUrl.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);
    let seo = 88 + (absHash % 12);
    let speed = 68 + ((absHash >> 2) % 30);
    let accessibility = 86 + ((absHash >> 3) % 14);
    let bestPractices = 90 + ((absHash >> 4) % 10);
    if (cleanUrl.includes("jpvapes") || cleanUrl.includes("vgod")) {
      seo = 100;
      speed = 74;
      accessibility = 95;
      bestPractices = 100;
    }
    const newAudit = {
      id: `audit_${Date.now()}`,
      url: cleanUrl,
      targetType,
      seoScore: Math.min(100, seo),
      speedScore: Math.min(100, speed),
      accessibilityScore: Math.min(100, accessibility),
      bestPracticesScore: Math.min(100, bestPractices),
      status: "Completed",
      metrics: {
        lcp: `${(1.1 + (absHash % 10) / 10).toFixed(1)}s`,
        fid: `${10 + (absHash % 15)}ms`,
        cls: `0.0${1 + (absHash % 3)}`,
        mobileScore: Math.round((speed + accessibility) / 2),
        issuesFound: Math.max(1, Math.floor((100 - speed) / 6)),
      },
      scannedAt: "Just now",
    };
    this.audits.unshift(newAudit);
    this.addActivity({
      type: "audit_run",
      title: `SEO & Speed Audit: ${cleanUrl.replace(/https?:\/\//, "")}`,
      description: `Scored SEO: ${newAudit.seoScore}/100, Speed: ${newAudit.speedScore}/100, Core Web Vitals analyzed`,
    });
    return newAudit;
  }

  // Meetings
  async getMeetings() {
    return this.meetings;
  }

  async scheduleMeeting(meetingData) {
    const newMeeting = {
      id: `mtg_${Date.now()}`,
      leadId: meetingData.leadId || "lead_custom",
      leadName: meetingData.leadName || "VIP Client",
      leadCompany: meetingData.leadCompany || "Prospective Account",
      leadAvatar:
        meetingData.leadAvatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      hostName: "Elena Rostova",
      hostRole: "Revenue Director",
      date: meetingData.date || "2024-09-24",
      time: meetingData.time || "10:15 am",
      duration: meetingData.duration || "45m",
      timezone: meetingData.timezone || "EST Timezone",
      meetingType: meetingData.meetingType || "Discovery Sync",
      meetUrl:
        "https://meet.google.com/evo-" +
        Math.random().toString(36).substring(2, 8),
      status: "Scheduled",
    };
    this.meetings.unshift(newMeeting);
    if (meetingData.leadId) {
      await this.updateLead(meetingData.leadId, {
        pipelineStage: "Booked Call",
        lastOutreach: `Meeting booked for ${newMeeting.time} on ${newMeeting.date}`,
      });
    }
    this.addActivity({
      type: "meeting_booked",
      title: `Confirmed Meeting: ${newMeeting.leadName} (${newMeeting.leadCompany})`,
      description: `${newMeeting.meetingType} booked for ${newMeeting.time} on ${newMeeting.date} (${newMeeting.duration})`,
      leadId: newMeeting.leadId,
    });
    return newMeeting;
  }

  // Activities
  async getActivities() {
    return this.activities;
  }

  addActivity(act) {
    this.activities.unshift({
      id: `act_${Date.now()}`,
      timestamp: "Just now",
      ...act,
    });
    if (this.activities.length > 50) {
      this.activities.pop();
    }
  }

  // User
  getUser() {
    return this.users[0];
  }

  updateUser(userData) {
    this.users[0] = {
      ...this.users[0],
      ...userData,
    };
    return this.users[0];
  }
}

export const db = DatabaseManager.getInstance();
import mongoose from "mongoose";

const INITIAL_USER = {
  id: "usr_elena_01",
  name: "Elena Rostova",
  email: "elena.rostova@leadevo.io",
  role: "Revenue Director",
  company: "Lead Evo Enterprise",
  avatarUrl:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90",
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

function generateInitialLeads() {
  const baseLeads = [
    {
      id: "lead_001",
      name: "Marcus Thorne",
      email: "marcus.t@apexcommerce.io",
      role: "VP Growth",
      company: "Apex Commerce",
      industry: "E-commerce",
      employees: 140,
      phone: "+1 (415) 892-0419",
      whatsappVerified: true,
      intentScore: 94,
      matchScore: 97.2,
      pipelineStage: "Ready to Pitch",
      arrPotential: 14500,
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://apexcommerce.io",
      tags: ["High Intent", "E-commerce", "Tier 1"],
      lastOutreach: "Ready for batch WhatsApp pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_002",
      name: "Clara Weber",
      email: "clara@solaracloud.de",
      role: "CMO",
      company: "Solara Cloud",
      industry: "SaaS / Cloud",
      employees: 310,
      phone: "+49 (30) 9123-5810",
      whatsappVerified: true,
      intentScore: 88,
      matchScore: 92.5,
      pipelineStage: "In Sequence",
      arrPotential: 18e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://solaracloud.de",
      tags: ["SaaS", "Cloud", "Mid-Market"],
      lastOutreach: "In Sequence (Day 3)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_003",
      name: "David Vance",
      email: "dvance@hyperflow.ai",
      role: "Head of Sales Ops",
      company: "HyperFlow AI",
      industry: "AI & Automation",
      employees: 85,
      phone: "+1 (512) 749-3012",
      whatsappVerified: true,
      intentScore: 91,
      matchScore: 95.8,
      pipelineStage: "Replied (Warm)",
      arrPotential: 9200,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://hyperflow.ai",
      tags: ["AI Tech", "Warm Lead", "WhatsApp Active"],
      lastOutreach: 'Replied 12m ago: "Sounds promising, share demo"',
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_004",
      name: "Sarah Lin",
      email: "sarah@craftlab.design",
      role: "Founder",
      company: "CraftLab Studio",
      industry: "Product Design",
      employees: 24,
      phone: "+1 (206) 555-0182",
      whatsappVerified: false,
      intentScore: 76,
      matchScore: 81,
      pipelineStage: "Enriched",
      arrPotential: 5600,
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://craftlab.design",
      tags: ["Design Agency", "Enriched"],
      lastOutreach: "Lead Enriched via Claude 3.5",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_005",
      name: "Julian Croft",
      email: "j.croft@vanguardrealty.co",
      role: "Partner",
      company: "Vanguard Realty",
      industry: "Real Estate",
      employees: 210,
      phone: "+1 (312) 402-9981",
      whatsappVerified: true,
      intentScore: 82,
      matchScore: 88,
      pipelineStage: "Booked Call",
      arrPotential: 7500,
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://vanguardrealty.co",
      tags: ["Real Estate", "Booked Call"],
      lastOutreach: "Booked demo sync on Sep 24",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_006",
      name: "Alex Carter",
      email: "alex.c@stripepartners.io",
      role: "VP Sales",
      company: "Stripe Partner Network",
      industry: "FinTech / Payments",
      employees: 480,
      phone: "+1 (415) 309-8812",
      whatsappVerified: true,
      intentScore: 98,
      matchScore: 98.4,
      pipelineStage: "Ready to Pitch",
      arrPotential: 12450,
      avatarUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop&crop=faces,top&q=90",
      websiteUrl: "https://stripepartners.io",
      tags: ["Featured", "FinTech", "Ready to Close"],
      lastOutreach: "Enriched via Claude 3.5 \u2022 Ready to Close",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_007",
      name: "Devon Miller",
      email: "devon@apexmetric.com",
      role: "Head of Growth",
      company: "Apex Metric Labs",
      industry: "Analytics & BioTech",
      employees: 65,
      phone: "+1 (650) 843-2009",
      whatsappVerified: true,
      intentScore: 89,
      matchScore: 91.2,
      pipelineStage: "In Sequence",
      arrPotential: 8900,
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://apexmetric.com",
      tags: ["BioTech", "Queued"],
      lastOutreach: "In Queue for Batch WhatsApp Dispatch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_008",
      name: "Sofia Chen",
      email: "sofia@kinetixlogistics.com",
      role: "Director of Technology",
      company: "Kinetix Logistics",
      industry: "Supply Chain / Tech",
      employees: 180,
      phone: "+1 (212) 555-8910",
      whatsappVerified: true,
      intentScore: 93,
      matchScore: 94,
      pipelineStage: "In Sequence",
      arrPotential: 15200,
      avatarUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://kinetixlogistics.com",
      tags: ["Supply Chain", "Delivered"],
      lastOutreach: "Delivered WhatsApp overview",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 2 Leads
    {
      id: "lead_009",
      name: "Liam Gallagher",
      email: "liam@auracloud.co",
      role: "VP Infrastructure",
      company: "Aura Cloud Services",
      industry: "SaaS / Cloud",
      employees: 290,
      phone: "+1 (415) 672-1082",
      whatsappVerified: true,
      intentScore: 92,
      matchScore: 93.8,
      pipelineStage: "Ready to Pitch",
      arrPotential: 16800,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://auracloud.co",
      tags: ["SaaS", "Cloud", "High Intent"],
      lastOutreach: "Verified via LinkedIn sales navigator",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_010",
      name: "Natasha Roman",
      email: "natasha@veloxfashion.fr",
      role: "Head of Omnichannel",
      company: "Velox Apparel Group",
      industry: "E-commerce",
      employees: 410,
      phone: "+33 1 42 68 55 00",
      whatsappVerified: true,
      intentScore: 89,
      matchScore: 90.1,
      pipelineStage: "In Sequence",
      arrPotential: 22e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://veloxfashion.fr",
      tags: ["Fashion", "Shopify Plus"],
      lastOutreach: "In Sequence (Day 2)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_011",
      name: "Carlos Mendoza",
      email: "carlos@fintechscale.mx",
      role: "Managing Director",
      company: "FinTech Scale LatAm",
      industry: "FinTech",
      employees: 160,
      phone: "+52 55 4160 8821",
      whatsappVerified: true,
      intentScore: 95,
      matchScore: 96,
      pipelineStage: "Replied (Warm)",
      arrPotential: 19500,
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://fintechscale.mx",
      tags: ["FinTech", "Warm Reply", "High Value"],
      lastOutreach: 'Replied: "Send us the pricing deck for 10 seats"',
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_012",
      name: "Chloe Bennett",
      email: "chloe@solsticebotanicals.com",
      role: "Founder & CEO",
      company: "Solstice Botanicals",
      industry: "Health & Wellness",
      employees: 38,
      phone: "+1 (310) 902-4419",
      whatsappVerified: true,
      intentScore: 87,
      matchScore: 89.4,
      pipelineStage: "Booked Call",
      arrPotential: 8200,
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://solsticebotanicals.com",
      tags: ["Wellness", "DTC", "Booked"],
      lastOutreach: "Call confirmed for Thursday 2 PM",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_013",
      name: "Ethan Hunt",
      email: "ethan@synergycyber.io",
      role: "CISO",
      company: "Synergy Cyber Defense",
      industry: "Cybersecurity",
      employees: 520,
      phone: "+1 (202) 555-0199",
      whatsappVerified: true,
      intentScore: 96,
      matchScore: 97.5,
      pipelineStage: "Ready to Pitch",
      arrPotential: 34e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://synergycyber.io",
      tags: ["Enterprise", "Security", "Tier 1"],
      lastOutreach: "Lead scored and enriched",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 3 Leads
    {
      id: "lead_014",
      name: "Hannah Abbott",
      email: "hannah@dentalsmile.com",
      role: "Operations Director",
      company: "DentalSmile Pro Clinics",
      industry: "Healthcare",
      employees: 92,
      phone: "+1 (617) 555-0143",
      whatsappVerified: true,
      intentScore: 91,
      matchScore: 92,
      pipelineStage: "Ready to Pitch",
      arrPotential: 11e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://dentalsmile.com",
      tags: ["Healthcare", "Local Service"],
      lastOutreach: "Instant booking audit completed",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_015",
      name: "Oliver Queen",
      email: "oliver@arrowlogistics.com",
      role: "Chief Revenue Officer",
      company: "Arrow Global Logistics",
      industry: "Supply Chain",
      employees: 640,
      phone: "+1 (312) 555-0128",
      whatsappVerified: true,
      intentScore: 90,
      matchScore: 91.5,
      pipelineStage: "In Sequence",
      arrPotential: 26e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://arrowlogistics.com",
      tags: ["Enterprise", "Logistics"],
      lastOutreach: "In Sequence (Day 1)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_016",
      name: "Zoe Saldana",
      email: "zoe@nexushospitality.com",
      role: "VP Partnerships",
      company: "Nexus Hospitality Hub",
      industry: "Real Estate",
      employees: 180,
      phone: "+1 (702) 555-0192",
      whatsappVerified: true,
      intentScore: 84,
      matchScore: 86.2,
      pipelineStage: "Replied (Warm)",
      arrPotential: 14e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://nexushospitality.com",
      tags: ["Hospitality", "Real Estate"],
      lastOutreach: "Warm response on WhatsApp",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_017",
      name: "Kenji Sato",
      email: "kenji@tokyospeed.jp",
      role: "Head of E-Commerce",
      company: "Tokyo Speedwear",
      industry: "Retail & Fashion",
      employees: 230,
      phone: "+81 90 4123 9901",
      whatsappVerified: true,
      intentScore: 93,
      matchScore: 94.7,
      pipelineStage: "Ready to Pitch",
      arrPotential: 21e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://tokyospeed.jp",
      tags: ["E-commerce", "APAC", "Tier 1"],
      lastOutreach: "Speed audit completed (SEO: 98)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_018",
      name: "Amara Walker",
      email: "amara@bloomagency.io",
      role: "Agency Principal",
      company: "Bloom Growth Agency",
      industry: "Product Design",
      employees: 45,
      phone: "+1 (415) 555-0177",
      whatsappVerified: true,
      intentScore: 86,
      matchScore: 88,
      pipelineStage: "Booked Call",
      arrPotential: 9800,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://bloomagency.io",
      tags: ["Agency", "Booked Call"],
      lastOutreach: "Demo sync scheduled",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 4 Leads
    {
      id: "lead_019",
      name: "Gabriel Morales",
      email: "gabriel@hvacpro.io",
      role: "CEO",
      company: "HVAC Pro Solutions",
      industry: "Home Services",
      employees: 110,
      phone: "+1 (832) 555-0164",
      whatsappVerified: true,
      intentScore: 88,
      matchScore: 90.5,
      pipelineStage: "Ready to Pitch",
      arrPotential: 13500,
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://hvacpro.io",
      tags: ["Services", "Local", "High Demand"],
      lastOutreach: "Instant makeover pitch generated",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_020",
      name: "Rachel Green",
      email: "rachel@kinetixwear.io",
      role: "VP Brand Marketing",
      company: "Kinetix Athletic Wear",
      industry: "E-commerce",
      employees: 320,
      phone: "+1 (212) 555-0133",
      whatsappVerified: true,
      intentScore: 95,
      matchScore: 96.8,
      pipelineStage: "Ready to Pitch",
      arrPotential: 28e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://kinetixwear.io",
      tags: ["E-commerce", "Apparel", "High AOV"],
      lastOutreach: "Behance-level pitch ready",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 5 Leads
    {
      id: "lead_021",
      name: "Oliver Sterling",
      email: "oliver@sterlingwealth.co.uk",
      role: "Managing Partner",
      company: "Sterling Private Wealth",
      industry: "FinTech",
      employees: 95,
      phone: "+44 20 7946 0912",
      whatsappVerified: true,
      intentScore: 92,
      matchScore: 95.1,
      pipelineStage: "Ready to Pitch",
      arrPotential: 26e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://sterlingwealth.co.uk",
      tags: ["FinTech", "UK", "High ARR"],
      lastOutreach: "Ready for batch WhatsApp pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_022",
      name: "Freja Lindqvist",
      email: "freja@nordicdesignhub.se",
      role: "Design Director",
      company: "Nordic Design Collective",
      industry: "Product Design",
      employees: 60,
      phone: "+46 8 123 4567",
      whatsappVerified: true,
      intentScore: 89,
      matchScore: 91,
      pipelineStage: "In Sequence",
      arrPotential: 15500,
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://nordicdesignhub.se",
      tags: ["Design", "Nordics", "High Intent"],
      lastOutreach: "In Sequence (Day 2)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_023",
      name: "Mateo Rossi",
      email: "mateo@milanoluxury.it",
      role: "Chief Commercial Officer",
      company: "Milano Leatherworks",
      industry: "Retail & Fashion",
      employees: 180,
      phone: "+39 02 8901 2345",
      whatsappVerified: true,
      intentScore: 94,
      matchScore: 96.5,
      pipelineStage: "Ready to Pitch",
      arrPotential: 24e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://milanoluxury.it",
      tags: ["Luxury", "Fashion", "Verified WA"],
      lastOutreach: "Brand creator mockups dispatched",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_024",
      name: "Zoe Kravitz",
      email: "zoe@zenithsaas.io",
      role: "VP Marketing",
      company: "Zenith Cloud Ops",
      industry: "SaaS / Cloud",
      employees: 210,
      phone: "+1 (415) 555-0199",
      whatsappVerified: true,
      intentScore: 91,
      matchScore: 93.4,
      pipelineStage: "Replied (Warm)",
      arrPotential: 19e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://zenithsaas.io",
      tags: ["SaaS", "Warm Lead", "Enterprise"],
      lastOutreach: 'Replied: "Send us the deck"',
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_025",
      name: "Tariq Al-Mansoor",
      email: "tariq@gulfrealty.ae",
      role: "Executive Director",
      company: "Gulf Horizon Properties",
      industry: "Real Estate",
      employees: 280,
      phone: "+971 4 368 9900",
      whatsappVerified: true,
      intentScore: 96,
      matchScore: 98,
      pipelineStage: "Booked Call",
      arrPotential: 35e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://gulfrealty.ae",
      tags: ["Real Estate", "Dubai", "VIP Client"],
      lastOutreach: "Google Meet sync confirmed for Thursday",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 6 Leads
    {
      id: "lead_026",
      name: "Chloe Dupont",
      email: "chloe@atelierlumiere.fr",
      role: "Founder",
      company: "Atelier Lumi\xE8re",
      industry: "Product Design",
      employees: 35,
      phone: "+33 1 42 68 99 22",
      whatsappVerified: true,
      intentScore: 88,
      matchScore: 90.2,
      pipelineStage: "Ready to Pitch",
      arrPotential: 12500,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://atelierlumiere.fr",
      tags: ["Design", "France", "High Intent"],
      lastOutreach: "Ready for pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_027",
      name: "Vikram Sethi",
      email: "vikram@cloudscale.in",
      role: "CTO",
      company: "CloudScale Infrastructure",
      industry: "SaaS / Cloud",
      employees: 450,
      phone: "+91 98200 12345",
      whatsappVerified: true,
      intentScore: 93,
      matchScore: 95.8,
      pipelineStage: "In Sequence",
      arrPotential: 22e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://cloudscale.in",
      tags: ["Cloud", "DevOps", "High Intent"],
      lastOutreach: "In Sequence (Day 4)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_028",
      name: "Evelyn Brooks",
      email: "evelyn@solarcare.org",
      role: "VP Operations",
      company: "SolarCare Energy Solutions",
      industry: "CleanTech",
      employees: 140,
      phone: "+1 (303) 555-0188",
      whatsappVerified: true,
      intentScore: 87,
      matchScore: 89.6,
      pipelineStage: "Ready to Pitch",
      arrPotential: 16e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://solarcare.org",
      tags: ["Energy", "High Intent"],
      lastOutreach: "Ready for batch pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_029",
      name: "Liam O\u2019Connor",
      email: "liam@dublinlogistics.ie",
      role: "Managing Director",
      company: "Dublin Freight & Logistics",
      industry: "Logistics",
      employees: 320,
      phone: "+353 1 496 0123",
      whatsappVerified: true,
      intentScore: 90,
      matchScore: 92.5,
      pipelineStage: "Replied (Warm)",
      arrPotential: 21500,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://dublinlogistics.ie",
      tags: ["Logistics", "Ireland", "Warm Reply"],
      lastOutreach: "Replied 1 hour ago",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_030",
      name: "Samantha Wu",
      email: "sam@omnicommerce.sg",
      role: "Head of Growth",
      company: "Omni Commerce APAC",
      industry: "E-commerce",
      employees: 190,
      phone: "+65 6789 0123",
      whatsappVerified: true,
      intentScore: 95,
      matchScore: 97.2,
      pipelineStage: "Booked Call",
      arrPotential: 27e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://omnicommerce.sg",
      tags: ["E-commerce", "Singapore", "Tier 1"],
      lastOutreach: "Demo confirmed for Friday",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    // Page 7 Leads
    {
      id: "lead_031",
      name: "Noah Van Der Bilt",
      email: "noah@amsterdamfin.nl",
      role: "Partner",
      company: "Amsterdam Capital Partners",
      industry: "FinTech",
      employees: 80,
      phone: "+31 20 555 1234",
      whatsappVerified: true,
      intentScore: 92,
      matchScore: 94,
      pipelineStage: "Ready to Pitch",
      arrPotential: 23e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://amsterdamfin.nl",
      tags: ["FinTech", "Benelux", "High ARR"],
      lastOutreach: "Ready for batch WhatsApp pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_032",
      name: "Maya Angelis",
      email: "maya@athensaesthetic.gr",
      role: "Founder & CEO",
      company: "Athens Luxury Aesthetic",
      industry: "Health & Wellness",
      employees: 42,
      phone: "+30 210 361 9900",
      whatsappVerified: true,
      intentScore: 86,
      matchScore: 88.5,
      pipelineStage: "Ready to Pitch",
      arrPotential: 14e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://athensaesthetic.gr",
      tags: ["Healthcare", "High Intent"],
      lastOutreach: "Enriched via AI Receptionist",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_033",
      name: "Alexander Schmidt",
      email: "alex@berlindata.de",
      role: "VP AI Solutions",
      company: "Berlin Data Works",
      industry: "AI & Automation",
      employees: 125,
      phone: "+49 30 8899 0011",
      whatsappVerified: true,
      intentScore: 94,
      matchScore: 96,
      pipelineStage: "Ready to Pitch",
      arrPotential: 25e3,
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://berlindata.de",
      tags: ["AI Tech", "Germany", "High Intent"],
      lastOutreach: "Ready for outreach blast",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_034",
      name: "Isabella Rocha",
      email: "isabella@saopauloretail.br",
      role: "Chief Merchandising Officer",
      company: "S\xE3o Paulo Apparel Labs",
      industry: "Retail & Fashion",
      employees: 290,
      phone: "+55 11 98765 4321",
      whatsappVerified: true,
      intentScore: 90,
      matchScore: 92.8,
      pipelineStage: "In Sequence",
      arrPotential: 18500,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://saopauloretail.br",
      tags: ["Fashion", "LatAm", "Active Sequence"],
      lastOutreach: "In Sequence (Day 3)",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
    {
      id: "lead_035",
      name: "Lucas King",
      email: "lucas@sydneymedtech.com.au",
      role: "Managing Director",
      company: "Sydney MedTech Innovations",
      industry: "Healthcare",
      employees: 175,
      phone: "+61 2 9876 5432",
      whatsappVerified: true,
      intentScore: 93,
      matchScore: 95,
      pipelineStage: "Ready to Pitch",
      arrPotential: 26500,
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
      websiteUrl: "https://sydneymedtech.com.au",
      tags: ["Healthcare", "Australia", "High Intent"],
      lastOutreach: "Ready for batch pitch",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    },
  ];
  return baseLeads;
}

const INITIAL_AUDITS = [
  {
    id: "audit_001",
    url: "https://jpvapes.jp/brand/vgod",
    targetType: "homepage",
    seoScore: 100,
    speedScore: 74,
    accessibilityScore: 95,
    bestPracticesScore: 100,
    status: "Completed",
    metrics: {
      lcp: "1.4s",
      fid: "18ms",
      cls: "0.02",
      mobileScore: 82,
      issuesFound: 3,
    },
    scannedAt: "1 min ago",
  },
  {
    id: "audit_002",
    url: "https://apexcommerce.io",
    targetType: "batch",
    seoScore: 94,
    speedScore: 81,
    accessibilityScore: 92,
    bestPracticesScore: 96,
    status: "Completed",
    metrics: {
      lcp: "1.1s",
      fid: "12ms",
      cls: "0.01",
      mobileScore: 89,
      issuesFound: 2,
    },
    scannedAt: "5 min ago",
  },
];

const INITIAL_MEETINGS = [
  {
    id: "mtg_001",
    leadId: "lead_006",
    leadName: "Alex Carter",
    leadCompany: "Enterprise FinTech Lead",
    leadAvatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop&crop=faces,top&q=90",
    hostName: "Elena Rostova",
    hostRole: "Revenue Director",
    date: "2024-09-24",
    time: "09:00 am",
    duration: "45m",
    timezone: "EST Timezone",
    meetingType: "Discovery Sync",
    meetUrl: "https://meet.google.com/evo-lead-sync",
    status: "Scheduled",
  },
  {
    id: "mtg_002",
    leadId: "lead_001",
    leadName: "Marcus Thorne",
    leadCompany: "Apex Commerce",
    leadAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=90",
    hostName: "Elena Rostova",
    hostRole: "Revenue Director",
    date: "2024-09-24",
    time: "11:00 am",
    duration: "30m",
    timezone: "EST Timezone",
    meetingType: "AI Receptionist Qualification",
    meetUrl: "https://meet.google.com/evo-qualification",
    status: "Scheduled",
  },
];

const INITIAL_ACTIVITIES = [
  {
    id: "act_001",
    type: "outreach_sent",
    title: "Batch WhatsApp Campaign Dispatched",
    description:
      "14 high-intent prospects reached with custom video pitch and audit link",
    timestamp: "Just now",
  },
  {
    id: "act_002",
    type: "reply_received",
    title: "Warm Reply from David Vance (HyperFlow AI)",
    description: '"Sounds promising, share demo link for our sales ops team"',
    timestamp: "12m ago",
    leadId: "lead_003",
  },
  {
    id: "act_003",
    type: "meeting_booked",
    title: "Discovery Meeting Scheduled",
    description: "Julian Croft confirmed Sep 24 10:15 AM EST walkthrough",
    timestamp: "42m ago",
    leadId: "lead_005",
  },
  {
    id: "act_004",
    type: "audit_run",
    title: "Instant SEO Audit Completed",
    description: "Scored 100 SEO & 95 Accessibility for jpvapes.jp/brand/vgod",
    timestamp: "1h ago",
  },
];

const LeadSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "Decision Maker" },
  company: { type: String, required: true },
  industry: { type: String, default: "General" },
  employees: { type: Number, default: 50 },
  phone: { type: String, required: true },
  whatsappVerified: { type: Boolean, default: true },
  intentScore: { type: Number, default: 85 },
  matchScore: { type: Number, default: 90 },
  pipelineStage: { type: String, default: "Ready to Pitch" },
  arrPotential: { type: Number, default: 1e4 },
  avatarUrl: String,
  websiteUrl: String,
  tags: [String],
  lastOutreach: String,
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: String,
  company: String,
  avatarUrl: String,
});

export class DatabaseManager {
  static instance;
  isAtlasConnected = false;
  currentUri = process.env.MONGODB_URI || "";
  clusterName = "cluster0.mongodb.net";
  dbName = "lead_evo";

  // In-Memory store keeping state completely in sync
  leads = generateInitialLeads();
  users = [INITIAL_USER];
  audits = [...INITIAL_AUDITS];
  meetings = [...INITIAL_MEETINGS];
  activities = [...INITIAL_ACTIVITIES];
  outreachMessages = [];
  LeadModel = null;
  UserModel = null;

  constructor() {
    this.attemptAtlasConnection();
  }

  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async attemptAtlasConnection(customUri) {
    const uri = customUri || this.currentUri;
    if (!uri || !uri.trim()) {
      this.isAtlasConnected = false;
      return {
        success: false,
        message:
          "No MongoDB Atlas URI configured yet. Operating on high-speed In-Memory Resilient Store.",
      };
    }
    try {
      this.currentUri = uri;
      const clusterMatch = uri.match(/@([^/?]+)/);
      if (clusterMatch && clusterMatch[1]) {
        this.clusterName = clusterMatch[1];
      }
      await mongoose.disconnect();
      await mongoose.connect(uri, {
        dbName: this.dbName,
        serverSelectionTimeoutMS: 4e3,
      });
      this.isAtlasConnected = true;
      if (!this.LeadModel) {
        this.LeadModel =
          mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
        this.UserModel =
          mongoose.models.User || mongoose.model("User", UserSchema);
      }
      const count = await this.LeadModel.countDocuments();
      if (count === 0) {
        await this.LeadModel.insertMany(this.leads);
      }
      return {
        success: true,
        message: `Connected securely to MongoDB Atlas cluster: ${this.clusterName}`,
      };
    } catch (err) {
      this.isAtlasConnected = false;
      console.warn(
        "MongoDB Atlas connection attempt finished with fallback:",
        err.message || err,
      );
      return {
        success: false,
        message: `Atlas connection check: ${err.message || "Timeout / network"}. Active fallback store running seamlessly.`,
      };
    }
  }

  getStatus() {
    return {
      connected: this.isAtlasConnected,
      cluster: this.isAtlasConnected
        ? this.clusterName
        : "local.memory-cluster (Atlas Ready)",
      database: this.dbName,
      mode: this.isAtlasConnected
        ? "Atlas Cloud"
        : "Embedded In-Memory Resilient Store",
      latencyMs: this.isAtlasConnected ? 42 : 1.2,
      collections: {
        leads: this.leads.length,
        users: this.users.length,
        audits: this.audits.length,
        meetings: this.meetings.length,
        outreach: this.outreachMessages.length,
      },
      lastChecked: /* @__PURE__ */ new Date().toLocaleTimeString(),
      uriConfigured: Boolean(
        this.currentUri && this.currentUri.trim().length > 0,
      ),
    };
  }

  // Leads CRUD
  async getLeads(query) {
    let result = [...this.leads];
    if (query?.search) {
      const q = query.search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.role.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q),
      );
    }
    if (
      query?.status &&
      query.status !== "All" &&
      query.status !== "All Statuses"
    ) {
      result = result.filter(
        (l) => l.pipelineStage.toLowerCase() === query.status?.toLowerCase(),
      );
    }
    if (
      query?.verifiedWA === "true" ||
      query?.verifiedWA === "Verified WA Only"
    ) {
      result = result.filter((l) => l.whatsappVerified);
    }
    if (
      query?.industry &&
      query.industry !== "All" &&
      query.industry !== "All Industries"
    ) {
      result = result.filter((l) =>
        l.industry.toLowerCase().includes(query.industry.toLowerCase()),
      );
    }
    return result;
  }

  async getLeadById(id) {
    return this.leads.find((l) => l.id === id);
  }

  async createLead(leadData) {
    const newLead = {
      id:
        leadData.id ||
        `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: leadData.name || "New Prospect",
      email: leadData.email || "lead@example.com",
      role: leadData.role || "Decision Maker",
      company: leadData.company || "Enterprise Co.",
      industry: leadData.industry || "Tech",
      employees: leadData.employees || 50,
      phone: leadData.phone || "+1 (555) 000-0000",
      whatsappVerified: leadData.whatsappVerified ?? true,
      intentScore: leadData.intentScore || Math.floor(Math.random() * 20 + 80),
      matchScore: leadData.matchScore || Math.floor(Math.random() * 15 + 85),
      pipelineStage: leadData.pipelineStage || "Ready to Pitch",
      arrPotential: leadData.arrPotential || 12e3,
      avatarUrl:
        leadData.avatarUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      websiteUrl:
        leadData.websiteUrl ||
        `https://${(leadData.company || "company").toLowerCase().replace(/\s+/g, "")}.com`,
      tags: leadData.tags || ["Inbound", "Verified"],
      lastOutreach: "Created in Lead Evo",
      createdAt: /* @__PURE__ */ new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    this.addActivity({
      type: "lead_enriched",
      title: `New Lead Added: ${newLead.name}`,
      description: `${newLead.company} (${newLead.role}) added with ${newLead.intentScore}% Intent score`,
      leadId: newLead.id,
    });
    if (this.isAtlasConnected && this.LeadModel) {
      try {
        await this.LeadModel.create(newLead);
      } catch (err) {
        console.warn("Atlas lead sync failed:", err);
      }
    }
    return newLead;
  }

  async updateLead(id, updates) {
    const index = this.leads.findIndex((l) => l.id === id);
    if (index === -1) return void 0;
    this.leads[index] = { ...this.leads[index], ...updates };
    if (this.isAtlasConnected && this.LeadModel) {
      try {
        await this.LeadModel.findOneAndUpdate({ id }, updates);
      } catch (err) {
        console.warn("Atlas lead update sync failed:", err);
      }
    }
    return this.leads[index];
  }

  async deleteLead(id) {
    const index = this.leads.findIndex((l) => l.id === id);
    if (index === -1) return false;
    this.leads.splice(index, 1);
    if (this.isAtlasConnected && this.LeadModel) {
      try {
        await this.LeadModel.deleteOne({ id });
      } catch (err) {
        console.warn("Atlas lead delete sync failed:", err);
      }
    }
    return true;
  }

  // Batch WhatsApp Dispatch
  async dispatchWhatsAppBlast(params) {
    const targets = this.leads.filter((l) => params.leadIds.includes(l.id));
    for (const lead of targets) {
      lead.pipelineStage = "In Sequence";
      lead.lastOutreach = `Dispatched WhatsApp pitch at ${/* @__PURE__ */ new Date().toLocaleTimeString()}`;
      this.outreachMessages.push({
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        leadId: lead.id,
        leadName: lead.name,
        company: lead.company,
        phone: lead.phone,
        channel: "WhatsApp",
        message: params.messageTemplate.replace(
          /\{\{first_name\}\}/g,
          lead.name.split(" ")[0],
        ),
        status: "Delivered",
        sentAt: /* @__PURE__ */ new Date().toISOString(),
      });
    }
    this.addActivity({
      type: "outreach_sent",
      title: `Batch WhatsApp Blast Dispatched (${targets.length} leads)`,
      description: `Sent personalized pitches to ${targets
        .map((t) => t.name)
        .slice(0, 3)
        .join(
          ", ",
        )}${targets.length > 3 ? ` and ${targets.length - 3} others` : ""}`,
    });
    return {
      dispatched: targets.length,
      queueTotal: this.outreachMessages.length,
    };
  }

  // SEO Audits: dynamic scores based on domain
  async getAudits() {
    return this.audits;
  }

  async runAudit(url, targetType = "homepage") {
    const cleanUrl = url.startsWith("http") ? url : `https://${url}`;
    let hash = 0;
    for (let i = 0; i < cleanUrl.length; i++) {
      hash = (hash << 5) - hash + cleanUrl.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);
    let seo = 88 + (absHash % 12);
    let speed = 68 + ((absHash >> 2) % 30);
    let accessibility = 86 + ((absHash >> 3) % 14);
    let bestPractices = 90 + ((absHash >> 4) % 10);
    if (cleanUrl.includes("jpvapes") || cleanUrl.includes("vgod")) {
      seo = 100;
      speed = 74;
      accessibility = 95;
      bestPractices = 100;
    }
    const newAudit = {
      id: `audit_${Date.now()}`,
      url: cleanUrl,
      targetType,
      seoScore: Math.min(100, seo),
      speedScore: Math.min(100, speed),
      accessibilityScore: Math.min(100, accessibility),
      bestPracticesScore: Math.min(100, bestPractices),
      status: "Completed",
      metrics: {
        lcp: `${(1.1 + (absHash % 10) / 10).toFixed(1)}s`,
        fid: `${10 + (absHash % 15)}ms`,
        cls: `0.0${1 + (absHash % 3)}`,
        mobileScore: Math.round((speed + accessibility) / 2),
        issuesFound: Math.max(1, Math.floor((100 - speed) / 6)),
      },
      scannedAt: "Just now",
    };
    this.audits.unshift(newAudit);
    this.addActivity({
      type: "audit_run",
      title: `SEO & Speed Audit: ${cleanUrl.replace(/https?:\/\//, "")}`,
      description: `Scored SEO: ${newAudit.seoScore}/100, Speed: ${newAudit.speedScore}/100, Core Web Vitals analyzed`,
    });
    return newAudit;
  }

  // Meetings
  async getMeetings() {
    return this.meetings;
  }

  async scheduleMeeting(meetingData) {
    const newMeeting = {
      id: `mtg_${Date.now()}`,
      leadId: meetingData.leadId || "lead_custom",
      leadName: meetingData.leadName || "VIP Client",
      leadCompany: meetingData.leadCompany || "Prospective Account",
      leadAvatar:
        meetingData.leadAvatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=90",
      hostName: "Elena Rostova",
      hostRole: "Revenue Director",
      date: meetingData.date || "2024-09-24",
      time: meetingData.time || "10:15 am",
      duration: meetingData.duration || "45m",
      timezone: meetingData.timezone || "EST Timezone",
      meetingType: meetingData.meetingType || "Discovery Sync",
      meetUrl:
        "https://meet.google.com/evo-" +
        Math.random().toString(36).substring(2, 8),
      status: "Scheduled",
    };
    this.meetings.unshift(newMeeting);
    if (meetingData.leadId) {
      await this.updateLead(meetingData.leadId, {
        pipelineStage: "Booked Call",
        lastOutreach: `Meeting booked for ${newMeeting.time} on ${newMeeting.date}`,
      });
    }
    this.addActivity({
      type: "meeting_booked",
      title: `Confirmed Meeting: ${newMeeting.leadName} (${newMeeting.leadCompany})`,
      description: `${newMeeting.meetingType} booked for ${newMeeting.time} on ${newMeeting.date} (${newMeeting.duration})`,
      leadId: newMeeting.leadId,
    });
    return newMeeting;
  }

  // Activities
  async getActivities() {
    return this.activities;
  }

  addActivity(act) {
    this.activities.unshift({
      id: `act_${Date.now()}`,
      timestamp: "Just now",
      ...act,
    });
    if (this.activities.length > 50) {
      this.activities.pop();
    }
  }

  // User
  getUser() {
    return this.users[0];
  }

  updateUser(userData) {
    this.users[0] = {
      ...this.users[0],
      ...userData,
    };
    return this.users[0];
  }
}

export const db = DatabaseManager.getInstance();
