
import express from "express";
import {authenticate,authorize} from '../middlewares/auth.middleware'
const router = express.Router();
import { getCourse,createCourse,getCourseById}  from "../controllers/course.controller";
 

router.get('/getCourse',authenticate,getCourse);
router.post("/createCourse", authenticate, authorize(["admin"]),createCourse, (req, res) => {
  res.json({ message: "Course created (Admin only)" });
});
router.get('/getCourseById/:_id',authenticate,getCourseById)
// router.get('/addCourse',addCourses);
//   
// router.get(`/getCourse/:_id`,async(request,response)=>{
  
//   const _id = request.params
//   try {
//     const course = await Course.findById(_id);
//     return response.status(200).json(course);
//   } catch (error) {
//     response.status(400).json({ message: error });
//     console.log(error)
//   }
// }

// )
// router.post('/editCourse',async(req,res)=>{
//   const editedcourse=req.body.editedcourse
//   try {
//     const pizza = await Item.findOne({_id:editedpizza._id});
//     pizza.name=editedpizza.name
//     pizza.description=editedpizza.description
//     pizza.image=editedpizza.image
//     pizza.category=editedpizza.category
//     pizza.prices=[editedpizza.prices]
//   await  pizza.save()
//   res.send('Pizza updated Succesfully!!!')
//   } catch (error) {
//     return res.status(400).json({message:error})
//   }
// })

// router.post('/deleteCourse/:_id',async(request,response)=>{
//   const _id = request.params
//   try {
//     await Course.findOneAndDelete(_id)
//     response.send('Course Deleted Succesfully!!')
   
//   } catch (error) {
//     response.status(400).json({ message: error });
//     console.log(error)
//   }
// }






 
//   )
  export default router