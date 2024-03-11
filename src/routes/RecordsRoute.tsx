import { Routes, Route } from "react-router-dom";
import Students from "../views/Students";
import Professors from "../views/Professors";
import Courses from "../views/Courses";
import Grades from "../views/Grades";
import Professor from "../views/Professor";
import Student from "../views/Student";
import Grade from "../views/Grade";
import Course from "../views/Course";

export default function RecordRoutes({path} : {path: string}) {
  return (
    <Routes>
      <Route path={path + "/students"} element={<Students />} />
      <Route path={path + "/student/:id"} element={<Student />} />
      <Route path={path + "/professor/:id"} element={<Professor />} />
      <Route path={path + "/professors"} element={<Professors />} />
      <Route path={path + "/courses"} element={<Courses />} />
      <Route path={path + "/course/:id"} element={<Course />} />
      <Route path={path + "/grades"} element={<Grades />} />
      <Route path={path + "/grade/:id"} element={<Grade />} />
    </Routes>
  );
}
