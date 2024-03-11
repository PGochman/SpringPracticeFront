import { useEffect, useState } from "react"
import { ResponseStudent, ResponseError, Course, Student } from "../../Types"
import axios from "axios"
import Container from "../Container"
import { useNavigate } from "react-router-dom"
import validateStudent from "../../validations/validateStudent"

export default function EditStudent({id} : {id: string}){
    const [detail, setDetail] = useState<ResponseStudent>()
    const [error, setError] = useState<ResponseError | null>(null)
    const [validateError, setValidateError] = useState<Array<string>>([])
    const [studentCoursesToAdd, setStudentCoursesToAdd] = useState<Array<number>>()
    const [allCourses, setAllCourses] = useState<Array<Course>>()
    const [student, setStudent] = useState<Student>()

    const navigate = useNavigate()

    const getDetail = async () => {
        try{
            const response = await axios("http://localhost:8080/student/" + id)
            setDetail(response.data)
            setStudent(response.data.data)
            const student = response.data.data
            let [year, month, day] = response.data.data.birthDate.split("-")
            day = day.split("T")[0]
            let date = `${year}-${month}-${day}`
            setStudent({
                ...student, birthDate: date
            })
        } catch(error: any){
            setError(error.response.data)
        }
    }

    const getCourses = async () => {
        const response = await axios("http://localhost:8080/course")
        const allCourses : Array<Course> = response.data.data.filter((course : Course) => course.active)
        const studentCoursesIds = detail?.data.courses && detail?.data.courses.filter((course) => course.active).map((course) => course.id)

        const coursesToAdd : Array<number> = []
        allCourses.forEach((course) =>{
            if(studentCoursesIds?.includes(course.id)) coursesToAdd.push(course.id)
        })
        setStudentCoursesToAdd(coursesToAdd)
        setAllCourses(allCourses)
    }

    useEffect(() => {
        student && 
        setValidateError(validateStudent(student))
    }, [student])

    useEffect(() => {
        detail && getCourses()
    }, [detail])

    useEffect(() => {
        getDetail() 
    }, [])

    const changeStudent = (e: any) => {
        if(student){
            setStudent({...student, [e.target.name]: e.target.value})
        }
    }

    const checkCourses = (e : any) => {
        studentCoursesToAdd?.includes(Number(e.target.value)) ? 
        setStudentCoursesToAdd((currentCourses) => currentCourses?.filter((course) => e.target.value != course))
        :
        setStudentCoursesToAdd((currentCourses) => currentCourses?.concat(Number(e.target.value)))
    }

    const updateStudent = async (e: any) => {
        e.preventDefault()
        const data = {...student, coursesId: studentCoursesToAdd}
        try{
            await axios.put("http://localhost:8080/student", data)
            navigate("/view/student/" + id)
        } catch(error: any){
            setError(error.response.data)
        }
    }



    return(
        <Container>
            {!error ? (

            <form className="flex flex-col justify-around items-center h-[500px]" onSubmit={updateStudent}>
                <section>
                    <label htmlFor="name">Nombre: </label>
                    <input name="name" value={student?.name || ""} onChange={changeStudent}></input>
                </section>

                <section>
                    <label htmlFor="lastName">Apellido: </label>
                    <input name="lastName" value={student?.lastName || ""} onChange={changeStudent}></input>
                </section>

                <section>
                    <label htmlFor="address">Especialidad: </label>
                    <input name="address" value={student?.address || ""} onChange={changeStudent}></input>
                </section>

                <section>
                    <label htmlFor="dni">DNI: </label>
                    <input name="dni" value={student?.dni || ""} onChange={changeStudent}></input>
                </section>

                <section>
                    <label htmlFor="birthDate">Fecha de nacimiento: </label>
                    <input name="birthDate" value={student?.birthDate || ""} type="date" onChange={changeStudent}></input>
                </section>

                <section className="text-center">
                    <h1>Marque los cursos que quiera que tenga asignado el estudiante</h1>
                    {allCourses?.map((course) => {
                        return <div key={course.id}>
                            <label htmlFor={String(course.id)}>{course.name}</label>
                            <input type="checkbox" onChange={checkCourses} name={String(course.id)} checked={studentCoursesToAdd?.includes(course.id)} value={course.id}></input>
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
            ) : (
                <h1>{error.data.message}</h1>
            )}
        </Container>
    )
}