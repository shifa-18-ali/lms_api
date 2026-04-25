import express from "express";
import {

  getStudents,
  getStudentByEmail,
  updateStudent,
  deleteStudent,
  getStudentByName,
} from "../controllers/student.controller";

const router = express.Router();

router.get("/getStudents", getStudents);
router.get("/getStudentByEmail/:email", getStudentByEmail);
router.put("/upStudent/:id", updateStudent);
router.delete("/delStudent/:id", deleteStudent);
router.get("/getStudentByName", getStudentByName);
export default router;
