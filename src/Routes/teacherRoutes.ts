import express from "express";
import {
 
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller";

const router = express.Router();


router.get("/getTeacher", getTeachers);
router.get("/getTeacherbyid/:id", getTeacherById);
router.put("/upTeacher/:id", updateTeacher);
router.delete("/delTeacher/:id", deleteTeacher);

export default router;
