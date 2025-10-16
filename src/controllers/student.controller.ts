import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Student from "../Model/studentModel";
import User from "../Model/userModel"
// 🎓 Create a new student
// export const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { name, type,gender } = req.body;


 
//     const newStudent = await Student.create({
//       name,
//       type,
//       gender
//     });

//     res.status(201).json(newStudent);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating student", error });
//   }
// };

// 📋 Get all students
export const getStudents = async (req: Request, res: Response) => {
  try {
 const students = await User.find({ role: "student" }).populate("profileId");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};




export const getStudentByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params; // take email from URL param

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error});
  }
};
;

// ✏️ Update student info
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

// 🗑️ Delete student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
