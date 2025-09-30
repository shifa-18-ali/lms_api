import express from "express";
import { createMapping, getCourseById } from '../controllers/courseMappingcontroller'
const router = express.Router();

router.post("/mapping", createMapping);
router.get("/mapping/:courseId", getCourseById);

export default router;
