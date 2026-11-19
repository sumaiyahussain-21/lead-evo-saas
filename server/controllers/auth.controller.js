import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { JWT_SECRET } from "../middleware/auth.middleware.js";
export class AuthController {
  static async login(req, res) {
    const { email } = req.body;
    const currentUser = db.getUser();
    const token = jwt.sign(
      {
        id: currentUser.id,
        email: email || currentUser.email,
        name: currentUser.name,
        role: currentUser.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.json({
      success: true,
      token,
      user: currentUser,
    });
  }
  static async register(req, res) {
    const { name, email, company } = req.body;
    const user = {
      id: `usr_${Date.now()}`,
      name: name || "Elena Rostova",
      email: email || "elena.rostova@leadevo.io",
      role: "Revenue Director",
      company: company || "Lead Evo Agency",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token, user });
  }
  static async getMe(_req, res) {
    const user = db.getUser();
    res.json({ success: true, user });
  }
  static async updateMe(req, res) {
    const updatedUser = db.updateUser(req.body);
    res.json({ success: true, user: updatedUser });
  }
  static async updateProfile(req, res) {
    const updatedUser = db.updateUser(req.body);
    res.json({ success: true, user: updatedUser });
  }
}
