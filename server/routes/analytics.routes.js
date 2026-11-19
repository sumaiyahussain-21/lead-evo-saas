import { Router } from "express";
import { AnalyticsController } from "../controllers/analytics.controller.js";
const router = Router();
router.get("/realtime", AnalyticsController.getRealtimeAnalytics);
export default router;
