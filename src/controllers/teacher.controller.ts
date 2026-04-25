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
    const { email } = req.params; // email from URL param

    // Find user with role = "teacher" and given email
    const user = await User.findOne({ email, role: "teacher" });

      
   
    if (!user) {
      return res.status(404).json({ message: "Teacher not found" });
    }
 const teacher = await Teacher.findOne({ userId: user._id })
      .populate("assigned_courseid", "courseTitle")
      .populate("courseassigned_studentid ","name")
    // Find teacher details using userId reference
    
    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }
      const courses = (teacher.assigned_courseid || []).map((course :any) => ({
      coursename: course.courseTitle,
      id: course._id
    }));
    const students = (teacher.courseassigned_studentid || []).map((student :any) => ({
      name: student.name,
      id: student._id
    }));

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
      assigned_courseid: courses,
      courseassigned_studentid:students,
      //array object------------
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

   

      res.status(200).json({
      total: teacher.assigned_courseid.length,
      courses: teacher.assigned_courseid
    });

  } catch (error: any) {
    console.error("Error fetching assigned courses:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};