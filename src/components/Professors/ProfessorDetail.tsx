import axios from "axios"
import { useEffect, useState } from "react"
import { ResponseError, ResponseProfessor, Course } from "../../Types"
import Container from "../Container"
import ErrorComponent from "../ErrorComponent"
import ViewButtonsDetail from "../ViewButtonsDetail"

export default function ProfessorDetail({id} : {id : string}){
    const [detail, setDetail] = useState<ResponseProfessor>()
    const [error, setError] = useState<ResponseError>()
    const [courseId, setCourseId] = useState<number>()
    const [professorCoursesToAdd, setProfessorCoursesToAdd] = useState<Array<Course>>()

    const getDetail = async () => {
        try{
            const response = await axios("http://localhost:8080/professor/" + id)
            setDetail(response.data)
        } catch(error: any){
            setError(error.response.data)
        }
    }

    const getCourses = async () => {
        const response = await axios("http://localhost:8080/course")
        const allCourses : Array<Course> = response.data.data
        const professorCoursesIds = detail?.data.courses && detail?.data.courses.map((course) => course.id)

        const coursesToAdd = allCourses.filter((course) => !professorCoursesIds?.includes(course.id))
        setProfessorCoursesToAdd(coursesToAdd)
    }

    useEffect(() => {
        detail && getCourses()
    }, [detail])

    useEffect(() => {
        getDetail() 
    }, [])

    const changeActive = async () => {
        try{
            await axios.put(`http://localhost:8080/professor/${detail?.data.active ? "deactivate" : "restore"}/${detail?.data.id}`)
            getDetail()
        } catch (error){
            console.log(error)
        }
    }

    const addCourse = async () => {
        try{
            if(courseId != 0){
                await axios.post("http://localhost:8080/professor/assignCourse", {professorId: detail?.data.id, courseId})
                getDetail()
            }
        } catch (error){
            console.log(error)
        }
    }

    return (
        <Container>
            {detail?.data ? (
                <div>
                    <ViewButtonsDetail LinkChangeActive={changeActive} LinkRedirectEdit={"http://localhost:5173/edit/professor/" + detail?.data.id} active={detail.data.active}/>
                    {detail.data.active ? (
                        <div className="flex flex-col items-center h-[350px] justify-evenly">
                            <span className="text-2xl">Nombre: {detail.data.name} {detail.data.lastName}</span>
                            <span className="text-2xl">Especialidad: {detail.data.specialty}</span>
                            <span className="text-2xl">DNI: {detail.data.dni}</span>
                            {detail.data.courses?.length ? (
                                <>
                                    <span className="text-xl">Cursos que imparte: </span>
                                    {detail.data.courses.map((course) => {
                                        if(course.active)return <span className="" key={course.id}>{course.name} - {course.code}</span>
                                    })}
                                </>
                            ) : (
                                <span>El profesor no tiene cursos</span>
                            )}
                            {professorCoursesToAdd?.length ? (
                                <div className="flex flex-col items-center">
                                    <label>Agregar un curso</label>
                                    <select onChange={(e) => setCourseId(Number(e.target.value))}>
                                        <option></option>
                                        {professorCoursesToAdd?.map((course) => {
                                            if(course.active)return <option key={course.id} value={course.id}>{course.name} - {course.code}</option>
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
                            <h1 className="text-3xl">El profesor se encuentra inactivo en la base de datos</h1>
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
                        <h1>Profesor no encontrado</h1>
                    )
                )}
        </Container>
    )
}