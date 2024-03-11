import axios from "axios"
import { useEffect, useState } from "react"
import { ResponseError, ResponseCourse } from "../../Types"
import Container from "../Container"
import ErrorComponent from "../ErrorComponent"
import ViewButtonsDetail from "../ViewButtonsDetail"

export default function CourseDetail({id} : {id: string}){
    const [detail, setDetail] = useState<ResponseCourse>()
    const [error, setError] = useState<ResponseError>()

    const getDetail = async () => {
        try{
            const response = await axios("http://localhost:8080/course/" + id)
            setDetail(response.data)
        } catch( error: any){
            setError(error.response.data)
        }
    }

    useEffect(() => {
        getDetail()
    }, [])

    const changeActive = async () => {
        try{
            await axios.put(`http://localhost:8080/course/${detail?.data.active ? "deactivate" : "restore"}/${id}`)
            getDetail()
        } catch(error : any){
            setError(error.response.data)
        }
    }

    return(
        <Container>
            {detail?.data ? (
                <div>
                    <ViewButtonsDetail LinkChangeActive={changeActive} LinkRedirectEdit={"http://localhost:5173/edit/course/" + id} active={detail.data.active} />
                    {detail.data.active ? (
                        <div className="flex flex-col items-center h-[350px] justify-evenly">
                            <span className="text-2xl">Nombre: {detail.data.name}</span>
                            <span className="text-2xl">Código: {detail.data.code}</span>
                            <span className="text-2xl">Descripción: {detail.data.description}</span>
                            {detail.data.students?.length ? (
                                <>
                                    <h1 className="text-xl">Estudiantes inscriptos: </h1>
                                    {detail.data.students.map((student) => {
                                        return <span key={student.id}>{student.name} {student.lastName}</span>
                                    })}
                                </>
                            ) : (
                                <span>El curso no tiene estudiantes inscriptos</span>
                            )}
                        </div>
                    ) : (
                        <ErrorComponent>
                            <h1 className="text-3xl">El curso se encuentra inactivo en la base de datos</h1>
                        </ErrorComponent>
                    )}
                </div>
            ) : (
                error?.data ? (
                    <ErrorComponent>
                        <h1 className="text-4xl">{error.data.message}</h1>
                        <h2 className="text-2xl">Revise el enlace e intentelo de nuevo</h2>
                    </ErrorComponent>
                ) : (
                    <h1>Error de conexión en la base de datos</h1>
                )
            )}
        </Container>
    )
}