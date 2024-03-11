import { Link } from "react-router-dom";

export default function ViewButtonsDetail({LinkChangeActive, LinkRedirectEdit, active} : {LinkChangeActive: () => Promise<void>, LinkRedirectEdit: string, active: boolean}){
    return(
        <div className={`grid ${active ? "grid-cols-2" : "grid-cols-1" } gap-x-24 pb-8 justify-center`}>
            <button className="bg-blue-200 border border-blue-400 p-1 w-fit" onClick={LinkChangeActive}>{active ? "Desactivar" : "Reactivar"}</button>
            {active && <Link className="bg-blue-200 border border-blue-400 p-1 text-center" to={LinkRedirectEdit}>Editar</Link>}
        </div>
    )
}