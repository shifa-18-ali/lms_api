
import express from "express";
import {authenticate,authorize} from '../middlewares/auth.middleware'
const router = express.Router();
import { getCourse,createCourse,getCourseById,getCourseName}  from "../controllers/course.controller";
 

// router.get('/getCourse',authenticate,getCourse);
router.get('/getCourse',getCourse);
// router.post("/createCourse", authenticate, authorize(["admin"]),createCourse, (req, res) => {
//   res.json({ message: "Course created (Admin only)" });
// });
router.post("/createCourse", createCourse);

// // router.get('/addCourse',addCourses);
// router.get('/getCourseById/:_id',authenticate,getCourseById)
router.get('/getCourseById/:_id',getCourseById)

router.get('/getCourseName',getCourseName)







 
//   )
  export default router