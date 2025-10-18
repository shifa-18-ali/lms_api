import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      ref: "User"
    },


    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    bookingDate: {
      type: Date,
      required: true
    },
    bookingTime: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
