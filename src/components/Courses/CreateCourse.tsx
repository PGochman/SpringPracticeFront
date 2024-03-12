import { useEffect, useState } from "react"
import { ResponseError, CourseCreation } from "../../Types"
import axios from "axios"
import Container from "../Container"
import { useNavigate } from "react-router-dom"
import ErrorComponent from "../ErrorComponent"
import validateCourse from "../../validations/CourseValidation"

export default function CreateCourse(){
    const [error, setError] = useState<ResponseError | null>(null)
    const [validateError, setValidateError] = useState<Array<string>>([])
    const [course, setCourse] = useState<CourseCreation>({
        name: "",
        code: "",
        description: ""
    })
    
    const navigate = useNavigate()

    useEffect(() => {
        course &&
        setValidateError(validateCourse(course))
    }, [course])

    const changeCourse = (e: any) => {
        if(course){
            setCourse({...course, [e.target.name]: e.target.value})
        }
    }

    const updateCourse = async (e: any) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:8080/course", course)
            navigate("/view/courses")
        } catch(error: any){
            setError(error.response)
        }
    }

    return (
        <Container>
            <h1 className="text-4xl">Crear curso</h1>
            <form className="flex flex-col justify-around items-center h-[500px]" onSubmit={updateCourse}>
                <section>
                    <label htmlFor="name">Nombre: </label>
                    <input name="name" value={course.name || ""} onChange={changeCourse}></input>
                </section>

                <section>
                    <label htmlFor="code">Código: </label>
                    <input name="code" value={course.code || ""} onChange={changeCourse}></input>
                </section>

                <section>
                    <label htmlFor="description">Descripción: </label>
                    <input name="description" value={course.description} onChange={changeCourse}></input>
                </section>

                <section className="flex flex-col text-center">
                    {validateError.map((error) => {
                    return <span className="text-red-500">{error}</span>
                    })}
                </section>

                <button className={`${validateError.length > 0 ? "bg-blue-200" : "bg-blue-500"} p-1 rounded border-2 border-blue-700`} type="submit" disabled={validateError.length > 0}>Crear curso</button>
            </form>
            
            {error && (
                <ErrorComponent>
                    <h1>{error.data.message}</h1>
                </ErrorComponent>
            )}
        </Container>
    )
}