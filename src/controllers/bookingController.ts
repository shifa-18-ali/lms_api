import Booking from "../Model/bookingModel";
import User from "../Model/userModel"
import { Request,Response } from "express";





export const createBooking = async (req:Request, res:Response) => {
  try {
    const { profileId, courseId, createdAt, role } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ _id: profileId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Allow only students to make bookings
    if (user.role !== "student") {
      return res.status(403).json({ message: "Only students can book courses." });
    }

    // 3️⃣ Check for duplicate booking (same student + same course)
    const existingBooking = await Booking.findOne({
      profileId,
      courseId
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Booking already exists for this student and course."
      });
    }

    // 4️⃣ Create new booking
    const newBooking = new Booking({
    
     profileId, courseId, createdAt, role
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
      // 1️⃣ Join Booking → User to get student info
      {
        $lookup: {
          from: "users",
          localField: "userEmail", // Booking stores student email
          foreignField: "email",   // User email
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },

      // 2️⃣ Only select students (optional)
      {
        $match: { "userInfo.role": "student" }
      },

      // 3️⃣ Join Booking → Course to get course info
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "courseInfo"
        }
      },
      { $unwind: "$courseInfo" },

      // 4️⃣ Project only the fields we want
      {
        $project: {
          _id: 0,
          studentName: "$userInfo.name",
          courseId: "$courseInfo._id",
          courseTitle: "$courseInfo.title",
          courseDuration: "$courseInfo.duration",
          bookingDate: 1,
          bookingTime: 1
        }
      }
    ]);

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching booking details:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};


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
