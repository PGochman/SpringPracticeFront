import { Professor, ProfessorCreation } from "../Types";

export default function validateProfessor(professor : Professor | ProfessorCreation){
    const regexString = /^[A-Za-z\s'-]+$/;
    const regexNumber = /^\d+$/
    let error = []
    if(!regexString.test(professor.name) || !regexString.test(professor.lastName) || !regexString.test(professor.specialty)){
        error.push("-El nombre, apellido y especialidad no pueden contener numeros ni caracteres especiales")
    }

    if(!regexNumber.test(String(professor.dni))){
        error.push("-El dni tiene que estar formado por numeros") 
    }

    if(String(professor.dni).length != 8){
        error.push("-El dni debe tener 8 numeros")
    }

    return error
}