import express ,{request,response} from 'express'
import  User from '../Model/userModel'

const router=express.Router()

import { getUser, login, register, getUserById } from '../controllers/user.controller';
router.get('/getUser',getUser)

router.post("/register",register)
router.post('/login',login)
router.get("/:_id",  getUserById);

 // 🔑 use process.env.JWT_SECRET in real app

// 🔹 Register new user




export default router;