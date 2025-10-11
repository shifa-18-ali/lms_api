import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  { // custom user id
    name: { type: String, required: true },
    password: { type: String, required: true },
 email: { type: String, required: true, unique: true },
 gender:{ type: String, required: true, unique: true },
   role: { type: String, enum: ["teacher", "student","admin"], required: true },
  profileId: { type: mongoose.Schema.Types.ObjectId, refPath: "role" },
  
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
