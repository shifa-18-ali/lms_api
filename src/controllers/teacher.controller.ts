import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Teacher from "../Model/teacherModel";
import User from "../Model/userModel";

// export const createTeacher = async (req: Request, res: Response) => {
//   try {
//     const { name, bio,gender,dob, phoneNo,address, qualification, specialization,assigned_courses,profile_picture } = req.body;

   

//     const newTeacher = await Teacher.create({
//       name,
//       bio,
//       dob,
//       gender,
//       phoneNo,
//       address,
//       qualification,
//       specialization,
//       assigned_courses,
//       profile_picture
//     });

//     res.status(201).json(newTeacher);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating teacher", error });
//   }
// };

// 📚 Get all teachers
export const getTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await User.find({ role: "teacher" }).populate("profileId");
 
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
};

// 🔍 Get a teacher by ID
export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const {email}=req.params
      const user = await User.findOne({ email, role: "teacher" })
    if (!user) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teacher", error });
  }
};

// ✏️ Update teacher
export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: "Error updating teacher", error });
  }
};

// 🗑️ Delete teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting teacher", error });
  }
};
