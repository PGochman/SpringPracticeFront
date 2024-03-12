import { useEffect, useState } from "react"
import { GradeCreation, ResponseCourseArray, ResponseError, ResponseStudentArray } from "../../Types"
import axios from "axios"
import validateGrade from "../../validations/ValidateGrade"
import { useNavigate } from "react-router-dom"
import ErrorComponent from "../ErrorComponent"
import Container from "../Container"

export default function CreateGrade(){
    const [grade, setGrade] = useState<GradeCreation>({
        grade: 0,
        evaluationType: "",
        studentId: 0,
        courseId: 0
    })
    const [validateError, setValidateError] = useState<Array<string>>([])
    const [allCourses, setAllCourses] = useState<ResponseCourseArray>()
    const [error, setError] = useState<ResponseError | null>()
    const [allStudents, setAllStudents] = useState<ResponseStudentArray>()
    const navigate = useNavigate()



    const changeGrade = (e: any) => { 
        setGrade({
            ...grade, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setValidateError(validateGrade(grade))
        if(!grade.studentId){
            setValidateError((error) => error.concat("-Se debe seleccionar un estudiante"))
        }
        if(!grade.courseId){
            setValidateError((error) => error.concat("-Se debe seleccionar un curso"))
        }
        setError(null)
    }, [grade])

    const updateStudent = async (e: any) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:8080/grade", grade)
            navigate("/view/grades")
        } catch(error: any){
            setError(error.response)
        }
    }

    const getCourses = async () => {
        const response = await axios("http://localhost:8080/course")
        setAllCourses(response.data)
    }

    const getStudents = async () => {
        const response = await axios("http://localhost:8080/student")
        setAllStudents(response.data)
    }

    useEffect(() => {
        getCourses()
        getStudents()
    }, [])

    return (
        <Container>
            <h1 className="text-4xl">Crear nota</h1>
            <form className="flex flex-col justify-around items-center min-h-[500px] h-fit" onSubmit={updateStudent}>
                <section>
                    <label htmlFor="grade">Nota: </label>
                    <input type="number" min={1} max={10} step={0.5} name="grade" value={grade?.grade} onChange={changeGrade}></input>
                </section>

                <section>
                    <label htmlFor="evaluationType">Tipo de evaluación: </label>
                    <input name="evaluationType" value={grade?.evaluationType} onChange={changeGrade}></input>
                </section>

                <section className="text-center">
                            <h1>Marque el curso al que corresponde la nota</h1>
                            {allCourses?.data?.map((course) => {
                                if(course.active)return <div key={course.id}>
                                    <label htmlFor="courseId">{course.name}</label>
                                    <input checked={course.id == grade.courseId} type="radio" onChange={changeGrade} name="courseId" value={course.id}></input>
                                </div>
                            })}
                        </section>

                        <section className="text-center">
                            <h1>Marque el estudiante al que corresponde la nota</h1>
                            {allStudents?.data?.map((student) => {
                                if(student.active)return <div key={student.id}>
                                    <label htmlFor="studentId">{student.name} {student.lastName}</label>
                                    <input checked={student.id == grade.studentId} type="radio" onChange={changeGrade} name="studentId" value={student.id}></input>
                                </div>
                            })}
                        </section>

                <section className="flex flex-col text-center">
                    {validateError.map((error) => {
                    return <span className="text-red-500">{error}</span>
                    })}
                </section>


                <button className={`${validateError.length > 0 ? "bg-blue-200" : "bg-blue-500"} p-1 rounded border-2 border-blue-700`} type="submit" disabled={validateError.length > 0}>Crear nota</button>
            </form>
            {error && (
                <ErrorComponent>
                    <h1>{error.data.message}</h1>
                </ErrorComponent>
            )}
        </Container>
    )
}