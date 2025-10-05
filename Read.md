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

#   4. Student Routes 
    Create Student : (method:POST)- /createStudent
    Get Students :    (method :GET) - /getStudents
    Get Students By Id : (method :GET) - /getStudentById/:id
    Update Students By Id : (method :PUT) - /upStudent/:id
    Delete Students By Id : (method :DELETE) - /delStudent/:id
#   5. Mapping Routes (Teacher,Students,Course)
    Create Mapping : (method:POST)- /createMapping
    Get Mapping data :    (method :GET) - /getMappings
    Get Techers data By Id : (method :GET) - /teacher/:teacherId
    Get Students data By Id : (method :GET) - /student/:studentId"
    Delete Mapping By Id : (method :DELETE) - /delmapp/:id

# Example -https://lms-api-f87o.onrender.com/ 
#                    OR
#           http://localhost:5000/getCourse


               