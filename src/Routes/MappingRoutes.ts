import express from "express";
import {
  createMapping,
  getMappings,
  getMappingsByTeacher,
  getMappingsByStudent,
  deleteMapping,
} from "../controllers/Mappingcontroller";

const router = express.Router();

router.post("/createMapping", createMapping); // assign teacher-student-course
router.get("/getMappings", getMappings);
router.get("/teacher/:teacherId", getMappingsByTeacher);
router.get("/student/:studentId", getMappingsByStudent);
router.delete("/delmapp/:id", deleteMapping);

export default router;
