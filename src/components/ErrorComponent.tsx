import { ReactNode } from "react";

export default function ErrorComponent({children} : {children: ReactNode}){
    return <div className="border border-4 border-red-600 p-28">
        {children}
    </div>
}