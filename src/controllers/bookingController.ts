import Booking from "../Model/bookingModel";
import User from "../Model/userModel"
import { Request,Response } from "express";

export const createBooking = async (req:Request, res:Response) => {
  try {
    const { userEmail, courseId, bookingDate, bookingTime, status } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const booking = new Booking({
    
      userEmail: user.email,
      courseId,
      bookingDate,
      bookingTime,
      status: status || "pending"
    });

    const savedBooking = await booking.save();
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
