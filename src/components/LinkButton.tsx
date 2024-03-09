import { Link } from "react-router-dom";

type Props = {
    path: string,
    text: string
}

export default function LinkButton({path, text} : Props){
    return(
        <Link className="px-8 rounded-lg bg-blue-200 text-xl " to={path}>{text}</Link>
    )
}