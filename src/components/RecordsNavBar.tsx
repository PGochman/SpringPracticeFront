import LinkButton from "./LinkButton";
import { useLocation } from "react-router-dom";

export default function RecordsNavBar(){
    const {pathname} = useLocation()
    return(
        <nav className="grid gap-y-16 flex-col justify-between py-6 px-32">
            <LinkButton path={pathname + "/students"} text="Estudiantes" />
            <LinkButton path={pathname + "/professors"} text="Profesores" />
            <LinkButton path={pathname + "/courses"} text="Cursos" />
            <LinkButton path={pathname + "/grades"} text="Notas" />
        </nav>
    )
}