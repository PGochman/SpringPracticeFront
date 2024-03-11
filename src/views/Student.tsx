import { useLocation, useParams } from "react-router-dom";
import StudentDetail from "../components/Students/StudentDetail";
import EditStudent from "../components/Students/EditStudent";

export default function Student(){
    const {id} = useParams()
    const {pathname} = useLocation()

    return (
        id ? 
        pathname.includes("view") ? (
            <StudentDetail id={id}/>
        ) : (
            pathname.includes("edit") ? (
                <EditStudent id={id}/>
            ) : <h1>Ruta no encontrada</h1>
        ) : (
            <h1>Ruta no encontrada</h1>
        )
    )
}