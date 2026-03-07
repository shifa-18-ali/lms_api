import express from "express";

import {
  startSession,
  completeSession,
  getActivityHistory,
  adminDashboard
} from "../controllers/activityController";

const router = express.Router();

router.put("/startSession/:bookingId", startSession);

router.put("/completeSession/:bookingId", completeSession);

router.get("/getActivityHistory/:studentId", getActivityHistory);

router.get("/activityadminDashboard", adminDashboard);

export default router;