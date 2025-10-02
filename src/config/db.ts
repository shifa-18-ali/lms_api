 import mongoose from "mongoose";
 const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://shifa_db_ali12:shifa_18ali@cluster0.hegt8xi.mongodb.net/lms";

export const connectDb=async ()=>{
    
        mongoose.connect( MONGO_URI)
.then(()=>console.log('db connected')) 
   

}