import { useLocation } from "react-router-dom"
import ViewStudent from "../components/Students/ViewStudent"
import EditStudent from "../components/Students/EditStudent"
import CreateStudent from "../components/Students/CreateStudent"

export default function Students(){
    const {pathname} = useLocation()
    return (
        pathname.includes("view") ? (
            <ViewStudent/>
        ) : pathname.includes("edit") ? (
            <EditStudent/>
        ) : pathname.includes("create") ? (
            <CreateStudent/>
        ) : (
            <h1>Ruta no encontrada :(</h1>
        )
    )
}