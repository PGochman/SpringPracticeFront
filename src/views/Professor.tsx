import { useLocation, useParams } from "react-router-dom";
import ProfessorDetail from "../components/Professors/ProfessorDetail";
import EditProfessor from "../components/Professors/EditProfessor";

export default function Professor(){
    const {id} = useParams()
    const {pathname} = useLocation()

    return (
        id ? 
        pathname.includes("view") ? (
            <ProfessorDetail id={id}/>
        ) : (
            pathname.includes("edit") ? (
                <EditProfessor id={id}/>
            ) : <h1>Ruta no encontrada</h1>
        ) : (
            <h1>Ruta no encontrada</h1>
        )
    )
}