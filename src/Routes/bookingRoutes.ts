import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingsByEmail
} from "../controllers/bookingController";

const router = express.Router();

router.post("/createBooking", createBooking);
router.get("/getAllBookings", getAllBookings);
router.get("/getBookinguser/:email", getBookingsByEmail);

export default router;
