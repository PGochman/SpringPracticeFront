import { useEffect, useState } from "react"
import { ResponseCourseArray, Course } from "../../Types"
import axios from "axios"
import Container from "../Container"
import ViewAllData from "../ViewAllData"
import CourseCard from "./CourseCard"

export default function ViewCourse(){
    const [courses, setCourses] = useState<ResponseCourseArray>()
    const [activeCourses, setActiveCourses] = useState<Array<Course>>()
    const [inactiveCourses, setInactiveCourses] = useState<Array<Course>>()


    const getGrades = async () => {
        const response = await axios("http://localhost:8080/course")
        setCourses(response.data)
        setInactiveCourses(response.data.data.filter((course : Course) => !course.active))
        setActiveCourses(response.data.data.filter((course : Course) => course.active))

    }

    useEffect(() => {
        getGrades()
    }, [])
    return (
        <Container>
            {courses?.data ? (
                <>
                    {activeCourses?.length ? (
                        <>
                            <h1 className="text-4xl pb-4">Cursos activos</h1>
                            <ViewAllData>
                                {activeCourses.map((course) => {
                                    return <CourseCard course={course} key={course.id} />
                                })}
                            </ViewAllData>
                        </>
                    ) : ""}
                    {inactiveCourses?.length ? (
                        <>
                            <h1 className="text-4xl pb-4">Cursos inactivos</h1>
                            <ViewAllData>
                                {inactiveCourses.map((course) => {
                                    return <CourseCard course={course} key={course.id} />
                                })}
                            </ViewAllData>
                        </>
                    ) : ""}
                </>
            ) : (
                <h1>No hay cursos en la base de datos</h1>
            )}
        </Container>
    )
}