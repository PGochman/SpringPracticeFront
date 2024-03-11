import { Student } from "../Types";

export default function validateStudent(student : Student){
    const regexString = /^[A-Za-z\s'-]+$/
    const regexNumber = /^\d+$/
    var regexDireccion = /^[a-zA-Z0-9\s]+$/
    let error = []
    if(!regexString.test(student.name) || !regexString.test(student.lastName)){
        error.push("-El nombre y apellido no pueden contener numeros ni caracteres especiales")
    }

    if(!regexNumber.test(String(student.dni))){
        error.push("-El dni tiene que estar formado por numeros") 
    }

    if(String(student.dni).length != 8){
        error.push("-El dni debe tener 8 numeros")
    }

    if(!regexDireccion.test(student.address)){
        error.push("-La dirección no puede contener caracteres especiales")
    }

    return error
}