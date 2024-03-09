import { Routes, Route } from "react-router-dom";
import Students from "../views/Students";
import Professors from "../views/Professors";
import Courses from "../views/Courses";
import Grades from "../views/Grades";

export default function RecordRoutes({path} : {path: string}) {
  return (
    <Routes>
      <Route path={path + "/students"} element={<Students />} />
      <Route path={path + "/professors"} element={<Professors />} />
      <Route path={path + "/courses"} element={<Courses />} />
      <Route path={path + "/grades"} element={<Grades />} />
    </Routes>
  );
}
