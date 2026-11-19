import { Router } from "express";
import { MeetingsController } from "../controllers/meetings.controller.js";
const router = Router();
router.get("/", MeetingsController.getMeetings);
router.post("/book", MeetingsController.scheduleMeeting);
export default router;
