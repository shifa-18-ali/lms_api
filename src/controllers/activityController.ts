import { Request, Response } from "express";
const Activity = require("../Model/activityModel");


// START SESSION
export const startSession = async (req: Request, res: Response) => {
  try {

    const { bookingId } = req.params;

    const activity = await Activity.findOneAndUpdate(
      { bookingId },
      { status: "inprogress" },
      { new: true }
    );

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found"
      });
    }

    res.status(200).json({
      message: "Session Started",
      data: activity
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error
    });
  }
};



// COMPLETE SESSION
export const completeSession = async (req: Request, res: Response) => {
  try {

    const { bookingId } = req.params;

    const activity = await Activity.findOneAndUpdate(
      { bookingId },
      { status: "complete" },
      { new: true }
    );

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found"
      });
    }

    res.status(200).json({
      message: "Session Completed",
      data: activity
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error
    });
  }
};



// STUDENT ACTIVITY DASHBOARD
export const getActivityHistory = async (req: Request, res: Response) => {
  try {

    const { studentId } = req.params;

    const activities = await Activity.find({ studentId })
      .populate("courseId", "courseTitle")
      .populate("bookingId", "slotDateTime");

    const bookingCount = activities.length;

    const completed = activities.filter(
      (a: { status: string; }) => a.status === "complete"
    ).length;

    const inprogress = activities.filter(
      (a: { status: string; }) => a.status === "inprogress"
    ).length;

    const started = activities.filter(
      (a: { status: string; }) => a.status === "started"
    ).length;

    res.status(200).json({
      bookingCount,
      completed,
      inprogress,
      started,
      activities
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error
    });
  }
};



// ADMIN DASHBOARD
export const adminDashboard = async (req: Request, res: Response) => {
  try {

    const activities = await Activity.find()
      .populate("studentId", "name email")
      .populate("courseId", "courseTitle")
      .populate("bookingId", "slotDateTime");

    res.status(200).json({
      total: activities.length,
      activities
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error
    });
  }
};