import { useEffect, useState } from "react"
import { ResponseProfessorArray } from "../../Types"
import axios from "axios"
import Container from "../Container"
import ViewAllData from "../ViewAllData"
import ProfessorCard from "./ProfessorCard"

export default function ViewGrade(){
    const [professors, setProfessors] = useState<ResponseProfessorArray>()
    const [lastname, setLastname] = useState<string>("")
    const [specialty, setSpecialty] = useState<string>("")

    const getProfessors = async () => {
        const response = await axios("http://localhost:8080/professor")
        setProfessors(response.data)
    }   

    const findProfessorsByParams = async () => {
        const response = await axios(`http://localhost:8080/professor/find?lastname=${lastname}&specialty=${specialty}`)
        setProfessors(response.data)
    }

    const cleanFilters = () => {
        getProfessors()
        setLastname("")
        setSpecialty("")
    }

    useEffect(() => {
        getProfessors()
    }, [])

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
            <ViewAllData>
                {professors?.data ? (
                    professors.data.map(professor => {
                        return(
                            <ProfessorCard professor={professor} key={professor.id} />
                        )
                    })
                ) : (
                    <h1>No hay Profesores cargados</h1>
                )}
            </ViewAllData>
        </Container>
    )
}