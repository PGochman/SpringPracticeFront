import { useEffect, useState } from "react"
import { ResponseStudentArray } from "../../Types"
import axios from "axios"
import Container from "../Container"
import ViewAllData from "../ViewAllData"
import StudentCard from "./StudentCard"

export default function ViewGrade(){
    const [students, setStudents] = useState<ResponseStudentArray>()

    const getGrades = async () => {
        const response = await axios("http://localhost:8080/student")
        setStudents(response.data)
    }   

    useEffect(() => {
        getGrades()
    }, [])
    return (
        <Container>
            <ViewAllData>
                {students?.data ? (
                    students.data.map(student => {
                        return(
                            <StudentCard student={student} key={student.id}/>
                        )
                    })
                ) : (
                    <h1>No hay Profesores cargados</h1>
                )}
            </ViewAllData>
        </Container>
    )
}