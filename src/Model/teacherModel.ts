import mongoose from 'mongoose'
const TeacherSchema=new mongoose.Schema({
    // name: { type: String, required: true },
    // experience:{ type: String, required: true },
    // subject:{ type: String, required: true },
    // dob:{type: Date, required: true},
    
    // phoneNo:{ type: Number, required: true },
    // address:{ type: String, required: true },
    // bio: { type: String },
    // qualification: { type: String },
    // specialization: { type: String },
    // assigned_courses: [{ type: String }],
    //  profile_picture: {type:String,required:true}


      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String },
  experience: { type: Number },
  },
  { timestamps: true 

})
export default mongoose.model("Teacher",TeacherSchema)