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



export const getAllBookings = async (req:Request, res:Response) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
}

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
