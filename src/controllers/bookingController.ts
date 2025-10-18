import Booking from "../Model/bookingModel";
import User from "../Model/userModel"
import { Request,Response } from "express";





export const createBooking = async (req:Request, res:Response) => {
  try {
    const { userEmail, courseId, bookingDate, bookingTime, status } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Allow only students to make bookings
    if (user.role !== "student") {
      return res.status(403).json({ message: "Only students can book courses." });
    }

    // 3️⃣ Check for duplicate booking (same student + same course)
    const existingBooking = await Booking.findOne({
      userEmail,
      courseId
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Booking already exists for this student and course."
      });
    }

    // 4️⃣ Create new booking
    const newBooking = new Booking({
    
      userEmail,
      courseId,
      bookingDate,
      bookingTime,
      status: status || "pending"
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};





export const getBookingDetails = async (req:Request, res:Response) => {
  try {
    const bookings = await Booking.aggregate([
      // 1️⃣ Join with User collection to get student name
      {
        $lookup: {
          from: "users",
          localField: "userEmail",
          foreignField: "email",
          as: "studentInfo"
        }
      },
      { $unwind: "$studentInfo" },
      { $match: { "studentInfo.role": "student" } },

      // 2️⃣ Join with Course collection
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "courseInfo"
        }
      },
      { $unwind: "$courseInfo" },

      // 3️⃣ Calculate total duration in minutes
      {
        $addFields: {
          totalDurationMinutes: {
            $sum: {
              $map: {
                input: "$courseInfo.modules",
                as: "module",
                in: {
                  $let: {
                    vars: {
                      hours: {
                        $toInt: {
                          $ifNull: [
                            {
                              $arrayElemAt: [
                                {
                                  $regexFind: { input: "$$module.duration", regex: "(\\d+)h" }
                                },
                                "match"
                              ]
                            },
                            0
                          ]
                        }
                      },
                      minutes: {
                        $toInt: {
                          $ifNull: [
                            {
                              $arrayElemAt: [
                                {
                                  $regexFind: { input: "$$module.duration", regex: "(\\d+)m" }
                                },
                                "match"
                              ]
                            },
                            0
                          ]
                        }
                      }
                    },
                    in: { $add: [{ $multiply: ["$$hours", 60] }, "$$minutes"] }
                  }
                }
              }
            }
          }
        }
      },

      // 4️⃣ Convert minutes to human-readable hours and minutes
      {
        $addFields: {
          totalDurationFormatted: {
            $concat: [
              { $toString: { $floor: { $divide: ["$totalDurationMinutes", 60] } } },
              "h ",
              { $toString: { $mod: ["$totalDurationMinutes", 60] } },
              "m"
            ]
          }
        }
      },

      // 5️⃣ Final Projection
      {
        $project: {
          _id: 0,
          studentName: "$studentInfo.name",
          studentEmail: "$studentInfo.email",
          courseId: "$courseInfo._id",
          courseTitle: "$courseInfo.courseTitle",
          courseDescription: "$courseInfo.description",
          totalDurationFormatted: 1,
          bookingDate: 1,
          bookingTime: 1
        }
      }
    ]);

    if (!bookings.length) {
      return res.status(404).json({ message: "No student bookings found" });
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching student booking details:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
;


export const getBookingsByEmail = async (req:Request, res:Response) => {
  try {
    const { email } = req.params;
    const bookings = await Booking.find({ userEmail: email });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
