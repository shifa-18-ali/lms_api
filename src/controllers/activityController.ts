import { Request, Response } from "express";
const Activity=require('../Model/activityModel')

export const updateSessionStatus = async (req: Request, res: Response) => {
  try {

    const { userId, courseId, bookingId, status } = req.params;

    // Validate status
    const validStatus = ["started", "inprogress", "complete"];

    if (!validStatus.includes(status as string)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const activity = await Activity.findOneAndUpdate(
      {
        studentId: userId,
        courseId: courseId,
        bookingId: bookingId
      },
      {
        status: status
      },
      { new: true }
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Session status updated successfully",
      data: activity
    });

  } catch (error) {
    console.error("Error updating session:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error
    });
  }
};