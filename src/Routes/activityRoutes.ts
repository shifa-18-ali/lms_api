import express from "express";
import {
  updateSessionStatus,
  getActivityHistory,
  adminDashboard
} from "../controllers/activityController";

const router = express.Router();

router.put(
  "/updateSession/:userId/:courseId/:bookingId/:status",
  updateSessionStatus
);

router.get(
  "/getActivityHistory/:studentId",
  getActivityHistory
);

router.get(
  "/adminAccesstoHistory",
  adminDashboard
);

export default router;