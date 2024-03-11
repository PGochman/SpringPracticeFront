import { Link } from "react-router-dom";
import { Student } from "../../Types";
import Card from "../Card";

export default function StudentCard({student} : {student : Student}){
    let [year, month, day] = student.birthDate.split("-")
    day = day.split("T")[0]
    
    return(
        <Link to={"/view/student/" + student.id}>
            <Card>
                <span>Nombre: {student.name + " " + student.lastName}</span>
                <span>Fecha de nacimiento: {`${day}/${month}/${year}`}</span>
                <span>Dirección: {student.address}</span>
            </Card>
        </Link>
    )
}