import { useLocation } from "react-router-dom"
import ViewCourse from "../components/Courses/ViewCourse"
import CreateCourse from "../components/Courses/CreateCourse"

export default function Courses(){
    const {pathname} = useLocation()
    return (
        pathname.includes("view") ? (
            <ViewCourse/>
        ) : pathname.includes("create") ? (
            <CreateCourse/>
        ) : (
            <h1>Ruta no encontrada :(</h1>
        )
    )
}