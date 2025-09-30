import express,{Request,Response} from 'express'
const router=express.Router()
import Course from '../Model/coursesModel'
 export const getCourse=async(req:Request,res:Response)=>{
    try {
      const course = await Course.find({});
      res.status(200).json(course);
    } catch (err:any) {
      res.status(500).json({ message: err.message });
      console.log(err)
    }
  }




// Create (POST) a new course
export const createCourse = async (req:Request, res:Response) => {
  try {
    const { courseId,courseTitle, url, description, modules } = req.body;

    if (!courseTitle) {
      return res.status(400).json({ error: "courseTitle is required" });
    }

    // Create course directly (Mongoose handles nested schemas)
    const course = new Course({
      courseId,
      courseTitle,
      url,
      description,
      modules
    });

    await course.save();

    res.status(201).json({
      message: "Course created successfully",
      course
    });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ error: err });
  }
};
;
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params; // grab `id` from URL
    const course = await Course.findById(_id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}







