import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // custom user id
    name: { type: String, required: true },
    password: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      required: true,
    },
    avatar: { type: String, default: null },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
