import express from "express";
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller";

const router = express.Router();

router.post("/createTeacher", createTeacher);
router.get("/getTeacher", getTeachers);
router.get("/getTeacherbyid/:id", getTeacherById);
router.put("/upTeacher:id", updateTeacher);
router.delete("/delTeacher/:id", deleteTeacher);

export default router;
