# start server : nodemon / npm start
# Server running on port 5000 (for openening the site locally) : localhost:5000/

# For Live Server : https://lms-api-f87o.onrender.com/

# Endpoints :-
#   1. User Routes
         Register : (method :POST) - /register
         Login    : (method :POST) - /login
         Get User : (method :GET)  - /getUser
         Get User by Id : (method :GET) -  /user/:_id
#   2. Courses Routes 
        Create Course : (method:POST)- /createCourse
        Get Courses :    (method :GET) - /getCourse
    Get Course By Id : (method :GET) - /getCourseById/:_id
#   3. Teacher Routes 
     Create Teacher : (method:POST)- /createTeacher
        Get Teachers :    (method :GET) - /getTeacher
    Get Teacher By Id : (method :GET) - /getTeacherbyid/:id
    Update Teacher By Id : (method :PUT) - /upTeacher/:id
    Delete Teacher By Id : (method :DELETE) - /delTeacher/:id
#                       Example json (Model of teacher)
{
  "name":"Vivek",
  "email":"vivek@gmail.com",
  "password":"vi123",
  "bio":"5 years of experience of teaching in rust language",
  "qualification":"M.Tech",
  "specialization":"Rust programming",
  "assigned_courses":["rust"],
  "profile_picture":"https://img.freepik.com/free-photo/closeup-portrait-caucasian-happy-teacher-glasses_74855-9736.jpg"
}

#   4. Student Routes 
    Create Student : (method:POST)- /createStudent
    Get Students :    (method :GET) - /getStudents
    Get Students By Id : (method :GET) - /getStudentById/:id
    Update Students By Id : (method :PUT) - /upStudent/:id
    Delete Students By Id : (method :DELETE) - /delStudent/:id

#                       Example json (Model of Student)
{
  "name": "rohit",
  "email": "rohita@gmail.com",
  "password": "rohit3489",
  "enrolled_courses": ["angular"]
  }

#   5. Mapping Routes (Teacher,Students,Course)
    Create Mapping : (method:POST)- /createMapping
    Get Mapping data :    (method :GET) - /getMappings
    Get Techers data By Id : (method :GET) - /teacher/:teacherId
    Get Students data By Id : (method :GET) - /student/:studentId"
    Delete Mapping By Id : (method :DELETE) - /delmapp/:id

#                       Example json (Model of Mapping)
{
  "studentId": "68e27d389305fd9d98b6c84b",
  "courseId": "68e251e2daf37f86d0f2b9c1",
  "teacherId":"68e295bdb8e4956e083750bf"
}


# Example -https://lms-api-f87o.onrender.com/ 
#                    OR
#           http://localhost:5000/getCourse


               