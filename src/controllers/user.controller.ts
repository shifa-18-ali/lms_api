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
        const users = await User.find().populate("profileId");
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({  message: "Error fetching users",error:err});
  }
};







export const register = async (req:Request, res:Response) => {
  try {
    const { name, email, password, role, experience,

dob,
phoneNo,
address,
bio,
qualification,
specialization,
assigned_courses,
profile_picture,
gender
 } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, password: hashedPassword, role });
    const savedUser = await user.save();

    // Save in role-specific collection
    if (role === "student") {
const student = new Student({ userId: savedUser._id, gender,dob
 });
      await student.save();
    } else if (role === "teacher") {
      const teacher = new Teacher({ userId: savedUser._id, experience,

dob,
phoneNo,
address,
bio,
qualification,
specialization,
assigned_courses,
profile_picture,});
      await teacher.save();
    }

    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
  console.error("Registration Error Details:", err); // 👈 this logs the exact error
  res.status(500).json({ message: "Server error", error: err });
}

};
;

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate("profileId");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};
;
;
;

// 🔹 Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

 const user = await User.findOne({ email }).populate("profileId");
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });
    if (!secretKey) {
      return res.status(500).json({ message: "JWT_SECRET not defined" });
    } else {
      const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
        expiresIn: "1h",
      });

      res.json({
        message: "Login successful",
        token,
        user
      });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params; // grab `id` from URL
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
