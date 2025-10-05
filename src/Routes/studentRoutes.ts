import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";

const router = express.Router();

router.post("/createStudent", createStudent);
router.get("/getStudents", getStudents);
router.get("/getStudentById/:id", getStudentById);
router.put("/upStudent/:id", updateStudent);
router.delete("/delStudent/:id", deleteStudent);

export default router;
