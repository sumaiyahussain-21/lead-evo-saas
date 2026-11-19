import { Router } from "express";
import { DbController } from "../controllers/db.controller.js";
const router = Router();
router.get("/status", DbController.getStatus);
router.post("/connect", DbController.connectMongo);
export default router;
