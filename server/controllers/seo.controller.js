import { db } from "../db.js";
export class SeoController {
  static async getHistory(_req, res) {
    const audits = await db.getAudits();
    res.json({ success: true, audits });
  }
  static async runAudit(req, res) {
    const { url, targetType } = req.body;
    if (!url) {
      res.status(400).json({ success: false, message: "URL is required" });
      return;
    }
    const result = await db.runAudit(url, targetType);
    res.json({ success: true, audit: result });
  }
}
