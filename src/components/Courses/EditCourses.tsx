import { useEffect, useState } from "react"
import { ResponseError, Course } from "../../Types"
import axios from "axios"
import Container from "../Container"
import { useNavigate } from "react-router-dom"
import ErrorComponent from "../ErrorComponent"

export default function EditCourse({id} : {id: string}){
    const [error, setError] = useState<ResponseError | null>(null)
    const [validateError, setValidateError] = useState<Array<string>>([])
    const [course, setCourse] = useState<Course>()
    
    const navigate = useNavigate()

    const getDetail = async () => {
        try{
            const response = await axios("http://localhost:8080/course/" + id)
            setCourse(response.data.data)

        } catch(error: any){
            setError(error.response.data)
        }
    }

    useEffect(() => {
        getDetail()
    }, [])

    // useEffect(() => {
    //     grade &&
    //     setValidateError(validateGrade(grade))
    // }, [grade])

    const changeCourse = (e: any) => {
        if(course){
            setCourse({...course, [e.target.name]: e.target.value})
        }
    }

    const updateCourse = async (e: any) => {
        e.preventDefault()
        try{
            await axios.put("http://localhost:8080/course", course)
            navigate("/view/course/" + id)
        } catch(error: any){
            setError(error.response.data)
        }
    }

    return (
        <Container>
            {!error && course ? (
                !course.active ? (
                    <ErrorComponent>
                        <h1 className="text-4xl">El curso no se puede editar porque esta inactivo</h1>
                    </ErrorComponent>
                ) : (
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
                            <label htmlFor="description"></label>
                            <input name="description" value={course.description} onChange={changeCourse}></input>
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