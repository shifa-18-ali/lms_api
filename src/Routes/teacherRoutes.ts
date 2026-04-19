import express from "express";
import {
 
  getTeachers,
  getTeacherByEmail,
  updateTeacher,
  deleteTeacher,
  getAssignedCourseByTeacher
} from "../controllers/teacher.controller";

const router = express.Router();


router.get("/getTeacher", getTeachers);
router.get("/getTeacherByEmail/:email", getTeacherByEmail);
router.put("/upTeacher/:id", updateTeacher);
router.delete("/delTeacher/:id", deleteTeacher);
router.get('/getassignedCourseByteacher/:_id',getAssignedCourseByTeacher)
export default router;
