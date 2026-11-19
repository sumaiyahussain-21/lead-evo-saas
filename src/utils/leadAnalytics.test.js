import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateLeadIntentScore,
  calculateFunnelBreakdown,
  renderOutreachTemplate,
  formatCurrency,
} from "./leadAnalytics.js";
test("calculateLeadIntentScore rewards verified WhatsApp and scale", () => {
  const highIntentScore = calculateLeadIntentScore({
    whatsappVerified: true,
    employees: 140,
    arrPotential: 12e3,
    pipelineStage: "Ready to Pitch",
  });
  assert.ok(
    highIntentScore >= 90,
    `Expected score >= 90, got ${highIntentScore}`,
  );
  const lowerScore = calculateLeadIntentScore({
    whatsappVerified: false,
    employees: 2,
    arrPotential: 1e3,
    pipelineStage: "Discovered",
  });
  assert.ok(lowerScore < 70, `Expected score < 70, got ${lowerScore}`);
});
test("calculateFunnelBreakdown calculates stages and percentages accurately", () => {
  const mockLeads = [
    {
      id: "1",
      name: "Marcus Thorne",
      email: "marcus.t@apexcommerce.io",
      role: "VP Growth",
      company: "Apex Commerce",
      industry: "E-commerce",
      employees: 140,
      phone: "+1 (415) 892-0419",
      whatsappVerified: true,
      intentScore: 94,
      pipelineStage: "Ready to Pitch",
      arrPotential: 14500,
    },
    {
      id: "2",
      name: "Elena Rostova",
      email: "elena@solaracloud.de",
      role: "CMO",
      company: "Solara Cloud",
      industry: "SaaS / Cloud",
      employees: 310,
      phone: "+49 (30) 9123-5810",
      whatsappVerified: true,
      intentScore: 88,
      pipelineStage: "In Sequence",
      arrPotential: 18e3,
    },
    {
      id: "3",
      name: "David Vance",
      email: "dvance@hyperflow.ai",
      role: "Head of Sales Ops",
      company: "HyperFlow AI",
      industry: "AI & Automation",
      employees: 85,
      phone: "+1 (512) 749-3012",
      whatsappVerified: true,
      intentScore: 91,
      pipelineStage: "Replied (Warm)",
      arrPotential: 9200,
    },
    {
      id: "4",
      name: "Julian Croft",
      email: "j.croft@vanguardrealty.co",
      role: "Partner",
      company: "Vanguard Realty",
      industry: "Real Estate",
      employees: 210,
      phone: "+1 (312) 402-9981",
      whatsappVerified: true,
      intentScore: 82,
      pipelineStage: "Booked Call",
      arrPotential: 7500,
    },
  ];
  const breakdown = calculateFunnelBreakdown(mockLeads);
  assert.equal(breakdown.total, 4);
  assert.equal(breakdown.verified, 1);
  assert.equal(breakdown.outreach, 2);
  assert.equal(breakdown.won, 1);
  assert.equal(breakdown.outreachPct, 50);
});
test("renderOutreachTemplate properly interpolates parameters", () => {
  const template =
    "Hi {{first_name}}, noticed {{company}} has great momentum in {{industry}}!";
  const rendered = renderOutreachTemplate(template, {
    name: "Marcus Thorne",
    company: "Apex Commerce",
    industry: "E-commerce",
  });
  assert.equal(
    rendered,
    "Hi Marcus, noticed Apex Commerce has great momentum in E-commerce!",
  );
});
test("formatCurrency outputs compact formatted strings", () => {
  assert.equal(formatCurrency(482e3), "$482k");
  assert.equal(formatCurrency(12e5), "$1.2M");
  assert.equal(formatCurrency(850), "$850");
});
