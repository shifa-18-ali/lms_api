import express from "express";
import {

  getStudents,
  getStudentByEmail,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";

const router = express.Router();

router.get("/getStudents", getStudents);
router.get("/getStudentByEmail/:id", getStudentByEmail);
router.put("/upStudent/:id", updateStudent);
router.delete("/delStudent/:id", deleteStudent);

export default router;
