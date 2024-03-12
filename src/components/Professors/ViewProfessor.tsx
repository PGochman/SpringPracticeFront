import { useEffect, useState } from "react"
import { Professor, ResponseError, ResponseProfessorArray } from "../../Types"
import axios from "axios"
import Container from "../Container"
import ViewAllData from "../ViewAllData"
import ProfessorCard from "./ProfessorCard"
import ErrorComponent from "../ErrorComponent"

export default function ViewGrade(){
    const [professors, setProfessors] = useState<ResponseProfessorArray>()
    const [lastname, setLastname] = useState<string>("")
    const [specialty, setSpecialty] = useState<string>("")
    const [activeProfessors, setActiveProfessors] = useState<Array<Professor>>()
    const [inactiveProfessors, setInactiveProfessors] = useState<Array<Professor>>()
    const [error, setError] = useState<ResponseError | null>(null)


    const getProfessors = async () => {
        const response = await axios("http://localhost:8080/professor")
        setProfessors(response.data)
    }   

    const findProfessorsByParams = async () => {
        try{
            const response = await axios(`http://localhost:8080/professor/find?lastname=${lastname}&specialty=${specialty}`)
            setProfessors(response.data)
        } catch(error : any){
            setProfessors({data: []})
            setError(error.response.data)
        }
    }

    const cleanFilters = () => {
        getProfessors()
        setLastname("")
        setSpecialty("")
        setError(null)
    }

    useEffect(() => {
        getProfessors()
    }, [])

    useEffect(() => {
        if(professors?.data.length){
            const active = professors.data.filter((professor : Professor) => professor.active )
            const inactive = professors.data.filter((professor : Professor) => !professor.active )
            setActiveProfessors(active)
            setInactiveProfessors(inactive)
            setError(null)
        }
    }, [professors])

    return (
        <Container>
            <h1 className="text-4xl pb-12">Ver todos los profesores, o buscar por apellido y/o especialidad</h1>
            <section className="pb-8 justify-items-center grid grid-cols-3 w-[900px]">
                <div className="grid grid-rows-2">
                    <label htmlFor="specialty">Especialidad: </label>
                    <input name="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)}></input>
                </div>
                <div className="grid grid-rows-2">
                    <label htmlFor="lastname">Apellido: </label>
                    <input name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}></input>
                </div>
                <div className="flex justify-around items-end w-full">
                    <button className="bg-blue-500 border border-blue-700 rounded" onClick={findProfessorsByParams}>Buscar</button>
                    <button className="bg-blue-500 border border-blue-700 rounded" onClick={cleanFilters}>Quitar filtros</button>
                </div>
            </section>
            {professors?.data.length ? (
                <>
                {activeProfessors?.length ? (
                    <>
                        <h1 className="text-4xl pb-4">Profesores activos</h1>
                        <ViewAllData>
                            {activeProfessors.map((professor) => {
                              return <ProfessorCard professor={professor} key={professor.id}/>  
                            })}
                        </ViewAllData>
                    </>
                ) : ""}
                {inactiveProfessors?.length ? (
                    <>
                        <h1 className="text-4xl pb-4">Profesores inactivos</h1>
                        <ViewAllData>
                            {inactiveProfessors.map((professor) => {
                              return <ProfessorCard professor={professor} key={professor.id}/>  
                            })}
                        </ViewAllData>
                    </>
                ) : ""}
                </>
            ) : (
                <></>
            )}
            {error && (
                <ErrorComponent>
                    <h1 className="text-2xl">{error.data.message}</h1>
                </ErrorComponent>)}
        </Container>
    )
}