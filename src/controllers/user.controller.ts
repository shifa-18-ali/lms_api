import express, { Request, Response } from "express";
import User from "../Model/userModel";
import Teacher from "../Model/teacherModel";
import Student from "../Model/studentModel";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const secretKey = "mySuperSecretKey123";
export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password')
    .populate("profileId")
    ;
    return res.status(200).json(users);
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error fetching users", error: err });
  }
};

export const register = async (req: Request, res: Response) => {
  try {

    const {

      name,
      email,
      password,
      role,

      // teacher fields
      experience,
      specialization,

      // common fields
      dob,
      phoneNo,
      address,
      bio,
      qualification,
      profile_picture,

      // student fields
    

      // course fields
      assigned_courseid,
      enrolled_courseid

    } = req.body;

    // =====================================================
    // ✅ CHECK EXISTING USER
    // =====================================================

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // =====================================================
    // ✅ HASH PASSWORD (OPTIONAL)
    // =====================================================

    // const hashedPassword = await bcrypt.hash(password, 10);

    // =====================================================
    // ✅ CREATE USER
    // =====================================================

    const user = new User({
      name,
      email,
      password,
      role
    });

    const savedUser = await user.save();

    // =====================================================
    // ✅ ROLE-BASED DOCUMENT CREATION
    // =====================================================

    try {

      // =================================================
      // ✅ STUDENT REGISTER
      // =================================================

      if (role === "student") {

        const student = new Student({

          userId: savedUser._id,

          dob,
          phoneNo,
          address,
          qualification,
     
          profile_picture,

        

          // initially empty
          enrolled_courseid: enrolled_courseid || []

        });

        await student.save();
      }

      // =================================================
      // ✅ TEACHER REGISTER
      // =================================================

      else if (role === "teacher") {

        const teacher = new Teacher({

          userId: savedUser._id,

          experience,
          dob,
          phoneNo,
          address,
          bio,
          qualification,
          specialization,
          profile_picture,

          // initially empty
          assigned_courseid: assigned_courseid || []

        });

        await teacher.save();
      }

    } catch (err: any) {

      console.error("Role-specific save error:", err);

      // ✅ rollback user if role save fails
      await User.findByIdAndDelete(savedUser._id);

      return res.status(400).json({
        message: "Role-specific save failed",
        error: err.message
      });
    }

    // =====================================================
    // ✅ SUCCESS RESPONSE
    // =====================================================

    res.status(201).json({
      message: "User registered successfully",

      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role
      }
    });

  } catch (err: any) {

    console.error("Registration Error Details:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate("profileId")
    .select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};
// 🔹 Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("profileId");
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch)
    //   return res.status(400).json({ message: "Invalid email or password" });
    // if (!secretKey) {
    //   return res.status(500).json({ message: "JWT_SECRET not defined" });
    // } else {
    //   const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
    //     expiresIn: "1h",
    //   });

    res.json({
      message: "Login successful",
      // token,
      user,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params; // email comes from URL parameter

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch role-specific data
    let roleData = null;
    if (user.role === "student") {
      roleData = await Student.findOne({ userId: user._id }).select('-password');
    } else if (user.role === "teacher") {
      roleData = await Teacher.findOne({ userId: user._id }).select('-password');
    }

    res.status(200).json({ user, roleData });
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
