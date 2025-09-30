import mongoose from 'mongoose'
import cors from 'cors'
import express ,{Application} from 'express'
import dotenv from "dotenv";
import coursesRoutes from './Routes/coursesRoutes'
import userRoutes from './Routes/userRoutes'
import seed from './Routes/json.Routes'
import courseMappingRoutes from './Routes/courseMappingRoutes'
const app:Application=express()
import {connectDb} from './config/db'

dotenv.config();

app.use(cors())
app.use(express.json())
connectDb()
app.use('',coursesRoutes)
app.use('',userRoutes)
app.use('',seed)
app.use('',courseMappingRoutes)
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})