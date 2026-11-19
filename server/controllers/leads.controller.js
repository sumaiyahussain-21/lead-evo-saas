import { db } from "../db.js";
export class LeadsController {
  static async getLeads(req, res) {
    const { search, status, verifiedWA, industry } = req.query;
    const leads = await db.getLeads({
      search,
      status,
      verifiedWA,
      industry,
    });
    res.json({ success: true, count: leads.length, leads });
  }
  static async getLeadById(req, res) {
    const lead = await db.getLeadById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }
    res.json({ success: true, lead });
  }
  static async createLead(req, res) {
    const newLead = await db.createLead(req.body);
    res.status(201).json({ success: true, lead: newLead });
  }
  static async updateLead(req, res) {
    const updated = await db.updateLead(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }
    res.json({ success: true, lead: updated });
  }
  static async deleteLead(req, res) {
    const deleted = await db.deleteLead(req.params.id);
    res.json({ success: deleted });
  }
  static async batchOutreach(req, res) {
    const { leadIds, messageTemplate, sendIntervalSec } = req.body;
    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      res
        .status(400)
        .json({ success: false, message: "leadIds array is required" });
      return;
    }
    const result = await db.dispatchWhatsAppBlast({
      leadIds,
      messageTemplate:
        messageTemplate ||
        "Hi {{first_name}}, saw {{company}}'s recent showcase. Ran a quick performance check and noticed a few mobile drop-offs in high-intent regions. Put together a 2-minute overview detailing quick adjustments. Worth a look?",
      sendIntervalSec: sendIntervalSec || 30,
    });
    res.json({
      success: true,
      message: `Dispatched batch WhatsApp outreach to ${result.dispatched} leads!`,
      ...result,
    });
  }
  static async importCsv(_req, res) {
    const sampleImport = [
      {
        name: "Claire Beauchamp",
        email: "claire@highlandgrowth.io",
        role: "Growth Lead",
        company: "Highland Growth Labs",
        industry: "B2B SaaS",
        employees: 95,
        phone: "+1 (415) 782-9901",
        whatsappVerified: true,
        arrPotential: 16e3,
      },
      {
        name: "Kenji Sato",
        email: "kenji@tokyospeed.jp",
        role: "Head of E-Commerce",
        company: "Tokyo Speedwear",
        industry: "Retail & Fashion",
        employees: 230,
        phone: "+81 90 4123 9901",
        whatsappVerified: true,
        arrPotential: 21e3,
      },
    ];
    const created = [];
    for (const item of sampleImport) {
      created.push(await db.createLead(item));
    }
    res.json({
      success: true,
      message: `Imported ${created.length} new prospects successfully`,
      leads: created,
    });
  }
  static async batchCreate(req, res) {
    const { leads } = req.body;
    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      res
        .status(400)
        .json({ success: false, message: "leads array is required" });
      return;
    }
    const created = [];
    for (const item of leads) {
      created.push(await db.createLead(item));
    }
    res.status(201).json({
      success: true,
      message: `Added ${created.length} verified prospects to your pipeline!`,
      leads: created,
    });
  }
  static async discoverProspects(req, res) {
    const { industry = "E-commerce", keyword = "" } = req.body;
    const pool = [
      {
        name: "Freya Sterling",
        email: "freya@sterlingluxe.co",
        role: "Founder & Head of Merchandising",
        company: "Sterling Luxe Goods",
        industry: "E-commerce / Luxury",
        employees: 62,
        phone: "+1 (415) 890-2341",
        whatsappVerified: true,
        intentScore: 97,
        matchScore: 98.2,
        pipelineStage: "Ready to Pitch",
        arrPotential: 18500,
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        websiteUrl: "https://sterlingluxe.co",
        tags: ["Shopify Plus", "High AOV", "WhatsApp Verified"],
        lastOutreach: "Discovered via Prospect Finder AI",
        createdAt: /* @__PURE__ */ new Date().toISOString(),
      },
      {
        name: "Marcus Vance",
        email: "m.vance@cloudgrid.tech",
        role: "VP Sales Engineering",
        company: "CloudGrid Technologies",
        industry: "B2B SaaS / Cloud",
        employees: 210,
        phone: "+1 (512) 762-9011",
        whatsappVerified: true,
        intentScore: 94,
        matchScore: 95,
        pipelineStage: "Ready to Pitch",
        arrPotential: 24e3,
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        websiteUrl: "https://cloudgrid.tech",
        tags: ["SaaS", "High Intent", "Decision Maker"],
        lastOutreach: "Discovered via Prospect Finder AI",
        createdAt: /* @__PURE__ */ new Date().toISOString(),
      },
      {
        name: "Amina Al-Mansoor",
        email: "amina@aurafintech.ae",
        role: "Managing Director",
        company: "Aura FinTech Capital",
        industry: "FinTech",
        employees: 140,
        phone: "+971 50 812 4390",
        whatsappVerified: true,
        intentScore: 98,
        matchScore: 99.1,
        pipelineStage: "Ready to Pitch",
        arrPotential: 32e3,
        avatarUrl:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
        websiteUrl: "https://aurafintech.ae",
        tags: ["Gulf Tier-1", "FinTech Scale", "WhatsApp Verified"],
        lastOutreach: "Discovered via Prospect Finder AI",
        createdAt: /* @__PURE__ */ new Date().toISOString(),
      },
      {
        name: "Lucas Weber",
        email: "lucas@weberautomotive.de",
        role: "Head of Digital Channels",
        company: "Weber Precision Automotive",
        industry: "Automotive & Tech",
        employees: 380,
        phone: "+49 89 2108 5541",
        whatsappVerified: true,
        intentScore: 91,
        matchScore: 92.4,
        pipelineStage: "Ready to Pitch",
        arrPotential: 19800,
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
        websiteUrl: "https://weberautomotive.de",
        tags: ["DACH Region", "Enterprise", "Direct Mobile"],
        lastOutreach: "Discovered via Prospect Finder AI",
        createdAt: /* @__PURE__ */ new Date().toISOString(),
      },
      {
        name: "Maya Tanaka",
        email: "maya@tokyobloom.jp",
        role: "Chief Brand Officer",
        company: "Tokyo Bloom Lifestyle",
        industry: "E-commerce / Retail",
        employees: 95,
        phone: "+81 80 4391 0022",
        whatsappVerified: true,
        intentScore: 93,
        matchScore: 94.8,
        pipelineStage: "Ready to Pitch",
        arrPotential: 15400,
        avatarUrl:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
        websiteUrl: "https://tokyobloom.jp",
        tags: ["APAC", "DTC Brand", "WhatsApp Verified"],
        lastOutreach: "Discovered via Prospect Finder AI",
        createdAt: /* @__PURE__ */ new Date().toISOString(),
      },
      {
        name: "Oliver King",
        email: "oliver@proptechsol.co.uk",
        role: "Chief Revenue Officer",
        company: "PropTech Solutions UK",
        industry: "Real Estate / PropTech",
        employees: 160,
        phone: "+44 20 7946 0912",
        whatsappVerified: true,
        intentScore: 89,
        matchScore: 91,
        pipelineStage: "Ready to Pitch",
        arrPotential: 21500,
        avatarUrl:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
        websiteUrl: "https://proptechsol.co.uk",
        tags: ["UK Real Estate", "High Intent"],
        lastOutreach: "Discovered via Prospect Finder AI",
        createdAt: /* @__PURE__ */ new Date().toISOString(),
      },
    ];
    const results = pool.map((p, idx) => ({
      ...p,
      id: `prospect_discovered_${Date.now()}_${idx}`,
      industry: keyword ? `${keyword} / ${p.industry}` : industry || p.industry,
    }));
    res.json({
      success: true,
      count: results.length,
      prospects: results,
    });
  }
}
