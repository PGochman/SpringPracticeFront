import { Link } from "react-router-dom";
import { Grade } from "../../Types";
import Card from "../Card";

export default function GradeCard({grade, changeActive} : {grade : Grade, changeActive: (grade: Grade) => Promise<void>}){
    return(
        <Card>
            <span>Nota: {grade.grade}</span>
            <span>Evaluación: {grade.evaluationType}</span>
            <span>Estudiante: {grade.student.name + " " + grade.student.lastName}</span>
            <span>Curso: {grade.course.name + "-" + grade.course.code}</span>
            <div className="flex justify-evenly p-1 items-center"> 
                <Link className="bg-blue-200 border border-blue-400 p-1 text-center" to={"/edit/grade/" + grade.id}>Editar</Link>
                <button onClick={() => changeActive(grade)} className="bg-blue-200 border border-blue-400 p-1 w-fit">{grade.active ? "Desactivar" : "Reactivar"}</button>
            </div>
        </Card>
    )
}