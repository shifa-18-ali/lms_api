import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Teacher from "../Model/teacherModel";
import User from "../Model/userModel";
import Course from '../Model/coursesModel'
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
    const teachers = await User.find({ role: "teacher" }).select("-password") // ❌ exclude password
      .populate("profileId");
 
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
};




export const getTeacherByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    // ✅ Find teacher user
    const user = await User.findOne({ email, role: "teacher" }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // ✅ Populate BOTH courses + students
    const teacher = await Teacher.findOne({ userId: user._id })
      .populate("assigned_courseid", "courseTitle")
      .populate("courseassigned_studentid", "name"); // 🔥 added

    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    // ✅ Format courses
    const courses = (teacher.assigned_courseid || []).map((course: any) => ({
      id: course._id,
      coursename: course.courseTitle
    }));

    // ✅ Format students
    const students = (teacher.courseassigned_studentid || []).map((student: any) => ({
      id: student._id,
      name: student.name
    }));

    // ✅ Final response
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

      assigned_courseid: courses,              // courses array
      courseassigned_studentid: students,       // 🔥 added students array

      profile_picture: teacher.profile_picture
    };

    res.status(200).json({ teacher: teacherData });

  } catch (err: any) {
    console.error("Error fetching teacher by email:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};
;
;

// ✏️ Update teacher
export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 🔹 Split fields
    const {
      name,
      email,
      experience,
      dob,
      phoneNo,
      address,
      bio,
      qualification,
      specialization,
      assigned_courseid,
      courseassigned_studentid,
      profile_picture
    } = req.body;

    // ✅ Update User collection
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // ✅ Update Teacher collection
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { userId: id },
      {
        experience,
        dob,
        phoneNo,
        address,
        bio,
        qualification,
        specialization,
        assigned_courseid,
        courseassigned_studentid,
        profile_picture
      },
      { new: true, runValidators: true }
    ).populate("assigned_courseid"); // optional

    res.status(200).json({
      message: "Teacher updated successfully",
      user: updatedUser,
      teacher: updatedTeacher
    });

  } catch (error: any) {
    console.error("Update Teacher Error:", error);
    res.status(500).json({
      message: "Error updating teacher",
      error: error.message
    });
  }
};
;

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

export const getAssignedCourseByTeacher = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    // ✅ Find teacher by userId
    const teacher = await Teacher.findOne({ userId: _id })
       .populate("assigned_courseid");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

     const courses = (teacher.assigned_courseid || []).map((course: any) => ({
      id: course._id,
      coursename: course.courseTitle
    }));

      res.status(200).json({
      total: teacher.assigned_courseid.length,
      courses: courses
    });

  } catch (error: any) {
    console.error("Error fetching assigned courses:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
 export const getStudentsByTeacher = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const teacher = await Teacher.findOne({ userId: _id })
      .populate("courseassigned_studentid", "name email dob");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const students = (teacher.courseassigned_studentid || []).map((s: any) => ({
      id: s._id,
      name: s.name,
      email: s.email,
      dob:s.dob
    }));

    res.status(200).json({
      totalStudents: students.length,
      students
    });

  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message
    });
  }
};