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


    const getGrades = async () => {
        const response = await axios("http://localhost:8080/grade")
        setGrades(response.data)
        const active : Array<Grade> = []
        const inactive : Array<Grade> = []
        response.data.data.forEach((grade : Grade) => {
            grade.active? active.push(grade) : inactive.push(grade)
        })
        setActiveGrades(active)
        setInactiveGrades(inactive)
    }

    const changeActive = async (grade: Grade) => {
        try{
            await axios.put(`http://localhost:8080/grade/${grade.active ? "deactivate" : "restore"}/${grade.id}`)
            getGrades()
            setError(null)
        } catch(error: any){
            setError(error.response.data)
        }
    }

    useEffect(() => {
        getGrades()
    }, [])
    return (
        <Container>
            <>
                {grades?.data ? (
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
                    <h1>No hay notas activas</h1>
                )}
                {error && <ErrorComponent>
                    <h1>{error.data.message}</h1>
                    </ErrorComponent>}
            </>
        </Container>
    )
}