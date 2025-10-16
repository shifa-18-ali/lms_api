import express from "express";
import {
 
  getTeachers,
  getTeacherByEmail,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller";

const router = express.Router();


router.get("/getTeacher", getTeachers);
router.get("/getTeacherByEmail/:email", getTeacherByEmail);
router.put("/upTeacher/:id", updateTeacher);
router.delete("/delTeacher/:id", deleteTeacher);

export default router;
