import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      required: true,
      ref: "User"
    },


    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

     createdAt: {
    type: Date,
    default: Date.now
  },
 

    role: { type: String, enum: ["student", "teacher"], required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
