import { db } from "../db.js";
export class DbController {
  static async getStatus(_req, res) {
    res.json({ success: true, status: db.getStatus() });
  }
  static async connectMongo(req, res) {
    const { uri } = req.body;
    const result = await db.attemptAtlasConnection(uri);
    res.json({ ...result, status: db.getStatus() });
  }
}
