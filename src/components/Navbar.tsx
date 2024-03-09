import LinkButton from "./LinkButton";

export default function NavBar(){
    return(
        <nav className="flex justify-between py-6 px-32 bg-blue-500">
            <LinkButton path="/view" text="Ver datos" />
            <LinkButton path="/edit" text="Editar datos" />
            <LinkButton path="/create" text="Crear datos" />
        </nav>
    )
}