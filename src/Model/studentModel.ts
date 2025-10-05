import mongoose, { Schema, Document } from "mongoose";

const StudentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enrolled_courses: [{ type: String }], 
  
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;
