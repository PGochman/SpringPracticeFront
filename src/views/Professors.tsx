import { useLocation } from "react-router-dom"
import ViewProfessor from "../components/Professors/ViewProfessor"
import EditProfessor from "../components/Professors/EditProfessor"
import CreateProfessor from "../components/Professors/CreateProfessor"

export default function Professors(){
    const {pathname} = useLocation()
    return (
        pathname.includes("view") ? (
            <ViewProfessor/>
        ) : pathname.includes("edit") ? (
            <EditProfessor/>
        ) : pathname.includes("create") ? (
            <CreateProfessor/>
        ) : (
            <h1>Ruta no encontrada :(</h1>
        )
    )
}