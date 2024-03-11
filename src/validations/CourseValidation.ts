import { Course, CourseCreation } from "../Types";

export default function validateCourse(course : Course | CourseCreation){
    const regexCode = /^\d{3}[a-zA-Z]/
    const regexString = /^[a-zA-Z0-9\s\u00C0-\u00FF´']+$/u


    let error = []
    if(!regexString.test(course.name) || !regexString.test(course.description)){
        console.log(course)
        error.push("-El nombre y descripción no pueden contener caracteres especiales")
    }

    if(!regexCode.test(course.code)){
        error.push("-El código debe estar conformado por tres numeros y una letra")
    }

    if(course.code.length != 4){
        error.push("-El código debe tener 4 caracteres")
    }

    return error
}