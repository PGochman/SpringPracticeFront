import { Link } from "react-router-dom";
import { Course } from "../../Types";
import Card from "../Card";

export default function CourseCard({course} : {course: Course}){
    return(
        <Link to={"/view/course/" + course.id}>
            <Card>
                <span>Nombre: {course.name}</span>
                <span>Descripción: {course.description}</span>
                <span>Código: {course.code}</span>
            </Card>
        </Link>
    )
}