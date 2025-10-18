import express from "express";
import {
  createBooking,
  getBookingDetails,
  getBookingsByEmail
} from "../controllers/bookingController";

const router = express.Router();

router.post("/createBooking", createBooking);
router.get("/getBookingDetails", getBookingDetails);
router.get("/getBookinguser/:email", getBookingsByEmail);

export default router;
