import { useLocation, useParams } from "react-router-dom";
import EditGrade from "../components/Grades/EditGrade";

export default function Grade(){
    const {id} = useParams()
    const {pathname} = useLocation()

    return (
        id ? 
        pathname.includes("edit") ? (
            <EditGrade id={id}/>
        ) : <h1>Ruta no encontrada</h1>
        : <h1>Ruta no encontrada</h1>
    )
}