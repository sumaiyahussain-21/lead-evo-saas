export function calculateLeadIntentScore(params) {
  let score = 50;
  if (params.whatsappVerified) {
    score += 18;
  }
  if (params.employees >= 100) {
    score += 15;
  } else if (params.employees >= 20) {
    score += 10;
  } else if (params.employees >= 5) {
    score += 5;
  }
  if (params.arrPotential >= 1e4) {
    score += 12;
  } else if (params.arrPotential >= 5e3) {
    score += 8;
  }
  if (
    params.pipelineStage === "Replied (Warm)" ||
    params.pipelineStage === "Booked Call"
  ) {
    score += 8;
  } else if (params.pipelineStage === "Ready to Pitch") {
    score += 5;
  }
  return Math.min(99, Math.max(20, score));
}
export function calculateFunnelBreakdown(leads) {
  const total = leads.length || 1;
  let discovered = 0;
  let verified = 0;
  let outreach = 0;
  let won = 0;
  for (const lead of leads) {
    switch (lead.pipelineStage) {
      case "Discovered":
        discovered++;
        break;
      case "Enriched":
      case "Ready to Pitch":
        verified++;
        break;
      case "In Sequence":
      case "Replied (Warm)":
        outreach++;
        break;
      case "Booked Call":
      case "Won":
        won++;
        break;
      default:
        discovered++;
        break;
    }
  }
  return {
    discovered,
    verified,
    outreach,
    won,
    total: leads.length,
    discoveredPct: Math.round((discovered / total) * 100),
    verifiedPct: Math.round((verified / total) * 100),
    outreachPct: Math.round((outreach / total) * 100),
    wonPct: Math.round((won / total) * 100),
  };
}
export function renderOutreachTemplate(template, variables) {
  const firstName =
    variables.first_name ||
    (variables.name ? variables.name.split(" ")[0] : "there");
  const company = variables.company || "your team";
  const role = variables.role || "lead";
  const industry = variables.industry || "growth";
  return template
    .replace(/\{\{\s*first_name\s*\}\}/gi, firstName)
    .replace(/\{\{\s*name\s*\}\}/gi, variables.name || firstName)
    .replace(/\{\{\s*company\s*\}\}/gi, company)
    .replace(/\{\{\s*role\s*\}\}/gi, role)
    .replace(/\{\{\s*industry\s*\}\}/gi, industry);
}
export function formatCurrency(amount) {
  if (amount >= 1e6) {
    return `$${(amount / 1e6).toFixed(1)}M`;
  }
  if (amount >= 1e3) {
    return `$${Math.round(amount / 1e3)}k`;
  }
  return `$${amount.toLocaleString()}`;
}
