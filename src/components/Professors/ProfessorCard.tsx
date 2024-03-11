import { Link } from "react-router-dom";
import { Professor } from "../../Types";
import Card from "../Card";

export default function ProfessorCard({professor} : {professor : Professor}){
    return(
        <Link to={"/view/professor/" + professor.id}>
            <Card>
                <span>Nombre: {professor.name + " " + professor.lastName}</span>
                <span>Especialidad: {professor.specialty}</span>
            </Card>
        </Link>
    )
}