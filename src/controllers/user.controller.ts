import express ,{Request,Response} from 'express'
import  User from '../Model/userModel'

const router=express.Router()
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 const secretKey ='mySuperSecretKey123';
export const getUser=async(req:Request,res:Response)=>{
try{
const user= await User.find({})
return res.status(200).json(user)
}
catch(err){
return res.status(400).json({mesage:err})
}

}
export const register= async (req:Request,res:Response) => {
  try {
    const { id, name, email, password, role, avatar } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      id,
      name,
      email,
      password: hashedPassword,
      role,
      avatar,
    });

    await newUser.save();
  return  res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
   return res.status(500).json({ message: error.message });
  }
}

// 🔹 Login user
export const login= async (req:Request,res:Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
   if (!secretKey) {
      return res.status(500).json({ message: "JWT_SECRET not defined" });
    }else{
      const token = jwt.sign(
      { id: user._id, role: user.role },
     secretKey,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } }catch (err: any) {
    res.status(500).json({ message: err.message });
  }
    
    
}




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