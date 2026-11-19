import { Router } from "express";
import { SeoController } from "../controllers/seo.controller.js";
const router = Router();
router.get("/history", SeoController.getHistory);
router.post("/audit", SeoController.runAudit);
export default router;
