import { useEffect, useState } from "react"
import { ResponseError, Course, Grade, Student } from "../../Types"
import axios from "axios"
import Container from "../Container"
import { useNavigate } from "react-router-dom"
import validateGrade from "../../validations/ValidateGrade"
import ErrorComponent from "../ErrorComponent"

export default function EditGrade({id} : {id: string}){
    const [error, setError] = useState<ResponseError | null>(null)
    const [validateError, setValidateError] = useState<Array<string>>([])
    const [allCourses, setAllCourses] = useState<Array<Course>>()
    const [allStudents, setAllStudents] = useState<Array<Student>>()
    const [grade, setGrade] = useState<Grade>()
    const [studentId, setStudentId] = useState<number>()
    const [courseId, setCourseId] = useState<number>()
    const navigate = useNavigate()

    const getDetail = async () => {
        try{
            const response = await axios("http://localhost:8080/grade/" + id)
            setGrade(response.data.data)
            setStudentId(response.data.data.student.id)
            setCourseId(response.data.data.course.id)

        } catch(error: any){
            setError(error.response.data)
        }
    }

    const getCourses = async () => {
        try{
            const response = await axios("http://localhost:8080/course")
            setAllCourses(response.data.data)
        } catch(error: any){
            setError(error.response.data)
        }
    }

    const getStudents = async () => {
        try{
            const response = await axios("http://localhost:8080/student")
            setAllStudents(response.data.data)
        } catch(error: any){
            setError(error.response.data)
        }
    }

    useEffect(() => {
        getDetail()
        getCourses()
        getStudents()
    }, [])

    useEffect(() => {
        grade &&
        setValidateError(validateGrade(grade))
    }, [grade])

    const changeGrade = (e: any) => {
        if(grade){
            setGrade({...grade, [e.target.name]: e.target.value})
        }
    }

    const changeCourse = (e: any) => {
        setCourseId(e.target.value)
    }

    const changeStudent = (e: any) => {
        setStudentId(e.target.value)
    }

    const updateStudent = async (e: any) => {
        e.preventDefault()
        const data = {...grade, courseId, studentId}
        try{
            await axios.put("http://localhost:8080/grade", data)
            navigate("/view/grades")
        } catch(error: any){
            console.log(error)
            setError(error.response.data)
        }
    }


    return(
        <Container>
            {!error && grade ? (
                !grade?.active ? (
                    <ErrorComponent>
                        <h1 className="text-4xl">La nota no se puede editar porque esta desactivada, activala desde la pestaña de vistas para poder editarla</h1>
                    </ErrorComponent>
                ) : (
                    <form className="flex flex-col justify-around items-center h-[500px]" onSubmit={updateStudent}>
                        <section>
                            <label htmlFor="grade">Nota: </label>
                            <input type="number" min={1} max={10} step={0.5} name="grade" value={grade?.grade || ""} onChange={changeGrade}></input>
                        </section>

                        <section>
                            <label htmlFor="evaluationType">Evaluación: </label>
                            <input name="evaluationType" value={grade?.evaluationType || ""} onChange={changeGrade}></input>
                        </section>

                        <section className="text-center">
                            <h1>Marque el curso al que corresponde la nota</h1>
                            {allCourses?.map((course) => {
                                return <div key={course.id}>
                                    <label htmlFor="courseId">{course.name}</label>
                                    <input checked={course.id == courseId} type="radio" onChange={changeCourse} name="courseId" value={course.id}></input>
                                </div>
                            })}
                        </section>

                        <section className="text-center">
                            <h1>Marque el estudiante al que corresponde la nota</h1>
                            {allStudents?.map((student) => {
                                return <div key={student.id}>
                                    <label htmlFor="studentId">{student.name} {student.lastName}</label>
                                    <input checked={student.id == studentId} type="radio" onChange={changeStudent} name="studentId" value={student.id}></input>
                                </div>
                            })}
                        </section>

                        <section className="flex flex-col text-center">
                            {validateError.map((error) => {
                            return <span className="text-red-500">{error}</span>
                            })}
                        </section>


                        <button className={`${validateError.length > 0 ? "bg-blue-200" : "bg-blue-500"} p-1 rounded border-2 border-blue-700`} type="submit" disabled={validateError.length > 0}>Guardar cambios</button>
                    </form>
                )
            ) : (
                <h1>{error?.data.message}</h1>
            )}
        </Container>
    )
}