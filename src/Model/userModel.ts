import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  { // custom user id
  //   name: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // role: { type: String, enum: ["teacher", "student"], required: true },
  // profileId: { type: mongoose.Schema.Types.ObjectId, refPath: "role" } 
   name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },
 
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
