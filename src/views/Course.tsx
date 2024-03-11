import { useLocation, useParams } from "react-router-dom";
import CourseDetail from "../components/Courses/CourseDetail";
import EditCourse from "../components/Courses/EditCourses";

export default function Course(){
    const {id} = useParams()
    const {pathname} = useLocation()

    return (
        id ? 
        pathname.includes("view") ? (
            <CourseDetail id={id}/>
        ) : (
            pathname.includes("edit") ? (
                <EditCourse id={id}/>
            ) : <h1>Ruta no encontrada</h1>
        ) : (
            <h1>Ruta no encontrada</h1>
        )
    )
}