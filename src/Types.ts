export type ResponseGradeArray = {
    data: Array<Grade>
}

export type ResponseCourseArray = {
    data: Array<Course>
}

export type ResponseProfessorArray = {
    data: Array<Professor>
}

export type ResponseStudentArray = {
    data: Array<Student>
}

export type ResponseGrade = {
    data: Grade
}

export type ResponseCourse = {
    data: Course
}

export type ResponseProfessor = {
    data: Professor
}

export type ResponseStudent = {
    data: Student
}

export type ResponseError = {
    data: Error
}

export type Grade = {
    id: number,
    grade: number,
    evaluationType: string,
    active: boolean,
    student: Student,
    course: Course
}

export type Student = {
    id: number,
    name: string,
    lastName: string,
    birthDate: string,
    address: string,
    active: boolean,
    dni: number,
    courses: null | Array<Course>
    grades: null | Array<Grade>
}

export type Course = {
    id: number,
    name: string,
    code: string,
    description: string,
    active: boolean,
    students: null | Array<Student>
}

export type Professor = {
    id: number,
    name: string,
    lastName: string,
    specialty: string,
    dni: number,
    courses: Array<Course> | null
    active: boolean
}

export type Error = {
    message: string
}