import mongoose from "mongoose";

const courseMappingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // assuming you have a User model
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // reference Course model
    required: true,
  }
}, { timestamps: true });

const CourseMapping = mongoose.model("CourseMapping", courseMappingSchema);
export default CourseMapping;
