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
    const { email } = req.params;

    // Find the user first
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    // Find the student details linked with this user
    const student = await Student.findOne({ userId: user._id }).populate("userId");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found for this user" });
    }

    // Combine both user and student details in a single response
    const fullDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      dob: student.dob,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json(fullDetails);
  } catch (err) {
    console.error("Error fetching student details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

;

// ✏️ Update student info
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true 
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
