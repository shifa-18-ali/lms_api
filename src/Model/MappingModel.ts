import mongoose from "mongoose";

const MappingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",   // assuming you have a User model
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // reference Course model
    required: true,
  },
   teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", // reference Course model
    required: true,
  }
}, { timestamps: true });

const Mapping = mongoose.model("Mapping", MappingSchema);
export default Mapping;
