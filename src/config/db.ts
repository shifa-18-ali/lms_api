 import mongoose from "mongoose";
 const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/lms";

export const connectDb=async ()=>{
    
        mongoose.connect( MONGO_URI)
.then(()=>console.log('db connected')) 
   

}