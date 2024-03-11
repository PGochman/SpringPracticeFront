import { useEffect, useState } from "react"
import { ResponseCourseArray } from "../../Types"
import axios from "axios"
import Container from "../Container"
import ViewAllData from "../ViewAllData"
import CourseCard from "./CourseCard"

export default function ViewCourse(){
    const [courses, setCourses] = useState<ResponseCourseArray>()

    const getGrades = async () => {
        const response = await axios("http://localhost:8080/course")
        setCourses(response.data)
    }

    useEffect(() => {
        getGrades()
    }, [])
    return (
        <Container>
            <ViewAllData>
                {courses?.data ? (
                    courses.data.map(course => {
                        return(
                            <CourseCard course={course} key={course.id}/>
                        )
                    })
                ) : (
                    <h1>No hay Cursos cargados</h1>
                )}
            </ViewAllData>
        </Container>
    )
}