import { db } from "../db.js";
export class MeetingsController {
  static async getMeetings(_req, res) {
    const meetings = await db.getMeetings();
    res.json({ success: true, meetings });
  }
  static async scheduleMeeting(req, res) {
    const meeting = await db.scheduleMeeting(req.body);
    res.json({ success: true, meeting });
  }
}
