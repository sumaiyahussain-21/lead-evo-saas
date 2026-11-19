import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateLeadIntentScore,
  calculateFunnelBreakdown,
} from "./analytics.js";
test("backend calculateLeadIntentScore calculates score accurately", () => {
  const highIntentLead = {
    whatsappVerified: true,
    employees: 150,
    arrPotential: 25e3,
    role: "VP Sales",
  };
  const score = calculateLeadIntentScore(highIntentLead);
  assert.equal(score >= 85, true);
});
test("backend calculateFunnelBreakdown returns proper percentages", () => {
  const mockLeads = [
    {
      id: "1",
      intentScore: 90,
      matchScore: 90,
      pipelineStage: "Discovered",
      whatsappVerified: true,
      arrPotential: 1e4,
    },
    {
      id: "2",
      intentScore: 80,
      matchScore: 85,
      pipelineStage: "Ready to Pitch",
      whatsappVerified: true,
      arrPotential: 15e3,
    },
    {
      id: "3",
      intentScore: 95,
      matchScore: 92,
      pipelineStage: "In Sequence",
      whatsappVerified: true,
      arrPotential: 2e4,
    },
    {
      id: "4",
      intentScore: 99,
      matchScore: 98,
      pipelineStage: "Won",
      whatsappVerified: true,
      arrPotential: 3e4,
    },
  ];
  const breakdown = calculateFunnelBreakdown(mockLeads);
  assert.equal(breakdown.discovered, 25);
  assert.equal(breakdown.won, 25);
  assert.equal(breakdown.dailyTarget, 350);
});
