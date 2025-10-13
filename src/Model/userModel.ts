import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  { // custom user id
    name: { type: String, required: true },
    password: { type: String, required: true },
 email: { type: String, required: true, unique: true },
 gender:{ type: String, required: true, unique: true },
   role: { type: String, enum: ["teacher", "student","admin"], required: true },
    
    dob:{type: Date, required: true},
    
    phoneNo:{ type: Number, required: true },
    address:{ type: String, required: true },
    bio: { type: String },
    qualification: { type: String },
    specialization: { type: String },
    assigned_courses: [{ type: String }],
     profile_picture: {type:String,required:true},
  profileId: { type: mongoose.Schema.Types.ObjectId, refPath: "role" },
  
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
