import mongoose, { Schema } from "mongoose";

const StudentSchema: Schema = new Schema(
  {
 
    // name: { type: String, required: true },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dob: { type: Date },
  class: { type: String },
   
  
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;
