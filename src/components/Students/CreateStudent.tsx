import { useEffect, useState } from "react"
import { StudentCreation, ResponseCourseArray, ResponseError } from "../../Types"
import axios from "axios"
import validateStudent from "../../validations/validateStudent"
import { useNavigate } from "react-router-dom"
import ErrorComponent from "../ErrorComponent"
import Container from "../Container"

export default function CreateStudent(){
    const [student, setStudent] = useState<StudentCreation>({
        name: "",
        lastName: "",
        birthDate: "",
        address: "",
        dni: 0
    })
    const [coursesId, setCoursesId] = useState<Array<number>>([])
    const [validateError, setValidateError] = useState<Array<string>>([])
    const [allCourses, setAllCourses] = useState<ResponseCourseArray>()
    const [error, setError] = useState<ResponseError | null>()
    const navigate = useNavigate()

    const changeStudent = (e: any) => { 
        setStudent({
            ...student, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setValidateError(validateStudent(student))
        setError(null)
    }, [student])

    const updateStudent = async (e: any) => {
        e.preventDefault()
        const data = {...student, coursesId}
        try{
            await axios.post("http://localhost:8080/student", data)
            navigate("/view/students")
        } catch(error: any){
            console.log(error.response)
            setError(error.response)
        }
    }

    const getCourses = async () => {
        const response = await axios("http://localhost:8080/course")
        setAllCourses(response.data)
    }

    const checkCourses = (e: any) => {
        if(coursesId?.includes(Number(e.target.value))){
            setCoursesId((oldCourses) => oldCourses?.filter((courseId) => courseId != e.target.value))
        } else {
            setCoursesId((oldCourses) => oldCourses?.concat(Number(e.target.value)))
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <Container>
            <h1 className="text-4xl">Crear estudiante</h1>
            <form className="flex flex-col justify-around items-center h-[500px]" onSubmit={updateStudent}>
                <section>
                    <label htmlFor="name">Nombre: </label>
                    <input name="name" value={student?.name} onChange={changeStudent}></input>
                </section>

                <section>
                    <label htmlFor="lastName">Apellido: </label>
                    <input name="lastName" value={student?.lastName} onChange={changeStudent}></input>
                </section>

                <section>
                    <label htmlFor="address">Dirección: </label>
                    <input name="address" value={student?.address} onChange={changeStudent}></input>
                </section>

                <section>
                    <label htmlFor="dni">DNI: </label>
                    <input name="dni" value={student?.dni} onChange={changeStudent}></input>
                </section>

                <section>
                    <label htmlFor="birthDate">Fecha de nacimiento: </label>
                    <input name="birthDate" value={student?.birthDate} type="date" onChange={changeStudent}></input>
                </section>

                <section className="text-center">
                    <h1>Marque los cursos que quiera que tenga asignado el estudiante</h1>
                    {allCourses?.data.map((course) => {
                        if(course.active)return <div key={course.id}>
                            <label htmlFor={String(course.id)}>{course.name}</label>
                            <input type="checkbox" onChange={checkCourses} name={String(course.id)} checked={coursesId?.includes(course.id)} value={course.id}></input>
                        </div>
                    })}
                </section>

                <section className="flex flex-col text-center">
                    {validateError.map((error) => {
                    return <span className="text-red-500">{error}</span>
                    })}
                </section>


                <button className={`${validateError.length > 0 ? "bg-blue-200" : "bg-blue-500"} p-1 rounded border-2 border-blue-700`} type="submit" disabled={validateError.length > 0}>Crear estudiante</button>
            </form>
            {error && (
                <ErrorComponent>
                    <h1>{error.data.message}</h1>
                </ErrorComponent>
            )}
        </Container>
    )
}