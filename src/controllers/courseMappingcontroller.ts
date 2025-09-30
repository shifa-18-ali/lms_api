import { Request, Response } from "express";
import CourseMapping from "../Model/courseMappingModel";
import Course from "../Model/coursesModel.js";

// POST -> Save mapping
export const createMapping = async (req:Request, res:Response) => {
  try {
    const {userId,courseId } = req.body;

    const mapping = new CourseMapping({ userId, courseId });
    await mapping.save();

    res.status(201).json(mapping);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// GET -> Get single course details by courseId
export const getCourseById = async (req:Request, res:Response) => {
  try {
    const { courseId } = req.params;

    // Find mapping & populate the course
    const mapping = await CourseMapping.findOne({ courseId }).populate("courseId");

    if (!mapping) {
      return res.status(404).json({ message: "Course not found for this ID" });
    }

    res.json(mapping.courseId); // return the course details
  } catch (err) {
    res.status(500).json({ error: err});
  }
};
