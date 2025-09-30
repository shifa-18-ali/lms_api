import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  suggestion: { type: String }
});

const lessonSchema = new mongoose.Schema({
  lessonId: { type: String, required: true },
  title: { type: String, required: true },
  explanation: { type: String },
  exampleCode: { type: String },
  quiz: [quizSchema]
});

const moduleSchema = new mongoose.Schema({
  moduleId: { type: Number, required: true },
  title: { type: String, required: true },
  duration: { type: String },
  lessons: [lessonSchema]
});

const courseSchema = new mongoose.Schema({
  courseId:{ type: String, required: true },
  courseTitle: { type: String, required: true },
  url: { type: String }, // image or thumbnail
  description: { type: String },
  modules: [moduleSchema]
});

export default mongoose.model("Course", courseSchema);
