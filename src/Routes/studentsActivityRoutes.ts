import express from "express";
import { updateActivity, getCourseProgress } from "../controllers/studentActivityController";

const router = express.Router();

router.post("/update", updateActivity);
router.get("/progress/:studentId/:courseId", getCourseProgress);

export default router;
