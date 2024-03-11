import { ReactNode } from "react";

type props = {
    children?: ReactNode
}

export default function ViewAllData({children} : props){
    return <div className="grid grid-cols-3 w-[900px] justify-items-center	">
        {children}
    </div>
}