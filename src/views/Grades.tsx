import { useLocation } from "react-router-dom"
import ViewGrade from "../components/Grades/ViewGrade"
import EditGrade from "../components/Grades/EditGrade"
import CreateGrade from "../components/Grades/CreateGrade"

export default function Grades(){
    const {pathname} = useLocation()
    return (
        pathname.includes("view") ? (
            <ViewGrade/>
        ) : pathname.includes("edit") ? (
            <EditGrade/>
        ) : pathname.includes("create") ? (
            <CreateGrade/>
        ) : (
            <h1>Ruta no encontrada :(</h1>
        )
    )
}