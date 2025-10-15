import mongoose from 'mongoose'
import cors from 'cors'
import express ,{Application} from 'express'
import dotenv from "dotenv";
import coursesRoutes from './Routes/coursesRoutes'
import userRoutes from './Routes/userRoutes'
import seed from './Routes/json.Routes'
import MappingRoutes from './Routes/MappingRoutes'
import teacherRoutes from './Routes/teacherRoutes'
import studentRoutes from './Routes/studentRoutes'
import translateRoutes from './Routes/translateRoutes'
const app:Application=express()
import {connectDb} from './config/db'

dotenv.config();

app.use(cors())
app.use(express.json())
connectDb()
app.use('',coursesRoutes)
app.use('',userRoutes)
app.use('',seed)
app.use('',MappingRoutes)
app.use('',teacherRoutes)
app.use('',studentRoutes)
app.use("/api/translate", translateRoutes);
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})