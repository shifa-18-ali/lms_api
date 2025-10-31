import { Request, Response } from "express";
import StudentActivity from "../Model/studentActivityModel";

// Update or create lesson progress
export const updateActivity = async (req: Request, res: Response) => {
  try {
    const { studentId, courseId, lessonId, progress, timeSpent, completed } = req.body;

    if (!studentId || !courseId || !lessonId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const activity = await StudentActivity.findOneAndUpdate(
      { studentId, courseId, lessonId },
      {
        $set: {
          progress,
          completed,
          lastAccessed: Date.now(),
        },
        $inc: { timeSpent: timeSpent || 0 },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: "Activity updated successfully", activity });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update activity", error });
  }
};

// Get progress for a course
export const getCourseProgress = async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.params;

    const activities = await StudentActivity.find({ studentId, courseId });
    if (!activities.length) {
      return res.status(200).json({ overallProgress: 0, activities: [] });
    }

    const totalProgress =
      activities.reduce((sum, act) => sum + act.progress, 0) / activities.length;

    return res.status(200).json({
      overallProgress: Math.round(totalProgress),
      activities,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get progress", error });
  }
};
