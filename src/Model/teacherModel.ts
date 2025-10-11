import mongoose from 'mongoose'
const TeacherSchema=new mongoose.Schema({
    name: { type: String, required: true },
    dob:{type: Date, required: true},
    gender:{ type: String, required: true },
    phoneNo:{ type: Number, required: true },
    address:{ type: String, required: true },
    bio: { type: String },
    qualification: { type: String },
    specialization: { type: String },
    assigned_courses: [{ type: String }],
     profile_picture: {type:String,required:true}
  },
  { timestamps: true 

})
export default mongoose.model("Teacher",TeacherSchema)