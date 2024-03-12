import { ReactNode } from "react";

export default function Card({children} : {children : ReactNode}){
    return <div className="grid border border-blue-400 p-2 mb-6 w-[300px] h-[200px]">
        {children}
    </div>
}