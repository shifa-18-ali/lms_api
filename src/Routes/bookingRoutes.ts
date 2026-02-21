import express from "express";
import {
  createBooking,
  getBookingList,
  getBookingsByEmail
} from "../controllers/bookingController";

const router = express.Router();

router.post("/createBooking", createBooking);
router.get("/getBookingList/:userId", getBookingList);
router.get("/getBookinguser/:email", getBookingsByEmail);

export default router;
