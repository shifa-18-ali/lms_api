import mongoose, { Schema } from "mongoose";

const StudentSchema: Schema = new Schema(
  {
     profileId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
  
   
  
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;
