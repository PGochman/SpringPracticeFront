import { useEffect, useState } from "react"
import { Grade, ResponseError, ResponseGradeArray } from "../../Types"
import axios from "axios"
import GradeCard from "./GradeCard"
import Container from "../Container"
import ViewAllData from "../ViewAllData"
import ErrorComponent from "../ErrorComponent"

export default function ViewGrade(){
    const [grades, setGrades] = useState<ResponseGradeArray>()
    const [activeGrades, setActiveGrades] = useState<Array<Grade>>([])
    const [inactiveGrades, setInactiveGrades] = useState<Array<Grade>>([])
    const [error, setError] = useState<ResponseError | null>(null)
    const [studentId, setStudentId] = useState<string>("")
    const [courseId, setCourseId] = useState<string>("")


    const getGrades = async () => {
        const response = await axios("http://localhost:8080/grade")
        setGrades(response.data)
        
    }

    useEffect(() => {
        if(grades){
            const active : Array<Grade> = []
            const inactive : Array<Grade> = []
            grades.data.forEach((grade : Grade) => {
                grade.active? active.push(grade) : inactive.push(grade)
            })
            setActiveGrades(active)
            setInactiveGrades(inactive)
        }
        setError(null)
    }, [grades])

    const changeActive = async (grade: Grade) => {
        try{
            await axios.put(`http://localhost:8080/grade/${grade.active ? "deactivate" : "restore"}/${grade.id}`)
            getGrades()
            setError(null)
        } catch(error: any){
            setError(error.response.data)
        }
    }

    const handleStudentChange = (e: any) => {
        setStudentId(e.target.value)
        setCourseId("")
        setError(null)
    }

    const handleCourseChange = (e: any) => {
        setCourseId(e.target.value)
        setStudentId("")
        setError(null)
    }

    const findGradeByStudentId = async () => {
        try{
            const response = await axios("http://localhost:8080/grade/student/" + Number(studentId))
            setGrades(response.data)
        } catch(error: any){
            setError(error.response)
        }
    }

    const findGradeByCourseId = async () => {
        try{
            const response = await axios("http://localhost:8080/grade/course/" + courseId)
            setGrades(response.data)
        } catch(error: any){
            setError(error.response)
        }
    }

    const cleanFilters = () => {
        getGrades()
        setStudentId("")
        setCourseId("")
    }

    useEffect(() => {
        getGrades()
    }, [])
    return (
        <Container>
            <h1 className="text-4xl pb-12">Ver todos los cursos, o buscar por apellido y/o especialidad</h1>
            <section className="pb-8 justify-items-center grid grid-cols-3 w-[900px]">
                <div className="grid grid-rows-3 gap-y-2">
                    <label htmlFor="studentId">Id del estudiante a buscar: </label>
                    <input name="studentId" value={studentId} onChange={handleStudentChange}></input>
                    <button className="bg-blue-500 border border-blue-700 rounded" disabled={!studentId.length} onClick={findGradeByStudentId}>Buscar por estudiante</button>
                </div>
                <div className="grid grid-rows-3 gap-y-2">
                    <label htmlFor="courseId">Id del curso a buscar: </label>
                    <input name="courseId" value={courseId} onChange={handleCourseChange}></input>
                    <button className="bg-blue-500 border border-blue-700 rounded" disabled={!courseId.length} onClick={findGradeByCourseId}>Buscar por estudiante</button>
                </div>
                <div className="flex justify-around items-end w-full">
                    <button className="bg-blue-500 border border-blue-700 rounded" onClick={cleanFilters}>Quitar filtros</button>
                </div>
            </section>
            <>
                {grades?.data.length ? (
                    <>
                    {activeGrades.length ? (
                        <>
                            <h1 className="text-4xl pb-8">Notas activas</h1>
                            <ViewAllData>
                                {activeGrades.map((grade) => {
                                    return <GradeCard grade={grade} key={grade.id} changeActive={changeActive} />
                                })}
                            </ViewAllData>
                        </>
                    ) : ""}
                    {inactiveGrades.length ? (
                        <>
                        <h1 className="text-4xl pb-8">Notas desactivadas</h1>
                        <ViewAllData>
                            {inactiveGrades.map((grade) => {
                                return <GradeCard grade={grade} key={grade.id} changeActive={changeActive} />
                            })}
                        </ViewAllData>
                    </>
                    ) : ""}
                    </>
                ) : (
                    <h1>No hay notas cargadas</h1>
                )}
                {error && <ErrorComponent>
                    <h1>{error.data.message}</h1>
                    </ErrorComponent>}
            </>
        </Container>
    )
}