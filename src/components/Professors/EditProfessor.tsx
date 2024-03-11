import { useEffect, useState } from "react"
import { ResponseProfessor, ResponseError, Course, Professor } from "../../Types"
import axios from "axios"
import Container from "../Container"
import validateProfessor from "../../validations/ProfessorValidation"
import { useNavigate } from "react-router-dom"

export default function EditProfessor({id} : {id: string}){
    const [detail, setDetail] = useState<ResponseProfessor>()
    const [error, setError] = useState<ResponseError | null>(null)
    const [validateError, setValidateError] = useState<Array<string>>([])
    const [professorCoursesToAdd, setProfessorCoursesToAdd] = useState<Array<number>>()
    const [allCourses, setAllCourses] = useState<Array<Course>>()
    const [professor, setProfessor] = useState<Professor>()

    const navigate = useNavigate()

    const getDetail = async () => {
        try{
            const response = await axios("http://localhost:8080/professor/" + id)
            setDetail(response.data)
            setProfessor(response.data.data)
        } catch(error: any){
            setError(error.response.data)
        }
    }

    const getCourses = async () => {
        const response = await axios("http://localhost:8080/course")
        const allCourses : Array<Course> = response.data.data
        const professorCoursesIds = detail?.data.courses && detail?.data.courses.map((course) => course.id)

        const coursesToAdd : Array<number> = []
        allCourses.forEach((course) =>{
            if(professorCoursesIds?.includes(course.id)) coursesToAdd.push(course.id)
        })
        setProfessorCoursesToAdd(coursesToAdd)
        setAllCourses(allCourses)
    }

    useEffect(() => {
        professor && 
        setValidateError(validateProfessor(professor))
    }, [professor])

    useEffect(() => {
        detail && getCourses()
    }, [detail])

    useEffect(() => {
        getDetail() 
    }, [])

    const changeProfessor = (e: any) => {
        if(professor){
            setProfessor({...professor, [e.target.name]: e.target.value})
        }
    }

    const checkCourses = (e : any) => {
        professorCoursesToAdd?.includes(Number(e.target.value)) ? 
        setProfessorCoursesToAdd((currentCourses) => currentCourses?.filter((course) => e.target.value != course))
        :
        setProfessorCoursesToAdd((currentCourses) => currentCourses?.concat(Number(e.target.value)))
    }

    const updateProfessor = async (e: any) => {
        e.preventDefault()
        const data = {...professor, coursesId: professorCoursesToAdd}
        try{
            await axios.put("http://localhost:8080/professor", data)
            navigate("/view/professor/" + id)
        } catch(error: any){
            setError(error.response.data)
        }
    }

    return(
        <Container>
            {!error ? (

            <form className="flex flex-col justify-around items-center h-[500px]" onSubmit={updateProfessor}>
                <section>
                    <label htmlFor="name">Nombre: </label>
                    <input name="name" value={professor?.name || ""} onChange={changeProfessor}></input>
                </section>

                <section>
                    <label htmlFor="lastName">Apellido: </label>
                    <input name="lastName" value={professor?.lastName || ""} onChange={changeProfessor}></input>
                </section>

                <section>
                    <label htmlFor="specialty">Especialidad: </label>
                    <input name="specialty" value={professor?.specialty || ""} onChange={changeProfessor}></input>
                </section>

                <section>
                    <label htmlFor="dni">DNI: </label>
                    <input name="dni" value={professor?.dni || ""} onChange={changeProfessor}></input>
                </section>

                <section>
                    {allCourses?.map((course) => {
                        return <div key={course.id}>
                            <label htmlFor={String(course.id)}>{course.name}</label>
                            <input type="checkbox" onChange={checkCourses} name={String(course.id)} checked={professorCoursesToAdd?.includes(course.id)} value={course.id}></input>
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