import { Request, Response } from "express";
import Mapping from "../Model/MappingModel";
import Course from "../Model/coursesModel";
import Student from "../Model/studentModel";
import Teacher from "../Model/teacherModel";
// POST -> Save mapping
export const createMapping = async (req: Request, res: Response) => {
  try {
    const { teacherId, studentId, courseId } = req.body;

    const teacher = await Teacher.findById(teacherId);
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!teacher || !student || !course) {
      return res.status(404).json({ message: "Invalid teacher, student, or course ID" });
    }

    const mapping = new Mapping({ teacherId, studentId, courseId });
    await mapping.save();

    res.status(201).json({ message: "Mapping created successfully", mapping });
  } catch (error) {
    res.status(500).json({ message: "Error creating mapping", error });
  }
};;

// GET -> Get single course details by courseId
export const getMappings = async (req: Request, res: Response) => {
  try {
    const mappings = await Mapping.find()
      .populate("teacherId", "name email")
      .populate("studentId", "name email")
      .populate("courseId", "title description");
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mappings", error });
  }
}
export const getMappingsByTeacher = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;
    const mappings = await Mapping.find({ teacherId })
      .populate("studentId", "name email")
      .populate("courseId", "title");
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mappings", error });
  }
};

// 🔍 Get mappings by student ID
export const getMappingsByStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const mappings = await Mapping.find({ studentId })
      .populate("teacherId", "name email")
      .populate("courseId", "title");
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mappings", error });
  }
};

// 🗑️ Delete mapping
export const deleteMapping = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mapping = await Mapping.findByIdAndDelete(id);
    if (!mapping) return res.status(404).json({ message: "Mapping not found" });
    res.status(200).json({ message: "Mapping deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mapping", error });
  }
};
