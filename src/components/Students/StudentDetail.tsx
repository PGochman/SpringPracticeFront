import axios from "axios"
import { useState, useEffect } from "react"
import { Course, ResponseError, ResponseStudent } from "../../Types"
import Container from "../Container"
import ViewButtonsDetail from "../ViewButtonsDetail"
import ErrorComponent from "../ErrorComponent"

export default function StudentDetail({id} : {id: string}){
    const [detail, setDetail] = useState<ResponseStudent>()
    const [studentCoursesToAdd, setStudentCoursesToAdd] = useState<Array<Course>>()
    const [courseId, setCourseId] = useState<number>()
    const [error, setError] = useState<ResponseError>()
    const getDetail = async () => {
        try{
            const response = await axios("http://localhost:8080/student/" + id)
            const student = response.data.data
            let [year, month, day] = response.data.data.birthDate.split("-")
            day = day.split("T")[0]
            setDetail({data: {
                ...student, birthDate: `${day}/${month}/${year}`
            }
            })
        } catch(error: any){
            setError(error.response.data)
        }
    }

    useEffect(() => {
        getDetail()
    }, [])

    useEffect(() => {
        detail && getCourses()
    }, [detail])

    const changeActive = async () => {
        try{
            await axios.put(`http://localhost:8080/student/${detail?.data.active ? "deactivate" : "restore"}/${detail?.data.id}`)
            getDetail()
        } catch (error: any){
            setError(error.response.data)
        }
    }

    const getCourses = async () => {
        const response = await axios("http://localhost:8080/course")
        const allCourses : Array<Course> = response.data.data.filter((course : Course) => course.active)
        const studentCoursesIds = detail?.data.courses && detail?.data.courses.map((course) => course.id)

        const coursesToAdd = allCourses.filter((course) => !studentCoursesIds?.includes(course.id))
        setStudentCoursesToAdd(coursesToAdd)
    }

    const addCourse = async () => {
        try{
            if(courseId != 0){
                await axios.post("http://localhost:8080/student/assignCourse", {studentId: detail?.data.id, courseId})
                getDetail()
            }
        } catch (error: any){
            setError(error.response.data)
        }
    }
    return (
        <Container>
            {detail?.data ? (
                <div>
                    <ViewButtonsDetail LinkChangeActive={changeActive} LinkRedirectEdit={"http://localhost:5173/edit/student/" + detail?.data.id} active={detail.data.active} />
                    {detail.data.active ? (
                        <div  className="flex flex-col items-center h-[450px] justify-evenly">
                            <span className="text-2xl">Nombre: {detail.data.name} {detail.data.lastName}</span>
                            <span className="text-2xl">Fecha de nacimiento: {detail.data.birthDate}</span>
                            <span className="text-xl">Dirección: {detail.data.address}</span>
                            <span className="text-xl">DNI: {detail.data.dni}</span>
                            <span className="text-xl">Notas del estudiante:</span>
                            {detail.data.grades?.length ? (
                                detail.data.grades.map((grade) => {
                                    return <span key={grade.id}>{grade.course.name}: {grade.evaluationType} - {grade.grade}</span>
                                })
                                ) : (
                                    <span>El alumno no tiene notas cargadas</span>
                            )}
                            <span>Cursos a los que asiste:</span>
                            {detail.data.courses?.length ? (
                                detail.data.courses.map((course) => {
                                    if(course.active)return <span key={course.id}>{course.name} - {course.code}</span>
                                })
                            ) : (
                                <span>El alumno no asiste a ningun curso</span>
                            )}
                            {studentCoursesToAdd?.length ? (
                                <div className="flex flex-col items-center">
                                    <label>Agregar un curso</label>
                                    <select onChange={(e) => setCourseId(Number(e.target.value))}>
                                        <option></option>
                                        {studentCoursesToAdd?.map((course) => {
                                            if(course.active) return <option key={course.id} value={course.id}>{course.name} - {course.code}</option>
                                        })}
                                    </select>
                                    <button onClick={addCourse} disabled={courseId == 0}>Agregar curso</button>
                                </div>
                            ) : (
                                <div>
                                    <h1>Todos los cursos posibles están asignados al profesor</h1>
                                    <h2>Si quiere asignarle un curso nuevo, hay que crearlo primero</h2>
                                    <h2>Para quitar un curso, dirigirse a la pestaña de editar</h2>
                                </div>
                            )}
                        </div>
                    ) : (
                        <ErrorComponent>
                            <h1 className="text-3xl">El estudiante se encuentra inactivo en la base de datos</h1>
                        </ErrorComponent>
                    )}
                </div>
            ) : (
                error?.data ? (
                    <ErrorComponent>
                        <h1 className="text-3xl">{error.data.message.toUpperCase()}</h1>
                            <h1 className="text-xl">Revise el enlace e intentelo de nuevo</h1>
                    </ErrorComponent>
                ) : (
                    <h1>Estudiante no encontrado</h1>

                )
            )}
        </Container>
    )
}