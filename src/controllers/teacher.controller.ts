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




export const getTeacherByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params; // email from URL param

    // Find user with role = "teacher" and given email
    const user = await User.findOne({ email, role: "teacher" });
    if (!user) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find teacher details using userId reference
    const teacher = await Teacher.findOne({ userId: user._id });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    // Combine data for response
    const teacherData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      experience: teacher.experience,
      dob: teacher.dob,
      phoneNo: teacher.phoneNo,
      address: teacher.address,
      bio: teacher.bio,
      qualification: teacher.qualification,
      specialization: teacher.specialization,
      assigned_courses: teacher.assigned_courses,
      profile_picture: teacher.profile_picture
    };

    res.status(200).json({ teacher: teacherData });
  } catch (err) {
    console.error("Error fetching teacher by email:", err);
    res.status(500).json({ message: "Server error", error: err});
  }
};
;
;

// ✏️ Update teacher
export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) return res.status(404).json({ message: "Teacher not found" });
    else
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
