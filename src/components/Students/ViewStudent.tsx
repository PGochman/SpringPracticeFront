import { useEffect, useState } from "react"
import { ResponseStudentArray, Student } from "../../Types"
import axios from "axios"
import Container from "../Container"
import ViewAllData from "../ViewAllData"
import StudentCard from "./StudentCard"

export default function ViewGrade(){
    const [students, setStudents] = useState<ResponseStudentArray>()
    const [activeStudents, setActiveStudents] = useState<Array<Student>>()
    const [inactiveStudents, setInactiveStudents] = useState<Array<Student>>()


    const getGrades = async () => {
        const response = await axios("http://localhost:8080/student")
        setStudents(response.data)
        const inactive = response.data.data.filter((student: Student) => !student.active)
        const active = response.data.data.filter((student: Student) => student.active)
        setActiveStudents(active)
        setInactiveStudents(inactive)
    }   

    useEffect(() => {
        getGrades()
    }, [])
    return (
        <Container>
            {students?.data.length ? (
                <>
                {activeStudents?.length ? (
                    <>
                        <h1 className="text-4xl pb-4">Estudiantes activos</h1>
                        <ViewAllData>
                            {activeStudents.map((student) => {
                              return <StudentCard student={student} key={student.id}/>  
                            })}
                        </ViewAllData>
                    </>
                ) : ""}
                {inactiveStudents?.length ? (
                    <>
                        <h1 className="text-4xl pb-4">Estudiantes inactivos</h1>
                        <ViewAllData>
                            {inactiveStudents.map((student) => {
                              return <StudentCard student={student} key={student.id}/>  
                            })}
                        </ViewAllData>
                    </>
                ) : ""}
                </>
            ) : (
                <h1>No hay Estudiantes cargados</h1>
            )}
        </Container>
    )
}
{/* <ViewAllData>
    {students?.data ? (
        students.data.map(student => {
            return(
                <StudentCard student={student} key={student.id}/>
            )
        })
    ) : (
        <h1>No hay Estudiantes cargados</h1>
    )}
</ViewAllData> */}