import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  dob: {
    type: Date
  },

  phoneNo: {
    type: String
  },

  address: {
    type: String
  },

  qualification: {
    type: String
  },

  

  profile_picture: {
    type: String
  },

  enrolled_courseid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
guardian :{
  type:String
}
  
 

},
{
  timestamps: true
});

export default mongoose.model("Student", studentSchema);