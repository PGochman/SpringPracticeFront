import Container from "../components/Container";
import RecordsNavBar from "../components/RecordsNavBar";

export default function View(){
    
    return (
        <Container>
            <h1 className="text-5xl text-blue-500" >Seleccionar lo que se quiere ver</h1>
            <RecordsNavBar />
        </Container>
    )
}