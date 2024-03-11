import { Grade, GradeCreation } from "../Types";

export default function validateGrade(grade : Grade | GradeCreation){
    var regexEvaluacion = /^[a-zA-Z0-9\s]+$/
    let error = []

    if(!regexEvaluacion.test(grade.evaluationType) && grade.evaluationType.length){
        error.push("-El tipo de evaluación no pueden contener caracteres especiales")
    }

    if(grade.grade > 10){
        error.push("-La nota debe ser menor o igual a 10") 
    }

    if(grade.grade < 1){
        error.push("-La nota debe ser mayor o igual a 1") 
    }

    if(!grade.evaluationType.length){
        error.push("-Ingresar tipo de evaluación")
    }

    return error
}