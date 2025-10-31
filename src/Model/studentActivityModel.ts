import mongoose from "mongoose";

const studentActivitySchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  lessonId: { type: String, required: true }, // matches lessonSchema.lessonId
  progress: { type: Number, default: 0 }, // 0–100%
  completed: { type: Boolean, default: false },
  timeSpent: { type: Number, default: 0 }, // seconds
  lastAccessed: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("StudentActivity", studentActivitySchema);
